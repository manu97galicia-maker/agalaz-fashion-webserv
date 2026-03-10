import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

function getPrices(): Record<string, string> {
  return {
    weekly: process.env.STRIPE_PRICE_WEEKLY!,
    yearly: process.env.STRIPE_PRICE_YEARLY!,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { plan, email, userId } = await req.json();

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
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICES[plan],
          quantity: 1,
        },
      ],
      success_url: `${origin}/try-on?subscribed=true`,
      cancel_url: `${origin}/paywall`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_email: email,
      client_reference_id: userId,
      subscription_data: {
        trial_period_days: 3,
      },
      metadata: {
        datafast_visitor_id: datafastVisitorId || '',
        datafast_session_id: datafastSessionId || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
