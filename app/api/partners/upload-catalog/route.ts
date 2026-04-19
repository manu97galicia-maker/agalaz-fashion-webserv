import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { validateApiKey } from '@/lib/partners';
import { classifyProducts, type Classification } from '@/services/productClassifier';

export const maxDuration = 60;

interface InputProduct {
  id: string | number;
  title: string;
  image?: string | null;
  imageUrl?: string | null;
  handle?: string | null;
  description?: string | null;
  type?: string | null;
  productType?: string | null;
  tags?: string[] | string | null;
  vendor?: string | null;
  price?: number | string | null;
  priceCents?: number | null;
  currency?: string | null;
  variants?: Array<{
    id: string | number;
    title?: string;
    price?: number | string;
    priceCents?: number;
    currency?: string;
    size?: string | null;
    color?: string | null;
    available?: boolean;
  }>;
  primary_category?: string;
  style?: string;
  color_family?: string;
}

function corsHeaders(origin?: string | null) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}

function normalizeTags(tags: any): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  return String(tags).split(',').map((t) => t.trim()).filter(Boolean);
}

function toCents(p: any): number {
  if (typeof p === 'number' && Number.isFinite(p)) {
    return p > 1000 ? Math.round(p) : Math.round(p * 100);
  }
  if (typeof p === 'string') {
    const n = parseFloat(p.replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? Math.round(n * 100) : 0;
  }
  return 0;
}

function slugify(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);

  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 401, headers });
  }
  const apiKey = auth.replace('Bearer ', '');

  const { valid, partner, error } = await validateApiKey(apiKey, origin || req.headers.get('referer'));
  if (!valid || !partner) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401, headers });
  }

  let body: { products?: InputProduct[]; replace?: boolean };
  try { body = await req.json(); } catch { body = {}; }

  const inputs = Array.isArray(body.products) ? body.products : [];
  if (inputs.length === 0) {
    return NextResponse.json({ error: 'products array is required' }, { status: 400, headers });
  }
  if (inputs.length > 2000) {
    return NextResponse.json({ error: 'Max 2000 products per request' }, { status: 400, headers });
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();

  const toClassify: Array<{ title: string; product_type: string | null; tags: string[]; description: string | null }> = [];
  const prepared = inputs.map((p) => {
    const productType = p.productType || p.type || null;
    const tags = normalizeTags(p.tags);
    const description = p.description?.substring(0, 2000) || null;
    toClassify.push({ title: p.title, product_type: productType, tags, description });
    return { p, productType, tags, description };
  });

  // Partner-provided classifications take precedence; only classify missing ones
  const classifications: Classification[] = await classifyProducts(toClassify);
  for (let i = 0; i < prepared.length; i++) {
    const p = prepared[i].p;
    if (p.primary_category) classifications[i].primary_category = p.primary_category as any;
    if (p.style) classifications[i].style = p.style;
    if (p.color_family) classifications[i].color_family = p.color_family;
  }

  if (body.replace) {
    await admin.from('products').delete().eq('partner_id', partner.id);
  }

  const productRows = prepared.map((prep, i) => ({
    partner_id: partner.id,
    shopify_product_id: String(prep.p.id),
    handle: prep.p.handle || slugify(prep.p.title),
    title: prep.p.title,
    description: prep.description,
    vendor: prep.p.vendor || null,
    product_type: prep.productType,
    tags: prep.tags,
    featured_image_url: prep.p.image || prep.p.imageUrl || null,
    status: 'active',
    primary_category: classifications[i].primary_category,
    style: classifications[i].style,
    color_family: classifications[i].color_family,
    classified_at: now,
    synced_at: now,
  }));

  const { data: upserted, error: upErr } = await admin
    .from('products')
    .upsert(productRows, { onConflict: 'partner_id,shopify_product_id' })
    .select('id, shopify_product_id');

  if (upErr) {
    console.error('[upload-catalog] product upsert failed:', upErr.message);
    return NextResponse.json({ error: 'Failed to save products', detail: upErr.message }, { status: 500, headers });
  }

  const idByShopifyId = new Map(upserted.map((r) => [r.shopify_product_id, r.id]));
  const variantRows: any[] = [];
  const defaultCurrency = 'EUR';

  for (const prep of prepared) {
    const rowId = idByShopifyId.get(String(prep.p.id));
    if (!rowId) continue;
    const variants = prep.p.variants && prep.p.variants.length
      ? prep.p.variants
      : [{ id: `${prep.p.id}-default`, title: 'Default', price: prep.p.price, priceCents: prep.p.priceCents }];
    for (const v of variants) {
      variantRows.push({
        product_id: rowId,
        shopify_variant_id: String(v.id),
        title: v.title || 'Default',
        price_cents: v.priceCents ?? toCents(v.price ?? prep.p.price ?? prep.p.priceCents ?? 0),
        currency: (v.currency || prep.p.currency || defaultCurrency).toUpperCase().substring(0, 3),
        available: v.available !== false,
        size: v.size || null,
        color: v.color || null,
      });
    }
  }

  if (variantRows.length) {
    const productIds = Array.from(new Set(variantRows.map((v) => v.product_id)));
    await admin.from('product_variants').delete().in('product_id', productIds);
    const { error: varErr } = await admin.from('product_variants').insert(variantRows);
    if (varErr) console.warn('[upload-catalog] variants insert failed:', varErr.message);
  }

  await admin.from('partners')
    .update({ last_catalog_sync_at: now })
    .eq('id', partner.id);

  return NextResponse.json({
    success: true,
    count: upserted.length,
    variants: variantRows.length,
    classified: classifications.length,
  }, { headers });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);
  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 401, headers });
  }
  const apiKey = auth.replace('Bearer ', '');
  const { valid, partner, error } = await validateApiKey(apiKey, origin);
  if (!valid || !partner) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401, headers });
  }

  const admin = createAdminClient();
  const { count } = await admin.from('products')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', partner.id);

  return NextResponse.json({ count: count || 0 }, { headers });
}
