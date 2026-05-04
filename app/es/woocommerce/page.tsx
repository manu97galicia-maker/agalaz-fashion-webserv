import type { Metadata } from 'next';
import { B2B_PAGE_META, b2bLocalizedAlternates } from '@/lib/i18n/b2bPageMeta';
import Page from '@/app/woocommerce/page';

const meta = B2B_PAGE_META['woocommerce']['es'];
const alternates = b2bLocalizedAlternates('woocommerce', 'es');

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
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default Page;
