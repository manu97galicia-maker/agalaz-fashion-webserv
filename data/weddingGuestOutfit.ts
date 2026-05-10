/**
 * /wedding-guest-outfit — the largest single cluster surfaced by DataForSEO:
 * 7 variations of "wedding guest outfit" all at 301,000/mo, KD 0. Combined
 * potential ~2M/mo for a single landing. Plus seasonal offshoots:
 * "wedding guest fall outfit" at 90,500/mo and many spring/summer/winter
 * variants captured in keywords.
 */

export interface WeddingGuestOutfit {
  name: string;
  pieces: string;
  occasion: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const WEDDING_GUEST_OUTFITS: WeddingGuestOutfit[] = [
  {
    name: 'Spring wedding guest · pastel midi',
    pieces:
      'Midi dress in pastel (lavender, pale blue, blush, mint) · slingback heels · structured handbag · sheer cardigan if outdoor · soft waves · minimal jewelry',
    occasion: 'March-May outdoor weddings, garden ceremonies, brunch reception',
  },
  {
    name: 'Summer wedding guest · floral maxi',
    pieces:
      'Long floral maxi dress in cotton or linen · block heels or wedges · raffia bag · simple gold jewelry · loose hair with floral pin',
    occasion: 'June-August outdoor or beach weddings, hot weather, all-day events',
  },
  {
    name: 'Fall wedding guest · jewel tone midi',
    pieces:
      'Midi dress in deep emerald, burgundy, navy, terracotta, or mustard · pumps · clutch · cropped blazer for chillier evenings · low chignon · gold tones',
    occasion: 'September-November weddings, vineyard, autumn-coloured palettes',
  },
  {
    name: 'Winter wedding guest · velvet long-sleeve',
    pieces:
      'Long-sleeve velvet midi or maxi in burgundy/forest/navy · closed-toe pumps · velvet clutch · faux fur stole · pearl earrings · sleek updo',
    occasion: 'December-February weddings, candlelit venues, cathedral ceremonies',
  },
  {
    name: 'Black-tie wedding guest · floor-length',
    pieces:
      'Floor-length gown in jewel tone or classic black · strappy or pointed heels · embellished clutch · statement earrings · sleek bun or vintage waves',
    occasion: 'Black-tie or "formal attire" dress code, evening reception, ballroom venue',
  },
  {
    name: 'Beach wedding guest · breezy and modest',
    pieces:
      'Knee-length or maxi flowy dress · low wedges or strappy flats (heels sink in sand) · sun hat · light cover-up for sunburn · minimal accessories',
    occasion: 'Beach or destination weddings, daytime outdoor in coastal venue',
  },
  {
    name: 'Backyard / casual wedding guest',
    pieces:
      'Knee-length or midi day dress · block heel sandals · simple jewelry · light cardigan or denim jacket if very casual · natural makeup',
    occasion: 'Backyard, brewery, barn, casual dress code wedding, daytime',
  },
  {
    name: 'Wedding guest outfit for men',
    pieces:
      'Suit in navy, charcoal, or dark grey (avoid black unless evening formal) · crisp white or pale blue shirt · silk tie or pocket square in seasonal colour · brown or black leather shoes',
    occasion: 'Any wedding except black-tie (which requires tuxedo). Universal male formula.',
  },
];

export const WEDDING_GUEST_FAQ: FaqEntry[] = [
  {
    q: 'What is appropriate to wear as a wedding guest?',
    a: 'Read the dress code on the invitation FIRST. Common codes: "black tie" = floor-length gown / tuxedo; "cocktail" = midi dress / suit; "formal" = midi or maxi / suit + tie; "garden party" = midi pastel / dress shirt + chinos; "casual" = knee-length day dress / button-up + slacks. Then match the season (pastel for spring, jewel tones for fall, velvet for winter, light cotton for summer beach).',
  },
  {
    q: 'What colour should you NEVER wear to a wedding?',
    a: 'Three hard rules: NEVER white, off-white, ivory, cream, champagne, or any pale colour that photographs as white — that is the bride\'s colour. NEVER black at a daytime/casual wedding (still acceptable for evening formal). NEVER red at a Christian Western wedding (it visually competes with the bride). When in doubt, ask the bride or pick a clearly bridal-incompatible colour family.',
  },
  {
    q: 'Can a wedding guest wear black?',
    a: 'Yes — at evening, formal, or black-tie weddings. Avoid pure black at daytime weddings unless it has a print or coloured accents. Modern brides increasingly accept black for any wedding, but the safer path is "black with pattern, lace, or coloured fabric" rather than head-to-toe black.',
  },
  {
    q: 'What outfit for a fall wedding guest?',
    a: 'Fall (September-November): jewel tones (emerald, burgundy, navy, plum, mustard, terracotta), midi-length most flattering, long-sleeve or with a cropped blazer for cool evenings, closed-toe pumps. Skip pastels (too summery) and white (always). Bonus points for velvet detail or texture.',
  },
  {
    q: 'What to wear to a summer wedding?',
    a: 'Summer (June-August): light fabrics (cotton, linen, chiffon), florals and pastels work great, midi-to-maxi length for outdoor/beach, block heels or wedges (heels sink in grass and sand), sun protection (light hat or fascinator), bright but not neon. Avoid heavy fabrics like velvet, brocade, or anything you would sweat in.',
  },
  {
    q: 'How much should I spend on a wedding guest outfit?',
    a: 'Average wedding guest spends $100-300 on the outfit (dress + accessories). Budget options: Lulus, Asos Wedding, Amazon Fashion ($40-100). Mid: Free People, Anthropologie, Reformation ($150-300). Premium: Self-Portrait, Ganni, Saloni ($400-800). Tip: rent dresses you would only wear once via Rent the Runway or Hurr — saves money + sustainable.',
  },
  {
    q: 'Can I see how a wedding guest outfit will look on me before buying?',
    a: 'Yes — Agalaz lets you upload your photo and any wedding guest dress (from Asos, Reformation, Lulus, Amazon, anywhere) and shows you how it looks on YOUR body in 30 seconds. Free first render. Saves you returns + the "I don\'t feel confident in this" outcome on the wedding day.',
  },
];
