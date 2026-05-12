// 1) Exact volume + KD for "vestido invitada boda" head term.
// 2) Find low-KD long-tails with VISUALIZATION INTENT (queries where the
//    user wants to SEE how something looks on them — exactly Agalaz's UVP).
//
// Visualization-intent queries are the dream for try-on tools because they
// contain phrases like:
//   - "como queda" / "como me queda" / "como se ve"
//   - "ideas para mi" / "para mi cuerpo"
//   - "que tipo de X me favorece"
//   - "como saber si X me sienta bien"
//   - "X para cara [shape]" / "X para cuerpo [shape]"
//   - "antes de comprar" / "antes del salón"
//   - "como combinar X con Y"

import fs from 'fs';
function loadEnv() {
  const f = '.env.local';
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)$/);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

async function dfs(endpoint, body) {
  const r = await fetch(`https://api.dataforseo.com/v3/${endpoint}`,
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.status_code !== 20000) throw new Error(j.status_message);
  return j.tasks?.[0]?.result?.[0];
}

// 1) Head term audit
console.log('=== HEAD TERM AUDIT — vestido invitada boda ===\n');
const HEAD_TERMS = [
  { kw: 'vestido invitada boda',         lang: 'es', loc: 2724 },
  { kw: 'vestido de invitada de boda',   lang: 'es', loc: 2724 },
  { kw: 'vestido invitada',              lang: 'es', loc: 2724 },
  { kw: 'invitada boda',                 lang: 'es', loc: 2724 },
];
for (const h of HEAD_TERMS) {
  try {
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [h.kw], language_code: h.lang, location_code: h.loc }]);
    const item = ov?.items?.[0];
    const vol = item?.keyword_info?.search_volume ?? 0;
    const kd = item?.keyword_properties?.keyword_difficulty ?? 0;
    const cpc = item?.keyword_info?.cpc ?? 0;
    console.log(`  ${h.kw.padEnd(34)} vol:${vol.toString().padStart(6)}  kd:${kd.toString().padStart(2)}  cpc:$${cpc.toFixed(2)}`);
  } catch (e) { console.log(`  ${h.kw}: FAIL`); }
  await new Promise((r) => setTimeout(r, 250));
}

// 2) Visualization-intent long-tail seeds across Agalaz verticals
console.log('\n\n=== VISUALIZATION-INTENT SEEDS (KD ≤ 5) ===\n');
const SEEDS = [
  // ES — visualization phrases
  { seed: 'como queda vestido',          lang: 'es', loc: 2724 },
  { seed: 'como me queda',               lang: 'es', loc: 2724 },
  { seed: 'que vestido me favorece',     lang: 'es', loc: 2724 },
  { seed: 'vestido segun cuerpo',        lang: 'es', loc: 2724 },
  { seed: 'corte de pelo segun cara',    lang: 'es', loc: 2724 },
  { seed: 'gafas segun cara',            lang: 'es', loc: 2724 },
  { seed: 'tipo de cuerpo mujer',        lang: 'es', loc: 2724 },
  { seed: 'flequillo me favorece',       lang: 'es', loc: 2724 },
  { seed: 'como saber si me queda bien', lang: 'es', loc: 2724 },
  { seed: 'antes de comprar vestido',    lang: 'es', loc: 2724 },
  { seed: 'probarse antes',              lang: 'es', loc: 2724 },
  { seed: 'ideas vestido boda invitada', lang: 'es', loc: 2724 },
  { seed: 'que tipo de cuerpo tengo',    lang: 'es', loc: 2724 },
];

const all = [];
for (const s of SEEDS) {
  process.stdout.write(`  [${s.seed.slice(0, 32).padEnd(34)}] `);
  try {
    const items = (await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: s.seed, language_code: s.lang, location_code: s.loc,
      limit: 50, include_seed_keyword: true,
      filters: [['keyword_info.search_volume', '>=', 500], 'and', ['keyword_properties.keyword_difficulty', '<=', 5]],
      order_by: ['keyword_info.search_volume,desc'],
    }]))?.items ?? [];
    for (const it of items) {
      all.push({
        kw: it.keyword,
        seed: s.seed,
        vol: it.keyword_info?.search_volume ?? 0,
        kd: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent ?? '',
      });
    }
    console.log(`${items.length} hits`);
  } catch (e) { console.log('FAIL'); }
  await new Promise((r) => setTimeout(r, 300));
}

