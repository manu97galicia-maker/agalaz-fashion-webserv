# Apple Pay — domain verification

Stripe Checkout already supports Apple Pay (via `payment_method_types: ['card']`
in `app/api/stripe/checkout/route.ts` and `app/api/partners/checkout/route.ts`),
but the wallet button stays hidden until Apple verifies the merchant domain.

## One-time setup (5 minutes)

1. **Stripe Dashboard** → Settings → Payment methods → Apple Pay → "Add new
   domain" → enter `agalaz.com`.
2. Stripe shows a **"Download verification file"** link. Save the downloaded
   file (no extension; ~2KB plaintext starting with a long hex/base64 string).
3. Commit it to the repo at:
   `public/.well-known/apple-developer-merchantid-domain-association`
   (Next.js serves files in `public/` at the site root, so the live URL becomes
   `https://agalaz.com/.well-known/apple-developer-merchantid-domain-association`.)
4. Push + wait ~1 min for Vercel to deploy.
5. Back in Stripe Dashboard, click **"Verify"** next to `agalaz.com` — should
   turn green within seconds.

After verification, Apple Pay appears automatically in the Stripe Checkout
payment sheet on iOS / macOS Safari (no further code change needed).

## Google Pay

Works automatically on Android Chrome with `payment_method_types: ['card']` —
no domain verification required.

## Stripe Link (optional, higher conversion)

To enable Stripe Link (auto-fills saved cards across Stripe merchants):
- Either enable it in Stripe Dashboard → Payment methods → Link
- Or change the checkout call to `payment_method_types: ['card', 'link']`

Link does NOT require domain verification.
