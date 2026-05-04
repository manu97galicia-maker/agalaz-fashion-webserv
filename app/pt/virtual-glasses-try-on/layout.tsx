import type { Metadata } from 'next';
import { localizedLandings } from '@/data/localizedLandings';
import { buildLocalizedJsonLd } from '@/components/localized/LocalizedLanding';

const baseUrl = 'https://agalaz.com';
const data = localizedLandings['virtual-glasses-try-on']['pt'];
const pageUrl = `${baseUrl}/pt/virtual-glasses-try-on`;
const enUrl = `${baseUrl}/virtual-glasses-try-on`;

export const metadata: Metadata = {
  title: { absolute: data.meta.title },
  description: data.meta.description,
  keywords: data.meta.keywords,
  alternates: {
    canonical: pageUrl,
    languages: {
      'en': enUrl,
      'es': `${baseUrl}/es/virtual-glasses-try-on`,
      'fr': `${baseUrl}/fr/virtual-glasses-try-on`,
      'pt': `${baseUrl}/pt/virtual-glasses-try-on`,
      'de': `${baseUrl}/de/virtual-glasses-try-on`,
      'it': `${baseUrl}/it/virtual-glasses-try-on`,
      'x-default': enUrl,
    },
  },
  openGraph: {
    title: data.meta.title,
    description: data.meta.description,
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary_large_image',
    title: data.meta.title,
    description: data.meta.description,
  },
};

const jsonLd = buildLocalizedJsonLd({
  pageUrl,
  name: data.jsonLdName,
  description: data.meta.description,
  faqs: data.content.faqs,
  baseUrl,
  breadcrumbName: data.breadcrumbName,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
