import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';

const baseUrl = 'https://agalaz.com';
const pageUrl = nativeLandingUrl('realistic-swimwear-try-on', 'fr');

export const metadata: Metadata = {
  title: 'Essayage Virtuel de Maillots — Bikinis IA',
  description: 'Le premier essayeur virtuel IA de maillots pour vrais corps. Téléchargez votre photo et essayez des bikinis instantanément. Réduisez les retours avec Agalaz AI.',
  alternates: {
    canonical: pageUrl,
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
  openGraph: {
    title: 'Essayage Virtuel de Maillots Réaliste | Bikinis sur Votre Vrai Corps',
    description: 'Le premier essayeur virtuel IA de maillots pour vrais corps. Téléchargez votre photo et essayez des bikinis instantanément. Réduisez les retours avec Agalaz AI.',
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Essayage Virtuel de Maillots Réaliste | Bikinis sur Votre Vrai Corps' }],
  },
};

export default function L({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Essayage Virtuel de Maillots de Bain — Bikinis IA',
        description: 'Le premier essayeur virtuel IA de maillots de bain pour vrais corps. Bikinis, une-pièce, brassières — sur votre vraie photo en 30 secondes.',
        url: pageUrl,
        datePublished: '2026-05-10',
        dateModified: '2026-05-12',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: baseUrl },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        articleSection: 'Maillots · Bikinis',
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${baseUrl}/fr` },
          { '@type': 'ListItem', position: 2, name: 'Essayage bikini', item: pageUrl },
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
