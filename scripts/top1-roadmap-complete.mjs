// Complete Top 1 roadmap: for each of the 12 URLs, pull the FULL cluster
// of keywords via DataForSEO keyword_suggestions, then return:
//   - total cluster vol/mo
//   - top 20 keywords per cluster
//   - KD range
//   - Top 1 capture estimate (28% CTR)

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

const URLS = [
  ['/pt/unhas-decoradas',           'unhas decoradas',          'pt', 2076],
  ['/pt/vestido-de-noiva',          'vestido de noiva',         'pt', 2076],
  ['/pt/corte-de-cabelo-feminino',  'corte de cabelo feminino', 'pt', 2076],
  ['/es/vestido-invitada-boda',     'vestido invitada boda',    'es', 2724],
  ['/pt/look-festa-junina',         'festa junina',             'pt', 2076],
  ['/pt/provador-fatos-carnaval',   'fantasia carnaval',        'pt', 2076],
  ['/es/disenos-de-unas',           'diseños de uñas',          'es', 2724],
  ['/es/probador-bikini',           'bikini mujer',             'es', 2724],
  ['/virtual-wedding-dress-try-on', 'wedding dress',            'en', 2840],
  ['/virtual-hairstyle-try-on',     'hairstyles for women',     'en', 2840],
  ['/best-virtual-try-on-app',      'best virtual try on app',  'en', 2840],
  ['/try-on',                       'virtual try on',           'en', 2840],
];

const allClusters = {};

for (const [path, seed, lang, loc] of URLS) {
  console.log(`\n══════════ ${path} (seed: "${seed}") ══════════`);
  try {
    const result = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: seed,
      language_code: lang,
      location_code: loc,
      limit: 30,
      include_seed_keyword: true,
      filters: [['keyword_info.search_volume', '>=', 100]],
      order_by: ['keyword_info.search_volume,desc'],
    }]);
    const items = result?.items ?? [];
    let totalVol = 0;
    const kws = [];
    for (const it of items) {
      const vol = it.keyword_info?.search_volume ?? 0;
      const kd = it.keyword_properties?.keyword_difficulty ?? 0;
      totalVol += vol;
      kws.push({ kw: it.keyword, vol, kd });
    }
    allClusters[path] = { seed, totalVol, kws, lang };

    console.log(`  Total cluster vol/mes: ${totalVol.toLocaleString()}`);
    console.log(`  KW count >= 100 vol: ${kws.length}`);
    console.log(`\n  Top 20 keywords:`);
    console.log(`  POS  VOL      KD   KEYWORD`);
    console.log(`  ───  ───────  ──   ────────────────────────────`);
    for (let i = 0; i < Math.min(20, kws.length); i++) {
      const k = kws[i];
      console.log(`  ${(i + 1).toString().padStart(3)}  ${k.vol.toString().padStart(7)}  ${k.kd.toString().padStart(2)}   ${k.kw}`);
    }
  } catch (e) {
    console.log(`  ERR: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

// Summary across all URLs
console.log('\n\n══════════ TOTALS ══════════');
let grandTotalVol = 0;
let grandTotalKws = 0;
for (const [path, data] of Object.entries(allClusters)) {
  console.log(`  ${path.padEnd(40)} ${data.totalVol.toLocaleString().padStart(10)} vol/mes  (${data.kws.length} keywords)`);
  grandTotalVol += data.totalVol;
  grandTotalKws += data.kws.length;
}
console.log(`\n  GRAND TOTAL (12 URLs): ${grandTotalVol.toLocaleString()} vol/mes  across ${grandTotalKws} keywords`);
console.log(`\n  IF Top 1 on ALL: ${Math.round(grandTotalVol * 0.28).toLocaleString()} visits/mo  =  ${Math.round(grandTotalVol * 0.28 / 30).toLocaleString()}/day`);

fs.writeFileSync('tmp/top1-clusters.json', JSON.stringify(allClusters, null, 2));
console.log('\nWrote tmp/top1-clusters.json');
console.log('\nDone.');
