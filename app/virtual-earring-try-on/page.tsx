'use client';

import { useLang } from '@/components/LanguageProvider';
import EarringTryOn from '@/components/landing/EarringTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import type { LandingLang } from '@/lib/i18n/landingTranslations';

export default function Page() {
  const { lang } = useLang();
  const landingLang: LandingLang = lang === 'es' ? 'es' : 'en';
  return (
    <>
      <TriptychDemo slug="virtual-earring-try-on" labels={TRIPTYCH_LABELS[landingLang]} />
      <EarringTryOn lang={landingLang} />
    </>
  );
}
