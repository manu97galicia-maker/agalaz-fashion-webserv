'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Zap, Check, CreditCard, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function PaywallPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [plan, setPlan] = useState<'weekly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        router.push('/try-on');
      } else {
        setError(data.error || 'Error');
        setLoading(false);
      }
    } catch {
      setError('Connection error');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      <div className="animate-fade-in flex-1 px-8 pt-6 pb-8 max-w-lg mx-auto w-full flex flex-col">
        {/* Close */}
        <button
          onClick={() => router.back()}
          className="self-end p-2 bg-white/10 rounded-full mb-8 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Content */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-full w-fit">
            <Zap size={12} className="text-white fill-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              {t.paywall.badge}
            </span>
          </div>

          <h1
            className="text-5xl font-black text-white tracking-tight"
            style={{ lineHeight: 1.1 }}
          >
            {t.paywall.titleLine1}
            <br />
            <span className="text-indigo-400">{t.paywall.titleLine2}</span>
          </h1>

          <div className="space-y-5 py-6">
            {t.paywall.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-indigo-600/20 rounded-full flex items-center justify-center shrink-0">
                  <Check size={14} className="text-indigo-400" />
                </div>
                <span className="text-slate-300 font-bold">{feature}</span>
              </div>
            ))}
          </div>

          {/* Plan selector */}
          <div className="flex gap-3">
            <button
              onClick={() => setPlan('weekly')}
              className={`flex-1 p-4 rounded-2xl border-2 transition-colors text-center ${
                plan === 'weekly'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <p className="text-white font-black text-lg">$4.99</p>
              <p className="text-slate-400 text-xs font-bold">{t.paywall.perWeek}</p>
            </button>
            <button
              onClick={() => setPlan('yearly')}
              className={`flex-1 p-4 rounded-2xl border-2 transition-colors text-center relative ${
                plan === 'yearly'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="absolute -top-2 right-3 bg-emerald-500 px-2 py-0.5 rounded-full">
                <span className="text-[9px] font-black text-white uppercase">
                  {t.paywall.saveLabel}
                </span>
              </div>
              <p className="text-white font-black text-lg">$59.99</p>
              <p className="text-slate-400 text-xs font-bold">{t.paywall.perYear}</p>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-xs text-center mb-3">{error}</p>
        )}

        {/* Purchase */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-5 bg-indigo-600 rounded-[2rem] flex items-center justify-center gap-3 mb-4 hover:bg-indigo-500 transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={18} className="text-white animate-spin" />
          ) : (
            <CreditCard size={18} className="text-white" />
          )}
          <span className="text-white font-black uppercase tracking-widest text-xs">
            {t.paywall.ctaButton}
          </span>
        </button>
      </div>
    </main>
  );
}
