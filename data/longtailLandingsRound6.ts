/**
 * Round-6 landings — based on actual Google Search Console query data
 * showing impressions but 0 clicks because we have no dedicated page yet.
 *
 *  /how-to-style-oversized-clothes — 36 imp/mo already from Google with
 *  no dedicated landing. High-intent informational query, Pinterest +
 *  TikTok dominate SERP. Realistic top 10 in 4-8 weeks.
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

export const howToStyleOversizedClothes: LongtailContent = {
  lang: 'en',
  category: 'clothing',
  productLabel: 'Oversized piece reference',
  accent: 'hair',

  badge: 'Oversized Styling · AI Try-On',
  h1Top: 'How to style oversized clothes',
  h1Italic: 'without looking sloppy.',
  hero:
    "Oversized clothes are everywhere in 2026 — sweatshirts, blazers, jeans, button-downs, tees. But the line between 'effortless cool' and 'frumpy' is razor thin. This guide shows you the exact rules that keep oversized looking intentional, plus an AI try-on so you can see the look on YOUR body before buying.",
  ctaPrimary: 'Try oversized on me',
  ctaCaption: 'Free · No download · 30 sec',

  whatTitle: 'Why oversized goes wrong',
  whatBody:
    "Most 'sloppy oversized' fails come from one mistake: pairing oversized with MORE oversized. An oversized tee + baggy jeans + chunky sneakers = 0 defined silhouette, just a pile of fabric. The rule that 90% of TikTok 'effortless oversized' videos miss telling you: oversized clothes work ONLY when paired with something fitted. The fitted element creates the contrast that reads as intentional design rather than 'I gave up today'.",
  howKnowTitle: 'The 4 rules that make oversized look intentional',
  howKnowBullets: [
    'Rule 1 — Define one silhouette point: waist, ankles, or wrists. NEVER all three loose.',
    'Rule 2 — Pair oversized with fitted. Oversized tee → fitted pants. Oversized pants → fitted top.',
    'Rule 3 — Tuck strategically: front tuck, full tuck, half tuck. NEVER let an oversized top hang fully untucked unless it has structure (boxy fit, structured shoulders).',
    'Rule 4 — Shoes matter more than you think. Sleek shoe (boot, loafer, ballet flat) anchors oversized. Chunky sneaker adds bulk — only works if everything else is REALLY fitted.',
    'Rule 5 — Color: monochromatic oversized reads chic. Multi-color oversized reads chaotic. Same-tone outfits hide the volume.',
  ],

  recommendedBadge: '2026 Outfit Formulas',
  recommendedTitle: 'Oversized formulas that always work',
  recommended: [
    { name: 'Oversized blazer + fitted everything', why: "The 'borrowed from boyfriend' look: oversized blazer (size up 1-2) + fitted tee + skinny jeans or slip dress + loafers. Define waist with a thin belt under the blazer for extra polish." },
    { name: 'Oversized sweatshirt + bike shorts', why: 'Athleisure but elevated. Oversized sweatshirt (hip-length minimum) + bike shorts + chunky sneakers. The legs visible below create the silhouette contrast.' },
    { name: 'Oversized button-down + slip skirt', why: "French-girl-meets-Brooklyn. Oversized button-down (men's medium for women, half-tucked into a slip skirt or midi skirt + ankle boots." },
    { name: 'Boyfriend jeans + fitted tank', why: 'Oversized denim works ONLY if the top is genuinely fitted (tank, bodysuit, ribbed tee). Tuck the front of the tank to define waist.' },
    { name: 'Oversized turtleneck + slim trousers', why: 'Sophisticated minimalism. Oversized chunky-knit turtleneck (cropped or hip-length) + tailored slim trousers + ankle boots. Black-on-black is foolproof.' },
    { name: 'Tee dress + oversized cardigan', why: 'Cozy without being shapeless. Fitted tee dress (or shift dress) under an oversized cropped cardigan + sneakers or boots.' },
    { name: 'Oversized hoodie + denim cutoffs', why: 'Summer streetwear. Oversized hoodie (hits mid-thigh) + denim shorts + slim sneakers. Adds movement without bulk.' },
    { name: 'Oversized jacket + fitted dress', why: 'The "Olivia Rodrigo at airport" look. Oversized leather or denim jacket draped over fitted slip dress or mini dress + chunky boots.' },
  ],

  avoidBadge: 'Sloppy mistakes',
  avoidTitle: "5 ways oversized goes sloppy (avoid these)",
  avoid: [
    { name: 'Oversized top + oversized bottom + sneakers (the trifecta of sloppy)', why: "If three items in the outfit are loose, you've lost the silhouette. At minimum one piece must be defined." },
    { name: 'Letting the hem hang past the buttocks without a tuck', why: 'An oversized shirt that fully covers your hips without tuck reads as "I borrowed this." Half-tuck or full-tuck.' },
    { name: 'Bra straps + boxy oversized = visible mess', why: 'Oversized cuts often have wide necklines. If your bra straps show, the whole look reads unfinished. Use a strapless bra or skip.' },
    { name: 'Bulky shoes with bulky outfit', why: 'Chunky dad sneakers + oversized pants + oversized top = goblin mode. If you want chunky shoes, top half must be fitted.' },
    { name: 'Wrinkled / unkempt oversized fabric', why: "Oversized works because it looks 'intentionally relaxed', not 'I forgot to iron'. Steam or iron oversized linen/cotton before wearing." },
  ],

  midCtaTitle: 'See oversized on your body — without buying',
  midCtaBody:
    "Reading rules is one thing. Seeing the oversized blazer on YOUR shoulders, YOUR torso, YOUR proportions — different. Upload your photo, drop a screenshot of the oversized piece you're considering, and AI shows you the fit in 30 seconds. Before $80-200 on something that might look like a sack.",
  midCtaButton: 'Try oversized on my photo',

  faqTitle: 'Frequently asked',
  faq: [
    {
      q: 'How do you style oversized clothes without looking sloppy?',
      a: 'The single most important rule: never wear oversized everything. At minimum one piece in the outfit MUST be fitted (top OR bottom — not both loose). Add a defining element: belt, tuck, fitted shoe, or skin showing (ankles, wrists, neckline). Choose monochromatic colors to camouflage volume.',
    },
    {
      q: 'Can short people wear oversized clothes?',
      a: "Yes — but with proportional adjustments. Petite (under 5'4): choose 'cropped oversized' (cropped sweatshirts, cropped blazers) instead of full-length oversized that would swallow you. Show ankle or wrist skin to break the volume. Avoid 'borrowing dad's clothes' look — go up 1 size MAX, not 3.",
    },
    {
      q: 'Are oversized blazers still in style in 2026?',
      a: 'Yes — even more than 2024. Oversized blazers have moved from "occasional outfit" to "wardrobe core piece" status. Pair with tailored bottoms (slim trousers, slip skirts, skinny jeans) for max longevity.',
    },
    {
      q: 'What body types suit oversized clothes?',
      a: "All body types — but with different styling. Slim: oversized adds visual mass, great for athletic builds. Curvy: oversized hides curves but if you tuck or belt, you reclaim shape. Petite: cropped oversized only. Tall: oversized is your playground, almost everything works.",
    },
    {
      q: 'Can the AI try-on really show me how oversized clothes will look on my body?',
      a: 'Yes. Upload your photo + a reference of the oversized piece (Pinterest, Instagram, store listing). The AI fits the piece to your real body proportions in 30 seconds, showing whether the volume drapes well on you, where the hem lands, and whether the silhouette reads "intentional oversized" or "swimming in fabric". First render free.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=clothing',
};

/**
 *  /chrome-nails-2026 — captures the chrome nails cluster appearing in
 *  Google SERPs but with no dedicated landing: chrome french nails,
 *  chrome nail ideas, chrome nails design 2026, chrome nails for spring
 *  2026, chrome nails trend 2026, chrome pastels, chrome pedicure ideas,
 *  pastel chrome nails 2026.  Pinterest + small nail blogs dominate the
 *  top 10 — soft SERP, achievable for a young domain.
 */
