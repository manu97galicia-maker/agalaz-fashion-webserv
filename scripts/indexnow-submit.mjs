// Bulk-submits URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep).
// One POST per run, no auth — ownership is proven by the key file at
// /<key>.txt in public/. Run after major content updates:
//   node scripts/indexnow-submit.mjs

const KEY = '69c8e23c9eca4a93b234fcbc19f11ed1';
const HOST = 'agalaz.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const urls = [
  'https://agalaz.com/',
  'https://agalaz.com/try-on',
  'https://agalaz.com/virtual-try-on',
  'https://agalaz.com/virtual-tattoo-simulator',
  'https://agalaz.com/realistic-swimwear-try-on',
  'https://agalaz.com/virtual-earring-try-on',
  'https://agalaz.com/virtual-wedding-dress-try-on',
  'https://agalaz.com/virtual-nail-try-on',
  'https://agalaz.com/blog',
  'https://agalaz.com/partners',
  'https://agalaz.com/privacy',
  'https://agalaz.com/terms',
  'https://agalaz.com/blog/how-to-know-if-clothes-will-fit-without-trying-them-on',
  'https://agalaz.com/blog/why-clothes-look-different-online-vs-in-person',
  'https://agalaz.com/blog/how-to-reduce-online-shopping-returns',
  'https://agalaz.com/blog/best-way-to-try-on-clothes-online-with-ai',
  'https://agalaz.com/blog/how-to-dress-for-your-body-type-without-a-stylist',
  'https://agalaz.com/blog/online-shopping-mistakes-that-lead-to-returns',
  'https://agalaz.com/blog/what-to-wear-to-a-job-interview-2026',
  'https://agalaz.com/blog/best-colors-to-wear-for-your-skin-tone',
  'https://agalaz.com/blog/how-to-style-oversized-clothes-without-looking-sloppy',
  'https://agalaz.com/blog/capsule-wardrobe-guide-30-outfits-15-pieces',
  'https://agalaz.com/blog/barrel-leg-jeans-styling-guide',
  'https://agalaz.com/blog/digital-nomad-corporate-crease-free-office-wear',
  'https://agalaz.com/blog/jellyfish-silhouette-styling-guide',
  'https://agalaz.com/blog/how-to-get-accurate-body-measurements-for-virtual-try-on',
  'https://agalaz.com/blog/best-free-virtual-dressing-room-apps-android-ios-2026',
  'https://agalaz.com/blog/virtual-try-on-office-siren-aesthetic-glasses',
  'https://agalaz.com/blog/best-glasses-colors-deep-autumn-skin-tone',
  'https://agalaz.com/blog/free-ai-glasses-stylist-diamond-face-shape',
  'https://agalaz.com/blog/virtual-try-on-glasses-hide-dark-circles',
  'https://agalaz.com/blog/coquette-aesthetic-spring-nails-virtual-try-on',
  'https://agalaz.com/blog/short-almond-spring-nails-clean-girl-look',
  'https://agalaz.com/blog/pastel-chrome-nails-2026-futuristic-spring-trend',
  'https://agalaz.com/blog/spring-wedding-guest-mother-of-groom-dresses-2026',
  'https://agalaz.com/blog/ai-clothes-changer-online-free-trial',
  'https://agalaz.com/blog/como-reducir-devoluciones-tienda-ropa-online',
  'https://agalaz.com/blog/virtual-dressing-room-online-free',
  'https://agalaz.com/blog/1-5-carat-vs-2-carat-diamond-on-hand',
  'https://agalaz.com/blog/diamond-carat-size-on-hand-simulator',
];

async function main() {
  // Sanity check — confirm the key file is reachable before submitting.
  const probe = await fetch(KEY_LOCATION);
  if (!probe.ok || (await probe.text()).trim() !== KEY) {
    console.error(`✗ Key file not reachable or content mismatch at ${KEY_LOCATION}`);
    console.error(`  Status: ${probe.status}. Make sure the deploy is live.`);
    process.exit(1);
  }
  console.log(`✓ Key file verified at ${KEY_LOCATION}`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  const body = await res.text();
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ Submitted ${urls.length} URLs to IndexNow (HTTP ${res.status})`);
  } else {
    console.error(`✗ HTTP ${res.status}: ${body || '(empty body)'}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
