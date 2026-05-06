import CostumeTryOn from '@/components/landing/CostumeTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-costume-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-costume-try-on" lang="en" />
      <CostumeTryOn />
    </>
  );
}
