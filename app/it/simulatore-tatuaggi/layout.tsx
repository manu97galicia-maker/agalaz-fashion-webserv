import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Simulatore di Tatuaggi Virtuale Gratis | Prova Tatuaggi con l\'IA',
  description: 'Prova tatuaggi sulla tua foto con il nostro simulatore IA gratuito. Posizionamento realistico su braccia, gambe o petto. Per tatuatori e studi.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'it'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
