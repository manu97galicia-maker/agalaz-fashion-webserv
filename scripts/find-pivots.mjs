// For each 0-volume URL in our sitemap, find long-tail alternatives that
// DO have search volume + low KD. This tells us which pages to PIVOT vs
// which to leave alone.
//
// Uses keyword_suggestions endpoint (returns up to 1000 long-tail
// suggestions per seed) and filters for vol>=200, KD<=20.

import fs from 'fs';

const auth = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

// Seeds to investigate. (slug → seed term, location, language)
// We're picking the URLs that came back 0/mo in the master audit.
const SEEDS = [
  // EN tryon zero-volume
  { url: '/virtual-cosplay-try-on', seed: 'cosplay', loc: 2840, lang: 'en' },
  { url: '/virtual-veil-try-on', seed: 'wedding veil', loc: 2840, lang: 'en' },
  { url: '/virtual-mens-suit-try-on', seed: 'mens suit', loc: 2840, lang: 'en' },
  { url: '/virtual-pet-clothing-try-on', seed: 'pet clothing', loc: 2840, lang: 'en' },
  { url: '/virtual-baby-clothing-try-on', seed: 'baby outfit', loc: 2840, lang: 'en' },
  { url: '/virtual-qipao-try-on', seed: 'qipao', loc: 2840, lang: 'en' },
  { url: '/virtual-hanbok-try-on', seed: 'hanbok', loc: 2840, lang: 'en' },
  { url: '/virtual-kimono-try-on', seed: 'kimono', loc: 2840, lang: 'en' },
  { url: '/virtual-saree-try-on', seed: 'saree', loc: 2840, lang: 'en' },
  { url: '/realistic-swimwear-try-on', seed: 'swimsuit', loc: 2840, lang: 'en' },
  { url: '/virtual-tattoo-simulator', seed: 'tattoo', loc: 2840, lang: 'en' },
  // ES — try real long-tail
  { url: '/es/probador-bikini', seed: 'bikini mujer', loc: 2724, lang: 'es' },
  { url: '/es/probador-pendientes', seed: 'pendientes', loc: 2724, lang: 'es' },
  { url: '/es/probador-vestido-novia', seed: 'vestido de novia', loc: 2724, lang: 'es' },
  { url: '/es/probador-traje-hombre', seed: 'traje hombre', loc: 2724, lang: 'es' },
  { url: '/es/probador-disfraces', seed: 'disfraces halloween', loc: 2724, lang: 'es' },
  { url: '/es/probador-cosplay', seed: 'cosplay', loc: 2724, lang: 'es' },
  { url: '/es/probador-ropa-bebe', seed: 'ropa bebé', loc: 2724, lang: 'es' },
  { url: '/es/probador-ropa-mascotas', seed: 'ropa mascotas', loc: 2724, lang: 'es' },
  // FR
  { url: '/fr/essayage-robe-mariee', seed: 'robe mariée', loc: 2250, lang: 'fr' },
  { url: '/fr/essayage-bikini', seed: 'maillot de bain', loc: 2250, lang: 'fr' },
  { url: '/fr/essayage-deguisements', seed: 'déguisement halloween', loc: 2250, lang: 'fr' },
  { url: '/fr/essayage-costume-homme', seed: 'costume homme', loc: 2250, lang: 'fr' },
  // PT (Brazil)
  { url: '/pt/provador-vestido-noiva', seed: 'vestido de noiva', loc: 2076, lang: 'pt' },
  { url: '/pt/provador-biquini', seed: 'biquíni', loc: 2076, lang: 'pt' },
  { url: '/pt/provador-fato-homem', seed: 'terno masculino', loc: 2076, lang: 'pt' },
  // IT
  { url: '/it/prova-virtuale-abito-sposa', seed: 'abito sposa', loc: 2380, lang: 'it' },
  { url: '/it/prova-virtuale-bikini', seed: 'costume da bagno', loc: 2380, lang: 'it' },
  // DE
  { url: '/de/brautkleid-anprobieren', seed: 'brautkleid', loc: 2276, lang: 'de' },
  { url: '/de/bikini-anprobieren', seed: 'bikini', loc: 2276, lang: 'de' },
];

async function suggestions(seed, loc, lang) {
  const body = [{
    keyword: seed,
    location_code: loc,
    language_code: lang,
    include_seed_keyword: true,
    limit: 100,
    filters: [['keyword_info.search_volume', '>=', 300]],
    order_by: ['keyword_info.search_volume,desc'],
  }];
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.status_code !== 20000) throw new Error(`DataForSEO ${data.status_code}: ${data.status_message}`);
  return data.tasks?.[0]?.result?.[0]?.items || [];
}

const out = {};

for (const s of SEEDS) {
  console.log(`\n── ${s.url} (seed: "${s.seed}", ${s.lang}/${s.loc}) ──`);
  try {
    const items = await suggestions(s.seed, s.loc, s.lang);
    // Pick top 8 with vol>=300 and prefer low competition
    const picks = items
      .map(it => ({
        kw: it.keyword,
        vol: it.keyword_info?.search_volume || 0,
        kd: it.keyword_properties?.keyword_difficulty || null,
        comp: it.keyword_info?.competition_level || null,
        cpc: it.keyword_info?.cpc || 0,
      }))
      .filter(p => p.vol >= 300 && (p.kd === null || p.kd <= 30))
      .slice(0, 12);
    out[s.url] = picks;
    picks.forEach(p => {
      console.log(`  ${(p.vol||0).toString().padStart(7)}  KD${(p.kd ?? '?').toString().padStart(3)}  ${p.kw}`);
    });
    if (picks.length === 0) console.log('  (no picks above threshold — keep current)');
  } catch (e) {
    console.error(`  ERROR: ${e.message}`);
    out[s.url] = { error: e.message };
  }
}

fs.writeFileSync('tmp/pivot-suggestions.json', JSON.stringify(out, null, 2));
console.log('\nSaved to tmp/pivot-suggestions.json');
