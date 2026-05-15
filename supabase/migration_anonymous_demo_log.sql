-- Anonymous demo render rate limiting (1 render per IP per day).
-- IP is hashed before storage for privacy. Date is UTC.
--
-- Run this in Supabase SQL editor before deploying the anonymous-demo flow.

CREATE TABLE IF NOT EXISTS anonymous_demo_log (
  ip_hash    TEXT NOT NULL,
  date       DATE NOT NULL,
  category   TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (ip_hash, date)
);

-- Auto-purge logs older than 30 days. Anonymous quota only needs today vs
-- everything else, so a small retention window keeps the table tiny.
CREATE INDEX IF NOT EXISTS anonymous_demo_log_created_at_idx
  ON anonymous_demo_log (created_at);

-- Optional periodic cleanup (run manually or via cron):
--   DELETE FROM anonymous_demo_log WHERE created_at < NOW() - INTERVAL '30 days';
