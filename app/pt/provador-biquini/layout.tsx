import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Biquíni Feminino — Provador Virtual IA Brasil',
  description: 'Biquíni feminino, biquíni de crochê, fio dental, plus size — provador virtual IA. Veja o biquíni no seu corpo real antes de comprar. Grátis.',
  keywords: [
    'biquíni',
    'biquíni feminino',
    'biquíni de crochê',
    'biquíni de croche',
    'biquíni fio dental',
    'biquíni fio-dental',
    'biquíni plus size',
    'maiô feminino',
    'roupa de banho feminina',
    'mulher de biquíni',
    'biquíni brasileiro',
    'provador virtual biquíni',
    'biquíni virtual ia',
    'experimentar biquíni online',
  ],
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
    images: [{ url: '/og/realistic-swimwear-try-on.png', width: 1200, height: 630, alt: 'Provador Virtual de Biquínis Realista | Bikinis no Seu Corpo Real' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
