// Check ACTUAL current position of /es/vestido-invitada-boda
// for the head term + the 6 new long-tails added in Round 10.
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

const QUERIES = [
  // Head terms
  'vestido invitada boda',
  'vestido boda invitada',
  'vestido invitada a boda',
  // 6 long-tails captured in Round 10
  'vestido invitada boda invierno',
  'vestido invitada boda largo',
  'vestido invitada boda barato',
  'vestido invitada boda dia',
  'vestido invitada boda primavera',
  'vestido madrina boda',
];

console.log('=== Current Google.es SERP position for agalaz.com/es/vestido-invitada-boda ===\n');
console.log('  pos  vol      kd   query                                  top-3 competitors');
console.log('  ---  ------   ---  -------------------------------------- ------------------------------');

for (const q of QUERIES) {
  try {
    const result = await dfs('serp/google/organic/live/advanced', [{
      keyword: q,
      language_code: 'es',
      location_code: 2724,
      depth: 100,
      device: 'desktop',
    }]);
    const items = result?.items ?? [];
    // Filter to organic only
    const organic = items.filter((it) => it.type === 'organic');
    const ourResult = organic.find((it) => it.domain === 'agalaz.com' || (it.url && it.url.includes('agalaz.com')));
    const pos = ourResult ? ourResult.rank_absolute : '>100';
    const top3 = organic.slice(0, 3).map((it) => it.domain).join(', ');

    // Also get volume + KD
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [q], language_code: 'es', location_code: 2724 }]);
    const vol = ov?.items?.[0]?.keyword_info?.search_volume ?? 0;
    const kd = ov?.items?.[0]?.keyword_properties?.keyword_difficulty ?? 0;

    console.log(`  ${String(pos).padStart(3)}  ${vol.toString().padStart(6)}   ${kd.toString().padStart(2)}   ${q.padEnd(38)} ${top3}`);
    if (ourResult) {
      console.log(`         URL: ${ourResult.url}`);
    }
  } catch (e) {
    console.log(`  ERR  ${q}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
