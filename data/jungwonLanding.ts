/**
 * /jungwon-outfits — virtual try-on landing for Yang Jungwon, leader of
 * ENHYPEN. Targets the addressable outfit-intent cluster identified via
 * DataForSEO 2026-05-17:
 *
 *   jungwon                   74,000/mo  KD 1
 *   jungwon enhypen            9,900/mo  KD 0
 *   yang jungwon               2,900/mo  KD 0
 *   enhypen jungwon            2,900/mo  KD 3
 *   jungwon gap hoodie         1,600/mo  KD 0
 *   enhypen jungwon pictures   1,000/mo  KD 0
 *
 * Combined addressable: ~22K/mo (outfit-intent slice of his SERP).
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

export const jungwonOutfitsEN: LongtailContent = {
  lang: 'en',
  category: 'clothing',
  productLabel: 'Jungwon outfit reference',
  yourPhotoLabel: 'Your full-body photo',
  yourPhotoHint: 'Full body, simple background, good light',
  productHint: 'Screenshot of Jungwon\'s outfit (Pinterest, Twitter, his Insta)',
  accent: 'hair',

  badge: 'ENHYPEN · Jungwon · AI Try-On',
  h1Top: 'Jungwon outfits',
  h1Italic: 'try ENHYPEN\'s leader looks on your own body in 30 seconds.',
  hero:
    'Screenshot any Jungwon look — stage fit, airport fashion, his Gap hoodie, his Dior fittings, his ROMANCE:UNTOLD era pieces — upload your photo, AI applies the outfit to YOUR body in 30 seconds. Free, no signup, no app.',
  ctaPrimary: 'Try a Jungwon outfit on me',
  ctaCaption: '✓ Free · ✓ No signup · ✓ 30 sec',

  whatTitle: 'Why try Jungwon\'s outfits on yourself',
  whatBody:
    'Yang Jungwon (양정원) is the leader of ENHYPEN, debuted under BELIFT LAB in 2020. His style mixes hyper-clean Korean streetwear (oversized hoodies, baggy denim, white socks + black mary janes), stage couture (Dior fittings, sequin co-ord sets, leather harnesses for MAESTRO era) and airport fashion (chunky knits + cargo pants + the famous Gap hoodie). Fans recreate his fits — Agalaz lets you see how each look actually fits YOUR body before you shop the dupes.',
  howKnowTitle: 'How to recreate any Jungwon look',
  howKnowBullets: [
    'Screenshot the exact look you want (his Instagram @won_b_) — stage, airport, or photoshoot',
    'Upload your full-body photo (frontal, daylight, fitted clothes)',
    'AI applies the outfit to your body in 30 seconds, preserving your features',
    'Send the result to your friend chat, or save it for shopping reference',
    'Search the dupes — Korean fashion forums identify most of his pieces within days',
  ],

  recommendedBadge: 'Jungwon\'s signature pieces',
  recommendedTitle: '6 Jungwon outfit categories fans recreate most',
  recommended: [
    { name: 'Gap navy hoodie + baggy denim', why: 'The iconic 2024 airport look. Most-searched specific Jungwon piece. Easy to dupe (Uniqlo, COS) and works on any body type.' },
    { name: 'MAESTRO era leather harness + black tee', why: 'His stage look from the MAESTRO comeback. Bold, dark, sharp. Best on lean frames.' },
    { name: 'Dior runway fitting (white shirt + tailored trousers)', why: 'His Dior brand-ambassador fits — minimalist but expensive. Photographs cleanly. Reads "main character".' },
    { name: 'Oversized cardigan + white tee + jeans', why: 'Classic clean-girl-coded boy style. Cardigan over band tee or plain white. Easy to recreate from any high-street brand.' },
    { name: 'ROMANCE:UNTOLD pastel co-ord set', why: 'Soft pastel knit set from that era. Pink, lavender, butter yellow. Photographs in soft light especially well.' },
    { name: 'Sequin / mesh top + cargo pants (Korean indie sleaze)', why: 'His dance-practice and music-video look. Mesh top + cargo or wide-leg pants. Best for body types confident in form-fitting tops.' },
  ],

  avoidBadge: 'Common Jungwon-outfit recreation mistakes',
  avoidTitle: 'What NOT to do when recreating his look',
  avoid: [
    { name: 'Buying the EXACT Dior piece', why: 'A single Dior shirt from his fitting is $1200+. The dupes (COS, Massimo Dutti, Uniqlo U) are 95% of the look at 5% of the price. Preview the silhouette virtually first.' },
    { name: 'Oversized everything if you\'re petite', why: 'Jungwon is 5\'9" / 175cm — oversized works on him because of his frame. On smaller frames, oversize swallows the body. Preview before ordering.' },
    { name: 'Skipping the shoes', why: 'His shoes are 50% of the look. Black mary janes + white socks, chunky sneakers, or platform loafers. Don\'t pair the outfit with random sneakers.' },
  ],

  midCtaTitle: 'Before buying the dupe',
  midCtaBody:
    'Most Jungwon dupes are easy to source on Aliexpress, Uniqlo or Pull&Bear. But before clicking buy on a 5-piece outfit, see how it actually sits on YOUR body. Saves 20 returns and 4 hours of trying things on.',
  midCtaButton: 'Try a Jungwon outfit now',

  faqTitle: 'Jungwon outfit AI try-on — FAQ',
  faq: [
    { q: 'Does it work with photos from Jungwon\'s Instagram?', a: 'Yes. Screenshot from his Instagram @won_b_, X, Pinterest, fancams or photoshoot photos. Works best with the outfit shown frontally, full-body, in clear light.' },
    { q: 'Can I see the same outfit in different colors?', a: 'Yes. After the first render, ask the AI "show in black instead of navy" or "try in cream" — re-renders in seconds.' },
    { q: 'Will the AI keep my face / does it morph me into Jungwon?', a: 'It keeps YOUR face, body and pose identical. Only the clothing changes to match the reference. You stay you.' },
    { q: 'Does this work for stage outfits (sequins, mesh, leather)?', a: 'Yes. The AI handles sequins, mesh, leather and structured fabrics realistically. Stage and red-carpet looks render the same as casual.' },
    { q: 'What about ENHYPEN group outfits (Jay, Sunghoon, Sunoo, etc.)?', a: 'Yes — any ENHYPEN member outfit. Screenshot the look, upload your photo. We are adding dedicated landings for the other members next.' },
    { q: 'How much does it cost?', a: 'First render is free, no signup, no card. After that, packs from $4.99 (5 renders) or $9.99 (15). One-time, no subscription.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Virtual try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=clothing',
};
