import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Prova Virtuale Orecchini IA',
  description: 'Prova orecchini e piercing sulla tua foto con IA. Vedi come stanno borchie, cerchi e piercing cartilagine sulle tue orecchie. Gratis e istantaneo.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'it'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
  openGraph: {
    title: 'Prova Virtuale di Orecchini e Piercing con IA',
    description: 'Prova orecchini e piercing sulla tua foto con IA. Vedi come stanno borchie, cerchi e piercing cartilagine sulle tue orecchie. Gratis e istantaneo.',
    type: 'website',
    url: nativeLandingUrl('virtual-earring-try-on', 'it'),
    siteName: 'Agalaz Fashion',
    locale: 'it_IT',
    images: [{ url: '/og/virtual-earring-try-on.png', width: 1200, height: 630, alt: 'Prova Virtuale di Orecchini e Piercing con IA' }],
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
