// Calculate the FULL addressable market for the merged site —
// all clusters agalaz already targets, across all live languages.
//
// Each cluster gets its head term checked in each relevant locale.
// Long-tail expansion is added as a multiplier (industry rule: head + ~2-3x
// in long-tails is realistic for well-structured topical clusters).

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

// Format: [keyword, language_code, location_code, cluster_name]
const QUERIES = [
  // ─────────── Try-on head terms ───────────
  ['virtual try on', 'en', 2840, 'tryon-en'],
  ['virtual try on clothes', 'en', 2840, 'tryon-en'],
  ['ai clothes changer', 'en', 2840, 'tryon-en'],
  ['probador virtual', 'es', 2724, 'tryon-es'],
  ['probador de ropa', 'es', 2724, 'tryon-es'],
  ['probador virtual ia', 'es', 2724, 'tryon-es'],
  ['essayage virtuel', 'fr', 2250, 'tryon-fr'],
  ['provador virtual', 'pt', 2076, 'tryon-pt'],
  ['virtuelle anprobe', 'de', 2276, 'tryon-de'],
  ['camerino virtuale', 'it', 2380, 'tryon-it'],

  // ─────────── Wedding dress (huge global market) ───────────
  ['wedding dress', 'en', 2840, 'wedding-en'],
  ['wedding guest outfit', 'en', 2840, 'wedding-en'],
  ['vestido de novia', 'es', 2724, 'wedding-es'],
  ['vestido invitada boda', 'es', 2724, 'wedding-es'],
  ['vestido madrina', 'es', 2724, 'wedding-es'],
  ['robe de mariée', 'fr', 2250, 'wedding-fr'],
  ['tenue invité mariage', 'fr', 2250, 'wedding-fr'],
  ['vestido de noiva', 'pt', 2076, 'wedding-pt'],
  ['vestido de madrinha', 'pt', 2076, 'wedding-pt'],
  ['brautkleid', 'de', 2276, 'wedding-de'],
  ['abito da sposa', 'it', 2380, 'wedding-it'],

  // ─────────── Nails (Round 7 + 8 cluster) ───────────
  ['nail designs', 'en', 2840, 'nails-en'],
  ['gel nail designs', 'en', 2840, 'nails-en'],
  ['french manicure', 'en', 2840, 'nails-en'],
  ['diseños de uñas', 'es', 2724, 'nails-es'],
  ['uñas francesas', 'es', 2724, 'nails-es'],
  ['uñas de gel', 'es', 2724, 'nails-es'],
  ['unhas decoradas', 'pt', 2076, 'nails-pt'],
  ['unhas francesinha', 'pt', 2076, 'nails-pt'],
  ['vernis ongles', 'fr', 2250, 'nails-fr'],
  ['nageldesign', 'de', 2276, 'nails-de'],
  ['unghie gel', 'it', 2380, 'nails-it'],

  // ─────────── Hairstyle (Round 5 + 8) ───────────
  ['haircut for round face', 'en', 2840, 'hair-en'],
  ['hairstyles for women', 'en', 2840, 'hair-en'],
  ['wolf cut', 'en', 2840, 'hair-en'],
  ['curtain bangs', 'en', 2840, 'hair-en'],
  ['corte de cabelo feminino', 'pt', 2076, 'hair-pt'],
  ['corte de pelo mujer', 'es', 2724, 'hair-es'],
  ['coupe cheveux femme', 'fr', 2250, 'hair-fr'],
  ['frisuren frauen', 'de', 2276, 'hair-de'],
  ['tagli capelli donna', 'it', 2380, 'hair-it'],

  // ─────────── Glasses (own face) ───────────
  ['glasses for round face', 'en', 2840, 'glasses-en'],
  ['glasses for face shape', 'en', 2840, 'glasses-en'],
  ['gafas para cara redonda', 'es', 2724, 'glasses-es'],
  ['lunettes visage rond', 'fr', 2250, 'glasses-fr'],

  // ─────────── Tattoo simulator ───────────
  ['tattoo ideas', 'en', 2840, 'tattoo-en'],
  ['tattoo simulator', 'en', 2840, 'tattoo-en'],
  ['tatuajes mujer', 'es', 2724, 'tattoo-es'],
  ['ideias de tatuagem', 'pt', 2076, 'tattoo-pt'],
  ['idée tatouage', 'fr', 2250, 'tattoo-fr'],

  // ─────────── Costume / Halloween ───────────
  ['halloween costumes', 'en', 2840, 'costume-en'],
  ['halloween couples costumes', 'en', 2840, 'costume-en'],
  ['disfraz halloween', 'es', 2724, 'costume-es'],
  ['costume halloween', 'fr', 2250, 'costume-fr'],
  ['fato halloween', 'pt', 2076, 'costume-pt'],

  // ─────────── Cosplay / asian markets ───────────
  ['cosplay', 'en', 2840, 'cosplay-en'],
  ['saree', 'en', 2840, 'asian-en'],
  ['saree designs', 'hi', 2356, 'asian-hi'],
  ['hanbok', 'ko', 2410, 'asian-ko'],
  ['kimono', 'ja', 2392, 'asian-ja'],
  ['qipao', 'zh', 2156, 'asian-zh'],
  ['hijab', 'ar', 2784, 'asian-ar'],

  // ─────────── Swimwear ───────────
  ['bikini', 'en', 2840, 'swim-en'],
  ['bikini mujer', 'es', 2724, 'swim-es'],
  ['maillot de bain', 'fr', 2250, 'swim-fr'],
  ['biquíni', 'pt', 2076, 'swim-pt'],

  // ─────────── Pet clothing (Round 9 rebrand) ───────────
  ['dog harness', 'en', 2840, 'pet-en'],
  ['dog halloween costume', 'en', 2840, 'pet-en'],

  // ─────────── Men's suit ───────────
  ['mens suit', 'en', 2840, 'mens-en'],
  ['traje hombre boda', 'es', 2724, 'mens-es'],

  // ─────────── Jewelry / earrings ───────────
  ['necklace women', 'en', 2840, 'jewelry-en'],
  ['earrings women', 'en', 2840, 'jewelry-en'],

  // ─────────── Color analysis (palettehunt territory but agalaz can play) ───────────
  ['soft autumn color palette', 'en', 2840, 'color-en'],
  ['cool skin tone clothing colors', 'en', 2840, 'color-en'],
  ['armocromia', 'it', 2380, 'color-it'],
  ['colorimetria', 'es', 2724, 'color-es'],

  // ─────────── "Best X AI" (LLM-citation cluster, Round 12) ───────────
  ['best virtual try on app', 'en', 2840, 'best-en'],
  ['ai clothes changer', 'en', 2840, 'best-en'],
  ['free virtual fitting room', 'en', 2840, 'best-en'],
];

