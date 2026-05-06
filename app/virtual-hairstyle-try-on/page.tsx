import HairstyleTryOn from '@/components/landing/HairstyleTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-hairstyle-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-hairstyle-try-on" lang="en" />
      <HairstyleTryOn />
    </>
  );
}
