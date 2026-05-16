#!/usr/bin/env node
// Run Lighthouse via Google's public PageSpeed Insights API on key landings.
// No API key required (free tier ~25k/day).
//
// Usage: node scripts/pagespeed-audit.mjs [mobile|desktop]

const STRATEGY = process.argv[2] || 'mobile';

const URLS = [
  'https://agalaz.com/',
  'https://agalaz.com/try-on',
  'https://agalaz.com/prom-dress',
  'https://agalaz.com/wedding-guest-dress',
  'https://agalaz.com/pt/vestido-festa',
  'https://agalaz.com/pt/unhas-decoradas',
  'https://agalaz.com/es/probador-virtual-zara',
  'https://agalaz.com/fr/robe-invitee-mariage',
  'https://agalaz.com/it/vestito-cerimonia',
];

const API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

function fmt(n, suffix = '') {
  if (n == null) return 'n/a';
  return `${n.toFixed(0)}${suffix}`;
}

function colorScore(score) {
  if (score == null) return 'n/a';
  const pct = Math.round(score * 100);
  return pct >= 90 ? `${pct} ✓` : pct >= 50 ? `${pct} ~` : `${pct} ✗`;
}

async function audit(url, attempt = 1) {
  const params = new URLSearchParams({
    url,
    strategy: STRATEGY,
    category: 'performance',
  });
  if (process.env.PSI_KEY) params.set('key', process.env.PSI_KEY);
  const res = await fetch(`${API}?${params}`);
  if (res.status === 429 && attempt < 4) {
    const wait = 15000 * attempt;
    process.stdout.write(` [429, retry in ${wait / 1000}s]`);
    await new Promise((r) => setTimeout(r, wait));
    return audit(url, attempt + 1);
  }
  if (!res.ok) {
    return { url, error: `HTTP ${res.status}` };
  }
  const json = await res.json();
  const lr = json.lighthouseResult;
  if (!lr) return { url, error: 'no lighthouseResult' };
  const perf = lr.categories?.performance?.score;
  const a = lr.audits || {};
  return {
    url,
    perf,
    fcp: a['first-contentful-paint']?.numericValue,
    lcp: a['largest-contentful-paint']?.numericValue,
    tbt: a['total-blocking-time']?.numericValue,
    cls: a['cumulative-layout-shift']?.numericValue,
    speedIdx: a['speed-index']?.numericValue,
    tti: a['interactive']?.numericValue,
  };
}

(async () => {
  console.log(`\nPageSpeed audit (${STRATEGY})`);
  console.log('='.repeat(78));
  console.log('URL'.padEnd(48), 'Perf', '  FCP', '   LCP', '  TBT', '   CLS');
  console.log('-'.repeat(78));

  const results = [];
  for (const url of URLS) {
    process.stdout.write(`  ${url.replace('https://agalaz.com', '').padEnd(46)} ...`);
    try {
      const r = await audit(url);
      if (r.error) {
        console.log(` ERR: ${r.error}`);
        results.push(r);
        continue;
      }
      const short = r.url.replace('https://agalaz.com', '') || '/';
      console.log(
        `\r  ${short.padEnd(46)} ` +
          colorScore(r.perf).padEnd(6) +
          fmt(r.fcp, 'ms').padStart(7) +
          fmt(r.lcp, 'ms').padStart(8) +
          fmt(r.tbt, 'ms').padStart(7) +
          (r.cls != null ? r.cls.toFixed(3) : 'n/a').padStart(8)
      );
      results.push(r);
    } catch (e) {
      console.log(` THROW: ${e.message}`);
      results.push({ url, error: e.message });
    }
    await new Promise((r) => setTimeout(r, 4000));
  }

  console.log('-'.repeat(78));
  const ok = results.filter((r) => r.perf != null);
  if (ok.length) {
    const avgPerf = ok.reduce((s, r) => s + r.perf, 0) / ok.length;
    const avgLcp = ok.reduce((s, r) => s + (r.lcp || 0), 0) / ok.length;
    const avgTbt = ok.reduce((s, r) => s + (r.tbt || 0), 0) / ok.length;
    console.log(
      `  AVG (${ok.length}/${URLS.length})`.padEnd(48),
      colorScore(avgPerf / 1).padEnd(6),
      ''.padStart(7),
      fmt(avgLcp, 'ms').padStart(8),
      fmt(avgTbt, 'ms').padStart(7)
    );
  }
  console.log('');
})();
