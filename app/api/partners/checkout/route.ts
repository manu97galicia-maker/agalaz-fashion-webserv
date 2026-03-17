import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key);
}

// Partner plan Stripe Price IDs
const PARTNER_PRICES = {
  starter: {
    setup: process.env.STRIPE_PARTNER_STARTER_SETUP || 'price_1TC3sIDkbUkdbQ5Uv01d0WNF',
    monthly: process.env.STRIPE_PARTNER_STARTER_MONTHLY || 'price_1TC3tYDkbUkdbQ5UgsAJHl60',
  },
  growth: {
    setup: process.env.STRIPE_PARTNER_GROWTH_SETUP || 'price_1TC3v6DkbUkdbQ5UEK6RisgJ',
    monthly: process.env.STRIPE_PARTNER_GROWTH_MONTHLY || 'price_1TC3w0DkbUkdbQ5UgBabrJ6F',
  },
};

export async function POST(req: NextRequest) {
  try {
    const { plan, partnerId, email } = await req.json();

    if (!plan || !PARTNER_PRICES[plan as keyof typeof PARTNER_PRICES]) {
      return NextResponse.json({ error: 'Invalid plan. Use "starter" or "growth"' }, { status: 400 });
    }

    if (!partnerId || !email) {
      return NextResponse.json({ error: 'partnerId and email are required' }, { status: 400 });
    }

    const prices = PARTNER_PRICES[plan as keyof typeof PARTNER_PRICES];
    const origin = req.headers.get('origin') || 'https://agalaz.com';
    const stripe = getStripe();

    // Create checkout with setup fee (one-time) + monthly subscription
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        // Monthly subscription
        {
          price: prices.monthly,
          quantity: 1,
        },
        // One-time setup fee (added to first invoice)
        {
          price: prices.setup,
          quantity: 1,
        },
      ],
      success_url: `${origin}/partners?activated=true&partner_id=${partnerId}`,
      cancel_url: `${origin}/partners?cancelled=true`,
      customer_email: email,
      client_reference_id: partnerId,
      metadata: {
        type: 'partner',
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
