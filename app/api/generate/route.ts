import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateTryOnImage } from '@/services/geminiService';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { FREE_CREDITS, PLAN_CREDITS, CREDITS_RESET_DAYS } from '@/lib/subscription';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Auth + credit check
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } },
    );
    const { data: { user } } = await supabase.auth.getUser();

    const admin = createAdminClient();
    let creditsRemaining = 0;

    if (user) {
      const { data: sub } = await admin
        .from('subscriptions')
        .select('status')
        .eq('user_id', user.id)
        .single();
      const isPro = sub?.status === 'active';

      // Get or create credits
      let { data: rc } = await admin
        .from('render_counts')
        .select('credits_remaining, credits_reset_at')
        .eq('user_id', user.id)
        .single();

      if (!rc) {
        await admin.from('render_counts').upsert(
          { user_id: user.id, credits_remaining: FREE_CREDITS, total_renders: 0, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' },
        );
        rc = { credits_remaining: FREE_CREDITS, credits_reset_at: null };
      }

      creditsRemaining = rc.credits_remaining ?? 0;

      // Lazy reset for Pro users
      if (isPro && rc.credits_reset_at && new Date(rc.credits_reset_at) <= new Date()) {
        const nextReset = new Date();
        nextReset.setDate(nextReset.getDate() + CREDITS_RESET_DAYS);
        creditsRemaining = PLAN_CREDITS;
        await admin.from('render_counts').update({
          credits_remaining: creditsRemaining,
          credits_reset_at: nextReset.toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('user_id', user.id);
      }

      if (creditsRemaining <= 0) {
        return NextResponse.json({ error: 'NO_CREDITS' }, { status: 403 });
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
      // Decrement credits
      if (user) {
        const newCredits = Math.max(0, creditsRemaining - 1);
        const { data: currentRc } = await admin
          .from('render_counts')
          .select('total_renders')
          .eq('user_id', user.id)
          .single();
        await admin.from('render_counts').update({
          credits_remaining: newCredits,
          total_renders: (currentRc?.total_renders || 0) + 1,
          updated_at: new Date().toISOString(),
        }).eq('user_id', user.id);
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
