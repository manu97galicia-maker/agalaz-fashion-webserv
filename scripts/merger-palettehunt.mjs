// Simulate a hypothetical merger with palettehunt.com.
//
// A merger from an SEO perspective = take the smaller domain's keywords +
// backlinks + traffic and 301-redirect everything to the canonical (agalaz).
// The receiving domain absorbs the authority signals and Google passes ~85-95%
// of the link equity through permanent redirects.
//
// What this script does:
//   1. Fetch palettehunt.com domain overview (US + ES + global) — visits,
//      keyword count, position distribution, traffic value
//   2. Fetch top 100 ranking keywords (so we know what content overlap exists)
//   3. Fetch backlinks summary (referring domains, anchor texts)
//   4. Project the combined entity:
//      - Sum of organic traffic (immediate post-merger)
//      - Authority boost effect on agalaz's existing 93 buried URLs
//      - Realistic mid-term: which agalaz URLs would benefit most

import fs from 'fs';

function loadEnvLocal() {
  const file = '.env.local';
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key]) continue;
    let val = raw.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[key] = val;
  }
}
loadEnvLocal();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

async function dfs(endpoint, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(`${endpoint}: ${json.status_message}`);
  return json.tasks?.[0]?.result?.[0] ?? null;
}

const TARGET = 'palettehunt.com';

console.log(`\n=== ANALYZING ${TARGET} ===\n`);

// 1. Domain rank overview — multiple countries
const COUNTRIES = [
  { code: 2840, label: 'US', lang: 'en' },
  { code: 2826, label: 'GB', lang: 'en' },
  { code: 2724, label: 'ES', lang: 'es' },
  { code: 2250, label: 'FR', lang: 'fr' },
  { code: 2076, label: 'BR', lang: 'pt' },
  { code: 2380, label: 'IT', lang: 'it' },
  { code: 2276, label: 'DE', lang: 'de' },
];

