import PetClothingTryOn from '@/components/landing/PetClothingTryOn';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-pet-clothing-try-on" labels={TRIPTYCH_LABELS.en} />
      <PartnerCtaBlock category="virtual-pet-clothing-try-on" lang="en" />
      <PetClothingTryOn />
    </>
  );
}
