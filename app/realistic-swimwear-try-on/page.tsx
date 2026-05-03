'use client';

import { useLang } from '@/components/LanguageProvider';
import SwimwearTryOn from '@/components/landing/SwimwearTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import type { LandingLang } from '@/lib/i18n/landingTranslations';

export default function Page() {
  const { lang } = useLang();
  const landingLang: LandingLang = lang === 'es' ? 'es' : 'en';
  return (
    <>
      <TriptychDemo slug="realistic-swimwear-try-on" labels={TRIPTYCH_LABELS[landingLang]} />
      <SwimwearTryOn lang={landingLang} />
    </>
  );
}
