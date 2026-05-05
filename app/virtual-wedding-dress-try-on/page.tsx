import WeddingDressTryOn from '@/components/landing/WeddingDressTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-wedding-dress-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-wedding-dress-try-on" lang="en" />
      <WeddingDressTryOn />
    </>
  );
}
