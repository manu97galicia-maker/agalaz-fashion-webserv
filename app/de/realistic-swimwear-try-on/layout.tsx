import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Realistische Virtuelle Bademoden-Anprobe | Bikinis am Echten Körper',
  description: 'Die erste KI-Bademoden-Anprobe für echte Körper. Lade dein Foto hoch und probiere Bikinis sofort. Reduziere Retouren mit Agalaz AI.',
  alternates: {
    canonical: 'https://agalaz.com/de/realistic-swimwear-try-on',
    languages: {
      'en': 'https://agalaz.com/realistic-swimwear-try-on',
      'fr': 'https://agalaz.com/fr/realistic-swimwear-try-on',
      'pt': 'https://agalaz.com/pt/realistic-swimwear-try-on',
      'de': 'https://agalaz.com/de/realistic-swimwear-try-on',
      'it': 'https://agalaz.com/it/realistic-swimwear-try-on',
      'x-default': 'https://agalaz.com/realistic-swimwear-try-on',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
