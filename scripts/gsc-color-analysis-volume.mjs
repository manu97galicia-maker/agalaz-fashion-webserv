// Pull real volume + KD for the color-analysis cluster of keywords GSC
// is already showing impressions for. Calculate visits at 3% and 5% CTR
// once we rank top 1-3. Used to prioritize the next landing builds.

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
  // Color analysis core
  'color analysis test free',
  'soft summer color palette',
  'soft summer celebrities',
  'soft spring color palette',
  'soft autumn celebrities',
  'deep autumn',
  'light summer hair color',
  'deep winter color palette',
  'clear spring color palette',
  'soft summer makeup',
  // Color combinations (massive on Pinterest)
  'what colors go with pink',
  'what colors go with purple',
  'what colors go well with purple',
  'what colors go with red',
  'navy blue color combination',
  'brown color combination',
  // Hair colors
  'auburn hair',
  'auburn hair color',
  // K-pop angle
  'kpop color analysis',
  'kpop hair color',
  'kpop idol color',
];

const results = [];
console.log(`Fetching volume + KD for ${KEYWORDS.length} keywords...`);

// DataForSEO Labs keyword_overview supports up to 1000 keywords per call.
const overview = await dfs('dataforseo_labs/google/keyword_overview/live', [{
  keywords: KEYWORDS,
  language_code: 'en',
  location_code: 2840, // US
}]);

const items = overview?.items ?? [];
for (const it of items) {
  const kw = it.keyword;
  const vol = it.keyword_info?.search_volume ?? 0;
  const kd = it.keyword_properties?.keyword_difficulty ?? 0;
  const cpc = it.keyword_info?.cpc ?? 0;
  results.push({ kw, vol, kd, cpc });
}

// Sort by volume desc
results.sort((a, b) => b.vol - a.vol);

console.log('\n══════════════════════════════════════════════════════════════════');
console.log('  KD   VOL/MO    CPC$    VISITS@3%  VISITS@5%   KEYWORD');
console.log('══════════════════════════════════════════════════════════════════');
let totalVol = 0;
let visitsAt3 = 0;
let visitsAt5 = 0;
for (const r of results) {
  totalVol += r.vol;
  const v3 = Math.round(r.vol * 0.03);
  const v5 = Math.round(r.vol * 0.05);
  visitsAt3 += v3;
  visitsAt5 += v5;
  console.log(`  ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(7)}  ${r.cpc.toFixed(2).padStart(5)}  ${v3.toString().padStart(7)}    ${v5.toString().padStart(7)}    ${r.kw}`);
}
console.log('══════════════════════════════════════════════════════════════════');
console.log(`  TOTAL volume: ${totalVol.toLocaleString()}/mo`);
console.log(`  Total visits at 3% CTR (~top 5): ${visitsAt3.toLocaleString()}/mo = ${Math.round(visitsAt3 / 30).toLocaleString()}/day`);
console.log(`  Total visits at 5% CTR (~top 3): ${visitsAt5.toLocaleString()}/mo = ${Math.round(visitsAt5 / 30).toLocaleString()}/day`);
console.log(`  Total visits at 28% CTR (top 1): ${Math.round(totalVol * 0.28).toLocaleString()}/mo`);

// Break-down by KD bucket
const easy = results.filter(r => r.kd <= 10);
const med = results.filter(r => r.kd > 10 && r.kd <= 25);
const hard = results.filter(r => r.kd > 25);
console.log(`\n  By difficulty:`);
console.log(`    Easy (KD 0-10):  ${easy.length} keywords, ${easy.reduce((s, r) => s + r.vol, 0).toLocaleString()} vol/mo`);
console.log(`    Medium (KD 11-25): ${med.length} keywords, ${med.reduce((s, r) => s + r.vol, 0).toLocaleString()} vol/mo`);
console.log(`    Hard (KD 26+):   ${hard.length} keywords, ${hard.reduce((s, r) => s + r.vol, 0).toLocaleString()} vol/mo`);

fs.writeFileSync('tmp/gsc-color-analysis-volume.json', JSON.stringify(results, null, 2));
console.log('\nWrote tmp/gsc-color-analysis-volume.json');
