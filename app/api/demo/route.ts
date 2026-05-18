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

      // IP check via Supabase — catches cookie-cleared / incognito retries.
      // (Incognito clears cookies but the network IP is the same as the
      // user's normal browser, so the SHA-256 of x-forwarded-for matches.)
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

      // ── Atomic lock via INSERT ───────────────────────────────────────────
      // Insert BEFORE calling Gemini so two concurrent renders from the same
      // IP can't both slip past the SELECT check above. The PRIMARY KEY of
      // anonymous_demo_log is (ip_hash, date) — that gives us the UNIQUE +
      // NOT NULL guarantee for free, so a second concurrent insert from the
      // same IP returns Postgres error 23505 (unique_violation) and we
      // surface 402 to the client.
      //
      // Note: a /sequential/ incognito retry from the same residential IP
      // gets blocked here (PK is the same). What this DOESN'T close is the
      // case where the user's network IP rotates between attempts (mobile
      // 4G/5G, VPN, CGNAT-with-rotation) — those produce a different
      // ip_hash and are treated as a new visitor. Closing that would need
      // browser-fingerprinting beyond IP, which we deliberately don't do.
      const { error: insertErr } = await admin
        .from('anonymous_demo_log')
        .insert({ ip_hash: ipHash, date: today, category: category ?? null });
      if (insertErr) {
        if (
          insertErr.code === '23505' ||
          (insertErr.message ?? '').toLowerCase().includes('duplicate')
        ) {
          return NextResponse.json(
            { error: 'NO_CREDITS', message: 'Daily free render already used. Continue with a pack.', redirect: '/paywall' },
            { status: 402 },
          );
        }
        // Other DB errors should not block the user — log and fall through.
        console.error('anonymous_demo_log insert non-conflict error:', insertErr);
      }

      // Generate.
      const { image } = await generateTryOnImage(
        userImage,
        clothingImage || undefined,
        undefined, undefined, undefined, undefined, undefined,
        category || 'tattoo',
      );

      if (!image) {
        // Release the lock so the user can retry today — the generate failed
        // (Gemini hiccup, safety block, etc.), no rendered image was returned,
        // and charging the user their one free shot would be wrong.
        await admin
          .from('anonymous_demo_log')
          .delete()
          .eq('ip_hash', ipHash)
          .eq('date', today);
        return NextResponse.json({ error: 'Generation failed. Try a different photo.' }, { status: 500 });
      }

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
