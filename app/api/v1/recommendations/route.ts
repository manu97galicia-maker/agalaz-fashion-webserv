import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/partners';
import { fetchRecommendations, getCompliment, getCrossSellMessage } from '@/services/crossSell';

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

function extractShopDomain(storeUrl: string): string | null {
  try {
    const u = new URL(storeUrl.startsWith('http') ? storeUrl : `https://${storeUrl}`);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    const host = u.hostname.toLowerCase();
    if (!host || host === 'localhost' || host.endsWith('.localhost')) return null;
    if (/^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host)) return null;
    if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(host)) return null;
    return host;
  } catch {
    return null;
  }
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
    const productType = typeof body.productType === 'string' ? body.productType.substring(0, 80) : '';
    const lang = body.lang === 'es' ? 'es' : 'en';
    const limit = Math.min(Math.max(Number(body.limit) || 3, 1), 6);

    const shopDomain = extractShopDomain(partner.store_url);
    if (!shopDomain) {
      return NextResponse.json(
        { recommendations: [], compliment: getCompliment(productType, lang), message: null },
        { status: 200, headers }
      );
    }

    const recommendations = await fetchRecommendations(shopDomain, productType, limit);
    const compliment = getCompliment(productType, lang);
    const message = recommendations.length > 0
      ? getCrossSellMessage(productType, recommendations[0]?.productType || '', lang)
      : null;

    return NextResponse.json(
      { recommendations, compliment, message },
      { status: 200, headers }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500, headers }
    );
  }
}
