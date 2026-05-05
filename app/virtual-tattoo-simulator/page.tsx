'use client';

import { useLang } from '@/components/LanguageProvider';
import TattooSimulator from '@/components/landing/TattooSimulator';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import type { LandingLang } from '@/lib/i18n/landingTranslations';

export default function Page() {
  const { lang } = useLang();
  const landingLang: LandingLang = lang === 'es' ? 'es' : 'en';
  return (
    <>
      <TriptychDemo slug="virtual-tattoo-simulator" labels={TRIPTYCH_LABELS[landingLang]} />
      <PartnerCtaBlock category="virtual-tattoo-simulator" lang={landingLang} />
      <TattooSimulator lang={landingLang} />
    </>
  );
}
