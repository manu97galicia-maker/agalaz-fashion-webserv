import Image from 'next/image';
import { getTriptychAlts, getTriptychSrc, type TriptychLang } from '@/lib/imageSeo';

export interface TriptychLabels {
  title: string;
  subtitle: string;
  before: string;
  item: string;
  after: string;
}

interface Props {
  /** Slug of the landing (matches the filename in /public/images/landings/{slug}-{before,item,after}.png) */
  slug: string;
  labels: TriptychLabels;
  /**
   * Language of the page. Used to look up keyword-rich, SEO-optimized alt
   * text from `lib/imageSeo.ts`. Defaults to English. The visible badge on
   * each panel still uses the short `labels.{before,item,after}` strings so
   * the UI stays tight.
   */
  lang?: TriptychLang;
}

/**
 * Three-panel demo: the user's "before" photo, the item being tried on, and
 * the AI-generated "after". Reuses the per-landing triptych panels generated
 * by scripts/generate-landing-images.mjs.
 */
export default function TriptychDemo({ slug, labels, lang = 'en' }: Props) {
  const alts = getTriptychAlts(slug, lang);
  const src = getTriptychSrc(slug, lang);
  const panels = [
    { src: src.before, badge: labels.before, alt: alts.before, num: 1 },
    { src: src.item, badge: labels.item, alt: alts.item, num: 2 },
    { src: src.after, badge: labels.after, alt: alts.after, num: 3 },
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-20">
        <div className="text-center mb-4 md:mb-12">
          <h2 className="font-serif text-base md:text-4xl font-black text-slate-900 tracking-tight mb-1 md:mb-2">
            {labels.title}
          </h2>
          <p className="text-slate-500 text-[11px] md:text-base font-light max-w-xl mx-auto">
            {labels.subtitle}
          </p>
        </div>
        {/* 3 columns on every screen (was 1 col on mobile which stacked the
            panels and pushed the dropzones ~1000px below the fold on phones,
            killing mobile conversion — 84% of traffic). On phones the
            triptych is now a compact preview row, with the dropzones still
            visible within one scroll. */}
        <div className="grid grid-cols-3 gap-2 md:gap-5">
          {panels.map((p) => (
            <figure key={p.num} className="relative">
              <div className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Image
                  src={p.src}
                  alt={p.alt}
                  title={p.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 33vw"
                  className="object-cover"
                  priority={p.num === 1}
                />
                <div className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-white/95 backdrop-blur px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
                  {p.num}. {p.badge}
                </div>
              </div>
              <figcaption className="sr-only">{p.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Ready-made label sets per language */
export const TRIPTYCH_LABELS: Record<'en' | 'es' | 'fr' | 'pt' | 'de' | 'it', TriptychLabels> = {
  en: {
    title: 'See how it works',
    subtitle: 'Real example: same person, before and after.',
    before: 'Your photo',
    item: 'The item',
    after: 'Your result',
  },
  es: {
    title: 'Mira cómo funciona',
    subtitle: 'Ejemplo real: la misma persona, antes y después.',
    before: 'Tu foto',
    item: 'El artículo',
    after: 'Tu resultado',
  },
  fr: {
    title: 'Voyez le résultat',
    subtitle: 'Exemple réel : la même personne, avant et après.',
    before: 'Votre photo',
    item: "L'article",
    after: 'Votre résultat',
  },
  pt: {
    title: 'Veja como funciona',
    subtitle: 'Exemplo real: a mesma pessoa, antes e depois.',
    before: 'A sua foto',
    item: 'O artigo',
    after: 'O seu resultado',
  },
  de: {
    title: "So funktioniert's",
    subtitle: 'Echtes Beispiel: dieselbe Person, davor und danach.',
    before: 'Ihr Foto',
    item: 'Das Produkt',
    after: 'Ihr Ergebnis',
  },
  it: {
    title: 'Ecco come funziona',
    subtitle: 'Esempio reale: la stessa persona, prima e dopo.',
    before: 'La tua foto',
    item: "L'articolo",
    after: 'Il risultato',
  },
};
