'use client';

import { usePathname } from 'next/navigation';
import InternalLandingLinks from './InternalLandingLinks';
import type { LandingLang } from '@/lib/i18n/landingSlugs';

/**
 * Auto-locale wrapper for InternalLandingLinks. Use on server-rendered pages
 * that aren't themselves localized (no `useLang()` available) but whose route
 * URL carries the locale prefix — e.g. `/es/developers`, `/fr/shopify`.
 *
 * Reads `usePathname()` (works during SSR for client components in Next 13+),
 * extracts the lang prefix, and forwards it to InternalLandingLinks so the
 * rendered HTML — even at first paint — has links to native-language slugs.
 */
export default function InternalLandingLinksAuto() {
  const pathname = usePathname() || '';
  const match = pathname.match(/^\/(es|fr|pt|de|it)(?:\/|$)/);
  const lang: LandingLang = (match?.[1] as LandingLang) || 'en';
  return <InternalLandingLinks lang={lang} />;
}
