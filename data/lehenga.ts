/**
 * Static content for /hi/lehenga (online lehenga try-on, India market).
 * Lives in /data so client + server-side layout share the source.
 *
 * Audience: bilingual Indian users searching "online lehenga", "lehenga
 * choli online" — content in English with Hindi/Hinglish accents.
 */

export interface LehengaStyle {
  name: string;
  pieces: string;
  occasion: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const LEHENGA_STYLES: LehengaStyle[] = [
  {
    name: 'Bridal lehenga · classic red',
    pieces:
      'Heavy gold zardozi or kundan embroidery on red silk · matching dupatta · choli with full sleeves · jhumkas + maang tikka + nath · red bangles · gold heels',
    occasion: 'Bride at North Indian wedding, varmaala, pheras',
  },
  {
    name: 'Bridal lehenga · pastel sangeet',
    pieces:
      'Powder pink or peach lehenga with light sequin work · sheer dupatta with scalloped edges · cropped backless choli · floral jewelry · open hair with side flowers',
    occasion: 'Sangeet, mehendi, modern brides who skip red, pre-wedding shoot',
  },
  {
    name: 'Wedding-guest lehenga',
    pieces:
      'Mid-weight embroidery on emerald, mustard or wine silk · medium-coverage choli · tassel dupatta · statement earrings + bangle stack · juttis or block heels',
    occasion: 'Friend\'s wedding, cousin\'s reception, bridesmaid duty',
  },
  {
    name: 'Festive Diwali lehenga',
    pieces:
      'Gota patti or mirror work on bright tone (orange, fuchsia, royal blue) · dupatta draped over one shoulder · classic choli with mirror embroidery · jhumkas + nose pin',
    occasion: 'Diwali puja, family gathering, evening party, festive photoshoot',
  },
  {
    name: 'Lehenga choli online · everyday designer',
    pieces:
      'Cotton or rayon lehenga in pastel solids · printed dupatta · choli with tie-back · minimal jewelry · flat sandals or kolhapuris',
    occasion: 'Festive office days, mehendi for guest, college festival, casual party',
  },
  {
    name: 'Indo-Western lehenga',
    pieces:
      'Lehenga skirt with cape blouse OR off-shoulder choli OR shirt-style top · belt cinching the waist · contemporary jewelry · pointed heels',
    occasion: 'Reception, sangeet for fashion-forward guest, cocktail dinner',
  },
  {
    name: 'Bridal lehenga · Sabyasachi-inspired',
    pieces:
      'Deep maroon or oxidised gold velvet · heavy zardozi all over · matching dupatta veil-style · uncut diamond jewelry suite · vintage style braid · velvet juttis',
    occasion: 'Premium bride, royal-themed wedding, palace venue, film-style shoot',
  },
];

export const LEHENGA_FAQ: FaqEntry[] = [
  {
    q: 'Where can I buy lehenga online in India?',
    a: 'Top online lehenga retailers in India: Myntra (designer + budget), Nykaa Fashion (curated), Aza Fashion (premium), Manyavar Mohey (mid-range bridal), Sabyasachi (luxury, by appointment), Ajio Luxe, FabIndia (cotton lehengas), and Indian designers on Amazon Fashion. Prices range from ₹2,000 (rayon everyday) to ₹15-50 lakhs (Sabyasachi bridal). Always check return policy before buying expensive lehengas online.',
  },
  {
    q: 'How do I know if a lehenga will look good on me without trying it?',
    a: 'This is exactly what Agalaz solves. Upload your photo and the lehenga photo from any website (Myntra, Aza, Nykaa, Sabyasachi catalog), and our AI shows how it looks on YOUR body in 30 seconds. Free first render. Useful for bridal lehengas where you cannot easily go to a store and try, and you want to compare 4-5 options visually before deciding.',
  },
  {
    q: 'What lehenga colour suits my skin tone?',
    a: 'Warm Indian skin tones (most South Asians): emerald, mustard, deep red, terracotta, gold, magenta, bottle green. Cool fair tones: pastel pink, mint, ivory, lavender, blue. Wheatish/dusky skin: deep jewel tones (sapphire, emerald, ruby), peach, royal blue, oxidised silver work. Use the AI try-on to compare — colour theory is general, your face will tell the truth.',
  },
  {
    q: 'How much does a bridal lehenga cost in India?',
    a: 'Budget bridal: ₹15,000-30,000 (Myntra, Manyavar). Mid-range: ₹50,000-1.5 lakh (Aza, Anita Dongre, Ridhi Mehra). Designer: ₹2-5 lakhs (Sabyasachi RTW, Manish Malhotra, Anamika Khanna). Luxury custom: ₹10 lakhs+. Most Indian brides spend ₹1-3 lakhs on the wedding lehenga + ₹50K-1L on reception/sangeet outfits.',
  },
  {
    q: 'Can I rent a lehenga instead of buying?',
    a: 'Yes. Major rental platforms: Flyrobe (lehenga rental from ₹3,000-30,000), Stage3, Rent It Bae, Ladybug. Designer lehengas are available for rent at 10-15% of buy price. Useful for: wedding-guest lehenga (you wear once), sangeet/mehendi for the bride who wants 3 different looks, or to test a style before committing to buy.',
  },
  {
    q: 'What is the difference between lehenga, ghagra, and saree?',
    a: 'Lehenga = long flared skirt + crop top (choli) + dupatta. Ghagra = traditional Rajasthani version of lehenga, generally heavier and more fitted at hips. Saree = single 5-9 yard fabric draped around the body. Lehenga is much easier to wear and more youthful in styling; saree is more elegant and traditional. Modern brides often wear lehenga for sangeet and saree for the actual wedding ceremony.',
  },
  {
    q: 'Can I see the lehenga on me before buying online?',
    a: 'Yes — Agalaz lets you try any online lehenga on YOUR own photo with AI in 30 seconds. Upload your full-body photo + the lehenga product image from Myntra, Aza, Sabyasachi, Manyavar, or any retailer. AI maps the lehenga onto your body preserving your face, skin tone, and proportions. First render is free. Saves you from ₹2,000-50,000 in returns and disappointment.',
  },
];
