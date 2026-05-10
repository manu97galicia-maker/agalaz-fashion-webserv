/**
 * Static content for /halloween-couples-costumes. Lives in /data so client +
 * server-side layout share the source.
 *
 * DataForSEO scan: "couples halloween costume" + 8+ variants all at
 * 110,000/mo each, KD 2-3. Combined cluster ~1M searches/mo. Highly
 * seasonal (Sept-Oct peak) but recurring annually.
 */

export interface CoupleCostume {
  name: string;
  pieces: string;
  vibe: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const COUPLE_COSTUMES: CoupleCostume[] = [
  {
    name: 'Barbie & Ken — pink everything',
    pieces:
      'Pink sequin or satin dress (any cut) + pink eye makeup + blow-out hair · pastel suit + Ken-style 80s tee + tan + slicked hair · roller skates optional · "Hi Barbie / Hi Ken" energy',
    vibe: 'Iconic, photogenic, instantly recognisable, low-effort high-impact',
  },
  {
    name: 'Wednesday & Gomez Addams',
    pieces:
      'Black dress with white collar + braids + pale makeup + black tights · pinstripe suit + black shirt + pencil moustache + slicked-back hair · gothic accessories',
    vibe: 'Pop-culture revival (Netflix), spooky-cute, easy to nail',
  },
  {
    name: 'Mario & Princess Peach',
    pieces:
      'Pink princess gown + crown + white gloves + blonde wig optional · red plumber overalls + blue shirt + red cap + moustache + brown boots · "Mama mia"',
    vibe: 'Family-friendly, retro nostalgic, easy DIY',
  },
  {
    name: 'Bonnie & Clyde — vintage gangster',
    pieces:
      'Knee-length 1930s dress + beret + dark lipstick · pinstripe suit + suspenders + fedora + fake cigar · toy guns optional + getaway car prop',
    vibe: 'Sexy classic, photogenic, dressy-Halloween for an event',
  },
  {
    name: 'Sandy & Danny — Grease',
    pieces:
      'Sandy: black leather pants + off-shoulder black top + perm wig · OR pink Pink Ladies jacket + bobby socks · Danny: white tee + leather jacket + jeans + slicked DA haircut',
    vibe: '70s/80s nostalgia, dance-floor ready, all ages',
  },
  {
    name: 'Morticia & Gomez — full Addams Family',
    pieces:
      'Long black dress with mermaid hem + long straight black hair + pale skin + dark lips · pinstripe suit + cigar + slicked hair + pencil moustache · matching gothic aesthetic',
    vibe: 'Same family as Wednesday but more glamorous, adult party energy',
  },
  {
    name: 'Pulp Fiction — Mia & Vincent',
    pieces:
      "Mia: black bob wig + white shirt + black pants + bare feet · Vincent: black suit + skinny tie + slicked back hair · twist contest pose",
    vibe: 'Sophisticated, slightly dark, recognisable to film fans',
  },
  {
    name: 'Salt & pepper · Easy DIY',
    pieces:
      'White t-shirt with "SALT" written in marker · black t-shirt with "PEPPER" · paper-cone hat for each (white/black) · jeans · zero effort, full points',
    vibe: 'Last-minute, broke-college-couple, hilarious low-effort win',
  },
];

export const HALLOWEEN_COUPLES_FAQ: FaqEntry[] = [
  {
    q: 'What is the best couples halloween costume?',
    a: 'The "best" is subjective but the highest-rated couples costumes for 2026 are: Barbie & Ken (still riding the movie), Wednesday & Gomez Addams, Mario & Princess Peach, Sandy & Danny from Grease, and Pulp Fiction\'s Mia & Vincent. The right pick depends on your aesthetic: glam (Barbie, Mia), nostalgic (Mario, Grease), spooky-cute (Wednesday).',
  },
  {
    q: 'How can I tell if a couples costume will work for us before buying?',
    a: 'Use Agalaz to upload your photo + your partner\'s photo + the costume reference image, and AI shows how the look fits BOTH of you in 30 seconds. Free first render. Saves you from $100-300 on costumes that look great on the Amazon model but weird on your actual bodies.',
  },
  {
    q: 'What are the easiest couples halloween costumes?',
    a: 'Salt & Pepper (literally just t-shirts with marker writing). Cop & robber (white shirt + black tie + striped shirt + black mask). Tourist & local. Cat & mouse (just ears + tails). Cookies & milk. Plug & socket. These DIY at home, no shopping, full marks for creativity over budget.',
  },
  {
    q: 'How much do couples halloween costumes cost?',
    a: 'Budget: $0-30 (DIY salt & pepper, scary scarecrow with old clothes). Mid: $30-100 per person on Amazon, Spirit Halloween, or Party City. Premium: $100-300 per person at brick & mortar costume stores or Etsy artisans for high-quality outfits. Couples often spend $80-200 total for both.',
  },
  {
    q: 'What is a sexy couples halloween costume that is not cringe?',
    a: 'Stay away from the "sexy nurse + sexy doctor" stereotype. Better: Bonnie & Clyde (vintage glam not raunchy), Mia & Vincent from Pulp Fiction (sophisticated dark), Morticia & Gomez (gothic glamour), Greek god/goddess (toga + laurel + sandals = elegant), or any classic film couple in their iconic outfit.',
  },
  {
    q: 'Where to buy couples halloween costumes online?',
    a: 'Spirit Halloween (largest selection, October pop-up + online), Party City (mid-range), Amazon (cheap-to-mid, fast shipping), Etsy (handmade & unique, support indie makers), Halloween Costumes dot com (huge selection), Walmart (budget). Always order 4-6 weeks before October to avoid stock-outs and slow shipping.',
  },
  {
    q: 'Can I see how a couples costume looks on us together with AI?',
    a: 'Yes — Agalaz lets you upload separate photos of you and your partner + the costume references, and AI generates a single image showing both of you in the costumes. 30 seconds, free first render. Useful for matching costume kit (colors, fit) before committing to buy.',
  },
];
