import PetClothingTryOn from '@/components/landing/PetClothingTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-pet-clothing-try-on" labels={TRIPTYCH_LABELS.en} />
      <PetClothingTryOn />
    </>
  );
}
