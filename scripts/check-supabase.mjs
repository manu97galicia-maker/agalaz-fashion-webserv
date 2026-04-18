// Check if agalaz-fashion's Supabase is the same as shopify-agalaz.
// If the agalaaz-fake-store partner exists here → same DB.

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

console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('');

// Check if shop_domain column exists (only in shopify-agalaz schema)
const { data: allPartners, error } = await supabase
  .from('partners')
  .select('id, email, store_name, store_url')
  .limit(20);

if (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

console.log(`Total partners: ${allPartners.length}`);
for (const p of allPartners) {
  console.log(`- ${p.email} | ${p.store_name} | ${p.store_url}`);
}

// Try querying by shop_domain (only exists in shopify-agalaz schema)
const { data: shopifyPartner, error: shopErr } = await supabase
  .from('partners')
  .select('id, store_name, shop_domain')
  .eq('shop_domain', 'agalaaz-fake-store.myshopify.com')
  .maybeSingle();

console.log('');
if (shopErr) {
  if (shopErr.message.includes('shop_domain')) {
    console.log('❌ shop_domain column does NOT exist — DIFFERENT Supabase from shopify-agalaz');
  } else {
    console.log('Error querying shop_domain:', shopErr.message);
  }
} else if (shopifyPartner) {
  console.log('✅ shop_domain exists AND agalaaz-fake-store is here — SAME Supabase');
  console.log(JSON.stringify(shopifyPartner, null, 2));
} else {
  console.log('⚠️ shop_domain column exists but no agalaaz-fake-store row here');
}

// Check for products table (cross-sell)
const { error: productsErr } = await supabase
  .from('products')
  .select('id', { count: 'exact', head: true });

console.log('');
if (productsErr) {
  console.log('❌ products table missing:', productsErr.message);
} else {
  console.log('✅ products table exists here');
}
