'use client';

import { useRef } from 'react';
import { Camera, Shirt, X } from 'lucide-react';

const MAX_SIZE = 1024;
const JPEG_QUALITY = 0.7;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
      resolve(dataUrl.split(',')[1]);
    };
    img.onerror = () => reject(new Error('Error al cargar imagen'));
    img.src = URL.createObjectURL(file);
  });
}

interface ImageUploaderProps {
  label: string;
  type: 'user' | 'clothing';
  image: string | null;
  onImageSelect: (base64: string | null) => void;
  icon?: React.ReactNode;
}

export function ImageUploader({ label, type, image, onImageSelect, icon }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await compressImage(file);
      onImageSelect(base64);
    } catch {
      console.error('Error compressing image');
    }
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
        {label}
      </span>
      <div
        className="relative w-full rounded-2xl bg-white border-2 border-dashed border-slate-200 overflow-hidden shadow-sm"
        style={{ aspectRatio: '3 / 4' }}
      >
        {image ? (
          <div className="w-full h-full relative">
            <img
              src={`data:image/jpeg;base64,${image}`}
              alt={label}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onImageSelect(null)}
              className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-full p-4 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="p-3 bg-slate-50 rounded-full mb-3">
              {icon || (type === 'user' ? (
                <Camera size={20} className="text-slate-400" />
              ) : (
                <Shirt size={20} className="text-slate-400" />
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tight text-slate-500">
              {type === 'user' ? 'Subir Foto' : 'Subir Prenda'}
            </span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