export const chromeNails2026: LongtailContent = {
  lang: 'en',
  category: 'nail',
  productLabel: 'Chrome design reference',
  accent: 'nail',

  badge: 'Chrome Nails 2026 · AI Try-On',
  h1Top: 'Chrome Nails',
  h1Italic: 'on your hands, 2026 edition.',
  hero:
    "Chrome nails are dominating 2026 — pastel chrome, mirror chrome, french chrome, chrome pedicures. Try every chrome design on your real hand with AI in 30 seconds before paying $80 at the salon. From the iconic glazed-donut milky chrome (Hailey Bieber) to the dramatic full-mirror metallics — see how each finishes on YOUR nail bed.",
  ctaPrimary: 'Try chrome nails',
  ctaCaption: 'Free · No download · 30 sec',

  whatTitle: 'Why chrome nails are 2026\'s biggest trend',
  whatBody:
    "Chrome nails started as a niche trend in 2022, exploded with Hailey Bieber's 'glazed donut' moment, and in 2026 they've matured into a category with multiple sub-styles: full-mirror chrome (high-impact), pastel chrome (softer for everyday), french chrome (chrome tips with neutral base), and glazed-donut chrome (creamy pearlescent base + chrome dust). The advantage: chrome is one of the few salon-only techniques where you really can't predict the result from a Pinterest pin — the powder reacts differently on different nail beds. Trying it virtually first SAVES you the salon trip wasted on the wrong undertone.",
  howKnowTitle: 'Before booking the salon',
  howKnowBullets: [
    'Take a clear photo of your hand (flat, well-lit)',
    'Upload a reference of the chrome design (Pinterest, Instagram, salon portfolio)',
    'AI applies the exact chrome finish to your real nails in 30 seconds',
    'Compare full-mirror vs pastel chrome vs french chrome side by side',
    'Identify whether warm chrome (gold-toned) or cool chrome (silver-blue toned) suits your skin undertone',
  ],

  recommendedBadge: '2026 Chrome Styles',
  recommendedTitle: 'Chrome nail designs to try',
  recommended: [
    { name: 'Glazed donut chrome (Hailey Bieber classic)', why: "Creamy pearlescent base + light chrome dust. The most-copied chrome look since 2023, still going strong in 2026. Works on every skin tone, every nail shape, every occasion." },
    { name: 'Mirror chrome — full silver', why: "High-impact full-mirror finish on every nail. Statement nails for events, photoshoots, or just bold confidence. Best on short-to-medium almond shapes." },
    { name: 'Pastel chrome 2026 (the rising trend)', why: "Soft pink, baby blue, mint, lilac chrome — the softer, dreamier evolution. Big on TikTok 2026 #pastelchromenails. Perfect for spring/summer." },
    { name: 'Chrome french tips', why: "Classic french manicure but the tips are chrome instead of white. Modern + sophisticated. Works for weddings, office, evening events." },
    { name: 'Chrome pedicure', why: "Chrome on toes is dramatic and unexpected. Mirror chrome or rose-gold chrome on a fresh pedicure = vacation-ready in 30 minutes." },
    { name: 'Holographic chrome', why: "Rainbow-shift chrome that changes color with the light. Most chrome trend pic on Pinterest 2026. Best on coffin or almond shapes for max surface area." },
    { name: 'Chrome accent nail', why: "Apply chrome to ONE nail only (typically ring finger) + neutral on the rest. Sophisticated way to wear chrome without going full-mirror." },
    { name: 'Chrome ombre', why: "Gradient from clear/nude base to full chrome tip. Combines glazed-donut softness with chrome impact." },
  ],

  avoidBadge: 'Chrome mistakes',
  avoidTitle: "Chrome nail mistakes that look cheap",
  avoid: [
    { name: 'Skipping the no-wipe top coat', why: "Chrome powder NEEDS a no-wipe gel top coat — regular top coat dulls the mirror effect immediately. If the salon doesn't have it, walk out." },
    { name: 'Cheap chrome powder', why: "Bargain-bin chrome powders look matte-silver rather than mirror. Quality brands (Nailpro, Born Pretty, OPI) make the difference between '5-star Pinterest' and 'flat aluminum foil'." },
    { name: 'Wrong undertone for your skin', why: "Cool-undertone chrome (silver-blue) on warm skin = washed out hands. Warm-undertone chrome (gold-rose) on cool skin = harsh contrast. Test virtually first to find your undertone match." },
    { name: 'Combining chrome with 5 other techniques on the same nail', why: "Chrome is a statement. Adding glitter + 3D charms + decals + french tips on top of chrome makes the chrome itself invisible. Keep chrome clean." },
  ],

  midCtaTitle: 'See chrome on your skin tone first',
  midCtaBody:
    "Chrome reacts differently on different skin undertones. Cool-toned chrome on warm hands looks dim. Warm-toned chrome on cool hands looks harsh. The AI shows you exact undertone match on YOUR real hand in 30 seconds — before paying $60-90 for the wrong chrome at the salon. First render free, no card.",
  midCtaButton: 'Try chrome on my hands',

  faqTitle: 'Frequently asked',
  faq: [
    {
      q: 'What are the chrome nail trends for 2026?',
      a: "Pastel chrome (softer pink, baby blue, mint, lilac) is the dominant 2026 evolution. Full-mirror chrome remains classic. Chrome french tips and chrome accent nails are office-friendly versions. Holographic chrome is the high-impact trend pic. Chrome pedicures are growing fast.",
    },
    {
      q: 'How long do chrome nails last?',
      a: 'With a proper no-wipe gel top coat and gel base: 2-3 weeks before lift-off. Without the no-wipe top coat: chrome can dull in 24-48 hours. Always confirm the salon uses no-wipe top coat over chrome before booking.',
    },
    {
      q: 'Can chrome be done at home or only at salon?',
      a: "Home application is possible with a chrome powder kit + applicator + LED lamp + no-wipe top coat. Skill curve: medium. Most people end up with a 'partial chrome / partial dull' result on the first 2-3 attempts. The AI try-on shows you what the final SHOULD look like, so you know whether your DIY result matches or not.",
    },
    {
      q: 'Does chrome work on short nails?',
      a: 'Yes — short almond and short oval shapes carry chrome beautifully. Short square can look harsh with full-mirror chrome; opt for pastel chrome or chrome french tip if your shape is square + short. Test virtually before booking.',
    },
    {
      q: 'Chrome pedicure — is it worth it?',
      a: "Yes, especially for vacation/wedding/event prep. Chrome on toes is unexpected and photographs incredibly. Rose-gold chrome on bronzed/tanned feet is the highest-impact summer combination. Try the colors on your foot photo before the appointment.",
    },
    {
      q: 'Does the AI render real chrome accurately?',
      a: 'Yes. The AI handles the metallic light-reactive finish that defines chrome — it shows reflections, the depth of the mirror effect, and most importantly how the chrome interacts with your specific skin undertone. It is NOT a flat metallic color overlay; it is rendered as a true chrome surface.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=nail',
};
