import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Simulatore Tatuaggi Virtuale — Prova con IA',
  description: 'Prova tatuaggi sulla tua foto con il nostro simulatore IA gratuito. Posizionamento realistico su braccia, gambe o petto. Per tatuatori e studi.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'it'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
  openGraph: {
    title: 'Simulatore di Tatuaggi Virtuale Gratis | Prova Tatuaggi con l\'IA',
    description: 'Prova tatuaggi sulla tua foto con il nostro simulatore IA gratuito. Posizionamento realistico su braccia, gambe o petto. Per tatuatori e studi.',
    type: 'website',
    url: nativeLandingUrl('virtual-tattoo-simulator', 'it'),
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Simulatore di Tatuaggi Virtuale Gratis | Prova Tatuaggi con l\'IA' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
