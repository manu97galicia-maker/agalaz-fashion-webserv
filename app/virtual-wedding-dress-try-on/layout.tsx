import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import ImageSchemaScript from '@/components/ImageSchemaScript';
import HowToSchemaScript from '@/components/HowToSchemaScript';

const FAQ = [
  {
    q: 'How does the virtual wedding dress try-on work?',
    a: 'Upload a full-body photo of yourself and a photo of any wedding dress. Our AI maps the gown onto your real body in seconds — preserving your face, skin tone, and proportions — so you see exactly how the silhouette looks on you before booking a fitting.',
  },
  {
    q: 'Can I try on dresses from any designer or store?',
    a: 'Yes. Any wedding dress photo works — Pronovias, Vera Wang, Galia Lahav, BHLDN, vintage stores, or a Pinterest screenshot. As long as the gown is visible, the AI can render it on your body.',
  },
  {
    q: 'Is the result realistic enough to make a buying decision?',
    a: 'Most users tell us it is the closest thing to standing in front of a mirror at the boutique. Use it to narrow your shortlist before in-person fittings — saving time and the typical 6-12 boutique visits.',
  },
  {
    q: 'Can I see the same dress in different colours like champagne or blush?',
    a: 'Yes. After the first render, ask the AI chat: "show this in blush" or "make the trim ivory". The dress re-renders in the new colour without losing your face or proportions.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone, tablet, or desktop. The first try-on is free with no account required.',
  },
  {
    q: 'How private are my photos?',
    a: 'Photos are processed only to generate your render — never shared, never sold, never used to train AI models. You can delete any render permanently.',
  },
];

export const metadata: Metadata = {
  title: 'Wedding Dresses 2026: Mermaid, Princess, Boho, Lace — Free AI Try-On',
  description:
    'Wedding dresses 2026: mermaid, princess, boho, lace, A-line. Try any gown on your real body with AI before the boutique. Free, 30 sec.',
  keywords: [
    'virtual wedding dress try on',
    'try on wedding dress online',
    'wedding dress simulator',
    'see wedding dress on me',
    'ai wedding dress try on',
    'virtual bridal try on',
    'wedding gown try on app',
    'try on wedding dress at home',
    'wedding dress visualizer',
    'bridal try on online',
  ],
  openGraph: {
    title: 'Virtual Wedding Dress Try-On — See Any Gown On You',
    description:
      'Upload your photo and any wedding gown — see how the dress actually looks on your real body in 30 seconds. Free, private, no app.',
    url: 'https://agalaz.com/virtual-wedding-dress-try-on',
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Wedding Dress Try-On — See Any Gown On You',
    description: 'Upload a photo, drop in any wedding gown, see it on your body in 30 seconds.',
  },
  alternates: {
    canonical: nativeLandingUrl('virtual-wedding-dress-try-on', 'en'),
    languages: landingHreflangAlternates('virtual-wedding-dress-try-on'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz Virtual Wedding Dress Try-On',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        url: 'https://agalaz.com/virtual-wedding-dress-try-on',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '52000' },
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Virtual Wedding Dress Try-On', item: 'https://agalaz.com/virtual-wedding-dress-try-on' },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ImageSchemaScript slug="virtual-wedding-dress-try-on" lang="en" pageUrl="https://agalaz.com/virtual-wedding-dress-try-on" />
      <HowToSchemaScript slug="virtual-wedding-dress-try-on" lang="en" pageUrl="https://agalaz.com/virtual-wedding-dress-try-on" />
      {children}
    </>
  );
}
