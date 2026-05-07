import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Provador Virtual de Brincos e Piercings com IA',
  description: 'Teste brincos e piercings na sua foto com IA. Veja como ficam pinos, argolas e piercings de cartilagem nas suas orelhas. Grátis e instantâneo.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'pt'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
  openGraph: {
    title: 'Provador Virtual de Brincos e Piercings com IA',
    description: 'Teste brincos e piercings na sua foto com IA. Veja como ficam pinos, argolas e piercings de cartilagem nas suas orelhas. Grátis e instantâneo.',
    type: 'website',
    url: nativeLandingUrl('virtual-earring-try-on', 'pt'),
    siteName: 'Agalaz Fashion',
    locale: 'pt_PT',
    images: [{ url: '/og/virtual-earring-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
