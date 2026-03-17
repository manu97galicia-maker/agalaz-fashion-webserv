import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { generateApiKey } from '@/lib/partners';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, store_name, store_url, allowed_domains } = body;

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

    // Generate API key
    const { raw, hash, prefix } = generateApiKey();

    // Build allowed domains list
    const domains: string[] = allowed_domains && Array.isArray(allowed_domains)
      ? allowed_domains
      : [storeDomain];

    // Ensure the store domain is always included
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

    // Create partner
    const { data: partner, error } = await admin
      .from('partners')
      .insert({
        email,
        store_name,
        store_url: store_url.startsWith('http') ? store_url : `https://${store_url}`,
        api_key_hash: hash,
        api_key_prefix: prefix,
        allowed_domains: domains,
        plan: 'starter',
        credits_remaining: 100,
        credits_monthly_limit: 100,
      })
      .select('id, store_name, api_key_prefix, allowed_domains, credits_remaining, plan')
      .single();

    if (error) {
      console.error('Partner creation error:', error);
      return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }

    // Return the raw API key — this is the ONLY time it's shown
    return NextResponse.json({
      success: true,
      partner: {
        id: partner.id,
        store_name: partner.store_name,
        plan: partner.plan,
        credits_remaining: partner.credits_remaining,
        allowed_domains: partner.allowed_domains,
      },
      api_key: raw,
      warning: 'Save this API key now — it cannot be retrieved again.',
      integration: {
        script_tag: `<script src="https://agalaz.com/widget.js" data-api-key="${raw}"></script>`,
        button_div: '<div id="agalaz-tryon"></div>',
        with_garment: `<div id="agalaz-tryon" data-garment="YOUR_PRODUCT_IMAGE_URL"></div>`,
      },
    });
  } catch (error: any) {
    console.error('Partner registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
