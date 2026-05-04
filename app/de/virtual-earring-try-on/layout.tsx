import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Virtuelle Ohrring- und Piercing-Anprobe mit KI',
  description: 'Probiere Ohrringe und Piercings auf deinem Foto mit KI. Sieh, wie Stecker, Creolen und Knorpel-Piercings an deinen Ohren aussehen. Kostenlos.',
  alternates: {
    canonical: 'https://agalaz.com/de/virtual-earring-try-on',
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
