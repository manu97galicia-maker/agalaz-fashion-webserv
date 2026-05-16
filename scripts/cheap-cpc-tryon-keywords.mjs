// Hunt for KEYWORD COMBOS that hit the sweet spot:
//   - vol ≥ 100/mo (enough traffic)
//   - KD ≤ 15 (rankable / ad-eligible)
//   - CPC ≤ $0.50 (close to break-even @ 0.8% conv with $6.79 margin)
// Focus on seekers of "free / gratis / online / ai / sin app" who match
// Agalaz's anonymous-free-render value prop perfectly.

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
      'probador virtual gratis', 'probador online gratis', 'probarse ropa gratis',
      'probador virtual online sin descargar', 'probador ai gratis',
      'cambiar pelo gratis online', 'simulador uñas gratis',
      'probador virtual app gratis', 'try on gratis ai',
    ],
  },
  {
    name: 'BR', lang: 'pt', loc: 2076,
    seeds: [
      'provador virtual gratis', 'provador online gratis', 'experimentar roupa gratis',
      'provador virtual de óculos gratis', 'provador virtual online gratis',
      'simulador unhas gratis', 'cambiar cabelo online gratis', 'app provador gratis',
      'ai provador roupa gratis',
    ],
  },
  {
    name: 'US', lang: 'en', loc: 2840,
    seeds: [
      'virtual try on free online', 'virtual try on ai free', 'free virtual fitting room',
      'try on clothes ai free', 'virtual try on no signup', 'free virtual dressing room',
      'try on hairstyle online free', 'see haircut on me free', 'tattoo simulator online free',
      'virtual makeup try on free', 'see myself with different hair',
      'virtual nail try on free', 'free wig try on online',
    ],
  },
  {
    name: 'UK', lang: 'en', loc: 2826,
    seeds: [
      'virtual try on free online', 'free virtual fitting room', 'free wedding dress simulator',
      'free hair colour try on', 'try on glasses free online',
    ],
  },
  {
    name: 'FR', lang: 'fr', loc: 2250,
    seeds: [
      'essayage virtuel gratuit', 'simulateur coupe cheveux gratuit',
      'cabine essayage virtuelle gratuite', 'essayer lunettes en ligne gratuit',
      'simulateur maquillage gratuit', 'changer coupe cheveux gratuit',
    ],
  },
  {
    name: 'DE', lang: 'de', loc: 2276,
    seeds: [
      'virtuelle anprobe kostenlos', 'frisuren online testen kostenlos',
      'brille kostenlos anprobieren', 'kleider online anprobieren kostenlos',
      'haarfarbe online testen kostenlos',
    ],
  },
  {
    name: 'IT', lang: 'it', loc: 2380,
    seeds: [
      'prova virtuale gratis', 'simulatore taglio capelli gratis',
      'cabina prova virtuale gratis', 'provare occhiali online gratis',
      'simulatore trucco gratis', 'provare vestiti online gratis',
    ],
  },
  {
    name: 'JP', lang: 'ja', loc: 2392,
    seeds: [
      'バーチャル試着 無料', 'ヘアスタイル シミュレーション 無料',
      'メガネ 試着 無料', 'AI 試着 無料',
    ],
  },
  {
    name: 'KR', lang: 'ko', loc: 2410,
    seeds: [
      '가상 피팅 무료', 'AI 옷 무료', '헤어 시뮬레이션 무료',
      '안경 가상 피팅 무료',
    ],
  },
];

const KD_MAX = 15;
const VOL_MIN = 100;
const CPC_MAX = 0.50;

async function main() {
  const allCheap = [];
  for (const region of REGIONS) {
    console.log(`\n══════════ ${region.name} ══════════`);
    const seen = new Set();
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
          const cpc = it.keyword_info?.cpc ?? 0;
          if (cpc > CPC_MAX) continue;
          allCheap.push({
            region: region.name,
            kw,
            vol: it.keyword_info?.search_volume ?? 0,
            kd: it.keyword_properties?.keyword_difficulty ?? 0,
            cpc,
          });
        }
      } catch (e) {
        console.log(`  ! seed err: ${e.message?.slice(0, 60)}`);
      }
      await new Promise((r) => setTimeout(r, 350));
    }
  }

  // Compute profitability per keyword at 0.8% conv, $6.79 margin
  const MARGIN = 6.79;
  const CONV = 0.008;
  const FREE_RATE = 0.05; // 5% of clicks use the free demo
  const FREE_COST = 0.07;

  const ranked = allCheap.map((k) => {
    const clicks = Math.min(Math.round(k.vol * 0.06), 200); // assume 60% top imp share × 10% CTR, cap 200
    const spend = clicks * k.cpc;
    const gemini_free = clicks * FREE_RATE * FREE_COST;
    const customers = clicks * CONV;
    const revenue = customers * MARGIN;
    const profit = revenue - spend - gemini_free;
    return { ...k, clicks, spend: +spend.toFixed(2), revenue: +revenue.toFixed(2), profit: +profit.toFixed(2) };
  }).sort((a, b) => b.profit - a.profit);

  console.log('\n══════════════════════════════════════════════════════════════════════════════════');
  console.log('  KD VOL/MO  CPC$   CLICKS  SPEND$ REV$  PROFIT$  REGION  KEYWORD');
  console.log('══════════════════════════════════════════════════════════════════════════════════');
  for (const r of ranked.slice(0, 40)) {
    const marker = r.profit >= 0 ? '✓' : ' ';
    console.log(`${marker} ${r.kd.toString().padStart(2)} ${r.vol.toString().padStart(6)} ${r.cpc.toFixed(2).padStart(5)} ${r.clicks.toString().padStart(6)}  ${r.spend.toFixed(2).padStart(5)} ${r.revenue.toFixed(2).padStart(5)} ${r.profit.toFixed(2).padStart(7)}  ${r.region.padEnd(4)}  ${r.kw}`);
  }

  const profitable = ranked.filter((r) => r.profit >= 0);
  const breakeven = ranked.filter((r) => r.profit >= -5 && r.profit < 0);

  console.log(`\n  📊 Summary @ 0.8% conv, $6.79 margin, $0.07 Gemini, 5% free-demo rate:`);
  console.log(`     Profitable keywords:    ${profitable.length}`);
  console.log(`     Break-even (-5 to 0$):  ${breakeven.length}`);
  console.log(`     Total tested:           ${ranked.length}`);
  console.log(`\n  🏆 TOP 10 PROFITABLE:`);
  for (const r of profitable.slice(0, 10)) {
    console.log(`     +$${r.profit.toFixed(2).padStart(5)}/mo  ${r.region}  "${r.kw}"  (${r.vol}/mo, KD ${r.kd}, CPC $${r.cpc})`);
  }

  fs.writeFileSync('tmp/cheap-cpc-tryon-keywords.json', JSON.stringify(ranked, null, 2));
  console.log('\nWrote tmp/cheap-cpc-tryon-keywords.json');
}

main().catch((e) => { console.error(e); process.exit(1); });
