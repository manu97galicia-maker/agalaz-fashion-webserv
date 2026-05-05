import type { Metadata } from 'next';
import { landingHreflangAlternates, nativeLandingUrl } from '@/lib/i18n/landingSlugs';
export const metadata: Metadata = {
  title: 'Virtuelle Ohrring- und Piercing-Anprobe mit KI',
  description: 'Probiere Ohrringe und Piercings auf deinem Foto mit KI. Sieh, wie Stecker, Creolen und Knorpel-Piercings an deinen Ohren aussehen. Kostenlos.',
  alternates: {
    canonical: nativeLandingUrl('virtual-earring-try-on', 'de'),
    languages: landingHreflangAlternates('virtual-earring-try-on'),
  },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
