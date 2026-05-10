-- Adds the daily-free-render allowance to render_counts.
-- Each authenticated user gets 1 free render per day (non-cumulative).
-- The column stores the date of their most recent freebie use; the API
-- compares against today and grants OR charges from credits_remaining.
--
-- Run once in Supabase SQL Editor.

ALTER TABLE render_counts
  ADD COLUMN IF NOT EXISTS last_free_render_date DATE;

CREATE INDEX IF NOT EXISTS render_counts_last_free_idx
  ON render_counts (user_id, last_free_render_date);
