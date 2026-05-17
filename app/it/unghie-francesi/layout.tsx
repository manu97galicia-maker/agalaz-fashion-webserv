import type { Metadata } from 'next';
import { unghieFrancesiIT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/it/unghie-francesi';
const metaTitle = 'Unghie Francesi 2026 — Provatore Virtuale con IA Gratis';
const metaDescription =
  'Unghie francesi 2026: prova classica, lattea, micro, colorata, invertita sulla tua mano con IA in 30 sec. Gratis, senza registrazione.';
const keywords = [
    'unghie francesi',
    'unghie francesina',
    'french manicure',
    'unghie francesi classiche',
    'unghie francesi colorate',
    'unghie francesi micro',
    'unghie francesi 2026',
    'provatore french',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'it': 'https://agalaz.com/it/unghie-francesi', 'it-IT': 'https://agalaz.com/it/unghie-francesi', 'x-default': 'https://agalaz.com/it/unghie-francesi' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'Unghie Francesi — Agalaz' }],
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
        articleSection: 'Unghie · French',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
        { '@type': 'ListItem', position: 2, name: 'Provatore virtuale', item: 'https://agalaz.com/it/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Unghie Francesi', item: url },
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
