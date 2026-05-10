// Master audit pass: takes every URL from the live sitemap, derives a
// primary keyword from the slug, batches them by locale into DataForSEO
// google_ads/search_volume/live, and outputs a CSV showing volume per URL
// so we can decide cluster-by-cluster whether to compete on the head term
// or pivot to long-tail.
//
// Output: tmp/sitemap-master-audit.csv + tmp/sitemap-master-audit.json

import fs from 'fs';

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASS = process.env.DATAFORSEO_PASSWORD;
if (!LOGIN || !PASS) { console.error('Missing DATAFORSEO_* env'); process.exit(1); }
const auth = Buffer.from(`${LOGIN}:${PASS}`).toString('base64');

// Map locale → DataForSEO location_code (primary market for that language).
const LOCATION = {
  en: 2840,    // United States
  'en-IN': 2356, // India (for /hi/ + /bn/ + /ta/ + /ur/ Hindi/Bengali/Tamil routes)
  'en-IT': 2380, // Italy
  es: 2724,    // Spain
  fr: 2250,    // France
  pt: 2076,    // Brazil (bigger than Portugal)
  it: 2380,    // Italy
  de: 2276,    // Germany
  hi: 2356,    // India
  bn: 2356,
  ta: 2356,
  ur: 2356,
  ja: 2392,    // Japan
  ko: 2410,    // South Korea
  zh: 2156,    // China (limited Google data — fallback)
  ar: 2682,    // Saudi Arabia
};

const LANG_CODE = {
  en: 'en', 'en-IN': 'en', 'en-IT': 'en',
  es: 'es', fr: 'fr', pt: 'pt', it: 'it', de: 'de',
  hi: 'hi', bn: 'bn', ta: 'ta', ur: 'ur',
  ja: 'ja', ko: 'ko', zh: 'zh', ar: 'ar',
};

