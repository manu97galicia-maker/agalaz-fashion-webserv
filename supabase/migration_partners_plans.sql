-- Add pricing columns to partners (run after migration_partners.sql)
-- Safe to re-run

ALTER TABLE partners ADD COLUMN IF NOT EXISTS price_eur integer NOT NULL DEFAULT 125;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS setup_fee_eur integer NOT NULL DEFAULT 199;

-- Update existing partners to 10 free trial renders
UPDATE partners SET credits_remaining = 10 WHERE credits_remaining = 100;

-- Plan structure:
-- Starter: €125/mes + €199 setup, 200 renders/mes, 10 free trial
-- Growth:  €499/mes + €499 setup, 1000 renders/mes, 10 free trial
