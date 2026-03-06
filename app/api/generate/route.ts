import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateTryOnImage } from '@/services/geminiService';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { FREE_RENDER_LIMIT } from '@/lib/subscription';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Auth + subscription check
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } },
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();
    let isPro = false;
    let currentRenders = 0;

    if (user) {
      const { data: sub } = await admin
        .from('subscriptions')
        .select('status')
        .eq('user_id', user.id)
        .single();
      isPro = sub?.status === 'active';

      if (!isPro) {
        const { data: rc } = await admin
          .from('render_counts')
          .select('total_renders')
          .eq('user_id', user.id)
          .single();
        currentRenders = rc?.total_renders || 0;

        if (currentRenders >= FREE_RENDER_LIMIT) {
          return NextResponse.json(
            { error: 'FREE_LIMIT_REACHED' },
            { status: 403 },
          );
        }
      }
    }

    const body = await request.json();
    const { faceImage, bodyImage, clothingImage, modificationPrompt, lastRenderedImage } = body;

    if (!faceImage || !bodyImage) {
      return NextResponse.json({ error: 'Faltan imágenes requeridas.' }, { status: 400 });
    }

    const result = await generateTryOnImage(
      faceImage,
      bodyImage,
      clothingImage,
      modificationPrompt,
      lastRenderedImage,
    );

    if (result.image) {
      // Increment render count server-side
      if (user) {
        await admin.from('render_counts').upsert(
          {
            user_id: user.id,
            total_renders: currentRenders + 1,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' },
        );
      }
      return NextResponse.json({ image: result.image });
    }

    return NextResponse.json(
      { error: result.error || 'Error de precisión. Intenta con fotos frontales.' },
      { status: 500 },
    );
  } catch (error: any) {
    console.error('Generate API error:', error);
    const msg = error?.message || String(error);
    let message: string;
    if (msg.includes('body') || msg.includes('too large') || msg.includes('payload')) {
      message = 'Imágenes demasiado grandes. Intenta con fotos más pequeñas.';
    } else if (msg.includes('JSON')) {
      message = 'Error procesando la solicitud. Intenta de nuevo.';
    } else {
      message = `Error del motor: ${msg.slice(0, 150)}`;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
