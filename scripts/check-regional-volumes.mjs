// Pull search volumes per country for regional Spanish/Portuguese keyword
// variants. Goal: validate that LATAM aretes, traje de baño, lentes,
// fantasia (PT-BR) etc. actually have meaningful volume before we add them
// to landing meta tags.
//
// Uses google_ads/search_volume/live (most accurate per-country data).

import fs from 'fs';

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASS = process.env.DATAFORSEO_PASSWORD;
const auth = Buffer.from(`${LOGIN}:${PASS}`).toString('base64');

// One batch per (location, language) combo with all keywords for that locale.
// location_code: 2724=Spain, 2484=Mexico, 2032=Argentina, 2170=Colombia,
// 2076=Brazil, 2620=Portugal, 2380=Italy, 2250=France, 2276=Germany.
const BATCHES = [
  // Spanish — Spain
  { location_code: 2724, language_code: 'es', label: 'es-ES (Spain)', keywords: [
    'pendientes virtuales', 'probador pendientes', 'gafas online prueba', 'gafas sol virtuales',
    'bañador virtual', 'bikini virtual', 'joyas online prueba', 'collar virtual',
    'disfraz virtual', 'fato halloween',
  ]},
  // Spanish — Mexico (LATAM volume)
  { location_code: 2484, language_code: 'es', label: 'es-MX (Mexico)', keywords: [
    'aretes virtuales', 'probador aretes', 'aretes online', 'pendientes virtuales',
    'lentes virtuales', 'lentes de sol prueba', 'lentes online', 'gafas virtuales',
    'traje de baño virtual', 'bikini virtual', 'malla virtual', 'bañador virtual',
    'fantasia halloween', 'disfraz virtual', 'collar virtual', 'aretes mexicanos',
  ]},
  // Spanish — Argentina
  { location_code: 2032, language_code: 'es', label: 'es-AR (Argentina)', keywords: [
    'aros virtuales', 'aros online', 'pendientes virtuales',
    'malla virtual', 'malla bikini', 'traje de baño virtual',
    'anteojos virtuales', 'lentes virtuales',
  ]},
  // Spanish — Colombia
  { location_code: 2170, language_code: 'es', label: 'es-CO (Colombia)', keywords: [
    'aretes virtuales', 'aretes online', 'pendientes virtuales',
    'gafas virtuales', 'lentes virtuales',
    'vestido de baño virtual', 'bikini virtual',
  ]},
  // Portuguese — Portugal
  { location_code: 2620, language_code: 'pt', label: 'pt-PT (Portugal)', keywords: [
    'fato halloween', 'fato carnaval', 'óculos virtuais', 'biquíni virtual',
    'fantasia halloween', 'fantasia carnaval',
  ]},
  // Portuguese — Brazil
  { location_code: 2076, language_code: 'pt', label: 'pt-BR (Brazil)', keywords: [
    'fantasia halloween', 'fantasia carnaval', 'fantasia cosplay', 'experimentar fantasia',
    'biquíni virtual', 'roupa de banho virtual', 'maiô virtual',
    'óculos virtuais', 'óculos de sol virtuais',
    'experimentar joias online', 'colar virtual', 'brincos virtuais',
    'fato halloween',
  ]},
  // French
  { location_code: 2250, language_code: 'fr', label: 'fr-FR (France)', keywords: [
    'essayage virtuel boucles d\'oreilles', 'essayage virtuel maillot de bain',
    'essayage virtuel lunettes', 'essayage virtuel bijoux',
    'essayage costume halloween', 'essayage déguisement',
  ]},
  // Italian
  { location_code: 2380, language_code: 'it', label: 'it-IT (Italy)', keywords: [
    'prova orecchini online', 'prova bikini virtuale', 'prova occhiali online',
    'prova gioielli online', 'prova costume halloween', 'prova travestimento',
  ]},
  // German
  { location_code: 2276, language_code: 'de', label: 'de-DE (Germany)', keywords: [
    'ohrringe virtuell anprobieren', 'badeanzug virtuell anprobieren',
    'brille virtuell anprobieren', 'schmuck online anprobieren',
    'kostüm virtuell anprobieren',
  ]},
];

async function fetchVolume(batch) {
  const body = [{
    location_code: batch.location_code,
    language_code: batch.language_code,
    keywords: batch.keywords,
  }];
  const res = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.status_code !== 20000) throw new Error(`DataForSEO ${data.status_code}: ${data.status_message}`);
  return data.tasks?.[0]?.result || [];
}

const results = {};

for (const batch of BATCHES) {
  console.log(`\n── ${batch.label} ──`);
  try {
    const data = await fetchVolume(batch);
    const sorted = data.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));
    results[batch.label] = sorted.map(r => ({
      kw: r.keyword,
      vol: r.search_volume || 0,
      cpc: r.cpc || 0,
      comp: r.competition || null,
    }));
    sorted.forEach(r => {
      const vol = (r.search_volume || 0).toLocaleString();
      console.log(`  ${vol.padStart(8)}  ${r.keyword}`);
    });
  } catch (e) {
    console.error(`  ERROR: ${e.message}`);
    results[batch.label] = { error: e.message };
  }
}

fs.mkdirSync('tmp', { recursive: true });
fs.writeFileSync('tmp/regional-volumes.json', JSON.stringify(results, null, 2));
console.log('\nSaved to tmp/regional-volumes.json');
