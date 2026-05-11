import type { Metadata } from 'next';
import { taglioCapelliVisoTondo as data } from '@/data/longtailLandings2026';

const url = 'https://agalaz.com/it/taglio-capelli-viso-tondo';
const metaTitle = 'Taglio Capelli Viso Tondo e Paffuto — Prova IA Gratis 2026 | Agalaz';
const metaDescription =
  'Taglio capelli per viso tondo e paffuto — long bob, caschetto asimmetrico, pixie, frangia a tendina. Prova 8 tagli sulla tua foto con IA in 30 secondi. Gratis.';
const keywords = [
  'taglio capelli viso tondo',
  'taglio capelli per viso tondo',
  'taglio capelli viso tondo e paffuto',
  'taglio capelli per viso tondo e paffuto',
  'tagli capelli viso tondo',
  'long bob viso tondo',
  'caschetto viso tondo',
  'pixie viso tondo',
  'frangia viso tondo',
  'capelli mossi viso tondo',
  'taglio scalato viso tondo',
  'taglio per viso tondo',
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
    locale: 'it_IT',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Taglio capelli per viso tondo — prova IA Agalaz' }],
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
        datePublished: '2026-05-11',
        dateModified: '2026-05-11',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Capelli · Bellezza',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
          { '@type': 'ListItem', position: 2, name: 'Prova acconciature', item: 'https://agalaz.com/it/prova-acconciature' },
          { '@type': 'ListItem', position: 3, name: 'Taglio per viso tondo', item: url },
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