console.log(`=== Total Addressable Market — agalaz×palettehunt merger ===`);
console.log(`Querying ${QUERIES.length} head terms across 11 locales\n`);

// Batch by (lang, location) for efficiency
const buckets = new Map();
for (const [kw, lang, loc, cluster] of QUERIES) {
  const key = `${lang}|${loc}`;
  if (!buckets.has(key)) buckets.set(key, []);
  buckets.get(key).push({ kw, cluster });
}

const results = [];

for (const [key, items] of buckets.entries()) {
  const [lang, locStr] = key.split('|');
  const loc = parseInt(locStr);
  const keywords = items.map((i) => i.kw);
  try {
    const ov = await dfs('dataforseo_labs/google/keyword_overview/live', [{
      keywords, language_code: lang, location_code: loc,
    }]);
    for (const item of ov?.items ?? []) {
      const kw = item.keyword;
      const cluster = items.find((i) => i.kw === kw)?.cluster ?? '?';
      const vol = item.keyword_info?.search_volume ?? 0;
      const kd = item.keyword_properties?.keyword_difficulty ?? 0;
      const cpc = item.keyword_info?.cpc ?? 0;
      results.push({ kw, lang, loc, cluster, vol, kd, cpc });
    }
    console.log(`  ${lang.toUpperCase()}/${loc}: fetched ${items.length} keywords`);
  } catch (e) {
    console.log(`  ${lang}/${loc}: FAIL ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 250));
}

// Group by cluster, sum volumes
const byCluster = new Map();
for (const r of results) {
  const c = r.cluster;
  if (!byCluster.has(c)) byCluster.set(c, { vol: 0, count: 0, avgKd: 0 });
  const b = byCluster.get(c);
  b.vol += r.vol;
  b.count += 1;
  b.avgKd += r.kd;
}

console.log('\n\n=== HEAD-TERM volume per cluster (raw monthly) ===');
const sorted = [...byCluster.entries()].sort((a, b) => b[1].vol - a[1].vol);
let headTotal = 0;
for (const [cluster, b] of sorted) {
  const avgKd = (b.avgKd / b.count).toFixed(0);
  console.log(`  ${cluster.padEnd(18)} vol:${b.vol.toString().padStart(9)}  heads:${b.count}  avgKD:${avgKd}`);
  headTotal += b.vol;
}
console.log(`\n  ${'TOTAL HEADS'.padEnd(18)} vol:${headTotal.toString().padStart(9)}`);

const longtailMultiplier = 2.5; // industry rule: well-structured cluster captures 2-3x head in long-tails
const fullAddressable = headTotal * (1 + longtailMultiplier);

console.log(`\n=== Total addressable monthly searches ===`);
console.log(`  Head terms only:           ${headTotal.toLocaleString()} /mo`);
console.log(`  + Long-tail expansion x${longtailMultiplier}: ${(headTotal * longtailMultiplier).toLocaleString()} /mo`);
console.log(`  = TOTAL ADDRESSABLE:       ${fullAddressable.toLocaleString()} /mo`);

console.log(`\n=== Capture-rate scenarios for merged palettehunt+agalaz ===`);
for (const [name, rate] of [['Pessimistic (1%)', 0.01], ['Realistic (3%)', 0.03], ['Optimistic (6%)', 0.06], ['Best case (10%)', 0.10]]) {
  const monthly = fullAddressable * rate;
  console.log(`  ${name.padEnd(20)}  ${monthly.toLocaleString().padStart(10)} visitas/mes  =  ${(monthly / 30).toFixed(0).padStart(5)} /día`);
}

fs.writeFileSync('tmp/merger-addressable.json', JSON.stringify({ results, byCluster: Object.fromEntries(byCluster), headTotal, fullAddressable }, null, 2));
console.log('\nWrote tmp/merger-addressable.json');
