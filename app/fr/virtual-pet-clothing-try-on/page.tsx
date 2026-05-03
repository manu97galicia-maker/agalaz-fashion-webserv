import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-pet-clothing-try-on']['fr'].content} enHref="/virtual-pet-clothing-try-on" />;
}
