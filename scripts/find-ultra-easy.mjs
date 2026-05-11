// Find ultra-easy SEO wins for a young domain.
//
// Criteria:
//   - Volume 100-800/mo (low enough that big retailers don't bother)
//   - KD 0 (DataForSEO Labs heuristic)
//   - SERP top 5 contains Reddit/Quora/YouTube/Pinterest/small blogs (no
//     Amazon, Etsy, Sephora, Vogue, etc.)
//   - Informational or commercial intent (transactional = retailer-locked)
//
// For each candidate, run a real SERP check via DataForSEO and compute
// softness. Output: ranked list of keywords a brand-new domain can plausibly
// rank for in 4-8 weeks with decent content.

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

// Fresh seeds — ultra-niche, low-competition queries Agalaz can serve.
// Question-format and visualization-intent queries tend to have softer SERPs.
const NEW_SEEDS = [
  // English visualization queries (Agalaz natural fit)
  { seed: 'how would i look',                lang: 'en', loc: 2840 },
  { seed: 'see how i look in',               lang: 'en', loc: 2840 },
  { seed: 'try on virtual',                  lang: 'en', loc: 2840 },
  { seed: 'how would i look with bangs',     lang: 'en', loc: 2840 },
  { seed: 'how to know if outfit suits me',  lang: 'en', loc: 2840 },
  // Specific nail/hair queries
  { seed: 'french tip almond nails',         lang: 'en', loc: 2840 },
  { seed: 'milky white nails',               lang: 'en', loc: 2840 },
  { seed: 'short bob with bangs',            lang: 'en', loc: 2840 },
  { seed: 'butterfly haircut',               lang: 'en', loc: 2840 },
  // Cosplay long-tail
  { seed: 'genshin cosplay',                 lang: 'en', loc: 2840 },
  { seed: 'demon slayer cosplay',            lang: 'en', loc: 2840 },
  { seed: 'cheap cosplay',                   lang: 'en', loc: 2840 },
  // Spanish ultra-niche
  { seed: 'como me quedaria',                lang: 'es', loc: 2724 },
  { seed: 'unas estilo coquette',            lang: 'es', loc: 2724 },
  { seed: 'corte de pelo cara',              lang: 'es', loc: 2724 },
  // French ultra-niche
  { seed: 'coupe cheveux visage',            lang: 'fr', loc: 2250 },
  { seed: 'ongles court tendance',           lang: 'fr', loc: 2250 },
  // Italian
  { seed: 'taglio capelli viso',             lang: 'it', loc: 2380 },
  { seed: 'unghie corte',                    lang: 'it', loc: 2380 },
  // Portuguese BR
  { seed: 'corte de cabelo rosto',           lang: 'pt', loc: 2076 },
  { seed: 'unhas curtas',                    lang: 'pt', loc: 2076 },
];

