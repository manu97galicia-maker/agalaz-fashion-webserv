import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Tattoo-Simulator Kostenlos — Tattoos auf Foto',
  description: 'Probiere Tattoos auf deinem Foto mit unserem kostenlosen KI-Simulator. Realistische Platzierung auf Armen, Beinen oder Brust. Für Tätowierer und Studios.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'de'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
  openGraph: {
    title: 'Kostenloser Virtueller Tattoo-Simulator | Tattoos auf Foto mit KI',
    description: 'Probiere Tattoos auf deinem Foto mit unserem kostenlosen KI-Simulator. Realistische Platzierung auf Armen, Beinen oder Brust. Für Tätowierer und Studios.',
    type: 'website',
    url: nativeLandingUrl('virtual-tattoo-simulator', 'de'),
    siteName: 'Agalaz Fashion',
    locale: 'de_DE',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Kostenloser Virtueller Tattoo-Simulator | Tattoos auf Foto mit KI' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
