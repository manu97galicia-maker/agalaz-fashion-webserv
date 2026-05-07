import type { Metadata } from 'next';
import { ROOT_PAGE_META, localizedAlternates } from '@/lib/i18n/rootPageMeta';
import Page from '@/app/try-on/page';

const meta = ROOT_PAGE_META['try-on']['pt'];
const alternates = localizedAlternates('try-on', 'pt');

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: 'website',
    url: alternates.canonical,
    siteName: 'Agalaz Fashion',
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function TryOnLocalizedPage() {
  return (
    <>
      <h1 className="sr-only">{meta.title}</h1>
      <Page />
    </>
  );
}
