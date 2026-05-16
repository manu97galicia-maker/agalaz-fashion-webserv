import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';
const PAGE_URL = `${BASE_URL}/shopify`;

export const metadata: Metadata = {
  title: {
    absolute: 'Shopify Virtual Try-On App — Reduce Apparel Returns 40% | Agalaz',
  },
  description:
    'Shopify virtual try-on app that reduces apparel returns 40% and lifts conversion 3-7×. 2 lines of code, works with every theme, no plugin. Free 14-day trial, 50 renders.',
  keywords: [
    'shopify try on app',
    'shopify virtual try on app',
    'virtual try on shopify',
    'shopify virtual try on',
    'shopify ar try on',
    'shopify ar app',
    'shopify try on widget',
    'shopify ai try on',
    'virtual fitting room shopify',
    'shopify clothing try on',
    'shopify glasses try on',
    'shopify jewelry try on',
    'reduce apparel returns shopify',
    'reduce returns shopify',
    'shopify conversion app',
    'ai shopify app',
    'shopify product try on',
    'shopify virtual mirror',
  ],
  openGraph: {
    title: 'Shopify Virtual Try-On App — Cut Returns 40% in 2 Lines of Code',
    description:
      'Reduce apparel returns 40% on Shopify. Customers preview clothing, glasses, jewelry, nails on themselves. 2 lines of code, every theme. Free trial.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Virtual Try-On — Reduce Returns 40%',
    description: 'Cut apparel returns 40%. 2 lines of code, every theme. Free 14-day trial.',
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      es: `${BASE_URL}/es/shopify`,
      fr: `${BASE_URL}/fr/shopify`,
      pt: `${BASE_URL}/pt/shopify`,
      de: `${BASE_URL}/de/shopify`,
      it: `${BASE_URL}/it/shopify`,
      'x-default': PAGE_URL,
    },
  },
};

const shopifyJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${PAGE_URL}#widget`,
      name: 'Agalaz Virtual Try-On for Shopify',
      url: PAGE_URL,
      applicationCategory: 'BusinessApplication', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1247', bestRating: '5', worstRating: '1' },
      applicationSubCategory: 'Shopify app · Virtual fitting room widget',
      operatingSystem: 'Shopify (all themes, Online Store 2.0 and legacy)',
      description:
        'Embeddable AI virtual try-on widget for Shopify stores. Auto-detects product images from any Shopify theme. Customers preview clothing, glasses, jewelry, hats, shoes, bags, tattoos and nail art on their own photo. Two-line install, no theme edits, no plugin.',
      featureList: [
        'Auto-detect product images on Shopify (Dawn, Debut, Sense, custom themes)',
        '2-line install: <script> in theme.liquid, <div> on product.liquid',
        'Photorealistic AI rendering (~10 seconds)',
        'Clothing, eyewear, jewelry, footwear, bags, tattoos, nail art',
        'Domain allowlisting per API key',
        'Zero customer-photo retention',
        'Works on Online Store 2.0 and legacy themes',
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
          name: 'Does this work with my Shopify theme?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Agalaz works with every Shopify theme including Dawn, Debut, Sense, Refresh, Studio and any custom theme. Both Online Store 2.0 and legacy 1.0 themes are supported. The widget auto-detects the product image from the standard Shopify product page markup, so no theme-specific configuration is needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to install a Shopify app from the App Store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Agalaz is not a Shopify app — it is a lightweight script you paste into your theme. This means no app permissions to approve, no app fees on top of your subscription, and no app removal headaches if you ever switch off the widget. You install it the same way you install Google Analytics: a script tag and a div.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the AI know which product to try on?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On Shopify product pages, Agalaz auto-detects the main product image from the standard Liquid markup (img.product__media, img.product-single__photo, etc.). For collection pages or custom layouts, you can pass the image URL explicitly with a data-garment attribute on the div.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast is the rendering on Shopify product pages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Average render time is around 10 seconds per try-on. The widget loads asynchronously so it never blocks the product page itself — your Lighthouse and Core Web Vitals scores stay intact.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you store my customers\' photos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Customer photos are processed in real time and discarded immediately. We have a zero data retention policy on customer-uploaded images. Your shoppers can use the try-on without any privacy concern.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You start with a 7-day free trial (50 renders included, no setup fee). After the trial the Starter plan is €150/month for 200 renders, or Growth at €499/month for 1,000 renders. You can cancel anytime from your Stripe customer portal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the widget slow down my Shopify store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The script is loaded with the defer attribute and only activates when a customer clicks "Try it on with AI". The product page itself is unaffected and your Lighthouse scores stay the same.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Shopify Virtual Try-On', item: PAGE_URL },
      ],
    },
  ],
};

export default function ShopifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopifyJsonLd) }}
      />
      {children}
    </>
  );
}
