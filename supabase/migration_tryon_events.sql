-- =============================================
-- Widget intent / attribution events.
-- Stores per-event records for analytics: which renders led to cross-sell
-- clicks and add-to-carts, broken down by partner.
-- Customer is referenced by the same opaque hash as customer_render_limits
-- (no raw customer_id stored).
-- Run in Supabase SQL Editor (safe to re-run).
-- =============================================

CREATE TABLE IF NOT EXISTS tryon_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id uuid NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  customer_hash text NOT NULL,
  -- 'render', 'cross_sell_click', 'add_to_cart', 'cross_sell_add_to_cart'
  event_type text NOT NULL,
  -- Optional product context (Shopify/CMS product id of source or recommended item)
  product_id text,
  variant_id text,
  -- Free-form numeric value (e.g. price in cents) for revenue dashboards
  value_cents integer,
  currency text DEFAULT 'EUR',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tryon_events_partner_date
  ON tryon_events(partner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tryon_events_partner_type
  ON tryon_events(partner_id, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tryon_events_customer
  ON tryon_events(partner_id, customer_hash, created_at DESC);

ALTER TABLE tryon_events ENABLE ROW LEVEL SECURITY;
-- Service role only; client never reads this table directly.
