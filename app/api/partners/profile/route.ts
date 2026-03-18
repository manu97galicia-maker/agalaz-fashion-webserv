import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id');
  if (!userId) {
    return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: partner, error } = await admin
    .from('partners')
    .select('id, store_name, plan, setup_paid, is_active, credits_remaining, api_key_prefix, stripe_subscription_id, credits_monthly_limit')
    .eq('user_id', userId)
    .single();

  if (error || !partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }

  return NextResponse.json({
    partner: {
      id: partner.id,
      store_name: partner.store_name,
      plan: partner.plan,
      setup_paid: partner.setup_paid || false,
      is_active: partner.is_active,
      credits_remaining: partner.credits_remaining,
      api_key_prefix: partner.api_key_prefix,
      has_api_key: partner.is_active && partner.credits_remaining > 0,
      has_subscription: !!partner.stripe_subscription_id,
    },
  });
}
