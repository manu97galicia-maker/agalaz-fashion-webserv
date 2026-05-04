'use client';

import { useRef, useState } from 'react';
import { Camera, Shirt, X, ImagePlus, Check } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  type: 'user' | 'clothing';
  image: string | null;
  onImageSelect: (base64: string | null) => void;
  icon?: React.ReactNode;
}

export function ImageUploader({ label, type, image, onImageSelect, icon }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1536;
          const MIN_DIM = 512;
          let { width, height } = img;
          if (width < MIN_DIM && height < MIN_DIM) {
            const scale = MIN_DIM / Math.max(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
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
  };

  const handleFile = async (file: File) => {
    try {
      const base64 = await compressImage(file);
      onImageSelect(base64);
    } catch {
      // Fallback to raw file if compression fails
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        onImageSelect(result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
        {label}
      </span>
      <div
        className={`relative w-full rounded-xl overflow-hidden transition-all ${
          image
            ? 'ring-2 ring-indigo-200'
            : isDragging
            ? 'ring-2 ring-indigo-300 bg-indigo-50'
            : 'border-2 border-dashed border-slate-200 bg-slate-50'
        }`}
        style={{ aspectRatio: '3 / 4' }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
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
              onClick={() => onImageSelect(null)}
              aria-label="Remove image"
              className="absolute top-1.5 right-1.5 p-2 min-w-[36px] min-h-[36px] bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow flex items-center justify-center"
            >
              <X size={16} className="text-slate-600" />
            </button>
            {/* Change button — always visible on touch (no hover), hover-only on desktop. */}
            <button
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 min-h-[36px] rounded-full shadow flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            >
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Change</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-full p-4 hover:bg-indigo-50/50 active:bg-indigo-100/50 transition-all"
          >
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl mb-3 shadow-sm">
              {icon || (type === 'user' ? (
                <Camera size={24} className="text-slate-400" />
              ) : (
                <Shirt size={24} className="text-slate-400" />
              ))}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
              Upload
            </span>
            <ImagePlus size={14} className="text-slate-300 mt-2" />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
