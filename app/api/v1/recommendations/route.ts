import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/partners';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { fetchRecommendations, getCompliment, getCrossSellMessage } from '@/services/crossSell';
import { getRecommendations } from '@/services/recommendationEngine';
import { extractShopOrigin } from '@/services/publicCatalogSync';

export const maxDuration = 15;

function corsHeaders(origin?: string | null) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

function shopDomainFromUrl(storeUrl: string | null | undefined): string | null {
  if (!storeUrl) return null;
  const origin = extractShopOrigin(storeUrl);
  if (!origin) return null;
  try { return new URL(origin).hostname; } catch { return null; }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing API key. Use Authorization: Bearer agz_live_...' },
        { status: 401, headers }
      );
    }

    const apiKey = authHeader.replace('Bearer ', '');
    const requestOrigin = origin || request.headers.get('referer');
    const { valid, partner, error } = await validateApiKey(apiKey, requestOrigin);

    if (!valid || !partner) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401, headers });
    }

    const body = await request.json().catch(() => ({}));
    const productId = typeof body.productId === 'string' || typeof body.productId === 'number'
      ? String(body.productId).replace(/[^0-9]/g, '')
      : '';
    const productType = typeof body.productType === 'string' ? body.productType.substring(0, 80) : '';
    const lang = body.lang === 'es' ? 'es' : 'en';
    const limit = Math.min(Math.max(Number(body.limit) || 3, 1), 6);

    const shopDomain = shopDomainFromUrl(partner.store_url);

    // Path 1 — DB-backed, AI-ranked (requires productId + synced catalog)
    if (productId) {
      try {
        const dbResult = await getRecommendations(partner.id, productId);
        if (dbResult.recommendations.length > 0) {
          const normalized = dbResult.recommendations.map((r) => ({
            id: Number(r.productId) || 0,
            variantId: r.variantId || undefined,
            title: r.title,
            image: r.image || '',
            url: shopDomain ? `https://${shopDomain}/products/${r.handle}` : '',
            price: (r.priceCents / 100).toFixed(2),
            productType: r.category,
          }));
          const note = lang === 'es'
            ? (dbResult.styleNoteEs || dbResult.styleNote)
            : (dbResult.styleNote || dbResult.styleNoteEs);
          return NextResponse.json(
            {
              recommendations: normalized,
              compliment: note || getCompliment(productType, lang),
              message: getCrossSellMessage(productType, dbResult.recommendations[0]?.category || '', lang),
              source: 'db',
            },
            { status: 200, headers }
          );
        }
      } catch (err: any) {
        console.warn('[recommendations] DB path error:', err?.message?.substring(0, 200));
      }
    }

    // Path 2 — live fetch from public /products.json (fallback / no productId / no synced catalog)
    if (!shopDomain) {
      return NextResponse.json(
        {
          recommendations: [],
          compliment: getCompliment(productType, lang),
          message: null,
          source: 'none',
        },
        { status: 200, headers }
      );
    }

    // Check if any products are synced for this partner before paying for a live fetch
    const admin = createAdminClient();
    const { count } = await admin
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partner.id);

    const hasCatalog = (count || 0) > 0;
    const recommendations = hasCatalog && productId
      ? []
      : await fetchRecommendations(shopDomain, productType, limit, partner.shopify_storefront_token);

    const compliment = getCompliment(productType, lang);
    const message = recommendations.length > 0
      ? getCrossSellMessage(productType, recommendations[0]?.productType || '', lang)
      : null;

    return NextResponse.json(
      { recommendations, compliment, message, source: hasCatalog ? 'db-empty' : 'live' },
      { status: 200, headers }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500, headers }
    );
  }
}
