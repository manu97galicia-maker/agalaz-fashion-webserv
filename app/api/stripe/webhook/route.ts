import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabaseAdmin';
import Stripe from 'stripe';

function getPeriodEnd(sub: any): string {
  const ts = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? 0;
  return new Date(ts * 1000).toISOString();
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const admin = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;

      const userId = await getUserIdByCustomer(admin, customerId);
      if (!userId) break;

      const sub = await getStripe().subscriptions.retrieve(subscriptionId) as any;
      const interval = sub.items?.data?.[0]?.price?.recurring?.interval;
      const plan = interval === 'year' ? 'yearly' : 'weekly';

      await admin.from('subscriptions').upsert(
        {
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          plan,
          status: 'active',
          current_period_end: getPeriodEnd(sub),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object as any;
      const subscriptionId = invoice.subscription as string;
      if (!subscriptionId) break;

      const sub = await getStripe().subscriptions.retrieve(subscriptionId) as any;
      const customerId = invoice.customer as string;

      await admin
        .from('subscriptions')
        .update({
          status: 'active',
          current_period_end: getPeriodEnd(sub),
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_customer_id', customerId);
      break;
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as any;
      const customerId = sub.customer as string;
      const status =
        sub.status === 'active' ? 'active' : sub.status === 'past_due' ? 'past_due' : 'canceled';

      await admin
        .from('subscriptions')
        .update({
          status,
          current_period_end: getPeriodEnd(sub),
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_customer_id', customerId);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as any;
      const customerId = sub.customer as string;

      await admin
        .from('subscriptions')
        .update({ status: 'canceled', updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function getUserIdByCustomer(admin: ReturnType<typeof createAdminClient>, customerId: string): Promise<string | null> {
  const { data } = await admin
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single();
  return data?.user_id || null;
}
