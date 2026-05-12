/**
 * Image SEO helpers for the per-landing triptych (before / item / after).
 *
 * The visible UI badges stay short ("Tu foto", "El artículo") so the cards
 * don't look cluttered. The `alt` attribute and the JSON-LD ImageObject
 * carry the keyword-rich, language-specific copy that Google Images
 * actually indexes.
 */

export type TriptychLang = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it' | 'hi' | 'ko' | 'ja' | 'zh' | 'ar';

interface TriptychAlts {
  before: string;
  item: string;
  after: string;
}

/**
 * The product noun used to anchor the keyword-rich alt text per slug.
 *
 * Keep these natural: Google penalises stuffing, but rewards alt text that
 * describes the image AND naturally contains the head keyword.
 */
const PRODUCT_NAME: Record<string, Partial<Record<TriptychLang, string>>> = {
  'virtual-wedding-dress-try-on': {
    en: 'wedding dress',
    es: 'vestido de novia',
    fr: 'robe de mariée',
    pt: 'vestido de noiva',
    de: 'Brautkleid',
    it: 'abito da sposa',
  },
  'virtual-nail-try-on': {
    en: 'nail design manicure',
    es: 'diseño de uñas manicura',
    fr: 'manucure ongles',
    pt: 'design de unhas manicure',
    de: 'Nageldesign Maniküre',
    it: 'manicure unghie',
  },
  'virtual-glasses-try-on': {
    en: 'glasses frame eyewear',
    es: 'gafas montura óptica',
    fr: 'lunettes monture optique',
    pt: 'óculos armação',
    de: 'Brille Brillenfassung',
    it: 'occhiali montatura',
  },
  'virtual-jewelry-try-on': {
    en: 'necklace ring jewelry for women',
    es: 'collar anillo joyería mujer',
    fr: 'collier bague bijoux femme',
    pt: 'colar anel joia mulher',
    de: 'Halskette Ring Damenschmuck',
    it: 'collana anello gioielli donna',
  },
  'virtual-mens-suit-try-on': {
    en: "men's suit wedding prom business",
    es: 'traje de hombre boda graduación',
    fr: 'costume homme mariage cérémonie',
    pt: 'fato homem casamento cerimónia',
    de: 'Herrenanzug Hochzeit Business',
    it: 'abito uomo matrimonio cerimonia',
  },
  'virtual-pet-clothing-try-on': {
    en: 'dog harness halloween costume sweater',
    es: 'arnés perro disfraz halloween jersey',
    fr: 'harnais chien déguisement halloween pull',
    pt: 'arnês cão fato halloween camisola',
    de: 'Hundegeschirr Halloween Kostüm Pullover',
    it: 'pettorina cane costume halloween maglione',
  },
  'virtual-baby-clothing-try-on': {
    en: 'baby clothes newborn outfit christening',
    es: 'ropa bebé recién nacido conjunto bautizo',
    fr: 'vêtements bébé naissance baptême',
    pt: 'roupa bebé recém-nascido batizado',
    de: 'Babykleidung Neugeborenes Taufe',
    it: 'vestiti neonato battesimo',
  },
  'virtual-costume-try-on': {
    en: 'halloween costume women men couples',
    es: 'disfraz halloween mujer hombre pareja',
    fr: 'déguisement halloween femme homme couple',
    pt: 'fato halloween mulher homem casal',
    de: 'Halloween Kostüm Damen Herren Paar',
    it: 'costume halloween donna uomo coppia',
  },
  'virtual-hairstyle-try-on': {
    en: 'hairstyle haircut color change',
    es: 'peinado corte de pelo cambio color',
    fr: 'coiffure coupe de cheveux couleur',
    pt: 'penteado corte cabelo cor',
    de: 'Frisur Haarschnitt Haarfarbe',
    it: 'acconciatura taglio capelli colore',
  },
  'virtual-cosplay-try-on': {
    en: 'cosplay anime outfit costume',
    es: 'cosplay anime traje disfraz',
    fr: 'cosplay anime tenue déguisement',
    pt: 'cosplay anime fato',
    de: 'Cosplay Anime Kostüm',
    it: 'cosplay anime costume',
  },
  'virtual-veil-try-on': {
    en: 'wedding veil bridal hijab abaya',
    es: 'velo de novia hiyab abaya',
    fr: 'voile de mariée hijab abaya',
    pt: 'véu de noiva hijab abaya',
    de: 'Brautschleier Hijab Abaya',
    it: 'velo da sposa hijab abaya',
    ar: 'طرحة عرس حجاب عباءة',
  },
  'realistic-swimwear-try-on': {
    en: 'bikini swimsuit one-piece swimwear',
    es: 'bikini bañador traje de baño',
    fr: 'bikini maillot de bain une pièce',
    pt: 'biquíni fato de banho',
    de: 'Bikini Badeanzug',
    it: 'bikini costume da bagno',
  },
  'virtual-tattoo-simulator': {
    en: 'tattoo design on body',
    es: 'tatuaje en el cuerpo',
    fr: 'tatouage sur le corps',
    pt: 'tatuagem no corpo',
    de: 'Tattoo am Körper',
    it: 'tatuaggio sul corpo',
  },
  'virtual-earring-try-on': {
    en: 'earring hoop stud',
    es: 'pendiente aro perla',
    fr: "boucle d'oreille créole",
    pt: 'brinco argola pérola',
    de: 'Ohrring Creole Stecker',
    it: 'orecchino cerchio',
  },
  'virtual-saree-try-on': {
    en: 'saree lehenga indian dress',
    hi: 'साड़ी लहंगा',
  },
  'virtual-hanbok-try-on': {
    en: 'hanbok korean traditional dress',
    ko: '한복 전통 의상',
  },
  'virtual-kimono-try-on': {
    en: 'kimono yukata japanese dress',
    ja: '着物 浴衣',
  },
  'virtual-qipao-try-on': {
    en: 'qipao cheongsam chinese dress',
    zh: '旗袍 长衫',
  },
};

