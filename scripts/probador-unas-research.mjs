// Probador de uñas online — full cluster research.
// Volume + KD + SERP top-3 verification for ES + MX markets.

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

const SEEDS = [
  { kw: 'probador de uñas online',     lang: 'es', loc: 2724 }, // ES
  { kw: 'probador uñas',                lang: 'es', loc: 2724 },
  { kw: 'simulador de uñas',            lang: 'es', loc: 2724 },
  { kw: 'simulador uñas online',        lang: 'es', loc: 2724 },
  { kw: 'probador de unas online',      lang: 'es', loc: 2484 }, // MX (often without ñ)
  { kw: 'probador de uñas',             lang: 'es', loc: 2484 },
  { kw: 'simulador de uñas',            lang: 'es', loc: 2484 },
  { kw: 'probar uñas online',           lang: 'es', loc: 2724 },
  { kw: 'probador virtual uñas',        lang: 'es', loc: 2724 },
];

async function dfs(endpoint, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await res.json();
  if (j.status_code !== 20000) throw new Error(j.status_message);
  return j.tasks?.[0]?.result?.[0];
}

function apex(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, '').split('.').slice(-2).join('.'); } catch { return ''; }
}

const LOC = { 2724: 'ES', 2484: 'MX' };

console.log('=== PROBADOR DE UÑAS — Cluster Research ===\n');

const all = [];
for (const s of SEEDS) {
  process.stdout.write(`[${LOC[s.loc]}] ${s.kw.padEnd(34)} `);
  try {
    // 1) Get keyword overview
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [s.kw], language_code: s.lang, location_code: s.loc }]);
    const item = ov?.items?.[0];
    const vol = item?.keyword_info?.search_volume ?? 0;
    const kd = item?.keyword_properties?.keyword_difficulty ?? 0;
    const cpc = item?.keyword_info?.cpc ?? 0;
    const intent = item?.search_intent_info?.main_intent ?? '';

    // 2) Get SERP top 10
    await new Promise((r) => setTimeout(r, 250));
    const serp = await dfs('serp/google/organic/live/advanced',
      [{ keyword: s.kw, language_code: s.lang, location_code: s.loc, depth: 10, device: 'desktop' }]);
    const items = (serp?.items ?? []).filter((it) => it.type === 'organic');
    const top3 = items.slice(0, 3).map((it, i) => `${i + 1}. ${apex(it.url || '')}`).join(' · ');
    const agalazPos = items.findIndex((it) => (it.url || '').includes('agalaz.com'));

    all.push({ ...s, vol, kd, cpc, intent, top3, agalazPos: agalazPos === -1 ? null : agalazPos + 1 });
    console.log(`vol:${vol.toString().padStart(5)} kd:${kd.toString().padStart(2)} ${intent.padEnd(13)} agalaz pos: ${agalazPos === -1 ? '>10' : agalazPos + 1}`);
    console.log(`    top3: ${top3}`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}

// Also expand cluster with related keywords
console.log('\n\n=== Long-tail expansion via keyword_suggestions ===\n');
try {
  const ex = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
    keyword: 'probador de uñas online', language_code: 'es', location_code: 2724,
    limit: 50, include_seed_keyword: false,
    filters: [['keyword_info.search_volume', '>=', 50]],
    order_by: ['keyword_info.search_volume,desc'],
  }]);
  const items = ex?.items ?? [];
  console.log(`Found ${items.length} long-tail variants:\n`);
  for (const it of items.slice(0, 20)) {
    const vol = it.keyword_info?.search_volume ?? 0;
    const kd = it.keyword_properties?.keyword_difficulty ?? 0;
    const intent = it.search_intent_info?.main_intent ?? '';
    console.log(`  vol:${vol.toString().padStart(5)} kd:${kd.toString().padStart(2)} ${intent.padEnd(13)} ${it.keyword}`);
  }
} catch (e) {
  console.log(`FAIL: ${e.message}`);
}

fs.writeFileSync('tmp/probador-unas-research.json', JSON.stringify(all, null, 2));
console.log('\nWrote tmp/probador-unas-research.json');
