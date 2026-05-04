// Smoke test: verify partner profile + rotate + storefront token flow without Stripe.
// Creates a temp partner row, exercises the endpoints, then deletes the row.

import { createClient } from '@supabase/supabase-js';
import { createHash, randomBytes } from 'crypto';
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

const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => { console.error(`  ✗ ${msg}`); process.exit(1); };

// 1. Schema sanity: shopify_storefront_token column must exist.
console.log('\n[1] Schema sanity');
{
  const { data, error } = await supabase
    .from('partners')
    .select('id, shopify_storefront_token, store_url')
    .limit(1);
  if (error) {
    if (error.message.includes('shopify_storefront_token')) {
      fail('shopify_storefront_token column missing — apply supabase/migration_partners_storefront_token.sql');
    }
    fail(`partners select error: ${error.message}`);
  }
  ok('partners table has shopify_storefront_token + store_url columns');
}

// 2. Insert a temp partner.
console.log('\n[2] Temp partner lifecycle');
const rawKey = `agz_live_${randomBytes(16).toString('hex')}`;
const hash = createHash('sha256').update(rawKey).digest('hex');
const prefix = rawKey.substring(0, 13);
const tempEmail = `smoke-${Date.now()}@example.test`;

const { data: created, error: insErr } = await supabase
  .from('partners')
  .insert({
    email: tempEmail,
    store_name: 'smoke-test',
    store_url: 'https://smoke-test.example.com',
    api_key_hash: hash,
    api_key_prefix: prefix,
    plan: 'trial',
    credits_remaining: 50,
    credits_monthly_limit: 50,
    is_active: true,
    allowed_domains: [],
  })
  .select('id, email, api_key_prefix')
  .single();

if (insErr) fail(`insert failed: ${insErr.message}`);
ok(`created partner ${created.id} with prefix ${created.api_key_prefix}`);

const partnerId = created.id;

try {
  // 3. Save a fake storefront token.
  console.log('\n[3] Save Storefront token (DB write path)');
  const fakeToken = `shpat_${'a'.repeat(32)}`;
  const { error: updErr } = await supabase
    .from('partners')
    .update({ shopify_storefront_token: fakeToken, updated_at: new Date().toISOString() })
    .eq('id', partnerId);
  if (updErr) fail(`update token: ${updErr.message}`);
  ok('storefront token written');

  // 4. Read partner — same shape /api/partners/profile would return.
  console.log('\n[4] Profile shape');
  const { data: p, error: readErr } = await supabase
    .from('partners')
    .select('id, store_name, store_url, plan, is_active, credits_remaining, api_key_prefix, stripe_subscription_id, shopify_storefront_token')
    .eq('id', partnerId)
    .single();
  if (readErr) fail(`read partner: ${readErr.message}`);
  if (!p.store_url) fail('store_url missing in shape');
  if (!p.shopify_storefront_token) fail('shopify_storefront_token not persisted');
  ok(`has_storefront_token derived field would be: ${!!p.shopify_storefront_token}`);
  ok(`has_subscription derived field would be: ${!!p.stripe_subscription_id}`);

  // 5. Rotate key (simulating /api/partners/rotate-key body).
  console.log('\n[5] Rotate key');
  const newRaw = `agz_live_${randomBytes(16).toString('hex')}`;
  const newHash = createHash('sha256').update(newRaw).digest('hex');
  const newPrefix = newRaw.substring(0, 13);
  const { error: rotErr } = await supabase
    .from('partners')
    .update({ api_key_hash: newHash, api_key_prefix: newPrefix, updated_at: new Date().toISOString() })
    .eq('id', partnerId);
  if (rotErr) fail(`rotate: ${rotErr.message}`);

  const { data: pAfter } = await supabase
    .from('partners')
    .select('api_key_hash, api_key_prefix')
    .eq('id', partnerId)
    .single();
  if (pAfter.api_key_hash === hash) fail('hash did not change after rotate');
  if (pAfter.api_key_prefix === prefix) fail('prefix did not change after rotate');
  ok(`rotated: prefix ${prefix} → ${pAfter.api_key_prefix}`);

  // 6. Clear storefront token.
  console.log('\n[6] Clear Storefront token');
  const { error: clrErr } = await supabase
    .from('partners')
    .update({ shopify_storefront_token: null })
    .eq('id', partnerId);
  if (clrErr) fail(`clear token: ${clrErr.message}`);
  ok('token cleared');

} finally {
  // Cleanup.
  console.log('\n[cleanup]');
  const { error: delErr } = await supabase.from('partners').delete().eq('id', partnerId);
  if (delErr) console.error('  ! cleanup failed:', delErr.message);
  else ok(`temp partner ${partnerId} deleted`);
}

console.log('\nAll checks passed.');
