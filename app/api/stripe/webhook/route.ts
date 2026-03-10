import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { PLAN_CREDITS, CREDITS_RESET_DAYS, REFERRAL_BONUS_WEEKLY, REFERRAL_BONUS_YEARLY } from '@/lib/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const admin = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_email;
      const subscriptionId = session.subscription as string;

      if (!customerEmail || !subscriptionId) break;

      // Get subscription details from Stripe
      const stripeSub = await stripe.subscriptions.retrieve(subscriptionId) as unknown as Stripe.Subscription;
      const priceId = stripeSub.items.data[0]?.price.id;
      const plan = priceId === process.env.STRIPE_PRICE_YEARLY ? 'yearly' : 'weekly';
      const periodEnd = new Date(stripeSub.items.data[0].current_period_end * 1000).toISOString();

      // Find user by email in Supabase auth
      const { data: { users } } = await admin.auth.admin.listUsers();
      const user = users.find((u) => u.email === customerEmail);
      if (!user) {
        console.error('Webhook: user not found for email', customerEmail);
        break;
      }

      // Generate referral code
      const referralCode = generateReferralCode(user.id);

      // Upsert subscription
      await admin.from('subscriptions').upsert({
        user_id: user.id,
        status: 'active',
        plan,
        stripe_subscription_id: subscriptionId,
        stripe_customer_id: session.customer as string,
        current_period_end: periodEnd,
        referral_code: referralCode,
      }, { onConflict: 'user_id' });

      // Set credits + reset date
      const nextReset = new Date();
      nextReset.setDate(nextReset.getDate() + CREDITS_RESET_DAYS);

      await admin.from('render_counts').upsert({
        user_id: user.id,
        credits_remaining: PLAN_CREDITS,
        credits_reset_at: nextReset.toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

      // Credit referral bonus to the referrer
      await creditReferralBonus(admin, user.id, plan);

      console.log(`Subscription activated: ${customerEmail} (${plan})`);
      break;
    }

    case 'invoice.paid': {
      // Handles recurring payments (subscription renewals)
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = (invoice.parent?.subscription_details?.subscription as string) || '';
      if (!subscriptionId || invoice.billing_reason === 'subscription_create') break;

      // Find subscription in our DB
      const { data: sub } = await admin
        .from('subscriptions')
        .select('user_id, plan')
        .eq('stripe_subscription_id', subscriptionId)
        .single();

      if (!sub) break;

      // Get updated period end from Stripe
      const stripeSubRenew = await stripe.subscriptions.retrieve(subscriptionId) as unknown as Stripe.Subscription;
      const periodEnd = new Date(stripeSubRenew.items.data[0].current_period_end * 1000).toISOString();

      // Update subscription period
      await admin.from('subscriptions').update({
        status: 'active',
        current_period_end: periodEnd,
      }).eq('user_id', sub.user_id);

      // Reset credits for the new period
      const nextReset = new Date();
      nextReset.setDate(nextReset.getDate() + CREDITS_RESET_DAYS);

      await admin.from('render_counts').update({
        credits_remaining: PLAN_CREDITS,
        credits_reset_at: nextReset.toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('user_id', sub.user_id);

      console.log(`Subscription renewed: ${sub.user_id} (${sub.plan})`);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;

      const { data: sub } = await admin
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single();

      if (sub) {
        await admin.from('subscriptions').update({
          status: 'cancelled',
        }).eq('user_id', sub.user_id);

        // Set credits to 0
        await admin.from('render_counts').update({
          credits_remaining: 0,
          credits_reset_at: null,
          updated_at: new Date().toISOString(),
        }).eq('user_id', sub.user_id);

        console.log('Subscription cancelled:', sub.user_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

function generateReferralCode(userId: string): string {
  let hash = 0;
  const str = userId + Date.now().toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).toUpperCase().slice(0, 8).padEnd(8, 'X');
}

async function creditReferralBonus(admin: ReturnType<typeof createAdminClient>, referredUserId: string, plan: string) {
  // Find if this user was referred by someone
  const { data: referral } = await admin
    .from('referrals')
    .select('id, referrer_id, bonus_credited')
    .eq('referred_id', referredUserId)
    .eq('bonus_credited', false)
    .single();

  if (!referral) return;

  const bonus = plan === 'yearly' ? REFERRAL_BONUS_YEARLY : REFERRAL_BONUS_WEEKLY;

  // Add bonus credits to the referrer
  const { data: referrerCredits } = await admin
    .from('render_counts')
    .select('credits_remaining')
    .eq('user_id', referral.referrer_id)
    .single();

  if (referrerCredits) {
    await admin.from('render_counts').update({
      credits_remaining: referrerCredits.credits_remaining + bonus,
      updated_at: new Date().toISOString(),
    }).eq('user_id', referral.referrer_id);
  }

  // Mark referral as credited
  await admin.from('referrals').update({
    bonus_credited: true,
    plan_purchased: plan,
  }).eq('id', referral.id);

  console.log(`Referral bonus: +${bonus} credits to ${referral.referrer_id}`);
}
