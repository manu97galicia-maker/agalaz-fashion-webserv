import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Prova Virtuale di Orecchini e Piercing con IA',
  description: 'Prova orecchini e piercing sulla tua foto con IA. Vedi come stanno borchie, cerchi e piercing cartilagine sulle tue orecchie. Gratis e istantaneo.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'it'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
