import { NextRequest, NextResponse } from 'next/server';
import { generateTryOnImage } from '@/services/geminiService';
import { validateApiKey, deductPartnerCredit } from '@/lib/partners';

export const maxDuration = 120;

// Detect actual image MIME type from base64 data (magic bytes)
// Returns null if the data is NOT an image (e.g. HTML, JSON, text)
function detectMimeType(base64: string): string | null {
  const header = base64.substring(0, 20);
  if (header.startsWith('/9j/')) return 'image/jpeg';
  if (header.startsWith('iVBOR')) return 'image/png';
  if (header.startsWith('UklGR')) return 'image/webp';
  if (header.startsWith('R0lG')) return 'image/gif';
  // Check for NON-image data (HTML, JSON, text, XML)
  if (header.startsWith('PCFET0NUWVB') || // <!DOCTYPE
      header.startsWith('PGh0bWw')      || // <html
      header.startsWith('eyJ')           || // { (JSON)
      header.startsWith('PD94bWw'))         // <?xml
    return null;
  return 'image/jpeg'; // fallback for unknown binary
}

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

    // Minimum quality check — images under 25KB base64 are too small for Gemini
    if (userImage.length < 25000) {
      console.warn(`User image too small: ${userImage.length} chars (~${Math.round(userImage.length * 0.75 / 1024)}KB). Gemini may reject it.`);
      return NextResponse.json(
        { error: 'Photo quality too low. Please upload a higher resolution photo (at least 500x500 pixels).', debug: { userSize: userImage.length } },
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

    // If no clothingImage base64, try to fetch from garmentUrl server-side
    let finalClothingImage = clothingImage;
    let garmentMimeType = 'image/jpeg';
    if (!finalClothingImage && garmentUrl) {
      console.log('No clothingImage base64, fetching garment from URL:', garmentUrl);

      // Try multiple fetch strategies
      const fetchHeaders: (Record<string, string> | undefined)[] = [
        // Strategy 1: Request ONLY JPEG/PNG (Gemini handles these best)
        {
          'Accept': 'image/jpeg,image/png,image/*;q=0.5',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
          'Referer': new URL(garmentUrl).origin + '/',
        },
        // Strategy 2: Minimal headers
        {
          'Accept': 'image/jpeg,image/png',
          'User-Agent': 'Mozilla/5.0 (compatible; Agalaz/1.0)',
        },
        // Strategy 3: No custom headers
        undefined,
      ];

      for (let i = 0; i < fetchHeaders.length; i++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          const garmentRes = await fetch(garmentUrl, {
            redirect: 'follow',
            signal: controller.signal,
            ...(fetchHeaders[i] ? { headers: fetchHeaders[i] } : {}),
          });
          clearTimeout(timeout);

          const contentType = garmentRes.headers.get('content-type') || '';
          console.log(`Garment fetch strategy ${i + 1}: status=${garmentRes.status}, type=${contentType}, size=${garmentRes.headers.get('content-length') || '?'}`);

          if (garmentRes.ok) {
            const buffer = await garmentRes.arrayBuffer();
            if (buffer.byteLength > 100) {
              const b64 = Buffer.from(buffer).toString('base64');
              // Detect ACTUAL format from bytes (don't trust Content-Type — SPAs return HTML!)
              const detectedMime = detectMimeType(b64);
              if (!detectedMime) {
                console.warn(`Strategy ${i + 1}: got non-image data (HTML/JSON/text), skipping`);
                continue; // try next strategy
              }
              finalClothingImage = b64;
              garmentMimeType = detectedMime;
              console.log(`Garment loaded via strategy ${i + 1}: ${Math.round(buffer.byteLength / 1024)}KB, detected: ${garmentMimeType}, header-type: ${contentType}`);
              break;
            }
          }
        } catch (e: any) {
          console.warn(`Garment fetch strategy ${i + 1} failed:`, e?.message?.substring(0, 100));
        }
      }
    }

    // CRITICAL: If no garment image available, fail instead of doing photo enhancement
    if (!finalClothingImage) {
      console.error('All garment loading failed. clothingImage provided:', !!clothingImage, 'garmentUrl:', garmentUrl || 'none');
      return NextResponse.json(
        {
          error: garmentUrl
            ? `Could not load garment image from: ${garmentUrl.substring(0, 100)}. The URL may return a web page instead of an image file. Try uploading the garment image directly.`
            : 'No garment image provided. Please upload a garment or provide a garment URL.',
          debug: { garmentUrl: garmentUrl || 'none', clothingImageProvided: !!clothingImage, userSize: userImage?.length || 0 },
        },
        { status: 400, headers }
      );
    }

    // Detect actual MIME types from bytes
    const userMimeType = detectMimeType(userImage) || 'image/jpeg';
    if (finalClothingImage && !garmentMimeType.startsWith('image/')) {
      garmentMimeType = detectMimeType(finalClothingImage) || 'image/jpeg';
    }

    const debugInfo = {
      userSize: userImage.length,
      userMime: userMimeType,
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
