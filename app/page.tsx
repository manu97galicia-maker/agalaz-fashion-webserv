import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Star,
  Target,
  Fingerprint,
  Shirt,
  Camera,
  Layers,
  Palette,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Target,
    title: 'Preservación Total',
    desc: 'Tu look original se mantiene intacto. Solo transformamos lo que elijas.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Fingerprint,
    title: 'Tu Imagen, Tu Estilo',
    desc: 'Agalaz respeta tu fisonomía real. Cada prenda se adapta a ti, no al revés.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Palette,
    title: 'Color & Tejido',
    desc: 'Capturamos la esencia de cada prenda — color, textura, caída — y la fusionamos con tu silueta.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
];

const STEPS = [
  {
    num: '01',
    icon: Camera,
    title: 'Tu Selfie',
    desc: 'Una foto de tu rostro para que el resultado sea 100% tú.',
    accent: 'from-indigo-500 to-violet-500',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Tu Outfit Actual',
    desc: 'Foto de cuerpo completo con tu look. Preservamos todo excepto la prenda que quieras cambiar.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    num: '03',
    icon: Shirt,
    title: 'La Prenda Deseada',
    desc: 'Sube la prenda que te gusta de cualquier tienda. Nosotros la ponemos sobre ti.',
    accent: 'from-rose-500 to-pink-500',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
            <span className="text-black font-bold text-xl italic">A</span>
          </div>
          <span className="text-xl font-black text-white tracking-tight">Agalaz</span>
        </div>
        <Link
          href="/try-on"
          className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 transition-colors"
        >
          Empieza Gratis
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 rounded-full w-fit border border-indigo-500/20 mb-8">
            <Sparkles size={12} className="text-indigo-400 fill-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
              Probador Virtual con IA
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            PRUEBA
            <br />
            <span className="text-indigo-400 italic">ANTES DE</span>
            <br />
            COMPRAR.
          </h1>

          <p className="text-lg text-white/50 font-medium leading-relaxed mt-8 max-w-xl">
            Sube tu foto, elige cualquier prenda de cualquier tienda y ve cómo te queda al instante.
            Tu cuerpo real, tu nuevo look.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-xs text-white/40 font-bold">
              +10,000 usuarios activos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/try-on"
              className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-[2rem] hover:bg-white/90 transition-colors"
            >
              <Sparkles size={18} />
              Empieza Gratis
            </Link>
            <Link
              href="/onboarding"
              className="flex items-center justify-center gap-2 px-10 py-5 bg-white/5 border border-white/10 text-white/60 font-bold text-sm rounded-[2rem] hover:bg-white/10 transition-colors"
            >
              Cómo funciona
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Moda que se <span className="text-indigo-400 italic">Adapta a Ti</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">
            Tecnología de composición editorial que respeta cada detalle de tu imagen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <div className={`p-4 ${f.bg} rounded-2xl w-fit mb-6`}>
                <f.icon size={28} className={f.color} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
              <p className="text-white/40 font-medium leading-relaxed text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            3 Pasos. <span className="text-indigo-400 italic">Tu Nuevo Look.</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto">
            Tan fácil como hacerte un selfie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((item, i) => (
            <div key={i} className="relative group">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs font-black text-white/20 tracking-widest">{item.num}</span>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight size={16} className="text-white/10" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/try-on"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-[2rem] hover:bg-white/90 transition-colors"
          >
            <Sparkles size={18} />
            Empieza Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-bold italic text-sm">A</span>
            </div>
            <span className="font-black text-white/60 text-sm">Agalaz</span>
          </div>
          <p className="text-white/20 text-xs">
            &copy; 2025 Agalaz. Probador virtual con IA.
          </p>
        </div>
      </footer>
    </main>
  );
}
