// IndexNow auto-submit. Runs on every Vercel PRODUCTION build via the
// `postbuild` hook in package.json. Submits the canonical URL list to
// Bing/Yandex/Yep so they re-crawl recently changed pages within minutes
// instead of days.
//
// IndexNow protocol: https://www.indexnow.org/documentation
//
// Skip conditions (script exits 0 without submitting):
//   - VERCEL_ENV !== 'production'  (preview/dev builds)
//   - INDEXNOW_KEY missing          (vars not set)
//
// To enable on Vercel:
//   1. Add INDEXNOW_KEY env var (32 alphanumeric chars, our existing one).
//   2. The matching key file at public/{INDEXNOW_KEY}.txt must contain the
//      same key string for Bing to verify ownership. Generated alongside.

const INDEXNOW_KEY = process.env.INDEXNOW_KEY?.trim();
const HOST = 'agalaz.com';
const VERCEL_ENV = process.env.VERCEL_ENV;

if (VERCEL_ENV && VERCEL_ENV !== 'production') {
  console.log(`[indexnow] Skipping — VERCEL_ENV=${VERCEL_ENV} (only runs on production)`);
  process.exit(0);
}
if (!INDEXNOW_KEY) {
  console.log('[indexnow] Skipping — INDEXNOW_KEY env var not set');
  process.exit(0);
}

// Curated list of high-priority canonical URLs. Bing accepts up to 10K but
// hammering them on every deploy gets you rate-limited; we keep this to the
// pages that move the needle and let normal sitemap crawl handle the rest.
const URLS = [
  // Home + main entry points
  `https://${HOST}/`,
  `https://${HOST}/try-on`,
  `https://${HOST}/virtual-try-on`,
  `https://${HOST}/blog`,
  `https://${HOST}/partners`,
  `https://${HOST}/shopify`,
  `https://${HOST}/woocommerce`,

  // Localized homes
  `https://${HOST}/es`,
  `https://${HOST}/fr`,
  `https://${HOST}/pt`,
  `https://${HOST}/de`,
  `https://${HOST}/it`,

  // Top product try-on landings (EN canonical only — localized inherit ranking)
  `https://${HOST}/virtual-tattoo-simulator`,
  `https://${HOST}/realistic-swimwear-try-on`,
  `https://${HOST}/virtual-glasses-try-on`,
  `https://${HOST}/virtual-jewelry-try-on`,
  `https://${HOST}/virtual-wedding-dress-try-on`,
  `https://${HOST}/virtual-hairstyle-try-on`,
  `https://${HOST}/virtual-nail-try-on`,

  // 2026-05-10 long-tail mega-clusters (priority 0.95 in sitemap)
  `https://${HOST}/wedding-guest-outfit`,
  `https://${HOST}/es/vestido-invitada-boda`,
  `https://${HOST}/bridesmaid-dress-try-on`,
  `https://${HOST}/halloween-couples-costumes`,
  `https://${HOST}/ja/yukata`,
  `https://${HOST}/natural-makeup-look`,
  `https://${HOST}/engagement-ring-on-which-hand`,
  `https://${HOST}/pt/look-festa-junina`,
  `https://${HOST}/fr/tenue-bapteme`,
  `https://${HOST}/it/vestito-comunione`,
  `https://${HOST}/hi/lehenga`,

  // 2026-05-10 haircut-by-face-shape suite
  `https://${HOST}/haircut-for-round-face`,
  `https://${HOST}/haircut-for-oval-face`,
  `https://${HOST}/haircut-for-diamond-face`,
  `https://${HOST}/haircut-for-square-face`,
];

const body = {
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
  urlList: URLS,
};

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.status === 200 || res.status === 202) {
    console.log(`[indexnow] ✓ Submitted ${URLS.length} URLs (HTTP ${res.status})`);
  } else {
    const text = await res.text();
    console.warn(`[indexnow] ⚠ HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
} catch (err) {
  // Never fail the build because of IndexNow
  console.warn(`[indexnow] ⚠ Network error: ${err.message}`);
}
