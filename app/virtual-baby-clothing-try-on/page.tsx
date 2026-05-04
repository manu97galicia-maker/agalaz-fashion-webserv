import BabyClothingTryOn from '@/components/landing/BabyClothingTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-baby-clothing-try-on" labels={TRIPTYCH_LABELS.en} />
      <BabyClothingTryOn />
    </>
  );
}
