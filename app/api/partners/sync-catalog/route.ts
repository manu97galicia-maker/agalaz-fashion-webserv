import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { triggerCatalogSync } from '@/lib/triggerCatalogSync';
import { extractShopOrigin } from '@/services/publicCatalogSync';

const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour between syncs

export async function POST(req: NextRequest) {
  try {
    const { partner_id } = await req.json();
    if (!partner_id) {
      return NextResponse.json({ error: 'partner_id is required' }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: partner } = await admin
      .from('partners')
      .select('id, store_url, shop_domain, shopify_access_token, last_catalog_sync_at, plan')
      .eq('id', partner_id)
      .single();

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // If no Shopify Admin token AND store_url is not a valid public storefront → cannot sync
    const hasShopifyAuth = !!partner.shopify_access_token && !!partner.shop_domain;
    const publicOrigin = partner.store_url ? extractShopOrigin(partner.store_url) : null;
    if (!hasShopifyAuth && !publicOrigin) {
      return NextResponse.json({
        error: 'Catalog sync requires a Shopify store. Other platforms are not yet supported.',
      }, { status: 400 });
    }

    // Cooldown to prevent abuse
    if (partner.last_catalog_sync_at) {
      const elapsed = Date.now() - new Date(partner.last_catalog_sync_at).getTime();
      if (elapsed < COOLDOWN_MS) {
        const waitMins = Math.ceil((COOLDOWN_MS - elapsed) / 60000);
        return NextResponse.json({
          error: `Sync cooldown — try again in ${waitMins} minute${waitMins > 1 ? 's' : ''}`,
          retry_in_seconds: Math.ceil((COOLDOWN_MS - elapsed) / 1000),
        }, { status: 429 });
      }
    }

    await admin
      .from('partners')
      .update({ last_catalog_sync_at: new Date().toISOString() })
      .eq('id', partner.id);

    triggerCatalogSync(partner.id);

    return NextResponse.json({
      success: true,
      message: 'Sync started in background. Products will appear in 1-3 minutes.',
      plan: partner.plan,
    });
  } catch (err: any) {
    console.error('Sync trigger error:', err?.message);
    return NextResponse.json({ error: 'Failed to trigger sync' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const partnerId = req.nextUrl.searchParams.get('partner_id');
  if (!partnerId) {
    return NextResponse.json({ error: 'partner_id is required' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { count: total } = await admin
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', partnerId);

  const { count: classified } = await admin
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', partnerId)
    .not('classified_at', 'is', null);

  const { data: latest } = await admin
    .from('products')
    .select('synced_at')
    .eq('partner_id', partnerId)
    .order('synced_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({
    total: total || 0,
    classified: classified || 0,
    last_synced: latest?.synced_at || null,
  });
}
