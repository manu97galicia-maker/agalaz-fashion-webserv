import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Realistische Virtuelle Bademoden-Anprobe | Bikinis am Echten Körper',
  description: 'Die erste KI-Bademoden-Anprobe für echte Körper. Lade dein Foto hoch und probiere Bikinis sofort. Reduziere Retouren mit Agalaz AI.',
  alternates: {
    canonical: nativeLandingUrl('realistic-swimwear-try-on', 'de'),
    languages: landingHreflangAlternates('realistic-swimwear-try-on'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
