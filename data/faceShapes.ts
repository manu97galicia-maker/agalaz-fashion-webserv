/**
 * Per-face-shape content used by the haircut-by-face-shape landing suite.
 *
 * The 4 landings all share the same component shell (HaircutByFaceShape) and
 * differ only in the strings in this file. Built to capture a high-volume,
 * low-difficulty long-tail cluster surfaced by DataForSEO:
 *
 *   /haircut-for-round-face    22.200 mo · KD 0
 *   /haircut-for-oval-face     18.100 mo · KD 8
 *   /haircut-for-diamond-face  12.100 mo · KD 0
 *   /haircut-for-square-face   ~10.000 mo (extrapolated) · low KD
 */

export type FaceShape = 'round' | 'oval' | 'diamond' | 'square';

export interface FaceShapeContent {
  shape: FaceShape;
  slug: string;
  /** Human-readable shape label for prose */
  shapeLabel: string;
  /** Hero H1 (kept under 60 chars for Bing) */
  h1: { primary: string; italic: string };
  /** Hero subtitle paragraph */
  hero: string;
  /** Title used in <title> tag — long-tail-targeted */
  metaTitle: string;
  /** Meta description (~155 chars) */
  metaDescription: string;
  /** SEO keywords */
  keywords: string[];
  /** Concise 1-line description of who has this shape */
  shapeDescription: string;
  /** "How to know" tells visitor if their face matches this shape */
  howToKnow: string[];
  /** Recommended haircuts for this shape */
  recommendedCuts: Array<{ name: string; why: string }>;
  /** Cuts to avoid for this shape (counter-intuitive content boosts dwell time) */
  avoidCuts: Array<{ name: string; why: string }>;
  /** FAQ pairs */
  faq: Array<{ q: string; a: string }>;
  /** OG image filename relative to /og/ */
  ogImage: string;
}

