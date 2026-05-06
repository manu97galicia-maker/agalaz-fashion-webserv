import VeilTryOn from '@/components/landing/VeilTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-veil-try-on" labels={TRIPTYCH_LABELS.en} />
      <VeilTryOn />
    </>
  );
}
