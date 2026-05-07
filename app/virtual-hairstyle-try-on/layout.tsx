import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const FAQ = [
  { q: 'How does the virtual hairstyle try-on work?', a: 'Upload a clear front-on photo of your face and a photo of the hairstyle you want. The AI swaps your hair for the new cut and colour in 30 seconds, preserving your face shape, skin tone, and features.' },
  { q: 'What styles can I try — cuts, colour, dye, braids?', a: 'All of them. Pixie, bob, layers, curtain bangs, undercuts, mullets. Colour: balayage, ombré, platinum, copper, jet black, pastel pink, money piece. Plus braids (box, French, cornrows), extensions, perms, beard styles, and wedding updos.' },
  { q: 'Does it work for short and long hair?', a: 'Yes. From shaved heads adding length to long hair going short, the AI handles the full transition — preview the chop or extensions before committing.' },
  { q: 'Will it preserve my face and skin tone?', a: 'Yes. Eye colour, skin tone, face shape, freckles, expression — all preserved exactly. The AI changes your hair, not your face. Useful for honestly judging if a colour flatters your skin.' },
  { q: 'Can I try a colour or dye before the salon?', a: 'Yes. Try copper, balayage, money piece, jet black, or pastel pink in 30 seconds first. Bring the render to your stylist — skip the "I think I want?" conversation.' },
  { q: 'Useful for salons, hair brands, and stylists?', a: 'Yes. Embed on booking pages — typical 3-5x consultation-to-booking lift, sharp drop in "changed my mind in the chair" remakes. Partner pricing for salons, hair-extension brands, and dye DTC.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.' },
];

export const metadata: Metadata = {
  title: 'Virtual Hairstyle Try-On — Cuts & Colour Before Salon',
  description:
    'Try haircuts, colour, balayage, braids, and dye on your real face with AI before the salon appointment. See platinum, copper, pixie or bob on YOU in 30 seconds. Free.',
  keywords: [
    'virtual hairstyle try on',
    'ai haircut simulator',
    'hair colour try on online',
    'see hairstyle on my face',
    'balayage virtual try on',
    'platinum blonde preview',
    'pixie cut simulator',
    'before salon hair preview',
    'try hair colour ai',
    'hair dye virtual try on',
    'braids virtual try on',
    'beard style preview',
  ],
  openGraph: {
    title: 'Virtual Hairstyle Try-On — Cuts, Colour, Braids Before The Salon',
    description: 'Upload your photo, drop a hair reference, see the cut and colour on YOU in 30 seconds. Free.',
    url: 'https://agalaz.com/virtual-hairstyle-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-hairstyle-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: { card: 'summary_large_image', title: 'Virtual Hairstyle Try-On', description: 'See haircuts, colour, balayage, braids on YOUR face in 30 seconds.' },
  alternates: {
    canonical: nativeLandingUrl('virtual-hairstyle-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-hairstyle-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'Agalaz Virtual Hairstyle Try-On', operatingSystem: 'WEB', applicationCategory: 'LifestyleApplication', url: 'https://agalaz.com/virtual-hairstyle-try-on', offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' }, { '@type': 'ListItem', position: 2, name: 'Virtual Hairstyle Try-On', item: 'https://agalaz.com/virtual-hairstyle-try-on' }] },
    ],
  };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />{children}</>);
}
