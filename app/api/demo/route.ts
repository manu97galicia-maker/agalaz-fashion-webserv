import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { generateTryOnImage } from '@/services/geminiService';

export const maxDuration = 60;

// Landing-page demo render endpoint.
//
// Auth + cost model (changed 2026-05-15 — frictionless paywall):
//   - Anonymous users get ONE free render per IP per UTC day. Tracked in
//     anonymous_demo_log (hashed IP + date) and a same-day cookie. The cookie
//     catches incognito-window IP reuse; the hashed IP catches cookie-cleared
//     retries. Together: hard to bypass without a real VPN.
//   - Authenticated users: ONE free render per calendar day + paid credits.
//   - When both anonymous and authenticated quotas are spent → 402 paywall.
//
// Email is captured at Stripe checkout (allow_promotion_codes), not before
// the first render — which removes friction from the most expensive step
// (free → first value).

function hashIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for') ?? '';
  const ip = fwd.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const salt = process.env.ANON_IP_HASH_SALT || 'agalaz-anon-salt-v1';
  return createHash('sha256').update(ip + salt).digest('hex').slice(0, 32);
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } },
    );

    const { data: { user } } = await supabase.auth.getUser();
    const admin = createAdminClient();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC

    // ─── ANONYMOUS FLOW ─────────────────────────────────────────────────────
    if (!user) {
      const ipHash = hashIp(request);
      const cookieDate = cookieStore.get('agalaz_anon_demo')?.value;

      // Cookie check first — cheaper than a DB roundtrip.
      if (cookieDate === today) {
        return NextResponse.json(
          { error: 'NO_CREDITS', message: 'Daily free render already used. Continue with a pack.', redirect: '/paywall' },
          { status: 402 },
        );
      }

      // IP check via Supabase — catches cookie-cleared retries.
      const { data: existingAnon } = await admin
        .from('anonymous_demo_log')
        .select('ip_hash')
        .eq('ip_hash', ipHash)
        .eq('date', today)
        .maybeSingle();
      if (existingAnon) {
        return NextResponse.json(
          { error: 'NO_CREDITS', message: 'Daily free render already used. Continue with a pack.', redirect: '/paywall' },
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
        undefined, undefined, undefined, undefined, undefined,
        category || 'tattoo',
      );

      if (!image) {
        return NextResponse.json({ error: 'Generation failed. Try a different photo.' }, { status: 500 });
      }

      // Log + set cookie BEFORE returning so abuse retries hit the limit.
      await admin
        .from('anonymous_demo_log')
        .insert({ ip_hash: ipHash, date: today, category: category ?? null });

      const res = NextResponse.json({ image, source: 'anonymous_free' });
      res.cookies.set('agalaz_anon_demo', today, {
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
        httpOnly: false, // readable client-side too, makes the UI gate honest
      });
      return res;
    }

    // ─── AUTHENTICATED FLOW (unchanged) ─────────────────────────────────────

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
