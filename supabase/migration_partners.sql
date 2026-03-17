-- =============================================
-- B2B Partners: API Keys, Usage Tracking
-- Run this in Supabase SQL Editor
-- Safe to re-run (uses IF NOT EXISTS)
-- =============================================

-- 1. Partners table (stores/businesses that integrate Agalaz)
CREATE TABLE IF NOT EXISTS partners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  store_name text NOT NULL,
  store_url text NOT NULL,
  -- API key: only the hash is stored; the raw key is shown once at creation
  api_key_hash text NOT NULL UNIQUE,
  -- Prefix for identification (e.g., "agz_live_a8f3") — NOT secret
  api_key_prefix text NOT NULL,
  -- Comma-separated allowed domains (e.g., "mystore.com,www.mystore.com")
  allowed_domains text[] NOT NULL DEFAULT '{}',
  -- Plan & credits
  plan text NOT NULL DEFAULT 'starter',           -- 'starter', 'growth'
  price_eur integer NOT NULL DEFAULT 125,          -- monthly price in EUR
  setup_fee_eur integer NOT NULL DEFAULT 199,      -- one-time setup fee in EUR
  credits_remaining integer NOT NULL DEFAULT 10,   -- 10 free trial renders
  credits_monthly_limit integer NOT NULL DEFAULT 200,
  total_renders integer NOT NULL DEFAULT 0,
  -- Status
  is_active boolean NOT NULL DEFAULT true,
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_partners_api_key_hash ON partners(api_key_hash);
CREATE INDEX IF NOT EXISTS idx_partners_api_key_prefix ON partners(api_key_prefix);
CREATE INDEX IF NOT EXISTS idx_partners_email ON partners(email);

-- 2. Partner usage log (daily aggregates for analytics)
CREATE TABLE IF NOT EXISTS partner_usage (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id uuid NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  renders_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(partner_id, date)
);

CREATE INDEX IF NOT EXISTS idx_partner_usage_partner_date ON partner_usage(partner_id, date);

-- 3. RLS — partners table is accessed via service role only (no client access)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_usage ENABLE ROW LEVEL SECURITY;

-- No client policies needed — all access goes through service role in API routes