const TEMPLATES: Record<TriptychLang, (p: 'before' | 'item' | 'after', n: string) => string> = {
  en: (p, n) =>
    p === 'before'
      ? `Before — original photo, ready to try on ${n} virtually with AI`
      : p === 'item'
      ? `${n} — item photo for virtual try-on with AI fitting`
      : `After — ${n} virtual try-on result on real body, AI generated`,
  es: (p, n) =>
    p === 'before'
      ? `Antes — foto original para probar ${n} con probador virtual IA`
      : p === 'item'
      ? `${n} — artículo para probar virtualmente con IA`
      : `Después — ${n} probado en cuerpo real con IA, resultado probador virtual`,
  fr: (p, n) =>
    p === 'before'
      ? `Avant — photo originale, prête à essayer ${n} virtuellement avec IA`
      : p === 'item'
      ? `${n} — article à essayer virtuellement avec IA`
      : `Après — ${n} essayé sur corps réel avec IA, résultat essayage virtuel`,
  pt: (p, n) =>
    p === 'before'
      ? `Antes — foto original, pronta para experimentar ${n} virtualmente com IA`
      : p === 'item'
      ? `${n} — artigo para experimentar virtualmente com IA`
      : `Depois — ${n} provado em corpo real com IA, resultado do provador virtual`,
  de: (p, n) =>
    p === 'before'
      ? `Vorher — Originalfoto, bereit zum virtuellen Anprobieren von ${n} mit KI`
      : p === 'item'
      ? `${n} — Artikel zum virtuellen Anprobieren mit KI`
      : `Nachher — ${n} an realem Körper mit KI anprobiert, virtuelles Anprobierergebnis`,
  it: (p, n) =>
    p === 'before'
      ? `Prima — foto originale, pronta per provare ${n} virtualmente con IA`
      : p === 'item'
      ? `${n} — articolo da provare virtualmente con IA`
      : `Dopo — ${n} provato su corpo reale con IA, risultato della prova virtuale`,
  hi: (p, n) =>
    p === 'before'
      ? `पहले — ${n} वर्चुअल ट्राय-ऑन के लिए मूल फ़ोटो`
      : p === 'item'
      ? `${n} — एआई वर्चुअल ट्राय-ऑन के लिए आइटम`
      : `बाद में — एआई से ${n} पहना हुआ परिणाम`,
  ko: (p, n) =>
    p === 'before'
      ? `이전 — AI 가상 피팅 전 원본 사진 (${n})`
      : p === 'item'
      ? `${n} — AI 가상 착용용 의상`
      : `이후 — AI로 실제 몸에 ${n} 입혀본 결과`,
  ja: (p, n) =>
    p === 'before'
      ? `ビフォー — ${n} AIバーチャル試着前の元写真`
      : p === 'item'
      ? `${n} — AIバーチャル試着用アイテム`
      : `アフター — AIで実際の体に${n}を試着した結果`,
  zh: (p, n) =>
    p === 'before'
      ? `试穿前 — ${n} AI虚拟试穿原始照片`
      : p === 'item'
      ? `${n} — AI虚拟试穿单品`
      : `试穿后 — 通过AI在真实身体上试穿${n}的效果`,
  ar: (p, n) =>
    p === 'before'
      ? `قبل — صورة أصلية جاهزة لتجربة ${n} افتراضياً بالذكاء الاصطناعي`
      : p === 'item'
      ? `${n} — عنصر للتجربة الافتراضية بالذكاء الاصطناعي`
      : `بعد — نتيجة تجربة ${n} على الجسم الحقيقي بالذكاء الاصطناعي`,
};

