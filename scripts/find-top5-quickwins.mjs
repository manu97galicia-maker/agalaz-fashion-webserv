// Find keywords where agalaz can realistically reach TOP 5 in 2-6 weeks.
//
// Criteria:
//   - vol >= 100/mo, <= 3000/mo (low enough big sites don't bother)
//   - kw_difficulty <= 5
//   - SERP top 5 contains AT LEAST 2 of: reddit, quora, youtube, pinterest,
//     tiktok, instagram, or small blogs (apex domain not in known retailer list)
//   - intent: informational or commercial (avoid retailer-locked transactional)
//
// Then: SERP-verify each one. Output ranked by softness × volume / sqrt(kd+1).

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

// Seeds — visualization / "what looks good on me" / face shape / outfit-by-occasion
// queries where Pinterest + Reddit + small blogs dominate.
const SEEDS = [
  // English visualization (Pinterest SERPs)
  { seed: 'curtain bangs',           lang: 'en', loc: 2840 },
  { seed: 'butterfly haircut',       lang: 'en', loc: 2840 },
  { seed: 'wolf cut',                lang: 'en', loc: 2840 },
  { seed: 'jellyfish haircut',       lang: 'en', loc: 2840 },
  { seed: 'octopus haircut',         lang: 'en', loc: 2840 },
  { seed: 'pixie cut short',         lang: 'en', loc: 2840 },
  { seed: 'glazed donut nails',      lang: 'en', loc: 2840 },
  { seed: 'milky white nails',       lang: 'en', loc: 2840 },
  { seed: 'chrome nails',            lang: 'en', loc: 2840 },
  { seed: 'aura nails',              lang: 'en', loc: 2840 },
  // Spanish visualization
  { seed: 'corte mariposa pelo',     lang: 'es', loc: 2724 },
  { seed: 'corte wolf cut',          lang: 'es', loc: 2724 },
  { seed: 'unas cromadas',           lang: 'es', loc: 2724 },
  { seed: 'unas aura',               lang: 'es', loc: 2724 },
  { seed: 'flequillo cortina',       lang: 'es', loc: 2724 },
  // Mexico-specific
  { seed: 'corte mariposa',          lang: 'es', loc: 2484 },
  { seed: 'unas glazed donut',       lang: 'es', loc: 2484 },
  // French
  { seed: 'wolf cut cheveux',        lang: 'fr', loc: 2250 },
  { seed: 'frange rideau',           lang: 'fr', loc: 2250 },
  { seed: 'ongles glazed donut',     lang: 'fr', loc: 2250 },
  // Italian
  { seed: 'wolf cut capelli',        lang: 'it', loc: 2380 },
  { seed: 'frangia tendina',         lang: 'it', loc: 2380 },
  { seed: 'unghie glazed donut',     lang: 'it', loc: 2380 },
  // Portuguese BR
  { seed: 'corte borboleta cabelo',  lang: 'pt', loc: 2076 },
  { seed: 'wolf cut feminino',       lang: 'pt', loc: 2076 },
  { seed: 'unha glazed donut',       lang: 'pt', loc: 2076 },
  // German
  { seed: 'curtain bangs deutsch',   lang: 'de', loc: 2276 },
  { seed: 'wolf cut frau',           lang: 'de', loc: 2276 },
];

const SOFT = new Set(['reddit.com', 'quora.com', 'youtube.com', 'pinterest.com', 'pinterest.es', 'pinterest.com.mx', 'pinterest.com.br', 'pinterest.fr', 'pinterest.de', 'pinterest.it', 'medium.com', 'blogspot.com', 'tiktok.com', 'instagram.com', 'tumblr.com']);
const HARD = new Set(['amazon.com', 'amazon.es', 'amazon.com.mx', 'amazon.com.br', 'amazon.fr', 'amazon.it', 'amazon.de', 'etsy.com', 'walmart.com', 'target.com', 'ebay.com', 'sephora.com', 'ulta.com', 'sallybeauty.com', 'zalando.com', 'zalando.de']);
const MEDIA_BIG = new Set(['vogue.com', 'glamour.com', 'cosmopolitan.com', 'elle.com', 'allure.com', 'byrdie.com', 'instyle.com', 'realsimple.com', 'goodhousekeeping.com', 'harpersbazaar.com', 'people.com']);
const MEDIA_MID = new Set(['therighthairstyles.com', 'latest-hairstyles.com', 'whowhatwear.com', 'thecut.com', 'refinery29.com', 'beauty-bay.com', 'taaora.fr', 'camillealbane.com', 'franckprovost.com', 'vogue.it', 'vogue.es']);

function apex(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, '').split('.').slice(-2).join('.'); } catch { return ''; }
}

