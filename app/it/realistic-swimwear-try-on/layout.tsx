import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Prova Costumi Virtuale Realistica | Bikini sul Tuo Corpo Reale',
  description: 'Il primo provatore virtuale IA di costumi per corpi reali. Carica la tua foto e prova bikini istantaneamente. Riduci i resi con Agalaz AI.',
  alternates: {
    canonical: 'https://agalaz.com/it/realistic-swimwear-try-on',
    languages: {
      'en': 'https://agalaz.com/realistic-swimwear-try-on',
      'es': 'https://agalaz.com/es/realistic-swimwear-try-on',
      'fr': 'https://agalaz.com/fr/realistic-swimwear-try-on',
      'pt': 'https://agalaz.com/pt/realistic-swimwear-try-on',
      'de': 'https://agalaz.com/de/realistic-swimwear-try-on',
      'it': 'https://agalaz.com/it/realistic-swimwear-try-on',
      'x-default': 'https://agalaz.com/realistic-swimwear-try-on',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
