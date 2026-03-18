'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Sparkles, Copy, Check, ArrowRight, Shield, Zap, Globe, Code2 } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 150,
    setup: 250,
    renders: 200,
    extra: '0,75',
    features: ['200 renders/mes', 'Widget personalizable', 'Soporte por email', 'Dashboard de uso'],
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 499,
    setup: 499,
    renders: 1000,
    extra: '0,50',
    features: ['1.000 renders/mes', 'Widget personalizable', 'Soporte prioritario', 'Dashboard + analytics', 'Dominios ilimitados', 'Onboarding call'],
    popular: true,
  },
];

interface PartnerProfile {
  id: string;
  store_name: string;
  plan: string;
  setup_paid: boolean;
  is_active: boolean;
  credits_remaining: number;
  api_key_prefix: string | null;
  has_api_key: boolean;
  has_subscription: boolean;
}

type FlowStep = 'loading' | 'login' | 'plans' | 'form' | 'setup_paid' | 'has_key' | 'subscribed';

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
  const [step, setStep] = useState<FlowStep>('loading');
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [formData, setFormData] = useState({ store_name: '', store_url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<PartnerProfile | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
  }

  // 1. Check auth state on mount
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
        setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || null);
        loadPartnerProfile(user.id);
      } else {
        setStep('login');
      }
    });
  }, []);

  // 2. Check URL params for post-payment redirects
  useEffect(() => {
    const activated = searchParams.get('activated');
    const subscribed = searchParams.get('subscribed');
    if ((activated === 'true' || subscribed === 'true') && userId) {
      loadPartnerProfile(userId);
    }
  }, [searchParams, userId]);

  // Load partner profile from API
  async function loadPartnerProfile(uid: string) {
    try {
      const res = await fetch(`/api/partners/profile?user_id=${uid}`);
      if (res.ok) {
        const data = await res.json();
        setPartnerProfile(data.partner);
        // Determine step based on profile state
        if (data.partner.has_subscription) {
          setStep('subscribed');
        } else if (data.partner.has_api_key) {
          setStep('has_key');
        } else if (data.partner.setup_paid) {
          setStep('setup_paid');
        } else {
          setStep('plans'); // Registered but hasn't paid setup
        }
      } else {
        setStep('plans'); // No partner record yet
      }
    } catch {
      setStep('plans');
    }
  }

  // Google login → redirect back to /partners
  async function handleLogin() {
    const supabase = getSupabase();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/partners` },
    });
  }

  // Register + redirect to Stripe for setup fee
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !userEmail) return;
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create partner account (inactive)
      const registerRes = await fetch('/api/partners/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          email: userEmail,
          store_name: formData.store_name,
          store_url: formData.store_url,
          plan: selectedPlan,
        }),
      });
      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      // 2. Redirect to Stripe for setup fee
      const checkoutRes = await fetch('/api/partners/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          partnerId: registerData.partner.id,
          email: userEmail,
        }),
      });
      const checkoutData = await checkoutRes.json();

      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      } else {
        setError(checkoutData.error || 'Failed to start checkout');
        setIsSubmitting(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  // Generate API key (after setup is paid)
  async function handleGetApiKey() {
    if (!partnerProfile) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/partners/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner_id: partnerProfile.id }),
      });
      const data = await res.json();

      if (res.ok) {
        setApiKey(data.api_key);
        setPartnerProfile({ ...partnerProfile, has_api_key: true, is_active: true, credits_remaining: 10 });
        setStep('has_key');
      } else {
        setError(data.error || 'Failed to generate API key');
      }
    } catch {
      setError('Something went wrong');
    }
    setIsSubmitting(false);
  }

  // Activate monthly subscription
  async function handleActivateSubscription() {
    if (!partnerProfile || !userEmail) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/partners/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: partnerProfile.plan,
          partnerId: partnerProfile.id,
          email: userEmail,
          action: 'activate',
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to start subscription checkout');
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

        {/* ═══ STEP: LOGIN ═══ */}
        {step === 'login' && (
          <>
            {/* Hero */}
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                <Sparkles size={14} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  Virtual Try-On API
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Add AI Try-On to<br />
                <span className="italic text-slate-400">your store</span>
              </h1>
              <p className="text-slate-500 text-sm font-light max-w-md mx-auto">
                Let your customers try on clothes virtually. 2 lines of code. Works on any platform.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: <Code2 size={20} />, title: '2 Lines of Code', desc: 'Paste our script + a div. That\'s it. Shopify, WooCommerce, or custom.' },
                { icon: <Shield size={20} />, title: 'Secure by Default', desc: 'Domain allowlisting, hashed API keys, rate limits. Zero data retention.' },
                { icon: <Zap size={20} />, title: '~10s Results', desc: 'AI generates photorealistic try-on images. Reduce returns, boost conversion.' },
              ].map((f, i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-3">
                  <div className="text-indigo-600">{f.icon}</div>
                  <h3 className="font-black text-slate-900 text-sm">{f.title}</h3>
                  <p className="text-slate-400 text-xs font-light">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Login CTA */}
            <div className="text-center">
              <button
                onClick={handleLogin}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors inline-flex items-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Acceder con Google
              </button>
              <p className="text-[10px] text-slate-300 mt-3 font-bold">
                Necesitas una cuenta para registrarte como partner
              </p>
            </div>
          </>
        )}

        {/* ═══ STEP: PLANS (logged in, no partner record or not paid) ═══ */}
        {step === 'plans' && (
          <>
            <div className="text-center space-y-4 mb-12">
              <h1 className="font-serif text-3xl font-black text-slate-900 tracking-tight">
                Elige tu plan
              </h1>
              <p className="text-slate-400 text-sm font-light">
                Paga el setup fee y recibe 10 renders de prueba gratis.
              </p>
            </div>

            {/* Pricing cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
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
                        <span className="font-serif text-4xl font-black text-slate-900">{plan.setup}</span>
                        <span className="text-slate-400 text-sm font-bold">&euro; setup</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Incluye implantación + 10 renders de prueba gratis
                      </p>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-500">
                          Después: <span className="font-black text-slate-900">{plan.price}&euro;/mes</span> por {plan.renders} renders/mes
                        </p>
                        <p className="text-[10px] text-slate-300 mt-0.5">
                          Extra: {plan.extra}&euro;/render adicional
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check size={14} className="text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className={`w-full py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all ${
                      selectedPlan === plan.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep('form')}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors inline-flex items-center gap-2"
              >
                Continuar con {PLANS.find(p => p.id === selectedPlan)?.name}
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* ═══ STEP: FORM (fill store details + pay setup) ═══ */}
        {step === 'form' && (
          <div className="max-w-md mx-auto">
            <div className="border border-slate-200 rounded-2xl p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                    {PLANS.find(p => p.id === selectedPlan)?.name} — Setup {PLANS.find(p => p.id === selectedPlan)?.setup}&euro;
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-black text-slate-900">Datos de tu tienda</h2>
                <p className="text-slate-400 text-xs font-light">
                  Registrado como <span className="font-bold text-slate-600">{userEmail}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre de la tienda</label>
                  <input
                    type="text"
                    required
                    value={formData.store_name}
                    onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                    className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
                    placeholder="Mi Tienda de Moda"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL de la tienda</label>
                  <input
                    type="text"
                    required
                    value={formData.store_url}
                    onChange={(e) => setFormData({ ...formData, store_url: e.target.value })}
                    className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
                    placeholder="https://mitienda.com"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando...' : `Registrar y pagar setup (${PLANS.find(p => p.id === selectedPlan)?.setup}\u20AC)`}
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setStep('plans')}
                  className="w-full text-center text-[10px] font-bold text-slate-300 hover:text-slate-500 transition-colors"
                >
                  Volver a los planes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ═══ STEP: SETUP PAID — Show "Get API Key" button ═══ */}
        {step === 'setup_paid' && (
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">Setup completado</h1>
              <p className="text-slate-400 text-sm font-light">
                Plan <span className="font-bold text-slate-600">{currentPlan?.name}</span> — setup pagado correctamente.
              </p>
            </div>

            <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4 text-center">
              <Sparkles size={32} className="text-indigo-400 mx-auto" />
              <h2 className="font-serif text-xl font-black text-slate-900">Genera tu API Key</h2>
              <p className="text-xs text-indigo-700 font-light">
                Al generar tu API key recibirás <span className="font-bold">10 renders de prueba gratis</span> para testear el widget en tu tienda.
              </p>

              {error && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleGetApiKey}
                disabled={isSubmitting}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Generando...' : 'Obtener API Key + 10 renders gratis'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ═══ STEP: HAS KEY — Show API key + integration + activate monthly ═══ */}
        {(step === 'has_key' || step === 'subscribed') && (
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">
                {step === 'subscribed' ? 'Plan activo' : 'Tu cuenta está lista'}
              </h1>
              <p className="text-slate-400 text-sm font-light">
                {step === 'subscribed'
                  ? `Plan ${currentPlan?.name} — ${partnerProfile?.credits_remaining} renders disponibles`
                  : `${partnerProfile?.credits_remaining || 10} renders de prueba disponibles`
                }
              </p>
            </div>

            {/* API Key — only shown when just generated */}
            {apiKey && (
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-amber-600" />
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                    Tu API Key — guárdala ahora
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
                <p className="text-[11px] text-amber-600 font-bold">
                  Esta key solo se muestra una vez. Si la pierdes, tendrás que generar una nueva.
                </p>
              </div>
            )}

            {/* Integration instructions */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Globe size={16} className="text-indigo-600" />
                Integración (2 pasos)
              </h2>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Paso 1 — Pega en {'<head>'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(`<script src="https://agalaz.com/widget.js" data-api-key="${apiKey || partnerProfile?.api_key_prefix + '...'}"></script>`, 'script')}
                      className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                    >
                      {copied === 'script' ? <Check size={12} /> : <Copy size={12} />}
                      {copied === 'script' ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                    {`<script src="https://agalaz.com/widget.js" data-api-key="${apiKey || partnerProfile?.api_key_prefix + '...'}"></script>`}
                  </code>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Paso 2 — Coloca en la página de producto
                    </span>
                    <button
                      onClick={() => copyToClipboard('<div id="agalaz-tryon" data-garment="URL_IMAGEN_PRODUCTO"></div>', 'div')}
                      className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                    >
                      {copied === 'div' ? <Check size={12} /> : <Copy size={12} />}
                      {copied === 'div' ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                    {'<div id="agalaz-tryon" data-garment="URL_IMAGEN_PRODUCTO"></div>'}
                  </code>
                  <p className="text-[10px] text-slate-400">
                    En Shopify: <code className="text-indigo-600">{'{{ product.featured_image | img_url }}'}</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Activate monthly subscription (only if not already subscribed) */}
            {step === 'has_key' && (
              <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                      Prueba gratuita
                    </span>
                    <p className="text-sm font-bold text-indigo-900 mt-1">
                      {partnerProfile?.credits_remaining || 0} renders restantes
                    </p>
                  </div>
                  <Zap size={24} className="text-indigo-300" />
                </div>
                <div className="h-px bg-indigo-200" />
                <div>
                  <p className="text-xs text-indigo-700 font-light mb-3">
                    Activa el plan mensual para obtener {currentPlan?.renders} renders/mes con recarga automática.
                  </p>
                  <button
                    onClick={handleActivateSubscription}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Redirigiendo...' : `Activar plan ${currentPlan?.name} — ${currentPlan?.price}\u20AC/mes`}
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[10px] text-indigo-400 mt-2 text-center">
                    Puedes probar primero con los renders gratis.
                  </p>
                </div>
              </div>
            )}

            {/* Already subscribed */}
            {step === 'subscribed' && (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                      Plan {currentPlan?.name} activo
                    </span>
                    <p className="text-sm font-bold text-emerald-900 mt-1">
                      {partnerProfile?.credits_remaining} / {currentPlan?.renders} renders este mes
                    </p>
                  </div>
                  <Check size={24} className="text-emerald-400" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
