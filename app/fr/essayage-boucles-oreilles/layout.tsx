import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Essayage Virtuel de Boucles d\'Oreilles et Piercings IA',
  description: 'Essayez boucles d\'oreilles et piercings sur votre photo avec l\'IA. Voyez comment les clous, créoles et piercings cartilage rendent sur vos oreilles.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'fr'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