export const FACE_SHAPES: Record<FaceShape, FaceShapeContent> = {
  round: {
    shape: 'round',
    slug: 'haircut-for-round-face',
    shapeLabel: 'round',
    h1: { primary: 'Best Haircuts for', italic: 'Round Faces.' },
    hero:
      'Round face shapes need cuts that add length and angle. Try every option on YOUR own photo with AI before the salon chair — see if a long bob, side-swept fringe or pixie actually flatters your real face in 30 seconds.',
    metaTitle: 'Best Haircut for Round Face Shape — AI Try-On 2026',
    metaDescription:
      'Find the best haircut for a round face shape. AI virtual try-on shows lobs, layered cuts, side fringes and pixies on YOUR real face in 30 seconds. Free, no app.',
    keywords: [
      'haircut for round face',
      'haircut for round face shape',
      'haircut for round shape face',
      'best haircuts for round faces',
      'round face haircut female',
      'round face haircut male',
      'short haircut for round face',
      'medium haircut for round face',
      'long haircut for round face',
      'pixie cut for round face',
      'bob for round face',
      'round face shape hairstyles',
      'best hair length for round face',
    ],
    shapeDescription:
      'A round face is roughly as wide as it is long, with soft curves at the jaw and forehead and the widest point at the cheeks.',
    howToKnow: [
      'Pull your hair fully back and look at your face in a mirror.',
      'Width across cheekbones ≈ length of face from forehead to chin.',
      'Jawline curves softly without sharp angles.',
      'Forehead and chin are roughly the same width.',
      'No prominent points — the shape feels circular, not oval or square.',
    ],
    recommendedCuts: [
      { name: 'Long layered lob', why: 'Adds vertical length and frames cheeks, creating the illusion of a longer face.' },
      { name: 'Side-swept fringe', why: 'Asymmetry breaks the symmetry of the round shape and adds angle to the forehead.' },
      { name: 'Long pixie with volume on top', why: 'Height on the crown elongates, while keeping sides short avoids adding width.' },
      { name: 'Curtain bangs', why: 'Frames the face vertically and softens roundness without flattening volume.' },
      { name: 'Long layers below the jaw', why: 'Hair falling past the chin draws the eye down, making the face appear longer.' },
    ],
    avoidCuts: [
      { name: 'Blunt chin-length bobs', why: 'A flat line at the widest point of your face emphasizes the roundness.' },
      { name: 'Heavy straight-across fringes', why: 'Cuts off the forehead horizontally, making the face look shorter and wider.' },
      { name: 'One-length cuts with no layers', why: 'Adds bulk at the cheeks without breaking up the circular outline.' },
    ],
    faq: [
      { q: 'What is the best haircut for a round face shape?', a: 'Long layered lobs, side-swept fringes, long pixies with crown volume, and curtain bangs flatter round face shapes by adding vertical length and breaking symmetry. Avoid blunt chin-length bobs and heavy straight fringes.' },
      { q: 'Can a round face wear short hair?', a: 'Yes — but the shape matters. A long pixie with volume on top works because it adds vertical lift. A shaggy short cut with side-swept layers works too. Avoid blunt bobs that hit the cheeks.' },
      { q: 'Should round faces have bangs?', a: 'Side-swept and curtain bangs flatter round faces because they introduce diagonal lines. Avoid heavy blunt bangs that cut horizontally across the forehead — they shorten the face visually.' },
      { q: 'How do I know if I have a round face?', a: 'Pull your hair back and measure: if the width across your cheekbones is roughly equal to the length from forehead to chin, and your jawline is soft and curved, you likely have a round face shape.' },
      { q: 'Is a long bob (lob) good for round faces?', a: 'Yes — particularly with layers and a side part. The length below the jawline elongates the face, while layers prevent bulk at the cheeks. One of the most flattering cuts for round shapes.' },
      { q: 'What hairstyles should round faces avoid?', a: 'Blunt chin-length bobs, full straight fringes, super-thick one-length cuts without layers, and any style with extreme volume at the sides. All of these emphasize width over length.' },
      { q: 'Can I see these cuts on my own face before the salon?', a: 'Yes — that is exactly what Agalaz does. Upload your photo, drop in any reference cut, and see it on your real face in 30 seconds. Free first render, no app needed.' },
    ],
    ogImage: '/og/haircut-round-face.png',
  },
  oval: {
    shape: 'oval',
    slug: 'haircut-for-oval-face',
    shapeLabel: 'oval',
    h1: { primary: 'Best Haircuts for', italic: 'Oval Faces.' },
    hero:
      'The oval face is the universally most flattering shape — almost any cut works. The question is which cut fits YOUR vibe. Try lobs, blunt bangs, sleek long layers and bold pixies on your real photo in 30 seconds.',
    metaTitle: 'Best Haircut Styles & Ideas for Oval Face — AI Try-On 2026',
    metaDescription:
      'Best haircut styles and ideas for an oval face shape — women & men. Try blunt bobs, long layers, curtain bangs and pixies on YOUR real face with AI. Free, 30 seconds.',
    keywords: [
      'haircut for oval face',
      'haircut for oval face shape',
      'haircut for oval shape face',
      'best haircuts for oval faces',
      'oval face haircut female',
      'oval face haircut male',
      "men's haircut for oval face",
      "men's haircut for oblong face shape",
      'haircut for oval shape face men',
      'short haircut for oval face',
      'oval face hairstyles',
      'pixie cut for oval face',
      'long hair for oval face',
    ],
    shapeDescription:
      'An oval face is longer than it is wide, with the forehead slightly wider than the jaw and gentle curves throughout. Considered the "ideal" shape because most cuts flatter it.',
    howToKnow: [
      'Face length is roughly 1.5× the width across the cheekbones.',
      'Forehead is slightly wider than the jawline.',
      'Jaw is gently rounded — neither sharp nor very soft.',
      'Cheekbones are the widest point but only slightly wider than forehead and jaw.',
      'No dramatic angles — overall outline feels balanced and elongated.',
    ],
    recommendedCuts: [
      { name: 'Blunt collarbone bob', why: 'The oval shape can carry a strong horizontal line without distortion. Sharp, polished, modern.' },
      { name: 'Long layers with face-framing pieces', why: 'Plays up the natural symmetry, adds movement without disturbing balance.' },
      { name: 'Curtain bangs', why: 'Frames the cheekbones — universally flattering on oval shapes.' },
      { name: 'Sleek pixie cut', why: 'Shows off the bone structure that the oval shape already provides.' },
      { name: 'Side-parted long waves', why: 'Asymmetric drape highlights the oval outline naturally.' },
    ],
    avoidCuts: [
      { name: 'Cuts that completely cover the forehead', why: 'Heavy bangs hide the natural balance — you want to display the oval, not mask it.' },
      { name: 'Flat one-length styles with zero movement', why: 'Wastes the shape — oval can carry texture, layers, drama. No reason to play it that safe.' },
    ],
    faq: [
      { q: 'What is the best haircut for an oval face shape?', a: 'Almost any haircut flatters an oval face. Blunt collarbone bobs, long layers with face-framing pieces, curtain bangs, sleek pixies and side-parted long waves all work beautifully.' },
      { q: "Why is an oval face called the 'ideal' shape?", a: 'Because the proportions (length ~1.5× width, balanced forehead-jaw, gentle curves) flatter most haircuts and styles. Stylists use the oval as the reference shape that other cuts try to "create" the illusion of.' },
      { q: 'Can men with oval faces wear any haircut?', a: 'Mostly yes. Short cuts (buzz, crew, fade) work because the bone structure is balanced. Medium and long cuts also flatter — the oval is forgiving. The only thing to be careful of: if your face is on the longer end of oval (oblong), avoid styles that add too much vertical height on top.' },
      { q: 'How do I know if my face is oval?', a: 'Pull your hair back. If your face length is about 1.5× your face width, your forehead is slightly wider than your jaw, and the outline curves gently with no sharp angles, you have an oval face shape.' },
      { q: 'Should oval faces get bangs?', a: 'Yes if you want them — curtain bangs and side-swept fringes both flatter. Avoid only heavy thick fringes that cover the forehead entirely, since they hide the natural balance of the shape.' },
      { q: 'What is the difference between oval and oblong face shapes?', a: 'Oblong is essentially a longer oval — same balanced proportions but the length-to-width ratio is greater than 1.5. Oblong faces should avoid styles that add height on top (which exaggerates the length) and benefit from chin-length cuts.' },
      { q: 'Can I see these cuts on my own face?', a: 'Yes — Agalaz lets you upload your photo and try any haircut style on your real face in 30 seconds. Free first render.' },
    ],
    ogImage: '/og/haircut-oval-face.png',
  },
  diamond: {
    shape: 'diamond',
    slug: 'haircut-for-diamond-face',
    shapeLabel: 'diamond',
    h1: { primary: 'Best Haircuts for', italic: 'Diamond Faces.' },
    hero:
      'Diamond face shapes have dramatic cheekbones and narrow jaw + forehead — your goal is balance. Try side-parted lobs, chin-length bobs and textured fringes on YOUR photo first, see what actually softens the shape before booking.',
    metaTitle: 'Best Haircut for Diamond Face Shape — AI Try-On 2026',
    metaDescription:
      'Find the best haircut for a diamond face shape. Try chin-length bobs, side-parted lobs and textured fringes on YOUR real face with AI. Free, no signup, 30 sec.',
    keywords: [
      'haircut for diamond face',
      'haircut for diamond face shape',
      'best haircuts for diamond faces',
      'diamond face haircut female',
      'diamond face haircut male',
      'short haircut for diamond face',
      'long haircut for diamond face',
      'diamond face hairstyles',
      'bangs for diamond face',
      'pixie cut for diamond face',
    ],
    shapeDescription:
      'A diamond face has narrow forehead and jawline with the cheekbones as the widest point — angular and striking, often called "the rarest shape".',
    howToKnow: [
      'Cheekbones are the widest part of your face — clearly wider than forehead and jaw.',
      'Forehead is narrower than your cheekbones, sometimes coming to a slight peak.',
      'Jaw is narrow and pointed, possibly with a sharp chin.',
      'Face length is generally longer than the width across the cheeks.',
      'Looking at your outline, the shape suggests a gem — wide in the middle, narrow at top and bottom.',
    ],
    recommendedCuts: [
      { name: 'Chin-length bob with side part', why: 'Adds width to the narrow jawline and balances the dominant cheekbones.' },
      { name: 'Side-swept fringe', why: 'Adds visual width at the forehead, balancing the peaked top of the diamond.' },
      { name: 'Long lob with face-framing layers', why: 'Layers near the jaw soften the narrow chin and pad the lower face.' },
      { name: 'Textured pixie with volume on the sides', why: 'For shorter cuts: width near the temples broadens the narrow forehead.' },
      { name: 'Curtain bangs that flare at the cheek', why: 'Hides cheekbone prominence, creates a softer transition from forehead to jaw.' },
    ],
    avoidCuts: [
      { name: 'Tight slicked-back styles', why: 'Exposes the cheekbone width and emphasizes the diamond peak — no balance.' },
      { name: 'Cuts with extreme volume at the crown', why: 'Adds height to a face that already has visual width at the cheekbones, making the chin look even narrower.' },
      { name: 'Long blunt one-length hair past the chest', why: 'Without layers near the jaw, doesn\'t do anything to soften the narrow chin.' },
    ],
    faq: [
      { q: 'What is the best haircut for a diamond face shape?', a: 'Chin-length bobs with side parts, side-swept fringes, long lobs with face-framing layers, and curtain bangs all flatter diamond face shapes by softening the cheekbones and balancing the narrow forehead and jaw.' },
      { q: 'How do I know if I have a diamond face?', a: 'Pull your hair fully back. If your cheekbones are clearly the widest part of your face, your forehead and jaw are narrower than your cheeks, and your chin comes to a slight point, you have a diamond face shape.' },
      { q: 'Are diamond faces rare?', a: 'Yes — diamond is one of the less common face shapes (along with heart and inverted triangle). Most people have oval, round, or square. The strong cheekbones make diamond shapes very photogenic.' },
      { q: 'Should diamond faces have bangs?', a: 'Yes — side-swept and curtain bangs are highly flattering. They add visual width to the narrow forehead and break up the angular outline. Avoid only thick blunt fringes that hide the forehead entirely.' },
      { q: 'Can a diamond face wear a pixie cut?', a: 'Yes — but with volume on the sides rather than the top. The goal is to broaden the temples and avoid adding more height. A textured pixie with side-swept length works beautifully.' },
      { q: 'What length of hair flatters diamond faces?', a: 'Chin-length to collarbone-length tends to work best because it pads the narrow jawline. Long hair also works if you have layers near the jaw to soften the chin point.' },
      { q: 'Can I see these cuts on my own face before the salon?', a: 'Yes — Agalaz lets you upload your photo and try any haircut on your real face in 30 seconds. Free first render, see exactly how a chin-length bob or side-swept fringe softens your cheekbones before booking.' },
    ],
    ogImage: '/og/haircut-diamond-face.png',
  },
  square: {
    shape: 'square',
    slug: 'haircut-for-square-face',
    shapeLabel: 'square',
    h1: { primary: 'Best Haircuts for', italic: 'Square Faces.' },
    hero:
      'Square face shapes have a strong jawline that needs softening. Try long layers, side-parted lobs and textured shags on YOUR real photo with AI — see which cut balances your jaw before the salon chair.',
    metaTitle: 'Best Haircut Styles for Square Face — Women & Men AI Try-On 2026',
    metaDescription:
      'Best haircut styles for a square face shape — women & men. Long layers, side-parted lobs and textured shags soften a strong jaw. Try them on YOUR face with AI. Free, 30 seconds.',
    keywords: [
      'haircut for square face',
      'haircut for square face shape',
      'best haircuts for square faces',
      'square face haircut female',
      'square face haircut male',
      'short haircut for square face',
      'long haircut for square face',
      'square face hairstyles',
      'bangs for square face',
      'pixie cut for square face',
      "men's haircut for square face",
    ],
    shapeDescription:
      'A square face has a strong, angular jawline with width similar at forehead, cheekbones and jaw — bold, structured, often called "the model shape" but it benefits from softening.',
    howToKnow: [
      'Forehead, cheekbones and jaw are roughly equal in width.',
      'Jawline is sharp, square and clearly defined — not curved.',
      'Face length and width are similar (1:1 ratio approximately).',
      'Forehead may have a flat top edge rather than a curve.',
      'Profile shows a strong, angular chin and jaw corners.',
    ],
    recommendedCuts: [
      { name: 'Long layers below the jaw', why: 'Hair falling past the jawline in soft layers visually softens the square corners.' },
      { name: 'Side-parted lob with movement', why: 'Asymmetry breaks the squareness; layers near the jaw blur the angular line.' },
      { name: 'Textured shag with curtain bangs', why: 'Adds curves and softness everywhere the face has angles.' },
      { name: 'Wavy or curly long hair', why: 'Curves at the perimeter directly counter the linear edges of the jaw.' },
      { name: 'Side-swept fringes', why: 'Diagonal line softens the flat forehead edge and adds asymmetry.' },
    ],
    avoidCuts: [
      { name: 'Blunt jaw-length bobs', why: 'Cutting at the exact jawline emphasizes the squareness — same problem round faces have at the cheek.' },
      { name: 'Heavy straight-across fringes', why: 'Reinforces the horizontal angularity already at the forehead.' },
      { name: 'Tight slicked-back styles', why: 'Exposes the full jaw structure with no softening at all.' },
    ],
    faq: [
      { q: 'What is the best haircut for a square face shape?', a: 'Long layers below the jaw, side-parted lobs with movement, textured shags with curtain bangs, and wavy long hair all soften the strong jawline of a square face. Avoid blunt jaw-length bobs and heavy straight fringes.' },
      { q: 'How do I know if I have a square face?', a: 'Pull your hair back. If your forehead, cheekbones and jaw are roughly equal width, your jawline is sharp and angular (not curved), and your face is roughly as long as it is wide, you have a square face shape.' },
      { q: 'Is a square face good or bad for haircuts?', a: 'Neither — it is a striking, photogenic shape (think models and celebrities like Olivia Wilde, Angelina Jolie, Brad Pitt). The goal of a haircut is to soften the angles slightly, not hide them entirely. Strong jaws are an asset.' },
      { q: 'Should square faces avoid bangs?', a: 'Avoid only heavy blunt fringes that cut horizontally across the forehead — they reinforce the angular outline. Side-swept and curtain bangs work beautifully because they add diagonal lines that soften the jaw.' },
      { q: 'Can a square face wear short hair?', a: 'Yes — but with texture and softness rather than blunt edges. A textured pixie with side-swept length, a shag with movement, or a side-parted bob just below the jaw all work. Avoid super-short cuts that fully expose the jaw line.' },
      { q: 'What about square faces for men?', a: 'Square jaws are highly desirable in men. Soft texture on top (textured crop, French crop, side-parted medium length) plus tapered sides works. Avoid extreme high-and-tight cuts that maximize the angular look unless that is exactly what you want.' },
      { q: 'Can I see these cuts on my own face?', a: 'Yes — Agalaz lets you upload your photo and try any haircut on your real face in 30 seconds. Free first render, see exactly how layers or a shag soften your jaw before booking.' },
    ],
    ogImage: '/og/haircut-square-face.png',
  },
};

export const FACE_SHAPE_LIST: FaceShape[] = ['round', 'oval', 'diamond', 'square'];
