import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-jewelry-try-on']['pt'].content} enHref="/virtual-jewelry-try-on" slug="virtual-jewelry-try-on" lang="pt" />;
}
