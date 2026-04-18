import { createAdminClient } from '@/lib/supabaseAdmin';
import { classifyProducts } from './productClassifier';

// Sync a partner catalog from the public Shopify /products.json endpoint.
// No OAuth required — works with any Shopify storefront that exposes the public JSON.

interface PublicProduct {
  id: number;
  title: string;
  handle: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  tags?: string | string[];
  published_at?: string | null;
  images?: Array<{ src: string; position?: number }>;
  variants?: Array<{
    id: number;
    title?: string;
    price?: string;
    available?: boolean;
    option1?: string | null;
    option2?: string | null;
    option3?: string | null;
  }>;
  options?: Array<{ name: string; position?: number; values?: string[] }>;
}

export interface PublicSyncStats {
  total: number;
  inserted: number;
  updated: number;
  classified: number;
  skippedAlreadyClassified: number;
  cappedByPlan: number;
  errors: number;
  pages: number;
}

const TRIAL_MAX_PRODUCTS = 500;
const CLASSIFY_MAX_PER_SYNC = 800;
const MAX_PAGES = 20; // 250 per page × 20 = 5000 products max
const PER_PAGE = 250;

function parsePriceCents(price: string | undefined): number {
  if (!price) return 0;
  const n = parseFloat(price);
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

function normalizeTags(tags: string | string[] | undefined): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  return String(tags).split(',').map((t) => t.trim()).filter(Boolean);
}

function findOptionValue(
  product: PublicProduct,
  variant: NonNullable<PublicProduct['variants']>[number],
  re: RegExp,
): string | null {
  const opts = product.options || [];
  for (let i = 0; i < opts.length; i++) {
    if (re.test(opts[i].name)) {
      const key = `option${i + 1}` as 'option1' | 'option2' | 'option3';
      return variant[key] || null;
    }
  }
  return null;
}

async function fetchPublicProductsPage(shopOrigin: string, page: number): Promise<PublicProduct[]> {
  const url = `${shopOrigin}/products.json?limit=${PER_PAGE}&page=${page}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data?.products) ? data.products : [];
}

async function upsertProduct(
  partnerId: string,
  p: PublicProduct,
): Promise<{ productRowId: string; isNew: boolean; alreadyClassified: boolean; contentChanged: boolean } | null> {
  const admin = createAdminClient();
  const shopifyId = String(p.id);
  const newTags = normalizeTags(p.tags).slice().sort();

  const { data: existing } = await admin
    .from('products')
    .select('id, title, product_type, tags, primary_category')
    .eq('partner_id', partnerId)
    .eq('shopify_product_id', shopifyId)
    .maybeSingle();

  const oldTags = (existing?.tags || []).slice().sort();
  const contentChanged = !existing
    || existing.title !== p.title
    || existing.product_type !== (p.product_type || null)
    || JSON.stringify(oldTags) !== JSON.stringify(newTags);

  const payload: Record<string, any> = {
    partner_id: partnerId,
    shopify_product_id: shopifyId,
    handle: p.handle,
    title: p.title,
    description: p.body_html?.replace(/<[^>]+>/g, ' ').substring(0, 4000) || null,
    vendor: p.vendor || null,
    product_type: p.product_type || null,
    tags: newTags,
    featured_image_url: p.images?.[0]?.src || null,
    status: p.published_at ? 'active' : 'draft',
    synced_at: new Date().toISOString(),
  };

  if (contentChanged && existing) {
    payload.primary_category = null;
    payload.style = null;
    payload.color_family = null;
    payload.classified_at = null;
  }

  let productRowId: string;
  let isNew = false;
  const alreadyClassified = !!existing?.primary_category && !contentChanged;

  if (existing) {
    await admin.from('products').update(payload).eq('id', existing.id);
    productRowId = existing.id;
  } else {
    const { data: inserted, error } = await admin
      .from('products')
      .insert(payload)
      .select('id')
      .single();
    if (error || !inserted) {
      console.warn(`[public-sync] insert failed for ${shopifyId}:`, error?.message);
      return null;
    }
    productRowId = inserted.id;
    isNew = true;
  }

  const variants = p.variants || [];
  if (variants.length > 0) {
    await admin.from('product_variants').delete().eq('product_id', productRowId);
    const rows = variants.map((v) => ({
      product_id: productRowId,
      shopify_variant_id: String(v.id),
      title: v.title || null,
      price_cents: parsePriceCents(v.price),
      currency: 'EUR',
      available: v.available !== false,
      size: findOptionValue(p, v, /size|talla/i),
      color: findOptionValue(p, v, /color|colour/i),
    }));
    await admin.from('product_variants').insert(rows);
  }

  return { productRowId, isNew, alreadyClassified, contentChanged };
}

export function extractShopOrigin(storeUrl: string): string | null {
  try {
    const u = new URL(storeUrl.startsWith('http') ? storeUrl : `https://${storeUrl}`);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    const host = u.hostname.toLowerCase();
    if (!host || host === 'localhost' || host.endsWith('.localhost')) return null;
    if (/^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host)) return null;
    if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(host)) return null;
    return `https://${host}`;
  } catch {
    return null;
  }
}

