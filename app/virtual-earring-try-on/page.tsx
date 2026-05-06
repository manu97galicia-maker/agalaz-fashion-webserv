'use client';

import { useLang } from '@/components/LanguageProvider';
import EarringTryOn from '@/components/landing/EarringTryOn';
import type { LandingLang } from '@/lib/i18n/landingTranslations';

export default function Page() {
  const { lang } = useLang();
  const landingLang: LandingLang = lang === 'es' ? 'es' : 'en';
  return <EarringTryOn lang={landingLang} />;
}
