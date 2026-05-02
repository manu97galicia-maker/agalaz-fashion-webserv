import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';

export const metadata: Metadata = {
  title: {
    absolute: 'Agalaz Partners — Add AI Virtual Try-On to Your Store',
  },
  description:
    'Add an AI virtual try-on button to your e-commerce store in 2 lines of code. Boost conversions and reduce returns. 7-day free trial, 50 renders included. Works with Shopify, WooCommerce and any platform.',
  keywords: [
    'virtual try-on for shopify',
    'AI try-on widget',
    'ecommerce virtual try-on',
    'reduce online returns',
    'shopify try on app',
    'woocommerce try on',
    'AI fitting room widget',
    'product try on plugin',
    'increase ecommerce conversion',
    'virtual try-on partner',
    'probador virtual shopify',
    'widget probador ropa',
    'reducir devoluciones ecommerce',
  ],
  openGraph: {
    title: 'Agalaz Partners — AI Virtual Try-On for Your Store',
    description:
      '2 lines of code. Your customers preview clothing, glasses and jewelry on themselves. Boost conversions, cut returns. 7-day free trial.',
    type: 'website',
    url: `${BASE_URL}/partners`,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agalaz Partners — AI Try-On Widget for Ecommerce',
    description: 'Add virtual try-on to your store in 2 lines of code. 7-day free trial.',
  },
  alternates: {
    canonical: `${BASE_URL}/partners`,
    languages: {
      'en-US': `${BASE_URL}/partners`,
      'es-ES': `${BASE_URL}/partners`,
    },
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">Agalaz Partners — AI Virtual Try-On Widget for E-commerce Stores</h1>
      {children}
    </>
  );
}
