import type { Metadata } from 'next';
import { taglioCortoCapelliDonnaIT as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/it/taglio-corto-capelli-donna';
const metaTitle = 'Taglio Corto Capelli Donna 2026 — Provatore Virtuale IA Gratis';
const metaDescription =
  'Taglio corto capelli donna 2026: prova bob, pixie, long bob sul tuo viso con IA in 30 sec. Gratis, senza registrazione.';
const keywords = [
    'taglio corto capelli donna',
    'tagli corti capelli donna',
    'taglio capelli corto donna',
    'taglio corto donna 2026',
    'bob italiano',
    'pixie corto',
    'long bob',
    'provatore virtuale taglio corto',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'it': 'https://agalaz.com/it/taglio-corto-capelli-donna', 'it-IT': 'https://agalaz.com/it/taglio-corto-capelli-donna', 'x-default': 'https://agalaz.com/it/taglio-corto-capelli-donna' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/virtual-hairstyle-try-on.png', width: 1200, height: 630, alt: 'Taglio Corto Donna — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-hairstyle-try-on.png'] },
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
        articleSection: 'Capelli · Taglio Corto',
        inLanguage: 'it-IT',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com/it' },
        { '@type': 'ListItem', position: 2, name: 'Provatore virtuale', item: 'https://agalaz.com/it/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Taglio Corto Donna', item: url },
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
