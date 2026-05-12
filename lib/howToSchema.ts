import type { TriptychLang } from '@/lib/imageSeo';

/**
 * Builds the JSON-LD `HowTo` object describing the 3-step try-on flow for the
 * given slug + language. Shared between <HowToSchemaScript> (page-level script
 * tag) and buildLocalizedJsonLd (inline within the localized @graph).
 */
const PRODUCT: Record<string, Partial<Record<TriptychLang, string>>> = {
  'virtual-wedding-dress-try-on': { en: 'wedding dress', es: 'vestido de novia', fr: 'robe de mariée', pt: 'vestido de noiva', de: 'Brautkleid', it: 'abito da sposa' },
  'virtual-nail-try-on':          { en: 'nail design',  es: 'diseño de uñas', fr: 'manucure',          pt: 'design de unhas', de: 'Nageldesign', it: 'manicure' },
  'virtual-glasses-try-on':       { en: 'glasses',      es: 'gafas',          fr: 'lunettes',          pt: 'óculos',          de: 'Brille',      it: 'occhiali' },
  'virtual-jewelry-try-on':       { en: 'jewelry',      es: 'joyería',        fr: 'bijoux',            pt: 'joias',           de: 'Schmuck',     it: 'gioielli' },
  'virtual-mens-suit-try-on':     { en: "men's suit",   es: 'traje de hombre',fr: 'costume homme',     pt: 'fato masculino',  de: 'Herrenanzug', it: 'abito da uomo' },
  'virtual-pet-clothing-try-on':  { en: 'pet outfit',   es: 'ropa de mascota',fr: 'tenue pour animal', pt: 'roupa para animal',de: 'Tieroutfit', it: 'vestito per animale' },
  'virtual-baby-clothing-try-on': { en: 'baby outfit',  es: 'ropa de bebé',   fr: 'tenue bébé',        pt: 'roupa de bebé',   de: 'Babyoutfit',  it: 'vestito per neonato' },
  'virtual-costume-try-on':       { en: 'costume',      es: 'disfraz',        fr: 'déguisement',       pt: 'fato de carnaval',de: 'Kostüm',      it: 'costume' },
  'virtual-hairstyle-try-on':     { en: 'hairstyle',    es: 'peinado',        fr: 'coiffure',          pt: 'penteado',        de: 'Frisur',      it: 'acconciatura' },
  'virtual-cosplay-try-on':       { en: 'cosplay outfit', es: 'traje cosplay',fr: 'tenue cosplay',     pt: 'fato cosplay',    de: 'Cosplay-Outfit', it: 'costume cosplay' },
  'virtual-veil-try-on':          { en: 'veil',         es: 'velo',           fr: 'voile',             pt: 'véu',             de: 'Schleier',    it: 'velo', ar: 'حجاب' },
  'realistic-swimwear-try-on':    { en: 'swimsuit',     es: 'bañador',        fr: 'maillot de bain',   pt: 'fato de banho',   de: 'Badeanzug',   it: 'costume da bagno' },
  'virtual-tattoo-simulator':     { en: 'tattoo',       es: 'tatuaje',        fr: 'tatouage',          pt: 'tatuagem',        de: 'Tattoo',      it: 'tatuaggio' },
  'virtual-earring-try-on':       { en: 'earrings',     es: 'pendientes',     fr: 'boucles d\'oreille',pt: 'brincos',         de: 'Ohrringe',    it: 'orecchini' },
  'virtual-saree-try-on':         { en: 'saree',        hi: 'साड़ी' },
  'virtual-hanbok-try-on':        { en: 'hanbok',       ko: '한복' },
  'virtual-kimono-try-on':        { en: 'kimono',       ja: '着物' },
  'virtual-qipao-try-on':         { en: 'qipao',        zh: '旗袍' },
};

interface StepSet { name: string; steps: { name: string; text: string }[] }

