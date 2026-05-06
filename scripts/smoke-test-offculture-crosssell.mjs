// Validates the updated cross-sell taxonomy against the LIVE offculturee.com
// catalog. Pulls /products.json, then for each test product_type computes
// recommendations using the same scoring algorithm the production service uses.
//
// Uses an inlined copy of CROSS_SELL_MAP / normalizeType / scoring to avoid
// the .ts→.mjs import friction. Keep this in sync with services/crossSell.ts.

const SHOP = 'offculturee.com';

const CROSS_SELL_MAP = {
  // Tops & upper body
  'top': ['pant', 'bottom', 'jean', 'short', 'skirt', 'shoe', 'boot'],
  'tops': ['pant', 'bottom', 'jean', 'short', 'skirt', 'shoe', 'boot'],
  'shirt': ['pant', 'bottom', 'jean', 'short', 'skirt', 'shoe', 'jacket'],
  't-shirt': ['pant', 'bottom', 'jean', 'short', 'jacket', 'sneaker'],
  'tee': ['pant', 'bottom', 'jean', 'short', 'jacket', 'sneaker'],
  'sweater': ['pant', 'jean', 'skirt', 'boot'],
  'hoodie': ['pant', 'jean', 'jogger', 'short', 'sneaker'],
  // Outerwear
  'jacket': ['pant', 'bottom', 'jean', 'shirt', 'top', 'tee'],
  'jackets': ['pant', 'bottom', 'jean', 'shirt', 'top', 'tee'],
  'coat': ['pant', 'jean', 'boot', 'scarf', 'glove'],
  'blazer': ['pant', 'shirt', 'tie', 'shoe'],
  // Bottoms
  'pant': ['shirt', 'top', 'tee', 'sweater', 'hoodie', 'jacket'],
  'pants': ['shirt', 'top', 'tee', 'sweater', 'hoodie', 'jacket'],
  'bottom': ['top', 'shirt', 'tee', 'sweater', 'hoodie', 'jacket'],
  'bottoms': ['top', 'shirt', 'tee', 'sweater', 'hoodie', 'jacket'],
  'jean': ['shirt', 'top', 'tee', 'jacket', 'sweater', 'sneaker'],
  'jeans': ['shirt', 'top', 'tee', 'jacket', 'sweater', 'sneaker'],
  'short': ['tee', 'top', 'shirt', 'tank', 'sneaker'],
  'shorts': ['tee', 'top', 'shirt', 'tank', 'sneaker'],
  'skirt': ['top', 'shirt', 'sweater', 'boot'],
  // Footwear
  'shoe': ['bag', 'sock', 'belt', 'jean', 'pant'],
  'shoes': ['bag', 'sock', 'belt', 'jean', 'pant'],
  'boot': ['jacket', 'coat', 'jean', 'pant'],
  'boots': ['jacket', 'coat', 'jean', 'pant'],
  // Accessories / jewelry (pieces cross-sell to other jewelry pieces)
  'ring': ['earring', 'necklace', 'bracelet', 'pendant'],
  'rings': ['earring', 'necklace', 'bracelet', 'pendant'],
  'earring': ['necklace', 'ring', 'bracelet', 'pendant'],
  'earrings': ['necklace', 'ring', 'bracelet', 'pendant'],
  'necklace': ['earring', 'ring', 'bracelet', 'pendant'],
  'pendant': ['necklace', 'earring', 'ring', 'bracelet'],
  'pendants': ['necklace', 'earring', 'ring', 'bracelet'],
  'bracelet': ['ring', 'necklace', 'earring', 'pendant'],
  'jewelry': ['ring', 'necklace', 'earring', 'pendant', 'bracelet'],
  'outerwear': ['pant', 'bottom', 'jean', 'shirt', 'top', 'tee', 'boot'],
  'hat': ['sunglass', 'scarf', 'bag', 'jacket'],
  'bag': ['shoe', 'sunglass', 'watch'],
  'accessories': ['shirt', 'pant', 'shoe'],
};

function normalizeType(type) {
  return (type || '').toLowerCase().trim();
}

function getComplementaryTypes(productType) {
  const normalized = normalizeType(productType);
  for (const [key, values] of Object.entries(CROSS_SELL_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) return values;
  }
  return [];
}

async function fetchProducts() {
  const res = await fetch(`https://${SHOP}/products.json?limit=50`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { products } = await res.json();
  return products;
}

function rankRecommendations(products, currentType, limit = 4) {
  const complementary = getComplementaryTypes(currentType);
  const currentNorm = normalizeType(currentType);

  const scored = products
    .filter((p) => p.images?.length > 0)
    .map((p) => {
      const pType = normalizeType(p.product_type || '');
      const pTitle = (p.title || '').toLowerCase();
      const pTags = (p.tags || []).join(' ').toLowerCase();
      let score = 0;
      for (const ct of complementary) {
        if (pType.includes(ct)) score += 10;
        if (pTitle.includes(ct)) score += 5;
        if (pTags.includes(ct)) score += 3;
      }
      if (pType === currentNorm) score -= 20;
      return { id: p.id, title: p.title, type: p.product_type, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

// Test ALL real product_types present in the offculture catalog + the
// streetwear taxonomies a customer might land on from elsewhere.
const TEST_TYPES = ['BOTTOMS', 'TOP', 'PENDANT', 'RINGS', 'JACKETS', 'HOODIES', 'BOOTS', 'OUTERWEAR'];

const products = await fetchProducts();
console.log(`Catalog: ${products.length} products from ${SHOP}\n`);

const typesPresent = [...new Set(products.map((p) => p.product_type).filter(Boolean))];
console.log(`Product types in catalog: ${typesPresent.join(', ')}\n`);

for (const type of TEST_TYPES) {
  console.log(`\n--- query: product_type = "${type}" ---`);
  const complementary = getComplementaryTypes(type);
  console.log(`  Looking for: [${complementary.join(', ')}]`);
  const recs = rankRecommendations(products, type, 4);
  if (recs.length === 0) {
    console.log(`  ✗ ZERO recommendations`);
  } else {
    console.log(`  ✓ ${recs.length} recommendations:`);
    recs.forEach((r, i) => {
      console.log(`     ${i + 1}. score=${r.score}  [${r.type}]  ${r.title}`);
    });
  }
}

console.log('\nDone.');