// Dedup + filter for visualization phrases
const VIS_PATTERNS = [
  /como queda/i, /como me/i, /como se ve/i, /me favorece/i, /me sienta/i, /me queda/i,
  /me veo/i, /tipo de cuerpo/i, /tipo de cara/i, /cara redonda/i, /cara ovalada/i,
  /cara cuadrada/i, /cara diamante/i, /cara corazon/i, /antes de comprar/i, /me sirve/i,
  /me favorecen/i, /favorece/i, /flatter/i, /probarse/i, /ideas para/i, /que ponerme/i,
  /ideas de/i, /look para/i, /segun/i, /para mi/i, /^que /i,
];
const visualization = [];
const dedup = new Map();
for (const r of all) {
  if (!dedup.has(r.kw) || dedup.get(r.kw).vol < r.vol) dedup.set(r.kw, r);
}
for (const r of dedup.values()) {
  const isVis = VIS_PATTERNS.some((p) => p.test(r.kw));
  if (isVis) visualization.push(r);
}
visualization.sort((a, b) => b.vol - a.vol);

console.log('\n=== TOP 40 ES VISUALIZATION-INTENT LONG-TAILS (vol≥500, KD≤5) ===\n');
console.log('  vol     kd  intent          keyword');
for (const r of visualization.slice(0, 40)) {
  console.log(`  ${r.vol.toString().padStart(6)} ${r.kd.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.kw}`);
}

// 3) Specific wedding-guest dress visualization variants
console.log('\n\n=== Wedding-guest dress VISUALIZATION variants (ES) ===\n');
const WEDDING_SEEDS = [
  { seed: 'vestido invitada boda',       lang: 'es', loc: 2724 },
  { seed: 'vestido boda invitada otoño', lang: 'es', loc: 2724 },
  { seed: 'vestido boda invitada verano', lang: 'es', loc: 2724 },
];
const wedding = [];
for (const s of WEDDING_SEEDS) {
  process.stdout.write(`  [${s.seed.slice(0, 32).padEnd(34)}] `);
  try {
    const items = (await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: s.seed, language_code: s.lang, location_code: s.loc,
      limit: 100, include_seed_keyword: true,
      filters: [['keyword_info.search_volume', '>=', 500], 'and', ['keyword_properties.keyword_difficulty', '<=', 8]],
      order_by: ['keyword_info.search_volume,desc'],
    }]))?.items ?? [];
    for (const it of items) {
      wedding.push({
        kw: it.keyword,
        vol: it.keyword_info?.search_volume ?? 0,
        kd: it.keyword_properties?.keyword_difficulty ?? 0,
        intent: it.search_intent_info?.main_intent ?? '',
      });
    }
    console.log(`${items.length} hits`);
  } catch (e) { console.log('FAIL'); }
  await new Promise((r) => setTimeout(r, 300));
}

// Dedup wedding
const wdedup = new Map();
for (const r of wedding) if (!wdedup.has(r.kw) || wdedup.get(r.kw).vol < r.vol) wdedup.set(r.kw, r);
const wrows = [...wdedup.values()].sort((a, b) => b.vol - a.vol).slice(0, 30);

console.log('\n=== Top 30 wedding-guest variants in ES (KD ≤ 8) ===\n');
console.log('  vol     kd  intent          keyword');
for (const r of wrows) {
  console.log(`  ${r.vol.toString().padStart(6)} ${r.kd.toString().padStart(2)}  ${r.intent.padEnd(13)}  ${r.kw}`);
}

fs.writeFileSync('tmp/visualization-longtails.json', JSON.stringify({ visualization: visualization.slice(0, 50), wedding: wrows }, null, 2));
console.log('\nWrote tmp/visualization-longtails.json');
