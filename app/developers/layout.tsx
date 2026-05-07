import type { Metadata } from 'next';

const BASE_URL = 'https://agalaz.com';
const PAGE_URL = `${BASE_URL}/developers`;

export const metadata: Metadata = {
  title: {
    absolute: 'Virtual Try-On API for Developers — REST + JSON | Agalaz',
  },
  description:
    'Integrate AI virtual try-on into your app with the Agalaz REST API. POST a user photo + a garment, get back a photorealistic image in ~10s. Bearer-key auth, CORS-ready, 10 MB image limit.',
  keywords: [
    'virtual try on api',
    'ai try on api',
    'fashion try on api',
    'try on rest api',
    'virtual fitting room api',
    'ai clothing api',
    'shopify try on api',
    'ai garment api',
    'image to image fashion api',
    'try on sdk',
    'virtual try on integration',
    'developer api try on',
  ],
  openGraph: {
    title: 'Agalaz Virtual Try-On API — REST endpoint, ~10s renders',
    description:
      'POST a photo + a garment, receive a photorealistic try-on. Bearer-key auth, CORS-ready, domain-scoped keys. Build it into your app, marketplace or POS.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Agalaz Fashion',
    locale: 'en_US',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Agalaz Virtual Try-On API — for developers',
    description: 'REST endpoint that turns a user photo + a garment into a photorealistic try-on in ~10 seconds.',
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      es: `${BASE_URL}/es/developers`,
      fr: `${BASE_URL}/fr/developers`,
      pt: `${BASE_URL}/pt/developers`,
      de: `${BASE_URL}/de/developers`,
      it: `${BASE_URL}/it/developers`,
      'x-default': PAGE_URL,
    },
  },
};

const developersJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${PAGE_URL}#api`,
      name: 'Agalaz Virtual Try-On API',
      url: PAGE_URL,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'REST API · Image generation',
      operatingSystem: 'Any (HTTPS)',
      description:
        'REST endpoint that accepts a user photo + a garment image and returns a photorealistic try-on render. Bearer-key authentication, CORS-ready for browser use, domain-scoped keys for security. Designed for e-commerce, marketplaces, retail apps and POS integrations.',
      featureList: [
        'POST /api/v1/tryon — single endpoint',
        'Bearer token auth (agz_live_...)',
        'CORS preflight handled — call directly from the browser',
        'Domain allowlisting per API key',
        'Accepts base64 image OR public garment URL',
        'Max 10 MB per image, ~10s average response',
        'Multi-category: clothing, eyewear, jewelry, footwear, bags, tattoos, nail art',
        'Zero customer-photo retention',
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Free trial',
          price: '0',
          priceCurrency: 'EUR',
          description: '7-day free trial · 50 API calls included · no setup fee',
        },
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '150',
          priceCurrency: 'EUR',
          description: '200 API calls / month',
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '499',
          priceCurrency: 'EUR',
          description: '1,000 API calls / month',
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
          name: 'How do I get an API key?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sign up on the Agalaz Partners page with Google, register your domain (or your test domain) and you receive an API key starting with agz_live_. Your key is scoped to the domain you registered, so it cannot be used from other origins.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the request body look like?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Send a JSON POST to /api/v1/tryon with at minimum userImage (base64). To apply a product, send clothingImage (base64) or garmentUrl (public HTTPS URL). Optional fields: currentSize, previewSize for fit modeling.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a render take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Average 10 seconds end-to-end. The endpoint has a 120-second timeout. The maxDuration on the serverless function is set to 120 seconds, so even cold-start renders complete within the response window.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the image size limits?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Maximum 10 MB per image (base64-encoded). Minimum recommended resolution is 500×500 pixels — anything smaller is rejected with a 400 because the AI cannot reliably generate a believable result from low-resolution input.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I call it from the browser?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The endpoint sets CORS headers and handles OPTIONS preflight. Your API key is domain-scoped, so even if it leaks in browser code it can only be used from the domains you registered. For higher-security setups, proxy the call through your own backend.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you store the photos I send?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Both userImage and clothingImage are processed in memory and discarded immediately after the response is returned. Zero data retention. The only thing we log is the partner_id, request timestamp and credit deduction — never the image content.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is rate limiting handled?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Each API key has a monthly render quota tied to your subscription plan (50 on the trial, 200 on Starter, 1,000 on Growth). When you hit the quota the endpoint returns 402 Payment Required with the renewal date. Upgrade or wait for the next billing cycle.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there an SDK?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not yet — the API is intentionally tiny (one endpoint, one auth header, JSON in/out) so a thin SDK adds little value over fetch/requests. Most integrations are 20 lines of code in the host language. If you would like a published SDK in your stack, email infoagalaz@gmail.com and tell us which language.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Developers', item: PAGE_URL },
      ],
    },
  ],
};

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(developersJsonLd) }}
      />
      {children}
    </>
  );
}
