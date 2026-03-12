import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Agalaz, the AI-powered virtual try-on platform. Read about usage rights, subscriptions, and data handling.',
  alternates: {
    canonical: 'https://agalaz.com/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
