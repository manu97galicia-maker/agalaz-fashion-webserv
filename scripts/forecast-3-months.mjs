// Extend the position forecast to 12 weeks (~3 months). Uses the existing
// snapshot from tmp/sitemap-position-forecast.csv so we don't have to call
// DataForSEO again — just project the current positions forward with a more
// realistic ramp curve appropriate for that horizon.
//
// Two scenarios:
//   A. "no work" — just waiting. Google re-crawls + re-evaluates over time,
//      but no new backlinks or content.
//   B. "with light backlink work" — Product Hunt launch + 10 AI directories +
//      a few Reddit posts gives a ~2x acceleration on position climbing.
//
// CTR table from industry consensus 2024-25.

import fs from 'fs';

const CTR = {
  1: 0.28, 2: 0.15, 3: 0.10, 4: 0.07, 5: 0.05,
  6: 0.04, 7: 0.03, 8: 0.025, 9: 0.02, 10: 0.018,
  11: 0.014, 12: 0.012, 13: 0.010, 14: 0.009, 15: 0.008,
  20: 0.006, 25: 0.0045, 30: 0.003, 40: 0.0018, 50: 0.001,
  70: 0.0007, 100: 0.0003,
};
function ctrAt(pos) {
  if (!pos || pos > 100) return 0.0001; // residual long-tail brand traffic
  const keys = Object.keys(CTR).map(Number).sort((a, b) => a - b);
  for (const k of keys) if (pos <= k) return CTR[k];
  return 0;
}

// Project position N weeks forward.
// Model:
//   - Each URL has a "floor" position determined by SERP softness (we proxy
//     this from current position — if you ranked at 17, you can probably get
//     to ~8; if you're >100, you can probably get to ~40 in 3 months on a
//     young domain without external work).
//   - Climb rate: decays geometrically toward floor (faster early, slower late)
//   - Backlinks multiplier: 1.0 (no work) or 2.0 (light backlink work)
function projectPosition(currentPos, weeks, withBacklinks = false) {
  const isNotRanking = !currentPos || currentPos > 100;
  // Floor: realistic minimum position for a young domain after 3 months
  let floor;
  if (isNotRanking) {
    floor = withBacklinks ? 25 : 45;
  } else if (currentPos <= 10) {
    floor = withBacklinks ? 4 : 7;
  } else if (currentPos <= 25) {
    floor = withBacklinks ? 6 : 10;
  } else if (currentPos <= 50) {
    floor = withBacklinks ? 12 : 22;
  } else if (currentPos <= 80) {
    floor = withBacklinks ? 22 : 40;
  } else {
    floor = withBacklinks ? 30 : 55;
  }

  const startPos = isNotRanking ? 110 : currentPos;
  // Climb: 12% closer to floor per week (no backlinks), 22% with backlinks
  const decayPerWeek = withBacklinks ? 0.78 : 0.88;
  let pos = startPos;
  for (let w = 0; w < weeks; w++) {
    pos = Math.max(floor, pos - (pos - floor) * (1 - decayPerWeek));
  }
  return Math.round(pos);
}

// ── Load current data ─────────────────────────────────────────────────────
const lines = fs.readFileSync('tmp/sitemap-position-forecast.csv', 'utf8').trim().split('\n');
const headers = lines.shift().split(',');
const rows = lines.map((line) => {
  const cells = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g).map((c) => c.replace(/^,?"?|"?$/g, '').replace(/""/g, '"'));
  const o = {};
  headers.forEach((h, i) => (o[h] = cells[i] ?? ''));
  return o;
});

