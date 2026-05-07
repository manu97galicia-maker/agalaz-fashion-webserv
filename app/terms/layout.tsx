import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Agalaz, the AI-powered virtual try-on platform. Read about usage rights, subscriptions, and data handling.',
  alternates: {
    canonical: 'https://agalaz.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Agalaz Fashion',
    description: 'Terms of service for Agalaz — usage rights, subscriptions, and data handling.',
    type: 'website',
    url: 'https://agalaz.com/terms',
    siteName: 'Agalaz Fashion',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
