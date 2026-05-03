-- =============================================
-- Per-customer daily rate limit for /api/v1/tryon
-- Stores ONLY an opaque hash — never the raw partner customer_id.
-- Daily reset: 3 renders per (partner, customer_hash) per day.
-- Run in Supabase SQL Editor (safe to re-run).
-- =============================================

CREATE TABLE IF NOT EXISTS customer_render_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id uuid NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  -- SHA-256(partner_id + ':' + customer_id + ':' + CUSTOMER_HASH_SALT)
  -- Opaque pseudonym. No way to reverse to customer_id without the partner's
  -- customer mapping AND our salt → not PII on its own under GDPR.
  customer_hash text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(partner_id, customer_hash, date)
);

CREATE INDEX IF NOT EXISTS idx_customer_render_limits_lookup
  ON customer_render_limits(partner_id, customer_hash, date);

-- For the optional retention cleanup job (delete rows >30 days old)
CREATE INDEX IF NOT EXISTS idx_customer_render_limits_date
  ON customer_render_limits(date);

ALTER TABLE customer_render_limits ENABLE ROW LEVEL SECURITY;
-- All access via service role in API routes — no client policies.
