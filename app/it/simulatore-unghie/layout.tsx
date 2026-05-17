import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
import { localizedLandings } from '@/data/localizedLandings';
import { buildLocalizedJsonLd } from '@/components/localized/LocalizedLanding';

const baseUrl = 'https://agalaz.com';
const data = localizedLandings['virtual-nail-try-on']['it'];
const pageUrl = nativeLandingUrl('virtual-nail-try-on', 'it');
const enUrl = nativeLandingUrl('virtual-nail-try-on', 'en');

export const metadata: Metadata = {
  title: { absolute: data.meta.title },
  description: data.meta.description,
  keywords: data.meta.keywords,
  alternates: {
    canonical: nativeLandingUrl('virtual-nail-try-on', 'it'),
    languages: landingHreflangAlternates('virtual-nail-try-on'),
  },
  openGraph: {
    title: data.meta.title,
    description: data.meta.description,
    type: 'website',
    url: pageUrl,
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/virtual-nail-try-on.png', width: 1200, height: 630, alt: 'it simulatore unghie — Agalaz AI Virtual Try-On' }],
  
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
  triptychSlug: 'virtual-nail-try-on',
  triptychLang: 'it',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
