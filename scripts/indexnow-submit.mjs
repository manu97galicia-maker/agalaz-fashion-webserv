// Bulk-submits every URL in /sitemap.xml to IndexNow (Bing, Yandex, Seznam,
// Naver, Yep). One POST per run, no auth — ownership is proven by the key
// file at /<key>.txt in public/. Run after major content updates:
//   node scripts/indexnow-submit.mjs
//
// Pulls URLs straight from the live sitemap so we don't have to maintain a
// hand-curated list (it always drifts). If you need a different host, set
// INDEXNOW_HOST=staging.agalaz.com node scripts/indexnow-submit.mjs.

const KEY = '69c8e23c9eca4a93b234fcbc19f11ed1';
const HOST = process.env.INDEXNOW_HOST || 'agalaz.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: HTTP ${res.status} from ${SITEMAP_URL}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  const urls = matches.map((m) => m[1].trim()).filter(Boolean);
  // Strip duplicates (sitemap.xml itself shouldn't but defensive)
  return [...new Set(urls)];
}

async function main() {
  // Sanity check — confirm the key file is reachable before submitting.
  const probe = await fetch(KEY_LOCATION);
  if (!probe.ok || (await probe.text()).trim() !== KEY) {
    console.error(`✗ Key file not reachable or content mismatch at ${KEY_LOCATION}`);
    console.error(`  Status: ${probe.status}. Make sure the deploy is live.`);
    process.exit(1);
  }
  console.log(`✓ Key file verified at ${KEY_LOCATION}`);

  const urls = await fetchSitemapUrls();
  if (urls.length === 0) {
    console.error(`✗ Sitemap returned zero URLs — aborting.`);
    process.exit(1);
  }
  console.log(`✓ Loaded ${urls.length} URLs from ${SITEMAP_URL}`);

  // IndexNow accepts up to 10000 URLs per call but recommends batches; we send
  // in chunks of 10000 to be safe (well under the limit even with growth).
  const BATCH = 10000;
  let totalOk = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch,
      }),
    });
    const body = await res.text();
    if (res.status === 200 || res.status === 202) {
      console.log(`✓ Submitted batch ${i / BATCH + 1} (${batch.length} URLs) — HTTP ${res.status}`);
      totalOk += batch.length;
    } else {
      console.error(`✗ Batch ${i / BATCH + 1} HTTP ${res.status}: ${body || '(empty body)'}`);
      process.exit(1);
    }
  }
  console.log(`\n✓ Done — submitted ${totalOk} URLs to IndexNow.`);
}

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
