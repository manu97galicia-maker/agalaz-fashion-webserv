// Cross-sell recommendation engine
// Fetches products from a Shopify store via the public /products.json endpoint
// and recommends complementary items from a different category.

export interface RecommendedProduct {
  id: number;
  variantId?: string;
  title: string;
  image: string;
  url: string;
  price: string;
  productType: string;
}

// Category mapping: what complementary product types to recommend after a try-on.
// Keys are the NORMALIZED form (lowercase, singular). Values are arrays of
// complementary keys that should also be present in this map (or in a
// product_type/title/tag of the partner's catalog).
//
// Coverage targets: classic clothing taxonomy (shirt, pants, dress, ...) +
// streetwear taxonomy (BOTTOMS / TOPS / JACKETS / FOOTWEAR / ACCESSORIES) +
// jewelry + accessories.
const CROSS_SELL_MAP: Record<string, string[]> = {
  // ── Tops & upper body ──
  'top': ['pant', 'bottom', 'jean', 'short', 'skirt', 'shoe', 'boot'],
  'tops': ['pant', 'bottom', 'jean', 'short', 'skirt', 'shoe', 'boot'],
  'shirt': ['pant', 'bottom', 'jean', 'short', 'skirt', 'shoe', 'jacket'],
  't-shirt': ['pant', 'bottom', 'jean', 'short', 'jacket', 'sneaker'],
  'tee': ['pant', 'bottom', 'jean', 'short', 'jacket', 'sneaker'],
  'blouse': ['pant', 'skirt', 'jean', 'shoe'],
  'sweater': ['pant', 'jean', 'skirt', 'boot'],
  'sweatshirt': ['pant', 'jean', 'short', 'sneaker'],
  'hoodie': ['pant', 'jean', 'jogger', 'short', 'sneaker'],
  'tank': ['pant', 'short', 'skirt', 'jean'],
  // ── Outerwear ──
  'jacket': ['pant', 'bottom', 'jean', 'shirt', 'top', 'tee'],
  'jackets': ['pant', 'bottom', 'jean', 'shirt', 'top', 'tee'],
  'outerwear': ['pant', 'bottom', 'jean', 'shirt', 'top', 'tee', 'boot'],
  'coat': ['pant', 'jean', 'boot', 'scarf', 'glove'],
  'parka': ['pant', 'jean', 'boot'],
  'blazer': ['pant', 'shirt', 'tie', 'shoe'],
  // ── Bottoms ──
  'pant': ['shirt', 'top', 'tee', 'sweater', 'hoodie', 'jacket'],
  'pants': ['shirt', 'top', 'tee', 'sweater', 'hoodie', 'jacket'],
  'bottom': ['top', 'shirt', 'tee', 'sweater', 'hoodie', 'jacket'],
  'bottoms': ['top', 'shirt', 'tee', 'sweater', 'hoodie', 'jacket'],
  'jean': ['shirt', 'top', 'tee', 'jacket', 'sweater', 'sneaker'],
  'jeans': ['shirt', 'top', 'tee', 'jacket', 'sweater', 'sneaker'],
  'trouser': ['shirt', 'top', 'sweater', 'blazer'],
  'trousers': ['shirt', 'top', 'sweater', 'blazer'],
  'skirt': ['top', 'shirt', 'sweater', 'boot'],
  'short': ['tee', 'top', 'shirt', 'tank', 'sneaker'],
  'shorts': ['tee', 'top', 'shirt', 'tank', 'sneaker'],
  'culotte': ['top', 'shirt', 'tee', 'boot'],
  'jogger': ['tee', 'hoodie', 'sneaker', 'sweatshirt'],
  // ── Dresses & one-pieces ──
  'dress': ['shoe', 'boot', 'bag', 'jewelry', 'earring', 'necklace'],
  'jumpsuit': ['shoe', 'boot', 'bag', 'earring'],
  // ── Footwear ──
  'shoe': ['bag', 'sock', 'belt', 'jean', 'pant'],
  'shoes': ['bag', 'sock', 'belt', 'jean', 'pant'],
  'footwear': ['bag', 'jean', 'pant', 'jacket'],
  'boot': ['jacket', 'coat', 'jean', 'pant'],
  'boots': ['jacket', 'coat', 'jean', 'pant'],
  'sneaker': ['tee', 'hoodie', 'jean', 'short', 'jogger'],
  'sneakers': ['tee', 'hoodie', 'jean', 'short', 'jogger'],
  'mule': ['dress', 'skirt', 'pant'],
  'derby': ['blazer', 'pant', 'shirt'],
  // ── Jewelry — pieces also cross-sell to OTHER jewelry pieces (a customer
  //    looking at a ring is more likely to add a matching necklace than a t-shirt). ──
  'ring': ['earring', 'necklace', 'bracelet', 'pendant'],
  'rings': ['earring', 'necklace', 'bracelet', 'pendant'],
  'earring': ['necklace', 'ring', 'bracelet', 'pendant'],
  'earrings': ['necklace', 'ring', 'bracelet', 'pendant'],
  'necklace': ['earring', 'ring', 'bracelet', 'pendant'],
  'pendant': ['necklace', 'earring', 'ring', 'bracelet'],
  'pendants': ['necklace', 'earring', 'ring', 'bracelet'],
  'bracelet': ['ring', 'necklace', 'earring', 'pendant'],
  'watch': ['bracelet', 'ring', 'necklace'],
  'jewelry': ['ring', 'necklace', 'earring', 'pendant', 'bracelet'],
  'jewellery': ['ring', 'necklace', 'earring', 'pendant', 'bracelet'],
  // ── Accessories ──
  'sunglass': ['hat', 'bag', 'watch'],
  'sunglasses': ['hat', 'bag', 'watch'],
  'glass': ['earring', 'necklace'],
  'glasses': ['earring', 'necklace'],
  'hat': ['sunglass', 'scarf', 'bag', 'jacket'],
  'cap': ['tee', 'hoodie', 'sneaker'],
  'beanie': ['jacket', 'coat', 'sweater'],
  'scarf': ['coat', 'jacket', 'boot'],
  'belt': ['jean', 'pant', 'shirt'],
  'bag': ['shoe', 'sunglass', 'watch'],
  'accessory': ['shirt', 'pant', 'shoe'],
  'accessories': ['shirt', 'pant', 'shoe'],
};

