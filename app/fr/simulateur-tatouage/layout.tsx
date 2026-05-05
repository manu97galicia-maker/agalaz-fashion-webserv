import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Simulateur de Tatouage Virtuel Gratuit | Essayez des Tatouages avec l\'IA',
  description: 'Essayez des tatouages sur votre photo avec notre simulateur IA gratuit. Placement réaliste sur bras, jambes ou poitrine. Pour artistes et boutiques.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'fr'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
