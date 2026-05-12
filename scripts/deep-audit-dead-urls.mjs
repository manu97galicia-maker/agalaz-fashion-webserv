// Deep technical audit of why 93 URLs aren't ranking.
//
// Reality check: not ranking ≠ broken. There are 5 distinct reasons a URL
// won't appear in Google's top 100. This script identifies WHICH reason
// applies to each "dead" URL so we know what to actually fix vs what to
// just wait for.
//
// Reasons (ranked by frequency for young domains):
//   1. NOT INDEXED — Google literally doesn't know the URL exists yet.
//      Fix: wait + IndexNow + submit to GSC.
//   2. INDEXED BUT NEW — Google has the URL but hasn't run ranking probes.
//      Fix: just wait 2-6 weeks.
//   3. INDEXED + EVALUATED, RANKED >100 — Google decided this URL is weak.
//      Fix: content quality + backlinks + on-page improvements.
//   4. TECHNICAL BLOCK — noindex, robots.txt block, broken canonical, 404.
//      Fix: code change.
//   5. THIN CONTENT / DUPLICATE — Google chose another URL as canonical.
//      Fix: content consolidation.

import fs from 'fs';

function loadEnv() {
  const file = '.env.local';
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key]) continue;
    let val = raw.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[key] = val;
  }
}
loadEnv();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

// ── 1. How many total URLs does Google have indexed for agalaz.com? ───────
async function totalIndexed() {
  const res = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ keyword: 'site:agalaz.com', language_code: 'en', location_code: 2840, depth: 100 }]) });
  const json = await res.json();
  const r = json.tasks?.[0]?.result?.[0];
  // Try multiple fields — DFS sometimes returns total in different places
  return { total: r?.total_count ?? r?.se_results_count ?? 'unknown', items: r?.items?.filter((it) => it.type === 'organic') ?? [] };
}

// ── 2. Per-URL indexation check + HTTP status ─────────────────────────────
async function isIndexed(urlPath) {
  // The exact-URL site: query — returns at most 1 result if indexed, 0 if not.
  const res = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ keyword: `site:agalaz.com${urlPath}`, language_code: 'en', location_code: 2840, depth: 10 }]) });
  const json = await res.json();
  const items = json.tasks?.[0]?.result?.[0]?.items?.filter((it) => it.type === 'organic') ?? [];
  return items.length > 0;
}

async function httpStatus(urlPath) {
  try {
    const res = await fetch(`https://agalaz.com${urlPath}`, { method: 'HEAD', redirect: 'manual' });
    return res.status;
  } catch { return 0; }
}