function normalizeType(type: string): string {
  // Lowercase + trim + map common Spanish nouns to canonical English keys.
  // Note: we no longer strip a trailing 's' aggressively — many product types
  // are inherently plural ("pants", "shoes", "earrings", "BOTTOMS") and the
  // map now has both singular AND plural forms registered.
  return type.toLowerCase().trim()
    .replace(/^(camiseta|camisa|pantalón|pantalon|vestido|falda|chaqueta|abrigo|zapato|bota|bolso|gafa|sombrero|anillo|pendiente|collar|pulsera|reloj).*/, (m) => {
      const map: Record<string, string> = {
        camiseta: 't-shirt', camisa: 'shirt', pantalón: 'pants', pantalon: 'pants',
        vestido: 'dress', falda: 'skirt', chaqueta: 'jacket', abrigo: 'coat',
        zapato: 'shoes', bota: 'boots', bolso: 'bag', gafa: 'glasses',
        sombrero: 'hat', anillo: 'ring', pendiente: 'earrings', collar: 'necklace',
        pulsera: 'bracelet', reloj: 'watch',
      };
      return map[m] || m;
    });
}

function getComplementaryTypes(productType: string): string[] {
  const normalized = normalizeType(productType);
  // Bidirectional substring match — the product_type might be more specific
  // than our map key (e.g. "harem shorts" → matches "shorts") OR the map key
  // might be more specific than the product_type (e.g. product "pants" with
  // map key "pants"). Either direction counts as a hit.
  for (const [key, values] of Object.entries(CROSS_SELL_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) return values;
  }
  // Default: recommend anything from a different type
  return [];
}

