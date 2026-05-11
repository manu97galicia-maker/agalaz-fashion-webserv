import type { Metadata } from 'next';
import { disfrazHalloweenPareja as data } from '@/data/longtailLandingsRound4';

const url = 'https://agalaz.com/es/disfraz-halloween-pareja';
const metaTitle = 'Disfraz de Halloween en Pareja 2026 — Pruébenselos con IA Gratis | Agalaz';
const metaDescription =
  'Ideas de disfraz de Halloween en pareja 2026: Barbie y Ken, Wednesday y Enid, Catrina y Catrín, Bonnie y Clyde. Prueben ambos disfraces en una foto de pareja con IA. Gratis.';
const keywords = [
  'disfraz de halloween en pareja',
  'disfraz de halloween de pareja',
  'disfraces de halloween en pareja',
  'disfraz halloween pareja',
  'disfraz halloween para parejas',
  'ideas disfraz pareja',
  'ideas disfraz pareja halloween',
  'disfraces pareja originales',
  'disfraz pareja barbie ken',
  'disfraz pareja wednesday',
  'disfraz pareja dia de muertos',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'es': url, 'es-MX': url, 'es-ES': url, 'es-AR': url, 'es-CO': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_MX',
    alternateLocale: ['es_ES', 'es_AR'],
    images: [{ url: '/og/halloween-couples.png', width: 1200, height: 630, alt: 'Disfraz de Halloween en pareja — probador IA Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/og/halloween-couples.png'],
  },
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
        datePublished: '2026-05-11',
        dateModified: '2026-05-11',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Halloween · Pareja',
        inLanguage: 'es',
        keywords: keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agalaz.com/es' },
          { '@type': 'ListItem', position: 2, name: 'Disfraz Halloween', item: 'https://agalaz.com/es/disfraz-de-halloween' },
          { '@type': 'ListItem', position: 3, name: 'En pareja', item: url },
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
