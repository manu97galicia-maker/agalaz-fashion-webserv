'use client';
import SwimwearTryOn from '@/components/landing/SwimwearTryOn';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
export default function Page() {
  return (
    <>
      <TriptychDemo slug="realistic-swimwear-try-on" labels={TRIPTYCH_LABELS.de} />
      <SwimwearTryOn lang="de" />
    </>
  );
}
