/**
 * Static content for /bridesmaid-dress-try-on. Lives in /data so client +
 * server-side layout share the source.
 *
 * Targets the bridesmaid-dress cluster surfaced by DataForSEO scan: 201K/mo
 * for "bridesmaid dress" alone, KD 4-9, transactional intent. Wedding
 * conversion adjacency to /virtual-wedding-dress-try-on.
 */

export interface DressStyle {
  name: string;
  pieces: string;
  occasion: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const BRIDESMAID_STYLES: DressStyle[] = [
  {
    name: 'Floor-length chiffon · classic',
    pieces:
      'Floor-length flowy chiffon · v-neck or sweetheart · empire or cinched waist · matching shoes (block heel or strappy) · simple jewelry · loose curls or low chignon',
    occasion: 'Traditional church wedding, formal evening reception, garden weddings',
  },
  {
    name: 'Mismatched dresses · same colour',
    pieces:
      'Each bridesmaid picks her own silhouette in the agreed colour palette · halter, strap, sweetheart, off-shoulder all coexist · same shoe colour family · cohesive bouquets unify the look',
    occasion: 'Modern weddings, bridal parties of 4+ where one cut won\'t flatter every body type',
  },
  {
    name: 'Sage / dusty colours · 2026 trend',
    pieces:
      'Sage green, dusty blue, terracotta, mauve, sand, champagne · matte satin or silk-feel polyester · midi or floor-length · earthy bouquets · gold jewelry',
    occasion: 'Outdoor weddings, vineyard, autumn-coloured palettes, boho-chic bride',
  },
  {
    name: 'Velvet bridesmaid dress · winter wedding',
    pieces:
      'Velvet floor-length dress in burgundy, navy, emerald or plum · long sleeves or cap sleeve · matching velvet clutch · pearl earrings · low updo',
    occasion: 'Winter weddings, late-November to February, cathedral or candlelit venues',
  },
  {
    name: 'Plus size bridesmaid dress',
    pieces:
      'A-line silhouette that skims rather than clings · sweetheart or v-neck · empire waist or wrap · structured strap (not spaghetti) · midi or floor-length · supportive but flattering shapewear',
    occasion: 'Any wedding with plus-size bridal party — the right cut matters more than the size',
  },
  {
    name: 'Modern slip · simple elegance',
    pieces:
      'Bias-cut slip dress in satin · spaghetti straps or cowl neck · minimal jewelry · sleek hair · barely-there sandals · the "I look effortless" energy',
    occasion: 'Minimalist weddings, modern city venues, fashion-forward brides',
  },
  {
    name: 'Junior bridesmaid · girls 8-13',
    pieces:
      'Tea-length tulle or A-line · matching colour to senior bridesmaids in age-appropriate cut · ballet flats or low heels · floral crown · simple bow sash',
    occasion: 'When the bride wants younger family members included in the bridal party',
  },
];

export const BRIDESMAID_FAQ: FaqEntry[] = [
  {
    q: 'How do I choose a bridesmaid dress?',
    a: 'Decide on length first (floor / midi / tea-length), then colour palette (the bride leads), then silhouette. Most modern bridal parties use ONE colour but allow each bridesmaid to pick a flattering cut for her body — this looks more polished in photos than 8 identical dresses on different bodies. Consider venue (outdoor = lighter fabric, winter = velvet/long sleeves) and time of day (evening = darker, day = lighter).',
  },
  {
    q: 'What colour should bridesmaid dresses be?',
    a: '2026 trends: sage green, dusty blue, terracotta, mauve, champagne, navy, burgundy. Spring/summer: pastels (powder pink, sage, dusty blue). Fall: earth tones (terracotta, rust, mustard, deep mauve). Winter: jewel tones (emerald, navy, burgundy, plum). Avoid pure white (bride only) and very pale ivory.',
  },
  {
    q: 'Where can I buy bridesmaid dresses online?',
    a: 'Top retailers: Birdy Grey (affordable, $99 dresses), Azazie (try-at-home + free swatches), Show Me Your Mumu (boho), Lulus (budget), Anthropologie BHLDN (premium $200-400), Reformation (sustainable), Revolve (modern), Asos Wedding (UK). Always check return policy — most online wedding retailers have 30-day returns.',
  },
  {
    q: 'How much does a bridesmaid dress cost?',
    a: 'Budget: $80-150 (Birdy Grey, Lulus, Asos Wedding). Mid-range: $150-300 (Azazie, Revolve, Show Me Your Mumu). Premium: $300-500 (BHLDN, Anthropologie). Luxury: $500-1000+ (designer, custom). The average bridesmaid in 2026 spends $200-300. Tip: many designers offer dye-to-match for the same dress in 30+ colour options.',
  },
  {
    q: 'Should bridesmaids all wear the same dress?',
    a: 'Modern weddings increasingly allow MISMATCHED dresses in the same colour family — each bridesmaid picks a flattering silhouette (halter, sweetheart, strap) in the agreed colour. This works because every body looks better in a slightly different cut. Identical dresses still work for very formal weddings or photogenic uniformity.',
  },
  {
    q: 'How do I find a bridesmaid dress that flatters my body?',
    a: 'Pear shape: A-line, fit-and-flare with detailing on top. Apple shape: empire waist, flowy fabric below the bust, V-neck. Hourglass: anything fitted with a defined waist. Athletic: ruched waist, sweetheart neckline, fabric to add curves. Petite: tea-length or short midi to avoid drowning in floor-length. Use the AI try-on to compare 5-6 silhouettes on YOUR body before paying.',
  },
  {
    q: 'Can I see the bridesmaid dress on me before buying?',
    a: 'Yes — Agalaz lets you upload a photo of yourself + the bridesmaid dress image (from Birdy Grey, Azazie, BHLDN, any retailer) and shows you how it looks on YOUR body in 30 seconds. Free first render. Saves you from $80-500 in returns and the awkward "I don\'t love it" moment with the bride.',
  },
];
