import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const FAQ = [
  { q: 'How does the virtual jewelry try-on work?', a: 'Upload a photo (face for necklaces/earrings, hand for rings, wrist for bracelets) and a photo of the piece. The AI maps it onto you in 30 seconds, preserving skin tone and lighting.' },
  { q: 'What jewelry can I try?', a: 'Necklaces, earrings, bracelets, rings, watches, brooches, anklets — from any brand: Tiffany, Cartier, Pandora, Mejuri, Etsy, vintage, custom. Any photo works.' },
  { q: 'Can I see how an engagement ring looks before buying?', a: 'Yes. Upload your hand and the ring photo to see the carat, setting, band, and metal colour on your finger. Companion guides for 1.5 vs 2 carat and the carat size simulator.' },
  { q: 'Can I layer necklaces or stack rings?', a: 'Yes. After the first render, ask the AI: "add a 16-inch chain", "stack a thin gold band". Re-renders preserving everything else.' },
  { q: 'Useful for jewelry brands?', a: 'Yes. Embed on product pages — typical 3-7x conversion uplift on fine jewellery and dramatic returns drop on engagement rings.' },
  { q: 'Do I need to download an app?', a: 'No. Browser-only, phone or desktop. First try-on is free.' },
];

export const metadata: Metadata = {
  title: 'Virtual Jewelry Try-On — Necklaces, Rings, Earrings on You with AI | Agalaz',
  description:
    'Try any jewellery on your real body before buying. Engagement rings, necklaces, earrings, bracelets — see them on you in 30 seconds. Free, no app.',
  keywords: [
    'virtual jewelry try on',
    'try on necklace online',
    'virtual ring try on',
    'engagement ring try on online',
    'virtual bracelet try on',
    'ai jewelry try on',
    'see jewelry on me',
    'virtual fine jewelry',
    'diamond ring simulator',
    'necklace length simulator',
  ],
  openGraph: {
    title: 'Virtual Jewelry Try-On — See Any Piece On You',
    description: 'Necklaces, rings, earrings, bracelets — see how any piece looks on your real body in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-jewelry-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-jewelry-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  
  },
  twitter: { card: 'summary_large_image', title: 'Virtual Jewelry Try-On', description: 'Necklaces, rings, earrings, bracelets — render in 30 seconds.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-jewelry-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-jewelry-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Jewelry Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-jewelry-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Jewelry Try-On', item: 'https://agalaz.com/virtual-jewelry-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
