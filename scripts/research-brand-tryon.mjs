// Find SEO opportunities for branded "virtual try on" queries.
// (Zara, H&M, Nike, Adidas, Shein, Amazon, Sephora, Warby Parker, etc.)
//
// For each brand+vertical combination, get search volume + KD + SERP top 3
// so we can identify accessible ones for Agalaz to create branded landings.

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

// Brand + intent combinations to query
const BRAND_QUERIES = [
  // Fashion retailers + try on
  { kw: 'zara virtual try on', lang: 'en', loc: 2840 },
  { kw: 'h&m virtual try on', lang: 'en', loc: 2840 },
  { kw: 'shein virtual try on', lang: 'en', loc: 2840 },
  { kw: 'amazon virtual try on', lang: 'en', loc: 2840 },
  { kw: 'asos virtual try on', lang: 'en', loc: 2840 },
  { kw: 'nike virtual try on', lang: 'en', loc: 2840 },
  { kw: 'adidas virtual try on', lang: 'en', loc: 2840 },
  // Beauty
  { kw: 'sephora virtual try on', lang: 'en', loc: 2840 },
  { kw: 'ulta virtual try on', lang: 'en', loc: 2840 },
  { kw: 'maybelline virtual try on', lang: 'en', loc: 2840 },
  { kw: 'loreal virtual try on', lang: 'en', loc: 2840 },
  { kw: 'mac virtual try on', lang: 'en', loc: 2840 },
  // Eyewear
  { kw: 'warby parker virtual try on', lang: 'en', loc: 2840 },
  { kw: 'ray ban virtual try on', lang: 'en', loc: 2840 },
  { kw: 'oakley virtual try on', lang: 'en', loc: 2840 },
  { kw: 'zenni virtual try on', lang: 'en', loc: 2840 },
  // Jewelry
  { kw: 'pandora virtual try on', lang: 'en', loc: 2840 },
  { kw: 'tiffany virtual try on', lang: 'en', loc: 2840 },
  // Hair
  { kw: 'garnier virtual try on', lang: 'en', loc: 2840 },
  // Spanish/Mexico
  { kw: 'zara probador virtual', lang: 'es', loc: 2724 },
  { kw: 'mango probador virtual', lang: 'es', loc: 2724 },
  { kw: 'shein probador virtual', lang: 'es', loc: 2724 },
  { kw: 'amazon probador virtual', lang: 'es', loc: 2724 },
  // Branded "try on" alternative phrasings
  { kw: 'try on zara clothes', lang: 'en', loc: 2840 },
  { kw: 'try on shein', lang: 'en', loc: 2840 },
  { kw: 'try on nike shoes', lang: 'en', loc: 2840 },
];

// Soft / hard domain classification (re-used logic)
const SOFT = new Set(['reddit.com', 'quora.com', 'youtube.com', 'pinterest.com', 'pinterest.es', 'pinterest.com.mx', 'medium.com', 'blogspot.com', 'tiktok.com', 'instagram.com']);
const HARD_BRAND = new Set([
  // Each brand owns its branded query
  'zara.com', 'hm.com', 'shein.com', 'amazon.com', 'amazon.es', 'amazon.com.mx', 'asos.com', 'nike.com', 'adidas.com', 'sephora.com', 'ulta.com',
  'maybelline.com', 'loreal-paris.com', 'lorealparis.com', 'maccosmetics.com', 'warbyparker.com', 'ray-ban.com', 'oakley.com', 'zenni.com',
  'pandora.net', 'tiffany.com', 'garnierusa.com', 'mango.com', 'mangoshop.com',
]);
const HARD = new Set(['etsy.com', 'walmart.com', 'target.com', 'ebay.com', 'aliexpress.com']);
const MEDIA = new Set(['glamour.com', 'vogue.com', 'cosmopolitan.com', 'elle.com', 'allure.com', 'forbes.com']);

function apexOf(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, '').split('.').slice(-2).join('.'); } catch { return ''; }
}

async function dataforseo(endpoint, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return json.tasks?.[0]?.result?.[0]?.items || [];
}

console.log('=== BRANDED VIRTUAL TRY-ON OPPORTUNITIES ===\n');
console.log('  loc keyword                              vol     kd  softness  top3 SERP');
console.log('  --- ------------------------------------ ------- --- --------  ---------');

const results = [];
for (const q of BRAND_QUERIES) {
  try {
    // Search volume + KD
    const volBody = [{
      keywords: [q.kw], language_code: q.lang, location_code: q.loc,
    }];
    const volRes = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live',
      { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(volBody) });
    const volJson = await volRes.json();
    const item = volJson.tasks?.[0]?.result?.[0]?.items?.[0];
    const volume = item?.keyword_info?.search_volume ?? 0;
    const kd = item?.keyword_properties?.keyword_difficulty ?? 0;

    if (volume < 100) {
      console.log(`  ${q.kw.padEnd(36)} vol:0 — skipped`);
      continue;
    }

    // SERP
    await new Promise((r) => setTimeout(r, 250));
    const serp = await dataforseo('serp/google/organic/live/advanced',
      [{ keyword: q.kw, language_code: q.lang, location_code: q.loc, depth: 10, device: 'desktop' }]);
    const items = serp.filter((it) => it.type === 'organic');

    // Softness — but for branded queries, the brand-domain owning #1 doesn't count as locked because
    // it's the natural authoritative result.
    let score = 0;
    for (const it of items.slice(0, 10)) {
      const apex = apexOf(it.url || '');
      if (SOFT.has(apex)) score += 2;
      else if (HARD_BRAND.has(apex)) score -= 3; // Brand owning its own SERP is brutal
      else if (HARD.has(apex)) score -= 2;
      else if (MEDIA.has(apex)) score -= 1;
      else score += 1;
    }
    const top3 = items.slice(0, 3).map((i) => apexOf(i.url || '')).join(' | ');
    console.log(`  ${q.kw.padEnd(36)} ${volume.toString().padStart(6)} ${kd.toString().padStart(3)}  ${score.toString().padStart(3)}    ${top3}`);
    results.push({ ...q, volume, kd, softness: score, top3 });
  } catch (e) {
    console.log(`  ${q.kw}: FAIL ${e.message.slice(0, 40)}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}

results.sort((a, b) => b.volume - a.volume);

console.log('\n=== ACCESSIBLE BRAND QUERIES (softness >= 3, vol >= 500) ===');
for (const r of results.filter((r) => r.softness >= 3 && r.volume >= 500)) {
  console.log(`  ${r.volume.toString().padStart(6)}/mo  kd:${r.kd.toString().padStart(2)}  softness:${r.softness}  ${r.kw}`);
  console.log(`           top3: ${r.top3}`);
}

fs.writeFileSync('tmp/brand-tryon-research.csv',
  ['keyword,lang,location,volume,kd,softness,top3', ...results.map((r) => `"${r.kw}",${r.lang},${r.loc},${r.volume},${r.kd},${r.softness},"${r.top3}"`)].join('\n'));
console.log('\nWrote tmp/brand-tryon-research.csv');
