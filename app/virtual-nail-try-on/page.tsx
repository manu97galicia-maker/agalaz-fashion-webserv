import NailTryOn from '@/components/landing/NailTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-nail-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-nail-try-on" lang="en" />
      <NailTryOn />
    </>
  );
}
