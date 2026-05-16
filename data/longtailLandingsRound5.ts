/**
 * Round-5 ultra-soft top-5 candidates — SERP-verified 2026-05-12.
 *
 * Strategy: target keyword clusters where Pinterest/Reddit/YouTube/TikTok
 * dominate the top 5 (≥3 of top 5 are beatable for a young domain), and
 * where volume is meaningful enough to matter (2K+/mo per variant).
 *
 * Each landing captures a MEGA cluster (15-20 variants × ~2.5K/mo each)
 * with one optimized page. Realistic top-5 in 2-6 weeks on a young domain.
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

/* ───────────────────────── /curtain-bangs-haircut ───────────────────────
 * Cluster: ~30K/mo combined across 15+ variants. KD 0-3.
 * SERPs verified: 4-5 of top 5 are Pinterest + Reddit + YouTube + small blogs.
 * Top variants:
 *   - layers haircut with curtain bangs       2.9K kd0
 *   - curtain bangs wavy hair                 2.4K kd3
 *   - curled / curling / curly curtain bangs  2.9K×3 kd0
 *   - layered haircut with curtain bangs      2.9K kd2
 *   - shoulder length hair(styles) with curtain bangs  2.4K×3 kd0-1
 *   - long bob with curtain bangs             2.4K kd0
 *   - curtain bangs wolf cut long hair        2.4K kd0
 *   - butterfly haircut with curtain bangs    2.4K kd0
 *   - long hairstyle with curtain bangs       2.4K kd2
 */
