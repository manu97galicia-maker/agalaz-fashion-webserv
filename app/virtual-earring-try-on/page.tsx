'use client';

import { useState, useRef, useCallback } from 'react';
import { Sparkles, Upload, Camera, X, Check, ChevronDown, ChevronUp, ArrowRight, Gem, Eye, ShieldCheck, Zap, Lock, Users, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { signInWithGoogle, signInWithOtp } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';

export default function VirtualEarringTryOnPage() {
  const { lang } = useLang();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [earringImage, setEarringImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const earringRef = useRef<HTMLInputElement>(null);

  const t = lang === 'es' ? {
    nav: 'Agalaz',
    tryOn: 'Probar ahora',
    badge: 'Probador virtual de pendientes #1',
    h1: 'Prueba Pendientes y Piercings en Tu Foto',
    h1highlight: 'Con IA',
    subtitle: 'Sube un selfie, elige un pendiente o piercing, y mira cómo queda en TUS orejas. Fotorrealista, gratis e instantáneo.',
    yourPhoto: 'Tu foto',
    photoHint: 'Sube un selfie claro mostrando tus orejas',
    earring: 'Pendiente o piercing',
    earringHint: 'Sube la imagen del pendiente (PNG, JPG)',
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
    tryAnother: 'Probar otro diseño',
    stat1: '20K+',
    stat1d: 'Pruebas realizadas',
    stat2: '< 60s',
    stat2d: 'Resultado listo',
    stat3: '4.8/5',
    stat3d: 'Satisfacción',
    howTitle: 'Cómo funciona',
    step1: 'Sube tu selfie',
    step1d: 'Un selfie frontal o de perfil mostrando tus orejas claramente.',
    step2: 'Elige el diseño',
    step2d: 'Sube la imagen del pendiente, aro, o piercing que quieres probar.',
    step3: 'Visualiza al instante',
    step3d: 'La IA coloca la joya en tus orejas de forma realista, respetando perspectiva y luz.',
    whyTitle: '¿Por qué usar un probador virtual de pendientes?',
    why1t: 'Prueba antes de comprar',
    why1d: 'Mira cómo queda en TUS orejas, no en la modelo del catálogo. Evita compras equivocadas.',
    why2t: 'Visualiza piercings sin dolor',
    why2d: 'Prueba cómo quedaría un tragus, helix o conch sin agujas. Llega al estudio con la decisión tomada.',
    why3t: 'Para joyerías online',
    why3d: 'Tus clientes prueban tus pendientes en su propia foto. Aumenta conversiones y reduce devoluciones.',
    why4t: '100% privado',
    why4d: 'Tus fotos no se guardan. Procesamiento en tiempo real con IA.',
    useCasesTitle: 'Ideal para',
    useCase1: 'Personas considerando un nuevo piercing',
    useCase2: 'Compradores de joyería online',
    useCase3: 'Joyerías y tiendas de piercings',
    useCase4: 'Diseñadores de joyería mostrando piezas',
    shopifyTitle: '¿Tienes una joyería online?',
    shopifyDesc: 'Integra nuestro probador virtual en tu e-commerce. Tus clientes podrán probarse tus pendientes en su propia foto antes de comprar.',
    shopifyCta: 'Ver integración para tiendas',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Es gratis probar pendientes virtualmente?',
    faq1a: 'Sí, puedes generar una vista previa gratis. Para la imagen completa sin marca de agua, necesitas una cuenta.',
    faq2q: '¿Funciona para piercings de cartílago (tragus, helix, conch)?',
    faq2a: 'Sí. La IA detecta la zona de la oreja y coloca el piercing de forma realista, incluyendo tragus, helix, conch, daith y más.',
    faq3q: '¿Puedo subir mi propia imagen de pendientes?',
    faq3a: 'Sí. Sube cualquier imagen de pendiente, aro o joya y la IA la colocará en tu foto.',
    faq4q: '¿Puedo integrar esto en mi tienda Shopify?',
    faq4a: 'Sí. Ofrecemos un widget listo para Shopify y cualquier e-commerce. Visita la sección Partners.',
    faq5q: '¿Mis fotos son privadas?',
    faq5a: 'Sí. No almacenamos tus fotos. Se procesan en tiempo real y se descartan inmediatamente.',
    alsoTry: 'También te puede interesar',
    alsoTryClothes: 'Probador de ropa virtual',
    alsoTryTattoo: 'Simulador de tatuajes',
    alsoTrySwimwear: 'Probador de bañadores',
    footer: '© 2025 Agalaz. Todos los derechos reservados.',
    poweredBy: 'Powered by',
  } : {
    nav: 'Agalaz',
    tryOn: 'Try it now',
    badge: '#1 virtual earring try-on',
    h1: 'Try Earrings & Piercings on Your Photo',
    h1highlight: 'With AI',
    subtitle: 'Upload a selfie, choose an earring or piercing, and see how it looks on YOUR ears. Photorealistic, free, and instant.',
    yourPhoto: 'Your photo',
    photoHint: 'Upload a clear selfie showing your ears',
    earring: 'Earring or piercing',
    earringHint: 'Upload the earring image (PNG, JPG)',
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
    tryAnother: 'Try another design',
    stat1: '20K+',
    stat1d: 'Try-ons completed',
    stat2: '< 60s',
    stat2d: 'Result ready',
    stat3: '4.8/5',
    stat3d: 'Satisfaction',
    howTitle: 'How it works',
    step1: 'Upload your selfie',
    step1d: 'A front or side selfie clearly showing your ears.',
    step2: 'Choose your design',
    step2d: 'Upload the image of the earring, hoop, or piercing you want to try.',
    step3: 'Visualize instantly',
    step3d: 'AI places the jewelry on your ears realistically, matching perspective and lighting.',
    whyTitle: 'Why use a virtual earring try-on?',
    why1t: 'Try before you buy',
    why1d: 'See how it looks on YOUR ears, not the catalog model. Avoid wrong purchases.',
    why2t: 'Visualize piercings painlessly',
    why2d: 'Try how a tragus, helix, or conch would look without needles. Walk into the studio decided.',
    why3t: 'For jewelry stores',
    why3d: 'Your customers try your earrings on their own photo. Boost conversions and reduce returns.',
    why4t: '100% private',
    why4d: 'Your photos are never stored. Real-time AI processing only.',
    useCasesTitle: 'Perfect for',
    useCase1: 'People considering a new piercing',
    useCase2: 'Online jewelry shoppers',
    useCase3: 'Jewelry stores and piercing studios',
    useCase4: 'Jewelry designers showcasing pieces',
    shopifyTitle: 'Own a jewelry store online?',
    shopifyDesc: 'Integrate our virtual try-on into your e-commerce. Your customers can try your earrings on their own photo before buying.',
    shopifyCta: 'See store integration',
    faqTitle: 'Frequently asked questions',
    faq1q: 'Is the virtual earring try-on free?',
    faq1a: 'Yes, you can generate a preview for free. For the full image without watermark, you need an account.',
    faq2q: 'Does it work for cartilage piercings (tragus, helix, conch)?',
    faq2a: 'Yes. The AI detects the ear area and places the piercing realistically, including tragus, helix, conch, daith, and more.',
    faq3q: 'Can I upload my own earring images?',
    faq3a: 'Yes. Upload any earring, hoop, or jewelry image and the AI will place it on your photo.',
    faq4q: 'Can I integrate this in my Shopify store?',
    faq4a: 'Yes. We offer a ready-to-use widget for Shopify and any e-commerce. Visit the Partners section.',
    faq5q: 'Are my photos private?',
    faq5a: 'Yes. We do not store your photos. Real-time processing, discarded immediately.',
    alsoTry: 'You might also like',
    alsoTryClothes: 'Virtual clothing try-on',
    alsoTryTattoo: 'Tattoo simulator',
    alsoTrySwimwear: 'Swimwear try-on',
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
      const earBase64 = earringImage ? (earringImage.includes(',') ? earringImage.split(',')[1] : earringImage) : undefined;

      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userImage: userBase64, clothingImage: earBase64, category: 'jewelry' }),
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
    setEarringImage(null);
    setError(null);
  }

  const loginRedirect = '/paywall?from=earring';

  async function handleLoginGoogle() {
    try { await signInWithGoogle(loginRedirect); } catch {}
  }

  async function handleLoginOtp() {
    if (!otpEmail || !otpEmail.includes('@')) return;
    try { await signInWithOtp(otpEmail, loginRedirect); setOtpSent(true); } catch {}
  }

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <div className="bg-indigo-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        <Link href="/partners" className="hover:underline">
          {lang === 'es' ? 'Integra el probador virtual en tu tienda' : 'Integrate the virtual try-on in your store'} &rarr;
        </Link>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] font-black text-slate-900">AGALAZ</Link>
          <Link href="/try-on" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors">{t.tryOn}</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-8">
            <Gem size={14} className="text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">{t.badge}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-[0.9]">
            {t.h1}<br />
            <span className="italic text-slate-400">{t.h1highlight}</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed mt-6 max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="flex items-center justify-center gap-10 mt-10">
            {[
              { icon: Users, val: t.stat1, label: t.stat1d },
              { icon: Clock, val: t.stat2, label: t.stat2d },
              { icon: Star, val: t.stat3, label: t.stat3d },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-slate-900">{s.val}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget / Result */}
      <section className="max-w-lg mx-auto px-4 pb-20">
        {resultImage ? (
          <div className="space-y-4">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.resultTitle}</p>
            <div className="overflow-hidden border border-slate-200">
              <img src={resultImage} alt="Earring preview" className="w-full" style={{ aspectRatio: '3/4', objectFit: 'cover' }} />
            </div>
            <div className="border border-amber-300 bg-amber-50 p-6 text-center space-y-3">
              <Lock size={24} className="text-amber-600 mx-auto" />
              <h3 className="text-lg font-black text-slate-900">{t.watermarkCta}</h3>
              <p className="text-sm text-slate-500">{t.watermarkDesc}</p>
              <button onClick={() => setShowLoginModal(true)}
                className="w-full py-3 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                <Sparkles size={16} /> {t.watermarkCta}
              </button>
            </div>
            <button onClick={handleReset} className="w-full py-3 border border-slate-200 text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:border-amber-300 hover:text-amber-600 transition-colors">{t.tryAnother}</button>
          </div>
        ) : (
          <div className="border border-slate-200 bg-white p-6 space-y-5">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.yourPhoto}</span>
              {userImage ? (
                <div className="mt-2 relative overflow-hidden border-2 border-amber-400" style={{ aspectRatio: '1/1' }}>
                  <img src={userImage} alt="Your photo" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-emerald-500 p-1"><Check size={12} className="text-white" /></div>
                  <button onClick={() => setUserImage(null)} className="absolute top-2 right-2 p-1.5 bg-slate-900/60 hover:bg-slate-900/80"><X size={14} className="text-white" /></button>
                </div>
              ) : (
                <button onClick={() => userRef.current?.click()}
                  className="mt-2 w-full flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all">
                  <Camera size={28} className="text-amber-600" />
                  <span className="text-xs font-bold text-slate-400">{t.photoHint}</span>
                </button>
              )}
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.earring}</span>
              {earringImage ? (
                <div className="mt-2 relative overflow-hidden border-2 border-amber-400 w-24 h-24">
                  <img src={earringImage} alt="Earring" className="w-full h-full object-cover" />
                  <button onClick={() => setEarringImage(null)} className="absolute top-1 right-1 p-1 bg-slate-900/60 hover:bg-slate-900/80"><X size={10} className="text-white" /></button>
                </div>
              ) : (
                <button onClick={() => earringRef.current?.click()}
                  className="mt-2 w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all">
                  <Upload size={16} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-400">{t.earringHint}</span>
                </button>
              )}
            </div>
            {error && <div className="p-3 bg-red-50 border border-red-200 text-xs font-bold text-red-600">{error}</div>}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-5">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-slate-100 border-t-amber-600 animate-spin" />
                  <Gem size={20} className="text-amber-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-1.5">
                  <p className="text-sm font-black text-slate-900">{t.generating}</p>
                  <p className="text-xs text-slate-400">{t.loadingHint}</p>
                </div>
                <span className="text-[10px] text-slate-400">{t.poweredBy} <span className="text-amber-600 font-bold">agalaz.com</span></span>
              </div>
            ) : (
              <button onClick={handleGenerate} disabled={!userImage}
                className={`w-full py-4 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                  userImage
                    ? 'bg-slate-900 text-white hover:bg-amber-600'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}>
                <Sparkles size={18} /> {t.generate}
              </button>
            )}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 text-center mb-4">{lang === 'es' ? 'Proceso' : 'Process'}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight leading-[0.9] text-center mb-16">{t.howTitle}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: '01', title: t.step1, desc: t.step1d },
              { step: '02', title: t.step2, desc: t.step2d },
              { step: '03', title: t.step3, desc: t.step3d },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <span className="font-serif text-5xl font-black text-slate-100 italic">{s.step}</span>
                <h3 className="font-bold text-lg text-slate-900 mt-2 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 text-center mb-4">{lang === 'es' ? 'Ventajas' : 'Benefits'}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight leading-[0.9] text-center mb-16">{t.whyTitle}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Eye, title: t.why1t, desc: t.why1d },
              { icon: Zap, title: t.why2t, desc: t.why2d },
              { icon: Gem, title: t.why3t, desc: t.why3d },
              { icon: ShieldCheck, title: t.why4t, desc: t.why4d },
            ].map((item, i) => (
              <div key={i} className="group border border-slate-200 hover:border-amber-300 bg-white hover:shadow-lg p-6 transition-all">
                <div className="w-10 h-10 bg-slate-900 group-hover:bg-amber-600 flex items-center justify-center mb-4 transition-colors">
                  <item.icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 text-center mb-4">{lang === 'es' ? 'Casos de uso' : 'Use cases'}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight leading-[0.9] text-center mb-12">{t.useCasesTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[t.useCase1, t.useCase2, t.useCase3, t.useCase4].map((uc, i) => (
              <div key={i} className="flex items-center gap-3 border border-slate-200 hover:border-amber-300 bg-white px-4 py-3 transition-all">
                <Check size={16} className="text-amber-600 shrink-0" />
                <span className="text-sm text-slate-600">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 mb-4">{lang === 'es' ? 'Para negocios' : 'For business'}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight leading-[0.9] mb-4">{t.shopifyTitle}</h2>
          <p className="text-slate-500 text-base font-light leading-relaxed mb-10 max-w-xl mx-auto">{t.shopifyDesc}</p>
          <Link href="/partners" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors">
            {t.shopifyCta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 text-center mb-4">FAQ</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight leading-[0.9] text-center mb-12">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 bg-white overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
                  <span className="font-bold text-sm text-slate-900 pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-sm text-slate-500 font-light leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semantic SEO text block */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-6">
            AI Virtual Earring and Piercing Visualizer
          </h2>
          <div className="text-slate-500 text-sm md:text-base font-light leading-relaxed space-y-4">
            <p>
              Deciding on a new <strong className="text-slate-700">ear piercing</strong> or the right pair of <strong className="text-slate-700">earrings</strong> shouldn&apos;t require guesswork. Our <strong className="text-slate-700">AI earring try-on</strong> tool lets you upload a selfie and instantly see how <strong className="text-slate-700">studs</strong>, <strong className="text-slate-700">hoops</strong>, <strong className="text-slate-700">dangles</strong>, and <strong className="text-slate-700">cartilage piercings</strong> look on your actual ears.
            </p>
            <p>
              Agalaz&apos;s <strong className="text-slate-700">generative AI</strong> detects your ear shape, skin tone, and hair position to place jewelry with <strong className="text-slate-700">photorealistic accuracy</strong>. Whether you&apos;re previewing a <strong className="text-slate-700">tragus piercing</strong>, a <strong className="text-slate-700">helix stack</strong>, or a pair of <strong className="text-slate-700">statement earrings</strong>, the result looks like a real photo — not a sticker overlay.
            </p>
            <p>
              For <strong className="text-slate-700">jewelry stores</strong> and <strong className="text-slate-700">piercing studios</strong>, our <strong className="text-slate-700">virtual try-on widget</strong> lets customers see your catalog on their own face before purchasing, reducing returns and increasing buyer confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center mb-6">{t.alsoTry}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/try-on" className="px-4 py-2 border border-slate-200 text-xs font-black text-slate-400 uppercase tracking-[0.15em] hover:text-amber-600 hover:border-amber-300 transition-colors">{t.alsoTryClothes}</Link>
            <Link href="/virtual-tattoo-simulator" className="px-4 py-2 border border-slate-200 text-xs font-black text-slate-400 uppercase tracking-[0.15em] hover:text-amber-600 hover:border-amber-300 transition-colors">{t.alsoTryTattoo}</Link>
            <Link href="/realistic-swimwear-try-on" className="px-4 py-2 border border-slate-200 text-xs font-black text-slate-400 uppercase tracking-[0.15em] hover:text-amber-600 hover:border-amber-300 transition-colors">{t.alsoTrySwimwear}</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">{t.footer}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-amber-600">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-amber-600">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowLoginModal(false); setOtpSent(false); setOtpEmail(''); } }}>
          <div className="bg-white border border-slate-200 p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 bg-slate-900 flex items-center justify-center mx-auto">
              <Lock size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-slate-900">{t.loginTitle}</h3>
            <p className="text-sm text-slate-500 font-light">{t.loginSubtitle}</p>
            <div className="space-y-3">
              <button onClick={handleLoginGoogle}
                className="w-full py-3 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.15em] hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                {t.continueGoogle}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              {otpSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200">
                  <p className="text-sm font-bold text-emerald-600">{lang === 'es' ? '¡Email enviado!' : 'Email sent!'}</p>
                  <p className="text-xs text-slate-500 mt-1">{lang === 'es' ? 'Revisa tu bandeja de entrada y haz clic en el link.' : 'Check your inbox and click the link.'}</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input type="email" value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleLoginOtp(); }}
                    placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                    className="flex-1 px-3 py-3 bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-amber-400" />
                  <button onClick={handleLoginOtp} className="px-4 py-3 bg-slate-900 text-white text-sm font-bold hover:bg-amber-600 transition-colors shrink-0">
                    {lang === 'es' ? 'Enviar' : 'Send'}
                  </button>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400">{t.free}</p>
            <button onClick={() => { setShowLoginModal(false); setOtpSent(false); setOtpEmail(''); }} className="text-xs text-slate-400 hover:text-slate-600"><X size={14} className="inline mr-1" />Cancel</button>
          </div>
        </div>
      )}

      <input ref={userRef} type="file" accept="image/*" onChange={handleFile(setUserImage)} className="hidden" />
      <input ref={earringRef} type="file" accept="image/*" onChange={handleFile(setEarringImage)} className="hidden" />
    </div>
  );
}
