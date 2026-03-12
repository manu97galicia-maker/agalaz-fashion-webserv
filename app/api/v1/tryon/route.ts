import { NextRequest, NextResponse } from 'next/server';
import { generateTryOnImage } from '@/services/geminiService';

export const maxDuration = 60;

// Public API endpoint for Shopify app and external integrations
// Authenticated via API secret in Authorization header
export async function POST(request: NextRequest) {
  try {
    // Verify API secret
    const authHeader = request.headers.get('authorization');
    const apiSecret = process.env.AGALAZ_API_SECRET;

    if (!apiSecret || authHeader !== `Bearer ${apiSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { faceImage, bodyImage, clothingImage } = body;

    if (!faceImage || !bodyImage) {
      return NextResponse.json(
        { error: 'Both faceImage and bodyImage are required (base64)' },
        { status: 400 }
      );
    }

    // Validate base64 size (max ~10MB per image)
    const maxSize = 10 * 1024 * 1024;
    if (faceImage.length > maxSize || bodyImage.length > maxSize) {
      return NextResponse.json(
        { error: 'Image too large (max 10 MB per image)' },
        { status: 400 }
      );
    }

    const result = await generateTryOnImage(
      faceImage,
      bodyImage,
      clothingImage || undefined,
    );

    if (result) {
      return NextResponse.json({ success: true, image: result });
    }

    return NextResponse.json(
      { error: 'Generation failed. Ensure photos are front-facing, full-body, and well-lit.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('V1 Try-On API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
