import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabaseAdmin';

const SELECT = 'id, store_name, plan, setup_paid, is_active, credits_remaining, api_key_prefix, stripe_subscription_id, credits_monthly_limit, user_id, email';

function shape(partner: any) {
  return {
    id: partner.id,
    store_name: partner.store_name,
    plan: partner.plan,
    setup_paid: partner.setup_paid || false,
    is_active: partner.is_active,
    credits_remaining: partner.credits_remaining,
    api_key_prefix: partner.api_key_prefix,
    has_api_key: partner.is_active && partner.credits_remaining > 0,
    has_subscription: !!partner.stripe_subscription_id,
  };
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id');
  const partnerId = req.nextUrl.searchParams.get('partner_id');
  if (!userId && !partnerId) {
    return NextResponse.json({ error: 'user_id or partner_id is required' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Primary lookup: by partner_id (post-Stripe redirect) or by user_id (logged-in user).
  let { data: partner } = await (partnerId
    ? admin.from('partners').select(SELECT).eq('id', partnerId).maybeSingle()
    : admin.from('partners').select(SELECT).eq('user_id', userId!).maybeSingle());

  // Legacy fallback: registrations from before email verification often have
  // user_id = null. If the lookup missed, try matching the session-verified email
  // against partner.email — and claim the row by writing user_id on first hit.
  if (!partner && userId) {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll: () => cookieStore.getAll() } },
      );
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const { data: byEmail } = await admin
          .from('partners')
          .select(SELECT)
          .ilike('email', user.email)
          .maybeSingle();
        if (byEmail && !byEmail.user_id) {
          await admin
            .from('partners')
            .update({ user_id: user.id, updated_at: new Date().toISOString() })
            .eq('id', byEmail.id);
          partner = { ...byEmail, user_id: user.id };
        }
      }
    } catch {
      // Session unavailable — fall through to 404
    }
  }

  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }

  return NextResponse.json({ partner: shape(partner) });
}
