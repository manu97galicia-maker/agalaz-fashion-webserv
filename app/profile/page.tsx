'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Star,
  Crown,
  Settings,
  Loader2,
} from 'lucide-react';
import { onAuthStateChange, type AppUser } from '@/services/authService';
import { useSubscription } from '@/lib/useSubscription';
import { useLang } from '@/components/LanguageProvider';

export default function ProfilePage() {
  const router = useRouter();
  const { t, lang } = useLang();
  const { isPro, plan, creditsRemaining, loading } = useSubscription();

  const [user, setUser] = useState<AppUser | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((authUser) => {
      if (authUser) setUser(authUser);
      else router.push('/');
    });
    return () => subscription.unsubscribe();
  }, [router]);

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {}
    setLoadingPortal(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="glass-dark px-5 py-3 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/try-on')}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors press-scale"
          >
            <ChevronLeft size={22} className="text-white/60" />
          </button>
          <h1 className="text-sm font-black tracking-tight text-white">{t.profileTitle}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 hide-scrollbar">
        <div className="max-w-md mx-auto space-y-6">
          {/* User Card */}
          <div className="glass rounded-3xl p-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-indigo-500/30">
                <img
                  src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-black text-white tracking-tight">{user.name}</h2>
                <p className="text-xs text-white/30 font-medium">{user.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {isPro ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-500/20 rounded-full">
                      <Crown size={10} className="text-indigo-400" />
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                        Pro {plan === 'yearly' ? '(Yearly)' : '(Weekly)'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded-full">
                      <Star size={10} className="text-white/40" />
                      <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
                        {t.free}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Credits */}
            <div className="mt-5">
              <div className="glass rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-white">{loading ? '—' : creditsRemaining}</p>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{t.credits}</p>
              </div>
            </div>

            {/* Manage Subscription */}
            {isPro && (
              <button
                onClick={handleManageSubscription}
                disabled={loadingPortal}
                className="w-full mt-4 py-3 glass rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors press-scale"
              >
                {loadingPortal ? (
                  <Loader2 size={14} className="text-white/40 animate-spin" />
                ) : (
                  <Settings size={14} className="text-white/40" />
                )}
                <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">
                  {lang === 'es' ? 'Gestionar suscripción' : 'Manage Subscription'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
