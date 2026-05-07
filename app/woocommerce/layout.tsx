import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';
const PAGE_URL = `${BASE_URL}/woocommerce`;

export const metadata: Metadata = {
  title: {
    absolute: 'WooCommerce Virtual Try-On Plugin — AI Fitting Room | Agalaz',
  },
  description:
    'Add AI virtual try-on to your WooCommerce store with no plugin to install — just a snippet. Auto-detects product images, works with every theme. 7-day free trial, 50 renders.',
  keywords: [
    'woocommerce virtual try on',
    'woocommerce try on plugin',
    'woocommerce ai fitting room',
    'wordpress virtual try on',
    'woocommerce clothing try on',
    'woocommerce glasses try on',
    'reduce returns woocommerce',
    'woocommerce conversion plugin',
    'ai woocommerce',
    'wordpress fashion plugin',
    'woocommerce product try on',
    'woocommerce virtual mirror',
  ],
  openGraph: {
    title: 'WooCommerce Virtual Try-On — No Plugin, Just a Snippet',
    description:
      'Auto-detect product images on WooCommerce. Customers preview clothing, glasses, jewelry on themselves. Boost conversions, cut returns. 7-day free trial.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'WooCommerce Virtual Try-On Plugin — AI Fitting Room',
    description: 'No plugin to install. 2 lines of code. 7-day free trial, 50 renders.',
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      es: `${BASE_URL}/es/woocommerce`,
      fr: `${BASE_URL}/fr/woocommerce`,
      pt: `${BASE_URL}/pt/woocommerce`,
      de: `${BASE_URL}/de/woocommerce`,
      it: `${BASE_URL}/it/woocommerce`,
      'x-default': PAGE_URL,
    },
  },
};

const wooJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${PAGE_URL}#widget`,
      name: 'Agalaz Virtual Try-On for WooCommerce',
      url: PAGE_URL,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'WooCommerce widget · Virtual fitting room',
      operatingSystem: 'WooCommerce (any WordPress theme)',
      description:
        'Embeddable AI virtual try-on for WooCommerce stores. Works as a script snippet — no WordPress plugin to install, audit or maintain. Auto-detects product images from standard WooCommerce templates. Customers preview clothing, glasses, jewelry, hats, shoes, bags, tattoos and nail art on their own photo.',
      featureList: [
        'Auto-detect product images on WooCommerce (Storefront, Astra, Divi, custom themes)',
        '2-line install: snippet in header.php, div in single-product.php',
        'No WordPress plugin to install or maintain',
        'Photorealistic AI rendering (~10 seconds)',
        'Clothing, eyewear, jewelry, footwear, bags, tattoos, nail art',
        'Domain allowlisting per API key',
        'Zero customer-photo retention',
        'Compatible with WPBakery, Elementor, Gutenberg blocks',
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Free trial',
          price: '0',
          priceCurrency: 'EUR',
          description: '7-day free trial · 50 renders included · no setup fee',
        },
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '150',
          priceCurrency: 'EUR',
          description: '200 renders / month',
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '499',
          priceCurrency: 'EUR',
          description: '1,000 renders / month',
        },
      ],
      provider: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Agalaz a WordPress plugin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, and that is intentional. Plugins consume WordPress resources, expand your attack surface and break on theme updates. Agalaz is a lightweight script tag plus a div — exactly the way you would install Google Analytics. No plugin to install, no plugin to maintain, no plugin to audit.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will it work with my WooCommerce theme?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Agalaz auto-detects product images from the standard WooCommerce single-product template (.woocommerce-product-gallery__image). It has been tested with Storefront, Astra, Divi, OceanWP, Flatsome and most major themes. For unusual layouts you can pass the image URL explicitly with a data-garment attribute.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does it work with page builders like Elementor or WPBakery?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Drop the <script> tag into your global header (Elementor → Theme Builder → Header, or via Insert Headers and Footers) and place the <div> as an HTML widget on your product template. The script does the rest.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast is the rendering?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Average render time is around 10 seconds per try-on. The script is loaded with defer so it never blocks your WooCommerce product page from rendering — your Core Web Vitals scores are unaffected.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you store customer photos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Customer photos are processed in real time and discarded immediately. Zero data retention. This keeps you GDPR-friendly without any extra configuration on your WordPress side.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You start with a 7-day free trial including 50 renders. After the trial it is €150/month for 200 renders (Starter) or €499/month for 1,000 renders (Growth). No setup fee. Cancel anytime from your Stripe customer portal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I migrate from another virtual try-on plugin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — and you can leave the old plugin installed during the migration window. Agalaz is a script, not a plugin, so it does not conflict with anything in your WordPress install. Once you are happy with Agalaz you simply remove the old plugin.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'WooCommerce Virtual Try-On', item: PAGE_URL },
      ],
    },
  ],
};

export default function WooCommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wooJsonLd) }}
      />
      {children}
    </>
  );
}
