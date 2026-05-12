// Find the REAL high-volume nail keywords in Spanish (ES + MX).
// The user asked about "probador de uñas online" which has ~0 volume.
// Let me find what people actually search.

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
  return j.tasks?.[0]?.result?.[0]?.items || [];
}

const SEEDS = [
  // Broader seeds with real volume potential
  { seed: 'uñas', loc: 2724, label: 'ES' },
  { seed: 'unas', loc: 2484, label: 'MX' },
  { seed: 'manicura', loc: 2724, label: 'ES' },
  { seed: 'diseño de uñas', loc: 2724, label: 'ES' },
  { seed: 'disenos de unas', loc: 2484, label: 'MX' },
  { seed: 'uñas decoradas', loc: 2724, label: 'ES' },
];

const all = [];
for (const s of SEEDS) {
  process.stdout.write(`[${s.label}] ${s.seed.padEnd(20)} `);
  try {
    const items = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: s.seed, language_code: 'es', location_code: s.loc,
      limit: 100, include_seed_keyword: true,
      filters: [['keyword_info.search_volume', '>=', 500], 'and', ['keyword_properties.keyword_difficulty', '<=', 15]],
      order_by: ['keyword_info.search_volume,desc'],
    }]);
    for (const it of items) {
      all.push({
        kw: it.keyword,
        loc: s.label,
        vol: it.keyword_info?.search_volume ?? 0,
        kd: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent ?? '',
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 60)}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}

// Dedup
const dedup = new Map();
for (const r of all) {
  const k = `${r.loc}|${r.kw}`;
  if (!dedup.has(k) || dedup.get(k).vol < r.vol) dedup.set(k, r);
}
const rows = [...dedup.values()].sort((a, b) => b.vol - a.vol);

console.log('\n=== TOP 30 SPANISH NAIL KEYWORDS WITH REAL VOLUME (vol≥500, kd≤15) ===\n');
console.log('  cnt loc   vol  kd  intent          keyword');
for (const r of rows.slice(0, 30)) {
  console.log(`     ${r.loc} ${r.vol.toString().padStart(6)} ${r.kd.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.kw}`);
}

fs.writeFileSync('tmp/nails-es-real-volume.csv',
  ['keyword,loc,volume,kd,intent', ...rows.map((r) => `"${r.kw}",${r.loc},${r.vol},${r.kd},${r.intent}`)].join('\n'));
console.log(`\nWrote tmp/nails-es-real-volume.csv (${rows.length} keywords)`);