async function fetchSuggestions({ seed, lang, loc }) {
  const body = [{
    keyword: seed, language_code: lang, location_code: loc, limit: 100, include_seed_keyword: true,
    filters: [
      ['keyword_info.search_volume', '>=', 100],
      'and', ['keyword_info.search_volume', '<=', 800],
      'and', ['keyword_properties.keyword_difficulty', '<=', 3],
    ],
    order_by: ['keyword_info.search_volume,desc'],
  }];
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

const all = [];
for (const s of NEW_SEEDS) {
  process.stdout.write(`[${s.lang} loc:${s.loc}] ${s.seed.padEnd(34)} `);
  try {
    const items = await fetchSuggestions(s);
    for (const it of items) {
      const ki = it.keyword_info || {};
      const kp = it.keyword_properties || {};
      all.push({
        keyword: it.keyword, lang: s.lang, location: s.loc, seed: s.seed,
        volume: ki.search_volume ?? 0,
        difficulty: kp.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent || '',
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

// Dedupe
const dedup = new Map();
for (const r of all) {
  const k = `${r.location}|${r.keyword.toLowerCase()}`;
  if (!dedup.has(k) || dedup.get(k).volume < r.volume) dedup.set(k, r);
}
let candidates = [...dedup.values()].filter((r) =>
  (r.intent === 'informational' || r.intent === 'commercial') && r.difficulty <= 3,
);
candidates.sort((a, b) => b.volume - a.volume);

// SERP-verify top 50
const TARGETS = candidates.slice(0, 50);
console.log(`\nSERP-verifying ${TARGETS.length} ultra-easy candidates...\n`);

const SOFT = new Set(['reddit.com', 'quora.com', 'youtube.com', 'pinterest.com', 'pinterest.es', 'pinterest.fr',
  'pinterest.de', 'pinterest.it', 'pinterest.com.br', 'pinterest.com.mx', 'medium.com', 'blogspot.com',
  'wordpress.com', 'tiktok.com', 'tumblr.com']);
const HARD = new Set(['amazon.com', 'amazon.es', 'amazon.fr', 'amazon.de', 'amazon.it', 'amazon.com.br',
  'etsy.com', 'walmart.com', 'target.com', 'ebay.com', 'sephora.com', 'ulta.com',
  'misterspex.de', 'apollo.de', 'eyebuydirect.com', 'zenni.com', 'warbyparker.com',
  'azazie.com', 'birdygrey.com', 'bhldn.com', 'davidsbridal.com',
  'partycity.com', 'spirithalloween.com', 'halloweencostumes.com',
  'zalando.de', 'zalando.com', 'zara.com', 'mango.com', 'asos.com',
  'glamour.com', 'vogue.com', 'cosmopolitan.com', 'elle.com', 'allure.com', 'byrdie.com',
  'instyle.com', 'goodhousekeeping.com']);

function apexOf(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    return host.split('.').slice(-2).join('.');
  } catch { return ''; }
}

async function fetchSerp({ keyword, lang, location }) {
  const body = [{ keyword, language_code: lang, location_code: location, depth: 10, device: 'desktop' }];
  const res = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return (json.tasks?.[0]?.result?.[0]?.items || []).filter((it) => it.type === 'organic');
}

const verified = [];
for (const c of TARGETS) {
  process.stdout.write(`[${c.lang}] ${c.keyword.slice(0, 50).padEnd(52)} `);
  try {
    const items = await fetchSerp(c);
    let score = 0;
    for (const it of items.slice(0, 10)) {
      const apex = apexOf(it.url || '');
      if (SOFT.has(apex)) score += 2;
      else if (HARD.has(apex)) score -= 2;
      else score += 1;
    }
    verified.push({ ...c, softness: score, top3: items.slice(0, 3).map((i) => apexOf(i.url || '')).join(' | ') });
    console.log(`softness:${score.toString().padStart(3)}  ${verified[verified.length-1].top3.slice(0,55)}`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 40)}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}

// Sort by softness × volume / sqrt(kd+1)
verified.sort((a, b) => (b.softness * b.volume / Math.sqrt(b.difficulty + 1)) - (a.softness * a.volume / Math.sqrt(a.difficulty + 1)));

const LOC_LABEL = { 2840: 'US', 2826: 'GB', 2724: 'ES', 2250: 'FR', 2076: 'BR', 2380: 'IT', 2276: 'DE', 2484: 'MX', 2356: 'IN' };

console.log('\n=== TOP 20 ULTRA-EASY KEYWORDS (low vol + KD 0 + soft SERP) ===\n');
console.log('  loc lang  vol  kd  soft  top3 in SERP                                          keyword');
for (const r of verified.filter((r) => r.softness >= 6).slice(0, 20)) {
  console.log(
    `  ${LOC_LABEL[r.location].padEnd(3)} ${r.lang.padEnd(4)} ${r.volume.toString().padStart(4)} ${r.difficulty.toString().padStart(2)}  ${r.softness.toString().padStart(3)}   ${r.top3.slice(0, 55).padEnd(55)}  ${r.keyword}`,
  );
}

fs.writeFileSync('tmp/ultra-easy.csv',
  ['keyword,lang,location,volume,kd,intent,softness,top3', ...verified.map((r) => `"${r.keyword}",${r.lang},${r.location},${r.volume},${r.difficulty},${r.intent},${r.softness},"${r.top3}"`)].join('\n'));
console.log(`\nWrote tmp/ultra-easy.csv (${verified.length} keywords)`);
