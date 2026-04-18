// One-shot: delete the duplicate Stitch Shop partner I created.
// Keeps the one with store_name="preview--stitch-shop-system.lovable.app" (manual registration).
// Deletes the one with store_name="Stitch Shop".

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dirname, '..', '.env.local'), 'utf8');
for (const line of env.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/i);
  if (m) process.env[m[1]] = m[2];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: dup } = await supabase
  .from('partners')
  .select('id, email, store_name, store_url, created_at')
  .eq('store_name', 'Stitch Shop')
  .eq('email', 'manu97galicia@gmail.com')
  .maybeSingle();

if (!dup) {
  console.log('No duplicate found.');
  process.exit(0);
}

console.log('Deleting:', dup);
const { error } = await supabase.from('partners').delete().eq('id', dup.id);
if (error) {
  console.error('Delete failed:', error.message);
  process.exit(1);
}
console.log('Deleted.');
