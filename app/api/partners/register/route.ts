import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, email, store_name, store_url, allowed_domains, plan } = body;

    if (!user_id || !email || !store_name || !store_url) {
      return NextResponse.json(
        { error: 'user_id, email, store_name, and store_url are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Parse store_url to extract domain for allowed_domains
    let storeDomain: string;
    try {
      storeDomain = new URL(store_url.startsWith('http') ? store_url : `https://${store_url}`).hostname;
    } catch {
      return NextResponse.json({ error: 'Invalid store_url' }, { status: 400 });
    }

    // Build allowed domains list
    const domains: string[] = allowed_domains && Array.isArray(allowed_domains)
      ? allowed_domains
      : [storeDomain];

    if (!domains.includes(storeDomain)) {
      domains.push(storeDomain);
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
        api_key_hash: 'pending',
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
