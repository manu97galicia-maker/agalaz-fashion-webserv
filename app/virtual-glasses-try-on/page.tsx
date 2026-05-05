import GlassesTryOn from '@/components/landing/GlassesTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-glasses-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-glasses-try-on" lang="en" />
      <GlassesTryOn />
    </>
  );
}
