import MensSuitTryOn from '@/components/landing/MensSuitTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-mens-suit-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-mens-suit-try-on" lang="en" />
      <MensSuitTryOn />
    </>
  );
}
