import LocalizedLanding from '@/components/localized/LocalizedLanding';
import { localizedLandings } from '@/data/localizedLandings';

export default function Page() {
  return <LocalizedLanding c={localizedLandings['virtual-mens-suit-try-on']['pt'].content} enHref="/virtual-mens-suit-try-on" slug="virtual-mens-suit-try-on" lang="pt" />;
}
