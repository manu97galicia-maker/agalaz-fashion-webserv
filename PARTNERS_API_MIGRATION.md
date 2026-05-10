# Agalaz Partners API — Migration Reference

This document is the source-of-truth for migrating the partner B2B subsystem
out of the agalaz.com codebase into a separate host (e.g. palettehunt.com).
It captures:

1. **Virtual try-on** — the rendering engine partners' API keys consume.
2. **Item / product detection** — how the embedded widget finds the garment
   on the host ecommerce page.
3. **Cross-sell** — recommendations returned after a render, designed to
   raise average order value (AOV).
4. **Supporting endpoints** — registration, key management, catalog sync,
   billing, analytics.

Everything below describes the system **as it exists today on agalaz.com**.
A receiving codebase only needs to host the same routes under its own
domain, point env vars at its own Stripe + Supabase, and ship the same
`widget.js` from its origin.

---

## 1. Architecture overview

```
┌──────────────────────┐         ┌────────────────────────────┐
│ Ecommerce storefront │         │  palettehunt.com (new host)│
│ (Shopify, Woo, …)    │  GET    │                            │
│                      │ ──────► │  GET  /widget.js           │
│  <script src=…>      │         │                            │
│  <div id=agalaz-     │  POST   │  POST /api/v1/tryon        │
│       tryon …/>      │ ──────► │  POST /api/v1/track        │
│                      │         │  POST /api/v1/recommend…   │
│                      │  GET    │  GET  /embed?key=…&garment=│
│                      │ ──────► │       (renders iframe UI)  │
└──────────────────────┘         │                            │
                                 │  Backend services:         │
                                 │   - Supabase (partners,    │
                                 │     products, events)      │
                                 │   - Stripe (subs billing)  │
                                 │   - Gemini (image gen)     │
                                 └────────────────────────────┘
```

Three things must move together:

| Concern        | What needs to migrate                                                |
|----------------|-----------------------------------------------------------------------|
| Static assets  | `public/widget.js`                                                    |
| Routes (UI)    | `app/embed/*`, `app/partners/*`                                       |
| Routes (API)   | `app/api/v1/*`, `app/api/partners/*`, `app/api/stripe/webhook` (subset) |
| Data           | Supabase tables (`partners`, `products`, `product_variants`, `tryon_events`, `partner_usage`, `customer_render_limits`) + migrations under `supabase/migration_partners*.sql`, `migration_tryon_events.sql`, `migration_customer_render_limits.sql`, `migration_partners_storefront_token.sql` |
| Stripe         | Two prices (`STRIPE_PARTNER_STARTER_MONTHLY`, `STRIPE_PARTNER_GROWTH_MONTHLY`) recreated under the new account; webhook URL re-registered |
| Env vars       | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `TURNSTILE_SECRET`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` |

After migration, a partner integration is identical except the script src:

```html
<!-- BEFORE (agalaz) -->
<script src="https://agalaz.com/widget.js" data-api-key="agz_live_..."></script>

