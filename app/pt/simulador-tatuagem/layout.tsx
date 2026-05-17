import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Simulador de Tatuagem Grátis — Teste com IA',
  description: 'Teste tatuagens na sua foto com nosso simulador IA grátis. Posicionamento realista em braços, pernas ou peito. Para tatuadores e estúdios.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'pt'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
  openGraph: {
    title: 'Simulador de Tatuagem Virtual Grátis | Teste Tatuagens com IA',
    description: 'Teste tatuagens na sua foto com nosso simulador IA grátis. Posicionamento realista em braços, pernas ou peito. Para tatuadores e estúdios.',
    type: 'website',
    url: nativeLandingUrl('virtual-tattoo-simulator', 'pt'),
    siteName: 'Agalaz Fashion',
    locale: 'pt_PT',
    images: [{ url: '/og/virtual-tattoo-simulator.png', width: 1200, height: 630, alt: 'Simulador de Tatuagem Virtual Grátis | Teste Tatuagens com IA' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
