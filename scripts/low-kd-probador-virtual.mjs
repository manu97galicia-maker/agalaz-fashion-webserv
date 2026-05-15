// Find low-KD (<=5) keywords related to "probador virtual" / "provador" / try-on
// with decent volume (>=100/mo). Queries 6 seed terms in ES and PT and de-dupes
// the cluster. Output ranked by (KD asc, volume desc).

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

// Seed terms covering ES + PT "probador / provador" virtual ecosystem
const SEEDS = [
  // [seed, lang, location_code, market_label]
  ['probador virtual',         'es', 2724, 'ES'],
  ['probador virtual de ropa', 'es', 2724, 'ES'],
  ['probarse ropa online',     'es', 2724, 'ES'],
  ['simulador de ropa',        'es', 2724, 'ES'],
  ['vestir muñeca online',     'es', 2724, 'ES'],
  ['provador virtual',         'pt', 2076, 'BR'],
  ['provador online',          'pt', 2076, 'BR'],
  ['simulador de roupa',       'pt', 2076, 'BR'],
  ['app para experimentar roupa', 'pt', 2076, 'BR'],
];

const KD_MAX = 5;
const VOL_MIN = 100;

const all = new Map(); // dedup by keyword

for (const [seed, lang, loc, market] of SEEDS) {
  console.log(`\n── Seed: "${seed}" (${market}) ──`);
  try {
    const result = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: seed,
      language_code: lang,
      location_code: loc,
      limit: 100,
      include_seed_keyword: true,
      filters: [
        ['keyword_info.search_volume', '>=', VOL_MIN],
        'and',
        ['keyword_properties.keyword_difficulty', '<=', KD_MAX],
      ],
      order_by: ['keyword_info.search_volume,desc'],
    }]);
    const items = result?.items ?? [];
    let added = 0;
    for (const it of items) {
      const kw = it.keyword;
      const vol = it.keyword_info?.search_volume ?? 0;
      const kd = it.keyword_properties?.keyword_difficulty ?? 0;
      const cpc = it.keyword_info?.cpc ?? 0;
      const comp = it.keyword_info?.competition_level ?? '-';
      const key = `${lang}::${kw}`;
      if (all.has(key)) continue;
      all.set(key, { kw, vol, kd, cpc, comp, lang, market, seed });
      added++;
    }
    console.log(`  +${added} new keywords (total cluster: ${items.length})`);
  } catch (e) {
    console.log(`  ERR: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

// Rank: kd asc, then vol desc
const ranked = [...all.values()].sort((a, b) => {
  if (a.kd !== b.kd) return a.kd - b.kd;
  return b.vol - a.vol;
});

console.log('\n\n══════════ LOW-KD PROBADOR VIRTUAL KEYWORDS ══════════');
console.log(`Filter: KD <= ${KD_MAX}, vol >= ${VOL_MIN}/mo`);
console.log(`Total unique keywords: ${ranked.length}`);
console.log(`Total volume captured: ${ranked.reduce((s, k) => s + k.vol, 0).toLocaleString()}/mo`);

console.log('\n  KD  VOL      CPC$   MKT  KEYWORD');
console.log('  ──  ───────  ─────  ───  ─────────────────────────────────────');
for (const k of ranked.slice(0, 80)) {
  console.log(`  ${k.kd.toString().padStart(2)}  ${k.vol.toString().padStart(7)}  ${k.cpc.toFixed(2).padStart(5)}  ${k.market.padEnd(3)}  ${k.kw}`);
}

// Group by market
console.log('\n── By market ──');
const byMarket = {};
for (const k of ranked) { byMarket[k.market] = (byMarket[k.market] || 0) + k.vol; }
for (const [m, v] of Object.entries(byMarket)) {
  console.log(`  ${m}: ${v.toLocaleString()} vol/mo across ${ranked.filter(k => k.market === m).length} keywords`);
}

fs.writeFileSync('tmp/low-kd-probador-virtual.json', JSON.stringify(ranked, null, 2));
console.log('\nWrote tmp/low-kd-probador-virtual.json');
console.log('Done.');
