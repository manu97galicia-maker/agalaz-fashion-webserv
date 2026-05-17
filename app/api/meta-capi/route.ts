import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Meta Conversions API (CAPI) — server-side mirror of the browser Pixel.
//
// Recovers ~30% of iOS 14.5+ ATT-blocked attribution by sending events
// directly from our server to Meta's Graph API. The browser Pixel also
// fires the same event; Meta dedupes by `event_id` so we don't double-count.
//
// User data:
//   - Email is hashed SHA-256 (Meta's requirement) before leaving the server
//   - IP + User-Agent are captured from request headers
//   - fbp / fbc cookies are passed through unchanged (already first-party
//     identifiers, no PII)
//
// Required env vars in Vercel:
//   META_CAPI_TOKEN — System User access token from Events Manager →
//     Settings → Conversions API → "Generate access token". Server-only.

const PIXEL_PRIMARY = '957799927034677';   // Dopamax BM (clean)
const PIXEL_LEGACY = '1837536370441426';   // legacy BM (re-activated as dual)
const API_VERSION = 'v18.0';

function sha256(v: string): string {
  return crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex');
}

export async function POST(request: NextRequest) {
  const TOKEN_PRIMARY = process.env.META_CAPI_TOKEN;
  const TOKEN_LEGACY = process.env.META_CAPI_TOKEN_LEGACY;

  // Soft-fail when NO token is set — keeps the browser Pixel working
  // alone instead of throwing a 500 the client would surface as an error.
  // Either token alone is enough to enable CAPI on that pixel.
  if (!TOKEN_PRIMARY && !TOKEN_LEGACY) {
    return NextResponse.json({ ok: false, error: 'CAPI not configured' }, { status: 200 });
  }

  let body: {
    eventName: string;
    eventId?: string;
    eventSourceUrl?: string;
    fbp?: string;
    fbc?: string;
    email?: string;
    customData?: Record<string, unknown>;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad body' }, { status: 400 });
  }

  const { eventName, eventId, eventSourceUrl, fbp, fbc, email, customData } = body;
  if (!eventName) {
    return NextResponse.json({ ok: false, error: 'eventName required' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined;
  const ua = request.headers.get('user-agent') ?? undefined;

  const userData: Record<string, string> = {};
  if (email && email.includes('@')) userData.em = sha256(email);
  if (ip) userData.client_ip_address = ip;
  if (ua) userData.client_user_agent = ua;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: eventSourceUrl,
    user_data: userData,
    custom_data: customData ?? {},
  };

  // Fan out to both pixels in parallel. Each pixel only fires if its
  // matching env-var token is configured. Both share the same event_id
  // so each pixel independently dedupes the browser hit (the layout fbq
  // is initialized on both pixels too, so each pixel sees one browser
  // event + one server event with the same id → one counted event).
  const targets: Array<{ pixel: string; token: string }> = [];
  if (TOKEN_PRIMARY) targets.push({ pixel: PIXEL_PRIMARY, token: TOKEN_PRIMARY });
  if (TOKEN_LEGACY) targets.push({ pixel: PIXEL_LEGACY, token: TOKEN_LEGACY });

  const results = await Promise.allSettled(
    targets.map(({ pixel, token }) =>
      fetch(
        `https://graph.facebook.com/${API_VERSION}/${pixel}/events?access_token=${encodeURIComponent(token)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [event] }),
        },
      ).then(async (res) => {
        if (!res.ok) {
          const errText = await res.text();
          console.error(`CAPI ${pixel} non-OK:`, res.status, errText.slice(0, 300));
          throw new Error(`pixel ${pixel} returned ${res.status}`);
        }
      }),
    ),
  );

  const failures = results.filter((r) => r.status === 'rejected').length;
  if (failures === results.length && results.length > 0) {
    return NextResponse.json({ ok: false, error: 'all pixels failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, pixels_sent: results.length - failures });
}
