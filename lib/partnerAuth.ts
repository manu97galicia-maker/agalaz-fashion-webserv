// Authorize a request as the owner of a given partner row.
// Accepts either:
//   1. Supabase auth cookie session whose user.id matches partner.user_id
//   2. Bearer API key whose hash matches partner.api_key_hash
//
// Used to gate partner-mutating endpoints (sync-catalog, future ones) so
// arbitrary callers can't trigger work on someone else's partner record.

import { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from './supabaseAdmin';
import { hashApiKey } from './partners';

export async function authorizePartner(
  req: NextRequest,
  partnerId: string,
): Promise<{ ok: boolean; reason?: string }> {
  const admin = createAdminClient();

  // Path 1 — Bearer API key
  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Bearer ')) {
    const raw = auth.slice(7).trim();
    if (raw.startsWith('agz_live_')) {
      const hash = hashApiKey(raw);
      const { data: p } = await admin
        .from('partners')
        .select('id, is_active')
        .eq('api_key_hash', hash)
        .eq('id', partnerId)
        .maybeSingle();
      if (p && p.is_active) return { ok: true };
      return { ok: false, reason: 'API key does not match this partner' };
    }
  }

  // Path 2 — Supabase cookie session
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: p } = await admin
        .from('partners')
        .select('user_id, email')
        .eq('id', partnerId)
        .maybeSingle();
      if (p?.user_id === user.id) return { ok: true };

      // Legacy fallback: partner registered before email verification was enforced
      // and never got a user_id linked. If the session-verified email matches the
      // partner.email, claim the partner row by writing user_id once. Subsequent
      // calls then take the fast user_id === user_id path above.
      if (p && !p.user_id && p.email && user.email && p.email.toLowerCase() === user.email.toLowerCase()) {
        await admin
          .from('partners')
          .update({ user_id: user.id, updated_at: new Date().toISOString() })
          .eq('id', partnerId);
        return { ok: true };
      }

      return { ok: false, reason: 'Session user does not own this partner' };
    }
  } catch (err: any) {
    return { ok: false, reason: 'Session check failed' };
  }

  return { ok: false, reason: 'Authentication required' };
}
