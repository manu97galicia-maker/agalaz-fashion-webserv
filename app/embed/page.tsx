'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, X, Camera, Shirt, ImagePlus, Check, Download, UserSquare2, Fingerprint } from 'lucide-react';

// Standalone embed page for B2B widget — no Supabase auth required
// URL: /embed?key=API_KEY&garment=GARMENT_URL&lang=es

export default function EmbedPage() {
  const [apiKey, setApiKey] = useState('');
  const [garmentUrl, setGarmentUrl] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'upload' | 'result'>('upload');

  const faceRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const t = lang === 'es' ? {
    title: 'Prueba Virtual',
    subtitle: 'Sube tu foto y pruébate esta prenda',
    face: 'Tu cara',
    body: 'Cuerpo entero',
    faceHint: 'Foto frontal clara',
    bodyHint: 'De pie, de frente',
    generate: 'Probar prenda',
    generating: 'Generando...',
    result: 'Tu prueba virtual',
    tryAgain: 'Probar de nuevo',
    download: 'Guardar',
    poweredBy: 'Powered by Agalaz',
    errorGeneric: 'No se pudo generar. Intenta con otras fotos.',
    errorNoPhotos: 'Sube ambas fotos para continuar.',
  } : {
    title: 'Virtual Try-On',
    subtitle: 'Upload your photo and try on this garment',
    face: 'Your face',
    body: 'Full body',
    faceHint: 'Clear front-facing photo',
    bodyHint: 'Standing, front-facing',
    generate: 'Try it on',
    generating: 'Generating...',
    result: 'Your virtual try-on',
    tryAgain: 'Try again',
    download: 'Save',
    poweredBy: 'Powered by Agalaz',
    errorGeneric: 'Generation failed. Try different photos.',
    errorNoPhotos: 'Upload both photos to continue.',
  };

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setApiKey(params.get('key') || '');
    setGarmentUrl(params.get('garment') || null);
    if (params.get('lang') === 'es') setLang('es');
  }, []);

  // Load garment image from URL if provided
  useEffect(() => {
    if (!garmentUrl) return;
    fetchImageAsBase64(garmentUrl).then(setGarmentImage).catch(() => {});
  }, [garmentUrl]);

  async function fetchImageAsBase64(url: string): Promise<string> {
    // Try direct fetch first, fall back to img element for CORS-restricted images
    try {
      const res = await fetch(url, { mode: 'cors' });
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      // CORS blocked — load via img element + canvas
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl.split(',')[1]);
        };
        img.onerror = reject;
        img.src = url;
      });
    }
  }

  function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1536;
          let { width, height } = img;
          if (width > MAX_DIM || height > MAX_DIM) {
            const scale = MAX_DIM / Math.max(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl.split(',')[1]);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function handleFile(setter: (v: string | null) => void) {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const base64 = await compressImage(file);
        setter(base64);
      } catch {
        const reader = new FileReader();
        reader.onload = () => setter((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    };
  }

  async function handleGenerate() {
    if (!faceImage || !bodyImage) {
      setError(t.errorNoPhotos);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          faceImage,
          bodyImage,
          clothingImage: garmentImage || undefined,
          garmentUrl: !garmentImage && garmentUrl ? garmentUrl : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Embed generation failed:', JSON.stringify(data));
        const debugStr = data.debug ? ` [face:${data.debug.faceSize}, body:${data.debug.bodySize}, garment:${data.debug.garmentSize}]` : '';
        setError((data.error || t.errorGeneric) + debugStr);
        setIsLoading(false);
        return;
      }

      if (data.image) {
        setResultImage(data.image);
        setStep('result');
        // Notify parent window
        window.parent.postMessage({ type: 'agalaz:result', image: data.image }, '*');
      } else {
        setError(t.errorGeneric);
      }
    } catch {
      setError(t.errorGeneric);
    }

    setIsLoading(false);
  }

  function handleDownload() {
    if (!resultImage) return;
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = 'virtual-tryon.png';
    a.click();
  }

  function handleReset() {
    setFaceImage(null);
    setBodyImage(null);
    setResultImage(null);
    setError(null);
    setStep('upload');
  }

  function ImageSlot({
    image,
    inputRef,
    label,
    hint,
    icon,
    onClear,
  }: {
    image: string | null;
    inputRef: React.RefObject<HTMLInputElement | null>;
    label: string;
    hint: string;
    icon: React.ReactNode;
    onClear: () => void;
  }) {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
          {label}
        </span>
        <div
          className={`relative w-full rounded-xl overflow-hidden transition-all ${
            image
              ? 'ring-2 ring-indigo-200'
              : 'border-2 border-dashed border-slate-200 bg-slate-50'
          }`}
          style={{ aspectRatio: '3 / 4' }}
        >
          {image ? (
            <div className="w-full h-full relative group">
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={label}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-emerald-500 rounded-full p-1 shadow-sm">
                <Check size={12} className="text-white" />
              </div>
              <button
                onClick={onClear}
                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <X size={14} className="text-slate-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full h-full p-4 hover:bg-indigo-50/50 transition-all"
            >
              <div className="p-3 bg-white border border-slate-200 rounded-xl mb-3 shadow-sm">
                {icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                Upload
              </span>
              <ImagePlus size={12} className="text-slate-200 mt-2" />
            </button>
          )}
        </div>
        <p className="text-[9px] font-bold text-slate-300 text-center">{hint}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-600" />
          <span className="text-sm font-black text-slate-900 tracking-tight">{t.title}</span>
          <span className="text-[8px] text-slate-300 font-bold">•</span>
          <a
            href="https://agalaz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-bold text-slate-300 hover:text-indigo-500 transition-colors"
          >
            powered by <span className="text-indigo-400">agalaz.com</span>
          </a>
        </div>
        <button
          onClick={() => window.parent.postMessage({ type: 'agalaz:close' }, '*')}
          className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={18} className="text-slate-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {step === 'upload' ? (
          <div className="max-w-sm mx-auto space-y-6">
            <p className="text-center text-slate-400 text-xs font-light">{t.subtitle}</p>

            {/* Photo upload grid */}
            <div className="grid grid-cols-2 gap-4">
              <ImageSlot
                image={faceImage}
                inputRef={faceRef}
                label={t.face}
                hint={t.faceHint}
                icon={<Fingerprint size={20} className="text-indigo-600" />}
                onClear={() => setFaceImage(null)}
              />
              <ImageSlot
                image={bodyImage}
                inputRef={bodyRef}
                label={t.body}
                hint={t.bodyHint}
                icon={<UserSquare2 size={20} className="text-indigo-600" />}
              onClear={() => setBodyImage(null)}
              />
            </div>

            {/* Garment preview (if auto-loaded from store) */}
            {(garmentImage || garmentUrl) && (
              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="w-12 h-16 rounded-lg overflow-hidden ring-2 ring-indigo-200 shrink-0">
                  <img
                    src={garmentImage ? `data:image/jpeg;base64,${garmentImage}` : `/api/v1/image-proxy?url=${encodeURIComponent(garmentUrl!)}`}
                    alt="Garment"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">
                    {lang === 'es' ? 'Prenda seleccionada' : 'Selected garment'}
                  </span>
                  <p className="text-[10px] text-indigo-400 mt-0.5">
                    {lang === 'es' ? 'Se aplicará automáticamente' : 'Will be applied automatically'}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!faceImage || !bodyImage || isLoading}
              className={`w-full py-4 flex items-center justify-center gap-3 rounded-xl transition-all font-black uppercase tracking-[0.15em] text-xs ${
                faceImage && bodyImage && !isLoading
                  ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg'
                  : 'bg-slate-100 text-slate-300'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t.generating}
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  {t.generate}
                </>
              )}
            </button>
          </div>
        ) : (
          /* Result view */
          <div className="max-w-sm mx-auto space-y-4">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t.result}
            </p>

            <div className="rounded-2xl overflow-hidden border-2 border-slate-100">
              <img
                src={resultImage!}
                alt="Try-on result"
                className="w-full"
                style={{ aspectRatio: '9 / 16', objectFit: 'cover' }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-colors"
              >
                {t.tryAgain}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} />
                {t.download}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-100 px-4 py-1.5 text-center bg-white">
        <a
          href="https://agalaz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[8px] font-bold text-slate-200 hover:text-indigo-400 transition-colors"
        >
          agalaz.com
        </a>
      </div>

      {/* Hidden file inputs */}
      <input ref={faceRef} type="file" accept="image/*" onChange={handleFile(setFaceImage)} className="hidden" />
      <input ref={bodyRef} type="file" accept="image/*" onChange={handleFile(setBodyImage)} className="hidden" />
    </div>
  );
}
