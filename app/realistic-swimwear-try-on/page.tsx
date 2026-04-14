'use client';

import { useState, useRef, useCallback } from 'react';
import { Sparkles, Upload, Camera, X, Check, ChevronDown, ChevronUp, ArrowRight, Heart, Ruler, RotateCcw, ShieldCheck, Lock, Users, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { signInWithGoogle, signInWithApple } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';

export default function RealisticSwimwearTryOnPage() {
  const { lang } = useLang();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [swimwearImage, setSwimwearImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const swimwearRef = useRef<HTMLInputElement>(null);

  const t = lang === 'es' ? {
    nav: 'Agalaz',
    tryOn: 'Probar ahora',
    badge: 'Probador virtual de bañadores #1',
    h1: 'Mira Cómo Te Queda Antes de Comprar',
    h1highlight: 'Con IA',
    subtitle: 'Deja de adivinar. Sube tu foto, elige un bañador o bikini, y mira cómo te queda en tu cuerpo real. 100% realista.',
    yourPhoto: 'Tu foto',
    photoHint: 'Sube una foto de cuerpo entero o medio cuerpo',
    swimwear: 'Bañador o bikini',
    swimwearHint: 'Sube la prenda que quieres probar',
    generate: 'Ver cómo me queda',
    generating: 'Generando tu prueba virtual...',
    loadingHint: 'Puede tardar hasta 1 minuto',
    resultTitle: 'Tu prueba virtual',
    watermarkCta: 'Quitar marca de agua',
    watermarkDesc: 'Inicia sesión y elige un plan para ver la imagen completa sin marca de agua',
    loginTitle: 'Desbloquea tu imagen',
    loginSubtitle: 'Inicia sesión gratis para acceder a la imagen completa y al probador virtual.',
    continueGoogle: 'Continuar con Google',
    continueApple: 'Continuar con Apple',
    free: 'Gratis — sin tarjeta de crédito',
    tryAnother: 'Probar otro bañador',
    stat1: '30K+',
    stat1d: 'Pruebas realizadas',
    stat2: '< 60s',
    stat2d: 'Resultado listo',
    stat3: '35%',
    stat3d: 'Menos devoluciones',
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
    useCasesTitle: 'Ideal para',
    useCase1: 'Compradoras que quieren ver antes de comprar',
    useCase2: 'Tiendas online de bañadores y bikinis',
    useCase3: 'Marcas que quieren reducir devoluciones',
    useCase4: 'Estilistas y personal shoppers',
    shopifyTitle: '¿Tienes una tienda de bañadores online?',
    shopifyDesc: 'Integra nuestro probador virtual en tu e-commerce. Reduce devoluciones hasta un 35% y aumenta la conversión.',
    shopifyCta: 'Ver integración para tiendas',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Es gratis el probador virtual de bañadores?',
    faq1a: 'Sí, puedes generar una vista previa gratis. Para la imagen completa sin marca de agua, necesitas una cuenta.',
    faq2q: '¿Funciona con todos los tipos de cuerpo?',
    faq2a: 'Sí. Nuestra IA está diseñada para adaptarse a todos los tipos de cuerpo de forma realista e inclusiva.',
    faq3q: '¿Puedo integrar esto en mi tienda Shopify?',
    faq3a: 'Sí. Ofrecemos un widget listo para Shopify y cualquier plataforma e-commerce. Visita la sección Partners.',
    faq4q: '¿Mis fotos son privadas?',
    faq4a: 'Sí. No almacenamos tus fotos. Se procesan en tiempo real y se descartan inmediatamente.',
    faq5q: '¿Funciona con bikinis y bañadores de una pieza?',
    faq5a: 'Sí. La IA detecta el tipo de prenda automáticamente y la adapta a tu cuerpo.',
    alsoTry: 'También te puede interesar',
    alsoTryClothes: 'Probador de ropa virtual',
    alsoTryTattoo: 'Simulador de tatuajes',
    alsoTryGlasses: 'Prueba gafas con IA',
    footer: '© 2025 Agalaz. Todos los derechos reservados.',
    poweredBy: 'Powered by',
  } : {
    nav: 'Agalaz',
    tryOn: 'Try it now',
    badge: '#1 virtual swimwear try-on',
    h1: 'See How It Looks Before You Buy',
    h1highlight: 'With AI',
    subtitle: 'Stop guessing. Upload your photo, choose a swimsuit or bikini, and see how it looks on your real body. 100% realistic.',
    yourPhoto: 'Your photo',
    photoHint: 'Upload a full body or half body photo',
    swimwear: 'Swimwear or bikini',
    swimwearHint: 'Upload the swimwear you want to try',
    generate: 'See how it looks on me',
    generating: 'Generating your virtual try-on...',
    loadingHint: 'This may take up to 1 minute',
    resultTitle: 'Your virtual try-on',
    watermarkCta: 'Remove watermark',
    watermarkDesc: 'Sign in and choose a plan to see the full image without watermark',
    loginTitle: 'Unlock your image',
    loginSubtitle: 'Sign in for free to access the full image and virtual try-on studio.',
    continueGoogle: 'Continue with Google',
    continueApple: 'Continue with Apple',
    free: 'Free — no credit card required',
    tryAnother: 'Try another swimsuit',
    stat1: '30K+',
    stat1d: 'Try-ons completed',
    stat2: '< 60s',
    stat2d: 'Result ready',
    stat3: '35%',
    stat3d: 'Fewer returns',
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
    useCasesTitle: 'Perfect for',
    useCase1: 'Shoppers who want to see before buying',
    useCase2: 'Online swimwear and bikini stores',
    useCase3: 'Brands looking to reduce returns',
    useCase4: 'Stylists and personal shoppers',
    shopifyTitle: 'Own a swimwear store online?',
    shopifyDesc: 'Integrate our virtual try-on into your e-commerce. Reduce returns by up to 35% and boost conversion.',
    shopifyCta: 'See store integration',
    faqTitle: 'Frequently asked questions',
    faq1q: 'Is the virtual swimwear try-on free?',
    faq1a: 'Yes, you can generate a preview for free. For the full image without watermark, you need an account.',
    faq2q: 'Does it work with all body types?',
    faq2a: 'Yes. Our AI is designed to adapt to all body types realistically and inclusively.',
    faq3q: 'Can I integrate this in my Shopify store?',
    faq3a: 'Yes. We offer a ready-to-use widget for Shopify and any e-commerce platform. Visit the Partners section.',
    faq4q: 'Are my photos private?',
    faq4a: 'Yes. We do not store your photos. They are processed in real-time and discarded immediately.',
    faq5q: 'Does it work with bikinis and one-piece swimsuits?',
    faq5a: 'Yes. The AI automatically detects the garment type and adapts it to your body.',
    alsoTry: 'You might also like',
    alsoTryClothes: 'Virtual clothing try-on',
    alsoTryTattoo: 'Tattoo simulator',
    alsoTryGlasses: 'Try glasses with AI',
    footer: '© 2025 Agalaz. All rights reserved.',
    poweredBy: 'Powered by',
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

  const applyWatermark = useCallback((imageDataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        ctx.font = `bold ${Math.max(canvas.width, canvas.height) * 0.06}px -apple-system, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.textAlign = 'center';
        const text = 'AGALAZ';
        const spacing = Math.max(canvas.width, canvas.height) * 0.2;
        for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
          for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
            ctx.fillText(text, x - canvas.width / 2, y - canvas.height / 2);
          }
        }
        ctx.restore();
        const cx = canvas.width / 2, cy = canvas.height / 2;
        const r = Math.min(canvas.width, canvas.height) * 0.12;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fill();
        ctx.font = `bold ${r * 0.8}px -apple-system, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔒', cx, cy);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = imageDataUrl;
    });
  }, []);

  async function handleGenerate() {
    if (!userImage) return;
    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const userBase64 = userImage.includes(',') ? userImage.split(',')[1] : userImage;
      const swimBase64 = swimwearImage ? (swimwearImage.includes(',') ? swimwearImage.split(',')[1] : swimwearImage) : undefined;

      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userImage: userBase64, clothingImage: swimBase64, category: 'clothing' }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Generation failed.');
        setIsLoading(false);
        return;
      }
      if (data.image) {
        const watermarked = await applyWatermark(data.image);
        setResultImage(watermarked);
      } else {
        setError(lang === 'es' ? 'No se pudo generar. Intenta con otra foto.' : 'Generation failed. Try another photo.');
      }
    } catch {
      setError(lang === 'es' ? 'Error de conexión.' : 'Connection error.');
    }
    setIsLoading(false);
  }

  function handleReset() {
    setResultImage(null);
    setUserImage(null);
    setSwimwearImage(null);
    setError(null);
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
          <Link href="/" className="text-lg font-black tracking-tight text-white">{t.nav}</Link>
          <Link href="/try-on" className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-500 transition-colors">{t.tryOn}</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{t.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            {t.h1}<br />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">{t.h1highlight}</span>
          </h1>
          <p className="text-lg text-slate-400 mt-5 max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
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

      {/* Widget / Result */}
      <section className="max-w-lg mx-auto px-4 pb-16">
        {resultImage ? (
          <div className="space-y-4">
            <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.resultTitle}</p>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img src={resultImage} alt="Swimwear preview" className="w-full" style={{ aspectRatio: '3/4', objectFit: 'cover' }} />
            </div>
            <div className="bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 border border-cyan-500/30 rounded-2xl p-5 text-center space-y-3">
              <Lock size={24} className="text-cyan-400 mx-auto" />
              <h3 className="text-lg font-black">{t.watermarkCta}</h3>
              <p className="text-sm text-slate-400">{t.watermarkDesc}</p>
              <button onClick={() => setShowLoginModal(true)}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-cyan-500 hover:to-indigo-500 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2">
                <Sparkles size={16} /> {t.watermarkCta}
              </button>
            </div>
            <button onClick={handleReset} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-500 hover:bg-white/10 transition-colors">
              {t.tryAnother}
            </button>
          </div>
        ) : (
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-sm">
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.yourPhoto}</span>
              {userImage ? (
                <div className="mt-2 relative rounded-xl overflow-hidden ring-2 ring-cyan-500/30" style={{ aspectRatio: '3/4' }}>
                  <img src={userImage} alt="Your photo" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-emerald-500 rounded-full p-1"><Check size={12} className="text-white" /></div>
                  <button onClick={() => setUserImage(null)} className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80"><X size={14} className="text-white" /></button>
                </div>
              ) : (
                <button onClick={() => userRef.current?.click()}
                  className="mt-2 w-full flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all">
                  <Camera size={28} className="text-cyan-400" />
                  <span className="text-xs font-bold text-slate-500">{t.photoHint}</span>
                </button>
              )}
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.swimwear}</span>
              {swimwearImage ? (
                <div className="mt-2 relative rounded-xl overflow-hidden ring-2 ring-cyan-500/30 w-24 h-24">
                  <img src={swimwearImage} alt="Swimwear" className="w-full h-full object-cover" />
                  <button onClick={() => setSwimwearImage(null)} className="absolute top-1 right-1 p-1 bg-black/60 rounded-full hover:bg-black/80"><X size={10} className="text-white" /></button>
                </div>
              ) : (
                <button onClick={() => swimwearRef.current?.click()}
                  className="mt-2 w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all">
                  <Upload size={16} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-500">{t.swimwearHint}</span>
                </button>
              )}
            </div>
            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold text-red-400">{error}</div>}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-cyan-500 animate-spin" />
                  <Sparkles size={20} className="text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-1.5">
                  <p className="text-sm font-black text-white">{t.generating}</p>
                  <p className="text-xs text-slate-500">{t.loadingHint}</p>
                </div>
                <span className="text-[10px] text-slate-600">{t.poweredBy} <span className="text-cyan-500 font-bold">agalaz.com</span></span>
              </div>
            ) : (
              <button onClick={handleGenerate} disabled={!userImage}
                className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                  userImage
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-500/25'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}>
                <Sparkles size={18} /> {t.generate}
              </button>
            )}
          </div>
        )}
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
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4 shadow-lg shadow-cyan-500/20">{s.step}</div>
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
              { icon: Heart, title: t.why1t, desc: t.why1d },
              { icon: RotateCcw, title: t.why2t, desc: t.why2d },
              { icon: Ruler, title: t.why3t, desc: t.why3d },
              { icon: ShieldCheck, title: t.why4t, desc: t.why4d },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-3">
                  <item.icon size={20} className="text-cyan-400" />
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
                <Check size={16} className="text-cyan-400 shrink-0" />
                <span className="text-sm text-slate-300">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="py-16 bg-gradient-to-b from-cyan-600/10 to-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">{t.shopifyTitle}</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">{t.shopifyDesc}</p>
          <Link href="/partners" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-cyan-100 transition-colors">
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
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors">
                  <span className="font-bold text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-slate-500 shrink-0" /> : <ChevronDown size={18} className="text-slate-500 shrink-0" />}
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-lg font-black text-center mb-6 text-slate-500">{t.alsoTry}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/try-on" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">{t.alsoTryClothes}</Link>
            <Link href="/virtual-tattoo-simulator" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">{t.alsoTryTattoo}</Link>
            <Link href="/try-on?category=glasses" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">{t.alsoTryGlasses}</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span className="text-xs text-slate-600">{t.footer}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-cyan-400">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-cyan-400">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowLoginModal(false); }}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto">
              <Lock size={24} className="text-cyan-400" />
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
            <button onClick={() => setShowLoginModal(false)} className="text-xs text-slate-600 hover:text-slate-400"><X size={14} className="inline mr-1" />Cancel</button>
          </div>
        </div>
      )}

      <input ref={userRef} type="file" accept="image/*" onChange={handleFile(setUserImage)} className="hidden" />
      <input ref={swimwearRef} type="file" accept="image/*" onChange={handleFile(setSwimwearImage)} className="hidden" />
    </div>
  );
}
