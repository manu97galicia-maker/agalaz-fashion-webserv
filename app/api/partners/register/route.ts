import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { generateApiKey } from '@/lib/partners';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, store_name, store_url, allowed_domains, plan } = body;

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

    // Parse store_url to extract domain for allowed_domains
    let storeDomain: string;
    try {
      storeDomain = new URL(store_url.startsWith('http') ? store_url : `https://${store_url}`).hostname;
    } catch {
      return NextResponse.json({ error: 'Invalid store_url' }, { status: 400 });
    }

    // Generate API key (stored hashed, raw shown only after setup payment)
    const { raw, hash, prefix } = generateApiKey();

    // Build allowed domains list
    const domains: string[] = allowed_domains && Array.isArray(allowed_domains)
      ? allowed_domains
      : [storeDomain];

    if (!domains.includes(storeDomain)) {
      domains.push(storeDomain);
    }

    const admin = createAdminClient();

    // Check if email already registered
    const { data: existing } = await admin
      .from('partners')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'A partner account already exists with this email' },
        { status: 409 }
      );
    }

    // Create partner — INACTIVE until setup fee is paid
    const selectedPlan = plan === 'growth' ? 'growth' : 'starter';
    const { data: partner, error } = await admin
      .from('partners')
      .insert({
        email,
        store_name,
        store_url: store_url.startsWith('http') ? store_url : `https://${store_url}`,
        api_key_hash: hash,
        api_key_prefix: prefix,
        allowed_domains: domains,
        plan: selectedPlan,
        price_eur: selectedPlan === 'growth' ? 499 : 150,
        setup_fee_eur: selectedPlan === 'growth' ? 499 : 250,
        credits_remaining: 0,      // No credits until setup is paid
        credits_monthly_limit: selectedPlan === 'growth' ? 1000 : 200,
        is_active: false,           // Inactive until setup fee paid
      })
      .select('id, store_name, plan')
      .single();

    if (error) {
      console.error('Partner creation error:', error);
      return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }

    // Return partner ID + raw API key (frontend stores it temporarily until setup is paid)
    return NextResponse.json({
      success: true,
      partner: {
        id: partner.id,
        store_name: partner.store_name,
        plan: partner.plan,
      },
      api_key: raw,
      next_step: 'setup_payment',
    });
  } catch (error: any) {
    console.error('Partner registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