async function dfs(endpoint, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

const allCandidates = [];
console.log('Fetching keyword candidates...\n');
for (const s of SEEDS) {
  process.stdout.write(`[${s.lang} loc:${s.loc}] ${s.seed.padEnd(28)} `);
  try {
    const items = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: s.seed, language_code: s.lang, location_code: s.loc, limit: 100, include_seed_keyword: true,
      filters: [['keyword_info.search_volume', '>=', 100], 'and', ['keyword_info.search_volume', '<=', 3000], 'and', ['keyword_properties.keyword_difficulty', '<=', 5]],
      order_by: ['keyword_info.search_volume,desc'],
    }]);
    for (const it of items) {
      allCandidates.push({
        kw: it.keyword, lang: s.lang, loc: s.loc, seed: s.seed,
        vol: it.keyword_info?.search_volume ?? 0,
        kd: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent ?? '',
      });
    }
    console.log(`→ ${items.length} hits`);
  } catch (e) { console.log(`FAIL: ${e.message.slice(0, 40)}`); }
  await new Promise((r) => setTimeout(r, 250));
}

// Dedupe
const dedup = new Map();
for (const r of allCandidates) {
  const k = `${r.loc}|${r.kw.toLowerCase()}`;
  if (!dedup.has(k) || dedup.get(k).vol < r.vol) dedup.set(k, r);
}
let candidates = [...dedup.values()].filter((c) => c.intent !== 'navigational');
candidates.sort((a, b) => b.vol - a.vol);
candidates = candidates.slice(0, 60); // SERP-verify top 60

console.log(`\nDeduplicated: ${dedup.size} unique → SERP-verifying top 60...\n`);

const verified = [];
for (const c of candidates) {
  process.stdout.write(`[${c.lang} ${c.vol.toString().padStart(4)}/mo kd:${c.kd}] ${c.kw.slice(0, 42).padEnd(44)} `);
  try {
    const items = await dfs('serp/google/organic/live/advanced',
      [{ keyword: c.kw, language_code: c.lang, location_code: c.loc, depth: 10, device: 'desktop' }]);
    const organic = items.filter((it) => it.type === 'organic');
    // Top-5 softness: 2 soft = 4 points, 1 soft = 2 points, hard = -2
    let top5Score = 0, softInTop5 = 0;
    for (const it of organic.slice(0, 5)) {
      const a = apex(it.url || '');
      if (SOFT.has(a)) { top5Score += 2; softInTop5++; }
      else if (HARD.has(a)) top5Score -= 3;
      else if (MEDIA_BIG.has(a)) top5Score -= 1;
      else if (MEDIA_MID.has(a)) top5Score += 0; // neutral
      else top5Score += 1; // unknown small site
    }
    const top3 = organic.slice(0, 3).map((i) => apex(i.url || '')).join(' | ');
    const realistic = softInTop5 >= 2; // at least 2 of top 5 are beatable
    verified.push({ ...c, top5Score, softInTop5, top3, realistic });
    console.log(`top5=${top5Score.toString().padStart(2)} soft=${softInTop5}  ${top3.slice(0, 55)}`);
  } catch (e) { console.log(`FAIL: ${e.message.slice(0, 40)}`); }
  await new Promise((r) => setTimeout(r, 250));
}

verified.sort((a, b) => (b.realistic ? 1 : 0) - (a.realistic ? 1 : 0) || b.top5Score - a.top5Score || b.vol - a.vol);

const LOC = { 2840: 'US', 2826: 'GB', 2724: 'ES', 2250: 'FR', 2076: 'BR', 2380: 'IT', 2276: 'DE', 2484: 'MX' };

console.log('\n=== REALISTIC TOP-5 CANDIDATES (vol 100-3000, kd ≤5, top 5 has ≥2 beatable sites) ===\n');
console.log('  loc lang  vol  kd  top5  soft  top3 SERP                                     keyword');
const winners = verified.filter((v) => v.realistic).slice(0, 30);
for (const v of winners) {
  console.log(
    `  ${LOC[v.loc].padEnd(3)} ${v.lang.padEnd(4)} ${v.vol.toString().padStart(4)} ${v.kd.toString().padStart(2)}   ${v.top5Score.toString().padStart(3)}   ${v.softInTop5}/5   ${v.top3.slice(0, 55).padEnd(55)}  ${v.kw}`,
  );
}

const csv = (s) => { if (s == null) return ''; const v = String(s); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
fs.writeFileSync('tmp/top5-quickwins.csv',
  ['keyword,lang,location,volume,kd,intent,top5_score,soft_in_top5,realistic,top3', ...verified.map((r) => [csv(r.kw), r.lang, r.loc, r.vol, r.kd, r.intent, r.top5Score, r.softInTop5, r.realistic, csv(r.top3)].join(','))].join('\n'));
console.log(`\nWrote tmp/top5-quickwins.csv (${verified.length} verified, ${winners.length} realistic top-5 targets)`);