/**
 * Returns the keyword-rich alt text for the three triptych panels, given the
 * landing's canonical slug and the page language. Falls back to English copy
 * if the requested language is not configured.
 */
export function getTriptychAlts(slug: string, lang: TriptychLang): TriptychAlts {
  const productMap = PRODUCT_NAME[slug] ?? {};
  const productName = productMap[lang] ?? productMap.en ?? slug.replace(/-/g, ' ');
  const tpl = TEMPLATES[lang] ?? TEMPLATES.en;
  return {
    before: tpl('before', productName),
    item: tpl('item', productName),
    after: tpl('after', productName),
  };
}

/**
 * Native-language slugs used for the triptych image filenames per locale.
 * Mirrors `LANDING_SLUGS` in `lib/i18n/landingSlugs.ts`. The actual PNG
 * copies are produced by `scripts/copy-localized-landing-images.mjs`.
 *
 * Google Image Search reads the filename URL as a ranking signal: serving
 * `vestido-novia-before.png` to a Spanish landing beats serving the same
 * bytes under the English filename.
 */
const NATIVE_IMAGE_SLUG: Record<string, Partial<Record<TriptychLang, string>>> = {
  'virtual-tattoo-simulator':     { es: 'simulador-tatuaje',        fr: 'simulateur-tatouage',       pt: 'simulador-tatuagem',     de: 'tattoo-simulator',         it: 'simulatore-tatuaggi' },
  'realistic-swimwear-try-on':    { es: 'probador-bikini',          fr: 'essayage-bikini',           pt: 'provador-biquini',       de: 'bikini-anprobieren',       it: 'prova-bikini' },
  'virtual-earring-try-on':       { es: 'probador-pendientes',      fr: 'essayage-boucles-oreilles', pt: 'provador-brincos',       de: 'ohrringe-anprobieren',     it: 'prova-orecchini' },
  'virtual-wedding-dress-try-on': { es: 'probador-vestido-novia',   fr: 'essayage-robe-mariee',      pt: 'provador-vestido-noiva', de: 'brautkleid-anprobieren',   it: 'prova-abito-sposa' },
  'virtual-nail-try-on':          { es: 'probador-unas',            fr: 'simulateur-vernis-ongles',  pt: 'simulador-unhas',        de: 'naegel-simulator',         it: 'simulatore-unghie' },
  'virtual-glasses-try-on':       { es: 'probador-gafas',           fr: 'essayage-lunettes',         pt: 'provador-oculos',        de: 'brille-anprobieren',       it: 'prova-occhiali' },
  'virtual-jewelry-try-on':       { es: 'probador-joyas',           fr: 'essayage-bijoux',           pt: 'provador-joias',         de: 'schmuck-anprobieren',      it: 'prova-gioielli' },
  'virtual-mens-suit-try-on':     { es: 'probador-traje-hombre',    fr: 'essayage-costume-homme',    pt: 'provador-fato-homem',    de: 'herrenanzug-anprobieren',  it: 'prova-abito-uomo' },
  'virtual-pet-clothing-try-on':  { es: 'probador-ropa-mascotas',   fr: 'essayage-vetements-animal', pt: 'provador-roupa-animal',  de: 'haustierkleidung-anprobieren', it: 'prova-vestiti-animali' },
  'virtual-baby-clothing-try-on': { es: 'probador-ropa-bebe',       fr: 'essayage-vetements-bebe',   pt: 'provador-roupa-bebe',    de: 'babykleidung-anprobieren', it: 'prova-vestiti-neonato' },
  'virtual-costume-try-on':       { es: 'probador-disfraces',       fr: 'essayage-deguisements',     pt: 'provador-fatos-carnaval',de: 'kostueme-anprobieren',     it: 'prova-costumi' },
  'virtual-hairstyle-try-on':     { es: 'probador-peinados',        fr: 'essayage-coiffures',        pt: 'provador-penteados',     de: 'frisuren-anprobieren',     it: 'prova-acconciature' },
  'virtual-cosplay-try-on':       { es: 'probador-cosplay',         fr: 'essayage-cosplay',          pt: 'provador-cosplay',       de: 'cosplay-anprobieren',      it: 'prova-cosplay' },
};