// ── Project at week 4, 8, 12 ──────────────────────────────────────────────
const results = rows.map((r) => {
  const vol = +r.volume || 0;
  const currentPos = r.current_pos === '>100' ? null : +r.current_pos;
  const w4_a = projectPosition(currentPos, 4, false);
  const w8_a = projectPosition(currentPos, 8, false);
  const w12_a = projectPosition(currentPos, 12, false);
  const w4_b = projectPosition(currentPos, 4, true);
  const w8_b = projectPosition(currentPos, 8, true);
  const w12_b = projectPosition(currentPos, 12, true);
  return {
    url: r.url, country: r.country, kw: r.keyword, vol, currentPos,
    a: {
      w4: { pos: w4_a, visitsDay: Math.round((vol * ctrAt(w4_a)) / 30) },
      w8: { pos: w8_a, visitsDay: Math.round((vol * ctrAt(w8_a)) / 30) },
      w12: { pos: w12_a, visitsDay: Math.round((vol * ctrAt(w12_a)) / 30) },
    },
    b: {
      w4: { pos: w4_b, visitsDay: Math.round((vol * ctrAt(w4_b)) / 30) },
      w8: { pos: w8_b, visitsDay: Math.round((vol * ctrAt(w8_b)) / 30) },
      w12: { pos: w12_b, visitsDay: Math.round((vol * ctrAt(w12_b)) / 30) },
    },
  };
});

// ── Aggregate ─────────────────────────────────────────────────────────────
function agg(key, when) {
  return results.reduce((s, r) => s + r[key][when].visitsDay, 0);
}

console.log('=== SCENARIO A: just waiting, NO additional work ===');
console.log(`  Week 4 (~1 month):  ${agg('a', 'w4')} visits/day`);
console.log(`  Week 8 (~2 months): ${agg('a', 'w8')} visits/day`);
console.log(`  Week 12 (3 months): ${agg('a', 'w12')} visits/day`);

console.log('\n=== SCENARIO B: with light backlink work (PH launch + 10 directories + Reddit) ===');
console.log(`  Week 4 (~1 month):  ${agg('b', 'w4')} visits/day`);
console.log(`  Week 8 (~2 months): ${agg('b', 'w8')} visits/day`);
console.log(`  Week 12 (3 months): ${agg('b', 'w12')} visits/day`);

// ── Top contributors at month 3 ───────────────────────────────────────────
console.log('\n=== TOP 20 URLs by month-3 visits (Scenario A — no work) ===');
const sortedA = [...results].sort((a, b) => b.a.w12.visitsDay - a.a.w12.visitsDay);
console.log('  country  pos→m3  vol/mo  visits/d  url  ·  keyword');
for (const r of sortedA.slice(0, 20)) {
  console.log(
    `  ${r.country.padEnd(3)}  ${(r.currentPos || '>100').toString().padStart(3)} → ${r.a.w12.pos.toString().padStart(3)}  ${r.vol.toString().padStart(6)}  ${r.a.w12.visitsDay.toString().padStart(4)}/d   ${r.url.padEnd(40)}  ·  ${r.kw}`,
  );
}

console.log('\n=== TOP 20 URLs at month 3 (Scenario B — with backlinks) ===');
const sortedB = [...results].sort((a, b) => b.b.w12.visitsDay - a.b.w12.visitsDay);
for (const r of sortedB.slice(0, 20)) {
  console.log(
    `  ${r.country.padEnd(3)}  ${(r.currentPos || '>100').toString().padStart(3)} → ${r.b.w12.pos.toString().padStart(3)}  ${r.vol.toString().padStart(6)}  ${r.b.w12.visitsDay.toString().padStart(4)}/d   ${r.url.padEnd(40)}  ·  ${r.kw}`,
  );
}

// Save CSV
const csv = (s) => { if (s == null) return ''; const v = String(s); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
fs.writeFileSync('tmp/forecast-3-months.csv',
  ['url,country,keyword,volume,current_pos,A_w4_pos,A_w4_visits,A_w8_pos,A_w8_visits,A_w12_pos,A_w12_visits,B_w4_pos,B_w4_visits,B_w8_pos,B_w8_visits,B_w12_pos,B_w12_visits',
    ...results.map((r) => [csv(r.url), r.country, csv(r.kw), r.vol, r.currentPos || '>100',
      r.a.w4.pos, r.a.w4.visitsDay, r.a.w8.pos, r.a.w8.visitsDay, r.a.w12.pos, r.a.w12.visitsDay,
      r.b.w4.pos, r.b.w4.visitsDay, r.b.w8.pos, r.b.w8.visitsDay, r.b.w12.pos, r.b.w12.visitsDay].join(','))].join('\n'));
console.log('\nWrote tmp/forecast-3-months.csv');
