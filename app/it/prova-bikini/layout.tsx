import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Prova Costumi Virtuale Realistica | Bikini sul Tuo Corpo Reale',
  description: 'Il primo provatore virtuale IA di costumi per corpi reali. Carica la tua foto e prova bikini istantaneamente. Riduci i resi con Agalaz AI.',
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'it'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
