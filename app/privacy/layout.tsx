import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Agalaz protects your photos and personal data. Your photos are processed in real-time and never stored on our servers.',
  alternates: {
    canonical: 'https://agalaz.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Agalaz Fashion',
    description: 'Learn how Agalaz protects your photos and personal data.',
    type: 'website',
    url: 'https://agalaz.com/privacy',
    siteName: 'Agalaz Fashion',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Privacy Policy | Agalaz Fashion' }],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
