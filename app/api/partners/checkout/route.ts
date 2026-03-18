import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key);
}

// Setup fee Price IDs (one-time payments)
const SETUP_PRICES = {
  starter: process.env.STRIPE_PARTNER_STARTER_SETUP || 'price_1TC3sIDkbUkdbQ5Uv01d0WNF',
  growth: process.env.STRIPE_PARTNER_GROWTH_SETUP || 'price_1TC3v6DkbUkdbQ5UEK6RisgJ',
};

// Monthly subscription Price IDs
const MONTHLY_PRICES = {
  starter: process.env.STRIPE_PARTNER_STARTER_MONTHLY || 'price_1TC3tYDkbUkdbQ5UgsAJHl60',
  growth: process.env.STRIPE_PARTNER_GROWTH_MONTHLY || 'price_1TC3w0DkbUkdbQ5UgBabrJ6F',
};

export async function POST(req: NextRequest) {
  try {
    const { plan, partnerId, email, action } = await req.json();
    const planKey = plan as keyof typeof SETUP_PRICES;

    if (!plan || !SETUP_PRICES[planKey]) {
      return NextResponse.json({ error: 'Invalid plan. Use "starter" or "growth"' }, { status: 400 });
    }

    if (!partnerId || !email) {
      return NextResponse.json({ error: 'partnerId and email are required' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'https://agalaz.com';
    const stripe = getStripe();

    // ACTION: "activate" → monthly subscription (after trial)
    if (action === 'activate') {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: MONTHLY_PRICES[planKey], quantity: 1 }],
        success_url: `${origin}/partners?subscribed=true&partner_id=${partnerId}`,
        cancel_url: `${origin}/partners?cancelled=true`,
        customer_email: email,
        client_reference_id: partnerId,
        metadata: {
          type: 'partner_subscription',
          partner_id: partnerId,
          partner_plan: plan,
        },
      });
      return NextResponse.json({ url: session.url });
    }

    // DEFAULT: setup fee only (one-time payment)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: SETUP_PRICES[planKey], quantity: 1 }],
      success_url: `${origin}/partners?activated=true&partner_id=${partnerId}`,
      cancel_url: `${origin}/partners?cancelled=true`,
      customer_email: email,
      client_reference_id: partnerId,
      metadata: {
        type: 'partner_setup',
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
