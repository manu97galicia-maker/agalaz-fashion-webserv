// Volume + alternative cluster for "pet try on" + pet/dog/cat clothing niche.
// User reports pos 3 for "pet try on" with 1 impression — likely a ghost
// keyword. Find the REAL high-volume queries in this niche.

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

const EXACT_QUERIES = [
  { kw: 'pet try on',                 lang: 'en', loc: 2840 },
  { kw: 'virtual pet try on',         lang: 'en', loc: 2840 },
  { kw: 'pet clothing try on',        lang: 'en', loc: 2840 },
  { kw: 'dog clothes virtual try on', lang: 'en', loc: 2840 },
  { kw: 'virtual pet clothing',       lang: 'en', loc: 2840 },
  { kw: 'agalaz pets',                lang: 'en', loc: 2840 },
];

console.log('=== EXACT QUERY VOLUMES ===\n');
for (const q of EXACT_QUERIES) {
  process.stdout.write(`  ${q.kw.padEnd(34)} `);
  try {
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [q.kw], language_code: q.lang, location_code: q.loc }]);
    const item = ov?.items?.[0];
    const vol = item?.keyword_info?.search_volume ?? 0;
    const kd = item?.keyword_properties?.keyword_difficulty ?? 0;
    console.log(`vol:${vol.toString().padStart(5)}  kd:${kd}`);
  } catch (e) { console.log(`FAIL`); }
  await new Promise((r) => setTimeout(r, 300));
}

// Find REAL high-volume in pet niche
console.log('\n\n=== REAL high-volume EN pet/dog/cat clothing keywords ===\n');
const SEEDS = [
  { seed: 'dog clothes',     lang: 'en', loc: 2840 },
  { seed: 'cat clothes',     lang: 'en', loc: 2840 },
  { seed: 'dog costume',     lang: 'en', loc: 2840 },
  { seed: 'pet costume',     lang: 'en', loc: 2840 },
  { seed: 'dog harness',     lang: 'en', loc: 2840 },
  { seed: 'pet outfit',      lang: 'en', loc: 2840 },
  { seed: 'dog sweater',     lang: 'en', loc: 2840 },
];

const all = [];
for (const s of SEEDS) {
  process.stdout.write(`  [${s.seed}] `);
  try {
    const items = (await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: s.seed, language_code: s.lang, location_code: s.loc,
      limit: 30, include_seed_keyword: true,
      filters: [['keyword_info.search_volume', '>=', 2000], 'and', ['keyword_properties.keyword_difficulty', '<=', 20]],
      order_by: ['keyword_info.search_volume,desc'],
    }]))?.items ?? [];
    for (const it of items) {
      all.push({
        kw: it.keyword,
        vol: it.keyword_info?.search_volume ?? 0,
        kd: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent ?? '',
      });
    }
    console.log(`${items.length} hits`);
  } catch (e) { console.log(`FAIL`); }
  await new Promise((r) => setTimeout(r, 300));
}

// Dedup + sort
const dedup = new Map();
for (const r of all) {
  if (!dedup.has(r.kw) || dedup.get(r.kw).vol < r.vol) dedup.set(r.kw, r);
}
const rows = [...dedup.values()].sort((a, b) => b.vol - a.vol).slice(0, 30);

console.log('\n=== TOP 30 EN pet niche keywords with REAL volume ===\n');
console.log('  vol     kd  intent          keyword');
for (const r of rows) {
  console.log(`  ${r.vol.toString().padStart(6)} ${r.kd.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.kw}`);
}

// Also check ES + PT + IT + FR + DE pet niche
console.log('\n\n=== Per-language head terms in pet niche ===\n');
const LANG_HEADS = [
  { kw: 'ropa para perros',      lang: 'es', loc: 2724, label: 'ES' },
  { kw: 'ropa para mascotas',    lang: 'es', loc: 2724, label: 'ES' },
  { kw: 'roupa para cachorro',   lang: 'pt', loc: 2076, label: 'BR' },
  { kw: 'vestiti per cani',      lang: 'it', loc: 2380, label: 'IT' },
  { kw: 'vetements pour chien',  lang: 'fr', loc: 2250, label: 'FR' },
  { kw: 'hundebekleidung',       lang: 'de', loc: 2276, label: 'DE' },
];
for (const q of LANG_HEADS) {
  process.stdout.write(`  [${q.label}] ${q.kw.padEnd(28)} `);
  try {
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [q.kw], language_code: q.lang, location_code: q.loc }]);
    const item = ov?.items?.[0];
    const vol = item?.keyword_info?.search_volume ?? 0;
    const kd = item?.keyword_properties?.keyword_difficulty ?? 0;
    console.log(`vol:${vol.toString().padStart(6)}  kd:${kd}`);
  } catch (e) { console.log(`FAIL`); }
  await new Promise((r) => setTimeout(r, 250));
}
