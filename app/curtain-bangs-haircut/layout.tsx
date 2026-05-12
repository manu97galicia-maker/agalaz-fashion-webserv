import type { Metadata } from 'next';
import { curtainBangsHaircut as data } from '@/data/longtailLandingsRound5';

const url = 'https://agalaz.com/curtain-bangs-haircut';
const metaTitle = 'Curtain Bangs Haircut — Free AI Try-On Before The Salon (2026)';
const metaDescription =
  'Curtain bangs haircut AI try-on: wavy, curly, curled, layered, with long bob, wolf cut, butterfly haircut, shoulder-length. See it on YOUR face in 30 seconds before booking. Free.';
const keywords = [
  'curtain bangs',
  'curtain bangs haircut',
  'layers haircut with curtain bangs',
  'layered haircut with curtain bangs',
  'curtain bangs wavy hair',
  'curly curtain bangs',
  'curled curtain bangs',
  'curling curtain bangs',
  'shoulder length haircut with curtain bangs',
  'shoulder length hair with curtain bangs',
  'long bob with curtain bangs',
  'curtain bangs wolf cut',
  'butterfly haircut with curtain bangs',
  'long hairstyle with curtain bangs',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: { canonical: url },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Curtain bangs AI try-on — Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/haircut-round-face.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'beauty',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: metaTitle,
        description: metaDescription,
        url,
        datePublished: '2026-05-12',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Hair & Beauty',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Virtual hairstyle', item: 'https://agalaz.com/virtual-hairstyle-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Curtain bangs', item: url },
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
