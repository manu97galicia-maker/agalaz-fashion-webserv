import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Simulateur de Tatouage Gratuit — IA',
  description: 'Essayez des tatouages sur votre photo avec notre simulateur IA gratuit. Placement réaliste sur bras, jambes ou poitrine. Pour artistes et boutiques.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'fr'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
  openGraph: {
    title: 'Simulateur de Tatouage Virtuel Gratuit | Essayez des Tatouages avec l\'IA',
    description: 'Essayez des tatouages sur votre photo avec notre simulateur IA gratuit. Placement réaliste sur bras, jambes ou poitrine. Pour artistes et boutiques.',
    type: 'website',
    url: nativeLandingUrl('virtual-tattoo-simulator', 'fr'),
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
