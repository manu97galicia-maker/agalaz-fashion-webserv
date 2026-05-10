import type { Metadata } from 'next';
import { LEHENGA_FAQ as FAQ_DATA } from '@/data/lehenga';

const url = 'https://agalaz.com/hi/lehenga';

export const metadata: Metadata = {
  title: 'Online Lehenga Try-On — Bridal · Wedding · Festive | Agalaz',
  description:
    'Online lehenga try-on with AI. See any bridal, sangeet, wedding-guest or festive lehenga on YOUR body before buying from Myntra, Aza, Sabyasachi. Free, 30 sec.',
  keywords: [
    'online lehenga',
    'lehenga online',
    'lehenga choli online',
    'online lehenga choli',
    'lehenga online india',
    'buy lehenga online',
    'lehenga try on online',
    'lehenga ai try on',
    'virtual lehenga try on',
    'see lehenga on me',
    'bridal lehenga online',
    'wedding lehenga online',
    'sangeet lehenga online',
    'designer lehenga online',
    'cheap lehenga online',
    'lehenga choli online myntra',
    'lehenga aza fashion',
    'sabyasachi lehenga online',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Online Lehenga Try-On — See Any Lehenga on Your Body | AI',
    description: 'Bridal, sangeet, wedding-guest, festive — see any online lehenga on YOUR body in 30 sec. Free first render. Stops returns from Myntra, Aza, Sabyasachi.',
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_IN',
    images: [{ url: '/og/virtual-saree-try-on.png', width: 1200, height: 630, alt: 'Online lehenga AI try-on — Agalaz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Lehenga AI Try-On',
    description: 'See any lehenga on YOUR body before buying. Free, 30 sec.',
    images: ['/og/virtual-saree-try-on.png'],
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
        headline: 'Online Lehenga Try-On — See It on YOU with AI',
        description: 'Try any online lehenga (bridal, sangeet, festive, indo-western) on your real body with AI before buying.',
        url,
        datePublished: '2026-05-10',
        dateModified: '2026-05-10',
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
        publisher: { '@type': 'Organization', name: 'Agalaz Fashion', logo: { '@type': 'ImageObject', url: 'https://agalaz.com/icon-512.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: 'Indian Wear',
        inLanguage: 'en-IN',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
          { '@type': 'ListItem', position: 2, name: 'Indian wear', item: 'https://agalaz.com/virtual-saree-try-on' },
          { '@type': 'ListItem', position: 3, name: 'Online lehenga', item: url },
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
