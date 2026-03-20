import { NextRequest, NextResponse } from 'next/server';
import { generateTryOnImage } from '@/services/geminiService';
import { validateApiKey, deductPartnerCredit } from '@/lib/partners';

export const maxDuration = 120;

// CORS headers for cross-origin widget/iframe requests
function corsHeaders(origin?: string | null) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

// Public B2B API endpoint for external integrations
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing API key. Use Authorization: Bearer agz_live_...' },
        { status: 401, headers }
      );
    }

    const apiKey = authHeader.replace('Bearer ', '');
    const requestOrigin = origin || request.headers.get('referer');
    const { valid, partner, error } = await validateApiKey(apiKey, requestOrigin);

    if (!valid || !partner) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401, headers });
    }

    const body = await request.json();
    // Single photo flow: userImage (or legacy faceImage)
    let userImage = body.userImage || body.faceImage;
    let { clothingImage, garmentUrl, currentSize, previewSize } = body;

    if (!userImage) {
      return NextResponse.json(
        { error: 'userImage is required (base64)' },
        { status: 400, headers }
      );
    }

    // Clean base64
    const cleanBase64 = (s: string) => s.replace(/^data:image\/[^;]+;base64,/, '');
    userImage = cleanBase64(userImage);
    if (clothingImage) clothingImage = cleanBase64(clothingImage);

    if (userImage.length < 100) {
      return NextResponse.json(
        { error: 'Image appears to be empty or corrupted. Please re-upload.' },
        { status: 400, headers }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (userImage.length > maxSize) {
      return NextResponse.json(
        { error: 'Image too large (max 10 MB)' },
        { status: 400, headers }
      );
    }

    // If garmentUrl provided but no clothingImage, fetch server-side
    let finalClothingImage = clothingImage;
    let garmentMimeType = 'image/jpeg';
    if (!finalClothingImage && garmentUrl) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        const garmentRes = await fetch(garmentUrl, {
          redirect: 'follow',
          signal: controller.signal,
          headers: {
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            'Referer': garmentUrl,
          },
        });
        clearTimeout(timeout);
        const contentType = garmentRes.headers.get('content-type') || '';
        if (garmentRes.ok && contentType.startsWith('image/')) {
          const buffer = await garmentRes.arrayBuffer();
          finalClothingImage = Buffer.from(buffer).toString('base64');
          garmentMimeType = contentType.split(';')[0].trim();
        } else {
          console.warn(`Garment URL fetch failed: status=${garmentRes.status}, type=${contentType}`);
        }
      } catch (e: any) {
        console.warn('Failed to fetch garment URL:', e?.message);
      }
    }

    // CRITICAL: If no garment image available, fail instead of doing photo enhancement
    if (!finalClothingImage) {
      return NextResponse.json(
        { error: 'Could not load the garment image. Please check the garment URL or upload the image directly.', debug: { garmentUrl: garmentUrl || 'none', clothingImageProvided: !!clothingImage } },
        { status: 400, headers }
      );
    }

    const debugInfo = {
      userSize: userImage.length,
      garmentSize: finalClothingImage ? finalClothingImage.length : 0,
      garmentUrl: garmentUrl || 'none',
      garmentMime: garmentMimeType,
    };
    console.log('V1 TryOn debug:', JSON.stringify(debugInfo));

    const { image, failReason } = await generateTryOnImage(
      userImage,
      finalClothingImage || undefined,
      undefined,
      undefined,
      garmentMimeType,
      currentSize || undefined,
      previewSize || undefined,
    );

    if (image) {
      await deductPartnerCredit(partner.id, partner.credits_remaining, partner.total_renders);
      return NextResponse.json(
        { success: true, image, credits_remaining: partner.credits_remaining - 1 },
        { headers }
      );
    }

    return NextResponse.json(
      { error: 'Generation failed. Please try again with a clear photo.', debug: { ...debugInfo, geminiReason: failReason } },
      { status: 500, headers }
    );
  } catch (error: any) {
    console.error('V1 Try-On API error:', error?.message?.substring(0, 500));
    return NextResponse.json(
      { error: 'Internal server error', reason: error?.message?.substring(0, 200) },
      { status: 500, headers }
    );
  }
}
