-- =============================================
-- FULL SCHEMA: Subscriptions, Credits & Referrals
-- Run this in Supabase SQL Editor
-- Safe to re-run (uses IF NOT EXISTS)
-- =============================================

-- 1. Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'inactive',        -- 'active', 'cancelled', 'inactive'
  plan text,                                       -- 'weekly' or 'yearly'
  stripe_subscription_id text,
  stripe_customer_id text,
  current_period_end timestamptz,
  referral_code text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub_id
  ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_referral_code
  ON subscriptions(referral_code);

-- 2. Render counts / credits table
CREATE TABLE IF NOT EXISTS render_counts (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_renders integer DEFAULT 0,
  credits_remaining integer DEFAULT 2,             -- FREE_CREDITS = 2
  credits_reset_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- 3. Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code text NOT NULL,
  plan_purchased text,                             -- 'weekly' or 'yearly'
  bonus_credited boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);

-- 4. RLS policies (secure access)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE render_counts ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscription
CREATE POLICY IF NOT EXISTS "Users read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can read their own render counts
CREATE POLICY IF NOT EXISTS "Users read own render_counts"
  ON render_counts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can read their own referrals
CREATE POLICY IF NOT EXISTS "Users read own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- Service role (used by webhook/admin) bypasses RLS automatically
