import JewelryTryOn from '@/components/landing/JewelryTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-jewelry-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-jewelry-try-on" lang="en" />
      <JewelryTryOn />
    </>
  );
}
