/**
 * Centralized event tracking. Fires the same event to:
 *   1. Vercel Analytics (custom events — requires Pro plan, paid feature).
 *   2. Datafast (existing client-side analytics queue, pre-existing in this repo).
 *   3. Meta Pixel (Facebook & Instagram Ads). Internal events are mapped to
 *      standard Pixel events (AddToCart, InitiateCheckout, Lead, Purchase…)
 *      so Meta can optimize ads, attribute conversions and build Lookalike
 *      Audiences. Pixel is initialized in app/layout.tsx with PageView; this
 *      wrapper fires the funnel events on top of it.
 *
 * Why a single wrapper:
 *   - All endpoints get the exact same funnel — no drift between dashboards.
 *   - One call site per event, so adding another analytics system is one change.
 *   - Type-safe event names so typos don't silently fragment the data.
 *
 * Vercel custom-events docs:
 *   https://vercel.com/docs/analytics/custom-events
 * Meta Pixel standard events:
 *   https://developers.facebook.com/docs/meta-pixel/reference
 *
 * Property values are constrained to (string | number | boolean | null) per
 * Vercel's API. Datafast accepts the same shape so it's safe to forward.
 */

import { track as vercelTrack } from '@vercel/analytics';

export type AnalyticsEvent =
  // Top-of-funnel
  | 'landing_view'              // hit any product landing
  | 'virtual_tryon_seo_view'    // hit /virtual-try-on (SEO landing)
  | 'tryon_view'                // hit the try-on app

  // Auth
  | 'signup_click'              // clicked Google / email login

  // Try-on app activity
  | 'photo_upload'              // uploaded user photo or clothing
  | 'render_start'              // hit Generate
  | 'render_complete'           // got a result back
  | 'result_share'              // tapped share
  | 'result_download'           // tapped download

  // Paywall + checkout
  | 'paywall_view'              // landed on /paywall
  | 'plan_select'               // clicked one of the plan cards
  | 'promo_code_view'           // saw the AGALAZ15 banner
  | 'promo_code_copy'           // copied the code
  | 'initiate_checkout'         // started Stripe checkout
  | 'credits_pack_purchase'     // clicked a pack from in-app credit shop
  | 'trial_start'               // legacy: started subscription trial
  | 'subscription_success'      // subscription confirmed
  | 'credits_purchased';        // returning from successful Stripe redirect

type Props = Record<string, string | number | boolean | null>;

/**
 * Map internal funnel events → Meta Pixel standard events. Standard events
 * (vs custom) let Meta apply machine learning across all advertisers and
 * power conversion campaigns, Advantage+ optimization and Lookalikes.
 *
 * Mapping rationale:
 *   - photo_upload        → AddToCart       (user committed a photo; intent shown)
 *   - render_start        → InitiateCheckout (clicked Generate; strongest pre-result signal)
 *   - render_complete     → Lead            (got value from the product; key Meta optimization goal)
 *   - signup_click        → CompleteRegistration
 *   - initiate_checkout   → InitiateCheckout (Stripe redirect — duplicates render_start by design;
 *                                              Meta dedupes by eventID if you wire it later)
 *   - subscription_success / credits_purchased → Purchase (highest-value)
 *   - paywall_view        → ViewContent (saw pricing — weak intent, useful for retargeting funnels)
 *
 * Events not in this table fall back to a custom event with the internal name.
 */
const META_PIXEL_MAP: Partial<Record<AnalyticsEvent, string>> = {
  photo_upload: 'AddToCart',
  render_start: 'InitiateCheckout',
  render_complete: 'Lead',
  signup_click: 'CompleteRegistration',
  initiate_checkout: 'InitiateCheckout',
  subscription_success: 'Purchase',
  credits_purchased: 'Purchase',
  credits_pack_purchase: 'Purchase',
  paywall_view: 'ViewContent',
};

function newEventId(): string {
  // Used to dedupe the browser Pixel hit and the server-side CAPI hit in Meta.
  // crypto.randomUUID is available in all modern browsers and Node 18+.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as { randomUUID: () => string }).randomUUID();
  }
  return Date.now() + '-' + Math.random().toString(36).slice(2);
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(name + '='))
    ?.split('=')[1];
}

/**
 * Fire an analytics event to all configured providers.
 * Safe to call from server components — provider calls are guarded so they
 * no-op outside the browser. Failures in one provider don't affect the other.
 */
export function track(event: AnalyticsEvent, props?: Props): void {
  // Vercel Analytics — custom events (Pro plan).
  try {
    vercelTrack(event, props);
  } catch {
    // Vercel SDK may throw before the page is hydrated; ignore.
  }

  if (typeof window !== 'undefined') {
    // Datafast — client-side queue.
    try {
      (window as any).datafast?.(event, props);
    } catch {
      // Datafast queue may not be initialized yet; ignore.
    }

    // Meta Pixel — map to standard events where possible, custom otherwise.
    // We generate one shared event_id and pass it to BOTH the browser Pixel
    // and the server-side Conversions API so Meta dedupes the duplicate hit.
    const standardEvent = META_PIXEL_MAP[event];
    const metaEventName = standardEvent ?? event;
    const eventId = newEventId();

    try {
      const fbq = (window as any).fbq as ((...args: unknown[]) => void) | undefined;
      if (fbq) {
        if (standardEvent) {
          fbq('track', standardEvent, props ?? {}, { eventID: eventId });
        } else {
          fbq('trackCustom', event, props ?? {}, { eventID: eventId });
        }
      }
    } catch {
      // Pixel not loaded yet (slow connection / blocked by adblock); ignore.
    }

    // Meta Conversions API (server-side mirror) — recovers iOS 14.5+ ATT
    // attribution that the browser Pixel can't track. Same event_id as the
    // Pixel hit above, so Meta dedupes. Best-effort: never blocks the user
    // flow if it fails (token missing, adblock, network).
    try {
      const payload = {
        eventName: metaEventName,
        eventId,
        eventSourceUrl: window.location.href,
        fbp: readCookie('_fbp'),
        fbc: readCookie('_fbc'),
        customData: (props ?? {}) as Record<string, unknown>,
      };
      // keepalive lets the request finish even if the user navigates away
      // mid-track (common for Purchase events on a Stripe redirect).
      fetch('/api/meta-capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Pixel already fired; CAPI is a recovery channel, not the primary.
      });
    } catch {
      // ignore
    }
  }
}
