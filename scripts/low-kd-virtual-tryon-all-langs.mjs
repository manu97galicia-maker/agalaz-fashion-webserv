// Low-KD virtual-try-on keywords across EN, FR, DE, IT (ES + PT already done).
// Filter: KD <= 5, vol >= 100/mo. Output ranked by (KD asc, vol desc).

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

const SEEDS = [
  // EN
  ['virtual try on',           'en', 2840, 'US'],
  ['virtual try on glasses',   'en', 2840, 'US'],
  ['virtual hairstyle try on', 'en', 2840, 'US'],
  ['ai try on clothes',        'en', 2840, 'US'],
  ['virtual makeup try on',    'en', 2840, 'US'],
  ['try on clothes online',    'en', 2826, 'UK'],
  // FR
  ['essayage virtuel',         'fr', 2250, 'FR'],
  ['essayage virtuel lunettes','fr', 2250, 'FR'],
  ['essayer vetement virtuel', 'fr', 2250, 'FR'],
  ['simulateur coupe cheveux', 'fr', 2250, 'FR'],
  // DE
  ['virtuelle anprobe',        'de', 2276, 'DE'],
  ['brille virtuell anprobieren', 'de', 2276, 'DE'],
  ['kleider virtuell anprobieren','de', 2276, 'DE'],
  ['frisuren virtuell testen', 'de', 2276, 'DE'],
  // IT
  ['prova virtuale',           'it', 2380, 'IT'],
  ['provare occhiali online',  'it', 2380, 'IT'],
  ['provare vestiti virtualmente','it', 2380, 'IT'],
  ['simulatore taglio capelli','it', 2380, 'IT'],
];

const KD_MAX = 5;
const VOL_MIN = 100;

const all = new Map();

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
      const key = `${lang}::${market}::${kw}`;
      if (all.has(key)) continue;
      all.set(key, { kw, vol, kd, cpc, lang, market, seed });
      added++;
    }
    console.log(`  +${added} new (cluster size: ${items.length})`);
  } catch (e) {
    console.log(`  ERR: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

const ranked = [...all.values()].sort((a, b) => {
  if (a.kd !== b.kd) return a.kd - b.kd;
  return b.vol - a.vol;
});

console.log('\n\n══════════ LOW-KD VIRTUAL TRY-ON (EN/FR/DE/IT) ══════════');
console.log(`Filter: KD <= ${KD_MAX}, vol >= ${VOL_MIN}/mo`);
console.log(`Total unique keywords: ${ranked.length}`);
console.log(`Total volume: ${ranked.reduce((s, k) => s + k.vol, 0).toLocaleString()}/mo`);

console.log('\n  KD  VOL      MKT  KEYWORD');
console.log('  ──  ───────  ───  ─────────────────────────────────────');
for (const k of ranked.slice(0, 100)) {
  console.log(`  ${k.kd.toString().padStart(2)}  ${k.vol.toString().padStart(7)}  ${k.market.padEnd(3)}  ${k.kw}`);
}

console.log('\n── By market ──');
const byMarket = {};
for (const k of ranked) { byMarket[k.market] = (byMarket[k.market] || 0) + k.vol; }
for (const [m, v] of Object.entries(byMarket)) {
  console.log(`  ${m}: ${v.toLocaleString()} vol/mo · ${ranked.filter(k => k.market === m).length} keywords`);
}

fs.writeFileSync('tmp/low-kd-virtual-tryon-all-langs.json', JSON.stringify(ranked, null, 2));
console.log('\nWrote tmp/low-kd-virtual-tryon-all-langs.json');
console.log('Done.');
