import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ isPro: false, plan: null, totalRenders: 0, periodEnd: null });
    }

    const admin = createAdminClient();

    const { data: sub } = await admin
      .from('subscriptions')
      .select('status, plan, current_period_end')
      .eq('user_id', user.id)
      .single();

    const isPro = sub?.status === 'active';

    const { data: renderData } = await admin
      .from('render_counts')
      .select('total_renders')
      .eq('user_id', user.id)
      .single();

    return NextResponse.json({
      isPro,
      plan: sub?.plan || null,
      totalRenders: renderData?.total_renders || 0,
      periodEnd: sub?.current_period_end || null,
    });
  } catch (error) {
    console.error('Subscription check error:', error);
    return NextResponse.json({ isPro: false, plan: null, totalRenders: 0, periodEnd: null });
  }
}
