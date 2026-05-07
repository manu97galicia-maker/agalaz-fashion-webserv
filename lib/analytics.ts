/**
 * Centralized event tracking. Fires the same event to:
 *   1. Vercel Analytics (custom events — requires Pro plan, paid feature).
 *   2. Datafast (existing client-side analytics queue, pre-existing in this repo).
 *
 * Why a single wrapper:
 *   - Both endpoints get the exact same funnel — no drift between dashboards.
 *   - One call site per event, so adding a 3rd analytics system later is one change.
 *   - Type-safe event names so typos don't silently fragment the data.
 *
 * Vercel custom-events docs:
 *   https://vercel.com/docs/analytics/custom-events
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

  // Onboarding
  | 'onboarding_step'           // moved to next onboarding step
  | 'onboarding_complete'       // finished onboarding

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

  // Datafast — only available client-side after the script loads.
  if (typeof window !== 'undefined') {
    try {
      (window as any).datafast?.(event, props);
    } catch {
      // Datafast queue may not be initialized yet; ignore.
    }
  }
}