/**
 * Returns the public URL paths for the three triptych panels. For locales
 * with a native slug copy on disk, the URL uses that native filename so the
 * keyword in the filename matches the page language.
 */
export function getTriptychSrc(slug: string, lang: TriptychLang): {
  before: string;
  item: string;
  after: string;
} {
  const native = NATIVE_IMAGE_SLUG[slug]?.[lang];
  const pathSlug = native ?? slug;
  const base = `/images/landings/${pathSlug}`;
  return {
    before: `${base}-before.png`,
    item: `${base}-item.png`,
    after: `${base}-after.png`,
  };
}

/**
 * Returns three schema.org `ImageObject` entries (one per triptych panel),
 * ready to drop into a JSON-LD `@graph`. These let Google Images attach
 * captions and credit the source page directly, which boosts CTR from the
 * image carousel.
 */
export function getTriptychImageObjects(
  slug: string,
  lang: TriptychLang,
  pageUrl: string,
  baseUrl: string,
): Array<Record<string, unknown>> {
  const alts = getTriptychAlts(slug, lang);
  const src = getTriptychSrc(slug, lang);
  const license = `${baseUrl}/terms`;
  return [
    {
      '@type': 'ImageObject',
      contentUrl: `${baseUrl}${src.before}`,
      url: `${baseUrl}${src.before}`,
      caption: alts.before,
      description: alts.before,
      representativeOfPage: false,
      mainEntityOfPage: pageUrl,
      creditText: 'Agalaz Fashion',
      creator: { '@type': 'Organization', name: 'Agalaz Fashion', url: baseUrl },
      copyrightNotice: '© Agalaz Fashion',
      license,
      acquireLicensePage: license,
      width: 1024,
      height: 1024,
    },
    {
      '@type': 'ImageObject',
      contentUrl: `${baseUrl}${src.item}`,
      url: `${baseUrl}${src.item}`,
      caption: alts.item,
      description: alts.item,
      representativeOfPage: false,
      mainEntityOfPage: pageUrl,
      creditText: 'Agalaz Fashion',
      creator: { '@type': 'Organization', name: 'Agalaz Fashion', url: baseUrl },
      copyrightNotice: '© Agalaz Fashion',
      license,
      acquireLicensePage: license,
      width: 1024,
      height: 1024,
    },
    {
      '@type': 'ImageObject',
      contentUrl: `${baseUrl}${src.after}`,
      url: `${baseUrl}${src.after}`,
      caption: alts.after,
      description: alts.after,
      representativeOfPage: true,
      mainEntityOfPage: pageUrl,
      creditText: 'Agalaz Fashion',
      creator: { '@type': 'Organization', name: 'Agalaz Fashion', url: baseUrl },
      copyrightNotice: '© Agalaz Fashion',
      license,
      acquireLicensePage: license,
      width: 1024,
      height: 1024,
    },
  ];
}
