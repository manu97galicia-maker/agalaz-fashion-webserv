import type { Metadata } from 'next';
import { kpopOutfitsEN as data } from '@/data/kpopOutfitsLanding';

const url = 'https://agalaz.com/kpop-outfits';
const metaTitle = 'K-pop Outfits — Try BTS, NewJeans, BLACKPINK, IVE Looks (Free AI)';
const metaDescription =
  'Try any K-pop idol outfit on yourself with AI in 30 seconds. BTS airport, NewJeans Y2K, BLACKPINK couture, IVE preppy, aespa, Stray Kids, TWICE, ENHYPEN. Free, no signup.';
const keywords = [
  'kpop outfit',
  'kpop outfits',
  'kpop fashion',
  'kpop style',
  'kpop concert outfit',
  'kpop concert outfits',
  'kpop outfit male',
  'kpop men outfit',
  'kpop outfit female',
  'kpop fashion style',
  'bts outfit',
  'bts fashion',
  'bts airport fashion',
  'blackpink outfit',
  'blackpink fashion',
  'blackpink stage outfit',
  'newjeans outfit',
  'newjeans fashion',
  'newjeans style',
  'ive outfit',
  'ive fashion',
  'aespa outfit',
  'aespa fashion',
  'twice outfit',
  'twice concert outfit',
  'twice fashion',
  'le sserafim outfit',
  'stray kids outfit',
  'stray kids fashion',
  'enhypen outfit',
  'enhypen fashion',
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
    images: [{ url: '/og/virtual-cosplay-try-on.png', width: 1200, height: 630, alt: 'K-pop outfit AI try-on — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-cosplay-try-on.png'] },
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
        articleSection: 'K-pop · Fashion · Try-On',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
        about: [
          { '@type': 'MusicGroup', name: 'BTS', sameAs: 'https://en.wikipedia.org/wiki/BTS' },
          { '@type': 'MusicGroup', name: 'BLACKPINK', sameAs: 'https://en.wikipedia.org/wiki/Blackpink' },
          { '@type': 'MusicGroup', name: 'NewJeans', sameAs: 'https://en.wikipedia.org/wiki/NewJeans' },
          { '@type': 'MusicGroup', name: 'IVE', sameAs: 'https://en.wikipedia.org/wiki/Ive_(group)' },
          { '@type': 'MusicGroup', name: 'aespa', sameAs: 'https://en.wikipedia.org/wiki/Aespa' },
          { '@type': 'MusicGroup', name: 'LE SSERAFIM', sameAs: 'https://en.wikipedia.org/wiki/Le_Sserafim' },
          { '@type': 'MusicGroup', name: 'Stray Kids', sameAs: 'https://en.wikipedia.org/wiki/Stray_Kids' },
          { '@type': 'MusicGroup', name: 'TWICE', sameAs: 'https://en.wikipedia.org/wiki/Twice_(group)' },
          { '@type': 'MusicGroup', name: 'ENHYPEN', sameAs: 'https://en.wikipedia.org/wiki/Enhypen' },
        ],
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'K-pop Outfits', item: url },
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
