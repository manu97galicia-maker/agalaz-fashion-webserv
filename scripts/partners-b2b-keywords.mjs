// Pull volume + KD for the B2B / Shopify / partners side of Agalaz.
// Covers virtual try-on widgets, AR commerce apps, returns-reduction
// SaaS, and platform-specific integrations.

import fs from 'fs';
function loadEnv() {
  const f = '.env.local';
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)$/);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

async function dfs(endpoint, body) {
  const r = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.status_code !== 20000) throw new Error(j.status_message);
  return j.tasks?.[0]?.result?.[0];
}

const KEYWORDS = [
  // Shopify integration
  'virtual try on shopify',
  'shopify virtual try on app',
  'shopify ar try on',
  'shopify try on app',
  'best shopify try on app',
  'virtual fitting room shopify',
  'ar shopify app',
  'augmented reality shopify',
  // WooCommerce
  'virtual try on woocommerce',
  'woocommerce try on plugin',
  'fashion plugin woocommerce',
  // BigCommerce / Wix / Squarespace
  'virtual try on bigcommerce',
  'virtual try on wix',
  // Use-case driven (purchase intent for store owners)
  'how to reduce ecommerce returns',
  'reduce returns shopify',
  'fashion ecommerce returns',
  'reduce fashion returns',
  'increase conversion rate fashion',
  'ecommerce conversion optimization fashion',
  'reduce online clothing returns',
  // Generic B2B try-on widgets
  'virtual try on widget',
  'virtual try on api',
  'virtual try on saas',
  'ai try on widget',
  'ai try on api',
  'try on widget ecommerce',
  'ar try on api',
  // AR / VR commerce
  'ar commerce platform',
  'augmented reality ecommerce',
  'ar shopping app',
  'vr try on',
  // Generic comparison terms (high commercial intent)
  'best virtual try on for ecommerce',
  'virtual try on solution',
  'virtual try on for retailers',
  'virtual try on for stores',
  // Industry specific
  'virtual try on jewelry shopify',
  'virtual try on glasses shopify',
  'virtual try on clothing api',
  'virtual try on makeup api',
];

console.log(`Fetching ${KEYWORDS.length} B2B keywords...`);

const overview = await dfs('dataforseo_labs/google/keyword_overview/live', [{
  keywords: KEYWORDS,
  language_code: 'en',
  location_code: 2840,
}]);

const items = overview?.items ?? [];
const results = [];
for (const it of items) {
  results.push({
    kw: it.keyword,
    vol: it.keyword_info?.search_volume ?? 0,
    kd: it.keyword_properties?.keyword_difficulty ?? 0,
    cpc: it.keyword_info?.cpc ?? 0,
    comp: it.keyword_info?.competition_level ?? '-',
  });
}
results.sort((a, b) => b.vol - a.vol);

console.log('\n══════════════════════════════════════════════════════════════════════════');
console.log('  KD   VOL/MO    CPC$   COMP   TOP1(28%)  TOP3(5%)   KEYWORD');
console.log('══════════════════════════════════════════════════════════════════════════');
let totalVol = 0;
for (const r of results) {
  if (r.vol === 0) continue;
  totalVol += r.vol;
  console.log(`  ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(7)}  ${r.cpc.toFixed(2).padStart(5)}  ${r.comp.padEnd(5)}  ${Math.round(r.vol * 0.28).toString().padStart(7)}    ${Math.round(r.vol * 0.05).toString().padStart(5)}    ${r.kw}`);
}
console.log('══════════════════════════════════════════════════════════════════════════');
const top1 = Math.round(totalVol * 0.28);
const top3 = Math.round(totalVol * 0.05);
console.log(`  TOTAL: ${totalVol.toLocaleString()} vol/mo`);
console.log(`  Top 1 capture: ${top1.toLocaleString()}/mo = ${Math.round(top1 / 30).toLocaleString()}/day`);
console.log(`  Top 3 capture:  ${top3.toLocaleString()}/mo = ${Math.round(top3 / 30).toLocaleString()}/day`);

// CPC = commercial intent indicator. B2B keywords with CPC > $2 = high-intent buyers
const highCpc = results.filter((r) => r.cpc >= 2 && r.vol > 0).sort((a, b) => b.cpc - a.cpc);
console.log(`\n  HIGH-INTENT (CPC ≥ $2 = real buyers searching):`);
for (const r of highCpc.slice(0, 15)) {
  console.log(`    $${r.cpc.toFixed(2)}  ${r.vol.toString().padStart(5)}/mo  KD ${r.kd}  ${r.kw}`);
}

fs.writeFileSync('tmp/partners-b2b-keywords.json', JSON.stringify(results, null, 2));
console.log('\nWrote tmp/partners-b2b-keywords.json');
