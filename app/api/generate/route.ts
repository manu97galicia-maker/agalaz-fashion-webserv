import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { FREE_CREDITS } from '@/lib/subscription';
import { generateTryOnImage } from '@/services/geminiService';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } },
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const admin = createAdminClient();

    // Check credits
    let { data: rc } = await admin
      .from('render_counts')
      .select('credits_remaining, total_renders')
      .eq('user_id', user.id)
      .single();

    if (!rc) {
      await admin
        .from('render_counts')
        .upsert({ user_id: user.id, credits_remaining: FREE_CREDITS, total_renders: 0, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
      rc = { credits_remaining: FREE_CREDITS, total_renders: 0 };
    }

    if (rc.credits_remaining <= 0) {
      return NextResponse.json({ error: 'NO_CREDITS', message: 'No credits remaining. Subscribe or wait for reset.' }, { status: 403 });
    }

    const body = await request.json();
    const { faceImage, bodyImage, clothingImage, modificationPrompt, lastRenderedImage } = body;

    if (!faceImage || !bodyImage) {
      return NextResponse.json({ error: 'Face and body photos are required.' }, { status: 400 });
    }

    // Validate base64 size (max ~10MB per image)
    const maxSize = 10 * 1024 * 1024;
    if (faceImage.length > maxSize || bodyImage.length > maxSize) {
      return NextResponse.json(
        { error: 'Image too large. Please use a smaller photo.' },
        { status: 400 }
      );
    }

    const result = await generateTryOnImage(
      faceImage,
      bodyImage,
      clothingImage || undefined,
      modificationPrompt,
      lastRenderedImage
    );

    if (result) {
      // Deduct 1 credit and increment total_renders
      await admin
        .from('render_counts')
        .update({
          credits_remaining: rc.credits_remaining - 1,
          total_renders: (rc.total_renders || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      return NextResponse.json({ image: result });
    }
    return NextResponse.json(
      { error: 'Could not generate image. Make sure your body photo shows full body from head to feet, and use frontal photos for best results.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Generate API error:', error);
    const message = error?.message || '';
    if (message.includes('too large') || message.includes('payload')) {
      return NextResponse.json({ error: 'Images too large. Try smaller photos.' }, { status: 413 });
    }
    return NextResponse.json({ error: 'Component engine failure. Please try again.' }, { status: 500 });
  }
}
