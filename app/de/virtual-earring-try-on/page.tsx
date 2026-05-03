'use client';
import EarringTryOn from '@/components/landing/EarringTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-earring-try-on" labels={TRIPTYCH_LABELS.de} />
      <EarringTryOn lang="de" />
    </>
  );
}
