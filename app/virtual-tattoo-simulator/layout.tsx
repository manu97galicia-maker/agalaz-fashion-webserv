import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Virtual Tattoo Placement Simulator | Try Tattoos on Your Photo with AI',
  description:
    'Try tattoos on your photo with our free AI simulator. Realistic placement on arms, legs, or chest. High-fidelity rendering for tattoo artists and shops. Try it now!',
  keywords: [
    'tattoo visualizer online free',
    'test tattoo on skin photo',
    'realistic tattoo placement tool',
    'virtual tattoo simulator',
    'tattoo try on app',
    'AI tattoo placement',
    'tattoo preview on body',
    'tattoo design simulator',
    'try tattoo before getting it',
    'tattoo placement app',
  ],
  openGraph: {
    title: 'Free Virtual Tattoo Placement Simulator | Agalaz AI',
    description:
      'The most realistic AI-powered tool to visualize your next tattoo. Upload a photo and see exactly how it fits your body.',
    url: 'https://agalaz.com/virtual-tattoo-simulator',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Virtual Tattoo Simulator — Try Tattoos on Your Photo',
    description:
      'Upload your photo, choose a tattoo design, and see realistic AI placement on your skin. Free, instant, and private.',
  },
  alternates: {
    canonical: 'https://agalaz.com/virtual-tattoo-simulator',
    languages: {
      'en': 'https://agalaz.com/virtual-tattoo-simulator',
      'es': 'https://agalaz.com/virtual-tattoo-simulator',
      'fr': 'https://agalaz.com/fr/virtual-tattoo-simulator',
      'pt': 'https://agalaz.com/pt/virtual-tattoo-simulator',
      'de': 'https://agalaz.com/de/virtual-tattoo-simulator',
      'it': 'https://agalaz.com/it/virtual-tattoo-simulator',
      'x-default': 'https://agalaz.com/virtual-tattoo-simulator',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Agalaz AI Tattoo Simulator',
            operatingSystem: 'WEB',
            applicationCategory: 'DesignApplication',
            url: 'https://agalaz.com/virtual-tattoo-simulator',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '52000',
            },
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      {children}
    </>
  );
}
