import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Prova Virtuale di Orecchini e Piercing con IA',
  description: 'Prova orecchini e piercing sulla tua foto con IA. Vedi come stanno borchie, cerchi e piercing cartilagine sulle tue orecchie. Gratis e istantaneo.',
  alternates: {
    canonical: 'https://agalaz.com/it/virtual-earring-try-on',
    languages: {
      'en': 'https://agalaz.com/virtual-earring-try-on',
      'es': 'https://agalaz.com/virtual-earring-try-on',
      'fr': 'https://agalaz.com/fr/virtual-earring-try-on',
      'pt': 'https://agalaz.com/pt/virtual-earring-try-on',
      'de': 'https://agalaz.com/de/virtual-earring-try-on',
      'it': 'https://agalaz.com/it/virtual-earring-try-on',
      'x-default': 'https://agalaz.com/virtual-earring-try-on',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
