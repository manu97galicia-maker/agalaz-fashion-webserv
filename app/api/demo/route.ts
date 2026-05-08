import { NextRequest, NextResponse } from 'next/server';
import { generateTryOnImage } from '@/services/geminiService';

export const maxDuration = 60;

// Demo endpoint — no auth required, generates image for landing page previews.
//
// Cost-control strategy:
//   1. Hard cap of ONE successful generation per device (cookie-based).
//      A returning device with the cookie set gets 402 with `error: 'DEMO_USED'`
//      and is pushed to /paywall. Each Gemini call costs real money so we want
//      every visitor's free render to be their first AND only.
//   2. 30s per-IP rate limit on top, to slow burst-clicks within a single
//      session before the cookie persists.
//
// Bypassing the cookie (incognito / clearing cookies) gives the user another
// free render — accepted as the cost of not running a hard IP store. If abuse
// shows up in logs we can move the used-flag to Vercel KV.

const ipLastRequest = new Map<string, number>();
const RATE_LIMIT_MS = 30_000; // 1 request per 30 seconds per IP

const DEMO_USED_COOKIE = 'agalaz_demo_used';
const DEMO_USED_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function POST(request: NextRequest) {
  try {
    // Hard cap: device has already redeemed its free demo render.
    if (request.cookies.get(DEMO_USED_COOKIE)?.value === '1') {
      return NextResponse.json(
        {
          error: 'DEMO_USED',
          message: 'You\'ve used your free demo render. Sign up to keep generating.',
          redirect: '/paywall',
        },
        { status: 402 },
      );
    }

    // Basic IP rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const last = ipLastRequest.get(ip) || 0;
    if (now - last < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: 'Please wait before trying again.' },
        { status: 429 }
      );
    }
    ipLastRequest.set(ip, now);

    // Clean old entries periodically
    if (ipLastRequest.size > 10000) {
      const cutoff = now - RATE_LIMIT_MS * 2;
      for (const [k, v] of ipLastRequest) {
        if (v < cutoff) ipLastRequest.delete(k);
      }
    }

    const body = await request.json();
    const { userImage, clothingImage, category } = body;

    if (!userImage) {
      return NextResponse.json({ error: 'Photo required.' }, { status: 400 });
    }

    // Validate size
    if (userImage.length > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large (max 10 MB).' }, { status: 400 });
    }

    const { image } = await generateTryOnImage(
      userImage,
      clothingImage || undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      category || 'tattoo',
    );

    if (image) {
      // Mark this device as having used its one free render. httpOnly so the
      // browser can't accidentally drop it via JS; sameSite=lax so the cookie
      // is sent on the next demo POST from this domain.
      const response = NextResponse.json({ image });
      response.cookies.set(DEMO_USED_COOKIE, '1', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: DEMO_USED_MAX_AGE,
        path: '/',
      });
      return response;
    }

    return NextResponse.json(
      { error: 'Generation failed. Try a different photo.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Demo generate error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
