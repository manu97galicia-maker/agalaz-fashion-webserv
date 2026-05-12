import type { TriptychLang } from '@/lib/imageSeo';
import { buildHowToSchema } from '@/lib/howToSchema';

interface Props {
  /** Canonical slug — used to derive product-specific names in the steps. */
  slug: string;
  /** Page language — controls translated step copy. */
  lang: TriptychLang;
  /** Absolute page URL — used as the `mainEntityOfPage` link. */
  pageUrl: string;
  /** Site origin, e.g. 'https://agalaz.com'. */
  baseUrl?: string;
}

/**
 * Emits a JSON-LD `HowTo` schema describing the 3-step try-on flow in the
 * page's language. Google AI Overviews and many LLM citation pipelines treat
 * HowTo schemas as authoritative answers for "how do I..." queries.
 */
export default function HowToSchemaScript({ slug, lang, pageUrl, baseUrl = 'https://agalaz.com' }: Props) {
  const howTo = buildHowToSchema({ slug, lang, pageUrl, baseUrl });
  const ld = { '@context': 'https://schema.org', ...howTo };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  );
}
