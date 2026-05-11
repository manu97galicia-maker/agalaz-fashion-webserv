// Round-2 DataForSEO research: 20 localized try-on landings + 5 remaining
// blog posts that still have zero 30-day traffic in Vercel Analytics.
//
// Output: tmp/round-2-research.csv

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

// Location codes
const DE = 2276, FR = 2250, PT_BR = 2076, IT = 2380, ES = 2724, US = 2840;

const TARGETS = [
  // 20 localized try-on landings (zero-traffic) — seed = native head term
  { url: '/de/tattoo-simulator',       seed: 'tattoo simulator',          lang: 'de', loc: DE },
  { url: '/pt/provador-biquini',       seed: 'provador de biquini',       lang: 'pt', loc: PT_BR },
  { url: '/de/bikini-anprobieren',     seed: 'bikini anprobieren',        lang: 'de', loc: DE },
  { url: '/fr/essayage-robe-mariee',   seed: 'essayage robe mariée',      lang: 'fr', loc: FR },
  { url: '/pt/provador-vestido-noiva', seed: 'vestido de noiva online',   lang: 'pt', loc: PT_BR },
  { url: '/it/prova-abito-sposa',      seed: 'abito da sposa',            lang: 'it', loc: IT },
  { url: '/fr/simulateur-vernis-ongles', seed: 'simulateur vernis ongles', lang: 'fr', loc: FR },
  { url: '/pt/simulador-unhas',        seed: 'simulador de unhas',        lang: 'pt', loc: PT_BR },
  { url: '/it/simulatore-unghie',      seed: 'simulatore unghie',         lang: 'it', loc: IT },
  { url: '/it/prova-occhiali',         seed: 'prova occhiali',            lang: 'it', loc: IT },
  { url: '/pt/provador-joias',         seed: 'provador de joias',         lang: 'pt', loc: PT_BR },
  { url: '/it/prova-gioielli',         seed: 'prova gioielli online',     lang: 'it', loc: IT },
  { url: '/pt/provador-fato-homem',    seed: 'fato homem online',         lang: 'pt', loc: PT_BR },
  { url: '/it/prova-abito-uomo',       seed: 'abito uomo online',         lang: 'it', loc: IT },
  { url: '/it/prova-vestiti-animali',  seed: 'vestiti per cani',          lang: 'it', loc: IT },
  { url: '/fr/essayage-deguisements',  seed: 'déguisement adulte',        lang: 'fr', loc: FR },
  { url: '/fr/essayage-coiffures',     seed: 'simulateur coiffure',       lang: 'fr', loc: FR },
  { url: '/pt/provador-penteados',     seed: 'simulador penteado',        lang: 'pt', loc: PT_BR },
  { url: '/it/prova-acconciature',     seed: 'simulatore acconciatura',   lang: 'it', loc: IT },
  { url: '/it/prova-cosplay',          seed: 'cosplay',                   lang: 'it', loc: IT },

  // 5 remaining blogs
  { url: '/blog/free-ai-glasses-stylist-diamond-face-shape',  seed: 'glasses diamond face',         lang: 'en', loc: US },
  { url: '/blog/agalaz-vs-auglio-comparison',                 seed: 'auglio virtual try on',        lang: 'en', loc: US },
  { url: '/blog/agalaz-vs-genlook-comparison',                seed: 'genlook',                      lang: 'en', loc: US },
  { url: '/blog/agalaz-vs-mirrar-comparison',                 seed: 'mirrar',                       lang: 'en', loc: US },
  { url: '/blog/industry-case-study-virtual-try-on-fashion-2026', seed: 'virtual try on case study', lang: 'en', loc: US },
];

async function fetch1({ seed, lang, loc }) {
  const body = [{
    keyword: seed, language_code: lang, location_code: loc, limit: 100, include_seed_keyword: true,
    filters: [['keyword_info.search_volume', '>=', 50], 'and', ['keyword_properties.keyword_difficulty', '<=', 25]],
    order_by: ['keyword_info.search_volume,desc'],
  }];
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

const all = [];
for (const t of TARGETS) {
  process.stdout.write(`[${t.lang}] ${t.seed.padEnd(32)} `);
  try {
    const items = await fetch1(t);
    for (const it of items) {
      all.push({
        url: t.url, keyword: it.keyword, lang: t.lang, location: t.loc, seed: t.seed,
        volume: it.keyword_info?.search_volume ?? 0,
        difficulty: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent || '',
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 60)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

const OUT = path.join(process.cwd(), 'tmp', 'round-2-research.csv');
const csv = (s) => { if (s == null) return ''; const v = String(s); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
fs.writeFileSync(OUT, ['url,keyword,lang,location,seed,volume,kw_difficulty,intent',
  ...all.sort((a,b)=>(a.url<b.url?-1:1)||b.volume-a.volume).map(r=>[csv(r.url),csv(r.keyword),r.lang,r.location,csv(r.seed),r.volume,r.difficulty,csv(r.intent)].join(','))
].join('\n'));
console.log(`\nWrote ${OUT} (${all.length} rows)`);

// Per-URL top-3 summary
const byUrl = {};
for (const r of all) (byUrl[r.url] ??= []).push(r);
for (const [url, rows] of Object.entries(byUrl).sort()) {
  rows.sort((a, b) => b.volume - a.volume);
  console.log(`\n=== ${url} ===`);
  for (const r of rows.slice(0, 3)) {
    console.log(`  ${r.volume.toString().padStart(7)}  kd:${r.difficulty.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.keyword}`);
  }
}
// Empty seeds list
const seeds = new Set(TARGETS.map(t => t.url));
const seen = new Set(Object.keys(byUrl));
const missing = [...seeds].filter(s => !seen.has(s));
if (missing.length) console.log(`\n=== ZERO HITS ===\n${missing.join('\n')}`);
