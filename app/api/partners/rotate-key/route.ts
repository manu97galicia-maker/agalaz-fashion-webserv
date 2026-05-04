import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { authorizePartner } from '@/lib/partnerAuth';
import { generateApiKey } from '@/lib/partners';

/**
 * Rotate (regenerate) the API key for an existing partner.
 *
 * Used when the partner lost the raw key (e.g. closed the tab during the
 * Stripe redirect, or sessionStorage was cleared). The DB only stores the
 * hash so the original key is unrecoverable — the only safe path is to
 * mint a new one and invalidate the old.
 *
 * Auth: requires Supabase cookie session whose user.id matches partner.user_id,
 * OR Bearer header carrying the existing valid API key. Anyone else gets 401.
 */
export async function POST(req: NextRequest) {
  try {
    const { partner_id } = await req.json();
    if (!partner_id) {
      return NextResponse.json({ error: 'partner_id is required' }, { status: 400 });
    }

    const auth = await authorizePartner(req, partner_id);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.reason || 'Unauthorized' }, { status: 401 });
    }

    const admin = createAdminClient();
    const { data: partner, error: fetchErr } = await admin
      .from('partners')
      .select('id')
      .eq('id', partner_id)
      .single();

    if (fetchErr || !partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const { raw, hash, prefix } = generateApiKey();

    const { error: updateErr } = await admin
      .from('partners')
      .update({
        api_key_hash: hash,
        api_key_prefix: prefix,
        updated_at: new Date().toISOString(),
      })
      .eq('id', partner_id);

    if (updateErr) {
      console.error('Rotate key update error:', updateErr);
      return NextResponse.json({ error: 'Failed to rotate key' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      api_key: raw,
      api_key_prefix: prefix,
      warning: 'Save this API key now — it cannot be retrieved again. The previous key is now invalid.',
    });
  } catch (error: any) {
    console.error('Rotate key error:', error?.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
