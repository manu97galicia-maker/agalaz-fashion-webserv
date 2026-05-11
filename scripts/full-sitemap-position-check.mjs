// Comprehensive position + traffic forecast for every targetable URL in
// the Agalaz sitemap.
//
// For each URL we map a (keyword, language, country) target, then:
//   1. Fetch live Google SERP top 100 via DataForSEO
//   2. Find Agalaz's current position (or "not in top 100")
//   3. Estimate current visits/mo from CTR × volume × position
//   4. Project visits/day at weeks 1, 2, 3, 4 assuming no further work
//      (just Google re-crawling + re-evaluating an indexed page).
//
// Output: tmp/sitemap-position-forecast.csv

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

// CTR by SERP position (industry consensus 2024-25, rounded).
const CTR_BY_POS = {
  1: 0.28, 2: 0.15, 3: 0.10, 4: 0.07, 5: 0.05, 6: 0.04, 7: 0.03, 8: 0.025, 9: 0.02, 10: 0.018,
  11: 0.014, 12: 0.012, 13: 0.010, 14: 0.009, 15: 0.008, 20: 0.006, 30: 0.003, 50: 0.001, 100: 0.0005,
};
function ctrAt(pos) {
  if (!pos || pos > 100) return 0;
  const keys = Object.keys(CTR_BY_POS).map(Number).sort((a, b) => a - b);
  for (const k of keys) {
    if (pos <= k) return CTR_BY_POS[k];
  }
  return 0;
}

// Young-domain ramp curve. A page indexed but currently buried (>50)
// climbs faster than a page already in top 20 (which is already near its
// equilibrium). Returns how many positions we expect to climb in N weeks.
function projectedPositionAfterWeeks(currentPos, weeks) {
  if (!currentPos || currentPos > 100) {
    // Not in top 100 — Google needs to evaluate. By week 4 a young domain
    // typically lands somewhere between 60-90 if the page is decent.
    const targets = { 1: 95, 2: 85, 3: 75, 4: 65 };
    return targets[weeks] ?? 100;
  }
  // For pages already ranking: assume 5-10% improvement per week up to a floor.
  // (Floor depends on competition; without per-URL competition data we use a
  // generic 10 — the realistic ceiling for young-domain organic ranking.)
  const floor = 10;
  if (currentPos <= floor) return Math.max(floor, currentPos - weeks); // already there
  // Geometric decay toward floor
  const decay = 0.85; // 15% closer per week
  let pos = currentPos;
  for (let w = 0; w < weeks; w++) {
    pos = Math.max(floor, pos - (pos - floor) * (1 - decay));
  }
  return Math.round(pos);
}

