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
// Authenticated via partner API key in Authorization header
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  try {
    // Extract API key from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing API key. Use Authorization: Bearer agz_live_...' },
        { status: 401, headers }
      );
    }

    const apiKey = authHeader.replace('Bearer ', '');

    // Validate API key + domain
    const requestOrigin = origin || request.headers.get('referer');
    const { valid, partner, error } = await validateApiKey(apiKey, requestOrigin);

    if (!valid || !partner) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401, headers });
    }

    const body = await request.json();
    let { faceImage, bodyImage, clothingImage, garmentUrl } = body;

    if (!faceImage || !bodyImage) {
      return NextResponse.json(
        { error: 'Both faceImage and bodyImage are required (base64)' },
        { status: 400, headers }
      );
    }

    // Clean base64: remove data URL prefix if present
    const cleanBase64 = (s: string) => s.replace(/^data:image\/[^;]+;base64,/, '');
    faceImage = cleanBase64(faceImage);
    bodyImage = cleanBase64(bodyImage);
    if (clothingImage) clothingImage = cleanBase64(clothingImage);

    // Validate base64 is not empty or corrupted
    if (faceImage.length < 100 || bodyImage.length < 100) {
      return NextResponse.json(
        { error: 'Images appear to be empty or corrupted. Please re-upload.' },
        { status: 400, headers }
      );
    }

    // Validate base64 size (max ~10MB per image)
    const maxSize = 10 * 1024 * 1024;
    if (faceImage.length > maxSize || bodyImage.length > maxSize) {
      return NextResponse.json(
        { error: 'Image too large (max 10 MB per image)' },
        { status: 400, headers }
      );
    }

    // If garmentUrl provided but no clothingImage, fetch it server-side (avoids CORS)
    let finalClothingImage = clothingImage;
    let garmentMimeType = 'image/jpeg';
    if (!finalClothingImage && garmentUrl) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const garmentRes = await fetch(garmentUrl, { redirect: 'follow', signal: controller.signal });
        clearTimeout(timeout);
        const contentType = garmentRes.headers.get('content-type') || '';
        console.log(`Garment fetch: status=${garmentRes.status}, type=${contentType}, url=${garmentUrl.substring(0, 100)}`);
        if (garmentRes.ok && contentType.startsWith('image/')) {
          const buffer = await garmentRes.arrayBuffer();
          finalClothingImage = Buffer.from(buffer).toString('base64');
          garmentMimeType = contentType.split(';')[0].trim();
          console.log(`Fetched garment: ${finalClothingImage.length} chars, type: ${garmentMimeType}`);
        } else {
          console.warn(`Garment URL returned non-image: ${contentType}, body: ${await garmentRes.text().catch(() => 'N/A')}`);
        }
      } catch (e: any) {
        console.warn('Failed to fetch garment URL:', e?.message);
      }
    }

    // Log details for debugging
    const debugInfo = {
      faceSize: faceImage.length,
      bodySize: bodyImage.length,
      garmentSize: finalClothingImage ? finalClothingImage.length : 0,
      garmentUrl: garmentUrl || 'none',
      garmentMime: garmentMimeType,
      faceStart: faceImage.substring(0, 30),
      bodyStart: bodyImage.substring(0, 30),
    };
    console.log('V1 TryOn debug:', JSON.stringify(debugInfo));

    // Validate base64 doesn't contain URL or other non-base64 content
    const isValidBase64 = (s: string) => /^[A-Za-z0-9+/=]+$/.test(s.substring(0, 100));
    if (!isValidBase64(faceImage) || !isValidBase64(bodyImage)) {
      console.error('Invalid base64 detected!', 'face valid:', isValidBase64(faceImage), 'body valid:', isValidBase64(bodyImage));
      return NextResponse.json(
        { error: 'Invalid image format. Please re-upload your photos.' },
        { status: 400, headers }
      );
    }

    const result = await generateTryOnImage(
      faceImage,
      bodyImage,
      finalClothingImage || undefined,
      undefined,
      undefined,
      garmentMimeType,
    );

    if (result) {
      // Deduct credit and log usage
      await deductPartnerCredit(partner.id, partner.credits_remaining, partner.total_renders);

      return NextResponse.json(
        { success: true, image: result, credits_remaining: partner.credits_remaining - 1 },
        { headers }
      );
    }

    return NextResponse.json(
      { error: 'Generation failed. Ensure photos are front-facing, full-body, and well-lit.', debug: debugInfo },
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
