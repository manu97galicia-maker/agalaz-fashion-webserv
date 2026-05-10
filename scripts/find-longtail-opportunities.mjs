// Long-tail opportunity finder for Agalaz.
//
// Calls DataForSEO Labs `keyword_suggestions` for each seed keyword, filters
// for { search_volume >= 100, competition_index <= 30 } and writes the top
// hits to tmp/longtail-opportunities.csv.
//
// Output columns: keyword, lang, location, volume, competition_index, cpc,
// trend_3mo, seed.
//
// Cost: ~$0.07 per seed × ~24 seeds = ~$1.70 total.

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

// Seeds per language. Each seed targets a known-popular vertical adjacent
// to our existing landings — the API expands them into long-tail variants.
// The location_code controls which country's search volume we read.
const SEEDS = [
  // ── New broader seeds, round 2 (2026-05-10) ──────────────────────────────
  // Footwear
  { seed: 'shoes online', lang: 'en', location: 2840 },
  { seed: 'sneakers online', lang: 'en', location: 2840 },
  { seed: 'heels online', lang: 'en', location: 2840 },

  // Beauty / face
  { seed: 'lipstick try on', lang: 'en', location: 2840 },
  { seed: 'makeup try on', lang: 'en', location: 2840 },
  { seed: 'hair color try on', lang: 'en', location: 2840 },

  // Body / size
  { seed: 'plus size dress', lang: 'en', location: 2840 },
  { seed: 'maternity dress', lang: 'en', location: 2840 },

  // Cultural events
  { seed: 'quinceanera dress', lang: 'en', location: 2840 },
  { seed: 'bridesmaid dress', lang: 'en', location: 2840 },
  { seed: 'halloween costume', lang: 'en', location: 2840 },

  // German Oktoberfest with broader seeds
  { seed: 'dirndl', lang: 'de', location: 2276 },
  { seed: 'oktoberfest outfit', lang: 'de', location: 2276 },
  { seed: 'tracht', lang: 'de', location: 2276 },

  // Japanese yukata with native seeds
  { seed: '浴衣', lang: 'ja', location: 2392 },
  { seed: '振袖', lang: 'ja', location: 2392 },

  // Korean K-pop / hanbok variations
  { seed: '한복', lang: 'ko', location: 2410 },
  { seed: '드레스', lang: 'ko', location: 2410 },

  // Spanish events
  { seed: 'vestido quinceañera', lang: 'es', location: 2724 },
  { seed: 'traje de comunion', lang: 'es', location: 2724 },
  { seed: 'vestido boda invitada', lang: 'es', location: 2724 },

  // French events
  { seed: 'tenue mariage femme', lang: 'fr', location: 2250 },
  { seed: 'tenue communion', lang: 'fr', location: 2250 },
];

async function fetchSuggestions({ seed, lang, location }) {
  const body = [
    {
      keyword: seed,
      language_code: lang,
      location_code: location,
      limit: 200,
      include_seed_keyword: false,
      // Filter on the nested paths DataForSEO actually exposes:
      //   keyword_info.search_volume        — Google Ads avg monthly searches
      //   keyword_properties.keyword_difficulty  — SEO difficulty 0-100, lower = easier
      filters: [
        ['keyword_info.search_volume', '>=', 200],
        'and',
        ['keyword_properties.keyword_difficulty', '<=', 35],
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
for (const s of SEEDS) {
  process.stdout.write(`[${s.lang}] ${s.seed.padEnd(28)} `);
  try {
    const items = await fetchSuggestions(s);
    for (const it of items) {
      const ki = it.keyword_info || {};
      const kp = it.keyword_properties || {};
      const intent = it.search_intent_info?.main_intent || '';
      all.push({
        keyword: it.keyword,
        lang: s.lang,
        location: s.location,
        seed: s.seed,
        volume: ki.search_volume ?? 0,
        difficulty: kp.keyword_difficulty ?? 0,
        adsCompetition: ki.competition ?? 0,
        cpc: ki.cpc ?? 0,
        intent,
        trend: (ki.monthly_searches || []).slice(0, 3).map((m) => m.search_volume).join('|'),
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 100)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

const OUT = path.join(process.cwd(), 'tmp', 'longtail-opportunities.csv');
if (!fs.existsSync(path.dirname(OUT))) fs.mkdirSync(path.dirname(OUT), { recursive: true });

const csv = (s) => {
  if (s == null) return '';
  const v = String(s);
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
};

const header = 'keyword,lang,location,seed,volume,kw_difficulty,ads_competition,cpc_usd,intent,trend_last3';
const lines = [header];
all
  .sort((a, b) => b.volume - a.volume)
  .forEach((r) =>
    lines.push(
      [
        csv(r.keyword), r.lang, r.location, csv(r.seed),
        r.volume, r.difficulty, r.adsCompetition.toFixed(2), r.cpc.toFixed(2),
        csv(r.intent), csv(r.trend),
      ].join(','),
    ),
  );
fs.writeFileSync(OUT, lines.join('\n'));

console.log(`\nWrote ${OUT} (${all.length} rows)\n`);

// Summary
const byLang = {};
for (const r of all) {
  byLang[r.lang] ??= { count: 0, totalVol: 0 };
  byLang[r.lang].count++;
  byLang[r.lang].totalVol += r.volume;
}
console.log('=== Opportunities per language ===');
for (const [l, s] of Object.entries(byLang).sort((a, b) => b[1].totalVol - a[1].totalVol)) {
  console.log(`  ${l.toUpperCase()}: ${s.count.toString().padStart(3)} keywords · ${s.totalVol.toLocaleString().padStart(8)} total monthly volume`);
}

console.log('\n=== TOP 40 GLOBAL (volume × ease) ===');
// Score = volume / sqrt(difficulty + 1) — rewards high-volume + low-difficulty
const scored = all.map((r) => ({ ...r, score: r.volume / Math.sqrt((r.difficulty || 50) + 1) }));
scored.sort((a, b) => b.score - a.score);
for (const r of scored.slice(0, 40)) {
  const ease = r.difficulty < 15 ? '🟢' : r.difficulty < 25 ? '🟡' : '🟠';
  console.log(
    `  [${r.lang}] ${r.volume.toString().padStart(6)}  ${ease} kd:${r.difficulty.toString().padStart(2)}  cpc:$${r.cpc.toFixed(2).padStart(5)}  ${r.intent.padEnd(13)}  ${r.keyword}`,
  );
}
