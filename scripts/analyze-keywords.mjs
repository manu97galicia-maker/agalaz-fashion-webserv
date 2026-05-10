// Keyword analysis via Keywords Everywhere API.
// Reads every keyword present in the site metadata + blog primary keywords,
// hits the API in batches of 100, and writes a CSV to tmp/keyword-analysis.csv
// with: keyword | volume | cpc | competition | trend_12mo | source_count.
//
// Reads the API key from KEYWORDS_EVERYWHERE_API_KEY env var. Runs locally —
// the key never lands in git.
//
// Run with:  KEYWORDS_EVERYWHERE_API_KEY=xxx node scripts/analyze-keywords.mjs
//   (Windows PS):  $env:KEYWORDS_EVERYWHERE_API_KEY="xxx"; node scripts/analyze-keywords.mjs

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.KEYWORDS_EVERYWHERE_API_KEY;
if (!API_KEY) {
  console.error('Missing KEYWORDS_EVERYWHERE_API_KEY env var.');
  process.exit(1);
}

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'tmp');
const OUT_CSV = path.join(OUT_DIR, 'keyword-analysis.csv');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── 1. Extract keywords from metadata ────────────────────────────────────────

function findFiles(dir, ext, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === 'node_modules' || f.name.startsWith('.')) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) findFiles(p, ext, out);
    else if (f.name.endsWith(ext)) out.push(p);
  }
  return out;
}

const keywordSources = new Map(); // kw → array of source files

function addKw(kw, source) {
  const norm = kw.trim().toLowerCase();
  if (norm.length < 3 || norm.length > 100) return;
  if (!keywordSources.has(norm)) keywordSources.set(norm, []);
  keywordSources.get(norm).push(source);
}

// 1a. metadata.keywords arrays in layouts/pages
const tsxFiles = findFiles('app', '.tsx').concat(findFiles('lib', '.tsx'), findFiles('app', '.ts'), findFiles('lib', '.ts'));
for (const f of tsxFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const blocks = src.match(/keywords:\s*\[([\s\S]*?)\]/g);
  if (!blocks) continue;
  for (const block of blocks) {
    for (const m of block.matchAll(/['"`]([^'"`]+)['"`]/g)) {
      addKw(m[1], path.relative(ROOT, f));
    }
  }
}

// 1b. blog article primary keyword
const articlesSrc = fs.readFileSync('app/blog/articles.ts', 'utf8');
for (const m of articlesSrc.matchAll(/keyword:\s*['"`]([^'"`]+)['"`]/g)) {
  addKw(m[1], 'app/blog/articles.ts');
}

const allKeywords = Array.from(keywordSources.keys());
console.log(`Extracted ${allKeywords.length} unique keywords from ${tsxFiles.length} files.\n`);

// ── 2. Call Keywords Everywhere API in batches of 100 ────────────────────────

async function fetchBatch(batch) {
  const params = new URLSearchParams();
  params.append('country', 'us');
  params.append('currency', 'usd');
  params.append('dataSource', 'gkp');
  for (const kw of batch) params.append('kw[]', kw);

  const res = await fetch('https://api.keywordseverywhere.com/v1/get_keyword_data', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: params,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

const results = [];
const BATCH = 100;
for (let i = 0; i < allKeywords.length; i += BATCH) {
  const batch = allKeywords.slice(i, i + BATCH);
  process.stdout.write(`Batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(allKeywords.length / BATCH)}... `);
  try {
    const json = await fetchBatch(batch);
    if (json.data) results.push(...json.data);
    if (json.credits) console.log(`OK  (credits remaining: ${json.credits})`);
    else console.log('OK');
  } catch (e) {
    console.log(`FAIL — ${e.message}`);
  }
  // Be polite to the API.
  await new Promise((r) => setTimeout(r, 500));
}

console.log(`\nGot data for ${results.length} keywords.\n`);

// ── 3. Write CSV ─────────────────────────────────────────────────────────────

function csvEscape(s) {
  if (s == null) return '';
  const str = String(s);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const lines = ['keyword,volume,cpc_usd,competition,trend_12mo,source_count,sources'];
results
  .sort((a, b) => (b.vol || 0) - (a.vol || 0))
  .forEach((r) => {
    const sources = keywordSources.get(r.keyword) || [];
    const trend = r.trend ? r.trend.map((t) => `${t.month}:${t.value}`).join('|') : '';
    lines.push(
      [
        csvEscape(r.keyword),
        r.vol ?? 0,
        (r.cpc?.value ?? 0).toFixed(2),
        (r.competition ?? 0).toFixed(2),
        csvEscape(trend),
        sources.length,
        csvEscape(sources.join(' | ')),
      ].join(','),
    );
  });

fs.writeFileSync(OUT_CSV, lines.join('\n'));
console.log(`Wrote ${OUT_CSV}\n`);

// ── 4. Quick on-screen summary ───────────────────────────────────────────────

const sorted = results.slice().sort((a, b) => (b.vol || 0) - (a.vol || 0));
console.log('Top 20 by volume:');
for (const r of sorted.slice(0, 20)) {
  console.log(
    `  ${(r.vol || 0).toString().padStart(6)}  ${(r.cpc?.value ?? 0).toFixed(2).padStart(5)}$  ${r.keyword}`,
  );
}

const zero = sorted.filter((r) => !r.vol).length;
const totalVol = sorted.reduce((s, r) => s + (r.vol || 0), 0);
console.log(`\nKeywords with zero volume: ${zero}/${sorted.length}`);
console.log(`Total monthly search volume: ${totalVol.toLocaleString()}`);
