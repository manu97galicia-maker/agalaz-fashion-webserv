// Verify keyword opportunities by checking the ACTUAL Google SERP top 10.
// A KD of 0 from DataForSEO Labs means nothing if the SERP is locked down by
// Mister Spex / Azazie / Amazon / Sephora etc. (we got burned on this).
//
// Strategy: for each candidate, fetch top-10 organic results and compute a
// "softness score":
//   +2 for each Reddit / Quora / YouTube / Pinterest / blogspot URL in top 10
//   +1 for each small blog (apex domain that's not a known retailer/media giant)
//   -2 for each Amazon / Etsy / Walmart / Target hit
//   -1 for each known retailer or major media brand
// Higher = softer SERP = easier to actually rank.

import fs from 'fs';
import path from 'path';

function loadEnvLocal() {
  const file = path.join(process.cwd(), '.env.local');
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
loadEnvLocal();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

// ── Domain classification ───────────────────────────────────────────────────
const SOFT_DOMAINS = new Set([
  'reddit.com', 'quora.com', 'youtube.com', 'pinterest.com', 'pinterest.es', 'pinterest.fr',
  'pinterest.de', 'pinterest.it', 'pinterest.com.br', 'pinterest.com.mx',
  'medium.com', 'blogspot.com', 'wordpress.com', 'tiktok.com', 'tumblr.com',
]);
const HARD_RETAILERS = new Set([
  'amazon.com', 'amazon.es', 'amazon.fr', 'amazon.de', 'amazon.it', 'amazon.com.br',
  'etsy.com', 'walmart.com', 'target.com', 'ebay.com', 'sephora.com', 'ulta.com',
  'misterspex.de', 'apollo.de', 'brille24.de', 'eyebuydirect.com', 'zenni.com',
  'warbyparker.com', 'fielmann.com', 'visiondirect.com',
  'azazie.com', 'birdygrey.com', 'bhldn.com', 'davidsbridal.com', 'jjshouse.com',
  'partycity.com', 'spirithalloween.com', 'halloweencostumes.com',
  'zalando.de', 'zalando.com', 'zara.com', 'mango.com', 'asos.com',
  'glamour.com', 'vogue.com', 'cosmopolitan.com', 'elle.com', 'allure.com',
  'wikipedia.org', 'pinterest.com', // dual-listed b/c "image SERP" can be neutral
]);
const MEDIA_BRANDS = new Set([
  'glamour.com', 'vogue.com', 'cosmopolitan.com', 'elle.com', 'allure.com',
  'byrdie.com', 'instyle.com', 'goodhousekeeping.com', 'realsimple.com',
  'wedding-spot.com', 'theknot.com', 'brides.com', 'weddingwire.com',
]);

function apexOf(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    const parts = host.split('.');
    return parts.slice(-2).join('.');
  } catch { return ''; }
}

function softnessScore(items) {
  let score = 0;
  let breakdown = [];
  for (const it of items.slice(0, 10)) {
    const apex = apexOf(it.url || '');
    if (!apex) continue;
    if (SOFT_DOMAINS.has(apex)) { score += 2; breakdown.push(`+2 ${apex}`); }
    else if (HARD_RETAILERS.has(apex)) { score -= 2; breakdown.push(`-2 ${apex}`); }
    else if (MEDIA_BRANDS.has(apex)) { score -= 1; breakdown.push(`-1 ${apex}`); }
    else { score += 1; breakdown.push(`+1 ${apex}`); } // unknown small site = mild positive
  }
  return { score, breakdown };
}

// ── Load candidate keywords from existing CSVs ──────────────────────────────
function loadCsv(file) {
  if (!fs.existsSync(file)) return [];
  const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
  const headers = lines.shift().split(',');
  return lines.map((line) => {
    const cells = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g).map((c) => c.replace(/^,?"?|"?$/g, '').replace(/""/g, '"'));
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cells[i] ?? ''));
    return obj;
  });
}

