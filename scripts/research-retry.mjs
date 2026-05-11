// Retry for the 2 zero-hit seeds with broader keywords.
import fs from 'fs';
import path from 'path';

function loadEnvLocal() {
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, 'utf8');
  for (const line of text.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key]) continue;
    let val = raw.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[key] = val;
  }
}
loadEnvLocal();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

const TARGETS = [
  { url: '/blog/online-shopping-mistakes-that-lead-to-returns', seed: 'online shopping return',  lang: 'en', loc: 2840 },
  { url: '/blog/online-shopping-mistakes-that-lead-to-returns', seed: 'shopping return rate',    lang: 'en', loc: 2840 },
  { url: '/blog/best-shopify-virtual-try-on-apps-2026',         seed: 'virtual try on app',      lang: 'en', loc: 2840 },
  { url: '/blog/best-shopify-virtual-try-on-apps-2026',         seed: 'shopify ar app',          lang: 'en', loc: 2840 },
];

async function fetch1({ seed, lang, loc }) {
  const body = [{
    keyword: seed, language_code: lang, location_code: loc, limit: 200, include_seed_keyword: true,
    filters: [['keyword_info.search_volume', '>=', 50], 'and', ['keyword_properties.keyword_difficulty', '<=', 25]],
    order_by: ['keyword_info.search_volume,desc'],
  }];
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

const all = [];
for (const t of TARGETS) {
  process.stdout.write(`[${t.lang}] ${t.seed.padEnd(30)} `);
  try {
    const items = await fetch1(t);
    for (const it of items) {
      all.push({
        url: t.url, keyword: it.keyword, seed: t.seed,
        volume: it.keyword_info?.search_volume ?? 0,
        difficulty: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent || '',
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 80)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
const byUrl = {};
for (const r of all) (byUrl[r.url] ??= []).push(r);
for (const [url, rows] of Object.entries(byUrl)) {
  rows.sort((a, b) => b.volume - a.volume);
  console.log(`\n=== ${url} ===`);
  for (const r of rows.slice(0, 10)) {
    console.log(`  ${r.volume.toString().padStart(7)}  kd:${r.difficulty.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.keyword}`);
  }
}

const OUT = path.join(process.cwd(), 'tmp', 'zero-traffic-retry.csv');
fs.writeFileSync(OUT, ['url,keyword,seed,volume,kw_difficulty,intent', ...all.sort((a,b)=>b.volume-a.volume).map(r=>[r.url,r.keyword,r.seed,r.volume,r.difficulty,r.intent].join(','))].join('\n'));
console.log(`\nWrote ${OUT}`);
