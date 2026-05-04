'use client';
import TattooSimulator from '@/components/landing/TattooSimulator';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
export default function Page() {
  return (
    <>
      <TriptychDemo slug="virtual-tattoo-simulator" labels={TRIPTYCH_LABELS.es} />
      <TattooSimulator lang="es" />
    </>
  );
}