const all = [];
const fileMap = [
  { f: 'tmp/longtail-opportunities.csv', volKey: 'volume', kdKey: 'kw_difficulty', langKey: 'lang', locKey: 'location' },
  { f: 'tmp/tryon-opportunities.csv',    volKey: 'volume', kdKey: 'kw_difficulty', langKey: 'lang', locKey: 'location' },
  { f: 'tmp/zero-traffic-research.csv',  volKey: 'volume', kdKey: 'kw_difficulty', langKey: 'lang', locKey: 'location' },
  { f: 'tmp/round-2-research.csv',       volKey: 'volume', kdKey: 'kw_difficulty', langKey: 'lang', locKey: 'location' },
];
for (const { f, volKey, kdKey, langKey, locKey } of fileMap) {
  for (const r of loadCsv(f)) {
    const vol = +r[volKey] || 0;
    const kd = +r[kdKey] || 0;
    if (vol < 500 || vol > 6000) continue;
    if (kd > 10) continue;
    all.push({ keyword: r.keyword, lang: r[langKey], location: +r[locKey], volume: vol, difficulty: kd, intent: r.intent });
  }
}
// Dedupe by (keyword, location), keep highest volume
const dedup = new Map();
for (const r of all) {
  const k = `${r.location}|${r.keyword.toLowerCase()}`;
  if (!dedup.has(k) || dedup.get(k).volume < r.volume) dedup.set(k, r);
}
const candidates = [...dedup.values()];
candidates.sort((a, b) => b.volume / Math.sqrt((b.difficulty || 50) + 1) - a.volume / Math.sqrt((a.difficulty || 50) + 1));

// Filter informational/commercial intent first (transactional → retailer-dominated)
const ranked = candidates.filter((c) => c.intent === 'informational' || c.intent === 'commercial')
  .concat(candidates.filter((c) => c.intent !== 'informational' && c.intent !== 'commercial'));

const TARGETS = ranked.slice(0, 60); // check SERPs for top 60, pick best 15
console.log(`Checking SERPs for ${TARGETS.length} candidates...\n`);

async function fetchSerp({ keyword, lang, location }) {
  const body = [{
    keyword, language_code: lang, location_code: location, depth: 10, device: 'desktop',
  }];
  const res = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return (json.tasks?.[0]?.result?.[0]?.items || []).filter((it) => it.type === 'organic');
}

const results = [];
for (const c of TARGETS) {
  process.stdout.write(`[${c.lang} loc:${c.location} ${c.volume.toString().padStart(5)}/mo kd:${c.difficulty.toString().padStart(2)}] ${c.keyword.slice(0, 50).padEnd(52)} `);
  try {
    const items = await fetchSerp(c);
    const { score, breakdown } = softnessScore(items);
    results.push({ ...c, softnessScore: score, top3: items.slice(0, 3).map((i) => apexOf(i.url || '')).join(' | '), top10Apex: items.slice(0, 10).map((i) => apexOf(i.url || '')) });
    console.log(`softness:${score.toString().padStart(3)}  top3: ${items.slice(0, 3).map((i) => apexOf(i.url || '')).join(', ').slice(0, 60)}`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 40)}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

results.sort((a, b) => b.softnessScore - a.softnessScore || b.volume - a.volume);

const LOC_LABEL = { 2840: 'US', 2826: 'GB', 2724: 'ES', 2250: 'FR', 2076: 'BR', 2380: 'IT', 2276: 'DE', 2484: 'MX', 2356: 'IN' };

console.log('\n=== TOP 15 KEYWORDS BY ACTUAL SERP SOFTNESS ===\n');
console.log('  loc lang  vol  kd softness  top3 domains in SERP                                    keyword');
for (const r of results.filter((r) => r.softnessScore >= 4).slice(0, 15)) {
  console.log(
    `  ${LOC_LABEL[r.location].padEnd(3)} ${r.lang.padEnd(4)} ${r.volume.toString().padStart(5)} ${r.difficulty.toString().padStart(2)}  ${r.softnessScore.toString().padStart(3)}    ${r.top3.slice(0, 55).padEnd(55)}  ${r.keyword}`,
  );
}

const OUT = path.join(process.cwd(), 'tmp', 'serp-softness.csv');
fs.writeFileSync(OUT, ['keyword,lang,location,volume,kw_difficulty,intent,softness_score,top10_domains',
  ...results.map((r) => [`"${r.keyword}"`, r.lang, r.location, r.volume, r.difficulty, r.intent, r.softnessScore, `"${r.top10Apex.join(';')}"`].join(','))
].join('\n'));
console.log(`\nWrote ${OUT}`);