export async function fetchRecommendations(
  shopDomain: string,
  currentProductType: string,
  limit: number = 3,
  storefrontToken?: string | null,
): Promise<RecommendedProduct[]> {
  if (!shopDomain) return [];

  // Path A — Storefront API (works even on password-gated dev/pre-launch stores).
  // Used when the merchant has pasted a Storefront access token in /partners.
  let products: any[] = [];
  if (storefrontToken) {
    try {
      const { fetchProductsViaStorefront } = await import('./shopifyStorefront');
      const sf = await fetchProductsViaStorefront(shopDomain, storefrontToken, 50);
      if (sf.ok && sf.products.length > 0) {
        products = sf.products;
      }
    } catch { /* fall through to public */ }
  }

  // Path B — public /products.json (works only on stores without password protection).
  if (products.length === 0) {
    try {
      const url = `https://${shopDomain}/products.json?limit=50`;
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return [];
      const data = await res.json();
      products = data.products || [];
    } catch {
      return [];
    }
  }

  // Wrap the rest of the original scoring loop so the existing closure stays valid.
  try {

    const complementaryTypes = getComplementaryTypes(currentProductType);

    // Score products by how well they match complementary types
    const scored = products
      .filter((p: any) => p.images?.length > 0)
      .map((p: any) => {
        const pType = normalizeType(p.product_type || '');
        const pTitle = (p.title || '').toLowerCase();
        const pTags = (p.tags || '').toLowerCase();

        let score = 0;
        for (const ct of complementaryTypes) {
          if (pType.includes(ct)) score += 10;
          if (pTitle.includes(ct)) score += 5;
          if (pTags.includes(ct)) score += 3;
        }

        // Penalize same type
        if (pType === normalizeType(currentProductType)) score -= 20;

        return {
          id: p.id,
          variantId: p.variants?.[0]?.id ? String(p.variants[0].id) : undefined,
          title: p.title,
          image: p.images[0]?.src || '',
          url: `https://${shopDomain}/products/${p.handle}`,
          price: p.variants?.[0]?.price || '0.00',
          productType: p.product_type || '',
          score,
        };
      })
      .filter((p: any) => p.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, limit);

    // If no scored results, return random products of different type
    if (scored.length === 0) {
      const currentNorm = normalizeType(currentProductType);
      return products
        .filter((p: any) =>
          p.images?.length > 0 &&
          normalizeType(p.product_type || '') !== currentNorm
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, limit)
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

    return scored;
  } catch {
    return [];
  }
}

// Personalized compliments based on what was tried on
const COMPLIMENTS = {
  en: {
    clothing: [
      'Great choice! This style really suits your body shape.',
      'This looks amazing on you! The fit is perfect.',
      'Wow, this really complements your complexion.',
      'You have a great eye for style! This piece works beautifully.',
    ],
    jewelry: [
      'This jewelry really enhances your features!',
      'Beautiful choice! This piece adds the perfect touch.',
      'Stunning! This really catches the light on you.',
    ],
    general: [
      'Looks great on you!',
      'Nice choice! This really suits you.',
      'Perfect fit! You have great taste.',
    ],
  },
  es: {
    clothing: [
      '¡Qué bien te queda! Este estilo favorece tu silueta.',
      '¡Te queda increíble! El corte es perfecto para ti.',
      '¡Wow! Este color complementa muy bien tu tono de piel.',
      '¡Tienes buen ojo! Esta prenda te sienta de maravilla.',
    ],
    jewelry: [
      '¡Esta joya realza tus rasgos!',
      '¡Preciosa elección! Aporta el toque perfecto.',
      '¡Impresionante! La luz le queda genial en ti.',
    ],
    general: [
      '¡Te queda genial!',
      '¡Buena elección! Te sienta muy bien.',
      '¡Perfecto! Tienes muy buen gusto.',
    ],
  },
};

export function getCompliment(productType: string, lang: string): string {
  const l = lang === 'es' ? 'es' : 'en';
  const norm = normalizeType(productType);

  let pool: string[];
  if (['ring', 'earring', 'necklace', 'bracelet', 'watch'].some(j => norm.includes(j))) {
    pool = COMPLIMENTS[l].jewelry;
  } else if (norm) {
    pool = COMPLIMENTS[l].clothing;
  } else {
    pool = COMPLIMENTS[l].general;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

export function getCrossSellMessage(productType: string, recommendedType: string, lang: string): string {
  const es = lang === 'es';
  const norm = normalizeType(productType);
  const recNorm = normalizeType(recommendedType);

  if (['ring', 'earring', 'necklace', 'bracelet'].some(j => norm.includes(j))) {
    return es
      ? `Completa tu look con estos accesorios que combinan perfecto:`
      : `Complete your look with these matching accessories:`;
  }

  return es
    ? `También te podría interesar combinar con:`
    : `You might also like to pair it with:`;
}
