// One-shot script to register a partner with free trial credits.
// Usage: node scripts/enable-partner.mjs
// Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local

import { createClient } from '@supabase/supabase-js';
import { createHash, randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dep needed)
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf8');
for (const line of envContent.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/i);
  if (m) process.env[m[1]] = m[2];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

// === Partner config ===
const EMAIL = 'manu97galicia@gmail.com';
const STORE_NAME = 'Stitch Shop';
const STORE_URL = 'https://preview--stitch-shop-system.lovable.app';
const STORE_DOMAIN = 'preview--stitch-shop-system.lovable.app';
const ALLOWED_DOMAINS = [STORE_DOMAIN, 'stitch-shop-system.lovable.app'];
const TRIAL_CREDITS = 50;
const MONTHLY_LIMIT = 200;

function generateApiKey() {
  const secret = randomBytes(16).toString('hex');
  const raw = `agz_live_${secret}`;
  const hash = createHash('sha256').update(raw).digest('hex');
  const prefix = raw.substring(0, 13);
  return { raw, hash, prefix };
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

const { data: existing } = await supabase
  .from('partners')
  .select('id, email, plan, is_active, credits_remaining, api_key_prefix')
  .eq('email', EMAIL)
  .eq('store_url', STORE_URL)
  .maybeSingle();

if (existing) {
  console.log('Partner already exists for this email + store_url:');
  console.log(JSON.stringify(existing, null, 2));
  console.log('\nUpdating to trial-active state with', TRIAL_CREDITS, 'credits...');
  const { error: updErr } = await supabase
    .from('partners')
    .update({
      plan: 'trial',
      is_active: true,
      credits_remaining: TRIAL_CREDITS,
      credits_monthly_limit: MONTHLY_LIMIT,
      allowed_domains: ALLOWED_DOMAINS,
      updated_at: new Date().toISOString(),
    })
    .eq('id', existing.id);
  if (updErr) {
    console.error('Update failed:', updErr.message);
    process.exit(1);
  }
  console.log('OK — existing partner reactivated as trial. API key prefix:', existing.api_key_prefix);
  console.log('(API key not regenerated — original key still works.)');
  process.exit(0);
}

const { raw, hash, prefix } = generateApiKey();

const { data: inserted, error } = await supabase
  .from('partners')
  .insert({
    email: EMAIL,
    store_name: STORE_NAME,
    store_url: STORE_URL,
    api_key_hash: hash,
    api_key_prefix: prefix,
    allowed_domains: ALLOWED_DOMAINS,
    plan: 'trial',
    price_eur: 0,
    setup_fee_eur: 0,
    credits_remaining: TRIAL_CREDITS,
    credits_monthly_limit: MONTHLY_LIMIT,
    total_renders: 0,
    is_active: true,
    setup_paid: true,
  })
  .select('id, store_name, plan, credits_remaining')
  .single();

if (error) {
  console.error('Insert failed:', error.message);
  process.exit(1);
}

console.log('\n=== PARTNER CREATED ===');
console.log(JSON.stringify(inserted, null, 2));
console.log('\n=== API KEY (save this — shown once) ===');
console.log(raw);
console.log('\n=== EMBED URL ===');
console.log(`https://agalaz.com/embed?key=${raw}&lang=es`);
console.log('Add &garment=<image_url>&type=<shirt|pants|dress|...> to preset a product.');
