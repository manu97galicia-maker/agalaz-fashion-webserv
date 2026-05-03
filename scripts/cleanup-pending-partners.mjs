// Cleanup orphan partner rows that never advanced past register (api_key_hash='pending').
// These rows block new signups because of the UNIQUE constraint on api_key_hash.
// Safe — only deletes rows that are inactive AND have a literal 'pending' hash.

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
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: orphans, error: selErr } = await supabase
  .from('partners')
  .select('id, email, store_url, created_at')
  .eq('api_key_hash', 'pending')
  .eq('is_active', false);

if (selErr) { console.error(selErr); process.exit(1); }

console.log(`Found ${orphans.length} orphan(s) with api_key_hash='pending':`);
for (const o of orphans) console.log(' -', o.id, '|', o.email, '|', o.created_at);

if (orphans.length === 0) process.exit(0);

const { error: delErr } = await supabase
  .from('partners')
  .delete()
  .eq('api_key_hash', 'pending')
  .eq('is_active', false);

if (delErr) { console.error('Delete failed:', delErr); process.exit(1); }
console.log(`Deleted ${orphans.length} orphan(s).`);
