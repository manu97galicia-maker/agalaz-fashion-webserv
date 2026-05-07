import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Prova Virtuale Bikini — Costumi sul Corpo Reale',
  description: 'Il primo provatore virtuale IA di costumi per corpi reali. Carica la tua foto e prova bikini istantaneamente. Riduci i resi con Agalaz AI.',
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'it'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
  openGraph: {
    title: 'Prova Costumi Virtuale Realistica | Bikini sul Tuo Corpo Reale',
    description: 'Il primo provatore virtuale IA di costumi per corpi reali. Carica la tua foto e prova bikini istantaneamente. Riduci i resi con Agalaz AI.',
    type: 'website',
    url: nativeLandingUrl('realistic-swimwear-try-on', 'it'),
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