// Slug → human keyword. We strip the locale prefix and dashes, then turn
// known suffixes into the search query users actually type.
function slugToKeyword(url) {
  const path = url.replace('https://agalaz.com', '').replace(/^\//, '').replace(/\/$/, '');
  if (!path) return { locale: 'en', keyword: 'ai virtual try on', cluster: 'home' };

  const parts = path.split('/');
  let locale = 'en';
  // Detect locale prefix (es, fr, pt, it, de, hi, bn, ta, ur, ja, ko, zh, ar).
  const localeCandidates = ['es', 'fr', 'pt', 'it', 'de', 'hi', 'bn', 'ta', 'ur', 'ja', 'ko', 'zh', 'ar'];
  if (localeCandidates.includes(parts[0])) {
    locale = parts[0];
    parts.shift();
  }
  if (parts[0] === 'blog') return { locale, cluster: 'blog', keyword: parts.slice(1).join(' ').replace(/-/g, ' ') };

  const slug = parts.join('-');
  // Cluster classification
  let cluster = 'tryon';
  if (parts[0] === 'partners' || parts[0] === 'about' || parts[0] === 'privacy' || parts[0] === 'terms' || parts[0] === 'pricing') cluster = 'legal';
  if (slug.match(/wedding|bridal|bridesmaid|invitad/)) cluster = 'wedding';
  if (slug.match(/saree|lehenga|kurti|salwar|abaya|cheongsam|hanbok|kimono|yukata|baju/)) cluster = 'cultural';
  if (slug.match(/halloween|costume|cosplay|disfra|fato|festa|junina|carnaval/)) cluster = 'costume';
  if (slug.match(/comunion|baptism|baptem|comuni|baptiz/)) cluster = 'religious';
  if (slug.match(/ring|engagement|jewel|joya|brinco/)) cluster = 'jewelry';
  if (slug.match(/glasses|gafa|lunett|brille|occhia|óculos|peinad|hairstyle|haircut|makeup|maquill|maquiagem/)) cluster = 'beauty';

  // Map slug → human-readable keyword for that locale.
  const map = {
    // Universal English head terms
    'virtual-wedding-dress-try-on': 'wedding dress try on',
    'wedding-guest-outfit': 'wedding guest outfit',
    'mother-of-the-bride-dress-try-on': 'mother of the bride dress',
    'bridesmaid-dress-try-on': 'bridesmaid dress try on',
    'engagement-ring-on-hand': 'engagement ring on hand',
    'virtual-saree-try-on': 'virtual saree try on',
    'virtual-lehenga-try-on': 'virtual lehenga try on',
    'lehenga': 'online lehenga',
    'virtual-cheongsam-try-on': 'virtual cheongsam try on',
    'virtual-hanbok-try-on': 'virtual hanbok try on',
    'virtual-kimono-try-on': 'virtual kimono try on',
    'virtual-yukata-try-on': 'virtual yukata try on',
    'yukata': 'yukata online',
    'realistic-swimwear-try-on': 'virtual swimwear try on',
    'virtual-earring-try-on': 'virtual earring try on',
    'virtual-glasses-try-on': 'virtual glasses try on',
    'virtual-jewelry-try-on': 'virtual jewelry try on',
    'virtual-mens-suit-try-on': 'virtual mens suit try on',
    'virtual-pet-clothing-try-on': 'pet clothing try on',
    'virtual-baby-clothing-try-on': 'baby clothing try on',
    'virtual-costume-try-on': 'virtual costume try on',
    'virtual-hairstyle-try-on': 'virtual hairstyle try on',
    'virtual-cosplay-try-on': 'virtual cosplay try on',
    'virtual-nail-try-on': 'virtual nail try on',
    'haircut-for-round-faces': 'haircut for round faces',
    'haircut-for-oval-faces': 'haircut for oval faces',
    'haircut-for-square-faces': 'haircut for square faces',
    'haircut-for-heart-faces': 'haircut for heart shape face',
    'natural-makeup-try-on': 'natural makeup look',
    'halloween-couple-costumes': 'halloween couple costumes',
    'baptism-outfit-try-on': 'baptism outfit',
    'communion-dress-try-on': 'first communion dress',
    'try-on': 'ai try on',
    // ES
    'es-vestido-invitada-boda': 'vestido invitada boda',
    'es-probador-vestido-novia': 'probador virtual vestido novia',
    'es-probador-gafas': 'probador virtual gafas',
    'es-probador-pendientes': 'probador pendientes',
    'es-probador-bikini': 'probador bañador',
    'es-probador-joyas': 'probador joyas',
    'es-probador-traje-hombre': 'probador traje hombre',
    'es-probador-disfraces': 'probador disfraces',
    'es-probador-cosplay': 'probador cosplay',
    'es-probador-peinados': 'probador peinados',
    'es-probador-unas': 'probador uñas',
    'es-probador-ropa-bebe': 'probador ropa bebe',
    'es-probador-ropa-mascotas': 'probador ropa mascotas',
    'es-simulador-tatuaje': 'simulador tatuaje',
    // FR
    'fr-essayage-virtuel-robe-mariee': 'essayage virtuel robe mariée',
    'fr-essayage-virtuel-lunettes': 'essayage virtuel lunettes',
    'fr-essayage-virtuel-bijoux': 'essayage virtuel bijoux',
    'fr-essayage-virtuel-maillot-bain': 'essayage maillot de bain',
    'fr-essayage-virtuel-boucles-oreilles': 'essayage virtuel boucles oreilles',
    'fr-essayage-virtuel-costume-homme': 'essayage virtuel costume homme',
    'fr-essayage-virtuel-deguisement': 'essayage virtuel déguisement',
    'fr-essayage-virtuel-cosplay': 'essayage virtuel cosplay',
    'fr-essayage-virtuel-coiffure': 'essayage virtuel coiffure',
    'fr-essayage-virtuel-vernis': 'essayage virtuel vernis',
    'fr-essayage-virtuel-vetements-bebe': 'essayage virtuel vêtements bébé',
    'fr-essayage-virtuel-vetements-animaux': 'essayage virtuel vêtements animaux',
    'fr-tenue-bapteme-bebe': 'tenue baptême bébé',
    // PT
    'pt-provador-vestido-noiva': 'provador virtual vestido noiva',
    'pt-provador-oculos': 'provador óculos virtual',
    'pt-provador-joias': 'provador joias',
    'pt-provador-biquini': 'provador biquíni',
    'pt-provador-brincos': 'provador brincos',
    'pt-provador-fato-homem': 'provador fato homem',
    'pt-provador-fatos-carnaval': 'fantasia halloween',
    'pt-provador-cosplay': 'cosplay anime',
    'pt-provador-penteados': 'provador penteados',
    'pt-provador-unhas': 'provador unhas',
    'pt-provador-roupa-bebe': 'provador roupa bebé',
    'pt-provador-roupa-pets': 'provador roupa pets',
    'pt-look-festa-junina': 'look festa junina',
    // IT
    'it-prova-virtuale-abito-sposa': 'prova virtuale abito sposa',
    'it-prova-virtuale-occhiali': 'prova virtuale occhiali',
    'it-prova-virtuale-gioielli': 'prova virtuale gioielli',
    'it-prova-virtuale-bikini': 'prova virtuale bikini',
    'it-prova-virtuale-orecchini': 'prova virtuale orecchini',
    'it-prova-virtuale-abito-uomo': 'prova virtuale abito uomo',
    'it-prova-virtuale-costume': 'prova virtuale costume halloween',
    'it-prova-virtuale-cosplay': 'prova virtuale cosplay',
    'it-prova-virtuale-acconciatura': 'prova virtuale acconciatura',
    'it-prova-virtuale-smalto': 'prova virtuale smalto',
    'it-prova-virtuale-vestiti-bebe': 'prova virtuale vestiti bambino',
    'it-prova-virtuale-vestiti-animali': 'prova virtuale vestiti animali',
    'it-vestito-prima-comunione': 'vestito prima comunione',
    // DE
    'de-virtuelle-brautkleid-anprobe': 'virtuelle brautkleid anprobe',
    'de-virtuelle-brille-anprobe': 'virtuelle brille anprobe',
    'de-virtuelle-schmuck-anprobe': 'virtuelle schmuck anprobe',
    'de-virtuelle-bikini-anprobe': 'virtuelle bikini anprobe',
    'de-virtuelle-ohrring-anprobe': 'virtuelle ohrring anprobe',
    'de-virtuelle-anzug-anprobe': 'virtuelle anzug anprobe',
    'de-virtuelle-kostum-anprobe': 'virtuelle kostüm anprobe',
    'de-virtuelle-cosplay-anprobe': 'virtuelle cosplay anprobe',
    'de-virtuelle-frisur-anprobe': 'virtuelle frisur anprobe',
    'de-virtuelle-nagel-anprobe': 'virtuelle nagel anprobe',
    'de-virtuelle-babykleidung-anprobe': 'virtuelle babykleidung anprobe',
    'de-virtuelle-haustierkleidung-anprobe': 'virtuelle haustierkleidung anprobe',
  };

  const mapped = map[slug] || slug.replace(/-/g, ' ');
  return { locale, cluster, keyword: mapped, slug, path };
}

// Parse sitemap URLs
const xml = fs.readFileSync('tmp/sitemap-live.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`Parsed ${urls.length} URLs from sitemap`);

const enriched = urls.map(u => ({ url: u, ...slugToKeyword(u) }));

// Group by locale (skipping legal/blog for now to keep API budget tight)
const byLocale = {};
for (const e of enriched) {
  if (e.cluster === 'legal' || e.cluster === 'blog') continue;
  const loc = LOCATION[e.locale];
  if (!loc) continue;
  if (!byLocale[e.locale]) byLocale[e.locale] = { location_code: loc, lang: LANG_CODE[e.locale], items: [] };
  byLocale[e.locale].items.push(e);
}

console.log('Locale buckets:');
for (const [k, v] of Object.entries(byLocale)) console.log(`  ${k}: ${v.items.length} URLs`);

async function fetchVolume(location_code, lang, keywords) {
  const body = [{ location_code, language_code: lang, keywords }];
  const res = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.status_code !== 20000) throw new Error(`DataForSEO ${data.status_code}: ${data.status_message}`);
  return data.tasks?.[0]?.result || [];
}

const results = [];

for (const [localeKey, bucket] of Object.entries(byLocale)) {
  console.log(`\n── Querying ${localeKey} (${bucket.items.length} kws) ──`);
  const kws = [...new Set(bucket.items.map(i => i.keyword))];
  // Chunk in 100s (DataForSEO limit)
  const chunks = [];
  for (let i = 0; i < kws.length; i += 100) chunks.push(kws.slice(i, i + 100));
  const volMap = {};
  for (const chunk of chunks) {
    try {
      const data = await fetchVolume(bucket.location_code, bucket.lang, chunk);
      for (const r of data) volMap[r.keyword] = { vol: r.search_volume || 0, cpc: r.cpc || 0, comp: r.competition || null };
    } catch (e) { console.error(`  ERROR: ${e.message}`); }
  }
  for (const item of bucket.items) {
    const v = volMap[item.keyword] || { vol: 0, cpc: 0, comp: null };
    results.push({ ...item, ...v });
  }
}

// Add legal/blog rows with vol=null (we don't audit those)
for (const e of enriched) {
  if (e.cluster === 'legal' || e.cluster === 'blog') results.push({ ...e, vol: null, cpc: null, comp: null, skipped: true });
}

results.sort((a, b) => (b.vol || 0) - (a.vol || 0));

// CSV out
const headers = ['url', 'locale', 'cluster', 'keyword', 'vol', 'cpc', 'comp'];
const csv = [headers.join(',')].concat(
  results.map(r => [r.url, r.locale, r.cluster, JSON.stringify(r.keyword), r.vol ?? '', r.cpc ?? '', r.comp ?? ''].join(','))
).join('\n');
fs.writeFileSync('tmp/sitemap-master-audit.csv', csv);
fs.writeFileSync('tmp/sitemap-master-audit.json', JSON.stringify(results, null, 2));

// Print top 30 + cluster summary
console.log('\n── TOP 30 BY VOLUME ──');
results.slice(0, 30).forEach(r => {
  const v = (r.vol || 0).toLocaleString();
  console.log(`  ${v.padStart(8)}  ${r.locale.padEnd(3)}  ${r.cluster.padEnd(10)}  ${r.keyword}`);
});

const sum = results.reduce((acc, r) => acc + (r.vol || 0), 0);
console.log(`\nTOTAL aggregate monthly volume across audited URLs: ${sum.toLocaleString()}`);
console.log(`Daily equivalent: ${Math.round(sum / 30).toLocaleString()}`);

// By cluster
const byCluster = {};
for (const r of results) {
  if (!r.vol) continue;
  byCluster[r.cluster] = (byCluster[r.cluster] || 0) + r.vol;
}
console.log('\nBy cluster:');
for (const [c, v] of Object.entries(byCluster).sort((a,b)=>b[1]-a[1])) console.log(`  ${c.padEnd(10)} ${v.toLocaleString()}/mo`);
