'use client';

import { useLang } from '@/components/LanguageProvider';
import TattooSimulator from '@/components/landing/TattooSimulator';
import type { LandingLang } from '@/lib/i18n/landingTranslations';

export default function Page() {
  const { lang } = useLang();
  const landingLang: LandingLang = lang === 'es' ? 'es' : 'en';
  return <TattooSimulator lang={landingLang} />;
}
