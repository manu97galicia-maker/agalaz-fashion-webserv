import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  { q: 'How does the virtual costume try-on work?', a: 'Upload a clear photo of yourself or your kid and a photo of the costume. The AI maps the costume onto your real body in 30 seconds, preserving face, hair, skin tone, and proportions.' },
  { q: 'What costumes can I try?', a: 'Halloween (witch, vampire, ghost, scarecrow), kids costumes (pumpkin, dinosaur, princess, superhero), cosplay (anime, gaming, comic-book), carnival outfits, theme parties (80s, disco, James Bond, Gatsby), couples and group costumes — from Spirit Halloween, Etsy, Amazon, Party City, AliExpress, Pinterest references.' },
  { q: 'Does it work for kids and adults?', a: 'Yes. From toddler costumes to teen cosplay to adult Halloween parties. The AI adapts the costume to the actual body in the photo — no oversized adult suit on a 5-year-old.' },
  { q: 'Will it preserve my face?', a: 'Yes. Eye colour, hair, skin tone, expression — all preserved exactly. The AI is putting the costume on YOU, not on a stock model.' },
  { q: 'Useful for costume retailers and rental shops?', a: 'Yes. Embed on product pages — typical 3-5x conversion lift on costume apparel, sharp drop in size and theme returns. Partner pricing for costume DTC, party stores, and rental businesses.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.' },
];

export const metadata: Metadata = {
  title: 'Halloween Costumes 2026: Women, Men, Couples, Kids — Free AI Try-On',
  description:
    'Halloween costumes 2026: women, men, couples, kids, scary, funny, sexy, group costumes. Try any costume on your body with AI in 30 seconds before buying. Free.',
  keywords: [
    'virtual costume try on',
    'ai halloween costume try on',
    'see costume on me',
    'halloween costume simulator',
    'cosplay try on online',
    'kids costume preview',
    'carnival costume virtual',
    'try costume on my photo ai',
    'theme party outfit virtual',
    'group costume preview',
    'halloween costume preview',
    'cosplay simulator ai',
  ],
  openGraph: {
    title: 'Virtual Costume Try-On — Halloween, Cosplay, Carnival, Kids',
    description: 'Upload your photo, drop in any costume, see it on YOU in 30 seconds. Halloween, cosplay, carnival, kids — free.',
    url: 'https://agalaz.com/virtual-costume-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-costume-try-on.png', width: 1200, height: 630, alt: 'Virtual Costume Try-On — Halloween, Cosplay, Carnival, Kids' }],
    },
  twitter: { card: 'summary_large_image', title: 'Virtual Costume Try-On', description: 'Halloween, cosplay, carnival, kids — see any costume on YOUR body in 30 seconds.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-costume-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-costume-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Costume Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' }, url: 'https://agalaz.com/virtual-costume-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Costume Try-On', item: 'https://agalaz.com/virtual-costume-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-costume-try-on" lang="en" pageUrl="https://agalaz.com/virtual-costume-try-on" />
      <HowToSchemaScript slug="virtual-costume-try-on" lang="en" pageUrl="https://agalaz.com/virtual-costume-try-on" />{children}</>);
}
