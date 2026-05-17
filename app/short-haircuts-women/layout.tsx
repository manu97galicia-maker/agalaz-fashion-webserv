import type { Metadata } from 'next';
import { shortHaircutsWomenEN as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/short-haircuts-women';
const metaTitle = 'Short Haircuts for Women 2026 — AI Try-On Before the Salon';
const metaDescription =
  'Short haircuts for women 2026: see Italian bob, pixie, French bob and shag on YOUR face with AI in 30 seconds. Free, no signup.';
const keywords = [
    'short haircuts women',
    'short haircut for women',
    'short hairstyles 2026',
    'italian bob',
    'french bob',
    'pixie cut',
    'wolf cut',
    'long bob',
    'virtual hairstyle try on',
    'hairstyle simulator',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'en': 'https://agalaz.com/short-haircuts-women', 'en-US': 'https://agalaz.com/short-haircuts-women', 'en-GB': 'https://agalaz.com/short-haircuts-women', 'x-default': 'https://agalaz.com/short-haircuts-women' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-hairstyle-try-on.png', width: 1200, height: 630, alt: 'Short Haircuts — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/virtual-hairstyle-try-on.png'] },
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
        articleSection: 'Hair · Short Cuts',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Short Haircuts', item: url },
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
