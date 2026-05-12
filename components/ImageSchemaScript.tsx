import { getTriptychImageObjects, type TriptychLang } from '@/lib/imageSeo';

interface Props {
  /** Canonical slug of the landing (matches the filename in /public/images/landings/). */
  slug: string;
  /** Page language — controls the caption/description copy on each ImageObject. */
  lang: TriptychLang;
  /** Absolute page URL (used for `mainEntityOfPage` linking back from each image). */
  pageUrl: string;
  /** Site origin, e.g. 'https://agalaz.com'. */
  baseUrl?: string;
}

/**
 * Emits a JSON-LD <script> tag with three `ImageObject` entries (before, item,
 * after) for the triptych on the page. Google reads these to attach captions
 * to images in the Google Images carousel, which improves CTR and gives
 * non-text traffic a path to the page.
 */
export default function ImageSchemaScript({ slug, lang, pageUrl, baseUrl = 'https://agalaz.com' }: Props) {
  const objects = getTriptychImageObjects(slug, lang, pageUrl, baseUrl);
  const ld = { '@context': 'https://schema.org', '@graph': objects };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  );
}
