import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-costume-try-on']['es'].content} enHref="/virtual-costume-try-on" slug="virtual-costume-try-on" lang="es" />;
}
