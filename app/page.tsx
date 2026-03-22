'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  Layers,
  Shirt,
  ShieldCheck,
  Zap,
  Sparkles,
  Target,
  Palette,
  Ruler,
  User,
  Store,
  TrendingDown,
  TrendingUp,
  Code2,
  Glasses,
  Gem,
  Crown,
  Footprints,
  ShoppingBag,
  Pen,
  Hand,
  Menu,
  X,
} from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';

const STEP_ICONS = [Camera, Layers, Shirt];
const FEATURE_ICONS = [ShieldCheck, Target, Zap];
const CAPABILITY_ICONS = [Shirt, Glasses, Gem, Crown, Footprints, ShoppingBag, Pen, Hand];

const COLOR_SWATCHES = [
  { color: 'bg-red-500', ring: 'ring-red-500' },
  { color: 'bg-blue-900', ring: 'ring-blue-900' },
  { color: 'bg-emerald-600', ring: 'ring-emerald-600' },
  { color: 'bg-black', ring: 'ring-black' },
];

const landingText = {
  en: {
    badge: 'The #1 AI Virtual Fitting Room',
    strip: ['Any Garment', 'Any Color', 'Your Real Body', 'Instant Preview'],
    colorExplorer: {
      label: 'Color Explorer',
      title: 'Every Color,',
      titleHighlight: 'Your Body.',
      subtitle: 'See how your clothes look in different colors — on your actual body, not a mannequin.',
      colors: ['Red', 'Navy', 'Emerald', 'Black'],
      cta: 'Explore Colors',
    },
    capabilities: {
      label: 'What You Can Try On',
      title: 'Not Just',
      titleHighlight: 'Clothing.',
      items: [
        { title: 'Clothing', desc: 'Shirts, dresses, pants, jackets, coats, skirts, sweaters, hoodies — any garment, any style.' },
        { title: 'Glasses', desc: 'Sunglasses, prescription frames, goggles — see how they look on your face before buying.' },
        { title: 'Jewelry', desc: 'Necklaces, earrings, bracelets, rings, watches — placed on the correct body part automatically.' },
        { title: 'Headwear', desc: 'Hats, caps, beanies, headbands — see how they fit with your face and hair.' },
        { title: 'Shoes', desc: 'Sneakers, heels, boots, sandals — see them on your feet with realistic shadows.' },
        { title: 'Bags', desc: 'Handbags, backpacks, clutches, totes — held or worn naturally on your body.' },
        { title: 'Tattoos', desc: 'Try any tattoo design on your skin — follows your body contours and muscle definition.' },
        { title: 'Nail Art', desc: 'Manicure styles, nail polish colors — preview any nail design on your actual hands.' },
      ],
    },
    tryBefore: {
      label: 'How It Works',
      title: '1 Photo.',
      titleHighlight: '1 Render.',
      subtitle: 'Upload a photo of yourself — selfie, half body or full body. Add a garment optionally. Our AI does the rest.',
      steps: [
        { num: '01', title: 'Your Photo', desc: 'Upload any photo of yourself — selfie, half body, or full body. One photo is all you need.' },
        { num: '02', title: 'Your Garment', desc: 'Optionally upload a photo of the garment or accessory you want to try on.' },
        { num: '03', title: 'AI Render', desc: 'Our AI generates a photorealistic image of you wearing the garment in under 60 seconds.' },
      ],
    },
    features: {
      label: 'Technology',
      title: 'Surgical',
      titleHighlight: 'Precision',
      subtitle: 'Component Engine V7.0 — every pixel preserved, every garment respected.',
      items: [
        { title: 'Total Preservation', desc: 'Your pants, shoes and original background stay untouched. We only change what you ask.' },
        { title: 'Real Face Mapping', desc: 'Agalaz integrates your identity onto your real body, respecting your features and neckline.' },
        { title: 'Color & Style', desc: 'We extract the DNA of the new garment and adapt it to your silhouette without distortion.' },
      ],
    },
    stats: { users: 'Users', perRender: 'Per Render', precision: 'Precision' },
    partners: {
      label: 'For Online Stores',
      title: 'Reduce Returns.',
      titleHighlight: 'Boost Sales.',
      subtitle: 'Add AI virtual try-on to your store. Your customers try before they buy — fewer returns, higher conversion.',
      cta: 'Become a Partner',
      setup: 'Setup fee',
      month: '/mo',
      renders: 'renders/mo',
      extraRender: '/extra render',
      popular: 'Most Popular',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Mid-size Store', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Large Retailer', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'Real ROI by store size',
      savingsLabel: 'Saved in returns',
      extraSalesLabel: 'Extra revenue',
      totalLabel: 'Total monthly value',
      roiLabel: 'ROI',
      docs: 'See installation guide',
    },
    cta: { title: 'Try It Now.', subtitle: 'Upload your photos and see the result in seconds.', button: 'Start Now' },
    footer: { privacy: 'Privacy', terms: 'Terms', contact: 'Contact', copyright: '© 2025 Agalaz Labs. Precision Engine V7.0' },
  },
  es: {
    badge: 'El Mejor Probador Virtual de Ropa con IA',
    strip: ['Cualquier Prenda', 'Cualquier Color', 'Tu Cuerpo Real', 'Vista Previa Instantánea'],
    colorExplorer: {
      label: 'Explorador de Color',
      title: 'Cada Color,',
      titleHighlight: 'Tu Cuerpo.',
      subtitle: 'Mira cómo tu ropa se ve en diferentes colores — en tu cuerpo real, no en un maniquí.',
      colors: ['Rojo', 'Marino', 'Esmeralda', 'Negro'],
      cta: 'Explorar Colores',
    },
    capabilities: {
      label: 'Qué Puedes Probar',
      title: 'No Solo',
      titleHighlight: 'Ropa.',
      items: [
        { title: 'Ropa', desc: 'Camisetas, vestidos, pantalones, chaquetas, abrigos, faldas, sudaderas — cualquier prenda, cualquier estilo.' },
        { title: 'Gafas', desc: 'Gafas de sol, monturas graduadas, gafas deportivas — ve cómo quedan en tu cara antes de comprar.' },
        { title: 'Joyería', desc: 'Collares, pendientes, pulseras, anillos, relojes — colocados automáticamente en la parte correcta del cuerpo.' },
        { title: 'Sombreros', desc: 'Gorras, gorros, diademas, turbantes — ve cómo combinan con tu cara y pelo.' },
        { title: 'Zapatos', desc: 'Zapatillas, tacones, botas, sandalias — pruébalos con sombras realistas.' },
        { title: 'Bolsos', desc: 'Bolsos de mano, mochilas, clutches, totes — llevados de forma natural en tu cuerpo.' },
        { title: 'Tatuajes', desc: 'Prueba cualquier diseño de tatuaje en tu piel — sigue los contornos de tu cuerpo.' },
        { title: 'Uñas', desc: 'Estilos de manicura, colores de esmalte — previsualiza cualquier diseño en tus manos.' },
      ],
    },
    tryBefore: {
      label: 'Cómo Funciona',
      title: '1 Foto.',
      titleHighlight: '1 Render.',
      subtitle: 'Sube una foto tuya — selfie, medio cuerpo o cuerpo entero. Añade una prenda opcionalmente. Nuestra IA hace el resto.',
      steps: [
        { num: '01', title: 'Tu Foto', desc: 'Sube cualquier foto tuya — selfie, medio cuerpo o cuerpo entero. Una foto es todo lo que necesitas.' },
        { num: '02', title: 'Tu Prenda', desc: 'Opcionalmente sube una foto de la prenda o accesorio que quieras probarte.' },
        { num: '03', title: 'Render IA', desc: 'Nuestra IA genera una imagen fotorrealista de ti con la prenda en menos de 60 segundos.' },
      ],
    },
    features: {
      label: 'Tecnología',
      title: 'Precisión',
      titleHighlight: 'Quirúrgica',
      subtitle: 'Motor de componentes V7.0 — cada píxel preservado, cada prenda respetada.',
      items: [
        { title: 'Preservación Total', desc: 'Tus pantalones, calzado y fondo original se mantienen intactos. Solo cambiamos lo que pidas.' },
        { title: 'Mapeo Facial Real', desc: 'Agalaz integra tu identidad sobre tu cuerpo real, respetando tu fisonomía y cuello.' },
        { title: 'Color & Estilo', desc: 'Extraemos el ADN de la prenda nueva y lo adaptamos a tu silueta sin deformaciones.' },
      ],
    },
    stats: { users: 'Usuarios', perRender: 'Por Render', precision: 'Precisión' },
    partners: {
      label: 'Para Tiendas Online',
      title: 'Menos Devoluciones.',
      titleHighlight: 'Más Ventas.',
      subtitle: 'Añade prueba virtual con IA a tu tienda. Tus clientes se prueban la ropa antes de comprar — menos devoluciones, más conversión.',
      cta: 'Hazte Partner',
      setup: 'Alta',
      month: '/mes',
      renders: 'renders/mes',
      extraRender: '/render extra',
      popular: 'Más Popular',
      cases: [
        { name: 'Boutique', orders: 300, ticket: 35, returns: '25%', savings: 315, extraSales: 787, total: 1102, plan: 'Starter', planCost: 150 },
        { name: 'Tienda Mediana', orders: 800, ticket: 55, returns: '28%', savings: 1232, extraSales: 2640, total: 3872, plan: 'Growth', planCost: 499 },
        { name: 'Gran Retailer', orders: 3000, ticket: 70, returns: '30%', savings: 6300, extraSales: 10500, total: 16800, plan: 'Growth', planCost: 499 },
      ],
      casesTitle: 'ROI real según tamaño de tienda',
      savingsLabel: 'Ahorro en devoluciones',
      extraSalesLabel: 'Ventas extra',
      totalLabel: 'Valor mensual total',
      roiLabel: 'ROI',
      docs: 'Ver guía de instalación',
    },
    cta: { title: 'Pruébalo Ahora.', subtitle: 'Sube tus fotos y ve el resultado en segundos.', button: 'Empezar Ahora' },
    footer: { privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto', copyright: '© 2025 Agalaz Labs. Motor de Precisión V7.0' },
  },
} as const;

export default function HomePage() {
  const { lang, t } = useLang();
  const lt = landingText[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (window as any).datafast?.('landing_view');
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            AGALAZ
          </Link>
          <div className="flex items-center gap-5">
            {/* Desktop links */}
            <Link
              href="/partners"
              className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors hidden md:block"
            >
              Partners
            </Link>
            <LanguageToggle />
            <Link
              href="/try-on"
              className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-slate-800 transition-colors"
            >
              {t.tryNow}
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {menuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-1 animate-fade-in">
            <Link
              href="/partners"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Partners</span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {lang === 'es' ? 'Para tiendas online — reduce devoluciones, aumenta ventas' : 'For online stores — reduce returns, boost sales'}
              </p>
            </Link>
            <Link
              href="/partners#faq"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">FAQ</span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
              </p>
            </Link>
            <Link
              href="/partners#contact"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">
                {lang === 'es' ? 'Contacto' : 'Contact'}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">partners@agalaz.com</p>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8 animate-fade-in">
              {lt.badge}
            </span>

            <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-slate-900 leading-[0.85] tracking-tight animate-fade-in">
              <span className="font-black">{t.heroLine1}</span>
              <br />
              <span className="italic font-normal text-slate-400">{t.heroLine2}</span>
              <br />
              <span className="font-black">{t.heroLine3}</span>
            </h1>

            <p className="text-slate-500 text-sm md:text-base mt-8 max-w-xl mx-auto font-light leading-relaxed animate-fade-in-delay">
              {t.heroDesc}
            </p>

            <div className="mt-10 animate-fade-in-delay">
              <Link
                href="/try-on"
                data-fast-goal="hero_cta_click"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all"
              >
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                {t.tryNow}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Strip */}
        <div className="relative border-y border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
            {lt.strip.map((item, i) => (
              <div
                key={i}
                className={`py-4 px-6 text-center ${i < 3 ? 'border-r border-slate-200' : ''} ${i < 2 ? 'border-b md:border-b-0 border-slate-200' : i === 2 ? 'border-b md:border-b-0 border-slate-200' : ''}`}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Explorer */}
      <section className="py-24 md:py-32 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
              {lt.colorExplorer.label}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[0.9]">
              {lt.colorExplorer.title}{' '}
              <span className="italic text-slate-400">{lt.colorExplorer.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              {lt.colorExplorer.subtitle}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Before → Garment → After real transformation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              {/* Before */}
              <div className="group text-center">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-slate-200 relative shadow-sm group-hover:shadow-lg transition-all bg-slate-100">
                  <img src="/images/before.png" alt={lang === 'es' ? 'Foto original' : 'Original photo'} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {lang === 'es' ? 'Tu foto' : 'Your photo'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow + Garment */}
              <div className="flex flex-col items-center gap-4">
                <div className="hidden md:flex items-center gap-3 text-slate-300">
                  <div className="w-12 h-[2px] bg-slate-200" />
                  <Sparkles size={20} className="text-indigo-500 animate-pulse" />
                  <div className="w-12 h-[2px] bg-slate-200" />
                </div>
                <div className="aspect-square w-40 md:w-48 rounded-2xl overflow-hidden border-2 border-indigo-200 bg-white shadow-md relative">
                  <img src="/images/garment.jpg" alt={lang === 'es' ? 'Prenda' : 'Garment'} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600/90 backdrop-blur-sm rounded-full">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white">
                      {lang === 'es' ? 'Prenda' : 'Garment'}
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-3 text-slate-300">
                  <div className="w-12 h-[2px] bg-slate-200" />
                  <ArrowRight size={20} className="text-indigo-500" />
                  <div className="w-12 h-[2px] bg-slate-200" />
                </div>
                <div className="md:hidden flex items-center gap-3 text-slate-300 my-2">
                  <ArrowRight size={20} className="text-indigo-500 rotate-90" />
                </div>
              </div>

              {/* After */}
              <div className="group text-center">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-indigo-300 relative shadow-lg group-hover:shadow-xl transition-all ring-4 ring-indigo-100 bg-indigo-50">
                  <img src="/images/after.png" alt="AI try-on result" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-600/90 backdrop-blur-sm rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">
                      AI Result
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color swatches hint */}
            <div className="flex items-center justify-center gap-3 mt-10">
              {COLOR_SWATCHES.map((swatch, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${swatch.color} ring-2 ring-offset-2 ring-slate-200 cursor-pointer transition-all hover:scale-110`} />
              ))}
              <span className="ml-3 text-slate-400 text-xs font-light">+ &infin;</span>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-700 transition-colors"
            >
              <Palette size={16} className="group-hover:rotate-12 transition-transform" />
              {lt.colorExplorer.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">
              {lt.capabilities.label}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[0.9]">
              {lt.capabilities.title}{' '}
              <span className="italic text-slate-400">{lt.capabilities.titleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {lt.capabilities.items.map((item, i) => {
              const Icon = CAPABILITY_ICONS[i] || Sparkles;
              return (
                <div key={i} className="group p-5 md:p-6 border border-slate-200 hover:border-indigo-300 transition-colors hover:shadow-lg hover:shadow-indigo-50 bg-white rounded-xl">
                  <div className="w-10 h-10 bg-slate-900 group-hover:bg-indigo-600 transition-colors flex items-center justify-center mb-4 rounded-lg">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Transformations Gallery */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
              {lang === 'es' ? 'Transformaciones Reales' : 'Real Transformations'}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[0.9]">
              {lang === 'es' ? 'Antes.' : 'Before.'}{' '}
              <span className="italic text-slate-400">{lang === 'es' ? 'Después.' : 'After.'}</span>
            </h2>
            <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              {lang === 'es'
                ? 'Resultados reales de nuestro motor de IA. Misma persona, nueva prenda — en segundos.'
                : 'Real results from our AI engine. Same person, new garment — in seconds.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Transformation 1: Sweatshirt swap */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-100 group">
                <div className="aspect-[3/4] bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Shirt size={32} className="text-indigo-600 mx-auto mb-3" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'es' ? 'Sudadera gris' : 'Gray sweatshirt'}
                    </p>
                    <p className="text-[9px] text-slate-300 mt-1">
                      {lang === 'es' ? 'Reemplazó blazer + jersey' : 'Replaced blazer + sweater'}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  <span className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                    {lang === 'es' ? 'Ropa' : 'Clothing'}
                  </span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 text-center">
                {lang === 'es' ? 'Blazer → Sudadera gris' : 'Blazer → Gray sweatshirt'}
              </p>
            </div>

            {/* Transformation 2: Glasses */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-200 group">
                <div className="aspect-[3/4] bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600 mx-auto mb-3">
                      <circle cx="6" cy="12" r="4" /><circle cx="18" cy="12" r="4" /><path d="M10 12h4" /><path d="M2 12h0" /><path d="M22 12h0" />
                    </svg>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'es' ? 'Gafas graduadas' : 'Prescription glasses'}
                    </p>
                    <p className="text-[9px] text-slate-300 mt-1">
                      {lang === 'es' ? 'Añadidas a foto sin gafas' : 'Added to photo without glasses'}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  <span className="bg-indigo-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                    {lang === 'es' ? 'Accesorios' : 'Accessories'}
                  </span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 text-center">
                {lang === 'es' ? 'Sin gafas → Gafas graduadas' : 'No glasses → Prescription glasses'}
              </p>
            </div>

            {/* Transformation 3: Sunglasses → regular glasses */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-100 group">
                <div className="aspect-[3/4] bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Camera size={32} className="text-indigo-600 mx-auto mb-3" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'es' ? 'Cambio completo' : 'Full swap'}
                    </p>
                    <p className="text-[9px] text-slate-300 mt-1">
                      {lang === 'es' ? 'Prenda + accesorios' : 'Garment + accessories'}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  <span className="bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                    {lang === 'es' ? 'Completo' : 'Full look'}
                  </span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 text-center">
                {lang === 'es' ? 'Gafas de sol → Gafas de ver' : 'Sunglasses → Prescription glasses'}
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link
              href="/try-on"
              data-fast-goal="transformations_cta_click"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              {lang === 'es' ? 'Pruébalo Gratis' : 'Try It Free'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] text-slate-300 mt-3 font-bold">
              {lang === 'es' ? 'Incluye prueba gratuita · Sin tarjeta de crédito' : 'Includes free trial · No credit card required'}
            </p>
          </div>
        </div>
      </section>

      {/* Try Before You Buy — step by step */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
              {lt.tryBefore.label}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[0.9]">
              {lt.tryBefore.title}{' '}
              <span className="italic text-slate-400">{lt.tryBefore.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              {lt.tryBefore.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {lt.tryBefore.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={i} className="group relative">
                  <div className="p-8 md:p-10 border border-slate-200 hover:border-slate-300 transition-colors bg-white hover:shadow-lg hover:shadow-slate-100">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-slate-900 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="font-serif text-5xl font-black text-slate-100 italic">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full items-center justify-center border border-slate-200 shadow-sm">
                      <ArrowRight size={12} className="text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              {t.tryNow}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">
              {lt.features.label}
            </span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[0.9]">
              {lt.features.title}{' '}
              <span className="italic text-slate-400">{lt.features.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-6 max-w-md mx-auto text-sm font-light">
              {lt.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lt.features.items.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={i} className="p-8 md:p-10 bg-slate-50 border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-shadow">
                  <div className="w-12 h-12 bg-indigo-600 flex items-center justify-center mb-8">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners / B2B Section */}
      <section id="partners" className="py-24 md:py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
              <Store size={14} className="inline mr-2 -mt-0.5" />
              {lt.partners.label}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight leading-[0.9]">
              {lt.partners.title}{' '}
              <span className="italic text-slate-400">{lt.partners.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              {lt.partners.subtitle}
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
            {/* Starter */}
            <div className="p-8 border-2 border-slate-200 rounded-2xl hover:border-slate-300 transition-all">
              <h3 className="font-black text-slate-900 text-lg">Starter</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl font-black text-slate-900">150</span>
                <span className="text-slate-400 text-sm font-bold">&euro;{lt.partners.month}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">+ 250&euro; {lt.partners.setup}</p>
              <ul className="mt-6 space-y-2.5">
                {['200 ' + lt.partners.renders, 'Widget personalizable', lang === 'es' ? 'Soporte por email' : 'Email support', 'Dashboard', '0,63\u20AC' + lt.partners.extraRender].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/partners" className="block mt-6 w-full py-3 bg-slate-100 text-slate-600 rounded-xl text-center text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
                {lt.partners.cta}
              </Link>
            </div>

            {/* Growth */}
            <div className="relative p-8 border-2 border-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                {lt.partners.popular}
              </div>
              <h3 className="font-black text-slate-900 text-lg">Growth</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl font-black text-slate-900">499</span>
                <span className="text-slate-400 text-sm font-bold">&euro;{lt.partners.month}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">+ 499&euro; {lt.partners.setup}</p>
              <ul className="mt-6 space-y-2.5">
                {['1.000 ' + lt.partners.renders, 'Widget personalizable', lang === 'es' ? 'Soporte prioritario' : 'Priority support', 'Dashboard + analytics', 'Onboarding call', '0,50\u20AC' + lt.partners.extraRender].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/partners" className="block mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl text-center text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors">
                {lt.partners.cta}
              </Link>
            </div>
          </div>

          {/* ROI Examples */}
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center mb-10">
              {lt.partners.casesTitle}
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {lt.partners.cases.map((c, i) => (
                <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 hover:shadow-lg hover:shadow-slate-100 transition-all">
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {c.orders} {lang === 'es' ? 'pedidos/mes' : 'orders/mo'} &middot; {c.ticket}&euro; ticket &middot; {c.returns} {lang === 'es' ? 'devoluciones' : 'returns'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <TrendingDown size={12} className="text-emerald-500" />
                        {lt.partners.savingsLabel}
                      </span>
                      <span className="text-xs font-black text-emerald-600">+{c.savings}&euro;</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <TrendingUp size={12} className="text-indigo-500" />
                        {lt.partners.extraSalesLabel}
                      </span>
                      <span className="text-xs font-black text-indigo-600">+{c.extraSales.toLocaleString()}&euro;</span>
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-700">{lt.partners.totalLabel}</span>
                      <span className="text-sm font-black text-slate-900">+{c.total.toLocaleString()}&euro;</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                    <span className="text-[10px] text-emerald-600 font-bold">
                      {c.plan} ({c.planCost}&euro;{lt.partners.month}) &rarr;{' '}
                    </span>
                    <span className="text-sm font-black text-emerald-700">
                      {lt.partners.roiLabel} {Math.round(c.total / c.planCost)}x
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 space-y-3">
              <Link
                href="/partners"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
              >
                <Store size={16} className="group-hover:scale-110 transition-transform" />
                {lt.partners.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div>
                <Link
                  href="/partners/docs"
                  className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                >
                  {lt.partners.docs} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[0.9] mb-6">
            {lt.cta.title}
          </h2>
          <p className="text-white/40 text-sm mb-12 max-w-md mx-auto font-light">
            {lt.cta.subtitle}
          </p>
          <Link
            href="/try-on"
            data-fast-goal="footer_cta_click"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 hover:text-white transition-all"
          >
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
            {lt.cta.button}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-[0.9] mb-12 text-center">
            {lang === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
          </h2>
          <div className="space-y-6">
            {(lang === 'es' ? [
              { q: 'Es gratis?', a: 'Tienes 2 renders gratis para probar. Después puedes elegir un plan semanal ($4.99) o anual ($59.99).' },
              { q: 'Cómo funciona el plan anual?', a: 'Al suscribirte al plan anual tienes un día de prueba gratuita. Si no cancelas antes, se cobra $59.99/año. Recibes 14 renders por semana.' },
              { q: 'Cómo cancelo mi suscripción?', a: 'Desde tu perfil (icono de tu foto arriba a la izquierda) verás el botón "Gestionar suscripción". Ahí puedes cancelar al instante. No hay permanencia ni penalización. Tu acceso continúa hasta el final del periodo ya pagado.' },
              { q: 'Si cancelo, pierdo mis datos?', a: 'No. Tu cuenta, tu historial de renders y tu galería se mantienen intactos. Si vuelves a suscribirte, todo sigue donde lo dejaste.' },
              { q: 'Qué pasa con mis fotos?', a: 'Tus fotos se procesan en tiempo real y no se almacenan en nuestros servidores. Tu privacidad es nuestra prioridad.' },
              { q: 'Cuántos renders tengo por semana?', a: 'Los suscriptores tienen 14 renders por semana que se renuevan automáticamente.' },
            ] : [
              { q: 'Is it free?', a: 'You get 2 free renders to try. After that you can choose a weekly ($4.99) or yearly ($59.99) plan.' },
              { q: 'How does the yearly plan work?', a: 'The yearly plan includes a 1-day free trial. If you don\'t cancel, you\'re charged $59.99/year. You get 14 renders per week.' },
              { q: 'How do I cancel my subscription?', a: 'Go to your profile (tap your photo icon in the top left) and click "Manage Subscription". You can cancel instantly. No lock-in, no penalties. Your access continues until the end of your current paid period.' },
              { q: 'If I cancel, do I lose my data?', a: 'No. Your account, render history, and gallery remain intact. If you resubscribe later, everything is right where you left it.' },
              { q: 'What happens with my photos?', a: 'Your photos are processed in real time and are not stored on our servers. Your privacy is our priority.' },
              { q: 'How many renders do I get per week?', a: 'Subscribers get 14 renders per week that renew automatically.' },
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

      {/* Internal Links Section */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mb-8">
            {lang === 'es' ? 'Recursos de Moda con IA' : 'AI Fashion Resources'}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/virtual-try-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Probador Virtual con IA' : 'AI Virtual Try On'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Ve como te queda la ropa' : 'See how clothes look on you'}</p>
            </Link>
            <Link href="/blog/best-way-to-try-on-clothes-online-with-ai" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Probar Ropa Online con IA' : 'Try On Clothes Online With AI'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Guia completa' : 'Complete guide'}</p>
            </Link>
            <Link href="/blog/how-to-reduce-online-shopping-returns" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Reducir Devoluciones' : 'Reduce Shopping Returns'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Ahorra dinero y tiempo' : 'Save money and time'}</p>
            </Link>
            <Link href="/blog/how-to-know-if-clothes-will-fit-without-trying-them-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Saber Si la Ropa Te Queda' : 'Know If Clothes Will Fit'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? '7 metodos probados' : '7 proven methods'}</p>
            </Link>
            <Link href="/blog/how-to-get-accurate-body-measurements-for-virtual-try-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Medidas para Probador Virtual' : 'Body Measurements for Try-On'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Guía profesional' : 'Pro guide'}</p>
            </Link>
            <Link href="/blog/best-free-virtual-dressing-room-apps-android-ios-2026" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Mejores Apps Probador Virtual 2026' : 'Best Virtual Dressing Room Apps 2026'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Android vs iOS' : 'Android vs iOS'}</p>
            </Link>
            <Link href="/blog/virtual-try-on-office-siren-aesthetic-glasses" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Gafas Office Siren — Prueba Virtual' : 'Office Siren Glasses — Virtual Try-On'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Encuentra tu montura perfecta' : 'Find your perfect frame'}</p>
            </Link>
            <Link href="/blog/best-glasses-colors-deep-autumn-skin-tone" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Colores de Gafas para Otoño Profundo' : 'Glasses Colors for Deep Autumn'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Análisis de color + IA' : 'Color analysis + AI'}</p>
            </Link>
            <Link href="/blog/free-ai-glasses-stylist-diamond-face-shape" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Estilista IA para Cara Diamante' : 'AI Glasses Stylist — Diamond Face'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Monturas que te favorecen' : 'Frames that flatter you'}</p>
            </Link>
            <Link href="/blog/virtual-try-on-glasses-hide-dark-circles" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Gafas para Ocultar Ojeras' : 'Glasses That Hide Dark Circles'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Prueba virtual + guía' : 'Virtual try-on + guide'}</p>
            </Link>
            <Link href="/blog/coquette-aesthetic-spring-nails-virtual-try-on" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Uñas Coquette Primavera' : 'Coquette Spring Nails Try-On'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Lazos, perlas y rosa suave' : 'Bows, pearls & soft pink'}</p>
            </Link>
            <Link href="/blog/short-almond-spring-nails-clean-girl-look" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Uñas Almendra Clean Girl' : 'Clean Girl Almond Nails'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Guía minimal + prueba virtual' : 'Minimal guide + virtual try-on'}</p>
            </Link>
            <Link href="/blog/pastel-chrome-nails-2026-futuristic-spring-trend" className="group p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'es' ? 'Uñas Chrome Pastel 2026' : 'Pastel Chrome Nails 2026'}
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">{lang === 'es' ? 'Tendencia futurista' : 'Futuristic spring trend'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </span>
          <div className="flex items-center gap-6">
            <Link href="/virtual-try-on" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Virtual Try On
            </Link>
            <Link href="/blog" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Blog
            </Link>
            <Link href="/partners" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Partners
            </Link>
            <Link href="/privacy" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {lt.footer.privacy}
            </Link>
            <Link href="/terms" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {lt.footer.terms}
            </Link>
            <a href="mailto:infoagalaz@gmail.com" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {lt.footer.contact}
            </a>
          </div>
        </div>
        <p className="text-slate-300 text-[11px] font-light text-center">
          {lt.footer.copyright} — infoagalaz@gmail.com
        </p>
      </footer>

      {/* FAQPage JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": (lang === 'es' ? [
              { q: '¿Es gratis?', a: 'Tienes 2 renders gratis para probar. Después puedes elegir un plan semanal ($4.99) o anual ($59.99).' },
              { q: '¿Cómo funciona el plan anual?', a: 'Al suscribirte al plan anual tienes un día de prueba gratuita. Si no cancelas antes, se cobra $59.99/año. Recibes 14 renders por semana.' },
              { q: '¿Cómo cancelo mi suscripción?', a: 'Desde tu perfil verás el botón "Gestionar suscripción". Ahí puedes cancelar al instante. No hay permanencia ni penalización. Tu acceso continúa hasta el final del periodo ya pagado.' },
              { q: '¿Si cancelo, pierdo mis datos?', a: 'No. Tu cuenta, tu historial de renders y tu galería se mantienen intactos. Si vuelves a suscribirte, todo sigue donde lo dejaste.' },
              { q: '¿Qué pasa con mis fotos?', a: 'Tus fotos se procesan en tiempo real y no se almacenan en nuestros servidores. Tu privacidad es nuestra prioridad.' },
              { q: '¿Cuántos renders tengo por semana?', a: 'Los suscriptores tienen 14 renders por semana que se renuevan automáticamente.' },
            ] : [
              { q: 'Is it free?', a: 'You get 2 free renders to try. After that you can choose a weekly ($4.99) or yearly ($59.99) plan.' },
              { q: 'How does the yearly plan work?', a: 'The yearly plan includes a 1-day free trial. If you don\'t cancel, you\'re charged $59.99/year. You get 14 renders per week.' },
              { q: 'How do I cancel my subscription?', a: 'Go to your profile and click "Manage Subscription". You can cancel instantly. No lock-in, no penalties. Your access continues until the end of your current paid period.' },
              { q: 'If I cancel, do I lose my data?', a: 'No. Your account, render history, and gallery remain intact. If you resubscribe later, everything is right where you left it.' },
              { q: 'What happens with my photos?', a: 'Your photos are processed in real time and are not stored on our servers. Your privacy is our priority.' },
              { q: 'How many renders do I get per week?', a: 'Subscribers get 14 renders per week that renew automatically.' },
            ]).map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </main>
  );
}
