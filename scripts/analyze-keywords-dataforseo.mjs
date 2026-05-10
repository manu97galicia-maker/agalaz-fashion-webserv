// Keyword analysis via DataForSEO AI Search Volume endpoint.
//
// Reads DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD from env (or .env.local fallback).
// Splits the 394 site keywords by detected language, calls the API per
// (locale, language) pair, and writes a sortable CSV to tmp/.
//
// Cost: ~$0.10 for the entire site (2 tasks × $0.01 + 788 items × $0.0001).
//
// Prereq:
//   1. The DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD env vars must be available.
//      Easiest: `npx vercel env pull .env.local` (downloads them locally).
//   2. Run with: node scripts/analyze-keywords-dataforseo.mjs
//      (Node 20.6+ auto-loads .env.local via --env-file; on older Node we
//      parse it ourselves below.)

import fs from 'fs';
import path from 'path';

// ── Env loading (fallback for older Node) ────────────────────────────────────

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

if (!process.env.DATAFORSEO_LOGIN || !process.env.DATAFORSEO_PASSWORD) {
  loadEnvLocal();
}

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;
if (!LOGIN || !PASSWORD) {
  console.error(
    'Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD.\n' +
      'Run `npx vercel env pull .env.local` first, then re-run this script.',
  );
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

// ── 1. Extract keywords from the codebase ────────────────────────────────────

function findFiles(dir, ext, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === 'node_modules' || f.name.startsWith('.')) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) findFiles(p, ext, out);
    else if (f.name.endsWith(ext)) out.push(p);
  }
  return out;
}

const keywordSources = new Map();
function addKw(kw, source) {
  const norm = kw.trim().toLowerCase();
  if (norm.length < 3 || norm.length > 100) return;
  if (!keywordSources.has(norm)) keywordSources.set(norm, []);
  keywordSources.get(norm).push(source);
}