// ── 3. Page-level SEO health (fetch HTML, check noindex/canonical/hreflang) ─
async function pageHealth(urlPath) {
  try {
    const res = await fetch(`https://agalaz.com${urlPath}`, { redirect: 'follow' });
    if (!res.ok) return { status: res.status, noindex: false, canonical: null, hreflangCount: 0, contentLength: 0 };
    const html = await res.text();
    const headSection = html.split('</head>')[0] || '';
    const noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(headSection);
    const canonicalMatch = headSection.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;
    const hreflangCount = (headSection.match(/<link[^>]+rel=["']alternate["'][^>]+hreflang/gi) ?? []).length;
    return { status: res.status, noindex, canonical, hreflangCount, contentLength: html.length };
  } catch (e) { return { error: e.message.slice(0, 60) }; }
}

// ── Read existing position data to know which URLs were "dead" ────────────
const csvLines = fs.readFileSync('tmp/sitemap-position-forecast.csv', 'utf8').trim().split('\n');
csvLines.shift();
const allUrls = csvLines.map((line) => {
  const c = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g).map((s) => s.replace(/^,?"?|"?$/g, '').replace(/""/g, '"'));
  return { url: c[0], country: c[1], kw: c[2], vol: +c[3], pos: c[4] };
});
const deadUrls = allUrls.filter((u) => u.pos === '>100');

console.log(`\n=== DEEP AUDIT — ${deadUrls.length} dead URLs ===\n`);

// Step 1: Global indexed count
console.log('1. GOOGLE INDEX SIZE FOR AGALAZ.COM');
try {
  const { total, items } = await totalIndexed();
  console.log(`   site:agalaz.com → ${total} results returned by Google`);
  console.log(`   First 10 indexed paths:`);
  for (const it of items.slice(0, 10)) {
    try { console.log(`     ${new URL(it.url).pathname}`); } catch {}
  }
} catch (e) { console.log(`   FAIL: ${e.message.slice(0, 60)}`); }

// Step 2: Per-URL audit
console.log(`\n2. PER-URL AUDIT (${deadUrls.length} URLs — checking indexation, HTTP, SEO health)\n`);
console.log('  http  indexed  noindex  canon-ok  hreflang  size(KB)  url');
const results = [];
for (const u of deadUrls) {
  try {
    const [status, indexed, health] = await Promise.all([
      httpStatus(u.url),
      isIndexed(u.url),
      pageHealth(u.url),
    ]);
    const canonOk = health.canonical && (health.canonical.endsWith(u.url) || health.canonical === `https://agalaz.com${u.url}`);
    const sizeKb = health.contentLength ? Math.round(health.contentLength / 1024) : 0;
    const flags = [];
    if (status !== 200) flags.push(`HTTP_${status}`);
    if (!indexed) flags.push('NOT_INDEXED');
    if (health.noindex) flags.push('NOINDEX_TAG');
    if (health.canonical && !canonOk) flags.push('CANONICAL_MISMATCH');
    if (sizeKb < 30) flags.push('THIN_HTML');
    console.log(
      `  ${status.toString().padStart(3)}   ${indexed ? '✓' : '✗'}        ${health.noindex ? '✗' : '✓'}       ${canonOk ? '✓' : '?'}         ${(health.hreflangCount ?? 0).toString().padStart(2)}        ${sizeKb.toString().padStart(4)}     ${u.url}${flags.length ? ' ⚠ ' + flags.join(' ') : ''}`,
    );
    results.push({ ...u, status, indexed, ...health, canonOk, sizeKb, flags });
  } catch (e) {
    console.log(`  ERR  ${u.url}: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 200));
}

// ── Diagnosis breakdown ───────────────────────────────────────────────────
const notFound = results.filter((r) => r.status === 404);
const httpErrors = results.filter((r) => r.status && r.status !== 200 && r.status !== 404);
const blocked = results.filter((r) => r.noindex);
const canonProb = results.filter((r) => r.canonical && !r.canonOk);
const indexedDead = results.filter((r) => r.indexed && r.status === 200 && !r.noindex);
const notIndexed = results.filter((r) => !r.indexed && r.status === 200 && !r.noindex);

console.log('\n\n=== DIAGNOSIS BREAKDOWN ===\n');
console.log(`  Returning 404:                       ${notFound.length}  ${notFound.length ? '⚠ FIX URGENT' : '✓'}`);
console.log(`  HTTP errors (5xx, redirect loops):   ${httpErrors.length}  ${httpErrors.length ? '⚠ FIX URGENT' : '✓'}`);
console.log(`  Blocked by noindex tag:              ${blocked.length}  ${blocked.length ? '⚠ FIX URGENT' : '✓'}`);
console.log(`  Canonical pointing elsewhere:        ${canonProb.length}  ${canonProb.length ? '⚠ FIX URGENT' : '✓'}`);
console.log(`  Indexed but ranked >100 (real SEO):  ${indexedDead.length}  ⏳ needs backlinks + time`);
console.log(`  NOT INDEXED yet (Google never saw):  ${notIndexed.length}  ⏳ needs IndexNow + sitemap + time`);

if (notFound.length) {
  console.log('\n404s — fix immediately:');
  notFound.forEach((r) => console.log(`  - ${r.url}`));
}
if (httpErrors.length) {
  console.log('\nHTTP errors:');
  httpErrors.forEach((r) => console.log(`  - ${r.url} (${r.status})`));
}
if (blocked.length) {
  console.log('\nBlocked by noindex:');
  blocked.forEach((r) => console.log(`  - ${r.url}`));
}
if (canonProb.length) {
  console.log('\nCanonical issues:');
  canonProb.forEach((r) => console.log(`  - ${r.url} → ${r.canonical}`));
}

if (notIndexed.length > 0) {
  console.log(`\nNOT YET INDEXED (top reason): ${notIndexed.length} of ${results.length} dead URLs (${Math.round(100 * notIndexed.length / results.length)}%)`);
}

fs.writeFileSync('tmp/deep-audit.json', JSON.stringify(results, null, 2));
console.log('\nWrote tmp/deep-audit.json');
