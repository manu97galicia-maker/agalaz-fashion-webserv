/**
 * Shopify Storefront API client.
 *
 * Used as fallback when a partner's store has password protection enabled
 * (dev/trial stores, "Coming soon" mode, B2B private stores). The Storefront
 * API works on every Shopify store including dev stores, with a public-safe
 * access token that the merchant generates inside Shopify Admin → Apps →
 * Develop apps → custom app → Storefront API access scopes.
 *
 * Returns products in the same shape as the public /products.json fetcher so
 * crossSell.ts and publicCatalogSync.ts can branch transparently.
 */

import type { RecommendedProduct } from './crossSell';

const STOREFRONT_API_VERSION = '2024-10';

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          productType
          tags
          images(first: 1) {
            edges { node { url } }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

interface StorefrontProductNode {
  id: string;
  handle: string;
  title: string;
  productType: string | null;
  tags: string[] | null;
  images: { edges: { node: { url: string } }[] };
  variants: { edges: { node: { id: string; price: { amount: string; currencyCode: string } } }[] };
}

/**
 * Extracts the numeric Shopify product ID from a global GID, e.g.
 * gid://shopify/Product/8234567890123 → "8234567890123"
 */
function extractNumericId(gid: string): number {
  const match = gid.match(/\/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

/**
 * Fetch products via the Storefront API. Returns at most `limit` products in the
 * RecommendedProduct shape, normalized for crossSell scoring.
 */
export async function fetchProductsViaStorefront(
  shopDomain: string,
  storefrontToken: string,
  limit: number = 50,
): Promise<{ products: any[]; ok: boolean; error?: string }> {
  if (!shopDomain || !storefrontToken) {
    return { products: [], ok: false, error: 'Missing shopDomain or token' };
  }

  try {
    const res = await fetch(`https://${shopDomain}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { first: Math.min(limit, 250) },
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return { products: [], ok: false, error: `HTTP ${res.status}` };
    }

    const data = await res.json();
    if (data.errors?.length) {
      return { products: [], ok: false, error: data.errors[0]?.message || 'GraphQL error' };
    }

    const edges = data.data?.products?.edges || [];
    // Map to the same shape that /products.json returns so downstream code
    // (crossSell and publicCatalogSync) doesn't need to know the difference.
    const products = edges.map((e: { node: StorefrontProductNode }) => {
      const n = e.node;
      const variant = n.variants.edges[0]?.node;
      return {
        id: extractNumericId(n.id),
        title: n.title,
        handle: n.handle,
        product_type: n.productType || '',
        tags: Array.isArray(n.tags) ? n.tags.join(',') : '',
        images: n.images.edges.map((ie) => ({ src: ie.node.url })),
        variants: variant
          ? [
              {
                id: extractNumericId(variant.id),
                price: variant.price?.amount || '0.00',
              },
            ]
          : [],
      };
    });

    return { products, ok: true };
  } catch (err: any) {
    return { products: [], ok: false, error: err?.message?.slice(0, 200) || 'Storefront fetch failed' };
  }
}

export type StorefrontFetchResult = ReturnType<typeof fetchProductsViaStorefront>;

/**
 * Convenience wrapper that returns a normalized RecommendedProduct list,
 * useful for crossSell scoring without going through publicCatalogSync.
 */
export async function fetchRecommendationsViaStorefront(
  shopDomain: string,
  storefrontToken: string,
  limit: number = 50,
): Promise<RecommendedProduct[]> {
  const { products, ok } = await fetchProductsViaStorefront(shopDomain, storefrontToken, limit);
  if (!ok) return [];
  return products
    .filter((p: any) => p.images?.length > 0)
    .map((p: any) => ({
      id: p.id,
      variantId: p.variants?.[0]?.id ? String(p.variants[0].id) : undefined,
      title: p.title,
      image: p.images[0]?.src || '',
      url: `https://${shopDomain}/products/${p.handle}`,
      price: p.variants?.[0]?.price || '0.00',
      productType: p.product_type || '',
    }));
}
