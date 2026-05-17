import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('virtual-tattoo-simulator', 'es');
const enUrl = nativeLandingUrl('virtual-tattoo-simulator', 'en');

export const metadata: Metadata = {
  title: 'Simulador de Tatuajes 3D Realista Gratis — Prueba con IA en tu Cuerpo',
  description: 'Simulador de tatuajes 3D realista gratis — tu cuerpo se mueve, los tatuajes siguen los contornos en perspectiva real. Brazo, pierna, pecho, espalda, mano. IA + foto tuya.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'es'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
  openGraph: {
    title: 'Simulador Virtual de Tatuajes Gratis | Prueba Tatuajes en tu Foto con IA',
    description: 'Prueba tatuajes en tu foto con nuestro simulador IA gratis. Colocación realista en brazo, piernas, pecho. Para artistas y estudios.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Simulador Virtual de Tatuajes Gratis | Prueba Tatuajes en tu Foto con IA' }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Simulador de Tatuajes Gratis — Prueba con IA',
        description: 'Prueba tatuajes en tu foto con simulador IA gratis. Colocación realista en brazo, piernas, pecho. Para artistas y estudios.',
        url: pageUrl,
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: baseUrl },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        articleSection: 'Tatuajes · Simulador',
        inLanguage: 'es-ES',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${baseUrl}/es` },
          { '@type': 'ListItem', position: 2, name: 'Simulador tatuajes', item: pageUrl },
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
