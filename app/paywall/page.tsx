'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Zap, Check, Shield, Crown } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { signInWithGoogle } from '@/services/authService';

import { useLang } from '@/components/LanguageProvider';

type Plan = 'weekly' | 'yearly';

export default function PaywallPage() {
  const router = useRouter();
  const { t, lang } = useLang();
  const en = lang === 'en';
  const [selected, setSelected] = useState<Plan>('yearly');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [hasUsedTrial, setHasUsedTrial] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    );
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || null);
        setUserId(user.id);
        // Check if user already had a trial (has subscription but no credits)
        fetch('/api/subscription').then(r => r.json()).then(status => {
          if (status.isPro && status.creditsRemaining <= 0) {
            setHasUsedTrial(true);
          }
        }).catch(() => {});
      }
    });

    // Track paywall view
    (window as any).datafast?.('paywall_view');
  }, []);

  const features = [
    t.payFeat1,
    t.payFeat2,
    t.payFeat3,
    t.payFeat4,
    t.payFeat5,
  ];

  const plans = {
    weekly: {
      price: '$4.99',
      period: en ? '/week' : '/semana',
      perDay: en ? '$0.71/day' : '0,71€/día',
      label: en ? 'Weekly' : 'Semanal',
      badge: null,
      cta: en ? 'Subscribe Now' : 'Suscribirse Ahora',
    },
    yearly: {
      price: '$59.99',
      period: en ? '/year' : '/año',
      perDay: en ? '$0.16/day' : '0,16€/día',
      label: en ? 'Yearly' : 'Anual',
      badge: en ? 'Save 77%' : 'Ahorra 77%',
      cta: en ? 'Get Yearly Access' : 'Acceder al Plan Anual',
    },
  };

  const activePlan = plans[selected];

  const handleSubscribe = async () => {
    if (!userId || !userEmail) {
      setShowLogin(true);
      return;
    }

    setLoading(true);
    // Track checkout initiation
    (window as any).datafast?.('initiate_checkout', { plan: selected });
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selected, email: userEmail, userId, skipTrial: hasUsedTrial }),
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
    <main className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="animate-fade-in-up flex-1 px-6 pt-4 pb-8 max-w-md mx-auto w-full flex flex-col relative z-10">
        {/* Close */}
        <button
          onClick={() => router.push('/try-on')}
          className="self-end p-2.5 glass rounded-full mb-4 hover:bg-white/10 transition-colors press-scale"
        >
          <X size={20} className="text-white/60" />
        </button>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full w-fit shadow-lg shadow-indigo-500/25">
            <Zap size={14} className="text-white fill-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              {t.auraPro}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black text-white tracking-tight leading-[1]">
            {hasUsedTrial
              ? (en ? 'Loved It?' : '¿Te ha gustado?')
              : (en ? 'See It On' : 'Pruébatelo')}
            <br />
            <span className="text-gradient italic">
              {hasUsedTrial
                ? (en ? 'Keep Going.' : 'Continúa.')
                : (en ? 'Before You Buy.' : 'Antes de Comprar.')}
            </span>
          </h1>
          <p className="text-white/40 text-sm font-light leading-relaxed">
            {hasUsedTrial
              ? (en
                ? 'Your free trial renders are used up. Subscribe now to get 14 renders per week and keep trying on.'
                : 'Tus renders de prueba se han agotado. Suscríbete ahora para obtener 14 renders por semana y seguir probándote ropa.')
              : (en
                ? '14 renders per week. Try on your clothes or any garment you want to buy, on your real body. Cancel anytime.'
                : '14 renders por semana. Pruébate tu ropa o cualquier prenda que quieras comprar, en tu cuerpo real. Cancela cuando quieras.')}
          </p>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 opacity-0 animate-fade-in"
                style={{ animationDelay: `${(i + 1) * 80}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-full flex items-center justify-center shrink-0 border border-indigo-500/20">
                  <Check size={12} className="text-indigo-400" />
                </div>
                <span className="text-white/60 font-bold text-[14px]">{feature}</span>
              </div>
            ))}
          </div>

          {/* Plan selector */}
          <div className="space-y-2.5 pt-2">
            {/* Yearly plan */}
            <button
              onClick={() => { setSelected('yearly'); (window as any).datafast?.('plan_select', { plan: 'yearly' }); }}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all press-scale ${
                selected === 'yearly'
                  ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border-2 border-indigo-500/50 ring-1 ring-indigo-500/20'
                  : 'glass border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === 'yearly' ? 'border-indigo-400 bg-indigo-500' : 'border-white/20'
                }`}>
                  {selected === 'yearly' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black text-[15px]">{plans.yearly.label}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 rounded-full border border-emerald-500/30 text-[8px] font-black text-emerald-400 uppercase tracking-widest">
                      {plans.yearly.badge}
                    </span>
                  </div>
                  <span className="text-white/25 text-[11px] font-bold">{plans.yearly.perDay}</span>
                  {!hasUsedTrial && (
                    <span className="text-emerald-400 text-[10px] font-black block mt-0.5">
                      {en ? 'Includes free trial' : 'Incluye prueba gratis'}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-white font-black text-lg">{plans.yearly.price}</span>
                <span className="text-white/30 text-xs font-bold">{plans.yearly.period}</span>
              </div>
            </button>

            {/* Weekly plan */}
            <button
              onClick={() => { setSelected('weekly'); (window as any).datafast?.('plan_select', { plan: 'weekly' }); }}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all press-scale ${
                selected === 'weekly'
                  ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border-2 border-indigo-500/50 ring-1 ring-indigo-500/20'
                  : 'glass border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === 'weekly' ? 'border-indigo-400 bg-indigo-500' : 'border-white/20'
                }`}>
                  {selected === 'weekly' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div className="text-left">
                  <span className="text-white font-black text-[15px]">{plans.weekly.label}</span>
                  <br />
                  <span className="text-white/25 text-[11px] font-bold">{plans.weekly.perDay}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white font-black text-lg">{plans.weekly.price}</span>
                <span className="text-white/30 text-xs font-bold">{plans.weekly.period}</span>
              </div>
            </button>
          </div>

        </div>

        {/* Purchase buttons */}
        <div className="space-y-3 mt-4">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all press-scale shadow-xl shadow-indigo-500/25 animate-glow disabled:opacity-50"
          >
            <Crown size={18} className="text-white" />
            <span className="text-white font-black uppercase tracking-widest text-xs">
              {loading ? (en ? 'Loading...' : 'Cargando...') : activePlan.cta}
            </span>
          </button>

          <p className="text-center text-emerald-400/70 text-[11px] font-black uppercase tracking-widest">
            {en ? '✓ Cancel anytime' : '✓ Cancela cuando quieras'}
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-1.5 press-scale py-2">
              <Shield size={12} className="text-white/15" />
              <span className="text-white/15 font-bold text-[11px]">{t.restorePurchase}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowLogin(false)}>
          <div className="bg-white mx-6 p-8 rounded-2xl max-w-sm w-full text-center space-y-6 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-serif font-black text-2xl italic">A</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-black text-slate-900 tracking-tight">
                {en ? 'Sign in first' : 'Inicia sesión'}
              </h3>
              <p className="text-slate-400 text-sm mt-2 font-light">
                {en ? 'Sign in to subscribe and start trying on' : 'Inicia sesión para suscribirte y empezar a probarte ropa'}
              </p>
            </div>
            <button
              onClick={async () => {
                try {
                  (window as any).datafast?.('signup_click', { provider: 'google', source: 'paywall' });
                  await signInWithGoogle();
                } catch {}
              }}
              className="w-full py-4 bg-slate-900 text-white rounded-lg flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors font-black uppercase tracking-[0.15em] text-xs"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {en ? 'Continue with Google' : 'Continuar con Google'}
            </button>
            <button
              onClick={() => setShowLogin(false)}
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
