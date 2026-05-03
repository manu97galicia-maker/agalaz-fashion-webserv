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

const { data, error } = await supabase
  .from('partners')
  .select('id, email, store_name, store_url, plan, is_active, setup_paid, api_key_prefix, api_key_hash, stripe_customer_id, stripe_subscription_id, credits_remaining, created_at, updated_at')
  .order('created_at', { ascending: false })
  .limit(15);

if (error) {
  console.error(error);
  process.exit(1);
}

for (const p of data) {
  console.log('---');
  console.log('id:', p.id);
  console.log('email:', p.email);
  console.log('store:', p.store_name, '|', p.store_url);
  console.log('plan:', p.plan, '| active:', p.is_active, '| setup_paid:', p.setup_paid);
  console.log('api_key_prefix:', p.api_key_prefix, '| hash_pending:', p.api_key_hash === 'pending');
  console.log('stripe customer:', p.stripe_customer_id, '| sub:', p.stripe_subscription_id);
  console.log('credits:', p.credits_remaining);
  console.log('created:', p.created_at, '| updated:', p.updated_at);
}
