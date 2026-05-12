// Schema audit — for each URL in our sitemap, fetch the page HTML and
// verify which JSON-LD schemas are present. The 3 we care about for
// Google rich-results visibility: Article, FAQPage, BreadcrumbList.

import fs from 'fs';

const URLS = [
  // Top 5 high-volume targets to expand later (priority)
  '/wedding-guest-outfit', '/es/vestido-invitada-boda', '/halloween-couples-costumes',
  '/bridesmaid-dress-try-on', '/es/simulador-tatuaje',
  // Currently-ranking URLs (top 21)
  '/virtual-baby-clothing-try-on', '/es/probador-cosplay', '/pt/provador-cosplay',
  '/virtual-cosplay-try-on', '/es/probador-pendientes', '/es/probador-unas',
  '/fr/essayage-bikini', '/es/probador-joyas', '/es/probador-bikini',
  '/realistic-swimwear-try-on', '/virtual-nail-try-on',
  '/virtual-mens-suit-try-on', '/virtual-earring-try-on', '/es/probador-gafas',
  // Round 3-5 new landings (need verification they have schema)
  '/fr/coupe-cheveux-visage-rond', '/pt/corte-cabelo-rosto-redondo',
  '/pt/unhas-curtas-ideias', '/it/unghie-corte-semplici', '/it/taglio-capelli-viso-tondo',
  '/es/disfraz-de-halloween', '/es/cosplay', '/es/disfraz-halloween-pareja',
  '/es/disfraces-caseros', '/es/disfraz-carnaval',
  '/curtain-bangs-haircut', '/wolf-cut-hairstyles', '/fr/carre-frange-rideau',
  // Long-tail asianic + others
  '/ja/yukata', '/ja/kimono', '/hi/lehenga', '/hi/saree', '/ar/hijab',
  '/ko/hanbok', '/zh/qipao', '/natural-makeup-look',
  '/haircut-for-oval-face', '/haircut-for-round-face', '/haircut-for-diamond-face',
  '/haircut-for-square-face', '/engagement-ring-on-which-hand',
  '/pt/look-festa-junina', '/fr/tenue-bapteme', '/it/vestito-comunione',
];

function findSchemas(html) {
  const head = html.split('</body>')[0];
  // Find all <script type="application/ld+json">...</script>
  const blocks = head.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  const types = new Set();
  for (const block of blocks) {
    const json = block.replace(/<script[^>]*>|<\/script>/gi, '').trim();
    try {
      const data = JSON.parse(json);
      const graph = data['@graph'] ?? (Array.isArray(data) ? data : [data]);
      for (const node of graph) {
        if (node['@type']) {
          if (Array.isArray(node['@type'])) node['@type'].forEach((t) => types.add(t));
          else types.add(node['@type']);
        }
      }
    } catch {}
  }
  return [...types];
}

const results = [];
for (const path of URLS) {
  try {
    const res = await fetch(`https://agalaz.com${path}`);
    if (!res.ok) {
      results.push({ url: path, status: res.status, types: [] });
      console.log(`  ${res.status}  ${path}`);
      continue;
    }
    const html = await res.text();
    const types = findSchemas(html);
    const hasArticle = types.includes('Article') || types.includes('NewsArticle') || types.includes('BlogPosting');
    const hasFaq = types.includes('FAQPage');
    const hasCrumb = types.includes('BreadcrumbList');
    const score = (hasArticle ? 1 : 0) + (hasFaq ? 1 : 0) + (hasCrumb ? 1 : 0);
    const status = score === 3 ? '✓✓✓' : score === 2 ? '✓✓·' : score === 1 ? '✓··' : '···';
    console.log(`  ${status}  ${path.padEnd(45)} ${hasArticle ? 'Art' : '   '}  ${hasFaq ? 'FAQ' : '   '}  ${hasCrumb ? 'Crumb' : '     '}`);
    results.push({ url: path, status: res.status, types, hasArticle, hasFaq, hasCrumb, score });
  } catch (e) {
    console.log(`  ERR  ${path}: ${e.message.slice(0, 50)}`);
    results.push({ url: path, error: e.message });
  }
  await new Promise((r) => setTimeout(r, 100));
}

const missing = results.filter((r) => r.score !== undefined && r.score < 3);
console.log(`\n=== ${results.length - missing.length}/${results.length} URLs have all 3 schemas ===`);
if (missing.length) {
  console.log('\nMissing one or more schemas:');
  for (const m of missing) {
    const lacks = [];
    if (!m.hasArticle) lacks.push('Article');
    if (!m.hasFaq) lacks.push('FAQPage');
    if (!m.hasCrumb) lacks.push('BreadcrumbList');
    console.log(`  ${m.url}: missing ${lacks.join(', ')}`);
  }
}

fs.writeFileSync('tmp/schema-audit.json', JSON.stringify(results, null, 2));
