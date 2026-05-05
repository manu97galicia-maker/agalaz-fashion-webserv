import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Provador Virtual de Brincos e Piercings com IA',
  description: 'Teste brincos e piercings na sua foto com IA. Veja como ficam pinos, argolas e piercings de cartilagem nas suas orelhas. Grátis e instantâneo.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'pt'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
