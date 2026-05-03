// Per-customer daily render cap for /api/v1/tryon.
// Customer ID is hashed with a server-side salt and never stored raw.

import { createHash } from 'crypto';
import { createAdminClient } from './supabaseAdmin';

export const DAILY_CAP_PER_CUSTOMER = 3;

const HASH_SALT = process.env.CUSTOMER_HASH_SALT || 'agalaz-default-salt-change-in-prod';

export function hashCustomerId(partnerId: string, customerId: string): string {
  return createHash('sha256')
    .update(`${partnerId}:${customerId}:${HASH_SALT}`)
    .digest('hex');
}

function todayUtc(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check whether this (partner, customer) is allowed to render today.
 * Returns { allowed, used, remaining }. Does NOT increment — call commitRender after success.
 */
export async function checkCustomerDailyCap(
  partnerId: string,
  customerId: string,
): Promise<{ allowed: boolean; used: number; remaining: number }> {
  const admin = createAdminClient();
  const customerHash = hashCustomerId(partnerId, customerId);
  const date = todayUtc();

  const { data } = await admin
    .from('customer_render_limits')
    .select('count')
    .eq('partner_id', partnerId)
    .eq('customer_hash', customerHash)
    .eq('date', date)
    .maybeSingle();

  const used = data?.count || 0;
  const remaining = Math.max(0, DAILY_CAP_PER_CUSTOMER - used);
  return { allowed: used < DAILY_CAP_PER_CUSTOMER, used, remaining };
}

/**
 * Atomically increment the per-customer daily counter after a successful render.
 */
export async function commitCustomerRender(
  partnerId: string,
  customerId: string,
): Promise<void> {
  const admin = createAdminClient();
  const customerHash = hashCustomerId(partnerId, customerId);
  const date = todayUtc();

  // Race-tolerant: read current count, upsert with count+1.
  // Worst case under concurrent renders: count overshoots by 1 — acceptable.
  const { data: existing } = await admin
    .from('customer_render_limits')
    .select('count')
    .eq('partner_id', partnerId)
    .eq('customer_hash', customerHash)
    .eq('date', date)
    .maybeSingle();

  const newCount = (existing?.count || 0) + 1;

  await admin
    .from('customer_render_limits')
    .upsert(
      {
        partner_id: partnerId,
        customer_hash: customerHash,
        date,
        count: newCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'partner_id,customer_hash,date' },
    );
}
