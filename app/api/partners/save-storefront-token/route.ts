import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { authorizePartner } from '@/lib/partnerAuth';

/**
 * Save (or clear) a Shopify Storefront API token for a partner.
 *
 * Storefront tokens are public-safe by Shopify's design (intended to be embedded
 * in browser code), so plain-text storage is acceptable. Reads are restricted
 * to the service role anyway.
 *
 * Body: { partner_id, token }   — token can be null/empty to clear.
 * Auth: Supabase cookie session matching partner.user_id, or Bearer API key.
 */
export async function POST(req: NextRequest) {
  try {
    const { partner_id, token } = await req.json();
    if (!partner_id) {
      return NextResponse.json({ error: 'partner_id is required' }, { status: 400 });
    }

    const auth = await authorizePartner(req, partner_id);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.reason || 'Unauthorized' }, { status: 401 });
    }

    // Light validation — Storefront tokens are 32-char hex by convention.
    // Accept anything 16+ chars to be lenient with newer formats; reject obvious junk.
    const cleaned = typeof token === 'string' ? token.trim() : '';
    if (cleaned && (cleaned.length < 16 || cleaned.length > 256)) {
      return NextResponse.json(
        { error: 'Token looks malformed (expected 16–256 chars)' },
        { status: 400 },
      );
    }

    const admin = createAdminClient();
    const { error } = await admin
      .from('partners')
      .update({
        shopify_storefront_token: cleaned || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', partner_id);

    if (error) {
      // The most common failure here is the column not existing yet — surface a
      // helpful message so the operator knows to apply the migration.
      const msg = error.message || '';
      if (msg.includes('shopify_storefront_token')) {
        return NextResponse.json(
          {
            error:
              'Database migration not applied yet. Apply supabase/migration_partners_storefront_token.sql in the Supabase SQL Editor, then try again.',
          },
          { status: 500 },
        );
      }
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({ ok: true, has_token: !!cleaned });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
