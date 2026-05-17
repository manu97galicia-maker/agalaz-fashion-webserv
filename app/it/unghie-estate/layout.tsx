import type { Metadata } from 'next';
import { unghieEstateIT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/it/unghie-estate';
const metaTitle = 'Unghie Estate 2026 — Provatore Virtuale con IA Gratis';
const metaDescription =
  'Unghie estate 2026: prova qualsiasi design sulla tua mano con IA in 30 sec. Mojito, glazed donut, french lattea, chrome ciliegia. Gratis.';
const keywords = [
    'unghie estate',
    'unghie estate 2026',
    'unghie estate 2025',
    'unghie estive',
    'unghie estate corte',
    'unghie estate gel',
    'unghie mojito',
    'unghie chrome',
    'provatore unghie estate',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'it': 'https://agalaz.com/it/unghie-estate', 'it-IT': 'https://agalaz.com/it/unghie-estate' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Unghie Estate — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-nail-try-on.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
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
        datePublished: '2026-05-17',
        dateModified: '2026-05-17',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Unghie · Estate',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
        { '@type': 'ListItem', position: 2, name: 'Provatore virtuale', item: 'https://agalaz.com/it/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Unghie Estate', item: url },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
