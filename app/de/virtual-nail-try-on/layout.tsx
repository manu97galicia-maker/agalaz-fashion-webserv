import type { Metadata } from 'next';
import { localizedLandings } from '@/data/localizedLandings';
import { buildLocalizedJsonLd } from '@/components/localized/LocalizedLanding';

const baseUrl = 'https://agalaz.com';
const data = localizedLandings['virtual-nail-try-on']['de'];
const pageUrl = `${baseUrl}/de/virtual-nail-try-on`;
const enUrl = `${baseUrl}/virtual-nail-try-on`;

export const metadata: Metadata = {
  title: { absolute: data.meta.title },
  description: data.meta.description,
  keywords: data.meta.keywords,
  alternates: {
    canonical: pageUrl,
    languages: {
      'en': enUrl,
      'fr': `${baseUrl}/fr/virtual-nail-try-on`,
      'pt': `${baseUrl}/pt/virtual-nail-try-on`,
      'de': `${baseUrl}/de/virtual-nail-try-on`,
      'it': `${baseUrl}/it/virtual-nail-try-on`,
      'x-default': enUrl,
    },
  },
  openGraph: {
    title: data.meta.title,
    description: data.meta.description,
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'de_DE',
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
