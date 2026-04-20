import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key);
}

// Monthly subscription Price IDs
const MONTHLY_PRICES: Record<string, string> = {
  starter: process.env.STRIPE_PARTNER_STARTER_MONTHLY || 'price_1TC3tYDkbUkdbQ5UgsAJHl60',
  growth: process.env.STRIPE_PARTNER_GROWTH_MONTHLY || 'price_1TC3w0DkbUkdbQ5UgBabrJ6F',
};

const TRIAL_DAYS = 7;

export async function POST(req: NextRequest) {
  try {
    const { plan, partnerId, email } = await req.json();

    if (!partnerId || !email) {
      return NextResponse.json({ error: 'partnerId and email are required' }, { status: 400 });
    }

    // Resolve Stripe price + trial flag
    // - plan='trial'   → starter price with 7-day free trial
    // - plan='starter' → starter price, charged immediately
    // - plan='growth'  → growth price, charged immediately
    let priceId: string;
    let trialDays = 0;
    if (plan === 'trial') {
      priceId = MONTHLY_PRICES.starter;
      trialDays = TRIAL_DAYS;
    } else if (plan === 'starter' || plan === 'growth') {
      priceId = MONTHLY_PRICES[plan];
    } else {
      return NextResponse.json({ error: 'Invalid plan. Use "trial", "starter" or "growth"' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'https://agalaz.com';
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/partners?subscribed=true&partner_id=${partnerId}`,
      cancel_url: `${origin}/partners?cancelled=true`,
      customer_email: email,
      client_reference_id: partnerId,
      ...(trialDays ? { subscription_data: { trial_period_days: trialDays } } : {}),
      metadata: {
        type: 'partner_subscription',
        partner_id: partnerId,
        partner_plan: plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Partner checkout error:', error?.message);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
