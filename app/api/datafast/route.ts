import { NextRequest, NextResponse } from 'next/server';

// First-party proxy for Datafast analytics.
//
// Why: Instagram/Facebook/TikTok in-app WebViews and ad-blockers (uBlock,
// Brave Shields, AdGuard, etc.) frequently block direct requests to
// datafa.st/api/events — they recognise the third-party domain as an
// analytics endpoint and strip the request. Result: paid ad traffic on
// mobile in-app browsers shows up in Datafast as a pageview at best,
// custom events never arrive.
//
// Fix: the browser hits a same-origin URL on agalaz.com (this endpoint).
// To the browser it looks identical to any other agalaz.com API call —
// not blockable as "analytics". We then forward the payload server-side
// to Datafast's real endpoint, where it gets recorded normally.
//
// Wired by adding `data-api-url="https://agalaz.com/api/datafast"` to the
// Datafast script tag in app/layout.tsx. The Datafast client picks that
// up automatically (see datafa.st/js/script.js: `const S=n(e+"api-url")`).

const DATAFAST_UPSTREAM = 'https://datafa.st/api/events';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad body' }, { status: 400 });
  }

  // Forward the real visitor IP + User-Agent so Datafast geo/device
  // attribution stays accurate (otherwise everyone would look like they
  // come from the Vercel edge POP).
  const fwd =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '';
  const ua = request.headers.get('user-agent') ?? '';

  try {
    const res = await fetch(DATAFAST_UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(fwd && { 'X-Forwarded-For': fwd }),
        ...(ua && { 'User-Agent': ua }),
      },
      body: JSON.stringify(body),
    });
    // Pass through whatever Datafast says (200 / 400 / etc.). The browser
    // doesn't actually care about the response body — it just needs a
    // success status code so the queue advances.
    return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : res.status });
  } catch (err) {
    console.error('datafast proxy error:', (err as Error).message);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
