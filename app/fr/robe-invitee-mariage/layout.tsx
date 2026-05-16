import type { Metadata } from 'next';
import { robeInviteeMariageFR as data } from '@/data/bigVolumeLandings';

const url = 'https://agalaz.com/fr/robe-invitee-mariage';
const metaTitle = 'Robe Invitée Mariage 2026 — Essayage Virtuel IA Gratuit';
const metaDescription =
  'Robe invitée mariage 2026 : essayez n\'importe quelle robe sur votre vrai corps avec IA en 30 sec. Sézane, Sandro, Maje, Pinterest. Gratuit, sans inscription.';
const keywords = [
  'robe invitée mariage',
  'robe invitée à un mariage',
  'mariage robe invitée',
  'robe mariage invitée',
  'robe pour un mariage invitée',
  'robe invitée pour mariage',
  'invitée mariage robe',
  'robe pour invitée mariage',
  'robe pour mariage invitée',
  'robe de mariage invitée',
  'tenue mariage femme',
  'robe invitée essayage virtuel',
  'essayage virtuel robe mariage',
  'robe invitée mariage 2026',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { fr: url, 'fr-FR': url, 'fr-BE': url, 'fr-CA': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Robe invitée mariage essayage IA — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/vestido-invitada-boda.png'] },
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
        articleSection: 'Robes · Mariage',
        inLanguage: 'fr-FR',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://agalaz.com/fr' },
        { '@type': 'ListItem', position: 2, name: 'Essayage virtuel', item: 'https://agalaz.com/fr/virtual-try-on' },
        { '@type': 'ListItem', position: 3, name: 'Robe invitée mariage', item: url },
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
