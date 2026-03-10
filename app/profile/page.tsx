'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Star,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  Link2,
  Crown,
  Sparkles,
  X,
  Download,
  Share2,
  Settings,
  Loader2,
} from 'lucide-react';
import { onAuthStateChange, type AppUser } from '@/services/authService';
import { useSubscription } from '@/lib/useSubscription';
import { useLang } from '@/components/LanguageProvider';

interface GalleryImage {
  id: string;
  dataUrl: string;
  createdAt: number;
}

function getGallery(): GalleryImage[] {
  try {
    const raw = localStorage.getItem('agalaz-gallery');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function removeFromGallery(id: string) {
  const gallery = getGallery().filter((img) => img.id !== id);
  localStorage.setItem('agalaz-gallery', JSON.stringify(gallery));
  return gallery;
}

export default function ProfilePage() {
  const router = useRouter();
  const { t, lang } = useLang();
  const { isPro, plan, creditsRemaining, referralCode, loading } = useSubscription();

  const [user, setUser] = useState<AppUser | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [copied, setCopied] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((authUser) => {
      if (authUser) setUser(authUser);
      else router.push('/');
    });
    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    setGallery(getGallery());
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://agalaz.com';
  const referralLink = referralCode ? `${origin}?ref=${referralCode}` : null;

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {}
    setLoadingPortal(false);
  };

  const handleDelete = (id: string) => {
    const updated = removeFromGallery(id);
    setGallery(updated);
  };

  const handleDownload = (dataUrl: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `agalaz-${Date.now()}.png`;
    a.click();
  };

  const handleShare = async (dataUrl: string) => {
    if (navigator.share) {
      try {
        const blob = await fetch(dataUrl).then((r) => r.blob());
        const file = new File([blob], 'agalaz-tryon.png', { type: 'image/png' });
        await navigator.share({ files: [file], title: 'Agalaz Fashion' });
      } catch {}
    }
  };

  if (!user) return null;

  return (
    <>
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

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="glass rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black text-white">{loading ? '—' : creditsRemaining}</p>
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{t.credits}</p>
                </div>
                <div className="glass rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black text-white">{gallery.length}</p>
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{t.galleryCount}</p>
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

            {/* Referral Link */}
            <div className="glass rounded-3xl p-5 animate-fade-in delay-100">
              <div className="flex items-center gap-2 mb-3">
                <Link2 size={16} className="text-indigo-400" />
                <h3 className="text-sm font-black text-white tracking-tight">{t.referralTitle}</h3>
              </div>
              <p className="text-[11px] text-white/30 font-medium mb-4">{t.referralDesc}</p>

              {referralLink ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 glass rounded-xl px-3 py-2.5 overflow-hidden">
                    <p className="text-[11px] font-bold text-indigo-400 truncate">{referralLink}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all press-scale ${
                      copied
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                    }`}
                  >
                    {copied ? (
                      <span className="flex items-center gap-1.5">
                        <Check size={14} />
                        {t.copied}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Copy size={14} />
                        {t.copyLink}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div className="glass rounded-xl px-3 py-2.5">
                  <p className="text-[11px] font-bold text-white/20">
                    {loading ? '...' : (lang === 'es' ? 'Suscríbete para obtener tu link' : 'Subscribe to get your link')}
                  </p>
                </div>
              )}
            </div>

            {/* Gallery */}
            <div className="animate-fade-in delay-200">
              <div className="flex items-center gap-2 mb-4 px-1">
                <ImageIcon size={16} className="text-indigo-400" />
                <h3 className="text-sm font-black text-white tracking-tight">{t.myGallery}</h3>
                <span className="text-[9px] font-bold text-white/20 ml-auto">{gallery.length}</span>
              </div>

              {gallery.length === 0 ? (
                <div className="glass rounded-3xl p-8 text-center">
                  <Sparkles size={32} className="text-white/10 mx-auto mb-3" />
                  <p className="text-xs font-bold text-white/20">{t.noImages}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {gallery.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative group rounded-2xl overflow-hidden border border-white/10 animate-fade-in-up"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <button
                        onClick={() => setFullscreenImage(img.dataUrl)}
                        className="block w-full"
                      >
                        <img
                          src={img.dataUrl}
                          alt={`Render ${idx + 1}`}
                          className="w-full aspect-[3/4] object-cover"
                        />
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                        <span className="text-[8px] font-bold text-white/50">
                          {new Date(img.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="p-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/40 transition-colors"
                        >
                          <Trash2 size={12} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in-scale"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 glass rounded-full hover:bg-white/20 transition-colors z-10 press-scale"
            style={{ top: 'max(1.5rem, env(safe-area-inset-top))' }}
          >
            <X size={22} className="text-white" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3" style={{ bottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
            <button
              onClick={(e) => { e.stopPropagation(); handleDownload(fullscreenImage); }}
              className="glass px-5 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors press-scale"
            >
              <Download size={16} className="text-white/80" />
              <span className="text-xs font-bold text-white/80">Save</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleShare(fullscreenImage); }}
              className="glass px-5 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors press-scale"
            >
              <Share2 size={16} className="text-white/80" />
              <span className="text-xs font-bold text-white/80">Share</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
