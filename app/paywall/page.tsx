'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Check, Sparkles, Shield, Gift, Copy, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useSubscription } from '@/lib/useSubscription';
import { createBrowserClient } from '@supabase/ssr';

const PAYMENT_LINKS = {
  yearly: 'https://buy.stripe.com/dRm4gz00mgQwb099ONfYY0f',
  weekly: 'https://buy.stripe.com/bJe6oHfZkeIogkt4utfYY0g',
};

export default function PaywallPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [plan, setPlan] = useState<'weekly' | 'yearly'>('yearly');
  const [userId, setUserId] = useState<string | null>(null);
  const [referralInput, setReferralInput] = useState('');
  const [referralStatus, setReferralStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referralError, setReferralError] = useState('');
  const { isPro, loading: subLoading } = useSubscription();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, []);

  useEffect(() => {
    if (!subLoading && isPro) {
      router.replace('/try-on');
    }
  }, [subLoading, isPro, router]);

  const handleCheckout = () => {
    const url = new URL(PAYMENT_LINKS[plan]);
    if (userId) {
      url.searchParams.set('client_reference_id', userId);
    }
    window.location.href = url.toString();
  };

  const handleApplyReferral = async () => {
    if (!referralInput.trim()) return;
    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: referralInput.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setReferralStatus('success');
      } else {
        setReferralStatus('error');
        if (data.error === 'INVALID_CODE') setReferralError(t.referral.invalidCode);
        else if (data.error === 'SELF_REFERRAL') setReferralError(t.referral.selfReferral);
        else if (data.error === 'ALREADY_REFERRED') setReferralError(t.referral.alreadyReferred);
        else setReferralError(data.error || 'Error');
      }
    } catch {
      setReferralStatus('error');
      setReferralError('Error');
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <button
        onClick={() => router.back()}
        className="fixed top-6 right-6 p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer z-10"
      >
        <X size={18} className="text-slate-400" />
      </button>

      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full">
            <Sparkles size={12} className="text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              {t.paywall.badge}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1
            className="font-serif text-5xl md:text-6xl font-black text-slate-900 tracking-tight"
            style={{ lineHeight: 1.05 }}
          >
            {t.paywall.titleLine1}
            <br />
            <span className="italic text-indigo-600">{t.paywall.titleLine2}</span>
          </h1>
          <p className="text-slate-500 text-sm font-light max-w-xs mx-auto">
            {t.paywall.subtitle}
          </p>
        </div>

        {/* Plan selector */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPlan('weekly')}
            className={`p-5 rounded-2xl border-2 transition-all text-center cursor-pointer ${
              plan === 'weekly'
                ? 'border-slate-900 bg-slate-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {t.paywall.weeklyLabel}
            </p>
            <p className="text-slate-900 font-black text-2xl">$4.99</p>
            <p className="text-slate-400 text-xs font-medium mt-1">{t.paywall.perWeek}</p>
            <div className="mt-2 bg-slate-100 rounded-full px-3 py-1">
              <span className="text-[9px] font-bold text-slate-500">{t.paywall.weeklyCredits}</span>
            </div>
          </button>
          <button
            onClick={() => setPlan('yearly')}
            className={`p-5 rounded-2xl border-2 transition-all text-center relative cursor-pointer ${
              plan === 'yearly'
                ? 'border-indigo-600 bg-indigo-50/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-indigo-600 px-3 py-0.5 rounded-full">
              <span className="text-[9px] font-black text-white uppercase tracking-wide">
                {t.paywall.saveLabel}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {t.paywall.yearlyLabel}
            </p>
            <p className="text-slate-900 font-black text-2xl">$59.99</p>
            <p className="text-slate-400 text-xs font-medium mt-1">{t.paywall.perYear}</p>
            <div className="mt-2 bg-emerald-50 rounded-full px-3 py-1">
              <span className="text-[10px] font-bold text-emerald-600">{t.paywall.freeTrial}</span>
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="space-y-3 py-2">
          {t.paywall.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                <Check size={12} className="text-indigo-600" />
              </div>
              <span className="text-slate-600 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Referral code input */}
        <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Gift size={16} className="text-indigo-600" />
            <span className="text-xs font-bold text-slate-700">{t.referral.title}</span>
          </div>
          <p className="text-[11px] text-slate-400 font-light">{t.referral.subtitle}</p>
          <div className="flex gap-2">
            <input
              value={referralInput}
              onChange={(e) => { setReferralInput(e.target.value.toUpperCase()); setReferralStatus('idle'); }}
              placeholder={t.referral.codePlaceholder}
              className="flex-1 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-50 rounded-xl border border-slate-200 outline-none uppercase tracking-wider placeholder:text-slate-300 placeholder:normal-case"
              maxLength={8}
              disabled={referralStatus === 'success'}
            />
            <button
              onClick={handleApplyReferral}
              disabled={!referralInput.trim() || referralStatus === 'success'}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                referralStatus === 'success'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {referralStatus === 'success' ? <CheckCircle size={16} /> : t.referral.apply}
            </button>
          </div>
          {referralStatus === 'success' && (
            <p className="text-[11px] text-emerald-600 font-bold">{t.referral.applied}</p>
          )}
          {referralStatus === 'error' && (
            <p className="text-[11px] text-red-500 font-bold">{referralError}</p>
          )}
          <div className="text-[10px] text-slate-400 space-y-1">
            <p>{t.referral.bonusWeekly}</p>
            <p>{t.referral.bonusYearly}</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCheckout}
          className="w-full py-5 bg-slate-900 rounded-full flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="text-white font-black uppercase tracking-widest text-xs">
            {t.paywall.ctaButton}
          </span>
        </button>

        {/* Guarantee */}
        <div className="flex items-center justify-center gap-2">
          <Shield size={14} className="text-slate-300" />
          <p className="text-slate-400 text-xs font-light">{t.paywall.guarantee}</p>
        </div>
      </div>
    </main>
  );
}
