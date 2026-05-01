'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Check, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { signInWithGoogle, signInWithOtp } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';

type Plan = 'test' | 'popular';

export default function PaywallPage() {
  const router = useRouter();
  const { t, lang } = useLang();
  const en = lang === 'en';
  const [selected, setSelected] = useState<Plan>('test');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [fromCategory, setFromCategory] = useState<string | null>(null);

  async function handleLoginOtp() {
    if (!otpEmail || !otpEmail.includes('@')) return;
    try {
      (window as any).datafast?.('signup_click', { provider: 'email', source: 'paywall' });
      await signInWithOtp(otpEmail, '/paywall');
      setOtpSent(true);
    } catch {}
  }

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    );
    // Initial hydration
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || null);
        setUserId(user.id);
      }
      setAuthChecked(true);
    });
    // Keep state in sync (handles login completing while paywall is open)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUserEmail(session.user.email || null);
        setUserId(session.user.id);
        setShowLogin(false);
      } else {
        setUserEmail(null);
        setUserId(null);
      }
      setAuthChecked(true);
    });
    (window as any).datafast?.('paywall_view');
    // Read category from landing page redirect
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    if (from) setFromCategory(from);
    return () => subscription.unsubscribe();
  }, []);

  const features = en
    ? ['Credits never expire', 'Clothing, glasses, jewelry, tattoos & more', 'AI chat to adjust size, color, fit', 'Download & share your renders', 'Buy again anytime — no subscription']
    : ['Créditos sin caducidad', 'Ropa, gafas, joyería, tatuajes y más', 'Chat IA para ajustar talla, color, ajuste', 'Descarga y comparte tus renders', 'Vuelve a comprar cuando quieras — sin suscripción'];

  const plans = {
    test: {
      price: '0,99',
      currency: '$',
      label: en ? 'Starter' : 'Starter',
      renders: en ? '1 render + 1 FREE 🎁' : '1 render + 1 GRATIS 🎁',
      sub: en ? 'Start for less than $1' : 'Empieza por menos de $1',
    },
    popular: {
      price: '4,99',
      currency: '$',
      label: en ? 'Pack 12' : 'Pack 12',
      renders: en ? '12 renders' : '12 renders',
      sub: en ? 'Cheaper per render — save 58%' : 'Más barato por render — ahorra 58%',
    },
  };

  const handleSubscribe = async () => {
    if (!authChecked) return;
    if (!userId || !userEmail) {
      setShowLogin(true);
      return;
    }
    setLoading(true);
    (window as any).datafast?.('initiate_checkout', { plan: selected });
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selected, email: userEmail, userId, fromCategory }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-12 md:py-20">
        <>
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Agalaz
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-[0.9]">
            {en ? 'Try It' : 'Pruébatelo'}
            {' '}
            <span className="italic text-slate-400">
              {en ? 'On You.' : 'Todo.'}
            </span>
          </h1>
          <p className="text-slate-500 mt-6 max-w-md mx-auto text-sm font-light leading-relaxed">
            {en
              ? 'Clothing, glasses, jewelry, tattoos — see how anything looks on your real body before you buy. One-time purchase, no subscription.'
              : 'Ropa, gafas, joyería, tatuajes — mira cómo te queda cualquier cosa en tu cuerpo real antes de comprar. Pago único, sin suscripción.'}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-slate-600 font-bold text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Plan selector — Test featured (low-friction entry) */}
        <div className="space-y-3 mb-8">
          {/* Test (featured) */}
          <button
            onClick={() => { setSelected('test'); (window as any).datafast?.('plan_select', { plan: 'test' }); }}
            className={`relative w-full p-5 rounded-xl flex items-center justify-between transition-all ${
              selected === 'test'
                ? 'bg-slate-900 text-white shadow-lg ring-2 ring-indigo-400'
                : 'bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-400 hover:border-indigo-500 shadow-md'
            }`}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow">
              {en ? 'Most Popular' : 'Más Popular'}
            </div>
            <div className="absolute -top-2 -right-2 px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md rotate-3">
              {en ? '🎁 +1 FREE' : '🎁 +1 GRATIS'}
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === 'test' ? 'border-indigo-400 bg-indigo-500' : 'border-indigo-400'
              }`}>
                {selected === 'test' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="text-left">
                <span className={`font-black text-[15px] ${selected === 'test' ? 'text-white' : 'text-slate-900'}`}>
                  {plans.test.label}
                </span>
                <br />
                <span className={`text-[11px] font-bold ${selected === 'test' ? 'text-white/60' : 'text-indigo-600'}`}>
                  {plans.test.renders}
                </span>
                <span className={`text-[10px] block mt-0.5 ${selected === 'test' ? 'text-white/40' : 'text-slate-400'}`}>
                  {plans.test.sub}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-black text-xl ${selected === 'test' ? 'text-white' : 'text-slate-900'}`}>
                {plans.test.currency}{plans.test.price}
              </span>
              <span className={`block text-[10px] font-bold ${selected === 'test' ? 'text-white/40' : 'text-slate-400'}`}>
                {en ? 'one-time' : 'pago único'}
              </span>
            </div>
          </button>

          {/* Popular (secondary — better per-render value) */}
          <button
            onClick={() => { setSelected('popular'); (window as any).datafast?.('plan_select', { plan: 'popular' }); }}
            className={`w-full p-5 rounded-xl flex items-center justify-between transition-all ${
              selected === 'popular'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === 'popular' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-300'
              }`}>
                {selected === 'popular' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="text-left">
                <span className={`font-black text-[15px] ${selected === 'popular' ? 'text-white' : 'text-slate-900'}`}>
                  {plans.popular.label}
                </span>
                <br />
                <span className={`text-[11px] font-bold ${selected === 'popular' ? 'text-white/40' : 'text-slate-400'}`}>
                  {plans.popular.renders} &middot; {plans.popular.sub}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-black text-xl ${selected === 'popular' ? 'text-white' : 'text-slate-900'}`}>
                {plans.popular.currency}{plans.popular.price}
              </span>
              <span className={`block text-[10px] font-bold ${selected === 'popular' ? 'text-white/40' : 'text-slate-400'}`}>
                {en ? 'one-time' : 'pago único'}
              </span>
            </div>
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubscribe}
          disabled={loading || !authChecked}
          className="w-full py-4 min-h-[56px] bg-slate-900 text-white flex items-center justify-center gap-3 hover:bg-indigo-600 active:bg-indigo-700 transition-all font-black uppercase tracking-[0.2em] text-xs md:text-sm disabled:opacity-50"
        >
          {loading || !authChecked ? (
            <span>{en ? 'Loading...' : 'Cargando...'}</span>
          ) : (
            <>
              <Sparkles size={16} />
              {en ? 'Buy Now' : 'Comprar Ahora'}
              <ArrowRight size={14} />
            </>
          )}
        </button>

        {/* Trust signals */}
        <div className="mt-4 space-y-2 text-center">
          <p className="text-slate-400 text-[11px] font-bold">
            {en ? 'One-time payment · Credits never expire · Secure via Stripe' : 'Pago único · Créditos sin caducidad · Seguro con Stripe'}
          </p>
          <div className="flex items-center justify-center gap-4 pt-1">
            <button className="flex items-center gap-1.5 py-2">
              <Shield size={12} className="text-slate-300" />
              <span className="text-slate-300 font-bold text-[11px]">{t.restorePurchase}</span>
            </button>
          </div>
        </div>
        </>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowLogin(false)}>
          <div className="bg-white mx-4 md:mx-6 p-5 md:p-8 rounded-2xl max-w-sm w-full text-center space-y-5 md:space-y-6 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-slate-900 flex items-center justify-center mx-auto">
              <span className="text-white font-serif font-black text-2xl italic">A</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-black text-slate-900 tracking-tight">
                {en ? 'Sign in first' : 'Inicia sesión'}
              </h3>
              <p className="text-slate-400 text-sm mt-2 font-light">
                {en ? 'Sign in to start your free trial' : 'Inicia sesión para empezar tu prueba gratis'}
              </p>
            </div>
            <button
              onClick={async () => {
                try {
                  (window as any).datafast?.('signup_click', { provider: 'google', source: 'paywall' });
                  await signInWithGoogle('/paywall');
                } catch {}
              }}
              className="w-full py-4 bg-slate-900 text-white flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors font-black uppercase tracking-[0.15em] text-xs"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {en ? 'Continue with Google' : 'Continuar con Google'}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">{en ? 'or' : 'o'}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {otpSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-bold text-emerald-600">
                  {en ? 'Check your inbox' : 'Revisa tu correo'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {en ? 'We sent you a magic link. Click it to sign in.' : 'Te enviamos un enlace mágico. Haz clic para entrar.'}
                </p>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={otpEmail}
                  onChange={(e) => setOtpEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLoginOtp(); }}
                  placeholder={en ? 'your@email.com' : 'tu@email.com'}
                  className="flex-1 px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleLoginOtp}
                  className="px-4 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-colors shrink-0"
                >
                  {en ? 'Send' : 'Enviar'}
                </button>
              </div>
            )}

            <button
              onClick={() => { setShowLogin(false); setOtpSent(false); setOtpEmail(''); }}
              className="text-slate-300 text-xs font-bold hover:text-slate-500 transition-colors"
            >
              {en ? 'Cancel' : 'Cancelar'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
