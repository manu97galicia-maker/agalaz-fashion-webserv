import type { Metadata } from 'next';
import { koreanBangsEN as data } from '@/data/bangsLandings';

const url = 'https://agalaz.com/korean-bangs';
const metaTitle = 'Korean Bangs — Try See-Through, Wispy & Idol Bangs Free AI';
const metaDescription =
  'Korean bangs AI try-on: see-through (シースルーバング), wispy, air bangs, K-pop idol cuts. See the style on YOUR face in 30 seconds. Free, no signup.';
const keywords = [
  'korean bangs',
  'see through bangs',
  'wispy bangs',
  'air bangs',
  'kpop bangs',
  'idol bangs',
  'korean fringe',
  'korean curtain bangs',
  'see-through bangs korean',
  'baby bangs korean',
  'try korean bangs',
  'virtual bangs try on',
  'bangs simulator',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { en: url, 'en-US': url, 'en-GB': url, ja: 'https://agalaz.com/ja/maegami', 'x-default': url },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/haircut-round-face.png', width: 1200, height: 630, alt: 'Korean bangs AI try-on — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/haircut-round-face.png'] },
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
        articleSection: 'Hair · Korean Bangs',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Korean Bangs', item: url },
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
