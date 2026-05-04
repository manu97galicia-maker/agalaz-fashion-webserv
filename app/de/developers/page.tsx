import type { Metadata } from 'next';
import { B2B_PAGE_META, b2bLocalizedAlternates } from '@/lib/i18n/b2bPageMeta';
import Page from '@/app/developers/page';

const meta = B2B_PAGE_META['developers']['de'];
const alternates = b2bLocalizedAlternates('developers', 'de');

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
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default Page;