// URL → target keyword mappings. Built from sitemap.ts + landingSlugs.ts.
// volume is the head-term monthly search volume (from prior DFS scans).
const TARGETS = [
  // ── EN canonical product try-on landings (CANONICAL_LANDING_SLUGS) ─────
  { url: '/virtual-tattoo-simulator',      kw: 'virtual tattoo simulator', vol: 5400,   lang: 'en', loc: 2840 },
  { url: '/realistic-swimwear-try-on',     kw: 'virtual swimwear try on', vol: 720,    lang: 'en', loc: 2840 },
  { url: '/virtual-earring-try-on',        kw: 'virtual earring try on',  vol: 480,    lang: 'en', loc: 2840 },
  { url: '/virtual-wedding-dress-try-on',  kw: 'virtual wedding dress try on', vol: 1900, lang: 'en', loc: 2840 },
  { url: '/virtual-nail-try-on',           kw: 'virtual nail try on',     vol: 2400,   lang: 'en', loc: 2840 },
  { url: '/virtual-glasses-try-on',        kw: 'virtual glasses try on',  vol: 6600,   lang: 'en', loc: 2840 },
  { url: '/virtual-jewelry-try-on',        kw: 'virtual jewelry try on',  vol: 1300,   lang: 'en', loc: 2840 },
  { url: '/virtual-mens-suit-try-on',      kw: "virtual men's suit try on", vol: 320,  lang: 'en', loc: 2840 },
  { url: '/virtual-pet-clothing-try-on',   kw: 'virtual pet clothing try on', vol: 170, lang: 'en', loc: 2840 },
  { url: '/virtual-baby-clothing-try-on',  kw: 'virtual baby clothing try on', vol: 170, lang: 'en', loc: 2840 },
  { url: '/virtual-costume-try-on',        kw: 'virtual costume try on',  vol: 590,    lang: 'en', loc: 2840 },
  { url: '/virtual-hairstyle-try-on',      kw: 'virtual hairstyle try on', vol: 1600,  lang: 'en', loc: 2840 },
  { url: '/virtual-cosplay-try-on',        kw: 'virtual cosplay try on',  vol: 320,    lang: 'en', loc: 2840 },

  // ── ES localized (Spain) ──────────────────────────────────────────────
  { url: '/es/simulador-tatuaje',          kw: 'simulador de tatuajes',   vol: 14800,  lang: 'es', loc: 2724 },
  { url: '/es/probador-bikini',            kw: 'probador bikini',         vol: 320,    lang: 'es', loc: 2724 },
  { url: '/es/probador-pendientes',        kw: 'probador pendientes virtual', vol: 110, lang: 'es', loc: 2724 },
  { url: '/es/probador-vestido-novia',     kw: 'probador vestido novia',  vol: 590,    lang: 'es', loc: 2724 },
  { url: '/es/probador-unas',              kw: 'probador uñas virtual',   vol: 480,    lang: 'es', loc: 2724 },
  { url: '/es/probador-gafas',             kw: 'probador gafas',          vol: 1000,   lang: 'es', loc: 2724 },
  { url: '/es/probador-joyas',             kw: 'probador joyas virtual',  vol: 170,    lang: 'es', loc: 2724 },
  { url: '/es/probador-traje-hombre',      kw: 'probador traje hombre',   vol: 110,    lang: 'es', loc: 2724 },
  { url: '/es/probador-ropa-mascotas',     kw: 'ropa para mascotas',      vol: 2900,   lang: 'es', loc: 2724 },
  { url: '/es/probador-ropa-bebe',         kw: 'ropa para bebé',          vol: 4400,   lang: 'es', loc: 2724 },
  { url: '/es/probador-disfraces',         kw: 'probador disfraces',      vol: 880,    lang: 'es', loc: 2724 },
  { url: '/es/probador-peinados',          kw: 'probador peinados',       vol: 720,    lang: 'es', loc: 2724 },
  { url: '/es/probador-cosplay',           kw: 'probador cosplay',        vol: 170,    lang: 'es', loc: 2724 },

  // ── FR localized ──────────────────────────────────────────────────────
  { url: '/fr/simulateur-tatouage',        kw: 'simulateur tatouage',     vol: 4400,   lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-bikini',            kw: 'essayage bikini virtuel', vol: 90,     lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-boucles-oreilles',  kw: 'essayage boucles oreilles virtuel', vol: 110, lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-robe-mariee',       kw: 'essayage robe mariée',    vol: 390,    lang: 'fr', loc: 2250 },
  { url: '/fr/simulateur-vernis-ongles',   kw: 'simulateur vernis ongles', vol: 170,   lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-lunettes',          kw: 'essayage lunettes',       vol: 1300,   lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-bijoux',            kw: 'essayage bijoux virtuel', vol: 110,    lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-costume-homme',     kw: 'essayage costume homme',  vol: 90,     lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-vetements-animal',  kw: 'vetements pour chien',    vol: 1900,   lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-vetements-bebe',    kw: 'vêtements bébé',          vol: 6600,   lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-deguisements',      kw: 'déguisement adulte',      vol: 5400,   lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-coiffures',         kw: 'simulateur coiffure en ligne gratuit sans téléchargement', vol: 9900, lang: 'fr', loc: 2250 },
  { url: '/fr/essayage-cosplay',           kw: 'essayage cosplay',        vol: 90,     lang: 'fr', loc: 2250 },

  // ── PT localized (Brazil) ─────────────────────────────────────────────
  { url: '/pt/simulador-tatuagem',         kw: 'simulador tatuagem',      vol: 6600,   lang: 'pt', loc: 2076 },
  { url: '/pt/provador-biquini',           kw: 'provador biquini',        vol: 90,     lang: 'pt', loc: 2076 },
  { url: '/pt/provador-brincos',           kw: 'provador brincos',        vol: 90,     lang: 'pt', loc: 2076 },
  { url: '/pt/provador-vestido-noiva',     kw: 'vestido de noiva online', vol: 260,    lang: 'pt', loc: 2076 },
  { url: '/pt/simulador-unhas',            kw: 'simulador de unhas',      vol: 480,    lang: 'pt', loc: 2076 },
  { url: '/pt/provador-oculos',            kw: 'provador óculos',         vol: 880,    lang: 'pt', loc: 2076 },
  { url: '/pt/provador-joias',             kw: 'provador joias',          vol: 110,    lang: 'pt', loc: 2076 },
  { url: '/pt/provador-fato-homem',        kw: 'fato homem online',       vol: 110,    lang: 'pt', loc: 2076 },
  { url: '/pt/provador-roupa-animal',      kw: 'roupa para cachorro',     vol: 4400,   lang: 'pt', loc: 2076 },
  { url: '/pt/provador-roupa-bebe',        kw: 'roupa de bebê',           vol: 18100,  lang: 'pt', loc: 2076 },
  { url: '/pt/provador-fatos-carnaval',    kw: 'fantasia carnaval',       vol: 9900,   lang: 'pt', loc: 2076 },
  { url: '/pt/provador-penteados',         kw: 'simulador penteado',      vol: 590,    lang: 'pt', loc: 2076 },
  { url: '/pt/provador-cosplay',           kw: 'provador cosplay',        vol: 70,     lang: 'pt', loc: 2076 },

  // ── DE localized ──────────────────────────────────────────────────────
  { url: '/de/tattoo-simulator',           kw: 'tattoo simulator',        vol: 210,    lang: 'de', loc: 2276 },
  { url: '/de/bikini-anprobieren',         kw: 'bikini anprobieren',      vol: 50,     lang: 'de', loc: 2276 },
  { url: '/de/ohrringe-anprobieren',       kw: 'ohrringe anprobieren',    vol: 70,     lang: 'de', loc: 2276 },
  { url: '/de/brautkleid-anprobieren',     kw: 'brautkleid anprobieren',  vol: 110,    lang: 'de', loc: 2276 },
  { url: '/de/naegel-simulator',           kw: 'nägel simulator',         vol: 110,    lang: 'de', loc: 2276 },
  { url: '/de/brille-anprobieren',         kw: 'brille online anprobieren', vol: 6600, lang: 'de', loc: 2276 },
  { url: '/de/schmuck-anprobieren',        kw: 'schmuck anprobieren',     vol: 70,     lang: 'de', loc: 2276 },
  { url: '/de/herrenanzug-anprobieren',    kw: 'herrenanzug anprobieren', vol: 90,     lang: 'de', loc: 2276 },
  { url: '/de/haustierkleidung-anprobieren', kw: 'haustierkleidung',     vol: 70,      lang: 'de', loc: 2276 },
  { url: '/de/babykleidung-anprobieren',   kw: 'babykleidung',           vol: 6600,    lang: 'de', loc: 2276 },
  { url: '/de/kostueme-anprobieren',       kw: 'kostüme',                vol: 5400,    lang: 'de', loc: 2276 },
  { url: '/de/frisuren-anprobieren',       kw: 'frisuren simulator',     vol: 480,     lang: 'de', loc: 2276 },
  { url: '/de/cosplay-anprobieren',        kw: 'cosplay anprobieren',    vol: 50,      lang: 'de', loc: 2276 },

  // ── IT localized ──────────────────────────────────────────────────────
  { url: '/it/simulatore-tatuaggi',        kw: 'simulatore tatuaggi',    vol: 720,     lang: 'it', loc: 2380 },
  { url: '/it/prova-bikini',               kw: 'prova bikini',           vol: 90,      lang: 'it', loc: 2380 },
  { url: '/it/prova-orecchini',            kw: 'prova orecchini',        vol: 70,      lang: 'it', loc: 2380 },
  { url: '/it/prova-abito-sposa',          kw: 'abito da sposa',         vol: 40500,   lang: 'it', loc: 2380 },
  { url: '/it/simulatore-unghie',          kw: 'simulatore unghie',      vol: 70,      lang: 'it', loc: 2380 },
  { url: '/it/prova-occhiali',             kw: 'occhiali online prova',  vol: 1600,    lang: 'it', loc: 2380 },
  { url: '/it/prova-gioielli',             kw: 'prova gioielli online',  vol: 110,     lang: 'it', loc: 2380 },
  { url: '/it/prova-abito-uomo',           kw: 'abito uomo online',      vol: 720,     lang: 'it', loc: 2380 },
  { url: '/it/prova-vestiti-animali',      kw: 'vestiti per cani',       vol: 1600,    lang: 'it', loc: 2380 },
  { url: '/it/prova-vestiti-neonato',      kw: 'vestiti neonato',        vol: 3600,    lang: 'it', loc: 2380 },
  { url: '/it/prova-costumi',              kw: 'costumi carnevale',      vol: 14800,   lang: 'it', loc: 2380 },
  { url: '/it/prova-acconciature',         kw: 'simulatore acconciatura', vol: 70,     lang: 'it', loc: 2380 },
  { url: '/it/prova-cosplay',              kw: 'cosplay',                vol: 27100,   lang: 'it', loc: 2380 },

  // ── Long-tail informational ───────────────────────────────────────────
  { url: '/wedding-guest-outfit',          kw: 'wedding guest outfit',   vol: 301000,  lang: 'en', loc: 2840 },
  { url: '/es/vestido-invitada-boda',      kw: 'vestido invitada boda',  vol: 165000,  lang: 'es', loc: 2724 },
  { url: '/bridesmaid-dress-try-on',       kw: 'cheap bridesmaid dress', vol: 74000,   lang: 'en', loc: 2840 },
  { url: '/halloween-couples-costumes',    kw: 'couples halloween costumes', vol: 110000, lang: 'en', loc: 2840 },
  { url: '/ja/yukata',                     kw: 'yukata',                 vol: 201000,  lang: 'ja', loc: 2392 },
  { url: '/natural-makeup-look',           kw: 'natural makeup look',    vol: 33100,   lang: 'en', loc: 2840 },
  { url: '/engagement-ring-on-which-hand', kw: 'engagement ring on which hand', vol: 5400, lang: 'en', loc: 2840 },
  { url: '/pt/look-festa-junina',          kw: 'look festa junina',      vol: 22200,   lang: 'pt', loc: 2076 },
  { url: '/fr/tenue-bapteme',              kw: 'tenue pour bapteme femme', vol: 6600,  lang: 'fr', loc: 2250 },
  { url: '/it/vestito-comunione',          kw: 'vestito per comunione bambina', vol: 6600, lang: 'it', loc: 2380 },
  { url: '/hi/lehenga',                    kw: 'lehenga',                vol: 165000,  lang: 'hi', loc: 2356 },

  // Haircut by face shape
  { url: '/haircut-for-round-face',        kw: 'haircut for round face', vol: 27100,   lang: 'en', loc: 2840 },
  { url: '/haircut-for-oval-face',         kw: 'haircut for oval face',  vol: 33100,   lang: 'en', loc: 2840 },
  { url: '/haircut-for-diamond-face',      kw: 'haircut for diamond face', vol: 5400,  lang: 'en', loc: 2840 },
  { url: '/haircut-for-square-face',       kw: 'haircut for square face', vol: 14800,  lang: 'en', loc: 2840 },

  // Asian native
  { url: '/ar/hijab',                      kw: 'hijab',                  vol: 246000,  lang: 'ar', loc: 2682 },
  { url: '/hi/saree',                      kw: 'saree',                  vol: 110000,  lang: 'hi', loc: 2356 },
  { url: '/ko/hanbok',                     kw: 'hanbok',                 vol: 8100,    lang: 'ko', loc: 2410 },
  { url: '/ja/kimono',                     kw: 'kimono',                 vol: 90500,   lang: 'ja', loc: 2392 },
  { url: '/zh/qipao',                      kw: 'qipao',                  vol: 14800,   lang: 'zh', loc: 2156 },

  // Round 3 + Round 4 new landings
  { url: '/fr/coupe-cheveux-visage-rond',   kw: 'coupe de cheveux pour visage rond', vol: 720, lang: 'fr', loc: 2250 },
  { url: '/pt/corte-cabelo-rosto-redondo',  kw: 'melhor corte de cabelo para rosto redondo', vol: 720, lang: 'pt', loc: 2076 },
  { url: '/pt/unhas-curtas-ideias',         kw: 'ideias de unhas curtas decoradas', vol: 720, lang: 'pt', loc: 2076 },
  { url: '/it/unghie-corte-semplici',       kw: 'unghie semplici ma belle corte', vol: 720, lang: 'it', loc: 2380 },
  { url: '/it/taglio-capelli-viso-tondo',   kw: 'taglio capelli viso tondo e paffuto', vol: 720, lang: 'it', loc: 2380 },
  { url: '/es/disfraz-de-halloween',        kw: 'disfraz de halloween',   vol: 165000, lang: 'es', loc: 2484 }, // MX
  { url: '/es/cosplay',                     kw: 'cosplay',                vol: 40500,  lang: 'es', loc: 2484 },
  { url: '/es/disfraz-halloween-pareja',    kw: 'disfraz de halloween en pareja', vol: 12100, lang: 'es', loc: 2484 },
  { url: '/es/disfraces-caseros',           kw: 'disfraces caseros',      vol: 4000,   lang: 'es', loc: 2724 },
  { url: '/es/disfraz-carnaval',            kw: 'disfraz carnaval',       vol: 8100,   lang: 'es', loc: 2724 },
];

const LOC_LABEL = { 2840: 'US', 2826: 'GB', 2724: 'ES', 2250: 'FR', 2076: 'BR', 2380: 'IT', 2276: 'DE', 2484: 'MX', 2356: 'IN', 2392: 'JP', 2410: 'KR', 2156: 'CN', 2682: 'EG' };

async function fetchSerp({ kw, lang, loc }) {
  const body = [{ keyword: kw, language_code: lang, location_code: loc, depth: 100, device: 'desktop' }];
  const res = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(json.status_message);
  return (json.tasks?.[0]?.result?.[0]?.items || []).filter((it) => it.type === 'organic');
}

const results = [];
for (const t of TARGETS) {
  process.stdout.write(`[${LOC_LABEL[t.loc] || t.loc} ${t.kw.slice(0, 35).padEnd(37)}] `);
  try {
    const items = await fetchSerp(t);
    const hit = items.findIndex((it) => (it.url || '').includes('agalaz.com'));
    const pos = hit === -1 ? null : (items[hit].rank_absolute ?? hit + 1);
    const currentVisitsDay = pos ? Math.round((t.vol * ctrAt(pos)) / 30) : 0;
    const w1Pos = projectedPositionAfterWeeks(pos, 1);
    const w2Pos = projectedPositionAfterWeeks(pos, 2);
    const w3Pos = projectedPositionAfterWeeks(pos, 3);
    const w4Pos = projectedPositionAfterWeeks(pos, 4);
    const w1Visits = Math.round((t.vol * ctrAt(w1Pos)) / 30);
    const w2Visits = Math.round((t.vol * ctrAt(w2Pos)) / 30);
    const w3Visits = Math.round((t.vol * ctrAt(w3Pos)) / 30);
    const w4Visits = Math.round((t.vol * ctrAt(w4Pos)) / 30);
    results.push({ ...t, pos: pos || 999, currentVisitsDay, w1Pos, w1Visits, w2Pos, w2Visits, w3Pos, w3Visits, w4Pos, w4Visits });
    console.log(`pos:${pos || '>100'}  curr:${currentVisitsDay}/d  w4 → pos ${w4Pos}, ${w4Visits}/d`);
  } catch (e) {
    console.log(`FAIL: ${e.message.slice(0, 40)}`);
  }
  await new Promise((r) => setTimeout(r, 250));
}

results.sort((a, b) => b.w4Visits - a.w4Visits);

const csv = (s) => { if (s == null) return ''; const v = String(s); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
fs.writeFileSync('tmp/sitemap-position-forecast.csv', ['url,country,keyword,volume,current_pos,current_visits_day,w1_pos,w1_visits,w2_pos,w2_visits,w3_pos,w3_visits,w4_pos,w4_visits',
  ...results.map((r) => [csv(r.url), LOC_LABEL[r.loc] || r.loc, csv(r.kw), r.vol, r.pos > 900 ? '>100' : r.pos, r.currentVisitsDay, r.w1Pos, r.w1Visits, r.w2Pos, r.w2Visits, r.w3Pos, r.w3Visits, r.w4Pos, r.w4Visits].join(','))].join('\n'));
console.log('\nWrote tmp/sitemap-position-forecast.csv');

const totalCurrent = results.reduce((s, r) => s + r.currentVisitsDay, 0);
const totalW1 = results.reduce((s, r) => s + r.w1Visits, 0);
const totalW2 = results.reduce((s, r) => s + r.w2Visits, 0);
const totalW3 = results.reduce((s, r) => s + r.w3Visits, 0);
const totalW4 = results.reduce((s, r) => s + r.w4Visits, 0);

console.log('\n=== AGGREGATE PROJECTION (sum across all URLs, no work, just waiting) ===');
console.log(`  Current:  ${totalCurrent}/day organic`);
console.log(`  Week 1:   ${totalW1}/day  (+${totalW1 - totalCurrent})`);
console.log(`  Week 2:   ${totalW2}/day  (+${totalW2 - totalCurrent})`);
console.log(`  Week 3:   ${totalW3}/day  (+${totalW3 - totalCurrent})`);
console.log(`  Week 4:   ${totalW4}/day  (+${totalW4 - totalCurrent})`);
