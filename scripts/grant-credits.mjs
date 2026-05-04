// One-off: grant N credits to a user by email.
// Usage: node scripts/grant-credits.mjs <email> <amount>

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(resolve(__dirname, '..', '.env.local'), 'utf8');
for (const line of envContent.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/i);
  if (m) process.env[m[1]] = m[2];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const email = process.argv[2];
const amount = parseInt(process.argv[3] || '0', 10);
if (!email || !amount) {
  console.error('Usage: node scripts/grant-credits.mjs <email> <amount>');
  process.exit(1);
}

// Look up user_id from auth.users via admin API (service role required).
const { data: list, error: listErr } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
if (listErr) { console.error('listUsers error:', listErr.message); process.exit(1); }

const target = list.users.find((u) => (u.email || '').toLowerCase() === email.toLowerCase());
if (!target) { console.error(`No auth user found for ${email}`); process.exit(1); }
console.log(`Found user: ${target.email}  id=${target.id}`);

// Read current row.
const { data: rc } = await supabase
  .from('render_counts')
  .select('credits_remaining, total_renders')
  .eq('user_id', target.id)
  .maybeSingle();

const before = rc?.credits_remaining ?? 0;
const after = before + amount;
console.log(`render_counts.credits_remaining: ${before} → ${after}`);

if (rc) {
  const { error: updErr } = await supabase
    .from('render_counts')
    .update({ credits_remaining: after, updated_at: new Date().toISOString() })
    .eq('user_id', target.id);
  if (updErr) { console.error('update error:', updErr.message); process.exit(1); }
} else {
  const { error: insErr } = await supabase
    .from('render_counts')
    .insert({ user_id: target.id, credits_remaining: after, total_renders: 0, updated_at: new Date().toISOString() });
  if (insErr) { console.error('insert error:', insErr.message); process.exit(1); }
}

// Verify
const { data: rc2 } = await supabase
  .from('render_counts')
  .select('credits_remaining, total_renders, updated_at')
  .eq('user_id', target.id)
  .single();
console.log('Verified:', rc2);
console.log('OK');
