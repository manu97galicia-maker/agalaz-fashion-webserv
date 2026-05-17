/**
 * /kpop-outfits — generalist K-pop outfit try-on landing. Captures the
 * broad cluster across multiple groups (BTS, NewJeans, IVE, aespa,
 * LE SSERAFIM, Stray Kids, TWICE, BLACKPINK, ENHYPEN). For
 * artist-specific deep dives we keep dedicated pages — currently
 * /jungwon-outfits for ENHYPEN's Jungwon — and the Netflix
 * /kpop-demon-hunters-outfits for the animated movie cluster.
 *
 * Addressable cluster from DataForSEO 2026-05-17
 * (tmp/kpop-groups-keywords.json):
 *
 *   kpop outfit                 8,100/mo  KD 1
 *   kpop outfits                8,100/mo  KD 0
 *   kpop fashion                2,400/mo  KD 0
 *   fashion kpop                2,400/mo  KD 0
 *   twice outfit                2,400/mo  KD 0
 *   twice concert outfit        2,400/mo  KD 0
 *   kpop concert outfit         1,600/mo  KD 0
 *   kpop concert outfits        1,600/mo  KD 0
 *   kpop fashion style          1,300/mo  KD 0
 *   kpop outfit male            1,000/mo  KD 0
 *   kpop men outfit             1,000/mo  KD 0
 *
 * Combined: ~25K/mo outfit-intent across the broad K-pop cluster.
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

export const kpopOutfitsEN: LongtailContent = {
  lang: 'en',
  category: 'clothing',
  productLabel: 'K-pop outfit reference',
  yourPhotoLabel: 'Your full-body photo',
  yourPhotoHint: 'Full body, plain background, good light',
  productHint: 'Screenshot of any K-pop idol outfit (Instagram, Twitter, fancam, Pinterest)',
  accent: 'hair',

  badge: 'K-pop · AI Try-On',
  h1Top: 'K-pop outfits',
  h1Italic: 'try BTS, NewJeans, IVE, BLACKPINK and any idol look on your body in 30 sec.',
  hero:
    'Screenshot any K-pop idol fit — BTS airport, NewJeans Y2K, IVE preppy, aespa Cybertruck-core, BLACKPINK couture, Stray Kids edgy, TWICE soft-glam, ENHYPEN streetwear — upload your photo, AI applies the outfit to YOUR body in 30 seconds. Free, no signup, no app.',
  ctaPrimary: 'Try a K-pop outfit on me',
  ctaCaption: '✓ Free · ✓ No signup · ✓ 30 sec',

  whatTitle: 'Why fans recreate K-pop outfits',
  whatBody:
    "K-pop styling is a global trend engine — every comeback, music video, airport fit and fancam outfit becomes a Pinterest board within hours. But the same Dior runway piece that lands on Jungkook reads completely different on YOUR body. Karina's Cybertruck-core silhouette, Lisa's couture stagewear, Hyunjin's hair-and-fits combos, NewJeans' Y2K low-rise jeans — all photograph dramatically on idols at 5'7\" with stylists. Agalaz removes the guesswork: see the exact fit on YOUR body before you source the dupes from Uniqlo, Shein, AliExpress or Etsy cosplay sellers.",
  howKnowTitle: 'How to recreate any K-pop idol look',
  howKnowBullets: [
    'Screenshot the exact look — stage, airport, music video, photoshoot, fancam',
    'Upload your full-body photo (frontal, daylight, fitted base layer)',
    'AI applies the outfit to your body in 30 seconds, preserving your face',
    'Compare 3-5 looks side by side before sourcing pieces',
    'Source dupes: Korean fashion forums identify most pieces within days',
  ],

  recommendedBadge: 'The 8 most-recreated K-pop styles',
  recommendedTitle: '8 K-pop outfit categories fans try on most',
  recommended: [
    { name: 'BTS airport fashion', why: 'Oversized hoodies + tailored coats + chunky sneakers + sunglasses. Y2K-meets-streetwear. Easy to dupe with Uniqlo + Stüssy + ALD pieces.' },
    { name: 'NewJeans Y2K (Hanni / Minji / Hyein)', why: 'Low-rise jeans + crop tops + butterfly clips + tiny bags. The dominant fan-style of 2024-26. Brandy Melville + Pull&Bear get you there.' },
    { name: 'BLACKPINK couture (Jennie / Lisa / Jisoo)', why: 'Chanel jackets + plaid skirts + thigh-high boots. Highest-budget K-pop styling. Couture-coded, premium.' },
    { name: 'IVE preppy (Wonyoung / Liz)', why: 'Pleated skirts + cardigans + headbands. Princess-academia aesthetic. Reformation + Aritzia + Mango carry it.' },
    { name: 'aespa Cybertruck-core (Karina / Winter)', why: 'Metallic fabrics + sharp silhouettes + future-noir styling. Most cosplayed for graphic photography.' },
    { name: 'Stray Kids edgy (Hyunjin / Felix)', why: 'Leather harnesses + cargo pants + mesh tops + statement hair colors. The most-screenshot Y/X aesthetic.' },
    { name: 'TWICE soft-glam (Sana / Mina / Dahyun)', why: 'Pastel midi dresses + soft makeup + structured shoulder bags. Office-friendly, photographs cleanly.' },
    { name: 'ENHYPEN streetwear (Jungwon / Jay / Sunghoon)', why: 'Gap hoodies + baggy denim + mary janes. The "clean-Korean-streetwear" template. Most economical to recreate.' },
  ],

  avoidBadge: 'K-pop outfit recreation mistakes',
  avoidTitle: 'What NOT to do when recreating idol looks',
  avoid: [
    { name: 'Buying the exact luxury piece (Dior, Chanel, Prada)', why: 'A single Chanel jacket from a fancam can be $4-8K. Dupes on AliExpress / Uniqlo U / COS / Pull&Bear capture 95% of the silhouette at 3% of the price.' },
    { name: 'Oversized everything if you\'re petite', why: 'Idols are 5\'7"-5\'10". Oversized works on them because of their frame. On smaller frames, oversize swallows the body. AI preview catches this.' },
    { name: 'Skipping the hair / makeup match', why: '50% of the K-pop look is the hair colour + eye makeup. The same outfit on a brunette vs platinum blonde reads completely different. Style holistically.' },
  ],

  midCtaTitle: 'Before buying the dupes',
  midCtaBody:
    "A typical 5-piece K-pop dupe cart on AliExpress or Shein runs $40-80, plus 3 weeks of shipping. Preview the outfit on YOUR body first — pick the look that actually fits your frame, then source ONE outfit's pieces instead of buying for 3 looks you'll only wear 1 of.",
  midCtaButton: 'Try a K-pop outfit now',

  faqTitle: 'K-pop outfit AI try-on — FAQ',
  faq: [
    { q: 'Does it work with any K-pop idol photo?', a: 'Yes. Screenshot from Instagram (@official accounts), Twitter / X, Pinterest, YouTube fancams, Naver photoshoots, Weverse posts, or Tumblr. Works best when the outfit is shown frontally and at full body. Music video stills, photocard cuts and tour fancams all work.' },
    { q: 'Which idols / groups work best?', a: 'All major groups — BTS, BLACKPINK, NewJeans, IVE, aespa, LE SSERAFIM, Stray Kids, TWICE, ENHYPEN, ITZY, NCT, SEVENTEEN, RIIZE. Solo artists too — IU, Sunmi, Hyuna, Taeyeon. The AI handles Korean stage styling, airport fashion and photoshoot looks reliably.' },
    { q: 'Will the AI keep my face / not morph me into the idol?', a: 'It keeps YOUR face, body, skin and pose IDENTICAL. Only the clothing changes. You become a real-world version of the idol\'s look, not a copy of the idol.' },
    { q: 'Can I see the same outfit in different colors?', a: 'Yes. After the first render, ask "show in black instead of pink" or "try in cream" — re-renders in seconds.' },
    { q: 'Does this work for stage outfits with sequins / leather / mesh?', a: 'Yes. The AI handles sequins, satin, leather harnesses, mesh tops, structured tailoring and chunky knits realistically. Stage and red-carpet looks render the same as casual.' },
    { q: 'What about Korean styling specifics (oversized fits, layering)?', a: 'Yes. The AI respects Korean stylistic conventions (oversized hoodies, baggy denim with cuffed hem, layered cardigan-over-tee, butterfly clips) when they\'re visible in the reference.' },
    { q: 'How much does it cost?', a: 'First render is free, no signup, no card. Packs from $4.99 (5 renders) or $9.99 (15). One-time, no subscription.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Virtual try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=clothing',
};
