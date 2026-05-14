// Audit the 50-backlink batch the user just deployed.
// Checks (a) current SERP position of the 12 URLs that received the links,
// (b) the head-term volume + KD for the cluster of each URL, and (c) a
// realistic position-lift projection given the count + quality tier of
// the referring domains.

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

const TARGETS = [
  // [path, head keyword, language, location]
  ['/pt/unhas-decoradas',                 'unhas decoradas',          'pt', 2076, 7],
  ['/pt/vestido-de-noiva',                'vestido de noiva',          'pt', 2076, 6],
  ['/pt/corte-de-cabelo-feminino',        'corte de cabelo feminino', 'pt', 2076, 5],
  ['/es/vestido-invitada-boda',           'vestido invitada boda',     'es', 2724, 4],
  ['/pt/look-festa-junina',               'look festa junina',         'pt', 2076, 3],
  ['/pt/provador-fatos-carnaval',         'fato carnaval',             'pt', 2076, 3],
  ['/es/disenos-de-unas',                 'diseños de uñas',           'es', 2724, 2],
  ['/es/probador-bikini',                 'bikini mujer',              'es', 2724, 2],
  ['/virtual-wedding-dress-try-on',       'virtual wedding dress try on', 'en', 2840, 2],
  ['/virtual-hairstyle-try-on',           'virtual hairstyle try on',  'en', 2840, 1],
  ['/best-virtual-try-on-app',            'best virtual try on app',   'en', 2840, 1],
  ['/try-on',                             'virtual try on',            'en', 2840, 1],
];

console.log('=== Current SERP audit for the 12 URLs that received backlinks ===\n');
console.log('  POS  VOL      KD  LINKS  URL                                          KEYWORD');
console.log('  ───  ───────  ──  ─────  ───────────────────────────────────────────  ────────');

let totalCluster = 0;
let totalLinks = 0;
let urlsBelow100 = 0;
for (const [path, kw, lang, loc, links] of TARGETS) {
  try {
    const serp = await dfs('serp/google/organic/live/advanced', [{
      keyword: kw, language_code: lang, location_code: loc, depth: 100, device: 'desktop',
    }]);
    const organic = (serp?.items ?? []).filter((i) => i.type === 'organic');
    const ours = organic.find((i) => i.url && i.url.includes('agalaz.com'));
    const pos = ours ? ours.rank_absolute : '>100';

    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [kw], language_code: lang, location_code: loc }]);
    const vol = ov?.items?.[0]?.keyword_info?.search_volume ?? 0;
    const kd = ov?.items?.[0]?.keyword_properties?.keyword_difficulty ?? 0;

    totalCluster += vol;
    totalLinks += links;
    if (pos === '>100') urlsBelow100++;

    console.log(`  ${String(pos).padStart(3)}  ${vol.toString().padStart(7)}  ${kd.toString().padStart(2)}  ${links.toString().padStart(5)}  ${path.padEnd(43)} ${kw}`);
  } catch (e) {
    console.log(`  ERR  ${path}: ${e.message?.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

console.log(`\n  TOTAL backlinks to these 12 URLs: ${totalLinks}`);
console.log(`  TOTAL search vol head terms (mo): ${totalCluster.toLocaleString()}`);
console.log(`  URLs currently >100: ${urlsBelow100}/12`);
console.log('\nDone.');
