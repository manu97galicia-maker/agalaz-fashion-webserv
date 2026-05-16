// Regional keyword research for Microsoft Ads. For each region (ES, AR
// countries, KR, JP, US, EU, BR), pull every keyword related to "virtual
// try-on / probador virtual / fitting room" + niche modifiers. Filter by
// KD ≤ 15, sort by volume × CPC (commercial value). Return top picks
// per region with a recommended single keyword for an ad.

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
    name: 'Spain (ES)',
    lang: 'es', loc: 2724,
    seeds: [
      'probador virtual', 'probador online', 'probarse ropa online', 'probador virtual gafas',
      'probador virtual ropa zara', 'probador virtual vestido novia', 'probador virtual maquillaje',
      'probador virtual peluqueria', 'cambiar color pelo virtual', 'simulador uñas',
      'probador joyería online', 'simulador maquillaje', 'probador anillos online',
    ],
  },
  {
    name: 'Brazil (BR)',
    lang: 'pt', loc: 2076,
    seeds: [
      'provador virtual', 'provador online', 'experimentar roupa online', 'provador virtual de óculos',
      'unhas decoradas virtual', 'provador virtual maquiagem', 'provador virtual de roupas',
      'mudar cor cabelo virtual', 'simulador unhas online', 'provador virtual joias',
    ],
  },
  {
    name: 'USA (EN)',
    lang: 'en', loc: 2840,
    seeds: [
      'virtual try on', 'virtual try on glasses', 'virtual try on dress', 'virtual try on nails',
      'virtual hair color try on', 'engagement ring on hand simulator', 'try on app',
      'virtual try on makeup', 'virtual fitting room', 'wedding dress simulator',
      'hairstyle simulator', 'tattoo simulator',
    ],
  },
  {
    name: 'UK + Europe EN (UK/IE)',
    lang: 'en', loc: 2826,
    seeds: [
      'virtual try on', 'virtual try on glasses', 'virtual fitting room', 'virtual hair colour try on',
      'wedding dress simulator', 'virtual makeup try on', 'tattoo simulator',
    ],
  },
  {
    name: 'France',
    lang: 'fr', loc: 2250,
    seeds: [
      'essayage virtuel', 'essayage virtuel lunettes', 'simulateur coupe de cheveux',
      'essayage virtuel robe de mariée', 'cabine d\'essayage virtuelle', 'simulateur maquillage',
    ],
  },
  {
    name: 'Germany',
    lang: 'de', loc: 2276,
    seeds: [
      'virtuelle anprobe', 'brille virtuell anprobieren', 'frisuren testen online',
      'kleider virtuell anprobieren', 'virtueller umkleideraum', 'makeup simulator',
    ],
  },
  {
    name: 'Italy',
    lang: 'it', loc: 2380,
    seeds: [
      'prova virtuale', 'prova virtuale occhiali', 'simulatore taglio capelli',
      'prova abito sposa online', 'camerino virtuale', 'simulatore trucco',
    ],
  },
  {
    name: 'Korea',
    lang: 'ko', loc: 2410,
    seeds: [
      '가상 피팅', '가상 피팅룸', 'AI 옷 입어보기', '안경 가상 피팅', '메이크업 가상',
      '헤어 가상 시뮬레이션', '네일 가상',
    ],
  },
  {
    name: 'Japan',
    lang: 'ja', loc: 2392,
    seeds: [
      'バーチャル試着', 'バーチャル試着 メガネ', 'AI 試着', 'ヘアスタイル シミュレーション',
      'メイク シミュレーション', '結婚式 ドレス シミュレーション', '着物 試着',
    ],
  },
  {
    name: 'Saudi Arabia (AR)',
    lang: 'ar', loc: 2682,
    seeds: [
      'تجربة افتراضية', 'تجربة الملابس افتراضيا', 'تجربة النظارات اونلاين',
      'تجربة المكياج اونلاين', 'تجربة قصة شعر', 'فستان زفاف افتراضي',
    ],
  },
  {
    name: 'UAE (AR)',
    lang: 'ar', loc: 2784,
    seeds: [
      'تجربة افتراضية', 'تجربة الملابس افتراضيا', 'تجربة النظارات اونلاين',
      'تجربة المكياج اونلاين', 'تجربة قصة شعر',
    ],
  },
];

const KD_MAX = 15;
const VOL_MIN = 100;

async function main() {
  const allByRegion = {};
  for (const region of REGIONS) {
    console.log(`\n══════════ ${region.name} ══════════`);
    const all = new Map();
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
          if (all.has(kw)) continue;
          all.set(kw, {
            kw,
            vol: it.keyword_info?.search_volume ?? 0,
            kd: it.keyword_properties?.keyword_difficulty ?? 0,
            cpc: it.keyword_info?.cpc ?? 0,
          });
        }
      } catch (e) {
        console.log(`  ! seed "${seed}" err: ${e.message?.slice(0, 60)}`);
      }
      await new Promise((r) => setTimeout(r, 350));
    }
    // Commercial value = vol × cpc (USD spend potential)
    const ranked = [...all.values()]
      .filter((r) => r.vol >= VOL_MIN && r.kd <= KD_MAX)
      .sort((a, b) => (b.vol * (b.cpc || 0.1)) - (a.vol * (a.cpc || 0.1)));
    allByRegion[region.name] = ranked;
    console.log(`  Total filtered: ${ranked.length} keywords (vol ≥ ${VOL_MIN}, KD ≤ ${KD_MAX})`);
    console.log(`  Top 10 by commercial value (vol × CPC):`);
    console.log(`  KD  VOL/MO   CPC$    VALUE$  KEYWORD`);
    for (const r of ranked.slice(0, 10)) {
      const value = (r.vol * (r.cpc || 0)).toFixed(0);
      console.log(`  ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(7)}  ${r.cpc.toFixed(2).padStart(5)}  ${value.padStart(6)}  ${r.kw}`);
    }
  }
  fs.writeFileSync('tmp/regional-tryon-keywords.json', JSON.stringify(allByRegion, null, 2));
  console.log('\nWrote tmp/regional-tryon-keywords.json');
}

main().catch((e) => { console.error(e); process.exit(1); });
