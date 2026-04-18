import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { syncPublicCatalog } from '@/services/publicCatalogSync';

// Long-running. Vercel hobby caps at 60s; upgrade or paginate if you need more.
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const secret = process.env.INTERNAL_SYNC_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Sync not configured' }, { status: 503 });
  }

  const auth = req.headers.get('authorization') || '';
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { partnerId } = await req.json().catch(() => ({}));
  if (!partnerId) {
    return NextResponse.json({ error: 'partnerId is required' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: partner } = await admin
    .from('partners')
    .select('id, store_url, shop_domain, shopify_access_token')
    .eq('id', partnerId)
    .single();

  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }

  // For partners with Shopify Admin OAuth, shopify-agalaz should handle the sync.
  // Here we only support the public /products.json path.
  if (!partner.store_url) {
    return NextResponse.json({ error: 'Partner has no store_url' }, { status: 400 });
  }

  try {
    const stats = await syncPublicCatalog(partner.id, partner.store_url);
    return NextResponse.json({ success: true, stats });
  } catch (err: any) {
    console.error('[internal-sync] error:', err?.message);
    return NextResponse.json({ error: 'Sync failed', message: err?.message?.substring(0, 300) }, { status: 500 });
  }
}