export async function syncPublicCatalog(
  partnerId: string,
  storeUrl: string,
): Promise<PublicSyncStats> {
  const stats: PublicSyncStats = {
    total: 0, inserted: 0, updated: 0, classified: 0,
    skippedAlreadyClassified: 0, cappedByPlan: 0, errors: 0, pages: 0,
  };

  const shopOrigin = extractShopOrigin(storeUrl);
  if (!shopOrigin) {
    stats.errors = 1;
    return stats;
  }

  const admin = createAdminClient();
  const { data: partner } = await admin
    .from('partners')
    .select('plan')
    .eq('id', partnerId)
    .single();

  const isTrial = !partner || partner.plan === 'trial';
  const maxProducts = isTrial ? TRIAL_MAX_PRODUCTS : Infinity;

  const pendingClassification: Array<{
    rowId: string;
    title: string;
    product_type: string | null;
    tags: string[];
    description: string | null;
  }> = [];

  let processedCount = 0;

  outer: for (let page = 1; page <= MAX_PAGES; page++) {
    let products: PublicProduct[];
    try {
      products = await fetchPublicProductsPage(shopOrigin, page);
    } catch (err: any) {
      console.warn('[public-sync] fetch page error:', err?.message?.substring(0, 200));
      stats.errors++;
      break;
    }
    if (products.length === 0) break;
    stats.pages = page;

    for (const product of products) {
      if (processedCount >= maxProducts) {
        stats.cappedByPlan = stats.total - processedCount;
        break outer;
      }
      stats.total++;
      processedCount++;
      try {
        const result = await upsertProduct(partnerId, product);
        if (!result) { stats.errors++; continue; }
        if (result.isNew) stats.inserted++; else stats.updated++;

        if (result.alreadyClassified) {
          stats.skippedAlreadyClassified++;
          continue;
        }

        if (pendingClassification.length < CLASSIFY_MAX_PER_SYNC) {
          pendingClassification.push({
            rowId: result.productRowId,
            title: product.title,
            product_type: product.product_type || null,
            tags: normalizeTags(product.tags),
            description: product.body_html?.replace(/<[^>]+>/g, ' ').substring(0, 500) || null,
          });
        }
      } catch (err: any) {
        console.warn('[public-sync] product error:', err?.message?.substring(0, 200));
        stats.errors++;
      }
    }

    if (products.length < PER_PAGE) break;
  }

  if (pendingClassification.length > 0) {
    try {
      const classifications = await classifyProducts(pendingClassification);
      const nowIso = new Date().toISOString();
      for (let i = 0; i < pendingClassification.length; i++) {
        const c = classifications[i];
        await admin
          .from('products')
          .update({
            primary_category: c.primary_category,
            style: c.style,
            color_family: c.color_family,
            classified_at: nowIso,
          })
          .eq('id', pendingClassification[i].rowId);
        stats.classified++;
      }
    } catch (err: any) {
      console.warn('[public-sync] classification error:', err?.message?.substring(0, 200));
    }
  }

  return stats;
}
