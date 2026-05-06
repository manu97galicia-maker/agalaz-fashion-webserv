'use client';

import { useLang } from '@/components/LanguageProvider';
import SwimwearTryOn from '@/components/landing/SwimwearTryOn';
import type { LandingLang } from '@/lib/i18n/landingTranslations';

export default function Page() {
  const { lang } = useLang();
  const landingLang: LandingLang = lang === 'es' ? 'es' : 'en';
  return <SwimwearTryOn lang={landingLang} />;
}
