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

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
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
              className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
            >
              <X size={14} className="text-slate-500" />
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center opacity-0 hover:opacity-100"
            >
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Change</span>
              </div>
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-full p-4 hover:bg-indigo-50/50 transition-all"
          >
            <div className="p-3 bg-white border border-slate-200 rounded-xl mb-3 shadow-sm">
              {icon || (type === 'user' ? (
                <Camera size={20} className="text-slate-300" />
              ) : (
                <Shirt size={20} className="text-slate-300" />
              ))}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
              Upload
            </span>
            <ImagePlus size={12} className="text-slate-200 mt-2" />
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