const TEMPLATES: Record<TriptychLang, (item: string) => StepSet> = {
  en: (item) => ({
    name: `How to virtually try on a ${item} with AI in 30 seconds`,
    steps: [
      { name: 'Upload your photo', text: 'Take or upload a clear, well-lit photo of yourself. Full-body works for clothes; a face-on selfie works for glasses, hair, makeup and earrings.' },
      { name: `Upload the ${item}`, text: `Upload a photo of the ${item} you want to try on — a product screenshot from Zara, Mango, Pinterest or Instagram all work.` },
      { name: 'Get the AI result', text: `Tap "Try on". The AI generates a photoreal image of you wearing the ${item} in 10-30 seconds. Iterate via chat ("show in blue", "make it longer") to refine.` },
    ],
  }),
  es: (item) => ({
    name: `Cómo probar virtualmente ${item} con IA en 30 segundos`,
    steps: [
      { name: 'Sube tu foto', text: 'Haz o sube una foto clara y bien iluminada de ti. Cuerpo entero para ropa; selfie frontal para gafas, peinado, maquillaje o pendientes.' },
      { name: `Sube la imagen de ${item}`, text: `Sube una foto de ${item} que quieras probar — captura de Zara, Mango, Pinterest o Instagram, cualquiera vale.` },
      { name: 'Obtén el resultado IA', text: `Pulsa "Probar". La IA genera una imagen realista de ti con ${item} en 10-30 segundos. Itera por chat ("en azul", "más largo") para refinar.` },
    ],
  }),
  fr: (item) => ({
    name: `Comment essayer ${item} virtuellement avec l'IA en 30 secondes`,
    steps: [
      { name: 'Téléchargez votre photo', text: 'Prenez ou téléchargez une photo claire et bien éclairée de vous. Corps entier pour les vêtements; selfie frontal pour lunettes, coiffure, maquillage ou boucles.' },
      { name: `Téléchargez la photo de ${item}`, text: `Téléchargez la photo de ${item} à essayer — capture de Zara, Mango, Pinterest, Instagram, tout fonctionne.` },
      { name: 'Recevez le résultat IA', text: `Cliquez sur "Essayer". L'IA génère une image photoréaliste de vous portant ${item} en 10-30 secondes.` },
    ],
  }),
  pt: (item) => ({
    name: `Como experimentar ${item} virtualmente com IA em 30 segundos`,
    steps: [
      { name: 'Carregue a sua foto', text: 'Tire ou carregue uma foto clara e bem iluminada de si. Corpo inteiro para roupa; selfie frontal para óculos, penteado, maquilhagem ou brincos.' },
      { name: `Carregue a imagem de ${item}`, text: `Carregue uma foto de ${item} que queira experimentar — captura de Zara, Mango, Pinterest, Instagram, qualquer uma serve.` },
      { name: 'Obtenha o resultado IA', text: `Toque em "Experimentar". A IA gera uma imagem fotorrealista de si com ${item} em 10-30 segundos.` },
    ],
  }),
  de: (item) => ({
    name: `So probieren Sie ${item} virtuell mit KI in 30 Sekunden`,
    steps: [
      { name: 'Foto hochladen', text: 'Machen Sie ein klares, gut beleuchtetes Foto oder laden Sie eines hoch.' },
      { name: `Foto von ${item} hochladen`, text: `Laden Sie ein Foto von ${item} hoch — Screenshot von Zara, Mango, Pinterest, Instagram, alles funktioniert.` },
      { name: 'KI-Ergebnis erhalten', text: `Tippen Sie auf "Anprobieren". Die KI erzeugt in 10-30 Sekunden ein fotorealistisches Bild von Ihnen mit ${item}.` },
    ],
  }),
  it: (item) => ({
    name: `Come provare ${item} virtualmente con IA in 30 secondi`,
    steps: [
      { name: 'Carica la tua foto', text: 'Scatta o carica una foto chiara e ben illuminata di te.' },
      { name: `Carica la foto di ${item}`, text: `Carica una foto di ${item} da provare — screenshot da Zara, Mango, Pinterest, Instagram, funziona tutto.` },
      { name: 'Ottieni il risultato IA', text: `Tocca "Prova". L'IA genera un'immagine fotorealistica di te con ${item} in 10-30 secondi.` },
    ],
  }),
  hi: (item) => ({
    name: `${item} को एआई के साथ 30 सेकंड में वर्चुअली कैसे ट्राय करें`,
    steps: [
      { name: 'अपनी फ़ोटो अपलोड करें', text: 'अपनी एक स्पष्ट, अच्छी रोशनी वाली फ़ोटो खींचें या अपलोड करें।' },
      { name: `${item} की फ़ोटो अपलोड करें`, text: `${item} की फ़ोटो अपलोड करें जिसे आप ट्राय करना चाहते हैं।` },
      { name: 'एआई परिणाम पाएँ', text: '"Try on" दबाएँ। एआई 10-30 सेकंड में आपकी फ़ोटोरीयल छवि बनाता है।' },
    ],
  }),
  ko: (item) => ({
    name: `AI로 ${item}을(를) 30초 안에 가상으로 입어보는 방법`,
    steps: [
      { name: '사진 업로드', text: '잘 밝혀진 본인 사진을 찍거나 업로드하세요.' },
      { name: `${item} 사진 업로드`, text: `입어볼 ${item} 사진을 업로드하세요.` },
      { name: 'AI 결과 받기', text: '"Try on"을 누르면 AI가 10-30초 안에 결과 이미지를 생성합니다.' },
    ],
  }),
  ja: (item) => ({
    name: `AIで${item}を30秒でバーチャル試着する方法`,
    steps: [
      { name: '写真をアップロード', text: '明るい場所で撮ったご自身の写真をアップロードしてください。' },
      { name: `${item}の写真をアップロード`, text: `試着したい${item}の写真をアップロードしてください。` },
      { name: 'AI結果を取得', text: '「Try on」をタップすると、AIが10〜30秒で写真のような結果画像を生成します。' },
    ],
  }),
  zh: (item) => ({
    name: `用AI在30秒内虚拟试穿${item}的方法`,
    steps: [
      { name: '上传您的照片', text: '拍摄或上传一张光线良好的本人照片。' },
      { name: `上传${item}照片`, text: `上传您想试穿的${item}照片。` },
      { name: '获取AI结果', text: '点击"Try on"，AI将在10-30秒内生成逼真的试穿图像。' },
    ],
  }),
  ar: (item) => ({
    name: `كيفية تجربة ${item} افتراضياً بالذكاء الاصطناعي في 30 ثانية`,
    steps: [
      { name: 'حمّلي صورتك', text: 'التقطي أو حمّلي صورة واضحة بإضاءة جيدة لنفسك.' },
      { name: `حمّلي صورة ${item}`, text: `حمّلي صورة ${item} التي تريدين تجربتها.` },
      { name: 'احصلي على النتيجة', text: 'اضغطي على "Try on" — يولّد الذكاء الاصطناعي صورة واقعية في 10-30 ثانية.' },
    ],
  }),
};

export function buildHowToSchema(opts: {
  slug: string;
  lang: TriptychLang;
  pageUrl: string;
  baseUrl?: string;
}): Record<string, unknown> {
  const baseUrl = opts.baseUrl ?? 'https://agalaz.com';
  const itemMap = PRODUCT[opts.slug] ?? {};
  const item = itemMap[opts.lang] ?? itemMap.en ?? 'item';
  const tpl = TEMPLATES[opts.lang] ?? TEMPLATES.en;
  const built = tpl(item);
  return {
    '@type': 'HowTo',
    name: built.name,
    description: built.name,
    totalTime: 'PT30S',
    mainEntityOfPage: opts.pageUrl,
    image: `${baseUrl}/images/landings/${opts.slug}-after.png`,
    step: built.steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
      url: `${opts.pageUrl}#step-${idx + 1}`,
    })),
    supply: [
      { '@type': 'HowToSupply', name: 'A photo of yourself' },
      { '@type': 'HowToSupply', name: `A photo of the ${item}` },
    ],
    tool: [{ '@type': 'HowToTool', name: 'Agalaz Fashion AI try-on (web)' }],
  };
}
