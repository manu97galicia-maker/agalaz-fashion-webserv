import CosplayTryOn from '@/components/landing/CosplayTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-cosplay-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-cosplay-try-on" lang="en" />
      <CosplayTryOn />
    </>
  );
}
