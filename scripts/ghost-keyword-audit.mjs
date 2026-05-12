// Comprehensive audit: for EVERY localized try-on landing, find:
//   1. Current target keyword's actual volume (the slug-derived term)
//   2. Top 3-5 high-volume alternatives in that vertical+language
//   3. Recommendation: REBRAND meta vs CREATE new dedicated landing
//
// Output: tmp/ghost-keyword-audit.csv with actionable per-URL data.

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

// Per-URL: (url, current target kw, broader seed for finding real volume, lang, loc)
const URLS = [
  // ── ES (Spain) ──
  { url: '/es/probador-bikini',          currentKw: 'probador bikini',           seed: 'bañador mujer',         lang: 'es', loc: 2724 },
  { url: '/es/probador-pendientes',      currentKw: 'probador pendientes virtual', seed: 'pendientes mujer',     lang: 'es', loc: 2724 },
  { url: '/es/probador-vestido-novia',   currentKw: 'probador vestido novia',    seed: 'vestido novia',         lang: 'es', loc: 2724 },
  { url: '/es/probador-gafas',           currentKw: 'probador gafas',            seed: 'gafas',                 lang: 'es', loc: 2724 },
  { url: '/es/probador-joyas',           currentKw: 'probador joyas virtual',    seed: 'joyas mujer',           lang: 'es', loc: 2724 },
  { url: '/es/probador-traje-hombre',    currentKw: 'probador traje hombre',     seed: 'traje hombre',          lang: 'es', loc: 2724 },
  { url: '/es/probador-ropa-bebe',       currentKw: 'ropa para bebé',            seed: 'ropa bebé',             lang: 'es', loc: 2724 },
  { url: '/es/probador-peinados',        currentKw: 'probador peinados',         seed: 'peinados mujer',        lang: 'es', loc: 2724 },
  // ── FR ──
  { url: '/fr/essayage-bikini',          currentKw: 'essayage bikini virtuel',   seed: 'maillot de bain femme', lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-boucles-oreilles', currentKw: 'essayage boucles oreilles virtuel', seed: "boucles d'oreilles femme", lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-robe-mariee',     currentKw: 'essayage robe mariée',      seed: 'robe de mariée',        lang: 'fr', loc: 2250 },
  { url: '/fr/simulateur-vernis-ongles', currentKw: 'simulateur vernis ongles',  seed: 'vernis ongles',         lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-bijoux',          currentKw: 'essayage bijoux virtuel',   seed: 'bijoux femme',          lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-costume-homme',   currentKw: 'essayage costume homme',    seed: 'costume homme',         lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-coiffures',       currentKw: 'simulateur coiffure en ligne', seed: 'coupe de cheveux femme', lang: 'fr', loc: 2250 },
  // ── PT-BR ──
  { url: '/pt/provador-biquini',         currentKw: 'provador biquini',          seed: 'biquíni feminino',      lang: 'pt', loc: 2076 },
  { url: '/pt/provador-brincos',         currentKw: 'provador brincos',          seed: 'brincos femininos',     lang: 'pt', loc: 2076 },
  { url: '/pt/provador-vestido-noiva',   currentKw: 'vestido de noiva online',   seed: 'vestido de noiva',      lang: 'pt', loc: 2076 },
  { url: '/pt/simulador-unhas',          currentKw: 'simulador de unhas',        seed: 'unhas decoradas',       lang: 'pt', loc: 2076 },
  { url: '/pt/provador-oculos',          currentKw: 'provador óculos',           seed: 'óculos feminino',       lang: 'pt', loc: 2076 },
  { url: '/pt/provador-joias',           currentKw: 'provador joias',            seed: 'joias femininas',       lang: 'pt', loc: 2076 },
  { url: '/pt/provador-fato-homem',      currentKw: 'fato homem online',         seed: 'terno masculino',       lang: 'pt', loc: 2076 },
  { url: '/pt/provador-penteados',       currentKw: 'simulador penteado',        seed: 'corte de cabelo feminino', lang: 'pt', loc: 2076 },
  // ── IT ──
  { url: '/it/prova-bikini',             currentKw: 'prova bikini',              seed: 'costumi da bagno donna', lang: 'it', loc: 2380 },
  { url: '/it/prova-orecchini',          currentKw: 'prova orecchini',           seed: 'orecchini donna',       lang: 'it', loc: 2380 },
  { url: '/it/simulatore-unghie',        currentKw: 'simulatore unghie',         seed: 'unghie decorate',       lang: 'it', loc: 2380 },
  { url: '/it/prova-gioielli',           currentKw: 'prova gioielli online',     seed: 'gioielli donna',        lang: 'it', loc: 2380 },
  { url: '/it/prova-abito-uomo',         currentKw: 'abito uomo online',         seed: 'abito uomo',            lang: 'it', loc: 2380 },
  // ── DE ──
  { url: '/de/bikini-anprobieren',       currentKw: 'bikini anprobieren',        seed: 'bikini damen',          lang: 'de', loc: 2276 },
  { url: '/de/ohrringe-anprobieren',     currentKw: 'ohrringe anprobieren',      seed: 'ohrringe damen',        lang: 'de', loc: 2276 },
  { url: '/de/brautkleid-anprobieren',   currentKw: 'brautkleid anprobieren',    seed: 'brautkleid',            lang: 'de', loc: 2276 },
  { url: '/de/naegel-simulator',         currentKw: 'nägel simulator',           seed: 'nageldesign',           lang: 'de', loc: 2276 },
  { url: '/de/schmuck-anprobieren',      currentKw: 'schmuck anprobieren',       seed: 'schmuck damen',         lang: 'de', loc: 2276 },
  { url: '/de/herrenanzug-anprobieren',  currentKw: 'herrenanzug anprobieren',   seed: 'herrenanzug',           lang: 'de', loc: 2276 },
  { url: '/de/haustierkleidung-anprobieren', currentKw: 'haustierkleidung',      seed: 'hundebekleidung',       lang: 'de', loc: 2276 },
  { url: '/de/frisuren-anprobieren',     currentKw: 'frisuren simulator',        seed: 'frisuren damen',        lang: 'de', loc: 2276 },
];

const results = [];

console.log('Auditing ' + URLS.length + ' localized try-on landings...\n');

for (const t of URLS) {
  process.stdout.write(`[${t.lang}] ${t.url.padEnd(48)} `);
  try {
    // 1) Get current keyword volume
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live',
      [{ keywords: [t.currentKw], language_code: t.lang, location_code: t.loc }]);
    const currentVol = ov?.items?.[0]?.keyword_info?.search_volume ?? 0;
    const currentKd = ov?.items?.[0]?.keyword_properties?.keyword_difficulty ?? 0;

    // 2) Find top alternatives from the broader seed
    await new Promise((r) => setTimeout(r, 200));
    const sug = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: t.seed, language_code: t.lang, location_code: t.loc,
      limit: 30, include_seed_keyword: true,
      filters: [['keyword_info.search_volume', '>=', 1000], 'and', ['keyword_properties.keyword_difficulty', '<=', 15]],
      order_by: ['keyword_info.search_volume,desc'],
    }]);
    const items = sug?.items ?? [];
    const top3 = items.slice(0, 3).map((it) => ({
      kw: it.keyword,
      vol: it.keyword_info?.search_volume ?? 0,
      kd: it.keyword_properties?.keyword_difficulty ?? 0,
    }));

    const recommendation = currentVol >= 500 ? 'KEEP'
      : (top3[0]?.vol ?? 0) >= 5000 ? 'CREATE_NEW_LANDING'
      : (top3[0]?.vol ?? 0) >= 500 ? 'REBRAND_META'
      : 'KEEP_AS_LONGTAIL_FARM';

    const rec = { ...t, currentVol, currentKd, top3, recommendation };
    results.push(rec);
    console.log(`vol:${currentVol.toString().padStart(5)}  → ${recommendation}  ${top3[0] ? `(${top3[0].kw} ${top3[0].vol})` : ''}`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 50)}`);
  }
  await new Promise((r) => setTimeout(r, 250));
}

// Summary
const byRec = {};
results.forEach((r) => { byRec[r.recommendation] = (byRec[r.recommendation] || 0) + 1; });
console.log('\n=== RECOMMENDATIONS SUMMARY ===');
for (const [k, v] of Object.entries(byRec)) console.log(`  ${k}: ${v}`);

// Output detailed CSV
const csv = (s) => { if (s == null) return ''; const v = String(s); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
const lines = ['url,lang,current_kw,current_vol,recommendation,top1_kw,top1_vol,top2_kw,top2_vol,top3_kw,top3_vol'];
results.forEach((r) => {
  lines.push([csv(r.url), r.lang, csv(r.currentKw), r.currentVol, r.recommendation,
    csv(r.top3[0]?.kw), r.top3[0]?.vol ?? 0,
    csv(r.top3[1]?.kw), r.top3[1]?.vol ?? 0,
    csv(r.top3[2]?.kw), r.top3[2]?.vol ?? 0].join(','));
});
fs.writeFileSync('tmp/ghost-keyword-audit.csv', lines.join('\n'));
fs.writeFileSync('tmp/ghost-keyword-audit.json', JSON.stringify(results, null, 2));

console.log('\nWrote tmp/ghost-keyword-audit.csv and .json');

// Show CREATE_NEW_LANDING + REBRAND_META in detail
console.log('\n\n=== ACTIONABLE — URLs needing action ===\n');
for (const r of results.filter((r) => r.recommendation !== 'KEEP' && r.recommendation !== 'KEEP_AS_LONGTAIL_FARM')) {
  console.log(`${r.recommendation}  ${r.url}`);
  console.log(`  Current: "${r.currentKw}" (vol ${r.currentVol})`);
  console.log(`  Top alternatives:`);
  r.top3.forEach((t) => console.log(`    ${t.kw} — vol ${t.vol} kd ${t.kd}`));
  console.log();
}
