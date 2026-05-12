import type { Metadata } from 'next';
import { getBestXContent, buildBestXJsonLd } from '@/data/bestXLandings';

const content = getBestXContent('best-hairstyle-try-on-app');
const url = `https://agalaz.com/${content.slug}`;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  keywords: content.keywords,
  alternates: { canonical: url, languages: { en: url, 'x-default': url } },
  openGraph: {
    title: content.title,
    description: content.description,
    type: 'article',
    url,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/virtual-wedding-dress-try-on.png', width: 1200, height: 630, alt: content.heroTitle }],
  },
  twitter: { card: 'summary_large_image', title: content.title, description: content.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'fashion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = buildBestXJsonLd(content);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
