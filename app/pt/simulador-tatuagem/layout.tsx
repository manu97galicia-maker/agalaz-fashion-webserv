import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Simulador de Tatuagem Virtual Grátis | Teste Tatuagens com IA',
  description: 'Teste tatuagens na sua foto com nosso simulador IA grátis. Posicionamento realista em braços, pernas ou peito. Para tatuadores e estúdios.',
  alternates: {
    canonical: nativeLandingUrl('virtual-tattoo-simulator', 'pt'),
    languages: landingHreflangAlternates('virtual-tattoo-simulator'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