const tsxFiles = ['app', 'lib'].flatMap((d) =>
  findFiles(d, '.tsx').concat(findFiles(d, '.ts')),
);
for (const f of tsxFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const blocks = src.match(/keywords:\s*\[([\s\S]*?)\]/g);
  if (!blocks) continue;
  for (const block of blocks) {
    for (const m of block.matchAll(/['"`]([^'"`]+)['"`]/g)) {
      addKw(m[1], path.relative(process.cwd(), f));
    }
  }
}

const articlesSrc = fs.readFileSync('app/blog/articles.ts', 'utf8');
for (const m of articlesSrc.matchAll(/keyword:\s*['"`]([^'"`]+)['"`]/g)) {
  addKw(m[1], 'app/blog/articles.ts');
}

const allKeywords = Array.from(keywordSources.keys());
console.log(`Extracted ${allKeywords.length} unique keywords.\n`);

// ── 2. Detect language per keyword (rough heuristic) ─────────────────────────

const ES_HINTS = /[áéíóúñ¿¡]|\b(probador|prueba|gafas|joyas?|tatuaje|pendientes?|ropa|virtual|gratis|cómo|como|para|que|qué|sin|con|de|en|por|del?|la|el|las?|los?)\b/i;
const FR_HINTS = /[àâçéèêëîïôùûœ]|\b(essayage|virtuel|gratuit|bijoux|lunettes|maillot|comment|pour|sans|avec)\b/i;
const PT_HINTS = /[ãõáéíóúçâê]|\b(provador|gratis|óculos|joias?|biquíni|brincos|prova|virtual)\b/i;
const DE_HINTS = /[äöüß]|\b(anprobieren|brille|schmuck|kostenlos|kleidung|virtuelle?)\b/i;
const IT_HINTS = /\b(prova|virtuale|gratis|occhiali|gioielli|orecchini|costume|abito|provare)\b/i;

function detectLang(kw) {
  if (ES_HINTS.test(kw)) return 'es';
  if (FR_HINTS.test(kw)) return 'fr';
  if (PT_HINTS.test(kw)) return 'pt';
  if (DE_HINTS.test(kw)) return 'de';
  if (IT_HINTS.test(kw)) return 'it';
  return 'en';
}

const byLang = { en: [], es: [], fr: [], pt: [], de: [], it: [] };
for (const kw of allKeywords) byLang[detectLang(kw)].push(kw);

console.log('Keywords per language:');
for (const [l, arr] of Object.entries(byLang)) {
  if (arr.length) console.log(`  ${l.toUpperCase()}: ${arr.length}`);
}
console.log('');

// ── 3. Call DataForSEO Search Volume per language batch ──────────────────────

// (location_code, language_code) per primary language. Codes from
// https://docs.dataforseo.com/v3/locations/, language ISO codes.
const LANG_CONFIG = {
  en: { location_code: 2840, language_code: 'en' }, // USA
  es: { location_code: 2724, language_code: 'es' }, // Spain
  fr: { location_code: 2250, language_code: 'fr' }, // France
  pt: { location_code: 2620, language_code: 'pt' }, // Portugal
  de: { location_code: 2276, language_code: 'de' }, // Germany
  it: { location_code: 2380, language_code: 'it' }, // Italy
};

async function fetchVolume(keywords, langKey) {
  const cfg = LANG_CONFIG[langKey];
  const body = [
    {
      keywords,
      location_code: cfg.location_code,
      language_code: cfg.language_code,
    },
  ];
  const res = await fetch(
    'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
    {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`DataForSEO ${res.status}: ${t.slice(0, 300)}`);
  }
  const json = await res.json();
  if (json.status_code !== 20000) {
    throw new Error(`DataForSEO status ${json.status_code}: ${json.status_message}`);
  }
  return json.tasks?.[0]?.result || [];
}

const allResults = [];
for (const [lang, kws] of Object.entries(byLang)) {
  if (!kws.length) continue;
  process.stdout.write(`Fetching ${lang.toUpperCase()} (${kws.length} kw)... `);
  try {
    const items = await fetchVolume(kws, lang);
    for (const it of items) {
      allResults.push({ ...it, _lang: lang });
    }
    console.log(`OK  ${items.length} returned`);
  } catch (e) {
    console.log(`FAIL — ${e.message}`);
  }
}

console.log(`\nTotal results: ${allResults.length}\n`);

// ── 4. Write CSV ─────────────────────────────────────────────────────────────

function csv(s) {
  if (s == null) return '';
  const str = String(s);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const OUT_DIR = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT_CSV = path.join(OUT_DIR, 'keyword-analysis.csv');

const header = 'keyword,lang,monthly_volume,cpc_usd,competition,low_top_bid,high_top_bid,trend_12mo,sources';
const lines = [header];
allResults
  .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))
  .forEach((r) => {
    const sources = keywordSources.get(r.keyword) || [];
    const trend = (r.monthly_searches || [])
      .map((m) => `${m.year}-${String(m.month).padStart(2, '0')}:${m.search_volume}`)
      .join('|');
    lines.push(
      [
        csv(r.keyword),
        r._lang,
        r.search_volume ?? 0,
        (r.cpc ?? 0).toFixed(2),
        (r.competition_index ?? 0),
        (r.low_top_of_page_bid ?? 0).toFixed(2),
        (r.high_top_of_page_bid ?? 0).toFixed(2),
        csv(trend),
        csv(sources.join(' | ')),
      ].join(','),
    );
  });

fs.writeFileSync(OUT_CSV, lines.join('\n'));
console.log(`Wrote ${OUT_CSV}\n`);

// ── 5. Quick on-screen summary ───────────────────────────────────────────────

const sorted = allResults.slice().sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));
console.log('Top 25 by volume (across all languages):');
for (const r of sorted.slice(0, 25)) {
  console.log(
    `  [${r._lang}] ${(r.search_volume || 0).toString().padStart(7)}  ${(r.cpc || 0).toFixed(2).padStart(6)}$  ${r.keyword}`,
  );
}

const zero = sorted.filter((r) => !r.search_volume).length;
const totalVol = sorted.reduce((s, r) => s + (r.search_volume || 0), 0);
const totalCpcVal = sorted.reduce((s, r) => s + (r.search_volume || 0) * (r.cpc || 0), 0);

console.log(`\n=== SUMMARY ===`);
console.log(`Keywords with zero volume: ${zero}/${sorted.length}  (consider removing)`);
console.log(`Total monthly search volume: ${totalVol.toLocaleString()}`);
console.log(`Implied PPC value (volume × CPC): $${totalCpcVal.toFixed(0)}/mo if you ranked #1 paid`);
