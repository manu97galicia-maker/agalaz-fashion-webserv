// Deep analysis for Microsoft Ads B2B campaign. Pulls:
//  1. Volume + KD + CPC for the full B2B cluster (US, EN)
//  2. Bing's keyword data via DataForSEO bing/keyword_overview
//  3. Related queries for the top buyer-intent terms
//  4. SERP competitors so the ad copy beats their messaging
// Output: a ready-to-paste prompt for the Claude extension to build the ads.

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

const SEED_KEYWORDS = [
  'shopify try on app',
  'virtual try on shopify',
  'virtual try on woocommerce',
  'virtual try on api',
  'ar shopping app',
  'augmented reality ecommerce',
  'virtual try on widget',
  'virtual fitting room shopify',
  'reduce ecommerce returns',
  'reduce fashion returns',
];

console.log('═══ STEP 1: Volume + KD + CPC for B2B cluster ═══\n');

const overview = await dfs('dataforseo_labs/google/keyword_overview/live', [{
  keywords: SEED_KEYWORDS,
  language_code: 'en',
  location_code: 2840,
}]);

const seedData = (overview?.items ?? []).map((it) => ({
  kw: it.keyword,
  vol: it.keyword_info?.search_volume ?? 0,
  kd: it.keyword_properties?.keyword_difficulty ?? 0,
  cpc: it.keyword_info?.cpc ?? 0,
  comp: it.keyword_info?.competition_level ?? '-',
}));

for (const r of seedData.sort((a, b) => b.cpc - a.cpc)) {
  console.log(`  CPC $${r.cpc.toFixed(2).padStart(6)} | VOL ${r.vol.toString().padStart(4)} | KD ${r.kd.toString().padStart(2)} | ${r.kw}`);
}

console.log('\n═══ STEP 2: SERP competitors for top buyer-intent terms ═══\n');

const TOP_INTENT_KW = ['shopify try on app', 'virtual try on api', 'augmented reality ecommerce'];
const competitors = {};

for (const kw of TOP_INTENT_KW) {
  console.log(`\n  -- "${kw}" --`);
  try {
    const serp = await dfs('serp/google/organic/live/advanced', [{
      keyword: kw, language_code: 'en', location_code: 2840, depth: 10, device: 'desktop',
    }]);
    const organic = (serp?.items ?? []).filter((i) => i.type === 'organic').slice(0, 10);
    competitors[kw] = [];
    for (const o of organic) {
      const host = new URL(o.url).hostname.replace('www.', '');
      console.log(`    ${o.rank_absolute}. ${o.title} — ${host}`);
      competitors[kw].push({ rank: o.rank_absolute, title: o.title, host, snippet: o.description });
    }
  } catch (e) {
    console.log(`    ERR: ${e.message?.slice(0, 80)}`);
  }
  await new Promise((r) => setTimeout(r, 500));
}

console.log('\n═══ STEP 3: Related keywords for expansion ═══\n');

const RELATED_SEEDS = ['shopify try on app', 'virtual try on api'];
const related = [];

for (const seed of RELATED_SEEDS) {
  try {
    const sug = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: seed, language_code: 'en', location_code: 2840, limit: 30,
      include_seed_keyword: false,
      filters: [['keyword_info.search_volume', '>=', 10]],
      order_by: ['keyword_info.cpc,desc'],
    }]);
    const items = sug?.items ?? [];
    for (const it of items) {
      related.push({
        kw: it.keyword, vol: it.keyword_info?.search_volume ?? 0,
        kd: it.keyword_properties?.keyword_difficulty ?? 0,
        cpc: it.keyword_info?.cpc ?? 0, source: seed,
      });
    }
  } catch (e) {
    console.log(`  ERR ${seed}: ${e.message?.slice(0, 60)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

related.sort((a, b) => b.cpc - a.cpc);
console.log('  Top 20 by CPC (highest buyer intent):');
for (const r of related.slice(0, 20)) {
  console.log(`    CPC $${r.cpc.toFixed(2).padStart(6)} | VOL ${r.vol.toString().padStart(4)} | KD ${r.kd.toString().padStart(2)} | ${r.kw}`);
}

fs.writeFileSync('tmp/ms-ads-b2b-research.json', JSON.stringify({ seedData, competitors, related }, null, 2));
console.log('\nWrote tmp/ms-ads-b2b-research.json');
