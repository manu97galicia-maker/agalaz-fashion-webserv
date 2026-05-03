import MensSuitTryOn from '@/components/landing/MensSuitTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-mens-suit-try-on" labels={TRIPTYCH_LABELS.en} />
      <MensSuitTryOn />
    </>
  );
}
