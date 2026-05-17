// Broaden K-pop outfit keyword research beyond Jungwon — cover the 8 major
// groups with global outfit / fashion / style intent.

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
  // Generic
  'kpop outfit', 'kpop outfits', 'kpop fashion', 'kpop style', 'kpop concert outfit', 'kpop outfit male', 'kpop men outfit', 'kpop outfit female',
  // Major groups — stage / fashion intent
  'bts outfit', 'bts fashion', 'bts airport fashion',
  'blackpink outfit', 'blackpink fashion', 'blackpink stage outfit',
  'newjeans outfit', 'newjeans fashion', 'newjeans style',
  'ive outfit', 'ive fashion',
  'aespa outfit', 'aespa fashion',
  'le sserafim outfit', 'le sserafim fashion',
  'stray kids outfit', 'stray kids fashion',
  'twice outfit', 'twice fashion',
  'enhypen outfit', 'enhypen fashion',
];

async function main() {
  const seen = new Set();
  const all = [];
  for (const seed of SEEDS) {
    try {
      const result = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
        keyword: seed,
        language_code: 'en',
        location_code: 2840,
        limit: 25,
        include_seed_keyword: true,
        filters: [['keyword_info.search_volume', '>=', 200]],
        order_by: ['keyword_info.search_volume,desc'],
      }]);
      const items = result?.items ?? [];
      for (const it of items) {
        const kw = it.keyword;
        if (seen.has(kw)) continue;
        seen.add(kw);
        all.push({
          kw,
          vol: it.keyword_info?.search_volume ?? 0,
          kd: it.keyword_properties?.keyword_difficulty ?? 0,
          cpc: it.keyword_info?.cpc ?? 0,
          seed,
        });
      }
      console.log('  ' + seed + ': ' + items.length);
    } catch (e) {
      console.log('  ! ' + seed + ': ' + e.message?.slice(0, 60));
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  all.sort((a, b) => b.vol - a.vol);
  fs.mkdirSync('tmp', { recursive: true });
  fs.writeFileSync('tmp/kpop-groups-keywords.json', JSON.stringify(all, null, 2));
  console.log('\nTOTAL UNIQUE: ' + all.length);
  console.log('\n══ TOP 40 outfit-intent K-pop (KD <= 5, vol >= 500) ══');
  const filtered = all.filter((r) => /(outfit|fashion|style|wear|stage|airport|look)/i.test(r.kw) && r.kd <= 5 && r.vol >= 500);
  console.log('  KD  VOL/MO  KEYWORD');
  for (const r of filtered.slice(0, 40)) {
    console.log('  ' + r.kd.toString().padStart(2) + '  ' + r.vol.toString().padStart(6) + '  ' + r.kw);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
