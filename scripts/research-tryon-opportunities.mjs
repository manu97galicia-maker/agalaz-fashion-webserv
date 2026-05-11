// Find global "virtual try-on" search opportunities — what's the highest-volume
// keyword cluster in our category with the LOWEST keyword difficulty?
//
// Queries 12+ seeds across 6 languages and 6 countries, filters for
// search_volume >= 500 and keyword_difficulty <= 15, ranks by a score that
// rewards volume × ease, and writes the top 60 globally to stdout.

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
const US = 2840, GB = 2826, ES = 2724, FR = 2250, PT_BR = 2076, IT = 2380, DE = 2276, MX = 2484, IN = 2356;

const SEEDS = [
  // English — multiple framings
  { seed: 'virtual try on',          lang: 'en', loc: US },
  { seed: 'try on app',              lang: 'en', loc: US },
  { seed: 'virtual mirror',          lang: 'en', loc: US },
  { seed: 'online fitting room',     lang: 'en', loc: US },
  { seed: 'ai outfit generator',     lang: 'en', loc: US },
  { seed: 'ai stylist',              lang: 'en', loc: US },
  { seed: 'see how it looks on me',  lang: 'en', loc: US },

  // Spanish (ES + MX)
  { seed: 'probador virtual',        lang: 'es', loc: ES },
  { seed: 'probador virtual',        lang: 'es', loc: MX },
  { seed: 'simulador de ropa',       lang: 'es', loc: ES },

  // French
  { seed: 'essayage virtuel',        lang: 'fr', loc: FR },
  { seed: 'cabine essayage virtuelle', lang: 'fr', loc: FR },

  // Portuguese (Brazil)
  { seed: 'provador virtual',        lang: 'pt', loc: PT_BR },
  { seed: 'experimentar roupa online', lang: 'pt', loc: PT_BR },

  // Italian
  { seed: 'prova virtuale',          lang: 'it', loc: IT },
  { seed: 'camerino virtuale',       lang: 'it', loc: IT },

  // German
  { seed: 'virtuelle anprobe',       lang: 'de', loc: DE },
  { seed: 'anprobieren online',      lang: 'de', loc: DE },

  // India / Hindi (English search common too)
  { seed: 'virtual try on saree',    lang: 'en', loc: IN },
  { seed: 'try on dress online',     lang: 'en', loc: IN },
];

async function fetch1({ seed, lang, loc }) {
  const body = [{
    keyword: seed, language_code: lang, location_code: loc, limit: 200, include_seed_keyword: true,
    filters: [['keyword_info.search_volume', '>=', 500], 'and', ['keyword_properties.keyword_difficulty', '<=', 15]],
    order_by: ['keyword_info.search_volume,desc'],
  }];
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

const all = [];
for (const s of SEEDS) {
  process.stdout.write(`[${s.lang} loc:${s.loc}] ${s.seed.padEnd(34)} `);
  try {
    const items = await fetch1(s);
    for (const it of items) {
      all.push({
        keyword: it.keyword, lang: s.lang, location: s.loc, seed: s.seed,
        volume: it.keyword_info?.search_volume ?? 0,
        difficulty: it.keyword_properties?.keyword_difficulty ?? 0,
        cpc: it.keyword_info?.cpc ?? 0,
        intent: it.search_intent_info?.main_intent || '',
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 60)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

// Deduplicate by (keyword, location) — keep highest volume
const dedup = new Map();
for (const r of all) {
  const k = `${r.location}|${r.keyword}`;
  if (!dedup.has(k) || dedup.get(k).volume < r.volume) dedup.set(k, r);
}
const rows = [...dedup.values()];

// Score: rewards high volume AND low difficulty
rows.forEach(r => { r.score = r.volume / Math.sqrt((r.difficulty || 50) + 1); });
rows.sort((a, b) => b.score - a.score);

const OUT = path.join(process.cwd(), 'tmp', 'tryon-opportunities.csv');
const csv = (s) => { if (s == null) return ''; const v = String(s); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
fs.writeFileSync(OUT, ['keyword,lang,location,seed,volume,kw_difficulty,cpc,intent,score',
  ...rows.map(r => [csv(r.keyword), r.lang, r.location, csv(r.seed), r.volume, r.difficulty, r.cpc.toFixed(2), csv(r.intent), r.score.toFixed(0)].join(','))
].join('\n'));
console.log(`\nWrote ${OUT} (${rows.length} unique opportunities)\n`);

const LOC_LABEL = { 2840: 'US', 2826: 'GB', 2724: 'ES', 2250: 'FR', 2076: 'BR', 2380: 'IT', 2276: 'DE', 2484: 'MX', 2356: 'IN' };

console.log('=== TOP 60 GLOBAL OPPORTUNITIES (volume × ease) ===\n');
console.log('  loc lang   volume  kd  cpc      intent         keyword');
console.log('  --- ---- -------- --- -------- -------------- -------');
for (const r of rows.slice(0, 60)) {
  const ease = r.difficulty <= 5 ? '🟢' : r.difficulty <= 10 ? '🟡' : '🟠';
  console.log(
    `  ${LOC_LABEL[r.location].padEnd(3)} ${r.lang.padEnd(4)} ${r.volume.toString().padStart(7)} ${ease}${r.difficulty.toString().padStart(2)}  $${r.cpc.toFixed(2).padStart(5)}  ${r.intent.padEnd(13)}  ${r.keyword}`
  );
}
