import { NextRequest, NextResponse } from 'next/server';
import { generateTryOnImage } from '@/services/geminiService';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { faceImage, bodyImage, clothingImage, modificationPrompt, lastRenderedImage } = body;

    if (!faceImage || !bodyImage || !clothingImage) {
      return NextResponse.json({ error: 'Faltan imágenes requeridas.' }, { status: 400 });
    }

    const result = await generateTryOnImage(
      faceImage,
      bodyImage,
      clothingImage,
      modificationPrompt,
      lastRenderedImage
    );

    if (result.image) {
      return NextResponse.json({ image: result.image });
    }
    return NextResponse.json(
      { error: result.error || 'Error de precisión. Intenta con fotos frontales.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Generate API error:', error);
    const message = error?.message?.includes('body')
      ? 'Imágenes demasiado grandes. Intenta con fotos más pequeñas.'
      : 'Falla en el motor de componentes.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
