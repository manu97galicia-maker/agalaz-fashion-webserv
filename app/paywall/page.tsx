'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Check, Shield, Sparkles, ArrowRight, Gift } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { signInWithGoogle } from '@/services/authService';
import { useLang } from '@/components/LanguageProvider';

type Plan = 'weekly' | 'yearly' | 'credits20';

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
  const [checkingTrial, setCheckingTrial] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    );
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || null);
        setUserId(user.id);
        fetch('/api/subscription').then(r => r.json()).then(status => {
          if (status.isPro && status.creditsRemaining <= 0) {
            setHasUsedTrial(true);
          }
        }).catch(() => {}).finally(() => setCheckingTrial(false));
      } else {
        setCheckingTrial(false);
      }
    });
    (window as any).datafast?.('paywall_view');
  }, []);

  const features = en
    ? ['14 renders per week', 'Clothing, glasses, jewelry, tattoos & more', 'AI chat to adjust size, color, fit', 'Download & share your renders', 'Cancel anytime — no commitment']
    : ['14 renders por semana', 'Ropa, gafas, joyería, tatuajes y más', 'Chat IA para ajustar talla, color, ajuste', 'Descarga y comparte tus renders', 'Cancela cuando quieras — sin compromiso'];

  const plans = {
    weekly: {
      price: '4,99',
      period: en ? '/week' : '/semana',
      perDay: en ? '$0.71/day' : '0,71€/día',
      label: en ? 'Weekly' : 'Semanal',
      renders: en ? '14 renders/week' : '14 renders/semana',
    },
    yearly: {
      price: '59,99',
      period: en ? '/year' : '/año',
      perDay: en ? '$0.16/day' : '0,16€/día',
      label: en ? 'Yearly' : 'Anual',
      renders: en ? '14 renders/week' : '14 renders/semana',
    },
  };

  const handleSubscribe = async () => {
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
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
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
        {checkingTrial ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-slate-400 text-sm font-bold">{en ? 'Loading...' : 'Cargando...'}</div>
          </div>
        ) : (
        <>
        {/* Free Trial Banner — only for yearly plan, if they haven't used it */}
        {!hasUsedTrial && selected === 'yearly' && (
          <div className="mb-10 p-5 bg-gradient-to-r from-emerald-50 to-indigo-50 border-2 border-emerald-200 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Gift size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wide">
                  {en ? 'Free Trial Included' : 'Prueba Gratis Incluida'}
                </h3>
                <p className="text-emerald-600 text-xs font-bold">
                  {en ? '1 day free + 2 renders — you won\'t be charged today' : '1 día gratis + 2 renders — no se te cobra hoy'}
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-xs font-light leading-relaxed mt-2">
              {en
                ? 'Choose the yearly plan and get 1 day free with 2 renders. Your card is required but won\'t be charged today. If you don\'t cancel within 24h, the yearly plan activates automatically.'
                : 'Elige el plan anual y prueba 1 día gratis con 2 renders. Introduces tu tarjeta pero no se te cobra hoy. Si no cancelas en 24h, se activa el plan anual automáticamente.'}
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Agalaz Pro
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-[0.9]">
            {hasUsedTrial
              ? (en ? 'Keep' : 'Sigue')
              : (en ? 'Try It' : 'Pruébatelo')}
            {' '}
            <span className="italic text-slate-400">
              {hasUsedTrial
                ? (en ? 'Going.' : 'Probando.')
                : (en ? 'On You.' : 'Todo.')}
            </span>
          </h1>
          <p className="text-slate-500 mt-6 max-w-md mx-auto text-sm font-light leading-relaxed">
            {hasUsedTrial
              ? (en
                ? 'Your free trial renders are used up. Subscribe to keep trying on unlimited styles.'
                : 'Tus renders de prueba se han agotado. Suscríbete para seguir probándote estilos sin límite.')
              : (en
                ? 'Clothing, glasses, jewelry, tattoos — see how anything looks on your real body before you buy.'
                : 'Ropa, gafas, joyería, tatuajes — mira cómo te queda cualquier cosa en tu cuerpo real antes de comprar.')}
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

        {/* Plan selector */}
        <div className="space-y-3 mb-8">
          {/* Yearly */}
          <button
            onClick={() => { setSelected('yearly'); (window as any).datafast?.('plan_select', { plan: 'yearly' }); }}
            className={`w-full p-5 rounded-xl flex items-center justify-between transition-all ${
              selected === 'yearly'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === 'yearly' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-300'
              }`}>
                {selected === 'yearly' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className={`font-black text-[15px] ${selected === 'yearly' ? 'text-white' : 'text-slate-900'}`}>
                    {plans.yearly.label}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                    {en ? 'Save 77%' : 'Ahorra 77%'}
                  </span>
                </div>
                <span className={`text-[11px] font-bold ${selected === 'yearly' ? 'text-white/40' : 'text-slate-400'}`}>
                  {plans.yearly.renders} &middot; {plans.yearly.perDay}
                </span>
                {!hasUsedTrial && (
                  <span className={`text-[10px] font-black block mt-0.5 ${selected === 'yearly' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {en ? '+ 1 day free trial (2 renders)' : '+ 1 día de prueba gratis (2 renders)'}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className={`font-black text-xl ${selected === 'yearly' ? 'text-white' : 'text-slate-900'}`}>
                {plans.yearly.price}&euro;
              </span>
              <span className={`text-xs font-bold ${selected === 'yearly' ? 'text-white/30' : 'text-slate-400'}`}>
                {plans.yearly.period}
              </span>
            </div>
          </button>

          {/* Weekly */}
          <button
            onClick={() => { setSelected('weekly'); (window as any).datafast?.('plan_select', { plan: 'weekly' }); }}
            className={`w-full p-5 rounded-xl flex items-center justify-between transition-all ${
              selected === 'weekly'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === 'weekly' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-300'
              }`}>
                {selected === 'weekly' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="text-left">
                <span className={`font-black text-[15px] ${selected === 'weekly' ? 'text-white' : 'text-slate-900'}`}>
                  {plans.weekly.label}
                </span>
                <br />
                <span className={`text-[11px] font-bold ${selected === 'weekly' ? 'text-white/40' : 'text-slate-400'}`}>
                  {plans.weekly.renders} &middot; {plans.weekly.perDay}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-black text-xl ${selected === 'weekly' ? 'text-white' : 'text-slate-900'}`}>
                {plans.weekly.price}&euro;
              </span>
              <span className={`text-xs font-bold ${selected === 'weekly' ? 'text-white/30' : 'text-slate-400'}`}>
                {plans.weekly.period}
              </span>
            </div>
          </button>

          {/* Credit Pack */}
          <button
            onClick={() => { setSelected('credits20'); (window as any).datafast?.('plan_select', { plan: 'credits20' }); }}
            className={`w-full p-5 rounded-xl flex items-center justify-between transition-all ${
              selected === 'credits20'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === 'credits20' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-300'
              }`}>
                {selected === 'credits20' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className={`font-black text-[15px] ${selected === 'credits20' ? 'text-white' : 'text-slate-900'}`}>
                    {en ? '20 Credits Pack' : 'Pack 20 Créditos'}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                    {en ? 'One-time' : 'Pago único'}
                  </span>
                </div>
                <span className={`text-[11px] font-bold ${selected === 'credits20' ? 'text-white/40' : 'text-slate-400'}`}>
                  {en ? '20 renders · no subscription' : '20 renders · sin suscripción'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-black text-xl ${selected === 'credits20' ? 'text-white' : 'text-slate-900'}`}>
                9,99&euro;
              </span>
            </div>
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-4 bg-slate-900 text-white flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all font-black uppercase tracking-[0.2em] text-xs disabled:opacity-50"
        >
          {loading ? (
            <span>{en ? 'Loading...' : 'Cargando...'}</span>
          ) : (
            <>
              <Sparkles size={16} />
              {!hasUsedTrial && selected === 'yearly'
                ? (en ? 'Start Free Trial' : 'Empezar Prueba Gratis')
                : (en ? 'Subscribe Now' : 'Suscribirse Ahora')}
              <ArrowRight size={14} />
            </>
          )}
        </button>

        {/* Trust signals */}
        <div className="mt-4 space-y-2 text-center">
          {!hasUsedTrial && selected === 'yearly' && (
            <p className="text-emerald-600 text-[11px] font-black uppercase tracking-widest">
              {en ? '0€ today — 1 day free trial with 2 renders' : '0€ hoy — 1 día de prueba gratis con 2 renders'}
            </p>
          )}
          <p className="text-slate-400 text-[11px] font-bold">
            {en ? 'Cancel anytime · Secure payment via Stripe' : 'Cancela cuando quieras · Pago seguro con Stripe'}
          </p>
          <div className="flex items-center justify-center gap-4 pt-1">
            <button className="flex items-center gap-1.5 py-2">
              <Shield size={12} className="text-slate-300" />
              <span className="text-slate-300 font-bold text-[11px]">{t.restorePurchase}</span>
            </button>
          </div>
        </div>
        </>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowLogin(false)}>
          <div className="bg-white mx-6 p-8 rounded-2xl max-w-sm w-full text-center space-y-6 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
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
                  await signInWithGoogle();
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
