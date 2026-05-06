import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { normalizeStoreDomain, normalizeEmail } from '@/lib/storeDomain';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, store_name, store_url, allowed_domains, plan } = body;
    const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken
      : typeof body.captchaToken === 'string' ? body.captchaToken
      : '';

    const remoteIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || null;
    const captcha = await verifyTurnstileToken(turnstileToken, remoteIp);
    if (!captcha.ok) {
      return NextResponse.json(
        { error: 'Captcha verification failed', code: 'CAPTCHA_FAILED', reason: captcha.reason },
        { status: 403 }
      );
    }
    // user_id is optional — the partners page allows registering without Google login.
    // When absent, mint a fresh UUID so the partners.user_id column stays unique.
    const user_id: string = body.user_id || randomUUID();

    if (!email || !store_name || !store_url) {
      return NextResponse.json(
        { error: 'email, store_name, and store_url are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Parse + normalise the store URL → canonical lowercase domain (no www., no path).
    // We persist the NORMALISED form so subsequent queries on `allowed_domains`
    // (used by the anti-abuse checks below + by the API-key validation flow)
    // get a deterministic match.
    const normalizedDomain = normalizeStoreDomain(store_url);
    if (!normalizedDomain) {
      return NextResponse.json({ error: 'Invalid store_url' }, { status: 400 });
    }

    // Build allowed domains list — always include the normalised domain.
    const domains: string[] = allowed_domains && Array.isArray(allowed_domains)
      ? allowed_domains.map((d) => normalizeStoreDomain(d)).filter(Boolean)
      : [];

    if (!domains.includes(normalizedDomain)) {
      domains.push(normalizedDomain);
    }

    const admin = createAdminClient();

    // Check if user already has a partner account
    const { data: existing } = await admin
      .from('partners')
      .select('id')
      .eq('user_id', user_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'A partner account already exists with this email' },
        { status: 409 }
      );
    }

    // ── Anti-abuse #1: one trial per store ───────────────────────────────────
    // Block if ANY partner — regardless of which email — already registered
    // this exact store domain. Prevents creating multiple emails to claim
    // multiple free trials for the same shop. `normalizedDomain` was computed
    // earlier when we built the allowed_domains list.
    {
      const { data: domainHit } = await admin
        .from('partners')
        .select('id, email, plan, stripe_subscription_id')
        .contains('allowed_domains', [normalizedDomain])
        .limit(1)
        .maybeSingle();

      if (domainHit) {
        return NextResponse.json(
          {
            error: 'A partner account already exists for this store. Log in to that account or contact support.',
            code: 'STORE_ALREADY_REGISTERED',
          },
          { status: 409 }
        );
      }
    }

    // ── Anti-abuse #2: email aliases collapse to one identity ────────────────
    // Gmail "+alias" / dots and other-provider "+alias" all map to the same
    // canonical email. Block if anyone already registered with that identity.
    const normalizedEmail = normalizeEmail(email);
    if (normalizedEmail && normalizedEmail !== email.toLowerCase()) {
      const { data: emailHits } = await admin
        .from('partners')
        .select('id, email')
        .ilike('email', `%@${normalizedEmail.split('@')[1]}`);

      const matchedAlias = emailHits?.find((p) => normalizeEmail(p.email) === normalizedEmail);
      if (matchedAlias) {
        return NextResponse.json(
          {
            error: 'A partner account already exists with a similar email address.',
            code: 'EMAIL_ALIAS_ALREADY_REGISTERED',
          },
          { status: 409 }
        );
      }
    }

    // Create partner — all plans require Stripe checkout (card on file) before activation.
    // 'trial' → 7-day free trial, auto-converts to starter (150€/mo, 200 renders/mo) on day 7.
    const selectedPlan = plan === 'growth' ? 'growth' : plan === 'starter' ? 'starter' : 'trial';
    const { data: partner, error } = await admin
      .from('partners')
      .insert({
        user_id: user_id,
        email,
        store_name,
        store_url: store_url.startsWith('http') ? store_url : `https://${store_url}`,
        api_key_hash: `pending-${user_id}`,
        api_key_prefix: 'pending',
        allowed_domains: domains,
        plan: selectedPlan,
        price_eur: selectedPlan === 'growth' ? 499 : 150,  // trial converts to starter pricing
        setup_fee_eur: 0,  // setup fees removed platform-wide
        credits_remaining: 0,
        credits_monthly_limit: selectedPlan === 'growth' ? 1000 : 200,  // trial/starter both 200 post-conversion
        is_active: false,  // activated only after Stripe checkout completes (webhook)
        setup_paid: true,  // legacy column kept true for backwards compat
      })
      .select('id, store_name, plan')
      .single();

    if (error) {
      console.error('Partner creation error:', error);
      return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      partner: {
        id: partner.id,
        store_name: partner.store_name,
        plan: partner.plan,
      },
      next_step: 'stripe_checkout',
    });
  } catch (error: any) {
    console.error('Partner registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