export const curtainBangsHaircut: LongtailContent = {
  lang: 'en',
  category: 'hairstyle',
  productLabel: 'Reference cut',
  accent: 'hair',
  theme: 'curtain-bangs',

  badge: 'Curtain Bangs · AI Try-On',
  h1Top: 'Curtain Bangs',
  h1Italic: 'on your face, in 30 seconds.',
  hero:
    "Try every curtain bangs style — wavy, curly, curled, layered, with a long bob, with a wolf cut, butterfly haircut combo, shoulder-length — on YOUR real face with AI in 30 seconds. Before you book the salon. Free, no signup.",
  ctaPrimary: 'Try curtain bangs',
  ctaCaption: 'Free · No download · 30 sec',

  whatTitle: 'Why curtain bangs work on almost everyone',
  whatBody:
    "Curtain bangs frame the face on the diagonal — they soften round faces, balance square jaws, elongate cheek-heavy faces, and add movement to long hair without committing to a full fringe. They're the lowest-risk bang style: if you don't love them after 2 weeks, they grow into face-framing layers instead of awkward growth-out.",
  howKnowTitle: 'Before you book the salon',
  howKnowBullets: [
    'Upload a clear front or 3/4 photo of yourself',
    'Upload a reference photo of the curtain bang style you like (Pinterest, Instagram, TikTok)',
    'AI applies the exact style to your real face in 30 seconds',
    'Test 3-4 variants — wavy, curly, layered, with wolf cut — side by side',
    'Walk into the salon knowing exactly what to ask for',
  ],

  recommendedBadge: '2026 Curtain Bangs Styles',
  recommendedTitle: 'Curtain bangs variants to try',
  recommended: [
    { name: 'Layered curtain bangs', why: "Bangs split from a center part and feather outward through layers — most flattering version because the layers transition smoothly into the rest of the hair." },
    { name: 'Curtain bangs + wavy hair', why: 'The wave adds bounce that mirrors the curtain shape. Especially good for medium to long hair — adds body without weight.' },
    { name: 'Curtain bangs + curly hair', why: "Curly hair needs the right bang technique — the curls give the curtain shape automatically. Cut dry, never wet, or you'll over-shorten when they spring up." },
    { name: 'Curled / blown-out curtain bangs', why: "Even on straight hair, curling the bangs with a round brush gives that 'effortless French girl' shape. The blow-out lasts 2-3 days." },
    { name: 'Curtain bangs + long bob (lob)', why: "Lob ends around the collarbone, bangs frame the cheekbones — most balanced 'lifestyle' haircut of 2026." },
    { name: 'Curtain bangs + wolf cut (long hair)', why: 'The wolf cut adds shaggy layers down the length; curtain bangs frame the face. Modern punk-soft combo.' },
    { name: 'Curtain bangs + butterfly haircut', why: 'Butterfly layers around the face + curtain bangs = max face-framing, viral on TikTok 2024-2026.' },
    { name: 'Shoulder-length + curtain bangs', why: 'Cleanest version for everyday styling. Easy to dry, easy to maintain. Works on any face shape.' },
  ],

  avoidBadge: 'Watch out',
  avoidTitle: 'When curtain bangs fail',
  avoid: [
    { name: 'Cut too short (above eyebrows)', why: "Curtain bangs should hit between cheekbone and chin. Too short = regular fringe with a hole in the middle, NOT curtain bangs." },
    { name: 'Not styled — air-dried flat', why: 'Curtain bangs MUST be blow-dried or curled to keep the curtain shape. Air-dried they look greasy and parted weird.' },
    { name: 'Too thin / sparse', why: 'If the stylist takes only a tiny strand, the bangs disappear. Ask for at least a 1-inch width of hair.' },
  ],

  midCtaTitle: 'Try them before the chair, not after',
  midCtaBody:
    "A bad set of bangs takes 4-6 months to grow out. Don't gamble. Render the cut on your real face in 30 seconds — same face, same hair color, same lighting — and decide with data. First render free.",
  midCtaButton: 'Try curtain bangs on my face',

  faqTitle: 'Frequently asked',
  faq: [
    {
      q: 'Do curtain bangs work for round faces?',
      a: "Yes — they elongate the face by drawing the eye diagonally outward, opposite of a straight fringe which makes a round face look rounder. Pair with longer length (lob or below) for max elongation.",
    },
    {
      q: 'Curtain bangs on curly hair — possible?',
      a: 'Absolutely. Curly curtain bangs are huge in 2026. Key: cut dry (never wet), only cut while the curls are at natural length. A curl-specialist hairdresser is worth the premium.',
    },
    {
      q: "What's the difference between curtain bangs and a 70s shag?",
      a: "Curtain bangs are just the front fringe — split from a center part, falling to the sides. A 70s shag is a full haircut with layers throughout. You can have curtain bangs WITHOUT a shag, or combine them (most popular combo in 2026).",
    },
    {
      q: 'How long until curtain bangs grow out if I hate them?',
      a: '6-10 weeks until they blend into face-framing layers. They grow out beautifully — that\'s why they\'re the lowest-risk bang style.',
    },
    {
      q: 'Does the AI preserve my real face?',
      a: "Yes — eye color, skin tone, face shape, expression, hairline are all preserved. The AI only changes the cut + style of the bangs. It's putting the bangs on YOU, not generating a stock face.",
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=hairstyle',
};

/* ───────────────────────── /wolf-cut-hairstyles ──────────────────────────
 * Cluster: ~38K/mo combined across 14+ variants. KD 0-4.
 * SERPs: 3-5 of top 5 are Pinterest + Reddit + YouTube + small style blogs.
 */
export const wolfCutHairstyles: LongtailContent = {
  lang: 'en',
  category: 'hairstyle',
  productLabel: 'Wolf cut reference',
  accent: 'hair',
  theme: 'wolf-cut',

  badge: 'Wolf Cut · AI Try-On',
  h1Top: 'Wolf Cut Hairstyles',
  h1Italic: 'on your face, before the salon.',
  hero:
    "Try every wolf cut variant — long, short, shoulder-length, wavy, straight, mullet, asian, middle-part for men — on YOUR face with AI in 30 seconds. The wolf cut is half mullet, half shag, all attitude — but only if it suits YOUR face shape and hair texture. Test before you commit.",
  ctaPrimary: 'Try the wolf cut',
  ctaCaption: 'Free · No download · 30 sec',

  whatTitle: 'What exactly is a wolf cut?',
  whatBody:
    "A wolf cut is a hybrid: heavily layered crown (like a shag) blended into longer, choppy ends (like a mullet). Origin: Korean and Chinese stylists 2021-2022, exploded on TikTok. The look is 'lived-in punk'. It works best on hair with natural texture or wave — pin-straight hair needs styling to keep the wolfy shape.",
  howKnowTitle: 'Before the salon',
  howKnowBullets: [
    'Upload a clear front photo of yourself',
    'Upload a wolf cut reference (Pinterest, TikTok, Instagram of the exact style)',
    'AI applies the cut to your real face + hair color in 30 seconds',
    'Compare long vs short vs shoulder-length on the same face',
    'Check whether your face shape supports the heavy crown layers',
  ],

  recommendedBadge: '2026 Wolf Cut Variants',
  recommendedTitle: 'Wolf cut styles to test',
  recommended: [
    { name: 'Long wolf cut (past shoulders)', why: "The version that exploded in 2022-2023 and is still huge. Crown layers + long choppy ends. Suits oval, heart, and diamond face shapes best." },
    { name: 'Shoulder-length wolf cut', why: "Most flattering for round and square faces — the cut ends right where the jaw softens, balancing the wider zones." },
    { name: 'Short wolf cut', why: 'Pixie-meets-mullet. High-attention version. Suits oval and heart faces with strong cheekbones.' },
    { name: 'Wolf cut + wavy hair', why: 'Natural waves give the wolf cut its signature 3D dimension without styling — wash-and-go.' },
    { name: 'Wolf cut + curly hair', why: 'Curls give automatic volume in the crown layer. The cut should be done DRY by a curl specialist.' },
    { name: 'Wolf cut + straight hair', why: 'Requires daily styling (texture spray + light blow-dry) to maintain the wolfy shape. Without styling, just looks unevenly long.' },
    { name: 'Mullet wolf cut', why: 'The most aggressive version. Crown almost pixie-length, back falls to mid-back. Gen-Z core. Be ready for double-takes.' },
    { name: 'Asian-style wolf cut', why: 'Lighter layers + face-framing pieces + softer overall blend. Most flattering wolf cut variant for delicate facial features.' },
    { name: "Middle-part wolf cut (men's)", why: "Men's variant: shorter overall length, layered crown, mid-length back. Looks like an upgraded mid-2010s middle part." },
    { name: 'Wolf cut + curtain bangs', why: 'The killer combo of 2026. Wolf layers + curtain bangs = maximum face-framing.' },
  ],

  avoidBadge: 'Watch out',
  avoidTitle: 'When wolf cuts fail',
  avoid: [
    { name: 'Pin-straight + no styling', why: "Without natural texture or daily styling, a wolf cut on pin-straight hair looks like an uneven trim. You need to commit to texture spray + blow-dry rounds, or pass." },
    { name: 'Hairdresser who never cut one', why: "Wolf cuts require specific layering technique. If your salon doesn't have wolf-cut photos on their Instagram, find one that does." },
    { name: 'Trying on chubby/very round face without long length', why: "Heavy crown layers + short overall length on a round face = pumpkin head. The wolf cut works on round faces ONLY at shoulder length or longer." },
  ],

  midCtaTitle: 'Try the wolf before you commit',
  midCtaBody:
    "Bad wolf cut = 4-6 months to grow back into a normal shape. The AI shows you the cut on YOUR real hair color + face shape + length in 30 seconds. Decide with data, not the salon's Pinterest board. First render free.",
  midCtaButton: 'Try wolf cut on my face',

  faqTitle: 'Frequently asked',
  faq: [
    {
      q: 'Is the wolf cut still trendy in 2026?',
      a: "Yes — but it's evolved. The aggressive mullet-wolf of 2022 has softened into the 'modern wolf' with curtain bangs and lighter layers. The Asian-style wolf is the most copy-paste version this year.",
    },
    {
      q: 'Does a wolf cut work for men?',
      a: 'Yes — the middle-part wolf cut for men is huge in 2026. Crown layers, mid-length back, often with a wispy fringe. K-pop and J-rock visual style.',
    },
    {
      q: 'Can I get a wolf cut on curly or wavy hair?',
      a: "Absolutely — and they're often BETTER on textured hair. The curls/waves give automatic 3D dimension. Always cut DRY by a stylist who knows curls.",
    },
    {
      q: 'How long is the maintenance commitment?',
      a: 'Trim every 8-10 weeks to keep the layers crisp. Styling is daily-ish: texture spray + light tousle. Without styling, the wolf shape collapses into "hair that needs a trim".',
    },
    {
      q: 'Does the AI render show my actual hair color?',
      a: 'Yes — face shape, skin tone, hairline, eye color are all preserved. The AI only changes the cut shape and layering. Your real color stays unless you upload a colored reference.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on?category=hairstyle',
};

/* ───────────────────────── /fr/carre-frange-rideau ───────────────────────
 * Cluster: ~12K/mo combined. KD 0. SERPs softness 7 — Pinterest + small French
 * blogs (beaute-and-co, novacoiffure, jeanlouisdavid, elle.fr).
 */
export const carreFrangeRideau: LongtailContent = {
  lang: 'fr',
  category: 'hairstyle',
  productLabel: 'Référence coupe',
  accent: 'hair',
  theme: 'curtain-bangs',

  badge: 'Carré + Frange Rideau · IA',
  h1Top: 'Carré avec frange',
  h1Italic: 'rideau.',
  hero:
    "Essayez le carré avec frange rideau — court, long, plongeant, sur cheveux bouclés ou ondulés — sur VOTRE vrai visage avec l'IA en 30 secondes. Avant le rendez-vous chez le coiffeur. La combo la plus universelle de 2026, mais seulement si elle vous va vraiment.",
  ctaPrimary: 'Essayer le carré',
  ctaCaption: 'Gratuit · Sans téléchargement · 30 sec',

  whatTitle: "Pourquoi le carré + frange rideau marche partout",
  whatBody:
    "Le carré encadre le visage par le bas, la frange rideau l'encadre par le haut — résultat : un visage 'sculpté' sans coupe extrême. C'est la coiffure qui fonctionne sur 90% des morphologies parce que les deux éléments sont ajustables : longueur du carré, niveau de la frange. C'est aussi la coupe la plus demandée chez les coiffeurs français en 2026.",
  howKnowTitle: "Avant le rendez-vous",
  howKnowBullets: [
    'Téléchargez une photo claire de votre visage (face ou 3/4)',
    'Téléchargez la photo de référence du carré (Pinterest, Instagram)',
    "L'IA applique la coupe exacte sur votre visage en 30 secondes",
    'Testez carré court, carré long, plongeant côte à côte',
    'Arrivez chez le coiffeur en sachant exactement ce que vous voulez',
  ],

  recommendedBadge: 'Variantes 2026',
  recommendedTitle: 'Carrés avec frange rideau à essayer',
  recommended: [
    { name: 'Carré long + frange rideau', why: 'La version la plus universelle. Longueur sous la mâchoire, frange rideau qui encadre les pommettes. Convient à tous les visages.' },
    { name: 'Carré plongeant + frange rideau', why: 'Le carré plonge vers l\'avant, accentué par la frange rideau — visage allongé, idéal pour les visages ronds.' },
    { name: 'Carré court + frange rideau', why: 'Coupe au menton avec frange rideau. Modernité maximale, audace contrôlée. Pour visages ovales et carrés.' },
    { name: 'Carré + frange rideau sur cheveux bouclés', why: 'Les boucles donnent le mouvement, la frange rideau encadre. Coupe à sec uniquement, par un spécialiste du cheveu bouclé.' },
    { name: 'Carré + frange rideau sur cheveux ondulés', why: 'Le naturel des ondulations met en valeur la frange rideau. Aucun coiffage quotidien requis.' },
    { name: 'Long bob + frange rideau', why: 'Légèrement plus long que le carré classique (sous le menton), frange rideau légère. Le compromis parfait avant de raccourcir vraiment.' },
    { name: 'Carré asymétrique + frange rideau', why: 'Une longueur différente sur chaque côté, frange rideau qui décale visuellement. Pour visages ronds et carrés qui veulent casser la symétrie.' },
    { name: 'Carré flou + frange rideau', why: 'Pointes effilées, frange rideau désordonnée. Look "French girl" — décontracté mais maîtrisé.' },
  ],

  avoidBadge: 'Attention',
  avoidTitle: 'Quand le carré + frange rideau ne marche pas',
  avoid: [
    { name: 'Frange trop courte', why: "La frange rideau doit tomber entre les pommettes et le menton. Plus courte = frange droite normale, pas l'effet rideau souhaité." },
    { name: 'Carré trop épais sans dégradé', why: 'Un carré net sans aucune effilure peut alourdir le visage. Demandez un léger effilage aux pointes.' },
    { name: 'Cheveux fins sans volume travaillé', why: 'Sur cheveux très fins, le carré + frange rideau peut paraître plat. Travaillez le volume à la racine au sèche-cheveux.' },
  ],

  midCtaTitle: "Essayez avant de couper",
  midCtaBody:
    "Une mauvaise coupe au carré, c'est 6-8 mois pour la rallonger. Faites le rendu sur VOTRE vrai visage en 30 secondes — votre teint, votre structure osseuse, votre attaché de cheveux — et décidez en connaissance de cause. Premier essai gratuit.",
  midCtaButton: 'Essayer le carré sur ma photo',

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Quel carré pour un visage rond avec frange rideau ?',
      a: "Carré plongeant ou carré long — la longueur tombe sous le menton et allonge visuellement. Évitez le carré court net qui souligne la rondeur.",
    },
    {
      q: 'Peut-on porter un carré + frange rideau sur cheveux bouclés ?',
      a: "Oui, c'est même très tendance en 2026. Conditions : coupe à sec par un spécialiste boucles, et accepter que le carré sera plus court une fois mouillé que prévu (rétractation des boucles).",
    },
    {
      q: 'La frange rideau va-t-elle sur cheveux fins ?',
      a: 'Oui — mieux que la frange droite, parce que la frange rideau est plus aérée. Demandez à votre coiffeur de prendre une mèche plus large pour compenser la finesse.',
    },
    {
      q: 'Combien de temps pour faire pousser une frange rideau si je la déteste ?',
      a: "Environ 8-10 semaines pour qu'elle se fonde dans le carré. C'est l'avantage de la frange rideau : elle pousse en mèches encadrantes au lieu d'une frange bizarre.",
    },
    {
      q: 'Le rendu IA respecte-t-il mon vrai visage ?',
      a: "Oui. L'IA préserve la couleur des yeux, la forme du visage, le teint, l'expression et la racine. Seules la coupe et la frange changent.",
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Essayage virtuel',
  privacyLabel: 'Confidentialité',
  tryOnHref: '/fr/try-on?category=hairstyle',
};
