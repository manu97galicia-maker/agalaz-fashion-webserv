// Pull DataForSEO suggestions for "bangs" trend across EN/JA/KO/ES/PT.
// User suspects Japan/Korea are leading the trend — confirm.

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
  const r = await fetch(`https://api.dataforseo.com/v3/${endpoint}`, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return (await r.json()).tasks?.[0]?.result?.[0];
}

const REGIONS = [
  { name: 'US (EN)',   lang: 'en', loc: 2840, seeds: ['bangs', 'curtain bangs', 'wispy bangs', 'korean bangs', 'see through bangs', 'side bangs', 'baby bangs', 'kpop bangs', 'air bangs'] },
  { name: 'UK (EN)',   lang: 'en', loc: 2826, seeds: ['fringe haircut', 'curtain fringe', 'wispy fringe', 'korean fringe'] },
  { name: 'JP (JA)',   lang: 'ja', loc: 2392, seeds: ['前髪', '前髪 切り方', 'シースルーバング', '韓国 前髪', 'カーテンバング', '前髪 アレンジ'] },
  { name: 'KR (KO)',   lang: 'ko', loc: 2410, seeds: ['앞머리', '시스루뱅', '커튼뱅', '에어뱅', '앞머리 자르는법'] },
  { name: 'ES (ES)',   lang: 'es', loc: 2724, seeds: ['flequillo', 'flequillo cortina', 'flequillo coreano', 'flequillo wispy', 'flequillo aire'] },
  { name: 'BR (PT)',   lang: 'pt', loc: 2076, seeds: ['franja', 'franja cortina', 'franja coreana', 'franja wispy'] },
];

async function main() {
  const allByRegion = {};
  for (const region of REGIONS) {
    console.log(`\n══════════ ${region.name} ══════════`);
    const seen = new Set();
    const results = [];
    for (const seed of region.seeds) {
      try {
        const result = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
          keyword: seed,
          language_code: region.lang,
          location_code: region.loc,
          limit: 30,
          include_seed_keyword: true,
          filters: [['keyword_info.search_volume', '>=', 500]],
          order_by: ['keyword_info.search_volume,desc'],
        }]);
        const items = result?.items ?? [];
        for (const it of items) {
          const kw = it.keyword;
          if (seen.has(kw)) continue;
          seen.add(kw);
          results.push({
            kw,
            vol: it.keyword_info?.search_volume ?? 0,
            kd: it.keyword_properties?.keyword_difficulty ?? 0,
            cpc: it.keyword_info?.cpc ?? 0,
            seed,
          });
        }
      } catch (e) {
        console.log(`  ! ${seed}: ${e.message?.slice(0, 60)}`);
      }
      await new Promise((r) => setTimeout(r, 250));
    }
    results.sort((a, b) => b.vol - a.vol);
    allByRegion[region.name] = results;
    console.log(`  Top 15:`);
    console.log(`     KD  VOL/MO  CPC$  KEYWORD`);
    for (const r of results.slice(0, 15)) {
      console.log(`     ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(6)}  ${r.cpc.toFixed(2).padStart(4)}  ${r.kw}`);
    }
  }
  fs.mkdirSync('tmp', { recursive: true });
  fs.writeFileSync('tmp/bangs-keywords.json', JSON.stringify(allByRegion, null, 2));
  console.log('\nWrote tmp/bangs-keywords.json');
}
main().catch((e) => { console.error(e); process.exit(1); });