console.log('1. ORGANIC TRAFFIC BY COUNTRY\n');
console.log('  country  visits/mo  keywords  pos1  pos2-3  pos4-10  pos11-30  pos31-100  $traffic/mo');
let totalVisits = 0, totalKws = 0, totalPos1 = 0, totalPos23 = 0, totalPos410 = 0, totalPos1130 = 0, totalPos31100 = 0;
const byCountry = [];
for (const c of COUNTRIES) {
  try {
    const r = await dfs('dataforseo_labs/google/domain_rank_overview/live', [{ target: TARGET, location_code: c.code, language_code: c.lang }]);
    const m = r?.items?.[0]?.metrics?.organic;
    if (!m) { console.log(`  ${c.label}: no data`); continue; }
    byCountry.push({ country: c.label, ...m });
    const visits = m.etv ?? 0;
    totalVisits += visits;
    totalKws += m.count ?? 0;
    totalPos1 += m.pos_1 ?? 0;
    totalPos23 += m.pos_2_3 ?? 0;
    totalPos410 += m.pos_4_10 ?? 0;
    totalPos1130 += m.pos_11_30 ?? 0;
    totalPos31100 += m.pos_31_100 ?? 0;
    console.log(`  ${c.label.padEnd(7)}  ${visits.toFixed(0).padStart(8)}  ${(m.count ?? 0).toString().padStart(8)}  ${(m.pos_1 ?? 0).toString().padStart(4)}  ${(m.pos_2_3 ?? 0).toString().padStart(6)}  ${(m.pos_4_10 ?? 0).toString().padStart(7)}  ${(m.pos_11_30 ?? 0).toString().padStart(8)}  ${(m.pos_31_100 ?? 0).toString().padStart(9)}  $${(m.estimated_paid_traffic_cost ?? 0).toFixed(0)}`);
  } catch (e) {
    console.log(`  ${c.label}: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 250));
}
console.log(`\n  TOTAL:   ${totalVisits.toFixed(0).padStart(8)}/mo organic, ${totalKws} keywords across 7 markets`);
console.log(`  Position split: ${totalPos1}×#1, ${totalPos23}×#2-3, ${totalPos410}×#4-10, ${totalPos1130}×#11-30, ${totalPos31100}×#31-100`);

// 2. Top ranking keywords
console.log('\n\n2. TOP 25 KEYWORDS (US market)\n');
try {
  const r = await dfs('dataforseo_labs/google/ranked_keywords/live', [{
    target: TARGET, location_code: 2840, language_code: 'en',
    limit: 25, order_by: ['ranked_serp_element.serp_item.etv,desc'],
  }]);
  const items = r?.items ?? [];
  console.log('  pos  vol/mo  visits  intent          keyword');
  for (const it of items.slice(0, 25)) {
    const kw = it.keyword_data?.keyword || '';
    const vol = it.keyword_data?.keyword_info?.search_volume ?? 0;
    const intent = it.keyword_data?.search_intent_info?.main_intent ?? '';
    const pos = it.ranked_serp_element?.serp_item?.rank_absolute ?? 0;
    const etv = it.ranked_serp_element?.serp_item?.etv ?? 0;
    console.log(`  ${pos.toString().padStart(3)}  ${vol.toString().padStart(6)}  ${etv.toFixed(0).padStart(6)}  ${intent.padEnd(15)} ${kw}`);
  }
} catch (e) {
  console.log(`  FAIL: ${e.message.slice(0, 80)}`);
}

// 3. Backlinks summary
console.log('\n\n3. BACKLINKS SUMMARY\n');
try {
  const res = await fetch('https://api.dataforseo.com/v3/backlinks/summary/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ target: TARGET, internal_list_limit: 10, backlinks_filters: ['dofollow', '=', 'true'] }]) });
  const json = await res.json();
  const r = json.tasks?.[0]?.result?.[0];
  if (r) {
    console.log(`  Total backlinks:          ${r.backlinks ?? 'n/a'}`);
    console.log(`  Referring domains:        ${r.referring_domains ?? 'n/a'}`);
    console.log(`  Referring main domains:   ${r.referring_main_domains ?? 'n/a'}`);
    console.log(`  Referring pages:          ${r.referring_pages ?? 'n/a'}`);
    console.log(`  Anchor diversity:         ${r.referring_links_types ? JSON.stringify(r.referring_links_types).slice(0, 100) : 'n/a'}`);
    console.log(`  Rank (DataForSEO scale):  ${r.rank ?? 'n/a'} (similar to MOZ DA)`);
  } else {
    console.log('  No backlink data available');
  }
} catch (e) {
  console.log(`  FAIL: ${e.message.slice(0, 80)}`);
}

// 4. Same for agalaz.com for comparison
console.log('\n\n4. AGALAZ.COM COMPARISON\n');
try {
  const res = await fetch('https://api.dataforseo.com/v3/backlinks/summary/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ target: 'agalaz.com', internal_list_limit: 10, backlinks_filters: ['dofollow', '=', 'true'] }]) });
  const json = await res.json();
  const r = json.tasks?.[0]?.result?.[0];
  if (r) {
    console.log(`  Total backlinks:          ${r.backlinks ?? 'n/a'}`);
    console.log(`  Referring domains:        ${r.referring_domains ?? 'n/a'}`);
    console.log(`  Referring main domains:   ${r.referring_main_domains ?? 'n/a'}`);
    console.log(`  Rank:                     ${r.rank ?? 'n/a'}`);
  }
} catch (e) {
  console.log(`  FAIL: ${e.message.slice(0, 80)}`);
}

// 5. Save raw
fs.writeFileSync('tmp/palettehunt-merger.json', JSON.stringify({ byCountry, totalVisits, totalKws, totalPos1, totalPos23, totalPos410, totalPos1130, totalPos31100 }, null, 2));
console.log('\nWrote tmp/palettehunt-merger.json');
