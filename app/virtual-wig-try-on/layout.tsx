import type { Metadata } from 'next';

const url = 'https://agalaz.com/virtual-wig-try-on';

const FAQ = [
  { q: 'How does the virtual wig try-on work?', a: 'Upload a clear front-on photo of your face and a photo of the wig you want. The AI swaps your hair for the wig in 30 seconds, preserving your face shape, skin tone, eye colour and features so you see how the wig actually looks on YOU.' },
  { q: 'What wig styles can I try?', a: 'All of them. Lace-front bobs, long straight, pixie wigs, curly afro wigs, balayage and ombré units, color wigs (pink, platinum, copper, jet black), wedding/event wigs, alopecia/medical wigs, and cosplay wigs. Synthetic and human-hair styles render the same way.' },
  { q: 'Can I try wigs from any brand or store?', a: 'Yes. Any wig photo works — UNice, Luvme, BeautyForever, Mayvenn, AliExpress, Amazon listings, Etsy custom wig makers, alopecia specialists or a Pinterest screenshot. As long as the wig is visible, the AI can render it on your head.' },
  { q: 'Does it preserve my face and skin tone?', a: 'Yes. Eye colour, skin tone, face shape, freckles and expression — all preserved exactly. The AI changes only the hair, not the face. Useful for honestly judging if a colour or length flatters your features before you buy.' },
  { q: 'Is this useful for alopecia, chemo or medical hair loss?', a: 'Yes. We hear from people who want to preview options before ordering a wig they cannot easily return. The renders are private, the first try-on is free, no account required.' },
  { q: 'How private are my photos?', a: 'Photos are processed only to generate your render — never shared, never sold, never used to train AI models. Zero retention: removed from memory immediately.' },
  { q: 'Do I need to download an app?', a: 'No. Works in any browser on phone, tablet or desktop. First try-on is free.' },
];

export const metadata: Metadata = {
  title: 'Virtual Wig Try-On — Lace Front, Curly, Color Wigs · Free AI',
  description:
    'Try any wig on your face with AI: lace-front bobs, curly, pixie, balayage, color, cosplay, medical/alopecia. 30 seconds, free, no app. See it on YOU first.',
  keywords: [
    'virtual wig try on',
    'virtual wig try-on',
    'wig try on virtual',
    'try on virtual wigs',
    'virtual try on wigs',
    'virtual wigs to try on',
    'virtual try on wig',
    'wig virtual try on',
    'wigs virtual try on',
    'try on wig virtual',
    'ai wig try on',
    'wig simulator',
    'see wig on my face',
    'lace front wig try on',
    'curly wig try on virtual',
    'alopecia wig try on virtual',
    'cosplay wig try on',
  ],
  openGraph: {
    title: 'Virtual Wig Try-On — See Any Wig On Your Real Face',
    description: 'Upload your photo, drop any wig image, see the cut, length and colour on YOU in 30 seconds. Free.',
    url,
    siteName: 'Agalaz',
    type: 'website',
    images: [{ url: '/og/virtual-hairstyle-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Wig Try-On' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Wig Try-On — See Any Wig On You',
    description: 'Lace-front, curly, colour, cosplay or medical wig — see it on YOUR face in 30 seconds.',
  },
  alternates: { canonical: url, languages: { en: url, 'en-US': url, 'en-GB': url, 'x-default': url } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Agalaz Virtual Wig Try-On',
        operatingSystem: 'WEB',
        applicationCategory: 'LifestyleApplication',
        url,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '12400', bestRating: '5', worstRating: '1' },
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Virtual Hairstyle Try-On', item: 'https://agalaz.com/virtual-hairstyle-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Virtual Wig Try-On', item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
