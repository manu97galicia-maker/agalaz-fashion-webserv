// Take every keyword already gathered (regional + cheap-cpc analyses) and
// compute monthly profit at 3 conversion rates: 0.8% / 1.0% / 1.5%.
// Mark which keywords are profitable at each rate and which conv rate
// each one would need to break even.
//
// Unit economics:
//   Avg margin / paid customer:  $6.79 (50% Basic $4.99 + 50% Pro $9.99,
//                                  with $0.07 Gemini cost per render)
//   Demo-use rate:               30% of clicks try the free demo
//     → free Gemini cost / click: 0.30 × $0.07 = $0.021
//   Top-spot impression share:   60%
//   Ad CTR top spot:             10%
//     → clicks / month:          vol × 0.60 × 0.10 = vol × 0.06

import fs from 'fs';

const MARGIN = 6.79;
const FREE_RATE = 0.30;
const FREE_COST = 0.07;

function load(path) {
  if (!fs.existsSync(path)) return null;
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const regional = load('tmp/regional-tryon-keywords.json') || {};
const cheap = load('tmp/cheap-cpc-tryon-keywords.json') || [];

const map = new Map();
for (const [region, items] of Object.entries(regional)) {
  for (const it of items) {
    const key = `${region}::${it.kw}`;
    map.set(key, { region, ...it });
  }
}
for (const it of cheap) {
  const key = `${it.region}::${it.kw}`;
  if (!map.has(key)) map.set(key, it);
}

const all = [...map.values()].filter((k) => k.vol >= 100 && (k.cpc ?? 0) > 0);

function calcProfit(k, conv) {
  const clicks = Math.min(Math.round(k.vol * 0.06), 300);
  const spend = clicks * (k.cpc ?? 0);
  const geminiFree = clicks * FREE_RATE * FREE_COST;
  const customers = clicks * conv;
  const revenue = customers * MARGIN;
  return { clicks, spend, geminiFree, customers, revenue, profit: revenue - spend - geminiFree };
}

function breakEvenConv(k) {
  const clicks = Math.min(Math.round(k.vol * 0.06), 300);
  const spend = clicks * (k.cpc ?? 0);
  const geminiFree = clicks * FREE_RATE * FREE_COST;
  // revenue = spend + geminiFree → customers × $6.79 = spend + geminiFree
  // → customers = (spend + geminiFree) / margin
  // → conv = customers / clicks
  const customersNeeded = (spend + geminiFree) / MARGIN;
  return customersNeeded / clicks;
}

const RATES = [0.008, 0.010, 0.015];
const results = all.map((k) => {
  const p = {};
  for (const r of RATES) p[`r${r * 1000}`] = calcProfit(k, r);
  return { ...k, profit: p, beConv: breakEvenConv(k) };
});

// Filter ones that are profitable at some rate
const profitableAt15 = results.filter((r) => r.profit.r15.profit >= 0).sort((a, b) => b.profit.r15.profit - a.profit.r15.profit);
const profitableAt10 = results.filter((r) => r.profit.r10.profit >= 0).sort((a, b) => b.profit.r10.profit - a.profit.r10.profit);
const profitableAt8 = results.filter((r) => r.profit.r8.profit >= 0).sort((a, b) => b.profit.r8.profit - a.profit.r8.profit);

console.log(`\n📊 Total keywords analyzed: ${all.length}`);
console.log(`   Profitable @ 0.8% conv: ${profitableAt8.length}`);
console.log(`   Profitable @ 1.0% conv: ${profitableAt10.length}`);
console.log(`   Profitable @ 1.5% conv: ${profitableAt15.length}`);

function show(rate, list) {
  console.log(`\n══════════ Top 20 profitable @ ${rate}% ══════════`);
  console.log(`  PROFIT$  KD  VOL/MO  CPC$   CLICKS  SPEND$  REV$  REGION  KEYWORD`);
  for (const r of list.slice(0, 20)) {
    const p = r.profit[`r${rate * 10}`];
    console.log(`  ${p.profit.toFixed(2).padStart(7)}  ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(6)}  ${r.cpc.toFixed(2).padStart(5)}  ${p.clicks.toString().padStart(6)}  ${p.spend.toFixed(2).padStart(6)}  ${p.revenue.toFixed(2).padStart(5)}  ${r.region.padEnd(6)}  ${r.kw}`);
  }
}
show(0.8, profitableAt8);
show(1.0, profitableAt10);
show(1.5, profitableAt15);

console.log('\n══════════ Break-even conv rate per region (cheapest entry) ══════════');
const byRegion = {};
for (const r of results) {
  if (!byRegion[r.region] || r.beConv < byRegion[r.region].beConv) byRegion[r.region] = r;
}
console.log(`  BE CONV  KD  VOL/MO  CPC$   REGION  KEYWORD`);
for (const r of Object.values(byRegion).sort((a, b) => a.beConv - b.beConv)) {
  console.log(`  ${(r.beConv * 100).toFixed(2).padStart(5)}%  ${r.kd.toString().padStart(2)}  ${r.vol.toString().padStart(6)}  ${r.cpc.toFixed(2).padStart(5)}  ${r.region.padEnd(6)}  ${r.kw}`);
}

fs.writeFileSync('tmp/profitability-by-conv-rate.json', JSON.stringify({ results, profitableAt15, profitableAt10, profitableAt8 }, null, 2));
console.log('\nWrote tmp/profitability-by-conv-rate.json');
