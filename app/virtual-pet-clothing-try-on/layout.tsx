import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  { q: 'How does the virtual pet clothing try-on work?', a: 'Upload a clear photo of your dog or cat and a photo of the outfit. The AI maps the garment onto your pet in 30 seconds, preserving fur color, body shape, and proportions.' },
  { q: 'What pet clothing can I try?', a: 'Sweaters, hoodies, raincoats, harness apparel, Halloween costumes, holiday sweaters, wedding outfits, bandanas, bow ties, pajamas, cooling vests, life jackets — from any brand (Chewy, Ruffwear, Etsy, Petco, Amazon, custom).' },
  { q: 'Does it work for any breed and size?', a: 'Yes. Chihuahua to Great Dane, short-coat to Persian. The AI adapts the garment to your pet\'s real body shape and fur length.' },
  { q: 'Can I try Halloween or holiday costumes?', a: 'Yes — most popular use case. See pumpkin, dinosaur, hot dog, lion mane, Christmas elf on YOUR pet before paying $30-60 for a costume that may end up donated.' },
  { q: 'Will it preserve their fur and markings?', a: 'Yes. Eye color, fur pattern, ear shape, breed-specific features, white socks — all preserved. The AI dresses them, not paints over them.' },
  { q: 'Useful for pet brands and boutiques?', a: 'Yes. Embed on product pages — typical 3-5x conversion lift on pet apparel and a meaningful drop in returns. Partner pricing for pet DTC brands.' },
];

export const metadata: Metadata = {
  title: 'Dog Halloween Costume, Harness & Sweater — Free AI Try-On on Your Pet',
  description:
    'Try dog halloween costumes, harnesses, sweaters, and outfits on your real dog or cat with AI. See it on YOUR pet in 30 seconds before buying. Free, no app.',
  keywords: [
    'dog halloween costume',
    'dog harness',
    'dog sweater',
    'dog clothes',
    'dog costume',
    'pet costume',
    'pet outfit',
    'cat clothes',
    'cat sweater',
    'virtual pet clothing try on',
    'ai dog clothing try on',
    'see outfit on my dog',
    'pet costume simulator',
    'dog sweater try on',
  ],
  openGraph: {
    title: 'Dog Halloween Costume, Harness & Sweater AI Try-On',
    description: 'Try dog halloween costumes, harnesses, sweaters on YOUR dog or cat in 30 seconds. Free AI.',
    url: 'https://agalaz.com/virtual-pet-clothing-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-pet-clothing-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  
  },
  twitter: { card: 'summary_large_image', title: 'Virtual Pet Clothing Try-On', description: 'Upload a pet photo, drop any outfit, render in 30 seconds.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-pet-clothing-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-pet-clothing-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Pet Clothing Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-pet-clothing-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Pet Clothing Try-On', item: 'https://agalaz.com/virtual-pet-clothing-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-pet-clothing-try-on" lang="en" pageUrl="https://agalaz.com/virtual-pet-clothing-try-on" />
      <HowToSchemaScript slug="virtual-pet-clothing-try-on" lang="en" pageUrl="https://agalaz.com/virtual-pet-clothing-try-on" />{children}</>);
}
