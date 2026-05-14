import type { Metadata } from 'next';
import { disfrazDeHalloween as data } from '@/data/longtailLandingsRound4';

const url = 'https://agalaz.com/es/disfraz-de-halloween';
const metaTitle = 'Disfraz de Halloween 2026 — Pruébatelo con IA Gratis (Mujer, Niños, Pareja) | Agalaz';
const metaDescription =
  'Disfraz de Halloween 2026 para mujer, hombre, niñas, en pareja o grupo. Pruébate cualquier disfraz en tu foto real con IA antes de comprar. Catrina, Wednesday, Barbie, vampiro. Gratis.';
const keywords = [
  'disfraz de halloween',
  'disfraz halloween',
  'disfraces halloween',
  'disfraz halloween mujer',
  'disfraz halloween mujeres',
  'disfraces mujer halloween',
  'disfraz halloween niñas',
  'disfraces halloween niñas',
  'catrina disfraz',
  'wednesday disfraz',
  'disfraz dia de muertos',
  'disfraz halloween barato',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: {
      'es': url,
      'es-MX': url,
      'es-ES': url,
      'es-AR': url,
      'es-CO': url,
      'es-CL': url, 'x-default': url
    },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'es_MX',
    alternateLocale: ['es_ES', 'es_AR', 'es_CO'],
    images: [{ url: '/og/halloween-couples.png', width: 1200, height: 630, alt: 'Disfraz de Halloween — probador IA Agalaz' }],
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
        articleSection: 'Halloween · Disfraces',
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
          { '@type': 'ListItem', position: 2, name: 'Probador disfraces', item: 'https://agalaz.com/es/probador-disfraces' },
          { '@type': 'ListItem', position: 3, name: 'Disfraz de Halloween', item: url },
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
