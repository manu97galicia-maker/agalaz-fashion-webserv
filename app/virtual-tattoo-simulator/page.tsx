'use client';

import { useState, useRef, useCallback } from 'react';
import { Sparkles, Upload, Camera, X, Check, ChevronDown, ChevronUp, ArrowRight, Palette, Target, Shield, Zap, Star, Users, Clock, Lock } from 'lucide-react';
import Link from 'next/link';
import { signInWithGoogle, signInWithOtp } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';

export default function VirtualTattooSimulatorPage() {
  const { lang } = useLang();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [tattooImage, setTattooImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
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
    generating: 'Generando tu tatuaje...',
    loadingHint: 'Puede tardar hasta 1 minuto',
    resultTitle: 'Tu tatuaje virtual',
    watermarkCta: 'Quitar marca de agua',
    watermarkDesc: 'Inicia sesión y elige un plan para ver la imagen completa sin marca de agua',
    loginTitle: 'Desbloquea tu imagen',
    loginSubtitle: 'Inicia sesión gratis para acceder a la imagen completa y al probador virtual.',
    continueGoogle: 'Continuar con Google',
    continueApple: 'Continuar con Apple',
    free: 'Gratis — sin tarjeta de crédito',
    tryAnother: 'Probar otro diseño',
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
    step3d: 'La IA coloca el tatuaje de forma realista en tu piel.',
    whyTitle: '¿Por qué usar un simulador de tatuajes?',
    why1t: 'Sin arrepentimientos',
    why1d: 'Un tatuaje es para siempre. Visualiza antes de ir al estudio y evita errores costosos.',
    why2t: 'Tamaño y posición perfectos',
    why2d: 'Mira cómo se adapta a tu brazo, pierna, pecho o espalda.',
    why3t: 'Para artistas y estudios',
    why3d: 'Muestra a tus clientes el resultado antes de tatuar.',
    why4t: 'Gratis y privado',
    why4d: 'Tus fotos no se guardan. Resultados instantáneos con IA.',
    useCasesTitle: 'Ideal para',
    useCase1: 'Personas que quieren su primer tatuaje',
    useCase2: 'Artistas tatuadores que muestran previews',
    useCase3: 'Estudios de tatuaje con tienda online',
    useCase4: 'Diseñadores que prueban ubicaciones',
    shopifyTitle: '¿Tienes un estudio de tatuajes online?',
    shopifyDesc: 'Integra nuestro simulador en tu web. Tus clientes podrán visualizar diseños en su propio cuerpo antes de agendar.',
    shopifyCta: 'Ver integración para negocios',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Es gratis usar el simulador de tatuajes?',
    faq1a: 'Sí, puedes generar una vista previa gratis. Para la imagen completa sin marca de agua, necesitas una cuenta.',
    faq2q: '¿Puedo usar esto en mi tienda de Shopify?',
    faq2a: 'Sí. Ofrecemos un widget listo para Shopify y cualquier web. Visita nuestra sección de Partners.',
    faq3q: '¿Qué tan realista es el resultado?',
    faq3a: 'Nuestra IA preserva el tono de piel, la forma del cuerpo y la posición exacta. Resultado fotorrealista.',
    faq4q: '¿Mis fotos son privadas?',
    faq4a: 'Sí. No almacenamos tus fotos. Se procesan en tiempo real y se descartan.',
    faq5q: '¿Funciona en brazos, piernas, espalda y pecho?',
    faq5a: 'Sí. La IA detecta la zona del cuerpo y adapta el tatuaje automáticamente.',
    alsoTry: 'También te puede interesar',
    alsoTryClothes: 'Probador de ropa virtual',
    alsoTrySwimwear: 'Probador de bañadores',
    alsoTryGlasses: 'Prueba gafas con IA',
    footer: '© 2025 Agalaz. Todos los derechos reservados.',
    poweredBy: 'Powered by',
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
    generating: 'Generating your tattoo...',
    loadingHint: 'This may take up to 1 minute',
    resultTitle: 'Your virtual tattoo',
    watermarkCta: 'Remove watermark',
    watermarkDesc: 'Sign in and choose a plan to see the full image without watermark',
    loginTitle: 'Unlock your image',
    loginSubtitle: 'Sign in for free to access the full image and virtual try-on studio.',
    continueGoogle: 'Continue with Google',
    continueApple: 'Continue with Apple',
    free: 'Free — no credit card required',
    tryAnother: 'Try another design',
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
    step3d: 'AI places the tattoo realistically on your skin.',
    whyTitle: 'Why use a tattoo placement simulator?',
    why1t: 'No regrets',
    why1d: 'A tattoo is forever. Visualize before going to the studio.',
    why2t: 'Perfect size & placement',
    why2d: 'See how it adapts to your arm, leg, chest, or back.',
    why3t: 'For artists & studios',
    why3d: 'Show clients the result before tattooing.',
    why4t: 'Free & private',
    why4d: 'Your photos are never stored. Instant AI results.',
    useCasesTitle: 'Perfect for',
    useCase1: 'People getting their first tattoo',
    useCase2: 'Tattoo artists showing previews to clients',
    useCase3: 'Tattoo studios with online shops',
    useCase4: 'Designers testing placements and sizes',
    shopifyTitle: 'Own a tattoo studio or shop online?',
    shopifyDesc: 'Integrate our simulator on your website. Let your clients visualize designs on their own body before booking.',
    shopifyCta: 'See business integration',
    faqTitle: 'Frequently asked questions',
    faq1q: 'Is the tattoo simulator free to use?',
    faq1a: 'Yes, you can generate a preview for free. For the full image without watermark, you need an account.',
    faq2q: 'Can I use this on my Shopify store?',
    faq2a: 'Yes. We offer a ready-to-use widget for Shopify and any website. Visit our Partners section.',
    faq3q: 'How realistic is the result?',
    faq3a: 'Our AI preserves skin tone, body shape, and exact placement. Photorealistic result.',
    faq4q: 'Are my photos private?',
    faq4a: 'Yes. We do not store your photos. Real-time processing, discarded after.',
    faq5q: 'Does it work on arms, legs, back, and chest?',
    faq5a: 'Yes. The AI automatically detects the body area and adapts the tattoo.',
    alsoTry: 'You might also like',
    alsoTryClothes: 'Virtual clothing try-on',
    alsoTrySwimwear: 'Swimwear try-on',
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

  // Apply watermark to an image data URL
  const applyWatermark = useCallback((imageDataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;

        // Draw the result image
        ctx.drawImage(img, 0, 0);

        // Heavy blur overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Diagonal watermark text — repeated grid
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

        // Central lock icon area
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = Math.min(canvas.width, canvas.height) * 0.12;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fill();

        // Lock symbol
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
      // Extract base64 from data URL
      const userBase64 = userImage.includes(',') ? userImage.split(',')[1] : userImage;
      const tattooBase64 = tattooImage ? (tattooImage.includes(',') ? tattooImage.split(',')[1] : tattooImage) : undefined;

      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImage: userBase64,
          clothingImage: tattooBase64,
          category: 'tattoo',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.generate);
        setIsLoading(false);
        return;
      }

      if (data.image) {
        // Apply watermark client-side
        const watermarked = await applyWatermark(data.image);
        setResultImage(watermarked);
      } else {
        setError(lang === 'es' ? 'No se pudo generar. Intenta con otra foto.' : 'Generation failed. Try another photo.');
      }
    } catch {
      setError(lang === 'es' ? 'Error de conexión. Inténtalo de nuevo.' : 'Connection error. Try again.');
    }

    setIsLoading(false);
  }

  function handleReset() {
    setResultImage(null);
    setUserImage(null);
    setTattooImage(null);
    setError(null);
  }

  async function handleLoginGoogle() {
    try { await signInWithGoogle(); } catch {}
  }

  async function handleLoginOtp() {
    if (!otpEmail || !otpEmail.includes('@')) return;
    try {
      await signInWithOtp(otpEmail);
      setOtpSent(true);
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
          <Link href="/try-on" className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-500 transition-colors">
            {t.tryOn}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{t.badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            {t.h1}<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{t.h1highlight}</span>
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
          /* ── Result with watermark ── */
          <div className="space-y-4">
            <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.resultTitle}</p>

            <div className="rounded-2xl overflow-hidden border border-white/10 relative">
              <img src={resultImage} alt="Tattoo preview" className="w-full" style={{ aspectRatio: '3/4', objectFit: 'cover' }} />
            </div>

            {/* Unlock CTA */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 rounded-2xl p-5 text-center space-y-3">
              <Lock size={24} className="text-indigo-400 mx-auto" />
              <h3 className="text-lg font-black">{t.watermarkCta}</h3>
              <p className="text-sm text-slate-400">{t.watermarkDesc}</p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-bold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                {t.watermarkCta}
              </button>
            </div>

            <button onClick={handleReset}
              className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-500 hover:bg-white/10 transition-colors">
              {t.tryAnother}
            </button>
          </div>
        ) : (
          /* ── Upload widget ── */
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-sm">
            {/* User photo */}
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.yourPhoto}</span>
              {userImage ? (
                <div className="mt-2 relative rounded-xl overflow-hidden ring-2 ring-indigo-500/30" style={{ aspectRatio: '4/3' }}>
                  <img src={userImage} alt="Your photo" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-emerald-500 rounded-full p-1"><Check size={12} className="text-white" /></div>
                  <button onClick={() => setUserImage(null)} className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80">
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
                  <button onClick={() => setTattooImage(null)} className="absolute top-1 right-1 p-1 bg-black/60 rounded-full hover:bg-black/80">
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

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold text-red-400">{error}</div>
            )}

            {/* Generate / Loading */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-indigo-500 animate-spin" />
                  <Sparkles size={20} className="text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-1.5">
                  <p className="text-sm font-black text-white">{t.generating}</p>
                  <p className="text-xs text-slate-500">{t.loadingHint}</p>
                </div>
                <span className="text-[10px] text-slate-600">{t.poweredBy} <span className="text-indigo-500 font-bold">agalaz.com</span></span>
              </div>
            ) : (
              <button onClick={handleGenerate} disabled={!userImage}
                className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                  userImage
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}>
                <Sparkles size={18} />
                {t.generate}
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
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">{t.shopifyDesc}</p>
          <Link href="/partners" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
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
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors">
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
            <Link href="/try-on" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">{t.alsoTryClothes}</Link>
            <Link href="/realistic-swimwear-try-on" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">{t.alsoTrySwimwear}</Link>
            <Link href="/try-on?category=glasses" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">{t.alsoTryGlasses}</Link>
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
          onClick={(e) => { if (e.target === e.currentTarget) { setShowLoginModal(false); setOtpSent(false); setOtpEmail(''); } }}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto">
              <Lock size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-black text-white">{t.loginTitle}</h3>
            <p className="text-sm text-slate-400">{t.loginSubtitle}</p>

            <div className="space-y-3">
              <button onClick={handleLoginGoogle}
                className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                {t.continueGoogle}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {otpSent ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm font-bold text-emerald-400">{lang === 'es' ? '¡Email enviado!' : 'Email sent!'}</p>
                  <p className="text-xs text-slate-400 mt-1">{lang === 'es' ? 'Revisa tu bandeja de entrada y haz clic en el link.' : 'Check your inbox and click the link.'}</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleLoginOtp(); }}
                    placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                    className="flex-1 px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
                  />
                  <button onClick={handleLoginOtp}
                    className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 transition-colors shrink-0">
                    {lang === 'es' ? 'Enviar' : 'Send'}
                  </button>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500">{t.free}</p>
            <button onClick={() => { setShowLoginModal(false); setOtpSent(false); setOtpEmail(''); }} className="text-xs text-slate-600 hover:text-slate-400">
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
