-- =============================================
-- Partners V2: Add user_id + setup_paid columns
-- Run this in Supabase SQL Editor (new tab)
-- Safe to re-run (uses IF NOT EXISTS / safe checks)
-- =============================================

-- 1. Add user_id column (links partner to Supabase auth user)
ALTER TABLE partners ADD COLUMN IF NOT EXISTS user_id uuid;
CREATE INDEX IF NOT EXISTS idx_partners_user_id ON partners(user_id);

-- 2. Add setup_paid flag
ALTER TABLE partners ADD COLUMN IF NOT EXISTS setup_paid boolean NOT NULL DEFAULT false;

-- 3. Add Stripe columns if not present
ALTER TABLE partners ADD COLUMN IF NOT EXISTS stripe_customer_id text;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS stripe_subscription_id text;
