import type { Metadata } from 'next';
import { ROOT_PAGE_META, localizedAlternates } from '@/lib/i18n/rootPageMeta';
import Page from '@/app/page';

const meta = ROOT_PAGE_META['home']['pt'];
const alternates = localizedAlternates('home', 'pt');

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

export default Page;
