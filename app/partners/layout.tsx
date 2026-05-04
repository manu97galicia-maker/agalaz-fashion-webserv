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
      en: `${BASE_URL}/partners`,
      es: `${BASE_URL}/es/partners`,
      fr: `${BASE_URL}/fr/partners`,
      pt: `${BASE_URL}/pt/partners`,
      de: `${BASE_URL}/de/partners`,
      it: `${BASE_URL}/it/partners`,
      'x-default': `${BASE_URL}/partners`,
    },
  },
};

const partnersJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/partners#widget`,
      name: 'Agalaz Virtual Try-On Widget',
      url: `${BASE_URL}/partners`,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'E-commerce widget',
      operatingSystem: 'Web (Shopify, WooCommerce, PrestaShop, Magento, Wix, Squarespace, custom)',
      description:
        'Embeddable AI virtual try-on widget for e-commerce stores. Customers preview clothing, glasses, jewelry, hats, shoes, bags, tattoos and nail art on their own photo before buying. Boosts conversion and cuts returns.',
      featureList: [
        '2-line install (script tag + div)',
        'Auto-detect product images on Shopify and WooCommerce',
        'Photorealistic AI rendering (~10s)',
        'Multi-category: clothing, eyewear, jewelry, footwear, bags, tattoos, nail art',
        'Domain allowlisting per API key',
        'SHA-256 hashed API keys',
        'Zero customer-photo retention',
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
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '150',
            priceCurrency: 'EUR',
            billingDuration: 'P1M',
          },
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '499',
          priceCurrency: 'EUR',
          description: '1,000 renders / month',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '499',
            priceCurrency: 'EUR',
            billingDuration: 'P1M',
          },
        },
      ],
      provider: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/partners#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the free trial work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Enter your store URL, sign in with Google, add your card and start a 7-day free trial with 50 renders. Nothing is charged during the trial. If you don't cancel before day 7, the Starter plan (€150/mo, 200 renders) activates automatically. Cancel anytime.",
          },
        },
        {
          '@type': 'Question',
          name: 'What happens after the 7 days (or the 50 renders)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On day 7 the Starter plan (€150/mo, 200 renders) activates automatically unless you cancel before. You can upgrade to Growth (€499/mo, 1,000 renders) from the dashboard. No setup fee.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a setup fee?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "No. We eliminated setup fees. You only pay the monthly subscription when you're ready to go live.",
          },
        },
        {
          '@type': 'Question',
          name: 'What platforms are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The widget works on any website: Shopify, WooCommerce, PrestaShop, Magento, Wix, Squarespace, and any custom-built store. It auto-detects product images on Shopify and WooCommerce. For other platforms, just pass the image URL in the data-garment attribute.',
          },
        },
        {
          '@type': 'Question',
          name: 'What items can customers try on?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Clothing (shirts, dresses, pants, jackets), glasses & sunglasses, jewelry (necklaces, earrings, bracelets, rings, watches), hats, shoes, bags, and even tattoos or nail art. The AI detects the item type automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast is the rendering?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Average render time is ~10 seconds depending on image quality. The AI generates a photorealistic image of the customer wearing the item.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you store customer photos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Customer images are processed in real-time and never stored on our servers. Zero data retention policy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I cancel anytime?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Monthly subscriptions can be cancelled anytime. You keep access until the end of your billing period.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/partners#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Partners', item: `${BASE_URL}/partners` },
      ],
    },
  ],
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersJsonLd) }}
      />
      <h1 className="sr-only">Agalaz Partners — AI Virtual Try-On Widget for E-commerce Stores</h1>
      {children}
    </>
  );
}
