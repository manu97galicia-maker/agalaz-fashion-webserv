import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { generateTryOnImage } from '@/services/geminiService';

export const maxDuration = 60;

// Landing-page demo render endpoint.
//
// Auth + cost model (changed 2026-05-10):
//   - Login required (Google or OTP). 401 sends the client to a login modal.
//   - Each authenticated user gets exactly ONE free render per calendar day.
//     Non-cumulative — unused freebies don't roll over to tomorrow.
//   - If today's freebie is spent, fall back to render_counts.credits_remaining
//     (the paid pool topped up by Stripe purchases). When that is also 0,
//     return 402 → client redirects to /paywall.
//
// We removed the cookie-based 1-render anonymous demo: every Gemini call now
// runs against an authenticated user, which makes abuse cheap to track in
// render_counts and gives us a real signup signal for every demo run.

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
      return NextResponse.json(
        { error: 'NOT_AUTHENTICATED', message: 'Sign in to generate your free render.' },
        { status: 401 },
      );
    }

    // Captcha disabled for now — login (Google or OTP) + 1 render/day per
    // user_id already gives us an account-level limit. Keeping the bot wall
    // loose until we see real abuse in logs; can re-introduce Turnstile by
    // restoring the verification block from git history.

    const admin = createAdminClient();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC

    // Read or lazily create the user's render_counts row.
    let { data: rc } = await admin
      .from('render_counts')
      .select('credits_remaining, total_renders, last_free_render_date')
      .eq('user_id', user.id)
      .single();

    if (!rc) {
      await admin
        .from('render_counts')
        .upsert(
          {
            user_id: user.id,
            credits_remaining: 0,
            total_renders: 0,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' },
        );
      rc = { credits_remaining: 0, total_renders: 0, last_free_render_date: null };
    }

    const lastFree = rc.last_free_render_date ? String(rc.last_free_render_date).slice(0, 10) : null;
    const hasDailyFree = lastFree !== today;
    const hasPaidCredit = (rc.credits_remaining ?? 0) > 0;

    if (!hasDailyFree && !hasPaidCredit) {
      return NextResponse.json(
        {
          error: 'NO_CREDITS',
          message: 'You\'ve already used today\'s free render. Buy a pack for unlimited HD renders.',
          redirect: '/paywall',
        },
        { status: 402 },
      );
    }

    // Validate input.
    const body = await request.json();
    const { userImage, clothingImage, category } = body;
    if (!userImage) {
      return NextResponse.json({ error: 'Photo required.' }, { status: 400 });
    }
    if (userImage.length > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large (max 10 MB).' }, { status: 400 });
    }

    // Generate.
    const { image } = await generateTryOnImage(
      userImage,
      clothingImage || undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      category || 'tattoo',
    );

    if (!image) {
      return NextResponse.json(
        { error: 'Generation failed. Try a different photo.' },
        { status: 500 },
      );
    }

    // Charge: prefer the daily freebie before touching paid credits.
    if (hasDailyFree) {
      await admin
        .from('render_counts')
        .update({
          last_free_render_date: today,
          total_renders: (rc.total_renders ?? 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } else {
      await admin
        .from('render_counts')
        .update({
          credits_remaining: (rc.credits_remaining ?? 0) - 1,
          total_renders: (rc.total_renders ?? 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    }

    return NextResponse.json({
      image,
      source: hasDailyFree ? 'daily_free' : 'paid',
    });
  } catch (error: any) {
    console.error('Demo generate error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
