// Pull DataForSEO suggestions for Jungwon (ENHYPEN) keywords — outfit,
// fashion, style queries across EN/ES/PT/KO markets.

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

const SEEDS = [
  'jungwon', 'jungwon outfit', 'jungwon fashion', 'jungwon style',
  'enhypen jungwon', 'yang jungwon', 'enhypen outfit',
  'jungwon airport fashion', 'jungwon stage outfit', 'jungwon dior',
  'kpop outfit', 'kpop fashion',
];

async function main() {
  const all = [];
  for (const seed of SEEDS) {
    try {
      const result = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
        keyword: seed,
        language_code: 'en',
        location_code: 2840,
        limit: 30,
        include_seed_keyword: true,
        filters: [['keyword_info.search_volume', '>=', 100]],
        order_by: ['keyword_info.search_volume,desc'],
      }]);
      const items = result?.items ?? [];
      for (const it of items) {
        all.push({
          kw: it.keyword,
          vol: it.keyword_info?.search_volume ?? 0,
          kd: it.keyword_properties?.keyword_difficulty ?? 0,
          cpc: it.keyword_info?.cpc ?? 0,
          seed,
        });
      }
      console.log(`  ${seed}: ${items.length} variants`);
    } catch (e) {
      console.log(`  ! ${seed}: ${e.message?.slice(0, 60)}`);
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  const seen = new Set();
  const unique = all.filter((r) => { if (seen.has(r.kw)) return false; seen.add(r.kw); return true; });
  unique.sort((a, b) => b.vol - a.vol);
  console.log(`\n══════════ TOP 40 — Jungwon / ENHYPEN keywords (vol-sorted) ══════════`);
  console.log(`  KD  VOL/MO    CPC$  KEYWORD`);
  for (const r of unique.slice(0, 40)) {
    console.log(`  ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(7)}  ${r.cpc.toFixed(2).padStart(5)}  ${r.kw}`);
  }
  fs.mkdirSync('tmp', { recursive: true });
  fs.writeFileSync('tmp/jungwon-keywords.json', JSON.stringify(unique, null, 2));
  console.log('\nWrote tmp/jungwon-keywords.json (' + unique.length + ' unique keywords)');
}
main().catch((e) => { console.error(e); process.exit(1); });
