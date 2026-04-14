'use client';

import { useState, useRef } from 'react';
import { Sparkles, Upload, Camera, X, Check, ChevronDown, ChevronUp, ArrowRight, Palette, Target, Shield, Zap, Star, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import { signInWithGoogle, signInWithApple, onAuthStateChange } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';

export default function VirtualTattooSimulatorPage() {
  const { lang } = useLang();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [tattooImage, setTattooImage] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const tattooRef = useRef<HTMLInputElement>(null);

  const t = lang === 'es' ? {
    nav: 'Agalaz',
    tryOn: 'Probar ahora',
    badge: 'Simulador #1 de tatuajes con IA',
    h1: 'Prueba Tu Tatuaje Antes de Hacértelo',
    h1highlight: 'Con IA',
    subtitle: 'Sube una foto de tu cuerpo, elige un diseño de tatuaje, y mira exactamente cómo quedará en tu piel. Gratis, instantáneo y fotorrealista.',
    yourPhoto: 'Tu foto',
    photoHint: 'Sube un selfie o foto del brazo, pierna, pecho...',
    tattooDesign: 'Diseño del tatuaje',
    tattooHint: 'Sube tu diseño (PNG, JPG)',
    generate: 'Ver cómo queda en mi piel',
    loginTitle: 'Inicia sesión para ver tu resultado',
    loginSubtitle: 'Tu imagen está lista. Inicia sesión gratis para ver el resultado.',
    continueGoogle: 'Continuar con Google',
    continueApple: 'Continuar con Apple',
    free: 'Gratis — sin tarjeta de crédito',
    stat1: '50K+',
    stat1d: 'Tatuajes simulados',
    stat2: '< 60s',
    stat2d: 'Resultado listo',
    stat3: '4.9/5',
    stat3d: 'Satisfacción',
    howTitle: 'Cómo funciona',
    step1: 'Sube tu foto',
    step1d: 'Un selfie, medio cuerpo o la zona donde quieres el tatuaje.',
    step2: 'Elige el diseño',
    step2d: 'Sube tu diseño o cualquier imagen que quieras como tatuaje.',
    step3: 'Visualiza al instante',
    step3d: 'La IA coloca el tatuaje de forma realista en tu piel, respetando forma y tono.',
    whyTitle: '¿Por qué usar un simulador de tatuajes?',
    why1t: 'Sin arrepentimientos',
    why1d: 'Un tatuaje es para siempre. Visualiza antes de ir al estudio y evita errores costosos.',
    why2t: 'Tamaño y posición perfectos',
    why2d: 'Mira cómo se adapta a tu brazo, pierna, pecho o espalda. Prueba diferentes tamaños.',
    why3t: 'Para artistas y estudios',
    why3d: 'Muestra a tus clientes el resultado antes de tatuar. Reduce retoques y aumenta confianza.',
    why4t: 'Gratis y privado',
    why4d: 'Tus fotos no se guardan. Resultados instantáneos con IA generativa.',
    useCasesTitle: 'Ideal para',
    useCase1: 'Personas que quieren su primer tatuaje',
    useCase2: 'Artistas tatuadores que muestran previews a clientes',
    useCase3: 'Estudios de tatuaje con tienda online',
    useCase4: 'Diseñadores que prueban ubicaciones y tamaños',
    shopifyTitle: '¿Tienes un estudio de tatuajes online?',
    shopifyDesc: 'Integra nuestro simulador en tu web. Tus clientes podrán visualizar diseños de tu catálogo en su propio cuerpo antes de agendar. Widget listo para Shopify, WooCommerce y cualquier web.',
    shopifyCta: 'Ver integración para negocios',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Es gratis usar el simulador de tatuajes?',
    faq1a: 'Sí, Agalaz ofrece una versión gratuita para que pruebes diseños de tatuaje en tu foto con IA. Sin tarjeta de crédito.',
    faq2q: '¿Puedo usar esto en mi tienda de Shopify o web de tatuajes?',
    faq2a: 'Sí. Ofrecemos una integración lista para Shopify y cualquier web. Tu widget de prueba virtual de tatuajes en minutos. Visita nuestra sección de Partners.',
    faq3q: '¿Qué tan realista es el resultado?',
    faq3a: 'Nuestra IA preserva el tono de piel, la forma del cuerpo y la posición exacta. El resultado es fotorrealista, incluyendo sombras y curvatura del cuerpo.',
    faq4q: '¿Mis fotos son privadas?',
    faq4a: 'Sí. No almacenamos tus fotos. El procesamiento se hace en tiempo real y se descarta después. Tu privacidad es nuestra prioridad.',
    faq5q: '¿Funciona en brazos, piernas, espalda y pecho?',
    faq5a: 'Sí. La IA detecta automáticamente la zona del cuerpo y adapta el tatuaje a la curvatura y tono de piel de esa área.',
    alsoTry: 'También te puede interesar',
    alsoTryClothes: 'Probador de ropa virtual',
    alsoTrySwimwear: 'Probador de bañadores',
    alsoTryGlasses: 'Prueba gafas con IA',
    footer: '© 2025 Agalaz. Todos los derechos reservados.',
  } : {
    nav: 'Agalaz',
    tryOn: 'Try it now',
    badge: '#1 AI tattoo placement simulator',
    h1: 'Try Your Tattoo Before You Get It',
    h1highlight: 'With AI',
    subtitle: 'Upload a photo of your body, choose a tattoo design, and see exactly how it will look on your skin. Free, instant, and photorealistic.',
    yourPhoto: 'Your photo',
    photoHint: 'Upload a selfie or photo of your arm, leg, chest...',
    tattooDesign: 'Tattoo design',
    tattooHint: 'Upload your design (PNG, JPG)',
    generate: 'See how it looks on my skin',
    loginTitle: 'Sign in to see your result',
    loginSubtitle: 'Your image is ready. Sign in for free to see the result.',
    continueGoogle: 'Continue with Google',
    continueApple: 'Continue with Apple',
    free: 'Free — no credit card required',
    stat1: '50K+',
    stat1d: 'Tattoos simulated',
    stat2: '< 60s',
    stat2d: 'Result ready',
    stat3: '4.9/5',
    stat3d: 'Satisfaction',
    howTitle: 'How it works',
    step1: 'Upload your photo',
    step1d: 'A selfie, half body, or the area where you want the tattoo.',
    step2: 'Choose your design',
    step2d: 'Upload your design or any image you want as a tattoo.',
    step3: 'Visualize instantly',
    step3d: 'AI places the tattoo realistically on your skin, respecting shape and skin tone.',
    whyTitle: 'Why use a tattoo placement simulator?',
    why1t: 'No regrets',
    why1d: 'A tattoo is forever. Visualize before going to the studio and avoid costly mistakes.',
    why2t: 'Perfect size & placement',
    why2d: 'See how it adapts to your arm, leg, chest, or back. Try different sizes.',
    why3t: 'For artists & studios',
    why3d: 'Show clients the result before tattooing. Reduce touch-ups and build trust.',
    why4t: 'Free & private',
    why4d: 'Your photos are never stored. Instant results powered by generative AI.',
    useCasesTitle: 'Perfect for',
    useCase1: 'People getting their first tattoo',
    useCase2: 'Tattoo artists showing previews to clients',
    useCase3: 'Tattoo studios with online shops',
    useCase4: 'Designers testing placements and sizes',
    shopifyTitle: 'Own a tattoo studio or shop online?',
    shopifyDesc: 'Integrate our simulator on your website. Let your clients visualize designs from your catalog on their own body before booking. Widget ready for Shopify, WooCommerce, and any site.',
    shopifyCta: 'See business integration',
    faqTitle: 'Frequently asked questions',
    faq1q: 'Is the tattoo simulator free to use?',
    faq1a: 'Yes, Agalaz offers a free version so you can test tattoo designs on your photo with AI. No credit card needed.',
    faq2q: 'Can I use this on my Shopify store or tattoo website?',
    faq2a: 'Yes. We offer a ready-to-use integration for Shopify and any website. Your virtual tattoo try-on widget in minutes. Visit our Partners section.',
    faq3q: 'How realistic is the result?',
    faq3a: 'Our AI preserves skin tone, body shape, and exact placement. The result is photorealistic, including shadows and body curvature.',
    faq4q: 'Are my photos private?',
    faq4a: 'Yes. We do not store your photos. Processing happens in real-time and is discarded after. Your privacy is our priority.',
    faq5q: 'Does it work on arms, legs, back, and chest?',
    faq5a: 'Yes. The AI automatically detects the body area and adapts the tattoo to the curvature and skin tone of that region.',
    alsoTry: 'You might also like',
    alsoTryClothes: 'Virtual clothing try-on',
    alsoTrySwimwear: 'Swimwear try-on',
    alsoTryGlasses: 'Try glasses with AI',
    footer: '© 2025 Agalaz. All rights reserved.',
  };

  function handleFile(setter: (v: string | null) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX = 1280;
          let w = img.width, h = img.height;
          if (w > MAX || h > MAX) {
            const s = MAX / Math.max(w, h);
            w = Math.round(w * s);
            h = Math.round(h * s);
          }
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          c.getContext('2d')!.drawImage(img, 0, 0, w, h);
          setter(c.toDataURL('image/jpeg', 0.9));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    };
  }

  function handleGenerate() {
    if (!userImage) return;
    const sub = onAuthStateChange((user) => {
      sub.data.subscription.unsubscribe();
      if (user) {
        window.location.href = '/try-on?category=tattoo';
      } else {
        setShowLoginModal(true);
      }
    });
  }

  async function handleLogin(provider: 'google' | 'apple') {
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithApple();
    } catch {}
  }

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-tight text-white">
            {t.nav}
          </Link>
          <Link href="/try-on"
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-500 transition-colors">
            {t.tryOn}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{t.badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            {t.h1}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{t.h1highlight}</span>
          </h1>
          <p className="text-lg text-slate-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { icon: Users, val: t.stat1, label: t.stat1d },
              { icon: Clock, val: t.stat2, label: t.stat2d },
              { icon: Star, val: t.stat3, label: t.stat3d },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-xl font-black text-white">{s.val}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget */}
      <section className="max-w-lg mx-auto px-4 pb-16">
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-sm">
          {/* User photo */}
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.yourPhoto}</span>
            {userImage ? (
              <div className="mt-2 relative rounded-xl overflow-hidden ring-2 ring-indigo-500/30" style={{ aspectRatio: '4/3' }}>
                <img src={userImage} alt="Your photo" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-emerald-500 rounded-full p-1">
                  <Check size={12} className="text-white" />
                </div>
                <button onClick={() => setUserImage(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80">
                  <X size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <button onClick={() => userRef.current?.click()}
                className="mt-2 w-full flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all">
                <Camera size={28} className="text-indigo-400" />
                <span className="text-xs font-bold text-slate-500">{t.photoHint}</span>
              </button>
            )}
          </div>

          {/* Tattoo design */}
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.tattooDesign}</span>
            {tattooImage ? (
              <div className="mt-2 relative rounded-xl overflow-hidden ring-2 ring-indigo-500/30 w-24 h-24">
                <img src={tattooImage} alt="Tattoo design" className="w-full h-full object-cover" />
                <button onClick={() => setTattooImage(null)}
                  className="absolute top-1 right-1 p-1 bg-black/60 rounded-full hover:bg-black/80">
                  <X size={10} className="text-white" />
                </button>
              </div>
            ) : (
              <button onClick={() => tattooRef.current?.click()}
                className="mt-2 w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all">
                <Upload size={16} className="text-slate-500" />
                <span className="text-xs font-bold text-slate-500">{t.tattooHint}</span>
              </button>
            )}
          </div>

          {/* Generate */}
          <button onClick={handleGenerate} disabled={!userImage}
            className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
              userImage
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}>
            <Sparkles size={18} />
            {t.generate}
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-12">{t.howTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: t.step1, desc: t.step1d },
              { step: '2', title: t.step2, desc: t.step2d },
              { step: '3', title: t.step3, desc: t.step3d },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-12">{t.whyTitle}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Shield, title: t.why1t, desc: t.why1d },
              { icon: Target, title: t.why2t, desc: t.why2d },
              { icon: Palette, title: t.why3t, desc: t.why3d },
              { icon: Zap, title: t.why4t, desc: t.why4d },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-3">
                  <item.icon size={20} className="text-indigo-400" />
                </div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black text-center mb-8">{t.useCasesTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[t.useCase1, t.useCase2, t.useCase3, t.useCase4].map((uc, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3">
                <Check size={16} className="text-indigo-400 shrink-0" />
                <span className="text-sm text-slate-300">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="py-16 bg-gradient-to-b from-indigo-600/10 to-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">{t.shopifyTitle}</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto leading-relaxed">{t.shopifyDesc}</p>
          <Link href="/partners"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
            {t.shopifyCta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-slate-500 shrink-0" /> : <ChevronDown size={18} className="text-slate-500 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links — SEO */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-lg font-black text-center mb-6 text-slate-500">{t.alsoTry}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/try-on" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">
              {t.alsoTryClothes}
            </Link>
            <Link href="/realistic-swimwear-try-on" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">
              {t.alsoTrySwimwear}
            </Link>
            <Link href="/try-on?category=glasses" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">
              {t.alsoTryGlasses}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span className="text-xs text-slate-600">{t.footer}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-indigo-400">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-indigo-400">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowLoginModal(false); }}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-black text-white">{t.loginTitle}</h3>
            <p className="text-sm text-slate-400">{t.loginSubtitle}</p>

            <div className="space-y-3">
              <button onClick={() => handleLogin('google')}
                className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                {t.continueGoogle}
              </button>
              <button onClick={() => handleLogin('apple')}
                className="w-full py-3 bg-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.3-3.74 4.25z"/></svg>
                {t.continueApple}
              </button>
            </div>

            <p className="text-[11px] text-slate-500">{t.free}</p>
            <button onClick={() => setShowLoginModal(false)}
              className="text-xs text-slate-600 hover:text-slate-400">
              <X size={14} className="inline mr-1" />Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input ref={userRef} type="file" accept="image/*" onChange={handleFile(setUserImage)} className="hidden" />
      <input ref={tattooRef} type="file" accept="image/*" onChange={handleFile(setTattooImage)} className="hidden" />
    </div>
  );
}
