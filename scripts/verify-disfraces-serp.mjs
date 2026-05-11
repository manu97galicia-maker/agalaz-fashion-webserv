// SERP-verify the Spanish "disfraz halloween" / "cosplay" cluster to
// separate retailer-locked queries (Amazon, Funidelia, El Corte Inglés)
// from genuinely soft queries where Pinterest / Reddit / small blogs rank.
//
// Only the soft ones are worth creating landings for.

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

// Each {keyword, volume, loc} is a top opportunity from prior scans.
const TARGETS = [
  // High volume head terms
  { kw: 'disfraz halloween',         vol: 40500, loc: 2724 }, // ES
  { kw: 'disfraz de halloween',      vol: 165000, loc: 2484 }, // MX
  { kw: 'disfraz de halloween',      vol: 33100, loc: 2724 }, // ES
  { kw: 'cosplay',                   vol: 14800, loc: 2724 }, // ES
  { kw: 'cosplay',                   vol: 40500, loc: 2484 }, // MX
  // Demographic variants
  { kw: 'disfraz halloween mujer',   vol: 14800, loc: 2724 },
  { kw: 'disfraz halloween mujeres', vol: 14800, loc: 2724 },
  { kw: 'disfraces mujer halloween', vol: 14800, loc: 2724 },
  { kw: 'disfraz halloween niñas',   vol: 9900,  loc: 2724 },
  { kw: 'disfraces halloween niñas', vol: 9900,  loc: 2724 },
  // Couples / pareja
  { kw: 'disfraz de halloween en pareja', vol: 12100, loc: 2484 },
  { kw: 'disfraz de halloween de pareja', vol: 12100, loc: 2484 },
  // Original / creative
  { kw: 'disfraces originales',      vol: 12100, loc: 2724 },
  { kw: 'disfraces carnaval',        vol: 27100, loc: 2724 },
  { kw: 'disfraz carnaval',          vol: 8100,  loc: 2724 }, // assumed
  // Niche / informational
  { kw: 'ideas disfraz halloween',   vol: 5000,  loc: 2724 }, // assumed
  { kw: 'ideas disfraz pareja',      vol: 3000,  loc: 2724 }, // assumed
  { kw: 'disfraces caseros',         vol: 4000,  loc: 2724 }, // assumed
  { kw: 'disfraces baratos',         vol: 6000,  loc: 2724 }, // assumed
];

const SOFT = new Set(['reddit.com', 'quora.com', 'youtube.com', 'pinterest.com', 'pinterest.es', 'pinterest.com.mx', 'medium.com', 'blogspot.com', 'wordpress.com', 'tiktok.com', 'tumblr.com', 'instagram.com']);
const HARD = new Set(['amazon.com', 'amazon.es', 'amazon.com.mx', 'funidelia.es', 'funidelia.com', 'elcorteingles.es', 'elcorteingles.com', 'lacasadelosdisfraces.com', 'partycity.com', 'spirithalloween.com', 'aliexpress.com', 'shein.com', 'wish.com', 'mercadolibre.com.mx', 'liverpool.com.mx', 'walmart.com.mx', 'ebay.es', 'ebay.com']);
const MEDIA = new Set(['vogue.es', 'cosmopolitan.com', 'elle.es', 'glamour.com', 'hola.com', 'telva.com', 'mujerhoy.com']);

function apexOf(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    return host.split('.').slice(-2).join('.');
  } catch { return ''; }
}

async function fetchSerp({ kw, loc }) {
  const body = [{ keyword: kw, language_code: 'es', location_code: loc, depth: 10, device: 'desktop' }];
  const res = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return (json.tasks?.[0]?.result?.[0]?.items || []).filter((it) => it.type === 'organic');
}

const LOC_LABEL = { 2724: 'ES', 2484: 'MX' };

console.log('=== SERP VERIFICATION — SPANISH DISFRACES CLUSTER ===\n');
console.log('  loc keyword                              vol     softness  top3 SERP');
console.log('  --- ------------------------------------ ------- --------  ---------');

const results = [];
for (const t of TARGETS) {
  try {
    const items = await fetchSerp(t);
    let score = 0;
    for (const it of items.slice(0, 10)) {
      const apex = apexOf(it.url || '');
      if (SOFT.has(apex)) score += 2;
      else if (HARD.has(apex)) score -= 2;
      else if (MEDIA.has(apex)) score -= 1;
      else score += 1;
    }
    const top3 = items.slice(0, 3).map((i) => apexOf(i.url || '')).join(' | ');
    const ease = score >= 6 ? '🟢' : score >= 2 ? '🟡' : '🔴';
    console.log(`  ${LOC_LABEL[t.loc]} ${t.kw.slice(0, 36).padEnd(36)}  ${t.vol.toString().padStart(6)}  ${ease} ${score.toString().padStart(3)}   ${top3}`);
    results.push({ ...t, score, top3 });
  } catch (e) {
    console.log(`  ${t.kw}: FAIL ${e.message.slice(0, 40)}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}

results.sort((a, b) => b.score - a.score);

console.log('\n=== ACCESSIBLE KEYWORDS (softness >= 4) ===');
for (const r of results.filter((r) => r.score >= 4)) {
  console.log(`  ${LOC_LABEL[r.loc]} ${r.kw.padEnd(38)} vol:${r.vol.toString().padStart(6)} softness:${r.score} -- ${r.top3}`);
}
console.log('\n=== LOCKED KEYWORDS (softness < 4) ===');
for (const r of results.filter((r) => r.score < 4)) {
  console.log(`  ${LOC_LABEL[r.loc]} ${r.kw.padEnd(38)} vol:${r.vol.toString().padStart(6)} softness:${r.score} -- ${r.top3}`);
}

fs.writeFileSync('tmp/disfraces-serp.csv',
  ['keyword,loc,volume,softness,top3', ...results.map((r) => `"${r.kw}",${r.loc},${r.vol},${r.score},"${r.top3}"`)].join('\n'));
