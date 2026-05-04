import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Provador Virtual de Brincos e Piercings com IA',
  description: 'Teste brincos e piercings na sua foto com IA. Veja como ficam pinos, argolas e piercings de cartilagem nas suas orelhas. Grátis e instantâneo.',
  alternates: {
    canonical: 'https://agalaz.com/pt/virtual-earring-try-on',
    languages: {
      'en': 'https://agalaz.com/virtual-earring-try-on',
      'es': 'https://agalaz.com/es/virtual-earring-try-on',
      'fr': 'https://agalaz.com/fr/virtual-earring-try-on',
      'pt': 'https://agalaz.com/pt/virtual-earring-try-on',
      'de': 'https://agalaz.com/de/virtual-earring-try-on',
      'it': 'https://agalaz.com/it/virtual-earring-try-on',
      'x-default': 'https://agalaz.com/virtual-earring-try-on',
    },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
