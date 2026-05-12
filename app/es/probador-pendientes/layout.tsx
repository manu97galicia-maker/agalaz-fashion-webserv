import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('virtual-earring-try-on', 'es');
const enUrl = nativeLandingUrl('virtual-earring-try-on', 'en');

export const metadata: Metadata = {
  title: 'Pendientes — Probador Virtual Pandora, Tous IA Gratis',
  description: 'Pendientes Pandora, Tous, plata, oro, hombre, mujer. Pruébatelos con IA en tu cara antes de comprar. Aretes, aros, argollas, broqueles, ear cuffs.',
  keywords: [
    'pendientes',
    'pandora pendientes',
    'pendientes pandora',
    'pendientes tous',
    'tous pendientes',
    'pendientes hombre',
    'pendientes de oro',
    'pendientes plata',
    'pendientes singularu',
    'pendientes mujer',
    'aretes',
    'aretes mexicanos',
    'aretes online',
    'aros',
    'aros online',
    'probador virtual pendientes',
    'pendientes virtuales ia',
    'probarse pendientes online',
    'simulador pendientes',
  ],
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'es'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
  openGraph: {
    title: 'Probador Virtual de Pendientes — IA Gratis | Agalaz',
    description: 'Pruébate cualquier par de pendientes en tu foto con IA. Encuentra el modelo perfecto antes de comprar.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'es_ES',
    images: [{ url: '/og/virtual-earring-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Pendientes — Probador Virtual con IA Gratis',
        description: 'Pruébate pendientes Pandora, Tous, de oro, plata, hombre y mujer en tu foto con IA antes de comprar. Aros, argollas, ear cuffs.',
        url: pageUrl,
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: baseUrl },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        articleSection: 'Pendientes · Joyería',
        inLanguage: 'es-ES',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${baseUrl}/es` },
          { '@type': 'ListItem', position: 2, name: 'Probador pendientes', item: pageUrl },
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
