'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Camera, Shirt, Layers, Target, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';

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
              {en ? 'Try Now' : 'Probar'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            {en ? 'AI Virtual Try-On Technology' : 'Tecnologia de Probador Virtual con IA'}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[0.9]">
            {en ? 'Virtual Try On' : 'Probador Virtual'}
            <br />
            <span className="italic text-slate-400">{en ? 'With AI.' : 'Con IA.'}</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            {en
              ? 'See how any clothing looks on your real body before you buy. Upload your photo, choose a garment, and our AI renders a photorealistic preview in seconds. No downloads, no mannequins — just you.'
              : 'Mira como te queda cualquier prenda en tu cuerpo real antes de comprar. Sube tu foto, elige una prenda y nuestra IA genera una vista previa fotorrealista en segundos. Sin descargas, sin maniquies — solo tu.'}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              {en ? 'Try On Now — Free' : 'Probar Ahora — Gratis'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* What is Virtual Try On */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-8">
            {en ? 'What Is a Virtual Try On?' : 'Que Es un Probador Virtual?'}
          </h2>
          <div className="space-y-5 text-slate-500 text-base font-light leading-relaxed">
            <p>
              {en
                ? 'A virtual try on is an AI-powered tool that lets you see how clothing looks on your actual body without physically wearing it. Instead of guessing whether a shirt, jacket, or outfit will suit you, you upload a photo and the AI generates a realistic preview of you wearing the garment.'
                : 'Un probador virtual es una herramienta con IA que te permite ver como te queda la ropa en tu cuerpo real sin ponertela fisicamente. En vez de adivinar si una camisa, chaqueta o conjunto te quedara bien, subes una foto y la IA genera una vista previa realista de ti usando la prenda.'}
            </p>
            <p>
              {en
                ? 'Agalaz takes virtual try-on technology further than anyone else. Our Precision Component Engine V7.0 preserves your exact body proportions, skin tone, facial features, and even your pants and shoes — only changing the specific garment you want to try.'
                : 'Agalaz lleva la tecnologia del probador virtual mas lejos que nadie. Nuestro Motor de Componentes de Precision V7.0 preserva tus proporciones corporales exactas, tono de piel, rasgos faciales, e incluso tus pantalones y zapatos — solo cambiando la prenda especifica que quieres probar.'}
            </p>
          </div>
        </div>
      </section>

      {/* How Virtual Try On Works */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-12 text-center">
            {en ? 'How Our Virtual Try On Works' : 'Como Funciona Nuestro Probador Virtual'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Camera, num: '01', title: en ? 'Upload Your Face' : 'Sube Tu Rostro', desc: en ? 'Take a selfie or upload any front-facing photo. Our AI maps your facial identity for a seamless result.' : 'Toma un selfie o sube cualquier foto frontal. Nuestra IA mapea tu identidad facial para un resultado natural.' },
              { icon: Layers, num: '02', title: en ? 'Add Your Body Photo' : 'Anade Tu Foto de Cuerpo', desc: en ? 'Upload a full-body photo from head to feet. This becomes the base — your pose, pants, shoes, and background stay unchanged.' : 'Sube una foto de cuerpo completo de cabeza a pies. Esta sera la base — tu pose, pantalones, zapatos y fondo permanecen intactos.' },
              { icon: Shirt, num: '03', title: en ? 'Choose Any Garment' : 'Elige Cualquier Prenda', desc: en ? 'Upload a photo of any shirt, jacket, or top you want to try. The AI extracts its color and style, and renders it on your body.' : 'Sube una foto de cualquier camisa, chaqueta o top que quieras probar. La IA extrae su color y estilo, y lo renderiza en tu cuerpo.' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-slate-900 flex items-center justify-center mx-auto mb-5">
                    <Icon size={28} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{en ? 'Step' : 'Paso'} {step.num}</span>
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
              {en ? 'Try Virtual Try On Free' : 'Probar Probador Virtual Gratis'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Use Virtual Try On */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.95] mb-12">
            {en ? 'Why Use Virtual Try On Before Buying?' : 'Por Que Usar un Probador Virtual Antes de Comprar?'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Target, title: en ? 'Reduce Returns by 80%' : 'Reduce Devoluciones un 80%', desc: en ? '30-40% of online clothing purchases are returned. Virtual try-on lets you see the fit before buying, drastically reducing wasted money and time.' : 'El 30-40% de las compras de ropa online se devuelven. El probador virtual te permite ver el ajuste antes de comprar.' },
              { icon: Zap, title: en ? 'Instant Results' : 'Resultados Instantaneos', desc: en ? 'No waiting for shipping, no dressing room lines. See how any garment looks on you in seconds from your phone.' : 'Sin esperar envios, sin colas en probadores. Ve como te queda cualquier prenda en segundos desde tu telefono.' },
              { icon: ShieldCheck, title: en ? 'Your Real Body' : 'Tu Cuerpo Real', desc: en ? 'Unlike mannequin photos or generic avatars, Agalaz uses your actual body. What you see is what you get.' : 'A diferencia de fotos en maniquies o avatares genericos, Agalaz usa tu cuerpo real. Lo que ves es lo que obtienes.' },
              { icon: Sparkles, title: en ? 'Try Any Color or Style' : 'Prueba Cualquier Color o Estilo', desc: en ? 'Explore infinite color combinations and styles on your body. Find what truly works for you before spending a single dollar.' : 'Explora infinitas combinaciones de color y estilos en tu cuerpo. Encuentra lo que realmente te queda antes de gastar un solo peso.' },
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
            {en ? 'Virtual Try On vs. Traditional Shopping' : 'Probador Virtual vs. Compra Tradicional'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 pr-6 text-xs font-black text-slate-400 uppercase tracking-widest"></th>
                  <th className="py-4 px-6 text-xs font-black text-indigo-600 uppercase tracking-widest">{en ? 'Virtual Try On' : 'Probador Virtual'}</th>
                  <th className="py-4 pl-6 text-xs font-black text-slate-400 uppercase tracking-widest">{en ? 'Traditional' : 'Tradicional'}</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-slate-600">
                {[
                  [en ? 'See fit before buying' : 'Ver ajuste antes de comprar', true, false],
                  [en ? 'Try from anywhere' : 'Probar desde cualquier lugar', true, false],
                  [en ? 'Unlimited garments' : 'Prendas ilimitadas', true, false],
                  [en ? 'Your real body proportions' : 'Tus proporciones reales', true, true],
                  [en ? 'Color exploration' : 'Explorar colores', true, false],
                  [en ? 'No returns hassle' : 'Sin molestias de devolucion', true, false],
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
            {en ? 'Virtual Try On FAQ' : 'Preguntas Frecuentes sobre el Probador Virtual'}
          </h2>
          <div className="space-y-4">
            {(en ? [
              { q: 'Is virtual try on free?', a: 'Yes! Agalaz gives you 2 free virtual try-on renders. After that, plans start at $4.99/week for 14 renders.' },
              { q: 'How accurate is AI virtual try on?', a: 'Agalaz preserves your real body proportions, skin tone, and facial features with photorealistic quality. The AI only changes the specific garment you want to try, keeping everything else pixel-perfect.' },
              { q: 'Can I virtual try on any clothing?', a: 'Yes — shirts, jackets, tops, hoodies, blazers, and more. Upload a photo of any upper-body garment and see how it looks on you.' },
              { q: 'Do I need to download an app for virtual try on?', a: 'No. Agalaz works entirely in your browser on any device — phone, tablet, or desktop. No downloads needed.' },
              { q: 'Is my photo safe with virtual try on?', a: 'Absolutely. Your photos are processed in real-time and never stored on our servers. Privacy is our top priority.' },
              { q: 'Can virtual try on help reduce returns?', a: 'Yes — seeing clothes on your real body before purchasing reduces returns by up to 80%. No more guessing if something will fit.' },
              { q: 'What makes Agalaz different from other virtual try on tools?', a: 'Agalaz uses a proprietary Precision Component Engine that preserves your pants, shoes, background, and body exactly — only changing the garment you select. Most tools alter your entire appearance.' },
            ] : [
              { q: 'Es gratis el probador virtual?', a: 'Si! Agalaz te da 2 renders de probador virtual gratis. Despues, los planes empiezan desde $4.99/semana por 14 renders.' },
              { q: 'Que tan preciso es el probador virtual con IA?', a: 'Agalaz preserva tus proporciones corporales reales, tono de piel y rasgos faciales con calidad fotorrealista. La IA solo cambia la prenda especifica que quieres probar.' },
              { q: 'Puedo probar virtualmente cualquier ropa?', a: 'Si — camisas, chaquetas, tops, sudaderas, blazers y mas. Sube una foto de cualquier prenda superior y mira como te queda.' },
              { q: 'Necesito descargar una app para el probador virtual?', a: 'No. Agalaz funciona completamente en tu navegador en cualquier dispositivo — telefono, tablet o computadora. Sin descargas.' },
              { q: 'Estan seguras mis fotos con el probador virtual?', a: 'Absolutamente. Tus fotos se procesan en tiempo real y nunca se almacenan en nuestros servidores. La privacidad es nuestra maxima prioridad.' },
              { q: 'El probador virtual ayuda a reducir devoluciones?', a: 'Si — ver la ropa en tu cuerpo real antes de comprar reduce las devoluciones hasta un 80%. Sin mas adivinar si algo te quedara.' },
              { q: 'Que hace a Agalaz diferente de otros probadores virtuales?', a: 'Agalaz usa un Motor de Precision propietario que preserva tus pantalones, zapatos, fondo y cuerpo exactamente — solo cambiando la prenda que seleccionas.' },
            ]).map((faq, i) => (
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
            {en ? 'Try Virtual Try On Now.' : 'Prueba el Probador Virtual Ahora.'}
          </h2>
          <p className="text-white/40 text-sm mb-12 max-w-md mx-auto font-light">
            {en ? '2 free renders. No credit card needed. See clothes on your real body in seconds.' : '2 renders gratis. Sin tarjeta de credito. Ve la ropa en tu cuerpo real en segundos.'}
          </p>
          <Link
            href="/try-on"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 hover:text-white transition-all"
          >
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
            {en ? 'Start Free Virtual Try On' : 'Empezar Probador Virtual Gratis'}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Related Content - Internal Links */}
      <section className="py-16 md:py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mb-8">
            {en ? 'Learn More About Virtual Try On' : 'Aprende Mas Sobre el Probador Virtual'}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: '/blog/best-way-to-try-on-clothes-online-with-ai', title: en ? 'Best Way to Try On Clothes Online With AI' : 'La Mejor Forma de Probar Ropa Online con IA' },
              { href: '/blog/how-to-know-if-clothes-will-fit-without-trying-them-on', title: en ? 'How to Know If Clothes Will Fit' : 'Como Saber Si la Ropa Te Quedara' },
              { href: '/blog/how-to-reduce-online-shopping-returns', title: en ? 'How to Reduce Online Shopping Returns' : 'Como Reducir Devoluciones de Compras Online' },
              { href: '/blog/why-clothes-look-different-online-vs-in-person', title: en ? 'Why Clothes Look Different Online' : 'Por Que la Ropa Se Ve Diferente Online' },
              { href: '/blog/how-to-dress-for-your-body-type-without-a-stylist', title: en ? 'Dress for Your Body Type' : 'Viste Para Tu Tipo de Cuerpo' },
              { href: '/blog/online-shopping-mistakes-that-lead-to-returns', title: en ? 'Shopping Mistakes That Lead to Returns' : 'Errores de Compra Que Causan Devoluciones' },
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
                  {en ? 'Read' : 'Leer'} <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/try-on" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Virtual Try On' : 'Probador Virtual'}
            </Link>
            <Link href="/blog" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Blog
            </Link>
            <Link href="/privacy" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Privacy' : 'Privacidad'}
            </Link>
            <Link href="/terms" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Terms' : 'Terminos'}
            </Link>
            <a href="mailto:infoagalaz@gmail.com" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Contact' : 'Contacto'}
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
              { '@type': 'Question', name: 'Is virtual try on free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Agalaz gives you 2 free virtual try-on renders. After that, plans start at $4.99/week for 14 renders.' } },
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
