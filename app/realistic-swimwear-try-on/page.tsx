'use client';

import { useLang } from '@/components/LanguageProvider';
import SwimwearTryOn from '@/components/landing/SwimwearTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import type { LandingLang } from '@/lib/i18n/landingTranslations';

export default function Page() {
  const { lang } = useLang();
  const landingLang: LandingLang = lang === 'es' ? 'es' : 'en';
  return (
    <>
      <TriptychDemo slug="realistic-swimwear-try-on" labels={TRIPTYCH_LABELS[landingLang]} />
      <PartnerCtaBlock category="realistic-swimwear-try-on" lang={landingLang} />
      <SwimwearTryOn lang={landingLang} />
    </>
  );
}
