import type { Metadata } from 'next';

const FAQ = [
  { q: 'How does the virtual pet clothing try-on work?', a: 'Upload a clear photo of your dog or cat and a photo of the outfit. The AI maps the garment onto your pet in 30 seconds, preserving fur color, body shape, and proportions.' },
  { q: 'What pet clothing can I try?', a: 'Sweaters, hoodies, raincoats, harness apparel, Halloween costumes, holiday sweaters, wedding outfits, bandanas, bow ties, pajamas, cooling vests, life jackets — from any brand (Chewy, Ruffwear, Etsy, Petco, Amazon, custom).' },
  { q: 'Does it work for any breed and size?', a: 'Yes. Chihuahua to Great Dane, short-coat to Persian. The AI adapts the garment to your pet\'s real body shape and fur length.' },
  { q: 'Can I try Halloween or holiday costumes?', a: 'Yes — most popular use case. See pumpkin, dinosaur, hot dog, lion mane, Christmas elf on YOUR pet before paying $30-60 for a costume that may end up donated.' },
  { q: 'Will it preserve their fur and markings?', a: 'Yes. Eye color, fur pattern, ear shape, breed-specific features, white socks — all preserved. The AI dresses them, not paints over them.' },
  { q: 'Useful for pet brands and boutiques?', a: 'Yes. Embed on product pages — typical 3-5x conversion lift on pet apparel and a meaningful drop in returns. Partner pricing for pet DTC brands.' },
];

export const metadata: Metadata = {
  title: 'Virtual Pet Clothing Try-On — See Outfits On Your Dog & Cat | Agalaz',
  description:
    'Try sweaters, costumes, and outfits on your real dog or cat with AI before buying. Halloween, holidays, daily wear — see it on YOUR pet in 30 seconds. Free, no app.',
  keywords: [
    'virtual pet clothing try on',
    'ai dog clothing try on',
    'see outfit on my dog',
    'pet costume simulator',
    'dog sweater try on',
    'cat clothes try on online',
    'halloween pet costume preview',
    'try clothes on my dog ai',
    'pet apparel virtual try on',
    'dog outfit simulator',
  ],
  openGraph: {
    title: 'Virtual Pet Clothing Try-On — See Outfits On Your Pet',
    description: 'Upload a pet photo, drop in any outfit, see it on YOUR dog or cat in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-pet-clothing-try-on',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Virtual Pet Clothing Try-On', description: 'Upload a pet photo, drop any outfit, render in 30 seconds.' },
  alternates: {
    canonical: 'https://agalaz.com/virtual-pet-clothing-try-on',
    languages: {
      en: 'https://agalaz.com/virtual-pet-clothing-try-on',
      es: 'https://agalaz.com/es/virtual-pet-clothing-try-on',
      fr: 'https://agalaz.com/fr/virtual-pet-clothing-try-on',
      pt: 'https://agalaz.com/pt/virtual-pet-clothing-try-on',
      de: 'https://agalaz.com/de/virtual-pet-clothing-try-on',
      it: 'https://agalaz.com/it/virtual-pet-clothing-try-on',
      'x-default': 'https://agalaz.com/virtual-pet-clothing-try-on',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Pet Clothing Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-pet-clothing-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Pet Clothing Try-On', item: 'https://agalaz.com/virtual-pet-clothing-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