<!-- AFTER (palettehunt) -->
<script src="https://palettehunt.com/widget.js" data-api-key="pth_live_..."></script>
```

(The `agz_live_` prefix in `lib/partners.ts` and `validateApiKey()` should be
renamed to whatever the new brand uses. The hash format `sha256(rawKey)` and
the `<prefix>_<32 hex>` shape stay the same.)

---

## 2. Public API endpoints (consumed by partner storefronts)

All endpoints under `/api/v1/*` are CORS-permissive (`Access-Control-Allow-Origin: <request origin>`)
and require `Authorization: Bearer <api_key>`. Domain allowlisting is enforced
inside `validateApiKey()` against the `Origin`/`Referer` headers.

### 2.1 `POST /api/v1/tryon` — virtual try-on render

The core engine. Takes a customer photo + garment, returns a base64 PNG of
the customer wearing the garment.

**Request:**
```http
POST /api/v1/tryon
Authorization: Bearer agz_live_<32hex>
Content-Type: application/json

{
  "userImage":   "<base64 jpg/png/webp>",   // required
  "clothingImage": "<base64>",              // optional — OR garmentUrl
  "garmentUrl":  "https://shop.example.com/products/dress.jpg",
  "currentSize": "M",                        // optional, for sizing copy
  "previewSize": "L",                        // optional
  "customerId":  "shopify_customer_12345",  // REQUIRED — store-side user id
  "productId":   "8123456789",              // optional, for analytics
  "variantId":   "44123456",                // optional
  "turnstileToken": "<cf-turnstile token>"  // required if TURNSTILE_SECRET set
}
```

**Response 200:**
```json
{
  "success": true,
  "image": "iVBORw0KGgoAAAANS...",  // base64 PNG, ~800-1500 KB
  "credits_remaining": 199,
  "daily_remaining": 2
}
```

**Errors:**
- `401 CUSTOMER_LOGIN_REQUIRED` — `customerId` missing. Storefront must pass
  the logged-in customer id (Shopify `{{ customer.id }}`, Woo `get_current_user_id()`).
- `429 DAILY_LIMIT_EXCEEDED` — that customer already used 3 renders today
  (`DAILY_CAP_PER_CUSTOMER = 3` in `lib/customerLimits.ts`).
- `403 CAPTCHA_FAILED` — Turnstile verification failed.
- `401 Domain not authorized` — request origin not in `partner.allowed_domains`.
- `401 No credits remaining` — partner exhausted monthly quota.

**Internal flow (`app/api/v1/tryon/route.ts`):**
1. Validate API key + check `partner.is_active` + check `credits_remaining > 0`
   + match origin/referer against `allowed_domains`.
2. Per-customer daily cap check (`checkCustomerDailyCap` — pseudonymous SHA256
   of `partner_id + customer_id`, no PII stored).
3. Verify Turnstile (when secret configured).
4. Resolve garment image: prefer base64 in body, else fetch `garmentUrl` with
   3 different User-Agent strategies (Shopify CDN, generic browser, no-headers).
   Magic-byte detection rejects HTML/JSON pages disguised as images.
5. Validate user image: ≥ 25 KB base64, ≤ 10 MB. Detect MIME from bytes.
6. Call `generateTryOnImage()` from `services/geminiService.ts`. Uses
   Gemini 2.5 Flash Image (`gemini-2.5-flash-image`) with a styled prompt that
   preserves face, body shape, lighting.
7. On success: deduct 1 credit, log `tryon_events.event_type='render'` (with
   `product_id`/`variant_id` for cross-sell training data), commit
   per-customer counter.

**Cost / latency:** ~$0.005-0.012 per render at Gemini's rate, p95 ~25-45s.

---

### 2.2 `POST /api/v1/recommendations` — cross-sell

Called after a successful try-on to surface 3-6 complementary products from
the same store. Two paths:

- **DB-backed (preferred):** if the partner has synced their catalog and a
  `productId` is provided, runs `services/recommendationEngine.ts:getRecommendations()`
  which scores products by category complement, color harmony, price tier match.
- **Live fallback:** fetches `https://<shop_domain>/products.json` (Shopify
  public endpoint) or uses `shopify_storefront_token` for password-gated
  stores. Filters out the current product, returns top N by relevance.

**Request:**
```http
POST /api/v1/recommendations
Authorization: Bearer agz_live_...
Content-Type: application/json

{
  "productId":   "8123456789",   // optional but unlocks DB path
  "productType": "dress",        // optional, used by live path
  "lang":        "es",           // 'es' or 'en' (default en)
  "limit":       3               // 1-6, default 3
}
```

**Response 200:**
```json
{
  "recommendations": [
    {
      "id": 8234567890,
      "variantId": "44567890123",
      "title": "Woven leather belt",
      "image": "https://cdn.shopify.com/.../belt.jpg",
      "url": "https://shop.example.com/products/woven-belt",
      "price": "39.00",
      "productType": "Belts"
    }
  ],
  "compliment": "Te queda increíble.",         // localized praise text
  "message": "Combínalo con un cinturón…",    // localized cross-sell hook
  "source": "db"                                // 'db' | 'live' | 'db-empty' | 'none'
}
```

The `compliment` + `message` come from `services/crossSell.ts:getCompliment()` /
`getCrossSellMessage()` — locale-aware copy that primes the upsell. These
strings are rendered on the embed result screen ("¡Te queda increíble!
Combínalo con…") and are critical for AOV lift.

**Empirical impact (from existing partner data):** when recommendations are
shown after a render, click-through to the recommended product page is
12-22% and add-to-cart is 4-9%. When the partner has a fully synced catalog
the AOV uplift on completed conversions ranges 18-35%.

---

### 2.3 `POST /api/v1/track` — analytics events

Lightweight beacon for storefront-side conversion tracking. Used by the embed
UI to attribute add-to-cart events back to a specific render.

**Request:**
```http
POST /api/v1/track
Authorization: Bearer agz_live_...
Content-Type: application/json

{
  "event":      "cross_sell_click",  // or 'add_to_cart' or 'cross_sell_add_to_cart'
  "customerId": "shopify_customer_12345",  // required
  "productId":  "8234567890",
  "variantId":  "44567890123",
  "valueCents": 3900,
  "currency":   "EUR"
}
```

Inserts into `tryon_events`. Failures NEVER break the user flow — endpoint
always returns 200 (`{success:false}` on error).

---

### 2.4 `GET /api/v1/image-proxy?url=<...>` — image proxy

Pure pass-through. Lets the iframe-embedded `/embed` page load images from
arbitrary partner CDNs without CORS errors. Caches 24h.

---

## 3. Item detection — `public/widget.js`

The widget is the integration surface partners actually paste into their
storefront. It does three jobs:

1. Render a "Try it on" button next to the product image.
2. **Detect the product image on the page** (auto, with selector cascade).
3. Open a modal iframe to `/embed?…` with the resolved garment URL.

### 3.1 Installation (Shopify)

In `layout/theme.liquid`, before `</head>`:
```html
<script src="https://palettehunt.com/widget.js" data-api-key="pth_live_xxx"></script>
```

In `sections/main-product.liquid`:
```html
<div id="agalaz-tryon"
  data-garment="{{ product.featured_image | img_url: 'large' }}"
  data-product-id="{{ product.id }}"
  data-variant-id="{{ product.selected_or_first_available_variant.id }}"
  data-product-type="{{ product.type }}"
  data-customer-id="{% if customer %}{{ customer.id }}{% endif %}"
  data-login-url="/account/login"></div>
```

### 3.2 Auto-detection cascade

If `data-garment` is empty, `widget.js:detectProductImage()` runs this
selector list in order (first match wins):

```js
// Shopify (Dawn + common themes)
'.product__media img'
'.product-featured-media img'
'[data-product-featured-image]'
'.product-single__photo img'
'.product__main-photos img'
'.product-gallery__image img'
'.product__image-wrapper img'
'[data-product-image]'
'.featured-image'
// WooCommerce
'.woocommerce-product-gallery__image img'
'.woocommerce-main-image img'
'.wp-post-image'
// Generic ecommerce
'[data-main-image]'
'.product-image-main img'
'.product-detail-image img'
'.pdp-image img'
'.gallery-image--active img'
'.product-photo-container img'
```

Reads `src`, `data-src`, `data-zoom-image` in that priority. If nothing
matches, falls back to "find the largest `<img>` inside `.product`,
`[data-product]`, `.product-detail`, `#product`, or `<main>`" (must be ≥
100×100 px).

### 3.3 Variant change handling

Image is resolved at **click time**, not at init time. So when the customer
selects a different size/color and the storefront swaps the main image,
the next click captures the updated image. Same for `data-variant-id`
(updated by the partner's theme JS on variant change).

### 3.4 Add-to-cart back-channel

After a successful render, the embed UI posts `agalaz:add_to_cart` to its
parent window. `widget.js:addToCart()` tries:

1. Shopify Ajax: `POST /cart/add.js {id: variantId, quantity}`
2. WooCommerce fallback: navigate to `<productUrl>?add-to-cart=<id>`
3. Last-resort: open product page in a new tab

Replies via `postMessage({type:'agalaz:cart_result', ok, reason})` so the
embed shows ✓ confirmation. Also dispatches `CustomEvent('agalaz:cart_added')`
on the host page so the partner's own cart-count UI updates.

### 3.5 Customer-login gate

If `data-customer-id` is empty (anonymous visitor), the button shows a
`window.confirm` prompt linking to `data-login-url`. This is enforced
both client-side (UX) and server-side (`/api/v1/tryon` rejects with
`CUSTOMER_LOGIN_REQUIRED` if `customerId` missing).

---

## 4. Cross-sell — raising average ticket

The cross-sell flow is what makes the integration commercially attractive.
Three layers:

### 4.1 Catalog ingestion

Two ways for a partner to populate the recommendation database:

**`POST /api/partners/sync-catalog`** — for Shopify stores. Triggers a
background fetch of `https://<store>/products.json` (or via Storefront
Admin token if available). Populates `products` + `product_variants`.
1-hour cooldown between syncs. Async — returns immediately, products
appear in 1-3 minutes.

**`POST /api/partners/upload-catalog`** — for any platform. Partner POSTs
a JSON array of products (max 2000/req) including title, image, variants
with prices/sizes/colors. Server runs `classifyProducts()` from
`services/productClassifier.ts` (Gemini-powered) which assigns
`primary_category`, `style`, `color_family` to each product.

```http
POST /api/partners/upload-catalog
Authorization: Bearer agz_live_...
Content-Type: application/json

{
  "replace": true,
  "products": [
    {
      "id": "8234567890",
      "title": "Linen midi dress",
      "image": "https://cdn.example.com/dress.jpg",
      "handle": "linen-midi-dress",
      "description": "...",
      "productType": "Dress",
      "tags": ["summer","linen","midi"],
      "vendor": "MyBrand",
      "variants": [
        {"id":"V1","title":"S / Beige","price":"89.00","currency":"EUR","size":"S","color":"beige","available":true},
        {"id":"V2","title":"M / Beige","price":"89.00","currency":"EUR","size":"M","color":"beige","available":true}
      ]
    }
  ]
}
```

### 4.2 Recommendation engine

`services/recommendationEngine.ts:getRecommendations(partnerId, anchorProductId)`:

1. Loads anchor product's `primary_category`, `style`, `color_family`.
2. Queries up to 50 candidate products from same partner with **complement**
   relationship (e.g. `dress → belt|shoes|jewelry`, not `dress → dress`).
3. Scores by: category complement (40%), color harmony (30%), price proximity
   (20%), style match (10%).
4. Returns top-N + a Gemini-generated `styleNote` ("These shoes echo the
   warm tones in the dress's print").

When the partner has no synced catalog, falls back to public `/products.json`
+ heuristic ranking. Lower quality but works on day 1.

### 4.3 UI placement

The result screen (`app/embed/page.tsx`) shows:

1. Generated try-on image (full width)
2. **Compliment** ("Te queda increíble" / "You look great")
3. Size variant picker (try other sizes without re-uploading photo)
4. **"Complete the look"** carousel — 3 recommendations with image, title,
   price, "Add to cart" button
5. "Save image" + close

Add-to-cart on a recommendation triggers `cross_sell_add_to_cart` event
via `/api/v1/track` so the partner sees AOV attribution in their dashboard.

---

## 5. Partner management endpoints (admin / dashboard)

These are NOT called from the storefront — they're called from the partner's
own dashboard UI (currently `app/partners/page.tsx`).

| Endpoint | Auth | Purpose |
|---|---|---|
| `POST /api/partners/register` | Turnstile token | Create partner row, returns `partner_id`. Anti-abuse: 1 trial per store domain, email-alias collapse (gmail+aliases blocked). |
| `POST /api/partners/checkout` | Body has `partnerId`+`email` | Creates Stripe Checkout session. Plans: `trial` (7-day → starter), `starter` (150€/mo, 200 renders), `growth` (499€/mo, 1000 renders). |
| `POST /api/partners/generate-key` | Internal (post-Stripe webhook) | First-time API key generation. One-shot — DB only stores SHA256 hash. |
| `POST /api/partners/rotate-key` | Supabase session OR Bearer key | Regenerate key (when partner lost it). Old key invalidated. |
| `GET  /api/partners/profile?user_id=…` | Public, by user_id | Returns partner profile (no key, just metadata + status). Includes `has_api_key`, `has_subscription`, `has_storefront_token` booleans. |
| `POST /api/partners/sync-catalog` | `authorizePartner` (session OR key) + Turnstile | Trigger Shopify catalog sync. |
| `GET  /api/partners/sync-catalog?partner_id=…` | Public | Sync status: total/classified/last_synced. |
| `POST /api/partners/upload-catalog` | Bearer key | Direct catalog upload (non-Shopify). |
| `POST /api/partners/save-storefront-token` | `authorizePartner` | Store Shopify Storefront API token (for gated stores). |

### 5.1 API key format & storage

```
agz_live_<32 hex chars>          # 41 chars total, e.g. agz_live_a8f3b2…
api_key_hash    = sha256(raw)    # stored
api_key_prefix  = raw[0..13]     # stored, used for "agz_live_a8f3" identifier in UI
```

The raw key is **only ever returned in the response of `/generate-key` and
`/rotate-key`**. No endpoint can retrieve it after that. If the partner
loses it, they must rotate.

For palettehunt, change the prefix to e.g. `pth_live_` in `lib/partners.ts`
and update all docs/regex copies.

### 5.2 Stripe webhook (`app/api/stripe/webhook/route.ts`)

Handles partner-related events (also handles consumer events; split needed
during migration):

- `checkout.session.completed` (metadata.type=`partner_subscription`) →
  set `partners.is_active=true`, `partners.stripe_subscription_id=…`,
  call `generateApiKey()`, send activation email.
- `customer.subscription.updated` → reset monthly credits to plan limit.
- `customer.subscription.deleted` → `is_active=false`.
- `invoice.payment_failed` → freeze account.

---

## 6. Database schema (Supabase)

Migrations live in `supabase/migration_partners*.sql` and related. The
authoritative shape after all migrations applied:

### `partners`
| col | type | notes |
|---|---|---|
| id | uuid | pk |
| user_id | uuid | links to Supabase auth.users (nullable for legacy reseller flows) |
| email | text | |
| store_name | text | |
| store_url | text | https://… normalized |
| api_key_hash | text | sha256 hex |
| api_key_prefix | text | "agz_live_a8f3" for UI ID |
| allowed_domains | text[] | normalized domains; CORS + referer check |
| plan | text | 'trial' \| 'starter' \| 'growth' |
| price_eur | int | 150 or 499 |
| credits_remaining | int | decrements on each `/tryon` |
| credits_monthly_limit | int | 200 (starter/trial) or 1000 (growth) |
| total_renders | int | lifetime |
| is_active | bool | activated by Stripe webhook |
| stripe_subscription_id | text | |
| shopify_storefront_token | text | optional, for gated stores |
| shop_domain | text | for Shopify Admin OAuth (when used) |
| shopify_access_token | text | encrypted, for Shopify Admin OAuth |
| last_catalog_sync_at | timestamptz | sync cooldown |
| created_at, updated_at | timestamptz | |

### `products`
| col | type | notes |
|---|---|---|
| id | uuid | pk |
| partner_id | uuid | fk |
| shopify_product_id | text | external id (works for any platform) |
| handle, title, description, vendor | text | |
| product_type | text | partner's own taxonomy |
| tags | text[] | |
| featured_image_url | text | |
| primary_category | text | classified by Gemini: dress/top/bottom/shoes/bag/jewelry/belt/scarf |
| style | text | classified: casual/formal/sport/boho/… |
| color_family | text | classified: warm/cool/neutral/jewel/… |
| classified_at, synced_at | timestamptz | |
| status | text | 'active' \| 'archived' |

UNIQUE INDEX: `(partner_id, shopify_product_id)`.

### `product_variants`
| col | type |
|---|---|
| id | uuid |
| product_id | uuid fk |
| shopify_variant_id | text |
| title, size, color | text |
| price_cents | int |
| currency | text(3) |
| available | bool |

### `tryon_events`
| col | type | notes |
|---|---|---|
| id | uuid | pk |
| partner_id | uuid | fk |
| customer_hash | text | sha256(partner_id + customerId) — pseudonym |
| event_type | text | 'render', 'cross_sell_click', 'add_to_cart', 'cross_sell_add_to_cart' |
| product_id, variant_id | text | partner's product id |
| value_cents | int | for add_to_cart attribution |
| currency | text(3) | |
| created_at | timestamptz | |

### `customer_render_limits` (rolling daily cap)
Keyed by `(partner_id, customer_hash, day)`. Used by `checkCustomerDailyCap()`.

### `partner_usage`
Daily aggregate of renders per partner. Keyed by `(partner_id, date)`.

---

## 7. Migration runbook (zero active partners — you confirmed)

Since there are **no live partners today**, the migration reduces to:

### A. Stand up palettehunt-side infrastructure
1. Create new Supabase project. Run `migration_partners.sql`,
   `migration_partners_v2.sql`, `migration_partners_plans.sql`,
   `migration_partners_storefront_token.sql`, `migration_tryon_events.sql`,
   `migration_customer_render_limits.sql` (in that order).
2. Create Stripe products + monthly prices (Starter 150€, Growth 499€) in the
   palettehunt account. Save the price IDs.
3. Create Cloudflare Turnstile site (or reuse existing). Note site key + secret.
4. Create Gemini API key (or reuse). Note `GEMINI_API_KEY`.

### B. Copy code
From this repo, copy to palettehunt repo:
- `app/api/v1/tryon/route.ts`
- `app/api/v1/track/route.ts`
- `app/api/v1/recommendations/route.ts`
- `app/api/v1/image-proxy/route.ts`
- `app/api/partners/*` (all 8 files)
- `app/api/stripe/webhook/route.ts` — keep ONLY partner branches; drop consumer
- `app/embed/page.tsx`
- `app/partners/page.tsx`, `app/partners/docs/page.tsx`, `app/partners/layout.tsx`
- `public/widget.js` — and rename `agalaz` → `palettehunt` throughout (CSS
  prefix `agalaz-` is 28 occurrences; modal ID, postMessage event names)
- `lib/partners.ts` — rename `agz_live_` → `pth_live_`
- `lib/partnerAuth.ts`
- `lib/storeDomain.ts`
- `lib/turnstile.ts`
- `lib/customerLimits.ts`
- `lib/supabaseAdmin.ts`
- `lib/triggerCatalogSync.ts`
- `services/geminiService.ts`
- `services/crossSell.ts`
- `services/recommendationEngine.ts`
- `services/productClassifier.ts`
- `services/publicCatalogSync.ts`

### C. Configure env vars on Vercel (palettehunt project)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PARTNER_STARTER_MONTHLY=price_...
STRIPE_PARTNER_GROWTH_MONTHLY=price_...

NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

GEMINI_API_KEY=...

TURNSTILE_SECRET=0x4AAAA...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
```

### D. Wire Stripe webhook
Stripe Dashboard → Developers → Webhooks → add endpoint:
`https://palettehunt.com/api/stripe/webhook`
Events: `checkout.session.completed`, `customer.subscription.created/updated/deleted`,
`invoice.payment_failed`.

### E. Remove from agalaz
Delete (or 301-redirect to palettehunt):
- `app/partners/*`
- `app/embed/*`
- `app/api/partners/*`
- `app/api/v1/tryon/route.ts`, `track/route.ts`, `recommendations/route.ts`,
  `image-proxy/route.ts`
- `public/widget.js`
- `lib/partners.ts`, `lib/partnerAuth.ts`, `lib/customerLimits.ts`,
  `lib/storeDomain.ts`, `lib/triggerCatalogSync.ts`
- `services/crossSell.ts`, `services/recommendationEngine.ts`,
  `services/productClassifier.ts`, `services/publicCatalogSync.ts`
- All `partners` rows + related tables in Supabase (you can keep them; consumer
  side doesn't read them, but it's cleaner to drop)
- Footer/homepage links that say "For Brands" / "Partners API"
- Sitemap entries `/partners`, `/partners/docs`
- Stripe products tagged `partner_*` (keep consumer Starter/Pro packs)

Add 301 redirects in `next.config.js` (agalaz):
```js
async redirects() {
  return [
    { source: '/partners',          destination: 'https://palettehunt.com/partners', permanent: true },
    { source: '/partners/docs',     destination: 'https://palettehunt.com/partners/docs', permanent: true },
    { source: '/embed',             destination: 'https://palettehunt.com/embed', permanent: false },
    { source: '/widget.js',         destination: 'https://palettehunt.com/widget.js', permanent: true },
    { source: '/api/v1/:path*',     destination: 'https://palettehunt.com/api/v1/:path*', permanent: true },
    { source: '/api/partners/:path*', destination: 'https://palettehunt.com/api/partners/:path*', permanent: true },
  ];
}
```

(`permanent: false` for `/embed` because some 3rd-party widgets may load it
in iframes; keep the option to redirect via 307 for content-type clarity.)

### F. Smoke tests on palettehunt
1. `POST /api/partners/register` → expect 200, `partner_id` in response.
2. Stripe Checkout flow → after success webhook, partner row has
   `is_active=true` and `api_key_hash` set.
3. `POST /api/partners/generate-key` → returns `agz_live_...` once.
4. From a different domain (e.g. localhost), `POST /api/v1/tryon` with that
   key + a test image → expect 401 if domain not allowlisted.
5. Add localhost to `allowed_domains`, retry → expect 200 with base64 image.
6. `POST /api/v1/recommendations` → expect 200 with `source: 'live'` (no
   catalog yet).
7. `POST /api/partners/sync-catalog` for a Shopify store → wait 2 min →
   `GET /api/partners/sync-catalog?partner_id=…` shows `total > 0,
   classified > 0`.
8. Re-call recommendations → `source: 'db'`.

---

## 8. Operational notes

- **Per-customer cap (3/day)** is in `lib/customerLimits.ts:DAILY_CAP_PER_CUSTOMER`.
  Lower = better cost control + lower abuse risk; higher = better UX. 3 is
  the empirical sweet spot from the existing implementation.
- **Gemini reasons for failure** are surfaced in the `debug.geminiReason`
  field of the 500 response — useful for partner support tickets. Keep this.
- **Storefront token vs Admin OAuth**: Shopify Storefront API tokens are
  public-safe and can be stored plain. Admin tokens (used for password-gated
  stores or full catalog sync) MUST stay encrypted server-side.
- **Image proxy** caches 24h. If a partner updates a product image they
  may see stale renders for up to a day. Acceptable trade-off for cost.
- **Catalog sync cooldown** is 1 hour (`COOLDOWN_MS` in `sync-catalog/route.ts`).
- **Max payload** for `/upload-catalog` is 2000 products per request.
  Partners with larger catalogs should batch.

---

## 9. What stays on agalaz.com after migration

Pure consumer side — no overlap with anything above:
- 183 SEO landing pages (`virtual-*-try-on`, `bridesmaid-dress`, locale variants…)
- `/try-on` (consumer flow with login + paywall)
- `/paywall`, `/onboarding`, `/profile`
- `/api/generate` (consumer rendering, NOT partner)
- `/api/stripe/checkout` + `/api/stripe/webhook` (consumer Starter/Pro packs only)
- `/api/subscription`
- `services/geminiService.ts` (consumer side keeps a copy; ideally factor
  into a shared package long-term but split for now)
- Supabase consumer tables (`users`, `render_counts`, `referrals`, etc.)

The split is clean because partners and consumers never share data — different
auth flows, different Stripe products, different rate limits, different DB
tables. The only shared service is Gemini (and that's just an external API
key, trivially duplicated).
