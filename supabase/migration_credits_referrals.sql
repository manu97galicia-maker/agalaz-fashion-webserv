-- =============================================
-- MIGRATION: Credit system + Referral system
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Add credits columns to render_counts
ALTER TABLE render_counts
  ADD COLUMN IF NOT EXISTS credits_remaining integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS credits_reset_at timestamptz;

-- Set existing users: those with total_renders >= 1 get 0 credits (already used free)
UPDATE render_counts SET credits_remaining = 0 WHERE total_renders >= 1;

-- 2. Add referral_code to subscriptions
ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS referral_code text UNIQUE;

-- Generate referral codes for existing users
UPDATE subscriptions
  SET referral_code = UPPER(SUBSTR(MD5(user_id::text || NOW()::text), 1, 8))
  WHERE referral_code IS NULL;

-- 3. Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id uuid NOT NULL,
  referred_id uuid NOT NULL,
  referral_code text NOT NULL,
  plan_purchased text, -- 'weekly' or 'yearly'
  bonus_credited boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_referral_code ON subscriptions(referral_code);
