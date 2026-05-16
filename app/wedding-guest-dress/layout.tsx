import type { Metadata } from 'next';
import { weddingGuestDressEN as data } from '@/data/bigVolumeLandings';

const url = 'https://agalaz.com/wedding-guest-dress';
const metaTitle = 'Wedding Guest Dress 2026 — Virtual Try-On Any Dress Free AI';
const metaDescription =
  'Wedding guest dress 2026: try any dress on YOUR real body with AI in 30 seconds. Lulus, ASOS, Anthropologie, Revolve, Pinterest. Free, no signup.';
const keywords = [
  'wedding guest dress',
  'wedding guest dresses',
  'guest at a wedding dress',
  'dress to wear for wedding guest',
  'dress for wedding party guest',
  'dress for wedding for guest',
  'dress to wear to wedding as guest',
  'dress wedding party guest',
  'dress to wear as a wedding guest',
  'dress wedding guest dresses',
  'wedding dress for a guest',
  'wedding attendee dress',
  'wedding dress attendee',
  'guest of wedding dress',
  'wedding dress for guests',
  'dress for the wedding guest',
  'dress for a wedding as a guest',
  'dress for guest of wedding',
  'dress for guest at wedding',
  'dress to wear as wedding guest',
  'guests dress for wedding',
  'dress to wear to wedding guest',
  'dress wedding guest',
  'wedding guest dress virtual try on',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url, 'en-GB': url, 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/vestido-invitada-boda.png', width: 1200, height: 630, alt: 'Wedding guest dress AI try-on — Agalaz' }],
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
        articleSection: 'Wedding · Guest',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Wedding Guest Dress', item: url },
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
