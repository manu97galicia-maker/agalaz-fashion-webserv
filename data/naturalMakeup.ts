/**
 * /natural-makeup-look — DataForSEO scan: ~30 variants of "natural makeup
 * look", "natural-looking makeup" all at 22,200/mo each, KD 2. Combined
 * cluster ~600K+/mo. Plus adjacent: "smokey eye makeup" 14,800/mo KD 1
 * cluster captured here too. Opens makeup vertical for future expansion.
 */

export interface MakeupLook {
  name: string;
  pieces: string;
  occasion: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const MAKEUP_LOOKS: MakeupLook[] = [
  {
    name: 'No-makeup makeup look · everyday',
    pieces:
      'Tinted moisturizer or skin tint · concealer only on dark spots · cream blush in peach or rose · clear brow gel · curled lashes · clear lip gloss or balm · NO foundation, NO contour, NO heavy bronze',
    occasion: 'Daily, work, school, brunch, errands — the "skin first" Korean / Hailey Bieber aesthetic',
  },
  {
    name: 'Natural makeup look · for date night',
    pieces:
      'Light foundation matched to skin · cream blush + tiny highlight on cheekbones · soft brown shadow blended into the lid · single coat of mascara · neutral pink or "your lips but better" lipstick',
    occasion: 'First date, casual dinner date, anniversary low-key, brunch with someone you want to impress',
  },
  {
    name: 'Natural look for makeup · interview / professional',
    pieces:
      'Skin tint or full coverage where needed · neutral matte eyeshadow (taupe or warm brown) · single coat of mascara · groomed brows · MLBB lipstick (rosy nude) · soft pressed powder for shine control',
    occasion: 'Job interview, important meeting, professional headshot, networking event',
  },
  {
    name: 'Soft glam · natural with definition',
    pieces:
      'Foundation + concealer · soft contour on cheekbones + temples · liquid blush · brown winged liner (subtle) · 2 coats mascara · soft warm shadow · nude-pink lipstick with gloss center',
    occasion: 'Friend\'s wedding (you\'re a guest), birthday dinner, going-out look that still says "I tried but not too hard"',
  },
  {
    name: 'Smokey eye natural · subtle drama',
    pieces:
      'Soft brown smokey eye (NOT black — black is harsh) · brown eyeliner smudged · 2 coats mascara · soft contour · nude lip · the "I look mysterious without trying" vibe',
    occasion: 'Evening events, low-light venues, photos that need eye drama, dates',
  },
  {
    name: 'Wedding makeup · natural bridal look',
    pieces:
      'Long-wear foundation + setting spray · soft pinky-peach blush · subtle highlight · soft brown smokey eye · brown winged liner · individual lashes · MLBB rosy lip · waterproof everything',
    occasion: 'Your own wedding (modern brides who want to look like themselves) or as bridesmaid',
  },
  {
    name: 'Hooded eye natural makeup',
    pieces:
      'Eyeshadow primer first (mandatory for hooded eyes) · matte eyeshadow above the natural crease (where the lid actually shows when open) · upward-flick eyeliner from outer corner only · curled lashes + mascara on top lashes only · brows lifted with concealer underneath',
    occasion: 'Hooded eyes (where the upper lid hides part of the eye when open) — the technique that makes regular tutorials NOT translate',
  },
  {
    name: 'Mature skin natural makeup · 40+',
    pieces:
      'Hydrating primer · light-coverage tinted serum (not full foundation — settles into lines) · cream blush + cream highlight (powders age) · soft brown shadow · curled lashes · hydrating lip balm + tinted lip oil (not matte lipstick)',
    occasion: 'Anyone 40+ wanting a natural look that does not emphasize fine lines · cream products are key',
  },
];

export const NATURAL_MAKEUP_FAQ: FaqEntry[] = [
  {
    q: 'How do I do a natural makeup look?',
    a: 'The trick: less product layered cleverly, not no product. Skin first (tinted moisturizer or skin tint instead of foundation). Cream products instead of powder (cream blush, cream highlight) — they look like skin, not paint. Soft brown eyeshadow (not black). Single coat mascara. Lip oil or MLBB lipstick. Skip contour and heavy bronzer for the truly natural look. The "no-makeup makeup" look takes ~10 minutes once practiced.',
  },
  {
    q: 'What products do I need for natural-looking makeup?',
    a: 'Essentials: tinted moisturizer or skin tint (Glossier, Tower28, Saie), cream blush (Rare Beauty Soft Pinch, Tower28), neutral eyeshadow palette (single warm-brown shade is enough), brown eyeliner (smudged > sharp wing), mascara, lip balm or oil. Optional: cream highlighter (Saie Glowy Super Gel) for a wet-skin glow. Total under $150 for the full kit if buying budget-to-mid.',
  },
  {
    q: 'How is natural makeup different from no makeup?',
    a: 'Natural makeup uses products to SUBTLY enhance: even skin tone, blurred imperfections, lift to cheekbones, defined eyes, softly tinted lips. The result LOOKS like good skin and rest, but is actually 4-6 products applied with restraint. Pure no-makeup is literally no makeup — visible blemishes, uneven tone, faint dark circles. Both are valid; "natural makeup" is the polished version of "I woke up like this".',
  },
  {
    q: 'Best natural makeup for hooded eyes?',
    a: 'Standard tutorials don\'t work because hooded eyes hide your crease. The fix: place eyeshadow ABOVE your natural crease (where the lid is visible when your eye is open). Upward-flick eyeliner only at the outer corner. Mascara on top lashes only (bottom lashes shorten the eye). Lift the brow tail with concealer below. Curl lashes religiously. The Hailey Bieber / Iris Law look uses these exact tricks.',
  },
  {
    q: 'How to do a natural smokey eye?',
    a: 'Use BROWN, not black. Smudge a soft brown shadow into the lash line (top + bottom outer half), softly diffuse upward into the crease. Add a slightly darker brown to the outer V. Skip black eyeliner — use brown smudged with a fluffy brush. The look should be "soft smudge of warmth" not "punched in the eye". Pair with nude-pink lip and barely-there blush for the modern smokey.',
  },
  {
    q: 'How do I make natural makeup last all day?',
    a: 'Setting spray BEFORE makeup (NYX Plump Right Back) and AFTER makeup (Charlotte Tilbury Setting Spray, Urban Decay All Nighter). Cream blush over foundation + powder set over cream gives the longest wear without looking cakey. Lip stain or transfer-proof tint instead of regular lipstick. Touch up the T-zone with blotting paper, never powder, mid-day to avoid build-up.',
  },
  {
    q: 'Can I see how natural makeup looks on me before applying?',
    a: 'Yes — Agalaz lets you upload your photo + a reference makeup look (Pinterest, Instagram, magazine) and the AI shows you that exact look applied to YOUR face in 30 seconds. Free first render. Useful for testing 5 different "natural" looks (no-makeup, soft glam, smokey, MLBB) before committing to learning one.',
  },
];
