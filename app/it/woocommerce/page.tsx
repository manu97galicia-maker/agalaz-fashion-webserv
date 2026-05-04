import type { Metadata } from 'next';
import { B2B_PAGE_META, b2bLocalizedAlternates } from '@/lib/i18n/b2bPageMeta';
import Page from '@/app/woocommerce/page';

const meta = B2B_PAGE_META['woocommerce']['it'];
const alternates = b2bLocalizedAlternates('woocommerce', 'it');

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
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default Page;
