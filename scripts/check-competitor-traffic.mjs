// Get organic traffic estimate for competitor domains + find cosplay
// Spanish-market keywords agalaz could target.

import fs from 'fs';
import path from 'path';

function loadEnvLocal() {
  const file = path.join(process.cwd(), '.env.local');
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

// ── 1. Traffic estimate per competitor ──────────────────────────────────────
const COMPETITORS = ['cosplayworld.top', 'laguaridadeharley.com'];

async function domainOverview(target, location = 2724, lang = 'es') {
  const body = [{ target, location_code: location, language_code: lang }];
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/domain_rank_overview/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  return json.tasks?.[0]?.result?.[0]?.items?.[0] ?? null;
}

console.log('=== COMPETITOR ORGANIC TRAFFIC (ES) ===\n');
for (const d of COMPETITORS) {
  const o = await domainOverview(d);
  if (!o) { console.log(`${d}: no data`); continue; }
  const metrics = o.metrics?.organic;
  console.log(`${d}`);
  console.log(`  Estimated organic visits/mo:  ${metrics?.etv?.toFixed(0) || 'n/a'}`);
  console.log(`  Total ranking keywords:        ${metrics?.count?.toFixed(0) || 'n/a'}`);
  console.log(`  Top 3 positions:               ${metrics?.pos_1?.toFixed(0)} (#1) / ${metrics?.pos_2_3?.toFixed(0)} (#2-3) / ${metrics?.pos_4_10?.toFixed(0)} (#4-10)`);
  console.log(`  Estimated traffic value:       $${metrics?.estimated_paid_traffic_cost?.toFixed(0) || 0}/mo\n`);
  await new Promise((r) => setTimeout(r, 400));
}

// Also do MX + global EN to cross-check
console.log('=== CROSS-CHECK MX (es 2484) ===\n');
for (const d of COMPETITORS) {
  const o = await domainOverview(d, 2484, 'es');
  if (!o) { console.log(`${d}: no data`); continue; }
  const metrics = o.metrics?.organic;
  console.log(`${d} (MX): ${metrics?.etv?.toFixed(0) || 0} visits/mo, ${metrics?.count?.toFixed(0) || 0} keywords`);
  await new Promise((r) => setTimeout(r, 400));
}

// ── 2. Find powerful Spanish cosplay keywords ───────────────────────────────
console.log('\n\n=== SPANISH COSPLAY KEYWORD OPPORTUNITIES ===\n');

const SEEDS = [
  { seed: 'cosplay',                lang: 'es', loc: 2724 },
  { seed: 'disfraz halloween',      lang: 'es', loc: 2724 },
  { seed: 'disfraces',              lang: 'es', loc: 2724 },
  { seed: 'cosplay barato',         lang: 'es', loc: 2724 },
  { seed: 'tienda cosplay',         lang: 'es', loc: 2724 },
  { seed: 'cosplay anime',          lang: 'es', loc: 2724 },
  { seed: 'cosplay genshin',        lang: 'es', loc: 2724 },
  // Cross to MX/LATAM
  { seed: 'cosplay',                lang: 'es', loc: 2484 },
  { seed: 'disfraz halloween',      lang: 'es', loc: 2484 },
];

async function fetchSuggestions({ seed, lang, loc }) {
  const body = [{
    keyword: seed, language_code: lang, location_code: loc, limit: 100, include_seed_keyword: true,
    filters: [['keyword_info.search_volume', '>=', 500], 'and', ['keyword_properties.keyword_difficulty', '<=', 15]],
    order_by: ['keyword_info.search_volume,desc'],
  }];
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

const all = [];
for (const s of SEEDS) {
  process.stdout.write(`[loc:${s.loc}] ${s.seed.padEnd(25)} `);
  try {
    const items = await fetchSuggestions(s);
    for (const it of items) {
      all.push({
        keyword: it.keyword, loc: s.loc,
        volume: it.keyword_info?.search_volume ?? 0,
        difficulty: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent || '',
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) { console.log(`FAIL: ${e.message.slice(0, 40)}`); }
  await new Promise((r) => setTimeout(r, 300));
}

const dedup = new Map();
for (const r of all) {
  const k = `${r.loc}|${r.keyword.toLowerCase()}`;
  if (!dedup.has(k) || dedup.get(k).volume < r.volume) dedup.set(k, r);
}
const rows = [...dedup.values()];
rows.sort((a, b) => b.volume - a.volume);

const LOC = { 2724: 'ES', 2484: 'MX' };
console.log('\n--- TOP 30 by volume ---');
for (const r of rows.slice(0, 30)) {
  console.log(`  ${LOC[r.loc]} ${r.volume.toString().padStart(6)}  kd:${r.difficulty.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.keyword}`);
}

fs.writeFileSync('tmp/cosplay-es-opportunities.csv',
  ['keyword,location,volume,kd,intent', ...rows.map((r) => `"${r.keyword}",${r.loc},${r.volume},${r.difficulty},${r.intent}`)].join('\n'));
console.log(`\nWrote tmp/cosplay-es-opportunities.csv (${rows.length} keywords)`);
