-- =============================================
-- Partners: add Shopify Storefront API token
-- =============================================
-- Lets a merchant whose store is password-gated (dev / pre-launch / private)
-- still expose products to Agalaz, by pasting a Storefront API access token
-- they generate inside Shopify (Apps → Develop apps → custom app → Storefront API).
--
-- The token is a public-safe credential per Shopify's design (intended to be
-- used in browser code), so plain-text storage is acceptable. Reads stay
-- restricted to the service role anyway.
--
-- Safe to re-run (uses IF NOT EXISTS).

ALTER TABLE partners
  ADD COLUMN IF NOT EXISTS shopify_storefront_token text;

COMMENT ON COLUMN partners.shopify_storefront_token IS
  'Shopify Storefront API access token. Optional. Used as fallback when /products.json is gated by Shopify password protection.';
