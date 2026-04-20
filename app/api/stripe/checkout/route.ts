import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key);
}

// B2C credit-pack plans. Both are one-time payments; credits accumulate in render_counts.
// - test:    $0.99 for  2 renders (intro)
// - popular: $4.99 for 12 renders (featured)
// Legacy keys (weekly/yearly/credits20) kept so existing subscribers and old checkout links
// keep working; new funnel uses test/popular exclusively.
const PACK_CREDITS: Record<string, number> = {
  test: 2,
  popular: 12,
  credits20: 20,  // legacy, still usable via ?plan=credits20
};

function getPrices(): Record<string, string> {
  return {
    test: (process.env.STRIPE_PRICE_TEST || 'price_1TODF4DaiRATnL32LzqWxgInw').trim(),
    popular: (process.env.STRIPE_PRICE_POPULAR || 'price_1TODK9DaiRATnL32LPDQOzTi').trim(),
    weekly: (process.env.STRIPE_PRICE_WEEKLY || '').trim(),
    yearly: (process.env.STRIPE_PRICE_YEARLY || '').trim(),
    credits20: (process.env.STRIPE_PRICE_CREDITS_20 || '').trim(),
  };
}

export async function POST(req: NextRequest) {
  try {
    const { plan, email, userId, skipTrial, quantity, fromCategory } = await req.json();

    // Map landing page category to try-on category param
    const categoryMap: Record<string, string> = {
      tattoo: 'tattoo',
      swimwear: 'clothing',
      earring: 'jewelry',
    };
    const tryOnCategory = fromCategory && categoryMap[fromCategory] ? `&category=${categoryMap[fromCategory]}` : '';

    const PRICES = getPrices();
    if (!plan || !PRICES[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    if (!email || !userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const origin = req.headers.get('origin') || 'https://agalaz.com';

    const cookieStore = await cookies();
    const datafastVisitorId = cookieStore.get('datafast_visitor_id')?.value;
    const datafastSessionId = cookieStore.get('datafast_session_id')?.value;

    const stripe = getStripe();

    // Credit packs — one-time payments (test / popular / legacy credits20)
    if (PACK_CREDITS[plan] !== undefined) {
      const qty = plan === 'credits20'
        ? Math.max(1, Math.min(10, parseInt(quantity) || 1))
        : 1;
      const totalCredits = PACK_CREDITS[plan] * qty;
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{ price: PRICES[plan], quantity: qty }],
        success_url: `${origin}/try-on?credits_purchased=${totalCredits}${tryOnCategory}`,
        cancel_url: `${origin}/paywall`,
        customer_email: email,
        client_reference_id: userId,
        metadata: {
          type: 'credit_pack',
          credits: String(totalCredits),
          plan,
          datafast_visitor_id: datafastVisitorId || '',
          datafast_session_id: datafastSessionId || '',
        },
      });
      return NextResponse.json({ url: session.url });
    }

    // Legacy subscription plans (weekly/yearly) — kept for existing subscribers, not featured.
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICES[plan],
          quantity: 1,
        },
      ],
      success_url: `${origin}/try-on?subscribed=true${tryOnCategory}`,
      cancel_url: `${origin}/paywall`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_email: email,
      client_reference_id: userId,
      ...(plan === 'yearly' && !skipTrial ? { subscription_data: { trial_period_days: 1 } } : {}),
      metadata: {
        datafast_visitor_id: datafastVisitorId || '',
        datafast_session_id: datafastSessionId || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error?.type, error?.message, error?.code);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
