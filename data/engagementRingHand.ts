/**
 * Static content for /engagement-ring-on-which-hand. Lives in /data so that
 * BOTH the client landing component AND the server-side layout (JSON-LD)
 * can import from a server-safe module — same fix pattern we used for
 * festa junina after the first deploy threw a server-side exception.
 */

export interface RingTradition {
  region: string;
  hand: string;
  explanation: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const RING_TRADITIONS: RingTradition[] = [
  {
    region: 'United States · Canada · UK · Australia',
    hand: 'Left ring finger',
    explanation:
      'Western tradition: the engagement ring (and later the wedding band) goes on the fourth finger of the LEFT hand — the so-called "vena amoris", a once-believed vein running directly to the heart. Anatomically the vein doesn\'t exist, but the symbolism stuck for ~400 years.',
  },
  {
    region: 'Spain · Portugal · Brazil · Argentina · Colombia',
    hand: 'Right hand (engagement) → moves to left at wedding',
    explanation:
      'In most Iberian and Latin-American cultures the engagement ring is worn on the RIGHT ring finger during the engagement period, then ceremonially transferred to the LEFT hand on the wedding day. Often paired with a matching ring exchange between bride and groom.',
  },
  {
    region: 'Germany · Austria · Switzerland · Denmark · Norway',
    hand: 'Left hand (engagement) → moves to right at wedding',
    explanation:
      'Reverse of the Iberian tradition: the engagement ring sits on the LEFT during engagement, then is moved to the RIGHT ring finger after the wedding ceremony, where it stays as the wedding band.',
  },
  {
    region: 'Russia · Greece · India · Orthodox Christian countries',
    hand: 'Right hand throughout',
    explanation:
      'In Orthodox Christian tradition (Greek, Russian, Serbian) and across India, both engagement and wedding rings are worn on the RIGHT hand. The right hand symbolises strength, virtue and the side that swears oaths. In India a small toe ring (bichiya) is also typical for married women.',
  },
  {
    region: 'Jewish tradition (varies by community)',
    hand: 'Right index finger (ceremony) → left ring finger',
    explanation:
      'During the Jewish wedding ceremony the ring is placed on the bride\'s RIGHT INDEX finger (the "pointing" finger) so witnesses can clearly see the act. After the ceremony most brides move it to the LEFT ring finger in line with broader Western convention.',
  },
  {
    region: 'China · Japan · Korea · Vietnam · much of East Asia',
    hand: 'Left ring finger (modern adoption)',
    explanation:
      'Western convention has been adopted broadly across East Asia in modern times — engagement and wedding rings on the LEFT ring finger. Traditional Chinese symbolism additionally assigns each finger to family members: thumb=parents, index=siblings, middle=self, ring=spouse, pinky=children.',
  },
  {
    region: 'Same-sex couples',
    hand: 'Either hand — personal choice',
    explanation:
      'No prescriptive convention. Some couples follow their cultural background, others deliberately choose the less-traditional hand to mark their union as their own. The modern "no rules" approach has been embraced especially by LGBTQ+ couples.',
  },
];

export const ENGAGEMENT_RING_FAQ: FaqEntry[] = [
  {
    q: 'What hand does the engagement ring go on?',
    a: 'In the United States, Canada, the UK and most of Western Europe the engagement ring goes on the FOURTH FINGER of the LEFT HAND — the "ring finger". This tradition dates back to the ancient Roman belief in a "vein of love" running from that finger to the heart. In Spain, Portugal, most of Latin America, Russia, Greece, India and Orthodox countries the ring is worn on the RIGHT hand instead. Same-sex couples increasingly choose freely.',
  },
  {
    q: 'Which hand is the engagement ring worn on in the United States?',
    a: 'The LEFT hand, fourth finger (ring finger). This applies to both engagement ring and wedding band. After the wedding most brides wear the engagement ring "stacked" on top of the band on the same finger.',
  },
  {
    q: 'Why is the engagement ring on the left hand?',
    a: 'The Romans believed a vein called the "vena amoris" — vein of love — ran directly from the fourth finger of the left hand to the heart. Modern anatomy has disproved this (every finger has equal vasculature), but the romantic symbolism became the dominant convention across Western Europe and the Americas in the 1500s and has been preserved.',
  },
  {
    q: 'Why do some countries wear the engagement ring on the right hand?',
    a: 'Several reasons depending on culture. Orthodox Christianity (Russia, Greece, Serbia) treats the right hand as the side of virtue and oath-taking. In Spain, Portugal and much of Latin America the right hand is the engagement hand and the ring moves to the left at the wedding ceremony. In India, the right hand is considered pure and the left is associated with non-pure tasks — making the right the preferred hand for the ring.',
  },
  {
    q: 'Does the engagement ring move to the other hand after the wedding?',
    a: 'It depends on the tradition. In the US/UK the ring stays on the left throughout — the wedding band joins it underneath. In Spain/Portugal/Latin America it MOVES from right to left at the ceremony. In Germany/Austria/Norway it MOVES from left to right at the ceremony. In Greek/Russian Orthodox it stays on the right always.',
  },
  {
    q: 'Can I just wear my engagement ring on the hand I prefer?',
    a: 'Absolutely. The conventions exist as guidance but no one is going to police your hand choice. Practical reasons people pick the non-traditional hand: dominant-hand wear damages the stone faster, work that involves frequent hand washing or gloves, sensitivity in the ring finger, or simply personal preference. Same-sex couples increasingly choose freely.',
  },
  {
    q: 'Which finger is the ring finger?',
    a: 'The FOURTH finger from the thumb (counting thumb as 1, index as 2, middle as 3, ring as 4, pinky as 5). On the left hand this is the finger between the middle finger and the pinky — the one with no specific muscle of its own that operates independently.',
  },
  {
    q: 'Can I see how an engagement ring looks on my hand before buying?',
    a: 'Yes — Agalaz lets you upload a photo of your hand and any reference engagement ring (Tiffany, Cartier, Pinterest, indie jeweller — any image), and shows you how the diamond + setting looks on YOUR finger in 30 seconds. Free first render, no card. Works for solitaires, halos, three-stone, vintage, and any cut from round to oval to emerald to pear.',
  },
];
