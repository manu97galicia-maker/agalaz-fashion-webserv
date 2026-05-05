import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const FAQ = [
  { q: 'How does the virtual baby clothing try-on work?', a: 'Upload a clear photo of your baby and a photo of the outfit. The AI maps the garment onto your real baby in 30 seconds, preserving face, skin tone, body shape, and proportions.' },
  { q: 'What baby clothing can I try?', a: 'Onesies, rompers, dresses, snowsuits, swimwear, christening gowns, baby Halloween costumes, holiday outfits, baby tuxedos, photoshoot outfits, twin matching sets — from any brand (Carter\'s, Petit Bateau, Mini Boden, Zara Baby, Etsy, Amazon, custom).' },
  { q: 'Does it work for newborns to toddlers?', a: 'Yes. From newborn (3-5kg) to toddler (24+ months). The AI adapts the garment to your baby\'s real body shape and proportions.' },
  { q: 'Will it preserve my baby\'s face?', a: 'Yes. Eye colour, hair, cheek shape, skin tone — all preserved exactly. The AI dresses them, it does not generate a different baby.' },
  { q: 'Useful for baby brands and shops?', a: 'Yes. Embed on product pages — typical 3-5x conversion lift on baby apparel and a meaningful drop in returns. Partner pricing for baby DTC brands.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.' },
];

export const metadata: Metadata = {
  title: 'Virtual Baby Clothing Try-On — See Outfits On Your Real Baby | Agalaz',
  description:
    'Try onesies, dresses, christening gowns, and costumes on your real baby with AI before buying. From newborn to toddler — see it on YOUR baby in 30 seconds. Free, no app.',
  keywords: [
    'virtual baby clothing try on',
    'ai baby outfit try on',
    'see outfit on my baby',
    'baby costume simulator',
    'baby onesie try on',
    'newborn clothes try on online',
    'christening gown preview',
    'try clothes on my baby ai',
    'baby apparel virtual try on',
    'newborn outfit simulator',
    'baby halloween costume preview',
    'toddler clothes virtual fit',
  ],
  openGraph: {
    title: 'Virtual Baby Clothing Try-On — See Outfits On Your Real Baby',
    description: 'Upload a baby photo, drop in any outfit, see it on YOUR newborn or toddler in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-baby-clothing-try-on',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Virtual Baby Clothing Try-On', description: 'Upload a baby photo, drop any outfit, render in 30 seconds.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-baby-clothing-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-baby-clothing-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Baby Clothing Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-baby-clothing-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Baby Clothing Try-On', item: 'https://agalaz.com/virtual-baby-clothing-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
