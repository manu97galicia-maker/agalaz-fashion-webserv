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

const { data: partners } = await supabase
  .from('partners')
  .select('id, store_name, store_url, last_catalog_sync_at')
  .order('created_at', { ascending: false });

console.log('Catalog state per partner:\n');
for (const p of partners) {
  const { count: total } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', p.id);
  const { count: classified } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', p.id)
    .not('classified_at', 'is', null);
  console.log(`${p.store_name.padEnd(45)} products=${(total || 0).toString().padStart(4)} classified=${(classified || 0).toString().padStart(4)} last_sync=${p.last_catalog_sync_at || 'never'}`);
}

const { count: cacheCount } = await supabase
  .from('recommendations_cache')
  .select('partner_id', { count: 'exact', head: true });
console.log(`\nRecommendations cache rows: ${cacheCount || 0}`);
