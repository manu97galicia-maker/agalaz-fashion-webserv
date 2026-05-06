'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Camera, Shirt, Layers, Target, CheckCircle2 } from 'lucide-react';
import { useLang, pickLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';

export default function VirtualTryOnPage() {
  const { lang } = useLang();
  const en = lang === 'en';

  useEffect(() => {
    (window as any).datafast?.('virtual_tryon_seo_view');
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-5">
            <LanguageToggle />
            <Link
              href="/try-on"
              className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-slate-800 transition-colors"
            >
              {pickLang(lang, 'Try Now', 'Probar', 'Essayer', 'Experimentar', 'Jetzt testen', 'Prova ora')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            {pickLang(lang, 'AI Virtual Try-On Technology', 'Tecnologia de Probador Virtual con IA', 'Technologie d’Essayage Virtuel par IA', 'Tecnologia de Provador Virtual com IA', 'KI-Technologie fur virtuelle Anprobe', 'Tecnologia di Camerino Virtuale con AI')}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[0.9]">
            {pickLang(lang, 'Virtual Try On', 'Probador Virtual', 'Essayage Virtuel', 'Provador Virtual', 'Virtuelle Anprobe', 'Camerino Virtuale')}
            <br />
            <span className="italic text-slate-400">{pickLang(lang, 'With AI.', 'Con IA.', 'Avec l’IA.', 'Com IA.', 'Mit KI.', 'Con AI.')}</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            {pickLang(
              lang,
              'See how any clothing looks on your real body before you buy. Upload your photo, choose a garment, and our AI renders a photorealistic preview in seconds. No downloads, no mannequins — just you.',
              'Mira como te queda cualquier prenda en tu cuerpo real antes de comprar. Sube tu foto, elige una prenda y nuestra IA genera una vista previa fotorrealista en segundos. Sin descargas, sin maniquies — solo tu.',
              'Voyez comment n’importe quel vetement vous va sur votre vrai corps avant d’acheter. Telechargez votre photo, choisissez un vetement, et notre IA genere un apercu photorealiste en quelques secondes. Aucun telechargement, aucun mannequin — juste vous.',
              'Veja como qualquer peca de roupa lhe fica no seu corpo real antes de comprar. Carregue a sua foto, escolha uma peca e a nossa IA gera uma pre-visualizacao fotorrealista em segundos. Sem downloads, sem manequins — apenas voce.',
              'Sehen Sie, wie jedes Kleidungsstuck an Ihrem echten Korper aussieht, bevor Sie kaufen. Laden Sie Ihr Foto hoch, wahlen Sie ein Kleidungsstuck, und unsere KI erstellt in Sekunden eine fotorealistische Vorschau. Keine Downloads, keine Schaufensterpuppen — nur Sie.',
              'Scoprite come ogni capo vi sta sul vostro corpo reale prima di acquistare. Caricate la vostra foto, scegliete un capo e la nostra AI genera un’anteprima fotorealistica in pochi secondi. Nessun download, nessun manichino — solo voi.'
            )}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              {pickLang(lang, 'Try On Now — Free', 'Probar Ahora — Gratis', 'Essayer maintenant — Gratuit', 'Experimentar agora — Gratis', 'Jetzt testen — Kostenlos', 'Prova ora — Gratis')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* What is Virtual Try On */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-8">
            {pickLang(lang, 'What Is a Virtual Try On?', 'Que Es un Probador Virtual?', 'Qu’est-ce qu’un Essayage Virtuel ?', 'O que e um Provador Virtual?', 'Was ist eine virtuelle Anprobe?', 'Cos’e un Camerino Virtuale?')}
          </h2>
          <div className="space-y-5 text-slate-500 text-base font-light leading-relaxed">
            <p>
              {pickLang(
                lang,
                'A virtual try on is an AI-powered tool that lets you see how clothing looks on your actual body without physically wearing it. Instead of guessing whether a shirt, jacket, or outfit will suit you, you upload a photo and the AI generates a realistic preview of you wearing the garment.',
                'Un probador virtual es una herramienta con IA que te permite ver como te queda la ropa en tu cuerpo real sin ponertela fisicamente. En vez de adivinar si una camisa, chaqueta o conjunto te quedara bien, subes una foto y la IA genera una vista previa realista de ti usando la prenda.',
                'Un essayage virtuel est un outil base sur l’IA qui vous permet de voir comment un vetement vous va sur votre vrai corps sans l’enfiler. Au lieu de deviner si une chemise, une veste ou une tenue vous ira, vous telechargez une photo et l’IA genere un apercu realiste de vous portant le vetement.',
                'Um provador virtual e uma ferramenta com IA que lhe permite ver como a roupa lhe fica no seu corpo real sem a vestir fisicamente. Em vez de adivinhar se uma camisa, casaco ou conjunto lhe ficara bem, carrega uma foto e a IA gera uma pre-visualizacao realista de si com a peca vestida.',
                'Eine virtuelle Anprobe ist ein KI-gestutztes Werkzeug, mit dem Sie sehen konnen, wie Kleidung an Ihrem echten Korper aussieht, ohne sie tatsachlich zu tragen. Anstatt zu raten, ob ein Hemd, eine Jacke oder ein Outfit Ihnen steht, laden Sie ein Foto hoch und die KI erzeugt eine realistische Vorschau, wie Sie das Kleidungsstuck tragen.',
                'Un camerino virtuale e uno strumento basato sull’AI che vi permette di vedere come un capo vi sta sul vostro corpo reale senza indossarlo fisicamente. Invece di indovinare se una camicia, una giacca o un completo vi stara bene, caricate una foto e l’AI genera un’anteprima realistica di voi che indossate il capo.'
              )}
            </p>
            <p>
              {pickLang(
                lang,
                'Agalaz takes virtual try-on technology further than anyone else. Our Precision Component Engine V7.0 preserves your exact body proportions, skin tone, facial features, and even your pants and shoes — only changing the specific garment you want to try.',
                'Agalaz lleva la tecnologia del probador virtual mas lejos que nadie. Nuestro Motor de Componentes de Precision V7.0 preserva tus proporciones corporales exactas, tono de piel, rasgos faciales, e incluso tus pantalones y zapatos — solo cambiando la prenda especifica que quieres probar.',
                'Agalaz pousse la technologie d’essayage virtuel plus loin que quiconque. Notre Precision Component Engine V7.0 preserve vos proportions corporelles exactes, votre teint, vos traits du visage, et meme votre pantalon et vos chaussures — en ne changeant que le vetement specifique que vous voulez essayer.',
                'A Agalaz leva a tecnologia de provador virtual mais longe do que qualquer outro. O nosso Precision Component Engine V7.0 preserva as suas proporcoes corporais exatas, o tom de pele, os tracos faciais e ate as suas calcas e sapatos — alterando apenas a peca especifica que pretende experimentar.',
                'Agalaz treibt die Technologie der virtuellen Anprobe weiter als alle anderen. Unsere Precision Component Engine V7.0 erhalt Ihre exakten Korperproportionen, Ihren Hautton, Ihre Gesichtszuge und sogar Ihre Hose und Schuhe — und andert nur das jeweilige Kleidungsstuck, das Sie anprobieren mochten.',
                'Agalaz porta la tecnologia del camerino virtuale piu avanti di chiunque altro. Il nostro Precision Component Engine V7.0 preserva le vostre esatte proporzioni corporee, il tono della pelle, i tratti del viso e perfino i vostri pantaloni e scarpe — modificando solo il capo specifico che volete provare.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* How Virtual Try On Works */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-12 text-center">
            {pickLang(lang, 'How Our Virtual Try On Works', 'Como Funciona Nuestro Probador Virtual', 'Comment Fonctionne Notre Essayage Virtuel', 'Como Funciona o Nosso Provador Virtual', 'So Funktioniert Unsere Virtuelle Anprobe', 'Come Funziona il Nostro Camerino Virtuale')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                num: '01',
                title: pickLang(lang, 'Upload Your Face', 'Sube Tu Rostro', 'Telechargez Votre Visage', 'Carregue o Seu Rosto', 'Laden Sie Ihr Gesicht Hoch', 'Caricate il Vostro Volto'),
                desc: pickLang(
                  lang,
                  'Take a selfie or upload any front-facing photo. Our AI maps your facial identity for a seamless result.',
                  'Toma un selfie o sube cualquier foto frontal. Nuestra IA mapea tu identidad facial para un resultado natural.',
                  'Prenez un selfie ou telechargez n’importe quelle photo de face. Notre IA cartographie votre identite faciale pour un resultat naturel.',
                  'Tire uma selfie ou carregue qualquer foto frontal. A nossa IA mapeia a sua identidade facial para um resultado natural.',
                  'Machen Sie ein Selfie oder laden Sie ein Frontalfoto hoch. Unsere KI erfasst Ihre Gesichtsidentitat fur ein nahtloses Ergebnis.',
                  'Scattate un selfie o caricate una qualsiasi foto frontale. La nostra AI mappa la vostra identita facciale per un risultato naturale.'
                ),
              },
              {
                icon: Layers,
                num: '02',
                title: pickLang(lang, 'Add Your Body Photo', 'Anade Tu Foto de Cuerpo', 'Ajoutez Votre Photo de Corps', 'Adicione a Sua Foto de Corpo', 'Fugen Sie Ihr Ganzkorperfoto Hinzu', 'Aggiungete la Vostra Foto a Figura Intera'),
                desc: pickLang(
                  lang,
                  'Upload a full-body photo from head to feet. This becomes the base — your pose, pants, shoes, and background stay unchanged.',
                  'Sube una foto de cuerpo completo de cabeza a pies. Esta sera la base — tu pose, pantalones, zapatos y fondo permanecen intactos.',
                  'Telechargez une photo en pied de la tete aux pieds. Elle devient la base — votre pose, votre pantalon, vos chaussures et l’arriere-plan restent inchanges.',
                  'Carregue uma foto de corpo inteiro, da cabeca aos pes. Esta sera a base — a sua pose, calcas, sapatos e fundo permanecem inalterados.',
                  'Laden Sie ein Ganzkorperfoto von Kopf bis Fuss hoch. Dieses wird zur Basis — Ihre Pose, Hose, Schuhe und der Hintergrund bleiben unverandert.',
                  'Caricate una foto a figura intera dalla testa ai piedi. Questa sara la base — la vostra posa, i pantaloni, le scarpe e lo sfondo restano invariati.'
                ),
              },
              {
                icon: Shirt,
                num: '03',
                title: pickLang(lang, 'Choose Any Garment', 'Elige Cualquier Prenda', 'Choisissez N’importe Quel Vetement', 'Escolha Qualquer Peca', 'Wahlen Sie Ein Beliebiges Kleidungsstuck', 'Scegliete Qualsiasi Capo'),
                desc: pickLang(
                  lang,
                  'Upload a photo of any shirt, jacket, or top you want to try. The AI extracts its color and style, and renders it on your body.',
                  'Sube una foto de cualquier camisa, chaqueta o top que quieras probar. La IA extrae su color y estilo, y lo renderiza en tu cuerpo.',
                  'Telechargez la photo de n’importe quelle chemise, veste ou haut que vous voulez essayer. L’IA extrait sa couleur et son style, et le rend sur votre corps.',
                  'Carregue uma foto de qualquer camisa, casaco ou top que queira experimentar. A IA extrai a cor e o estilo e renderiza-os no seu corpo.',
                  'Laden Sie ein Foto von einem beliebigen Hemd, einer Jacke oder einem Oberteil hoch, das Sie anprobieren mochten. Die KI extrahiert Farbe und Stil und rendert es auf Ihrem Korper.',
                  'Caricate una foto di una qualsiasi camicia, giacca o top che volete provare. L’AI ne estrae il colore e lo stile e lo renderizza sul vostro corpo.'
                ),
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-slate-900 flex items-center justify-center mx-auto mb-5">
                    <Icon size={28} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{pickLang(lang, 'Step', 'Paso', 'Etape', 'Passo', 'Schritt', 'Passo')} {step.num}</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mt-2 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-14">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-700 transition-colors"
            >
              <Sparkles size={16} />
              {pickLang(lang, 'Try Virtual Try On Free', 'Probar Probador Virtual Gratis', 'Essayer l’Essayage Virtuel Gratuitement', 'Experimentar o Provador Virtual Gratis', 'Virtuelle Anprobe Kostenlos Testen', 'Prova il Camerino Virtuale Gratis')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Use Virtual Try On */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-12">
            {pickLang(lang, 'Why Use Virtual Try On Before Buying?', 'Por Que Usar un Probador Virtual Antes de Comprar?', 'Pourquoi Utiliser l’Essayage Virtuel Avant d’Acheter ?', 'Porque Usar um Provador Virtual Antes de Comprar?', 'Warum Virtuelle Anprobe Vor Dem Kauf Nutzen?', 'Perche Usare il Camerino Virtuale Prima di Acquistare?')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: pickLang(lang, 'Reduce Returns by 80%', 'Reduce Devoluciones un 80%', 'Reduisez les Retours de 80 %', 'Reduza Devolucoes em 80%', 'Reduzieren Sie Rucksendungen um 80 %', 'Riducete i Resi dell’80%'),
                desc: pickLang(
                  lang,
                  '30-40% of online clothing purchases are returned. Virtual try-on lets you see the fit before buying, drastically reducing wasted money and time.',
                  'El 30-40% de las compras de ropa online se devuelven. El probador virtual te permite ver el ajuste antes de comprar.',
                  '30 a 40 % des achats de vetements en ligne sont retournes. L’essayage virtuel vous permet de voir la coupe avant d’acheter, reduisant drastiquement la perte d’argent et de temps.',
                  '30-40% das compras de roupa online sao devolvidas. O provador virtual permite-lhe ver o caimento antes de comprar, reduzindo drasticamente o desperdicio de dinheiro e tempo.',
                  '30-40 % der Online-Bekleidungskaufe werden zuruckgesendet. Die virtuelle Anprobe zeigt Ihnen die Passform vor dem Kauf und reduziert verlorenes Geld und verlorene Zeit drastisch.',
                  'Il 30-40% degli acquisti di abbigliamento online viene restituito. Il camerino virtuale vi permette di vedere la vestibilita prima di acquistare, riducendo drasticamente sprechi di denaro e tempo.'
                ),
              },
              {
                icon: Zap,
                title: pickLang(lang, 'Instant Results', 'Resultados Instantaneos', 'Resultats Instantanes', 'Resultados Instantaneos', 'Sofortige Ergebnisse', 'Risultati Istantanei'),
                desc: pickLang(
                  lang,
                  'No waiting for shipping, no dressing room lines. See how any garment looks on you in seconds from your phone.',
                  'Sin esperar envios, sin colas en probadores. Ve como te queda cualquier prenda en segundos desde tu telefono.',
                  'Pas d’attente de livraison, pas de file devant la cabine. Voyez comment n’importe quel vetement vous va en quelques secondes depuis votre telephone.',
                  'Sem esperar pelo envio, sem filas nos provadores. Veja como qualquer peca lhe fica em segundos a partir do seu telemovel.',
                  'Kein Warten auf den Versand, keine Schlangen vor der Umkleide. Sehen Sie in Sekunden auf Ihrem Handy, wie jedes Kleidungsstuck an Ihnen aussieht.',
                  'Niente attese di spedizione, niente code in camerino. Vedete come ogni capo vi sta in pochi secondi dal vostro telefono.'
                ),
              },
              {
                icon: ShieldCheck,
                title: pickLang(lang, 'Your Real Body', 'Tu Cuerpo Real', 'Votre Vrai Corps', 'O Seu Corpo Real', 'Ihr Echter Korper', 'Il Vostro Corpo Reale'),
                desc: pickLang(
                  lang,
                  'Unlike mannequin photos or generic avatars, Agalaz uses your actual body. What you see is what you get.',
                  'A diferencia de fotos en maniquies o avatares genericos, Agalaz usa tu cuerpo real. Lo que ves es lo que obtienes.',
                  'Contrairement aux photos sur mannequin ou aux avatars generiques, Agalaz utilise votre vrai corps. Ce que vous voyez est ce que vous obtenez.',
                  'Ao contrario de fotos em manequins ou avatares genericos, a Agalaz usa o seu corpo real. O que ve e o que recebe.',
                  'Im Gegensatz zu Schaufensterpuppen-Fotos oder generischen Avataren verwendet Agalaz Ihren echten Korper. Was Sie sehen, ist, was Sie bekommen.',
                  'A differenza delle foto su manichino o degli avatar generici, Agalaz usa il vostro corpo reale. Quello che vedete e quello che otterrete.'
                ),
              },
              {
                icon: Sparkles,
                title: pickLang(lang, 'Try Any Color or Style', 'Prueba Cualquier Color o Estilo', 'Essayez N’importe Quelle Couleur ou Style', 'Experimente Qualquer Cor ou Estilo', 'Probieren Sie Jede Farbe Oder Jeden Stil', 'Provate Qualsiasi Colore o Stile'),
                desc: pickLang(
                  lang,
                  'Explore infinite color combinations and styles on your body. Find what truly works for you before spending a single dollar.',
                  'Explora infinitas combinaciones de color y estilos en tu cuerpo. Encuentra lo que realmente te queda antes de gastar un solo peso.',
                  'Explorez une infinite de combinaisons de couleurs et de styles sur votre corps. Trouvez ce qui vous va vraiment avant de depenser un seul euro.',
                  'Explore infinitas combinacoes de cores e estilos no seu corpo. Encontre o que realmente lhe fica bem antes de gastar um unico euro.',
                  'Entdecken Sie unendlich viele Farb- und Stilkombinationen an Ihrem Korper. Finden Sie heraus, was Ihnen wirklich steht, bevor Sie einen einzigen Euro ausgeben.',
                  'Esplorate infinite combinazioni di colori e stili sul vostro corpo. Trovate cio che vi sta davvero bene prima di spendere un solo euro.'
                ),
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <Icon size={24} className="text-indigo-600 mb-4" />
                  <h3 className="font-serif text-lg font-bold text-slate-900 tracking-tight mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Virtual Try On vs Traditional Shopping */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-10">
            {pickLang(lang, 'Virtual Try On vs. Traditional Shopping', 'Probador Virtual vs. Compra Tradicional', 'Essayage Virtuel vs. Shopping Traditionnel', 'Provador Virtual vs. Compras Tradicionais', 'Virtuelle Anprobe vs. Traditionelles Einkaufen', 'Camerino Virtuale vs. Shopping Tradizionale')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 pr-6 text-xs font-black text-slate-400 uppercase tracking-widest"></th>
                  <th className="py-4 px-6 text-xs font-black text-indigo-600 uppercase tracking-widest">{pickLang(lang, 'Virtual Try On', 'Probador Virtual', 'Essayage Virtuel', 'Provador Virtual', 'Virtuelle Anprobe', 'Camerino Virtuale')}</th>
                  <th className="py-4 pl-6 text-xs font-black text-slate-400 uppercase tracking-widest">{pickLang(lang, 'Traditional', 'Tradicional', 'Traditionnel', 'Tradicional', 'Traditionell', 'Tradizionale')}</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-slate-600">
                {[
                  [pickLang(lang, 'See fit before buying', 'Ver ajuste antes de comprar', 'Voir la coupe avant d’acheter', 'Ver o caimento antes de comprar', 'Passform vor dem Kauf sehen', 'Vedere la vestibilita prima di acquistare'), true, false],
                  [pickLang(lang, 'Try from anywhere', 'Probar desde cualquier lugar', 'Essayer de n’importe ou', 'Experimentar a partir de qualquer lugar', 'Von uberall anprobieren', 'Provare da qualsiasi luogo'), true, false],
                  [pickLang(lang, 'Unlimited garments', 'Prendas ilimitadas', 'Vetements illimites', 'Pecas ilimitadas', 'Unbegrenzte Kleidungsstucke', 'Capi illimitati'), true, false],
                  [pickLang(lang, 'Your real body proportions', 'Tus proporciones reales', 'Vos proportions corporelles reelles', 'As suas proporcoes corporais reais', 'Ihre echten Korperproportionen', 'Le vostre proporzioni corporee reali'), true, true],
                  [pickLang(lang, 'Color exploration', 'Explorar colores', 'Exploration des couleurs', 'Exploracao de cores', 'Farb-Erkundung', 'Esplorazione dei colori'), true, false],
                  [pickLang(lang, 'No returns hassle', 'Sin molestias de devolucion', 'Pas de tracas de retours', 'Sem complicacoes de devolucao', 'Kein Arger mit Rucksendungen', 'Nessun fastidio per i resi'), true, false],
                ].map(([label, vto, trad], i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3.5 pr-6 font-bold text-slate-700">{label as string}</td>
                    <td className="py-3.5 px-6">
                      {vto ? <CheckCircle2 size={18} className="text-emerald-500" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-3.5 pl-6">
                      {trad ? <CheckCircle2 size={18} className="text-emerald-500" /> : <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-12 text-center">
            {pickLang(lang, 'Virtual Try On FAQ', 'Preguntas Frecuentes sobre el Probador Virtual', 'FAQ Essayage Virtuel', 'FAQ do Provador Virtual', 'Haufige Fragen zur Virtuellen Anprobe', 'FAQ del Camerino Virtuale')}
          </h2>
          <div className="space-y-4">
            {pickLang<{ q: string; a: string }[]>(
              lang,
              [
                { q: 'Is virtual try on free?', a: 'Yes! Agalaz gives you 2 free virtual try-on renders, no card required. After that, one-time credit packs: Starter $4.99 (10 renders) or Style Pro $9.99 (25 renders, 20% cheaper per render).' },
                { q: 'How accurate is AI virtual try on?', a: 'Agalaz preserves your real body proportions, skin tone, and facial features with photorealistic quality. The AI only changes the specific garment you want to try, keeping everything else pixel-perfect.' },
                { q: 'Can I virtual try on any clothing?', a: 'Yes — shirts, jackets, tops, hoodies, blazers, and more. Upload a photo of any upper-body garment and see how it looks on you.' },
                { q: 'Do I need to download an app for virtual try on?', a: 'No. Agalaz works entirely in your browser on any device — phone, tablet, or desktop. No downloads needed.' },
                { q: 'Is my photo safe with virtual try on?', a: 'Absolutely. Your photos are processed in real-time and never stored on our servers. Privacy is our top priority.' },
                { q: 'Can virtual try on help reduce returns?', a: 'Yes — seeing clothes on your real body before purchasing reduces returns by up to 80%. No more guessing if something will fit.' },
                { q: 'What makes Agalaz different from other virtual try on tools?', a: 'Agalaz uses a proprietary Precision Component Engine that preserves your pants, shoes, background, and body exactly — only changing the garment you select. Most tools alter your entire appearance.' },
              ],
              [
                { q: 'Es gratis el probador virtual?', a: 'Si! Agalaz te da 2 renders de probador virtual gratis, sin tarjeta. Despues, packs one-time: Starter $4,99 (10 renders) o Style Pro $9,99 (25 renders, 20% mas barato por render).' },
                { q: 'Que tan preciso es el probador virtual con IA?', a: 'Agalaz preserva tus proporciones corporales reales, tono de piel y rasgos faciales con calidad fotorrealista. La IA solo cambia la prenda especifica que quieres probar.' },
                { q: 'Puedo probar virtualmente cualquier ropa?', a: 'Si — camisas, chaquetas, tops, sudaderas, blazers y mas. Sube una foto de cualquier prenda superior y mira como te queda.' },
                { q: 'Necesito descargar una app para el probador virtual?', a: 'No. Agalaz funciona completamente en tu navegador en cualquier dispositivo — telefono, tablet o computadora. Sin descargas.' },
                { q: 'Estan seguras mis fotos con el probador virtual?', a: 'Absolutamente. Tus fotos se procesan en tiempo real y nunca se almacenan en nuestros servidores. La privacidad es nuestra maxima prioridad.' },
                { q: 'El probador virtual ayuda a reducir devoluciones?', a: 'Si — ver la ropa en tu cuerpo real antes de comprar reduce las devoluciones hasta un 80%. Sin mas adivinar si algo te quedara.' },
                { q: 'Que hace a Agalaz diferente de otros probadores virtuales?', a: 'Agalaz usa un Motor de Precision propietario que preserva tus pantalones, zapatos, fondo y cuerpo exactamente — solo cambiando la prenda que seleccionas.' },
              ],
              [
                { q: 'L’essayage virtuel est-il gratuit ?', a: 'Oui ! Agalaz vous offre 2 rendus d’essayage virtuel gratuits, sans carte. Ensuite, packs en paiement unique : Starter 4,99 $ (10 rendus) ou Style Pro 9,99 $ (25 rendus, 20 % moins cher par rendu).' },
                { q: 'Quelle est la precision de l’essayage virtuel par IA ?', a: 'Agalaz preserve vos proportions corporelles reelles, votre teint et vos traits du visage avec une qualite photorealiste. L’IA ne change que le vetement specifique que vous voulez essayer, en gardant tout le reste au pixel pres.' },
                { q: 'Puis-je essayer virtuellement n’importe quel vetement ?', a: 'Oui — chemises, vestes, hauts, sweats a capuche, blazers et plus encore. Telechargez la photo de n’importe quel vetement haut et voyez comment il vous va.' },
                { q: 'Dois-je telecharger une application pour l’essayage virtuel ?', a: 'Non. Agalaz fonctionne entierement dans votre navigateur sur tout appareil — telephone, tablette ou ordinateur. Aucun telechargement necessaire.' },
                { q: 'Mes photos sont-elles en securite avec l’essayage virtuel ?', a: 'Absolument. Vos photos sont traitees en temps reel et ne sont jamais stockees sur nos serveurs. La confidentialite est notre priorite absolue.' },
                { q: 'L’essayage virtuel peut-il aider a reduire les retours ?', a: 'Oui — voir les vetements sur votre vrai corps avant l’achat reduit les retours jusqu’a 80 %. Plus besoin de deviner si quelque chose vous ira.' },
                { q: 'Qu’est-ce qui differencie Agalaz des autres outils d’essayage virtuel ?', a: 'Agalaz utilise un Precision Component Engine proprietaire qui preserve exactement votre pantalon, vos chaussures, l’arriere-plan et votre corps — en ne changeant que le vetement que vous selectionnez. La plupart des outils modifient toute votre apparence.' },
              ],
              [
                { q: 'O provador virtual e gratuito?', a: 'Sim! A Agalaz oferece-lhe 2 renderizacoes gratuitas no provador virtual, sem cartao. Depois, packs de pagamento unico: Starter 4,99 $ (10 renders) ou Style Pro 9,99 $ (25 renders, 20% mais barato por render).' },
                { q: 'Quao preciso e o provador virtual com IA?', a: 'A Agalaz preserva as suas proporcoes corporais reais, o tom de pele e os tracos faciais com qualidade fotorrealista. A IA altera apenas a peca especifica que pretende experimentar, mantendo tudo o resto perfeito ao pixel.' },
                { q: 'Posso experimentar virtualmente qualquer peca?', a: 'Sim — camisas, casacos, tops, hoodies, blazers e muito mais. Carregue uma foto de qualquer peca superior e veja como lhe fica.' },
                { q: 'Preciso de descarregar uma app para o provador virtual?', a: 'Nao. A Agalaz funciona inteiramente no seu navegador em qualquer dispositivo — telemovel, tablet ou computador. Sem downloads necessarios.' },
                { q: 'As minhas fotos estao seguras no provador virtual?', a: 'Sem duvida. As suas fotos sao processadas em tempo real e nunca sao armazenadas nos nossos servidores. A privacidade e a nossa principal prioridade.' },
                { q: 'O provador virtual ajuda a reduzir devolucoes?', a: 'Sim — ver a roupa no seu corpo real antes de comprar reduz as devolucoes ate 80%. Sem mais adivinhacoes sobre se algo lhe servira.' },
                { q: 'O que distingue a Agalaz de outras ferramentas de provador virtual?', a: 'A Agalaz usa um Precision Component Engine proprietario que preserva exatamente as suas calcas, sapatos, fundo e corpo — alterando apenas a peca que selecionar. A maioria das ferramentas altera toda a sua aparencia.' },
              ],
              [
                { q: 'Ist die virtuelle Anprobe kostenlos?', a: 'Ja! Agalaz schenkt Ihnen 2 kostenlose Renderings der virtuellen Anprobe, ohne Karte. Danach Einmalzahlungs-Packs: Starter 4,99 $ (10 Renderings) oder Style Pro 9,99 $ (25 Renderings, 20% gunstiger pro Rendering).' },
                { q: 'Wie genau ist die KI-gestutzte virtuelle Anprobe?', a: 'Agalaz erhalt Ihre echten Korperproportionen, Ihren Hautton und Ihre Gesichtszuge in fotorealistischer Qualitat. Die KI andert nur das jeweilige Kleidungsstuck, das Sie anprobieren mochten, und halt alles andere pixelgenau.' },
                { q: 'Kann ich jede Kleidung virtuell anprobieren?', a: 'Ja — Hemden, Jacken, Oberteile, Hoodies, Blazer und mehr. Laden Sie das Foto eines beliebigen Oberkorper-Kleidungsstucks hoch und sehen Sie, wie es an Ihnen aussieht.' },
                { q: 'Muss ich eine App fur die virtuelle Anprobe herunterladen?', a: 'Nein. Agalaz lauft vollstandig in Ihrem Browser auf jedem Gerat — Handy, Tablet oder Desktop. Keine Downloads erforderlich.' },
                { q: 'Sind meine Fotos bei der virtuellen Anprobe sicher?', a: 'Absolut. Ihre Fotos werden in Echtzeit verarbeitet und niemals auf unseren Servern gespeichert. Datenschutz hat oberste Prioritat.' },
                { q: 'Kann die virtuelle Anprobe helfen, Rucksendungen zu reduzieren?', a: 'Ja — Kleidung vor dem Kauf an Ihrem echten Korper zu sehen, reduziert Rucksendungen um bis zu 80 %. Kein Raten mehr, ob etwas passt.' },
                { q: 'Was unterscheidet Agalaz von anderen Tools fur virtuelle Anprobe?', a: 'Agalaz verwendet eine proprietare Precision Component Engine, die Ihre Hose, Schuhe, den Hintergrund und Ihren Korper exakt erhalt — und nur das Kleidungsstuck andert, das Sie auswahlen. Die meisten Tools verandern Ihr gesamtes Erscheinungsbild.' },
              ],
              [
                { q: 'Il camerino virtuale e gratuito?', a: 'Si! Agalaz vi offre 2 rendering gratuiti del camerino virtuale, senza carta. Dopodiche, pack a pagamento unico: Starter 4,99 $ (10 rendering) o Style Pro 9,99 $ (25 rendering, 20% piu economico per rendering).' },
                { q: 'Quanto e accurato il camerino virtuale con AI?', a: 'Agalaz preserva le vostre proporzioni corporee reali, il tono della pelle e i tratti del viso con qualita fotorealistica. L’AI modifica solo il capo specifico che volete provare, mantenendo tutto il resto perfetto al pixel.' },
                { q: 'Posso provare virtualmente qualsiasi capo?', a: 'Si — camicie, giacche, top, felpe, blazer e altro ancora. Caricate la foto di qualsiasi capo per la parte superiore e guardate come vi sta.' },
                { q: 'Devo scaricare un’app per il camerino virtuale?', a: 'No. Agalaz funziona interamente nel vostro browser su qualsiasi dispositivo — telefono, tablet o desktop. Nessun download necessario.' },
                { q: 'Le mie foto sono al sicuro con il camerino virtuale?', a: 'Assolutamente. Le vostre foto vengono elaborate in tempo reale e non vengono mai salvate sui nostri server. La privacy e la nostra massima priorita.' },
                { q: 'Il camerino virtuale aiuta a ridurre i resi?', a: 'Si — vedere i vestiti sul vostro corpo reale prima di acquistare riduce i resi fino all’80%. Niente piu dubbi sulla vestibilita.' },
                { q: 'Cosa rende Agalaz diversa dagli altri strumenti di camerino virtuale?', a: 'Agalaz utilizza un Precision Component Engine proprietario che preserva esattamente i vostri pantaloni, scarpe, sfondo e corpo — modificando solo il capo che selezionate. La maggior parte degli strumenti altera l’intero aspetto.' },
              ]
            )!.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <span className="text-slate-300 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-[0.9] mb-6">
            {pickLang(lang, 'Try Virtual Try On Now.', 'Prueba el Probador Virtual Ahora.', 'Essayez l’Essayage Virtuel Maintenant.', 'Experimente o Provador Virtual Agora.', 'Testen Sie Die Virtuelle Anprobe Jetzt.', 'Provate il Camerino Virtuale Ora.')}
          </h2>
          <p className="text-white/40 text-sm mb-12 max-w-md mx-auto font-light">
            {pickLang(
              lang,
              '2 free renders. No credit card needed. See clothes on your real body in seconds.',
              '2 renders gratis. Sin tarjeta de credito. Ve la ropa en tu cuerpo real en segundos.',
              '2 rendus gratuits. Aucune carte bancaire requise. Voyez les vetements sur votre vrai corps en quelques secondes.',
              '2 renderizacoes gratis. Sem cartao de credito. Veja a roupa no seu corpo real em segundos.',
              '2 kostenlose Renderings. Keine Kreditkarte notig. Sehen Sie Kleidung in Sekunden an Ihrem echten Korper.',
              '2 rendering gratis. Nessuna carta di credito necessaria. Vedete i vestiti sul vostro corpo reale in pochi secondi.'
            )}
          </p>
          <Link
            href="/try-on"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 hover:text-white transition-all"
          >
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
            {pickLang(lang, 'Start Free Virtual Try On', 'Empezar Probador Virtual Gratis', 'Commencer l’Essayage Virtuel Gratuit', 'Comecar Provador Virtual Gratis', 'Kostenlose Virtuelle Anprobe Starten', 'Inizia Camerino Virtuale Gratis')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Related Content - Internal Links */}
      <section className="py-16 md:py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mb-8">
            {pickLang(lang, 'Learn More About Virtual Try On', 'Aprende Mas Sobre el Probador Virtual', 'En Savoir Plus sur l’Essayage Virtuel', 'Saiba Mais Sobre o Provador Virtual', 'Mehr Uber Die Virtuelle Anprobe Erfahren', 'Scoprite di Piu sul Camerino Virtuale')}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: '/blog/best-way-to-try-on-clothes-online-with-ai', title: pickLang(lang, 'Best Way to Try On Clothes Online With AI', 'La Mejor Forma de Probar Ropa Online con IA', 'La Meilleure Facon d’Essayer des Vetements en Ligne avec l’IA', 'A Melhor Forma de Experimentar Roupa Online com IA', 'Der Beste Weg, Kleidung Online Mit KI Anzuprobieren', 'Il Modo Migliore per Provare Vestiti Online con l’AI') },
              { href: '/blog/how-to-know-if-clothes-will-fit-without-trying-them-on', title: pickLang(lang, 'How to Know If Clothes Will Fit', 'Como Saber Si la Ropa Te Quedara', 'Comment Savoir Si les Vetements Vous Iront', 'Como Saber Se a Roupa Lhe Servira', 'So Wissen Sie, Ob Kleidung Passt', 'Come Sapere se i Vestiti Vi Staranno Bene') },
              { href: '/blog/how-to-reduce-online-shopping-returns', title: pickLang(lang, 'How to Reduce Online Shopping Returns', 'Como Reducir Devoluciones de Compras Online', 'Comment Reduire les Retours d’Achats en Ligne', 'Como Reduzir Devolucoes de Compras Online', 'So Reduzieren Sie Rucksendungen Beim Online-Shopping', 'Come Ridurre i Resi degli Acquisti Online') },
              { href: '/blog/why-clothes-look-different-online-vs-in-person', title: pickLang(lang, 'Why Clothes Look Different Online', 'Por Que la Ropa Se Ve Diferente Online', 'Pourquoi les Vetements Sont Differents en Ligne', 'Porque a Roupa Parece Diferente Online', 'Warum Kleidung Online Anders Aussieht', 'Perche i Vestiti Sembrano Diversi Online') },
              { href: '/blog/how-to-dress-for-your-body-type-without-a-stylist', title: pickLang(lang, 'Dress for Your Body Type', 'Viste Para Tu Tipo de Cuerpo', 'Habillez-Vous Selon Votre Morphologie', 'Vista-Se Para o Seu Tipo de Corpo', 'Kleiden Sie Sich Fur Ihren Korpertyp', 'Vestitevi in Base al Vostro Tipo di Corpo') },
              { href: '/blog/online-shopping-mistakes-that-lead-to-returns', title: pickLang(lang, 'Shopping Mistakes That Lead to Returns', 'Errores de Compra Que Causan Devoluciones', 'Erreurs de Shopping Qui Menent aux Retours', 'Erros de Compras Que Levam a Devolucoes', 'Einkaufsfehler, Die Zu Rucksendungen Fuhren', 'Errori di Shopping Che Portano ai Resi') },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                  {link.title}
                </h3>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-2 inline-flex items-center gap-1">
                  {pickLang(lang, 'Read', 'Leer', 'Lire', 'Ler', 'Lesen', 'Leggi')} <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLandingLinks lang={lang} />

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/try-on" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {pickLang(lang, 'Virtual Try On', 'Probador Virtual', 'Essayage Virtuel', 'Provador Virtual', 'Virtuelle Anprobe', 'Camerino Virtuale')}
            </Link>
            <Link href="/blog" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Blog
            </Link>
            <Link href="/privacy" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {pickLang(lang, 'Privacy', 'Privacidad', 'Confidentialite', 'Privacidade', 'Datenschutz', 'Privacy')}
            </Link>
            <Link href="/terms" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {pickLang(lang, 'Terms', 'Terminos', 'Conditions', 'Termos', 'AGB', 'Termini')}
            </Link>
            <a href="mailto:infoagalaz@gmail.com" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {pickLang(lang, 'Contact', 'Contacto', 'Contact', 'Contacto', 'Kontakt', 'Contatto')}
            </a>
          </div>
        </div>
      </footer>

      {/* FAQPage + BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Is virtual try on free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Agalaz gives you 2 free virtual try-on renders, no card required. After that, one-time credit packs: Starter $4.99 (10 renders) or Style Pro $9.99 (25 renders, 20% cheaper per render).' } },
              { '@type': 'Question', name: 'How accurate is AI virtual try on?', acceptedAnswer: { '@type': 'Answer', text: 'Agalaz preserves your real body proportions, skin tone, and facial features with photorealistic quality.' } },
              { '@type': 'Question', name: 'Can I virtual try on any clothing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — shirts, jackets, tops, hoodies, blazers, and more. Upload a photo of any upper-body garment and see how it looks on you.' } },
              { '@type': 'Question', name: 'Do I need to download an app?', acceptedAnswer: { '@type': 'Answer', text: 'No. Agalaz works entirely in your browser on any device — phone, tablet, or desktop.' } },
              { '@type': 'Question', name: 'Is my photo safe?', acceptedAnswer: { '@type': 'Answer', text: 'Your photos are processed in real-time and never stored on our servers.' } },
              { '@type': 'Question', name: 'Can virtual try on reduce returns?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — seeing clothes on your real body before purchasing reduces returns by up to 80%.' } },
              { '@type': 'Question', name: 'What makes Agalaz different?', acceptedAnswer: { '@type': 'Answer', text: 'Agalaz uses a proprietary Precision Component Engine that preserves your pants, shoes, background, and body exactly — only changing the garment you select.' } },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
              { '@type': 'ListItem', position: 2, name: 'Virtual Try On', item: 'https://agalaz.com/virtual-try-on' },
            ],
          }),
        }}
      />
    </main>
  );
}
