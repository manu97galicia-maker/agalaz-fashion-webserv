'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Copy, Check, ArrowRight, ChevronRight, Shield, Zap, Globe, Code2, ChevronDown, ShoppingBag, TrendingDown, BarChart3 } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 150,
    renders: 200,
    extra: '0,75',
    features: ['200 renders/mes', 'Widget personalizable', 'Soporte por email', 'Dashboard de uso'],
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 499,
    renders: 1000,
    extra: '0,50',
    features: ['1.000 renders/mes', 'Widget personalizable', 'Soporte prioritario', 'Dashboard + analytics', 'Dominios ilimitados', 'Onboarding call'],
    popular: true,
  },
];

interface PartnerProfile {
  id: string;
  store_name: string;
  store_url: string;
  plan: string;
  is_active: boolean;
  credits_remaining: number;
  api_key_prefix: string | null;
  has_api_key: boolean;
  has_subscription: boolean;
}

// New flow: url → login → free trial (5 credits) → paywall → choose plan → subscribe
type FlowStep = 'loading' | 'landing' | 'login' | 'has_key' | 'paywall' | 'subscribed';

export default function PartnersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm font-bold">Cargando...</div>
      </div>
    }>
      <PartnersContent />
    </Suspense>
  );
}

function PartnersContent() {
  const searchParams = useSearchParams();
  const { lang } = useLang();
  const [step, setStep] = useState<FlowStep>('loading');
  const [storeUrl, setStoreUrl] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<PartnerProfile | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
  }

  // Check auth on mount
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
        setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || null);
        loadPartnerProfile(user.id);
      } else {
        setStep('landing');
      }
    });
  }, []);

  // Post-payment redirect
  useEffect(() => {
    const subscribed = searchParams.get('subscribed');
    if (subscribed === 'true' && userId) {
      loadPartnerProfile(userId);
    }
  }, [searchParams, userId]);

  async function loadPartnerProfile(uid: string) {
    try {
      const res = await fetch(`/api/partners/profile?user_id=${uid}`);
      if (res.ok) {
        const data = await res.json();
        setPartnerProfile(data.partner);
        if (data.partner.has_subscription) {
          setStep('subscribed');
        } else if (data.partner.has_api_key && data.partner.credits_remaining > 0) {
          setStep('has_key');
        } else if (data.partner.has_api_key && data.partner.credits_remaining <= 0) {
          setStep('paywall');
        } else {
          // Has partner record but no key yet — generate it
          setStep('has_key');
        }
      } else {
        // No partner record — show login step
        const savedUrl = localStorage.getItem('agalaz_partner_url');
        if (savedUrl) setStoreUrl(savedUrl);
        setStep('login');
      }
    } catch {
      setStep('landing');
    }
  }

  // Google login
  async function handleLogin() {
    // Save store URL for after login
    if (storeUrl) {
      localStorage.setItem('agalaz_partner_url', storeUrl);
    }
    const supabase = getSupabase();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/partners` },
    });
  }

  // Register partner + generate API key immediately (free trial)
  async function handleRegisterAndGetKey() {
    if (!userId || !userEmail) return;
    const url = storeUrl || localStorage.getItem('agalaz_partner_url') || '';
    if (!url) {
      setError('Introduce la URL de tu tienda');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Register partner
      const registerRes = await fetch('/api/partners/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          email: userEmail,
          store_name: new URL(url.startsWith('http') ? url : `https://${url}`).hostname,
          store_url: url,
          plan: 'trial',
        }),
      });
      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        if (registerRes.status === 409) {
          // Already registered — load profile
          loadPartnerProfile(userId);
          setIsSubmitting(false);
          return;
        }
        setError(registerData.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      // 2. Generate API key immediately with 5 free credits
      const keyRes = await fetch('/api/partners/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner_id: registerData.partner.id }),
      });
      const keyData = await keyRes.json();

      if (keyRes.ok) {
        setApiKey(keyData.api_key);
        setPartnerProfile({
          id: registerData.partner.id,
          store_name: registerData.partner.store_name,
          store_url: url,
          plan: 'trial',
          is_active: true,
          credits_remaining: 5,
          api_key_prefix: keyData.api_key.substring(0, 14),
          has_api_key: true,
          has_subscription: false,
        });
        setStep('has_key');
        localStorage.removeItem('agalaz_partner_url');
      } else {
        setError(keyData.error || 'Failed to generate API key');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  }

  // Subscribe to plan (after trial ends)
  async function handleSubscribe() {
    if (!partnerProfile || !userEmail) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/partners/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          partnerId: partnerProfile.id,
          email: userEmail,
          action: 'subscribe',
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to start checkout');
      }
    } catch {
      setError('Something went wrong');
    }
    setIsSubmitting(false);
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  const currentPlan = PLANS.find(p => p.id === (partnerProfile?.plan || selectedPlan));

  // ─── LOADING ───
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm font-bold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl tracking-[0.15em] text-slate-900 font-black">
            AGALAZ
          </a>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              Partners
            </span>
            {userName && (
              <span className="text-xs text-slate-400 font-bold">{userName}</span>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ═══ STEP: LANDING (not logged in) ═══ */}
        {(step === 'landing' || step === 'login') && (
          <>
            {/* ── HERO ── */}
            <div className="text-center space-y-5 mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
                <ShoppingBag size={14} className="text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                  {lang === 'es' ? '¿Tienes un ecommerce?' : 'Got an ecommerce?'}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {lang === 'es' ? 'Dispara tus ventas.' : 'Skyrocket your sales.'}<br />
                <span className="italic text-indigo-600">{lang === 'es' ? 'Reduce devoluciones.' : 'Reduce returns.'}</span>
              </h1>
              <p className="text-slate-500 text-base font-light max-w-lg mx-auto">
                {lang === 'es'
                  ? 'Tus clientes se prueban la ropa, gafas, joyería y accesorios con IA antes de comprar. 2 líneas de código. Funciona en Shopify, WooCommerce o cualquier plataforma.'
                  : 'Your customers try on clothing, glasses, jewelry & accessories with AI before buying. 2 lines of code. Works on Shopify, WooCommerce, or any platform.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-bold pt-2">
                <span className="flex items-center gap-1.5"><TrendingDown size={14} className="text-emerald-500" /> {lang === 'es' ? '-40% devoluciones' : '-40% returns'}</span>
                <span className="flex items-center gap-1.5"><BarChart3 size={14} className="text-indigo-500" /> {lang === 'es' ? '+25% conversión' : '+25% conversion'}</span>
                <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-500" /> {lang === 'es' ? 'Prueba gratis' : 'Free trial'}</span>
              </div>
            </div>

            {/* ── ECOMMERCE WIDGET ── */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
              <button onClick={() => setExpandedImage('/images/agalaz before check.jpg')} className="cursor-zoom-in group">
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group-hover:border-indigo-300 group-hover:shadow-lg transition-all">
                  <img src="/images/agalaz before check.jpg" alt="Ecommerce without try-on" className="w-52 md:w-72 h-auto" />
                </div>
              </button>
              <ChevronRight size={26} className="text-indigo-400 shrink-0" />
              <button onClick={() => setExpandedImage('/images/agalaz check.jpg')} className="cursor-zoom-in group">
                <div className="rounded-2xl overflow-hidden border-2 border-indigo-300 shadow-md group-hover:border-indigo-500 group-hover:shadow-lg transition-all">
                  <img src="/images/agalaz check.jpg" alt="Ecommerce with try-on" className="w-52 md:w-72 h-auto" />
                </div>
              </button>
            </div>

            {/* ── BEFORE / AFTER / I WANT IT ── */}
            <div className="flex items-center justify-center gap-3 md:gap-5 mb-16">
              <button onClick={() => setExpandedImage('/images/before.png')} className="cursor-zoom-in group text-center space-y-1.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{lang === 'es' ? 'Antes' : 'Before'}</span>
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group-hover:border-indigo-300 group-hover:shadow-lg transition-all">
                  <img src="/images/before.png" alt="Before try-on" className="w-28 md:w-36 h-auto" />
                </div>
              </button>
              <ChevronRight size={20} className="text-indigo-400 shrink-0 mt-5" />
              <button onClick={() => setExpandedImage('/images/after.png')} className="cursor-zoom-in group text-center space-y-1.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">{lang === 'es' ? 'Después' : 'After'}</span>
                <div className="rounded-2xl overflow-hidden border-2 border-indigo-300 shadow-md group-hover:border-indigo-500 group-hover:shadow-lg transition-all">
                  <img src="/images/after.png" alt="After try-on" className="w-28 md:w-36 h-auto" />
                </div>
              </button>
              <ChevronRight size={20} className="text-indigo-400 shrink-0 mt-5" />
              <button onClick={() => setExpandedImage('/images/Agalaz I want it.jpg')} className="cursor-zoom-in group text-center space-y-1.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">{lang === 'es' ? '¡Lo quiero!' : 'I want it!'}</span>
                <div className="rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-md group-hover:border-emerald-500 group-hover:shadow-lg transition-all">
                  <img src="/images/Agalaz I want it.jpg" alt="I want it" className="w-28 md:w-36 h-auto" />
                </div>
              </button>
            </div>

            {/* ── IMAGE LIGHTBOX ── */}
            {expandedImage && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in cursor-zoom-out"
                onClick={() => setExpandedImage(null)}
              >
                <div className="relative max-w-3xl max-h-[85vh] mx-4">
                  <img src={expandedImage} alt="Expanded view" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
                </div>
              </div>
            )}

            {/* ── START: Enter URL + Login ── */}
            <div id="apply" className="max-w-md mx-auto mb-20 scroll-mt-20">
              <div className="border-2 border-indigo-400 rounded-2xl p-8 space-y-6 bg-gradient-to-b from-indigo-50 to-white shadow-xl shadow-indigo-100">
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Aplica ahora' : 'Apply now'}</h2>
                  <p className="text-indigo-600 text-sm font-black uppercase tracking-widest">
                    {lang === 'es' ? 'Prueba Gratis' : 'Free Trial'}
                  </p>
                  <p className="text-slate-400 text-xs font-light">
                    {lang === 'es' ? '5 renders gratis. Sin tarjeta de crédito. Sin coste de instalación.' : '5 free renders. No credit card. No setup cost.'}
                  </p>
                </div>

                {/* Step 1: Enter store URL */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your store URL</label>
                  <input
                    type="text"
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all bg-white"
                    placeholder="https://mitienda.com"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                    {error}
                  </div>
                )}

                {/* Single CTA — login triggers Google OAuth, on return auto-registers */}
                <button
                  onClick={() => {
                    if (!storeUrl) {
                      setError(lang === 'es' ? 'Introduce la URL de tu tienda primero' : 'Enter your store URL first');
                      return;
                    }
                    setError(null);
                    if (step === 'login' && userId) {
                      handleRegisterAndGetKey();
                    } else {
                      handleLogin();
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  {isSubmitting
                    ? (lang === 'es' ? 'Generando...' : 'Generating...')
                    : (lang === 'es' ? 'Empezar prueba gratis' : 'Start free trial')}
                  <ArrowRight size={16} />
                </button>

                {step === 'login' && userEmail && (
                  <p className="text-center text-[10px] text-slate-400">
                    {lang === 'es' ? 'Sesión iniciada como' : 'Logged in as'} <span className="font-bold text-slate-600">{userEmail}</span>
                  </p>
                )}

                <p className="text-center text-[10px] text-slate-300 font-bold">
                  {lang === 'es' ? 'Sin tarjeta de crédito' : 'No credit card required'}
                </p>
              </div>
            </div>

            {/* ── DEMO VIDEO ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">{lang === 'es' ? 'Míralo en acción' : 'See it in action'}</span>
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Probador Virtual para Tu Tienda' : 'Virtual Try-On for Your Store'}</h2>
              </div>
              <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
                <video
                  src="/demo-tryon.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full"
                />
              </div>
              <p className="text-center text-[10px] text-slate-300 mt-4">
                {lang === 'es' ? 'Demo real — probador virtual con IA en una página de producto ecommerce' : 'Real demo — AI virtual try-on running on an ecommerce product page'}
              </p>
            </div>

            {/* ── FEATURES ── */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {(lang === 'es' ? [
                { icon: <Code2 size={20} />, title: '2 Líneas de Código', desc: 'Pega nuestro script + un div en tu página de producto. Listo. Sin servidor, sin integración compleja.' },
                { icon: <Shield size={20} />, title: 'Seguro por Defecto', desc: 'Allowlisting de dominios, claves API con SHA-256, límites de peticiones. Nunca almacenamos las fotos de tus clientes.' },
                { icon: <Sparkles size={20} />, title: 'Resultados con IA', desc: 'Probador fotorrealista para ropa, gafas, joyería, sombreros, zapatos, bolsos — incluso tatuajes y nail art.' },
              ] : [
                { icon: <Code2 size={20} />, title: '2 Lines of Code', desc: 'Paste our script tag + a div on your product page. That\'s it. No server setup, no complex integration.' },
                { icon: <Shield size={20} />, title: 'Secure by Default', desc: 'Domain allowlisting, SHA-256 hashed API keys, rate limits. We never store your customers\' photos.' },
                { icon: <Sparkles size={20} />, title: 'AI-Powered Results', desc: 'Photorealistic try-on for clothing, glasses, jewelry, hats, shoes, bags — even tattoos and nail art.' },
              ]).map((f, i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-3">
                  <div className="text-indigo-600">{f.icon}</div>
                  <h3 className="font-black text-slate-900 text-sm">{f.title}</h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* ── HOW IT WORKS ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-10">
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Cómo Empezar' : 'How to Get Started'}</h2>
                <p className="text-slate-400 text-sm font-light">{lang === 'es' ? 'Del registro al widget en menos de 5 minutos.' : 'From sign-up to live widget in under 5 minutes.'}</p>
              </div>

              <div className="space-y-0 max-w-lg mx-auto">
                {(lang === 'es' ? [
                  { step: '1', title: 'Introduce la URL de tu tienda', desc: 'Dinos dónde está tu tienda. Autorizaremos el dominio automáticamente.' },
                  { step: '2', title: 'Inicia sesión con Google', desc: 'Autenticación en un clic. Sin contraseñas, sin formularios.' },
                  { step: '3', title: 'Obtén tu API key + 5 renders gratis', desc: 'Recibe al instante tu clave API segura y 5 renders para probar en tu tienda real. Sin tarjeta de crédito.' },
                  { step: '4', title: 'Instala el widget (2 líneas de código)', desc: 'Copia el <script> en el <head> de tu tienda y coloca un <div> en tus páginas de producto. Detecta imágenes automáticamente en Shopify y WooCommerce.' },
                  { step: '5', title: 'Cuando termine la prueba, elige un plan', desc: 'Tras tus 5 renders gratis, elige Starter (150€/mes) o Growth (499€/mes). Sin coste de alta. Cancela cuando quieras.' },
                ] : [
                  { step: '1', title: 'Enter your store URL', desc: 'Tell us where your store lives. We\'ll allowlist the domain automatically.' },
                  { step: '2', title: 'Sign in with Google', desc: 'One-click authentication. No passwords, no forms.' },
                  { step: '3', title: 'Get your API key + 5 free renders', desc: 'Instantly receive your secure API key and 5 renders to test on your real store. No credit card needed.' },
                  { step: '4', title: 'Install the widget (2 lines of code)', desc: 'Copy the <script> tag into your store\'s <head>, and place a <div> on your product pages. Auto-detects images on Shopify & WooCommerce.' },
                  { step: '5', title: 'When trial ends, choose a plan', desc: 'After your 5 free renders, pick Starter (€150/mo) or Growth (€499/mo). No setup fees. Cancel anytime.' },
                ]).map((item, i) => (
                  <div key={i} className="flex gap-5 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                        {item.step}
                      </div>
                      {i < 4 && <div className="w-px flex-1 bg-indigo-200 mt-2" />}
                    </div>
                    <div className="pt-2 pb-4">
                      <h3 className="font-black text-slate-900 text-sm">{item.title}</h3>
                      <p className="text-slate-400 text-xs font-light mt-1 leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PRICING ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-10">
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Precios' : 'Pricing'}</h2>
                <p className="text-slate-400 text-sm font-light">{lang === 'es' ? 'Sin coste de alta. Empieza con 5 renders gratis. Amplía cuando quieras.' : 'No setup fees. Start with 5 free renders. Upgrade when ready.'}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-xl ${
                      plan.popular
                        ? 'border-indigo-600 shadow-lg shadow-indigo-100'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                        {lang === 'es' ? 'Más Popular' : 'Most Popular'}
                      </div>
                    )}
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mt-2">
                          <span className="font-serif text-4xl font-black text-slate-900">{plan.price}</span>
                          <span className="text-slate-400 text-sm font-bold">&euro;/{lang === 'es' ? 'mes' : 'month'}</span>
                        </div>
                        <p className="text-xs text-emerald-600 font-bold mt-1">
                          {lang === 'es' ? 'Sin coste de alta' : 'No setup fee'}
                        </p>
                      </div>
                      <ul className="space-y-2.5">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check size={14} className="text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                        <li className="flex items-center gap-2 text-xs text-slate-400">
                          <ArrowRight size={14} className="text-slate-300 shrink-0" />
                          Extra: {plan.extra}&euro;/render
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROI CALCULATOR ── */}
            <div className="mb-20">
              <div className="text-center space-y-3 mb-10">
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Retorno de Inversión' : 'Return on Investment'}</h2>
                <p className="text-slate-400 text-sm font-light">{lang === 'es' ? '¿Cuánto puede ahorrar el probador virtual a tu negocio?' : 'How much can virtual try-on save your business?'}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {(lang === 'es' ? [
                  { type: 'Boutique', orders: '500 pedidos/mes', returns: '25% → 15%', saved: '50 devoluciones menos/mes', value: '~1.500€/mes ahorrados', cost: 'Starter: 150€/mes', roi: '10x ROI', roiColor: 'text-emerald-600' },
                  { type: 'Tienda Mediana', orders: '2.000 pedidos/mes', returns: '30% → 18%', saved: '240 devoluciones menos/mes', value: '~7.200€/mes ahorrados', cost: 'Growth: 499€/mes', roi: '14x ROI', roiColor: 'text-indigo-600' },
                  { type: 'Gran Retailer', orders: '10.000 pedidos/mes', returns: '35% → 20%', saved: '1.500 devoluciones menos/mes', value: '~45.000€/mes ahorrados', cost: 'Plan personalizado', roi: '50x+ ROI', roiColor: 'text-amber-600' },
                ] : [
                  { type: 'Boutique', orders: '500 orders/mo', returns: '25% → 15%', saved: '50 fewer returns/mo', value: '~€1,500/mo saved', cost: 'Starter: €150/mo', roi: '10x ROI', roiColor: 'text-emerald-600' },
                  { type: 'Mid-size Store', orders: '2,000 orders/mo', returns: '30% → 18%', saved: '240 fewer returns/mo', value: '~€7,200/mo saved', cost: 'Growth: €499/mo', roi: '14x ROI', roiColor: 'text-indigo-600' },
                  { type: 'Large Retailer', orders: '10,000 orders/mo', returns: '35% → 20%', saved: '1,500 fewer returns/mo', value: '~€45,000/mo saved', cost: 'Custom plan', roi: '50x+ ROI', roiColor: 'text-amber-600' },
                ]).map((tier, i) => (
                  <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-4">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">{tier.type}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tier.orders}</p>
                    </div>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Reducción devoluciones' : 'Returns reduction'}</span><span className="font-bold text-emerald-600">{tier.returns}</span></div>
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Devoluciones evitadas' : 'Returns avoided'}</span><span className="font-bold">{tier.saved}</span></div>
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Ahorro estimado' : 'Estimated savings'}</span><span className="font-bold text-slate-900">{tier.value}</span></div>
                      <div className="h-px bg-slate-100" />
                      <div className="flex justify-between"><span>{lang === 'es' ? 'Coste Agalaz' : 'Agalaz cost'}</span><span className="font-bold">{tier.cost}</span></div>
                    </div>
                    <div className={`text-center py-3 bg-slate-50 rounded-xl font-black text-lg ${tier.roiColor}`}>
                      {tier.roi}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-[10px] text-slate-300 mt-4">
                {lang === 'es' ? '* Basado en un coste medio de 30€ por devolución procesada. Sin costes de alta.' : '* Based on average €30 return processing cost. ROI improved vs old plans — no setup fees.'}
              </p>
            </div>

            {/* ── FAQ ── */}
            <div id="faq" className="mb-20 scroll-mt-20">
              <div className="text-center space-y-3 mb-10">
                <h2 className="font-serif text-3xl font-black text-slate-900">{lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</h2>
              </div>

              <div className="max-w-2xl mx-auto space-y-3">
                {(lang === 'es' ? [
                  { q: '¿Cómo funciona la prueba gratis?', a: 'Introduce la URL de tu tienda, inicia sesión con Google y recibirás al instante una API key con 5 renders gratis. Sin tarjeta de crédito. Sin coste de alta. Prueba el widget en tu tienda real antes de contratar un plan.' },
                  { q: '¿Qué pasa cuando se acaban mis 5 renders gratis?', a: 'El widget deja de funcionar hasta que te suscribas a un plan. Elige Starter (150€/mes, 200 renders) o Growth (499€/mes, 1.000 renders). Sin presión — tu API key sigue siendo válida.' },
                  { q: '¿Hay coste de alta?', a: 'No. Hemos eliminado los costes de alta. Solo pagas la suscripción mensual cuando estés listo para lanzar.' },
                  { q: '¿Qué pasa si no cancelo la suscripción?', a: 'La suscripción se renueva automáticamente cada mes. Si no cancelas antes del siguiente ciclo de facturación, se te cobrará el siguiente mes. Puedes cancelar en cualquier momento desde tu portal de cliente en Stripe.' },
                  { q: '¿Qué plataformas son compatibles?', a: 'El widget funciona en cualquier web: Shopify, WooCommerce, PrestaShop, Magento, Wix, Squarespace y cualquier tienda personalizada. Detecta automáticamente las imágenes de producto en Shopify y WooCommerce. Para otras plataformas, pasa la URL de la imagen en el atributo data-garment.' },
                  { q: '¿Qué artículos pueden probarse los clientes?', a: 'Ropa (camisetas, vestidos, pantalones, chaquetas), gafas y gafas de sol, joyería (collares, pendientes, pulseras, anillos, relojes), sombreros, zapatos, bolsos, e incluso tatuajes o nail art. La IA detecta el tipo de artículo automáticamente.' },
                  { q: '¿Qué velocidad tiene el renderizado?', a: 'El tiempo medio de render es ~10 segundos dependiendo de la calidad de la imagen. La IA genera una imagen fotorrealista del cliente con el artículo puesto.' },
                  { q: '¿Almacenáis las fotos de los clientes?', a: 'No. Las imágenes de los clientes se procesan en tiempo real y nunca se almacenan en nuestros servidores. Política de retención de datos cero.' },
                  { q: '¿Qué pasa si supero mis renders mensuales?', a: 'Los renders extra se facturan a 0,75€/render (Starter) o 0,50€/render (Growth). Sin corte — tu widget sigue funcionando.' },
                  { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí. Las suscripciones mensuales se pueden cancelar en cualquier momento. Mantienes el acceso hasta el final de tu período de facturación.' },
                ] : [
                  { q: 'How does the free trial work?', a: 'Enter your store URL, sign in with Google, and you instantly receive an API key with 5 free renders. No credit card required. No setup fee. Test the widget on your real store before committing to a plan.' },
                  { q: 'What happens when my 5 free renders run out?', a: 'The widget stops working until you subscribe to a plan. Choose Starter (€150/mo, 200 renders) or Growth (€499/mo, 1,000 renders). No pressure — your API key stays valid.' },
                  { q: 'Is there a setup fee?', a: 'No. We eliminated setup fees. You only pay the monthly subscription when you\'re ready to go live.' },
                  { q: 'What happens if I don\'t cancel the subscription?', a: 'The subscription renews automatically each month. If you don\'t cancel before the next billing cycle, you will be charged for the next month. You can cancel anytime from your Stripe customer portal. Annual plans are also available — if you switch to annual and don\'t cancel, the full year is charged at renewal.' },
                  { q: 'What platforms are supported?', a: 'The widget works on any website: Shopify, WooCommerce, PrestaShop, Magento, Wix, Squarespace, and any custom-built store. It auto-detects product images on Shopify and WooCommerce. For other platforms, just pass the image URL in the data-garment attribute.' },
                  { q: 'What items can customers try on?', a: 'Clothing (shirts, dresses, pants, jackets), glasses & sunglasses, jewelry (necklaces, earrings, bracelets, rings, watches), hats, shoes, bags, and even tattoos or nail art. The AI detects the item type automatically.' },
                  { q: 'How fast is the rendering?', a: 'Average render time is ~10 seconds depending on image quality. The AI generates a photorealistic image of the customer wearing the item.' },
                  { q: 'Do you store customer photos?', a: 'No. Customer images are processed in real-time and never stored on our servers. Zero data retention policy.' },
                  { q: 'What if I exceed my monthly renders?', a: 'Extra renders are billed at €0.75/render (Starter) or €0.50/render (Growth). No hard cutoff — your widget keeps working.' },
                  { q: 'Can I cancel anytime?', a: 'Yes. Monthly subscriptions can be cancelled anytime. You keep access until the end of your billing period.' },
                ]).map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-sm pr-4">{faq.q}</span>
                      <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 -mt-1">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── BOTTOM CTA ── */}
            <div id="contact" className="text-center space-y-4 scroll-mt-20">
              <h2 className="font-serif text-2xl font-black text-slate-900">{lang === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}</h2>
              <p className="text-slate-400 text-sm font-light">{lang === 'es' ? '5 renders gratis. Sin tarjeta. Sin coste de alta.' : '5 free renders. No credit card. No setup fee.'}</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors inline-flex items-center gap-3"
              >
                <Sparkles size={16} />
                {lang === 'es' ? 'Empezar Prueba Gratis' : 'Start Free Trial'}
                <ArrowRight size={14} />
              </button>
              <div className="pt-4 space-y-2">
                <Link href="/blog/virtual-dressing-room-online-free" className="text-[10px] text-indigo-500 font-bold hover:text-indigo-700 transition-colors block">
                  {lang === 'es' ? 'Más info: ¿Qué es un Probador Virtual? →' : 'Learn more: What is a Virtual Dressing Room? →'}
                </Link>
                <p className="text-xs text-slate-400">
                  {lang === 'es' ? '¿Preguntas?' : 'Questions?'} <a href="mailto:infoagalaz@gmail.com" className="text-indigo-600 font-bold hover:text-indigo-800">infoagalaz@gmail.com</a>
                </p>
              </div>
            </div>
          </>
        )}

        {/* ═══ STEP: HAS_KEY — Full dashboard + detailed integration ═══ */}
        {step === 'has_key' && (
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">Your account is ready</h1>
              <p className="text-slate-400 text-sm font-light">
                {partnerProfile?.credits_remaining || 5} free renders available — follow the steps below to go live
              </p>
            </div>

            {/* Trial credits counter */}
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Free Trial</span>
                  <p className="text-sm font-bold text-indigo-900 mt-1">
                    {partnerProfile?.credits_remaining || 0} / 5 renders remaining
                  </p>
                </div>
                <Zap size={24} className="text-indigo-300" />
              </div>
              <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${((partnerProfile?.credits_remaining || 0) / 5) * 100}%` }} />
              </div>
              <p className="text-[10px] text-indigo-400">
                Each time a customer generates a virtual try-on, 1 render credit is consumed. When your 5 free renders are used, you can subscribe to a plan to continue.
              </p>
            </div>

            {/* ── 1. API KEY ── */}
            {apiKey && (
              <div className="space-y-3">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">1</div>
                  Save your API Key
                </h2>
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-amber-600" />
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                      Secret key — save it now
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-4 py-3 rounded-lg text-sm font-mono text-slate-900 border border-amber-200 break-all">
                      {apiKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(apiKey, 'key')}
                      className="p-3 bg-white border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors shrink-0"
                    >
                      {copied === 'key' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} className="text-amber-600" />}
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-amber-600 font-bold">
                      This key is shown only once. Copy it and store it somewhere safe.
                    </p>
                    <p className="text-[10px] text-amber-500">
                      Your key authenticates all try-on requests from your store. It is hashed on our servers — we cannot retrieve it for you. If you lose it, you will need to generate a new one.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── 2. INTEGRATION GUIDE ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '2' : '1'}</div>
                Install the widget on your store
              </h2>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                The Agalaz widget consists of two pieces: a <strong className="text-slate-600">script tag</strong> that loads our widget engine, and a <strong className="text-slate-600">div element</strong> on each product page where the &ldquo;Try it on&rdquo; button will appear. The widget automatically detects the product image on Shopify and WooCommerce. For other platforms, you pass the image URL manually.
              </p>

              {/* Step 2a: Script tag */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Step A — Add the script to your store&apos;s {'<head>'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(`<script src="https://agalaz.com/widget.js" data-api-key="${apiKey || partnerProfile?.api_key_prefix + '...'}"></script>`, 'script')}
                    className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                  >
                    {copied === 'script' ? <Check size={12} /> : <Copy size={12} />}
                    {copied === 'script' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {`<script src="https://agalaz.com/widget.js" data-api-key="${apiKey || partnerProfile?.api_key_prefix + '...'}"></script>`}
                </code>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  This script is lightweight (~3KB). It loads asynchronously and does not affect your page speed. It only activates on pages that contain the try-on div below.
                </p>
              </div>

              {/* Step 2b: Div */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Step B — Place the try-on button on product pages
                  </span>
                  <button
                    onClick={() => copyToClipboard('<div id="agalaz-tryon" data-garment="PRODUCT_IMAGE_URL"></div>', 'div')}
                    className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                  >
                    {copied === 'div' ? <Check size={12} /> : <Copy size={12} />}
                    {copied === 'div' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {'<div id="agalaz-tryon" data-garment="PRODUCT_IMAGE_URL"></div>'}
                </code>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Place this div where you want the &ldquo;Try it on with AI&rdquo; button to appear — typically below the product image or near the &ldquo;Add to cart&rdquo; button. Replace <code className="text-indigo-600 font-bold">PRODUCT_IMAGE_URL</code> with the direct URL of the product image (must be a real image URL ending in .jpg/.png/.webp, not a page URL).
                </p>
              </div>
            </div>

            {/* ── 3. PLATFORM GUIDES ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '3' : '2'}</div>
                Platform-specific instructions
              </h2>

              {/* Shopify */}
              <div className="p-5 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-green-100 flex items-center justify-center text-[10px]">🛒</span>
                  Shopify
                </h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
                  <li>Go to <strong>Online Store → Themes → Edit code</strong></li>
                  <li>Open <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">theme.liquid</code></li>
                  <li>Paste the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">{'<script>'}</code> tag just before <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">{'</head>'}</code></li>
                  <li>Open your product template (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">sections/main-product.liquid</code>)</li>
                  <li>Add the div where you want the button:</li>
                </ol>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {'<div id="agalaz-tryon" data-garment="{{ product.featured_image | image_url: width: 800 }}"></div>'}
                </code>
                <p className="text-[10px] text-emerald-600 font-bold">
                  The widget also auto-detects Shopify product images — so even without data-garment, it usually works automatically.
                </p>
              </div>

              {/* WooCommerce */}
              <div className="p-5 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center text-[10px]">🔮</span>
                  WooCommerce (WordPress)
                </h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
                  <li>Install a plugin like <strong>&ldquo;Insert Headers and Footers&rdquo;</strong> (by WPCode)</li>
                  <li>Paste the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">{'<script>'}</code> tag in the Header section</li>
                  <li>To add the button, edit your product template or use a shortcode plugin to insert:</li>
                </ol>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {'<div id="agalaz-tryon"></div>'}
                </code>
                <p className="text-[10px] text-emerald-600 font-bold">
                  WooCommerce product images are auto-detected — no data-garment attribute needed.
                </p>
              </div>

              {/* PrestaShop / Magento / Other */}
              <div className="p-5 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-[10px]">🌐</span>
                  PrestaShop, Magento, Wix, or any other platform
                </h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
                  <li>Add the script tag to the global header/head of your store</li>
                  <li>On your product page template, add the div with <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">data-garment</code> pointing to the product image URL</li>
                  <li>Make sure the URL is a <strong>direct image link</strong> (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">https://cdn.store.com/product.jpg</code>), not a page URL</li>
                </ol>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  For platforms where the widget can&apos;t auto-detect images, the <code className="text-indigo-600">data-garment</code> attribute is required. The URL must return an actual image file (JPEG, PNG, or WebP) — not an HTML page.
                </p>
              </div>
            </div>

            {/* ── 4. HOW IT WORKS FOR YOUR CUSTOMERS ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '4' : '3'}</div>
                How it works for your customers
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { num: '1', title: 'See the button', desc: 'A "Try it on with AI" button appears on your product pages, next to the product image.' },
                  { num: '2', title: 'Upload a photo', desc: 'Your customer uploads a selfie, half body, or full body photo. Photos are never stored — zero data retention.' },
                  { num: '3', title: 'AI generates the result', desc: 'In ~10 seconds, our AI generates a photorealistic image of the customer wearing the product. 1 render credit is used.' },
                  { num: '4', title: 'Buy with confidence', desc: 'The customer sees exactly how the product looks on their real body. Fewer returns, higher conversion, happier customers.' },
                ].map((s, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-xl space-y-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-sm mx-auto">{s.num}</div>
                    <h4 className="font-black text-slate-900 text-xs">{s.title}</h4>
                    <p className="text-[10px] text-slate-400 font-light leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. WHAT CAN CUSTOMERS TRY ON ── */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '5' : '4'}</div>
                Supported items
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { item: 'Clothing', examples: 'Shirts, dresses, pants, jackets, coats, skirts' },
                  { item: 'Glasses', examples: 'Sunglasses, prescription frames, goggles' },
                  { item: 'Jewelry', examples: 'Necklaces, earrings, bracelets, rings, watches' },
                  { item: 'Headwear', examples: 'Hats, caps, beanies, headbands' },
                  { item: 'Shoes', examples: 'Sneakers, heels, boots, sandals' },
                  { item: 'Bags', examples: 'Handbags, backpacks, clutches' },
                  { item: 'Tattoos', examples: 'Temporary tattoos, body art designs' },
                  { item: 'Nail art', examples: 'Manicure styles, nail polish colors' },
                ].map((cat, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <h4 className="font-black text-slate-900 text-xs">{cat.item}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{cat.examples}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-300">
                The AI automatically detects what type of item is in the garment image and applies it to the correct body area.
              </p>
            </div>

            {/* ── 6. SECURITY & PRIVACY ── */}
            <div className="space-y-3">
              <h2 className="font-black text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{apiKey ? '6' : '5'}</div>
                Security & privacy
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Domain allowlisting', desc: 'Your API key only works from your registered domain. Requests from unauthorized domains are blocked automatically.' },
                  { title: 'Zero data retention', desc: 'Customer photos are processed in real-time and immediately discarded. We never store, log, or train on customer images.' },
                  { title: 'SHA-256 hashed keys', desc: 'Your API key is hashed before storage. Even if our database were compromised, your key cannot be recovered.' },
                ].map((s, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-xl space-y-2">
                    <Shield size={16} className="text-emerald-600" />
                    <h4 className="font-black text-slate-900 text-xs">{s.title}</h4>
                    <p className="text-[10px] text-slate-400 font-light leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── WHAT'S NEXT ── */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h3 className="font-black text-slate-900 text-sm">What happens next?</h3>
              <div className="space-y-3">
                {[
                  { status: 'now', label: 'Free trial active', desc: `You have ${partnerProfile?.credits_remaining || 5} renders to test the widget on your real store with real customers.` },
                  { status: 'soon', label: 'Trial ends', desc: 'When your 5 renders are used, the widget pauses and you\'ll see the option to subscribe.' },
                  { status: 'later', label: 'Choose a plan', desc: 'Starter (€150/mo, 200 renders) or Growth (€499/mo, 1,000 renders). No setup fee. Cancel anytime.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.status === 'now' ? 'bg-emerald-500' : item.status === 'soon' ? 'bg-amber-400' : 'bg-slate-300'
                    }`} />
                    <div>
                      <span className="text-xs font-black text-slate-900">{item.label}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── NEED HELP ── */}
            <div className="text-center space-y-2 pt-4">
              <p className="text-xs text-slate-400">
                Need help with the integration? Contact us at{' '}
                <a href="mailto:infoagalaz@gmail.com" className="text-indigo-600 font-bold hover:text-indigo-800">infoagalaz@gmail.com</a>
              </p>
              <Link href="/blog/virtual-dressing-room-online-free" className="text-[10px] text-indigo-500 font-bold hover:text-indigo-700 transition-colors inline-block">
                Learn more: What is a Virtual Dressing Room? →
              </Link>
            </div>
          </div>
        )}

        {/* ═══ STEP: PAYWALL — Trial ended, choose plan ═══ */}
        {step === 'paywall' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                <Zap size={32} className="text-amber-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">Trial ended</h1>
              <p className="text-slate-400 text-sm font-light">
                Your 5 free renders have been used. Choose a plan to continue.
              </p>
            </div>

            {/* Plan selection */}
            <div className="grid md:grid-cols-2 gap-6">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedPlan === plan.id
                      ? 'border-indigo-600 shadow-lg shadow-indigo-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="font-serif text-4xl font-black text-slate-900">{plan.price}</span>
                        <span className="text-slate-400 text-sm font-bold">&euro;/month</span>
                      </div>
                      <p className="text-xs text-emerald-600 font-bold mt-1">No setup fee</p>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check size={14} className="text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                      <li className="flex items-center gap-2 text-xs text-slate-400">
                        <ArrowRight size={14} className="text-slate-300 shrink-0" />
                        Extra: {plan.extra}&euro;/render
                      </li>
                    </ul>
                    <div className={`w-full py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all ${
                      selectedPlan === plan.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {selectedPlan === plan.id ? 'Selected' : 'Select'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-700 transition-colors inline-flex items-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Redirecting to Stripe...' : `Subscribe — ${PLANS.find(p => p.id === selectedPlan)?.price}€/month`}
                <ArrowRight size={16} />
              </button>
              <p className="text-[10px] text-slate-300 mt-3">Cancel anytime. No setup fee.</p>
            </div>
          </div>
        )}

        {/* ═══ STEP: SUBSCRIBED — Active plan ═══ */}
        {step === 'subscribed' && (
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">Plan active</h1>
              <p className="text-slate-400 text-sm font-light">
                {currentPlan?.name} — {partnerProfile?.credits_remaining} renders available
              </p>
            </div>

            {/* Integration instructions */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Globe size={16} className="text-indigo-600" />
                Integration
              </h2>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Widget script
                </span>
                <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                  {`<script src="https://agalaz.com/widget.js" data-api-key="${partnerProfile?.api_key_prefix || 'agz_live_'}..."></script>`}
                </code>
              </div>
            </div>

            {/* Usage */}
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    {currentPlan?.name} plan active
                  </span>
                  <p className="text-sm font-bold text-emerald-900 mt-1">
                    {partnerProfile?.credits_remaining} / {currentPlan?.renders} renders this month
                  </p>
                </div>
                <Check size={24} className="text-emerald-400" />
              </div>
              <div className="mt-3 h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all"
                  style={{ width: `${((partnerProfile?.credits_remaining || 0) / (currentPlan?.renders || 200)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
