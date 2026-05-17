/**
 * Korean / wispy / curtain bangs landings — research 2026-05-17.
 *
 * Japan dominates demand (前髪 90K/mo KD 0, シースルーバング 49K/mo, etc.) —
 * that market gets a standalone /ja/maegami page in native Japanese.
 *
 * For the global English market, /korean-bangs captures the secondary
 * "korean bangs / see-through bangs / wispy bangs" demand (~10-15K/mo).
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

export const koreanBangsEN: LongtailContent = {
  lang: 'en',
  category: 'hairstyle',
  theme: 'curtain-bangs',
  productLabel: 'Bangs reference photo',
  yourPhotoLabel: 'Your selfie',
  yourPhotoHint: 'Front-facing, hair clearly visible',
  productHint: 'Korean / see-through / wispy bangs reference (Pinterest, K-pop idol)',
  accent: 'hair',

  badge: 'Korean Bangs · AI Try-On',
  h1Top: 'Korean bangs',
  h1Italic: 'try see-through, wispy and idol-style bangs on your face in 30 sec.',
  hero:
    'See-through bangs, wispy bangs, idol bangs, blunt fringe — the Korean-Japanese bangs trend has 20+ named styles. Upload your selfie + any reference, AI shows the cut on YOUR face in 30 seconds. Free, no signup.',
  ctaPrimary: 'Try Korean bangs on me',
  ctaCaption: '✓ Free · ✓ No signup · ✓ 30 sec',

  whatTitle: 'Why Korean bangs are different',
  whatBody:
    'Korean bangs (and the Japanese シースルーバング / see-through bangs that birthed the trend) are surgically light — wispy, often parted, the forehead visible through them. The opposite of the 2010s heavy blunt fringe. They photograph soft, suit oval / heart / square faces, and grow out into curtain bangs gracefully. The catch: the cut is HARD to do without showing your stylist a clear reference. Agalaz lets you preview the cut on YOUR face, then bring the screenshot to the salon.',
  howKnowTitle: 'How to pick the right bangs style',
  howKnowBullets: [
    'See-through (シースルーバング) — Very light, forehead visible. Best for round/oval faces.',
    'Wispy bangs — Slightly heavier than see-through, more texture. Best for heart and square faces.',
    'Curtain bangs (Korean variant) — Longer, parted, frames the face. Best for round faces.',
    'Blunt fringe (ぱっつん) — Straight-cut, dense. Best for oblong / long faces.',
    'Air bangs / idol bangs — Very airy, hair barely touches the forehead. K-pop idol staple.',
  ],

  recommendedBadge: 'The 6 bangs styles to know',
  recommendedTitle: '6 Korean / K-style bangs and who they suit',
  recommended: [
    { name: 'See-through bangs (シースルーバング)', why: 'Light, parted at the middle of the forehead, hair almost translucent. The defining 2024-26 style. Best on most face shapes.' },
    { name: 'Wispy bangs', why: 'Slightly heavier, texturized. Frames the eyebrows. Best for heart and square faces.' },
    { name: 'Korean curtain bangs', why: 'Center-parted, longer than US curtain bangs (cheek length). Universally flattering.' },
    { name: 'Air bangs (エアバング)', why: 'Floaty, hair barely touches the brow. K-pop idol favorite. Best on fine to medium hair.' },
    { name: 'Side-swept Korean bangs', why: 'Like side-bangs but with Korean lightness — wispy and asymmetric.' },
    { name: 'Baby bangs (Korean version)', why: 'Above-brow, fringe sits high. Bold but balanced with see-through density.' },
  ],

  avoidBadge: 'Common bangs mistakes',
  avoidTitle: 'What NOT to do when getting Korean bangs',
  avoid: [
    { name: 'Cutting too thick on the first try', why: 'Korean bangs are LIGHT. Heavy 2010s blunt fringe will look dated. Ask for "see-through" or show your stylist the reference.' },
    { name: 'Cutting them dry without checking damp drape', why: 'Bangs shrink when dry. Stylist should cut damp, then dry-check, then adjust.' },
    { name: 'Getting bangs with a strong cowlick', why: 'Cowlicks at the hairline split blunt bangs. AI preview shows this BEFORE the cut.' },
  ],

  midCtaTitle: 'Before the chop',
  midCtaBody:
    'Bangs are 8-12 weeks of growing out if you regret them. Preview 4 styles on your face virtually first, pick the one that suits YOUR face, walk into the salon with confidence.',
  midCtaButton: 'Try Korean bangs now',

  faqTitle: 'Korean bangs AI try-on — FAQ',
  faq: [
    { q: 'Does it work with K-pop idol reference photos?', a: 'Yes. Screenshot any K-pop idol\'s bangs (Jungkook\'s curtain bangs, Lisa\'s see-through, Karina\'s air bangs) and the AI applies the style to your face in 30 seconds.' },
    { q: 'Will the AI keep my face / not morph me?', a: 'It keeps YOUR face, skin, body and background identical. Only the hair changes.' },
    { q: 'Can I see different lengths of the same bangs style?', a: 'Yes. After the first render, ask "longer" or "shorter" or "side-swept" and it re-renders in seconds.' },
    { q: 'What if I have a cowlick?', a: 'Upload your real selfie — the AI uses your actual hair pattern. If a style doesn\'t work due to a cowlick, you\'ll see it before committing.' },
    { q: 'How much does it cost?', a: 'First render is free, no signup. Packs from $4.99 (5 renders) or $9.99 (15). One-time.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Virtual try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=hairstyle',
};
