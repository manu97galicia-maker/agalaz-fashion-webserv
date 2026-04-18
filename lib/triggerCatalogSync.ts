const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'https://agalaz.com';
const SECRET = process.env.INTERNAL_SYNC_SECRET || '';

function resolveAppUrl(): string {
  if (APP_URL.startsWith('http')) return APP_URL;
  return `https://${APP_URL}`;
}

export function triggerCatalogSync(partnerId: string): void {
  if (!SECRET) {
    console.warn('[trigger-sync] INTERNAL_SYNC_SECRET missing — sync will not run');
    return;
  }
  const url = `${resolveAppUrl()}/api/internal/sync-catalog`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SECRET}`,
    },
    body: JSON.stringify({ partnerId }),
  }).catch((err) => {
    console.warn('[trigger-sync] request failed:', err?.message);
  });
}
