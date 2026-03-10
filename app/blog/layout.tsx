import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fashion & Style Blog — Tips to Shop Smarter Online',
  description: 'Expert guides on virtual try-on, reducing online shopping returns, dressing for your body type, and using AI to find clothes that actually fit. Updated weekly.',
  openGraph: {
    title: 'Agalaz Blog — Shop Smarter, Return Less',
    description: 'Expert fashion guides and AI shopping tips. Learn how to buy clothes online that actually fit your body.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://agalaz.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
