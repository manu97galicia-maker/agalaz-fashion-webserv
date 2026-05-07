import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Provador Virtual de Biquínis — IA Realista',
  description: 'O primeiro provador virtual IA de biquínis para corpos reais. Envie sua foto e teste biquínis instantaneamente. Reduza devoluções com Agalaz AI.',
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'pt'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
  openGraph: {
    title: 'Provador Virtual de Biquínis Realista | Bikinis no Seu Corpo Real',
    description: 'O primeiro provador virtual IA de biquínis para corpos reais. Envie sua foto e teste biquínis instantaneamente. Reduza devoluções com Agalaz AI.',
    type: 'website',
    url: nativeLandingUrl('realistic-swimwear-try-on', 'pt'),
    siteName: 'Agalaz Fashion',
    locale: 'pt_PT',
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Agalaz — AI Virtual Try-On' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
