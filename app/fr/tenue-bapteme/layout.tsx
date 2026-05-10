import type { Metadata } from 'next';
import { TENUE_BAPTEME_FAQ as FAQ_DATA } from '@/data/tenueBapteme';

const url = 'https://agalaz.com/fr/tenue-bapteme';

export const metadata: Metadata = {
  title: 'Tenue de Baptême 2026 — Femme · Homme · Enfant + Essayage IA',
  description:
    'Tenue de baptême : 7 idées prêtes à porter pour invitée, marraine, parrain, garçon et bébé. Essayez chaque robe ou costume sur votre photo avec l\'IA. Gratuit.',
  keywords: [
    // High-volume cluster from DataForSEO scan (6.6K + 2.9K each, KD 0)
    'tenue bapteme',
    'tenue baptême',
    'bapteme tenue',
    'tenue pour bapteme',
    'tenue pour baptême',
    'tenue bapteme femme',
    'tenue baptême femme',
    'tenue femme bapteme',
    'tenue femme pour bapteme',
    'tenue pour bapteme femme',
    'tenue bapteme garcon',
    'tenue baptême garçon',
    'tenue garcon bapteme',
    'tenue garçon pour baptême',
    'tenue pour bapteme garcon',
    'bapteme tenue garcon',
    'tenue invitée baptême',
    'tenue marraine baptême',
    'tenue parrain baptême',
    'robe baptême femme',
    'costume baptême homme',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Tenue de Baptême 2026 — 7 Idées + Essayage Virtuel IA',
    description:
      '7 tenues de baptême prêtes à porter (femme, homme, enfant, bébé). Essayez chaque robe ou costume sur votre photo en 30 secondes. Gratuit, sans application.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/tenue-bapteme.png', width: 1200, height: 630, alt: 'Tenue de baptême — essayage virtuel IA Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenue de Baptême 2026 — Essayage IA',
    description: '7 idées de tenues + essayage virtuel sur votre photo. Gratuit, 30 sec.',
    images: ['/og/tenue-bapteme.png'],
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
        headline: 'Tenue de Baptême 2026 — 7 Idées + Essayage IA',
        description:
          'Guide complet de tenues de baptême par rôle avec 7 combinaisons prêtes à porter et un essayage virtuel IA.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Mode · Cérémonie',
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Essayage virtuel', item: 'https://agalaz.com/fr/try-on' },
          { '@type': 'ListItem', position: 3, name: 'Tenue de baptême', item: url },
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
