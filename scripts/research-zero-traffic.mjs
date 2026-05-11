// Targeted DataForSEO research for the 16 zero-traffic URLs identified in
// Vercel Analytics (7 long-tail landings + 10 blog posts).
//
// Goal: for each URL's target seed, expand to long-tail variants with
// search_volume >= 100 and keyword_difficulty <= 20, so we can pick a
// pivot title that captures additional searches without losing the head term.
//
// Output: tmp/zero-traffic-research.csv

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
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}
if (!process.env.DATAFORSEO_LOGIN || !process.env.DATAFORSEO_PASSWORD) loadEnvLocal();

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;
if (!LOGIN || !PASSWORD) {
  console.error('Missing DATAFORSEO_LOGIN/PASSWORD. Run npx vercel env pull .env.local');
  process.exit(1);
}
const auth = 'Basic ' + Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

// (url, seed, language_code, location_code)
const TARGETS = [
  // ── 7 long-tail landings ────────────────────────────────────────────────
  { url: '/bridesmaid-dress-try-on',      seed: 'bridesmaid dress',          lang: 'en', loc: 2840 },
  { url: '/halloween-couples-costumes',   seed: 'couples halloween costumes', lang: 'en', loc: 2840 },
  { url: '/halloween-couples-costumes',   seed: 'couple halloween costumes',  lang: 'en', loc: 2840 },
  { url: '/haircut-for-oval-face',        seed: 'haircut for oval face',     lang: 'en', loc: 2840 },
  { url: '/haircut-for-square-face',      seed: 'haircut for square face',   lang: 'en', loc: 2840 },
  { url: '/fr/tenue-bapteme',             seed: 'tenue bapteme',             lang: 'fr', loc: 2250 },
  { url: '/it/vestito-comunione',         seed: 'vestito comunione',         lang: 'it', loc: 2380 },

  // ── 10 blog posts ───────────────────────────────────────────────────────
  { url: '/blog/barrel-leg-jeans-styling-guide',                  seed: 'barrel leg jeans',           lang: 'en', loc: 2840 },
  { url: '/blog/coquette-aesthetic-spring-nails-virtual-try-on',  seed: 'coquette nails',             lang: 'en', loc: 2840 },
  { url: '/blog/1-5-carat-vs-2-carat-diamond-on-hand',            seed: '1.5 carat diamond',          lang: 'en', loc: 2840 },
  { url: '/blog/capsule-wardrobe-guide-30-outfits-15-pieces',     seed: 'capsule wardrobe',           lang: 'en', loc: 2840 },
  { url: '/blog/digital-nomad-corporate-crease-free-office-wear', seed: 'wrinkle free travel clothes', lang: 'en', loc: 2840 },
  { url: '/blog/how-to-dress-for-your-body-type-without-a-stylist', seed: 'how to dress for body type', lang: 'en', loc: 2840 },
  { url: '/blog/online-shopping-mistakes-that-lead-to-returns',   seed: 'online shopping returns',    lang: 'en', loc: 2840 },
  { url: '/blog/what-to-wear-to-a-job-interview-2026',            seed: 'job interview outfit',       lang: 'en', loc: 2840 },
  { url: '/blog/short-almond-spring-nails-clean-girl-look',       seed: 'almond nails',               lang: 'en', loc: 2840 },
  { url: '/blog/best-shopify-virtual-try-on-apps-2026',           seed: 'shopify virtual try on app', lang: 'en', loc: 2840 },
];

async function fetchSuggestions({ seed, lang, loc }) {
  const body = [
    {
      keyword: seed,
      language_code: lang,
      location_code: loc,
      limit: 200,
      include_seed_keyword: true,
      filters: [
        ['keyword_info.search_volume', '>=', 100],
        'and',
        ['keyword_properties.keyword_difficulty', '<=', 20],
      ],
      order_by: ['keyword_info.search_volume,desc'],
    },
  ];
  const res = await fetch(
    'https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live',
    {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(`DFS ${json.status_code}: ${json.status_message}`);
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

const all = [];
for (const t of TARGETS) {
  process.stdout.write(`[${t.lang}] ${t.seed.padEnd(34)} `);
  try {
    const items = await fetchSuggestions(t);
    for (const it of items) {
      const ki = it.keyword_info || {};
      const kp = it.keyword_properties || {};
      const intent = it.search_intent_info?.main_intent || '';
      all.push({
        url: t.url,
        keyword: it.keyword,
        lang: t.lang,
        location: t.loc,
        seed: t.seed,
        volume: ki.search_volume ?? 0,
        difficulty: kp.keyword_difficulty ?? 0,
        cpc: ki.cpc ?? 0,
        intent,
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 100)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

const OUT = path.join(process.cwd(), 'tmp', 'zero-traffic-research.csv');
if (!fs.existsSync(path.dirname(OUT))) fs.mkdirSync(path.dirname(OUT), { recursive: true });

const csv = (s) => {
  if (s == null) return '';
  const v = String(s);
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
};
const header = 'url,keyword,lang,location,seed,volume,kw_difficulty,cpc_usd,intent';
const lines = [header];
all
  .sort((a, b) => (a.url < b.url ? -1 : 1) || b.volume - a.volume)
  .forEach((r) =>
    lines.push(
      [
        csv(r.url), csv(r.keyword), r.lang, r.location, csv(r.seed),
        r.volume, r.difficulty, r.cpc.toFixed(2), csv(r.intent),
      ].join(','),
    ),
  );
fs.writeFileSync(OUT, lines.join('\n'));
console.log(`\nWrote ${OUT} (${all.length} rows)\n`);

// Per-URL summary: top 5 keywords
const byUrl = {};
for (const r of all) (byUrl[r.url] ??= []).push(r);
for (const [url, rows] of Object.entries(byUrl)) {
  rows.sort((a, b) => b.volume - a.volume);
  console.log(`\n=== ${url} ===`);
  for (const r of rows.slice(0, 5)) {
    console.log(
      `  ${r.volume.toString().padStart(7)}  kd:${r.difficulty.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.keyword}`,
    );
  }
}
