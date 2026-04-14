'use client';

import { useState, useRef } from 'react';
import { Sparkles, Upload, Camera, X, Check, ChevronDown, ChevronUp, ArrowRight, Heart, Ruler, RotateCcw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { signInWithGoogle, signInWithApple, onAuthStateChange } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';

export default function RealisticSwimwearTryOnPage() {
  const { lang } = useLang();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [swimwearImage, setSwimwearImage] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const swimwearRef = useRef<HTMLInputElement>(null);

  const t = lang === 'es' ? {
    nav: 'Agalaz',
    tryOn: 'Probar ahora',
    h1: 'Probador Virtual de Bañadores Realista: Mira Bikinis en Tu Cuerpo Real',
    subtitle: 'Deja de adivinar. Usa nuestra IA para visualizar bañadores y bikinis en tus propias fotos con un ajuste 100% realista.',
    yourPhoto: 'Tu foto',
    photoHint: 'Sube una foto de cuerpo entero o medio cuerpo',
    swimwear: 'Bañador o bikini',
    swimwearHint: 'Sube la prenda que quieres probar',
    generate: 'Ver cómo me queda',
    loginTitle: 'Inicia sesión para ver tu resultado',
    loginSubtitle: 'Tu imagen está lista. Inicia sesión gratis para ver el resultado.',
    continueGoogle: 'Continuar con Google',
    continueApple: 'Continuar con Apple',
    free: 'Gratis — sin tarjeta',
    howTitle: 'Cómo funciona',
    step1: 'Sube tu foto',
    step1d: 'Una foto de cuerpo entero con buena iluminación.',
    step2: 'Elige el bañador',
    step2d: 'Sube la imagen del bikini o bañador que te interesa.',
    step3: 'Mira el resultado',
    step3d: 'La IA adapta la prenda a tu cuerpo real de forma realista.',
    whyTitle: '¿Por qué usar un probador virtual de bañadores?',
    why1t: 'Tu cuerpo real, no modelos',
    why1d: 'Mira cómo queda la prenda en TU cuerpo, no en el de una modelo de catálogo.',
    why2t: 'Reduce devoluciones',
    why2d: 'El 40% de las devoluciones de bañadores son por talla. Visualiza antes de comprar.',
    why3t: 'Para todas las tallas',
    why3d: 'Funciona con todos los tipos de cuerpo. Diseñado para ser inclusivo.',
    why4t: '100% privado',
    why4d: 'Tus fotos no se guardan ni se comparten. Procesamiento en tiempo real.',
    shopifyTitle: '¿Tienes una tienda de bañadores online?',
    shopifyDesc: 'Integra nuestro probador virtual en tu e-commerce. Reduce devoluciones hasta un 35% y aumenta la conversión.',
    shopifyCta: 'Ver integración para tiendas',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Es gratis el probador virtual de bañadores?',
    faq1a: 'Sí, Agalaz ofrece una versión gratuita para que pruebes bañadores y bikinis en tu foto.',
    faq2q: '¿Funciona con todos los tipos de cuerpo?',
    faq2a: 'Sí. Nuestra IA está diseñada para adaptarse a todos los tipos de cuerpo de forma realista e inclusiva.',
    faq3q: '¿Puedo integrar esto en mi tienda Shopify?',
    faq3a: 'Sí. Ofrecemos un widget listo para Shopify y cualquier plataforma e-commerce. Visita la sección Partners.',
    faq4q: '¿Mis fotos son privadas?',
    faq4a: 'Sí. No almacenamos tus fotos. Se procesan en tiempo real y se descartan inmediatamente.',
    footer: '© 2025 Agalaz. Todos los derechos reservados.',
  } : {
    nav: 'Agalaz',
    tryOn: 'Try it now',
    h1: 'Realistic Virtual Swimwear Try-On: See Bikinis on Your Real Body Type',
    subtitle: 'Stop guessing. Use our AI to visualize swimwear and bikinis on your own photos with 100% realistic fitting.',
    yourPhoto: 'Your photo',
    photoHint: 'Upload a full body or half body photo',
    swimwear: 'Swimwear or bikini',
    swimwearHint: 'Upload the swimwear you want to try',
    generate: 'See how it looks',
    loginTitle: 'Sign in to see your result',
    loginSubtitle: 'Your image is ready. Sign in for free to see the result.',
    continueGoogle: 'Continue with Google',
    continueApple: 'Continue with Apple',
    free: 'Free — no credit card',
    howTitle: 'How it works',
    step1: 'Upload your photo',
    step1d: 'A full body photo with good lighting.',
    step2: 'Choose the swimwear',
    step2d: 'Upload the image of the bikini or swimsuit you like.',
    step3: 'See the result',
    step3d: 'AI adapts the garment to your real body shape realistically.',
    whyTitle: 'Why use a virtual swimwear try-on?',
    why1t: 'Your real body, not models',
    why1d: 'See how the garment looks on YOUR body, not a catalog model.',
    why2t: 'Reduce returns',
    why2d: '40% of swimwear returns are size-related. Visualize before you buy.',
    why3t: 'For all body types',
    why3d: 'Works with every body type. Designed to be inclusive.',
    why4t: '100% private',
    why4d: 'Your photos are never stored or shared. Real-time processing only.',
    shopifyTitle: 'Own a swimwear store online?',
    shopifyDesc: 'Integrate our virtual try-on into your e-commerce. Reduce returns by up to 35% and boost conversion.',
    shopifyCta: 'See store integration',
    faqTitle: 'Frequently asked questions',
    faq1q: 'Is the virtual swimwear try-on free?',
    faq1a: 'Yes, Agalaz offers a free version so you can try swimwear and bikinis on your photo.',
    faq2q: 'Does it work with all body types?',
    faq2a: 'Yes. Our AI is designed to adapt to all body types realistically and inclusively.',
    faq3q: 'Can I integrate this in my Shopify store?',
    faq3a: 'Yes. We offer a ready-to-use widget for Shopify and any e-commerce platform. Visit the Partners section.',
    faq4q: 'Are my photos private?',
    faq4a: 'Yes. We do not store your photos. They are processed in real-time and discarded immediately.',
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
        window.location.href = '/try-on?category=clothing';
      } else {
        setShowLoginModal(true);
      }
    });
  }

  async function handleLogin(provider: 'google' | 'apple') {
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithApple();
    } catch {
      // OAuth redirect will happen
    }
  }

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-900">
            {t.nav}
          </Link>
          <Link href="/try-on"
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-indigo-600 transition-colors">
            {t.tryOn}
          </Link>
        </div>
      </nav>

      {/* Hero + Widget (Above the fold) */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-16">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-center leading-tight">
          {t.h1.split('AI').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-indigo-600">AI</span>}
            </span>
          ))}
        </h1>
        <p className="text-lg text-slate-500 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>

        {/* Widget */}
        <div className="mt-10 max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
          {/* User photo */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.yourPhoto}</span>
            {userImage ? (
              <div className="mt-2 relative rounded-xl overflow-hidden ring-2 ring-indigo-200" style={{ aspectRatio: '3/4' }}>
                <img src={userImage} alt="Your photo" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-emerald-500 rounded-full p-1">
                  <Check size={12} className="text-white" />
                </div>
                <button onClick={() => setUserImage(null)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white">
                  <X size={14} className="text-slate-500" />
                </button>
              </div>
            ) : (
              <button onClick={() => userRef.current?.click()}
                className="mt-2 w-full flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                <Camera size={24} className="text-indigo-500" />
                <span className="text-xs font-bold text-slate-400">{t.photoHint}</span>
              </button>
            )}
          </div>

          {/* Swimwear */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.swimwear}</span>
            {swimwearImage ? (
              <div className="mt-2 relative rounded-xl overflow-hidden ring-2 ring-indigo-200 w-24 h-24">
                <img src={swimwearImage} alt="Swimwear" className="w-full h-full object-cover" />
                <button onClick={() => setSwimwearImage(null)}
                  className="absolute top-1 right-1 p-1 bg-white/90 rounded-full hover:bg-white">
                  <X size={10} className="text-slate-500" />
                </button>
              </div>
            ) : (
              <button onClick={() => swimwearRef.current?.click()}
                className="mt-2 w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                <Upload size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-400">{t.swimwearHint}</span>
              </button>
            )}
          </div>

          {/* Generate button */}
          <button onClick={handleGenerate} disabled={!userImage}
            className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              userImage
                ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}>
            <Sparkles size={18} />
            {t.generate}
          </button>
        </div>
      </section>

      {/* Why section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">{t.whyTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Heart, title: t.why1t, desc: t.why1d },
              { icon: RotateCcw, title: t.why2t, desc: t.why2d },
              { icon: Ruler, title: t.why3t, desc: t.why3d },
              { icon: ShieldCheck, title: t.why4t, desc: t.why4d },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
                  <item.icon size={20} className="text-indigo-600" />
                </div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">{t.howTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: t.step1, desc: t.step1d },
              { step: '2', title: t.step2, desc: t.step2d },
              { step: '3', title: t.step3, desc: t.step3d },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">{t.shopifyTitle}</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">{t.shopifyDesc}</p>
          <Link href="/partners"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
            {t.shopifyCta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-slate-500 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">{t.footer}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-indigo-600">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-indigo-600">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowLoginModal(false); }}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles size={24} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-black">{t.loginTitle}</h3>
            <p className="text-sm text-slate-500">{t.loginSubtitle}</p>

            <div className="space-y-3">
              <button onClick={() => handleLogin('google')}
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                {t.continueGoogle}
              </button>
              <button onClick={() => handleLogin('apple')}
                className="w-full py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.3-3.74 4.25z"/></svg>
                {t.continueApple}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">{t.free}</p>
            <button onClick={() => setShowLoginModal(false)}
              className="text-xs text-slate-400 hover:text-slate-600">
              <X size={14} className="inline mr-1" />Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input ref={userRef} type="file" accept="image/*" onChange={handleFile(setUserImage)} className="hidden" />
      <input ref={swimwearRef} type="file" accept="image/*" onChange={handleFile(setSwimwearImage)} className="hidden" />
    </div>
  );
}
