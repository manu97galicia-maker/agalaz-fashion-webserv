import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabaseAdmin';
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
        .upsert({ user_id: user.id, credits_remaining: 0, total_renders: 0, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
      rc = { credits_remaining: 0, total_renders: 0 };
    }

    if (rc.credits_remaining <= 0) {
      return NextResponse.json({ error: 'NO_CREDITS', message: 'No credits remaining. Subscribe or wait for reset.' }, { status: 403 });
    }

    const body = await request.json();
    // Single photo flow: userImage (or legacy faceImage+bodyImage)
    const userImage = body.userImage || body.faceImage;
    const { clothingImage, modificationPrompt, lastRenderedImage, category } = body;

    if (!userImage) {
      return NextResponse.json({ error: 'Please upload a photo before rendering.' }, { status: 400 });
    }

    // Validate base64 size (max ~10MB)
    const maxSize = 10 * 1024 * 1024;
    if (userImage.length > maxSize) {
      return NextResponse.json(
        { error: 'Your photo is too large (max 10 MB). Try using a lower resolution image.' },
        { status: 400 }
      );
    }

    const { image } = await generateTryOnImage(
      userImage,
      clothingImage || undefined,
      modificationPrompt,
      lastRenderedImage,
      undefined,
      undefined,
      undefined,
      category || undefined,
    );

    if (image) {
      await admin
        .from('render_counts')
        .update({
          credits_remaining: rc.credits_remaining - 1,
          total_renders: (rc.total_renders || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      return NextResponse.json({ image });
    }
    return NextResponse.json(
      { error: 'We couldn\'t generate your try-on. Please try again with a different photo — make sure the lighting is good and you\'re clearly visible.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Generate API error:', error);
    const message = error?.message || '';
    if (message.includes('too large') || message.includes('payload')) {
      return NextResponse.json({ error: 'Your photo is too large to process. Try using a smaller image (under 10 MB).' }, { status: 413 });
    }
    return NextResponse.json({ error: 'Something went wrong on our end. Please try again.' }, { status: 500 });
  }
}
