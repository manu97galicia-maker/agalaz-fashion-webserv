import { NextRequest, NextResponse } from 'next/server';
import { generateTryOnImage } from '@/services/geminiService';

export const maxDuration = 60;

// Demo endpoint — no auth required, generates image for landing page previews.
// The client applies a watermark overlay; this endpoint is rate-limited by IP.

const ipLastRequest = new Map<string, number>();
const RATE_LIMIT_MS = 30_000; // 1 request per 30 seconds per IP

export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json({ image });
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
