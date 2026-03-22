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

    // Create partner — for trial: active immediately, no setup fee
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
        price_eur: selectedPlan === 'growth' ? 499 : selectedPlan === 'starter' ? 150 : 0,
        setup_fee_eur: 0,  // No setup fee
        credits_remaining: 0,
        credits_monthly_limit: selectedPlan === 'growth' ? 1000 : selectedPlan === 'starter' ? 200 : 5,
        is_active: selectedPlan === 'trial',  // Trial is active immediately
        setup_paid: true,  // No setup fee needed
      })
      .select('id, store_name, plan')
      .single();

    if (error) {
      console.error('Partner creation error:', error);
      return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }

    // Return partner ID — no API key yet (generated after setup payment)
    return NextResponse.json({
      success: true,
      partner: {
        id: partner.id,
        store_name: partner.store_name,
        plan: partner.plan,
      },
      next_step: 'setup_payment',
    });
  } catch (error: any) {
    console.error('Partner registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
