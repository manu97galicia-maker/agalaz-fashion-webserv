import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/partners';
import { hashCustomerId } from '@/lib/customerLimits';
import { createAdminClient } from '@/lib/supabaseAdmin';

export const maxDuration = 10;

const VALID_EVENTS = new Set([
  'cross_sell_click',
  'add_to_cart',
  'cross_sell_add_to_cart',
]);

function corsHeaders(origin?: string | null) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req.headers.get('origin'));
  try {
    const auth = req.headers.get('authorization') || '';
    if (!auth.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 401, headers });
    }
    const { valid, partner } = await validateApiKey(auth.slice(7), req.headers.get('origin') || req.headers.get('referer'));
    if (!valid || !partner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers });
    }

    const body = await req.json().catch(() => ({}));
    const eventType = typeof body.event === 'string' ? body.event : '';
    const customerId = typeof body.customerId === 'string' ? body.customerId.trim() : '';
    const productId = typeof body.productId === 'string' || typeof body.productId === 'number'
      ? String(body.productId).substring(0, 80)
      : null;
    const variantId = typeof body.variantId === 'string' || typeof body.variantId === 'number'
      ? String(body.variantId).substring(0, 80)
      : null;
    const valueCents = Number.isFinite(Number(body.valueCents)) ? Math.max(0, Math.round(Number(body.valueCents))) : null;
    const currency = typeof body.currency === 'string' ? body.currency.substring(0, 6) : 'EUR';

    if (!VALID_EVENTS.has(eventType)) {
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400, headers });
    }
    if (!customerId) {
      return NextResponse.json({ error: 'customerId required' }, { status: 400, headers });
    }

    const customerHash = hashCustomerId(partner.id, customerId);
    const admin = createAdminClient();
    await admin.from('tryon_events').insert({
      partner_id: partner.id,
      customer_hash: customerHash,
      event_type: eventType,
      product_id: productId,
      variant_id: variantId,
      value_cents: valueCents,
      currency,
    });

    return NextResponse.json({ success: true }, { headers });
  } catch (err: any) {
    console.warn('[track] error:', err?.message?.substring(0, 200));
    // Tracking failures must never break the user flow
    return NextResponse.json({ success: false }, { status: 200, headers });
  }
}
