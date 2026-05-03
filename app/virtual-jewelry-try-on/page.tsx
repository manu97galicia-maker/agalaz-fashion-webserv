import JewelryTryOn from '@/components/landing/JewelryTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-jewelry-try-on" labels={TRIPTYCH_LABELS.en} />
      <JewelryTryOn />
    </>
  );
}
