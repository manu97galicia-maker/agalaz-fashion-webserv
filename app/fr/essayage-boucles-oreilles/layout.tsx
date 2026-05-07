import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Essayage Virtuel de Boucles d\'Oreilles IA',
  description: 'Essayez boucles d\'oreilles et piercings sur votre photo avec l\'IA. Voyez comment les clous, créoles et piercings cartilage rendent sur vos oreilles.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'fr'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
  openGraph: {
    title: 'Essayage Virtuel de Boucles d\'Oreilles et Piercings IA',
    description: 'Essayez boucles d\'oreilles et piercings sur votre photo avec l\'IA. Voyez comment les clous, créoles et piercings cartilage rendent sur vos oreilles.',
    type: 'website',
    url: nativeLandingUrl('virtual-earring-try-on', 'fr'),
    siteName: 'Agalaz Fashion',
    locale: 'fr_FR',
    images: [{ url: '/og/virtual-earring-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
