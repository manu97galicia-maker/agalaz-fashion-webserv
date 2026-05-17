import type { Metadata } from 'next';
import { motherOfBrideDressEN as data } from '@/data/round17Landings';

const url = 'https://agalaz.com/mother-of-bride-dress';
const metaTitle = 'Mother of the Bride Dress AI Try-On — Free Virtual Try-On 2026';
const metaDescription =
  'Mother of the bride dresses: try Adrianna Papell, JJ\'s House, M&S and John Lewis dresses on YOUR body with AI in 30 seconds. Free, no signup.';
const keywords = [
    'mother of bride dress',
    'mother of the bride dress',
    'mother of bride dresses 2026',
    'adrianna papell dress',
    'jjs house dress',
    'john lewis mother of bride',
    'mother of bride virtual try on',
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords,
  alternates: {
    canonical: url,
    languages: { 'en': 'https://agalaz.com/mother-of-bride-dress', 'en-US': 'https://agalaz.com/mother-of-bride-dress', 'en-GB': 'https://agalaz.com/mother-of-bride-dress', 'x-default': 'https://agalaz.com/mother-of-bride-dress' },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/wedding-guest-outfit.png', width: 1200, height: 630, alt: 'Mother of the Bride — Agalaz' }],
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: ['/og/wedding-guest-outfit.png'] },
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
        articleSection: 'Wedding · Mother of Bride',
        inLanguage: 'en-US',
        keywords: keywords.join(', '),
      },
      { '@type': 'FAQPage', mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Try-On', item: 'https://agalaz.com/try-on' },
        { '@type': 'ListItem', position: 3, name: 'Mother of the Bride', item: url },
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
