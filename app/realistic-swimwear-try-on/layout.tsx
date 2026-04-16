import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Realistic Virtual Swimwear Try-On | See Bikinis on Your Real Body Type',
  description:
    'The first AI swimwear visualizer for real bodies. Upload your photo and try on bikinis instantly. Reduce returns and find your perfect fit with Agalaz AI.',
  keywords: [
    'virtual bikini try on real person',
    'swimsuit simulator for curvy bodies',
    'AI swimwear fit visualizer',
    'virtual swimwear try on',
    'bikini try on app',
    'swimsuit fit tool',
    'try on swimwear online',
    'body type swimwear visualizer',
    'realistic bikini fitting',
    'virtual fitting room swimwear',
  ],
  openGraph: {
    title: 'Realistic Virtual Swimwear Try-On | Agalaz AI',
    description:
      'Stop guessing. Use our AI to visualize swimwear and bikinis on your own photos with 100% realistic fitting.',
    url: 'https://agalaz.com/realistic-swimwear-try-on',
    siteName: 'Agalaz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realistic Swimwear Try-On — See Bikinis on Your Real Body',
    description:
      'Upload your photo and try on swimwear instantly. AI-powered, realistic fitting for all body types. Free and private.',
  },
  alternates: {
    canonical: 'https://agalaz.com/realistic-swimwear-try-on',
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
            name: 'Agalaz Virtual Swimwear Try-On',
            operatingSystem: 'WEB',
            applicationCategory: 'LifestyleApplication',
            url: 'https://agalaz.com/realistic-swimwear-try-on',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '31000',
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
