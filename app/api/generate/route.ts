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
      // New user — 0 credits until they activate a trial/subscription
      await admin
        .from('render_counts')
        .upsert({ user_id: user.id, credits_remaining: 0, total_renders: 0, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
      rc = { credits_remaining: 0, total_renders: 0 };
    }

    if (rc.credits_remaining <= 0) {
      return NextResponse.json({ error: 'NO_CREDITS', message: 'No credits remaining. Subscribe or wait for reset.' }, { status: 403 });
    }

    const body = await request.json();
    const { faceImage, bodyImage, clothingImage, modificationPrompt, lastRenderedImage } = body;

    if (!faceImage || !bodyImage) {
      return NextResponse.json({ error: 'You need to upload both a face photo and a full-body photo before rendering. Tap the upload boxes above to add them.' }, { status: 400 });
    }

    // Validate base64 size (max ~10MB per image)
    const maxSize = 10 * 1024 * 1024;
    if (faceImage.length > maxSize || bodyImage.length > maxSize) {
      return NextResponse.json(
        { error: 'Your photo is too large (max 10 MB). Try taking a new photo or using a lower resolution image.' },
        { status: 400 }
      );
    }

    const { image } = await generateTryOnImage(
      faceImage,
      bodyImage,
      clothingImage || undefined,
      modificationPrompt,
      lastRenderedImage
    );

    if (image) {
      // Deduct 1 credit and increment total_renders
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
      { error: 'We couldn\'t generate your try-on. This usually happens when:\n\n• The body photo doesn\'t show your full body (head to feet)\n• The photo is taken from the side instead of the front\n• The lighting is too dark or blurry\n\nTip: Use a well-lit, front-facing full-body photo for the best results.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Generate API error:', error);
    const message = error?.message || '';
    if (message.includes('too large') || message.includes('payload')) {
      return NextResponse.json({ error: 'Your photos are too large to process. Try using smaller or lower-resolution images (under 10 MB each).' }, { status: 413 });
    }
    return NextResponse.json({ error: 'Something went wrong on our end. Please try again — if it keeps failing, try different photos.' }, { status: 500 });
  }
}
