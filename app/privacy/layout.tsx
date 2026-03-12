import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Agalaz protects your photos and personal data. Your photos are processed in real-time and never stored on our servers.',
  alternates: {
    canonical: 'https://agalaz.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
