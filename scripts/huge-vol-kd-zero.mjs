// Hunt high-volume KD-0/low-KD fashion queries similar to "vestidos invitada
// boda" (165K/mo KD 0). Visual/fashion intent that matches Agalaz try-on.
// Search across ES + BR + FR + IT + EN.

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

const REGIONS = [
  {
    name: 'ES', lang: 'es', loc: 2724,
    seeds: [
      // Occasion-driven (highest commercial intent)
      'vestido invitada boda', 'vestido novia', 'vestido fiesta', 'vestido coctel',
      'vestido graduacion', 'vestido comunion', 'vestido bautizo', 'vestido premamá',
      'traje chaqueta mujer', 'mono fiesta',
      // Seasonal
      'vestido verano', 'vestido invierno', 'vestido otoño',
      // Cuts
      'vestido midi', 'vestido largo', 'vestido corto', 'vestido satinado',
      'vestido lentejuelas', 'vestido encaje', 'falda larga',
      // Brand searches
      'vestidos zara', 'vestidos mango', 'monos zara',
      'pantalon zara', 'blazer mujer',
      // Hair
      'corte de pelo mujer', 'color pelo', 'mechas pelo', 'flequillo',
      'corte bob', 'melena larga', 'pelo rubio', 'pelo castaño',
      // Nails
      'uñas', 'uñas francesas', 'uñas verano', 'uñas almendra', 'uñas largas',
      // Makeup
      'maquillaje boda', 'maquillaje fiesta', 'maquillaje natural',
      // Specific looks
      'look invitada boda', 'look fiesta', 'look graduacion',
    ],
  },
  {
    name: 'BR', lang: 'pt', loc: 2076,
    seeds: [
      'vestido madrinha casamento', 'vestido festa', 'vestido formatura', 'vestido casamento civil',
      'vestido convidada casamento', 'look festa junina', 'vestido daminha',
      'vestido madrinha civil', 'vestido casamento dia', 'vestido casamento praia',
      'vestido madrinha azul', 'vestido madrinha rosa', 'vestido madrinha verde',
      'unhas decoradas', 'unhas francesinha', 'unhas curtas', 'unhas almendra',
      'corte de cabelo feminino', 'corte chanel', 'cabelo loiro', 'mechas cabelo',
      'maquiagem casamento', 'maquiagem festa',
    ],
  },
  {
    name: 'FR', lang: 'fr', loc: 2250,
    seeds: [
      'robe mariage invitée', 'robe de soirée', 'robe cocktail', 'robe communion',
      'robe baptême', 'tenue mariage femme', 'tenue invitée',
      'robe de mariée', 'robe demoiselle honneur',
      'coupe de cheveux femme', 'coupe carré', 'mèches cheveux',
      'manucure', 'ongles français',
      'maquillage mariage',
    ],
  },
  {
    name: 'IT', lang: 'it', loc: 2380,
    seeds: [
      'vestiti invitata matrimonio', 'vestiti cerimonia', 'vestito sposa',
      'vestito da sera', 'vestito comunione', 'vestito battesimo',
      'taglio capelli donna', 'taglio capelli corti', 'mèches capelli',
      'unghie', 'unghie corte', 'unghie francesina',
      'trucco sposa', 'trucco cerimonia',
    ],
  },
  {
    name: 'US (EN)', lang: 'en', loc: 2840,
    seeds: [
      'wedding guest dress', 'mother of bride dress', 'prom dress',
      'bridesmaid dress', 'cocktail dress',
      'graduation dress', 'communion dress', 'baby shower dress',
      'haircut for women', 'short haircut women', 'medium haircut women',
      'nail designs', 'french nails', 'almond nails',
      'wedding makeup', 'natural makeup', 'soft glam makeup',
    ],
  },
];

const KD_MAX = 5;
const VOL_MIN = 5000;

async function main() {
  const allByRegion = {};
  for (const region of REGIONS) {
    console.log(`\n══════════ ${region.name} ══════════`);
    const seen = new Set();
    const results = [];
    for (const seed of region.seeds) {
      try {
        const result = await dfs('dataforseo_labs/google/keyword_suggestions/live', [{
          keyword: seed,
          language_code: region.lang,
          location_code: region.loc,
          limit: 50,
          include_seed_keyword: true,
          filters: [
            ['keyword_info.search_volume', '>=', VOL_MIN],
            'and',
            ['keyword_properties.keyword_difficulty', '<=', KD_MAX],
          ],
          order_by: ['keyword_info.search_volume,desc'],
        }]);
        const items = result?.items ?? [];
        for (const it of items) {
          const kw = it.keyword;
          if (seen.has(kw)) continue;
          seen.add(kw);
          results.push({
            kw,
            vol: it.keyword_info?.search_volume ?? 0,
            kd: it.keyword_properties?.keyword_difficulty ?? 0,
            cpc: it.keyword_info?.cpc ?? 0,
            seed,
          });
        }
      } catch (e) {
        console.log(`  ! "${seed}": ${e.message?.slice(0, 60)}`);
      }
      await new Promise((r) => setTimeout(r, 300));
    }
    results.sort((a, b) => b.vol - a.vol);
    allByRegion[region.name] = results;
    console.log(`  Total unique: ${results.length} keywords (vol ≥ ${VOL_MIN}, KD ≤ ${KD_MAX})`);
    console.log(`  Top 20:`);
    console.log(`     KD  VOL/MO   CPC$  KEYWORD`);
    for (const r of results.slice(0, 20)) {
      console.log(`     ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(7)}  ${r.cpc.toFixed(2).padStart(5)}  ${r.kw}`);
    }
  }
  fs.writeFileSync('tmp/huge-vol-kd-zero.json', JSON.stringify(allByRegion, null, 2));
  console.log('\nWrote tmp/huge-vol-kd-zero.json');

  // Cross-region winners — top 10 highest-vol globally
  const all = Object.entries(allByRegion).flatMap(([region, kws]) => kws.map((k) => ({ region, ...k })));
  all.sort((a, b) => b.vol - a.vol);
  console.log(`\n══════════ 🏆 TOP 25 GLOBAL — máximo volumen KD ≤ ${KD_MAX} ══════════`);
  console.log(`  KD  VOL/MO    CPC$  REGION  KEYWORD`);
  for (const r of all.slice(0, 25)) {
    console.log(`  ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(7)}  ${r.cpc.toFixed(2).padStart(5)}  ${r.region.padEnd(6)}  ${r.kw}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
