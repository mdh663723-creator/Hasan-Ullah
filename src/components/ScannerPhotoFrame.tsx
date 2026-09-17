import React, { useState, useRef } from 'react';
import { Camera, Sparkles, CheckCircle2, ShieldCheck, Eye, Upload, Trash2, Terminal, Code2, Cpu } from 'lucide-react';

interface ScannerPhotoFrameProps {
  imageUrl?: string;
  name: string;
  onUpdateImage?: (newUrl: string) => void;
  aspectRatioClass?: string;
}

export const ScannerPhotoFrame: React.FC<ScannerPhotoFrameProps> = ({
  imageUrl = '',
  name,
  onUpdateImage,
  aspectRatioClass = 'aspect-[3/4] sm:aspect-square'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scannerEnabled, setScannerEnabled] = useState(true);
  const [isTurbo, setIsTurbo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (file && onUpdateImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          onUpdateImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateImage) {
      onUpdateImage('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasImage = Boolean(imageUrl && imageUrl.trim().length > 0);

  return (
    <div className="relative group w-full select-none">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Futuristic Ambient Glow behind frame */}
      <div
        className={`absolute -inset-2 bg-gradient-to-tr from-sky-400 via-white/40 to-blue-600 rounded-[30px] blur-xl transition-opacity duration-500 ${
          isHovered ? 'opacity-70' : 'opacity-40'
        }`}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div
        id="hasanullah-photo-scanner-frame"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!hasImage) fileInputRef.current?.click();
        }}
        className={`relative w-full ${aspectRatioClass} rounded-[26px] overflow-hidden bg-slate-950 border-2 transition-all duration-300 ${
          isDragging
            ? 'border-emerald-400 shadow-2xl shadow-emerald-500/40 ring-4 ring-emerald-400/30 cursor-copy'
            : isHovered
            ? 'shadow-sky-400/35 border-white'
            : 'border-sky-300 shadow-2xl shadow-sky-500/20'
        } ${!hasImage ? 'cursor-pointer' : ''}`}
      >
        {/* Drag Over Active Overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white border-2 border-dashed border-emerald-400 rounded-[26px] animate-pulse">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-3 border border-emerald-400/40">
              <Upload className="w-8 h-8" />
            </div>
            <p className="font-extrabold text-base text-emerald-300">
              Drop your portrait photo here!
            </p>
            <p className="text-xs text-slate-300 mt-1">
              100% Authentic Portrait • Applied directly without any alteration
            </p>
          </div>
        )}

        {/* If Image exists, show user photo; otherwise show Developer Tech Terminal */}
        {hasImage ? (
          <>
            <img
              src={imageUrl}
              alt={name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Subtle gradient vignette at bottom for name banner */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
            
            {/* User Identity Banner */}
            <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between z-10 pointer-events-none">
              <div className="bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                <div className="text-[9px] font-bold uppercase tracking-wider text-sky-300">
                  Real Portrait • 100% Original
                </div>
                <div className="text-sm sm:text-base font-extrabold tracking-tight">
                  {name}
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-sky-500/85 backdrop-blur-md text-[10px] font-bold text-white shadow-xs border border-white/20">
                Graphic & Video
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-100 font-mono select-none">
            {/* Terminal Window Header Bar */}
            <div className="flex items-center justify-between border-b border-sky-500/25 pb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
                <span className="text-[10px] text-sky-300 ml-2 font-bold tracking-wider">
                  CREATIVE_PROFILE
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Ready for Photo</span>
              </div>
            </div>

            {/* Prompt to load user photo */}
            <div className="my-auto text-center space-y-3 px-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-600 p-0.5 shadow-xl shadow-sky-500/30">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-extrabold text-white text-xl tracking-wider">
                  HU
                </div>
              </div>

              <div>
                <h4 className="text-white font-extrabold text-base font-sans tracking-tight">
                  {name}
                </h4>
                <p className="text-[11px] text-sky-300 font-sans mt-0.5 font-medium">
                  Select or drop your photo ("Hasan Ullah - 3744.jpg") here
                </p>
              </div>

              {/* Click to Select Button inside Frame */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                id="frame-direct-select-photo-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-sans text-xs font-bold shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Upload Portrait Photo</span>
              </button>
              
              <p className="text-[10px] text-slate-400 font-sans">
                Drag and drop your image directly onto this frame
              </p>
            </div>

            {/* Terminal Footer Status */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-sky-500/20 pt-2 font-sans">
              <span className="text-sky-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 100% Unaltered • Pure Original
              </span>
              <span className="text-emerald-400 font-bold">● READY</span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLENDER SHAPED CC LIGHT - CORNER ORIGINATING SPECULAR SHEEN  */}
        {/* ============================================================ */}
        {scannerEnabled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[26px]">
            {/* Top-Left Corner Radial Light Glow Origin */}
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-radial from-white/80 via-sky-300/25 to-transparent rounded-full blur-[3px] pointer-events-none animate-corner-glint" />

            {/* Soft Ambient Light Cone from Corner */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 via-sky-200/10 to-transparent pointer-events-none animate-corner-cone [clip-path:polygon(0_0,100%_0,0_100%)]" />

            {/* Slender Diagonal CC Light Ribbon (Ultra-thin shape gliding softly across corner) */}
            <div
              className={`absolute top-0 left-0 w-[220%] h-8 pointer-events-none origin-top-left ${
                isTurbo || isHovered
                  ? 'animate-corner-cc-light-fast'
                  : 'animate-corner-cc-light'
              }`}
            >
              {/* Soft feather halo */}
              <div className="w-full h-3 -mb-2 bg-gradient-to-b from-transparent via-white/15 to-transparent blur-[1px] pointer-events-none" />

              {/* Ultra-slender 1px CC Light filament ray with gentle specular glow */}
              <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-[0_0_5px_rgba(255,255,255,0.85),0_0_12px_rgba(56,189,248,0.5)]" />

              {/* Feathered lower trailing softness */}
              <div className="w-full h-3 bg-gradient-to-b from-white/10 to-transparent blur-[1.5px] pointer-events-none" />
            </div>
          </div>
        )}

        {/* Minimal Corner Flare Accents (Soft light points at top corners) */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_4px_#fff] pointer-events-none" />

        {/* Top Minimal Status Pill */}
        <div className="absolute top-2.5 inset-x-3 flex items-center justify-between pointer-events-none z-10 text-white font-mono text-[9px] tracking-wider">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_4px_#fff]"></span>
            </span>
            <span className="font-semibold text-white/90 uppercase tracking-wider">
              {scannerEnabled ? 'CC Light Flare' : 'CC Off'}
            </span>
          </div>

          <div className="px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15 text-sky-200">
            {isHovered ? 'Active Glint' : 'Soft Sheen'}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* INTERACTIVE CONTROLS BAR UNDER FRAME */}
      {/* ============================================================ */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 p-2 bg-white/90 backdrop-blur-md rounded-2xl border border-sky-200 shadow-sm text-xs font-semibold">
        {/* Scanner On/Off Toggle Button */}
        <button
          type="button"
          onClick={() => setScannerEnabled(!scannerEnabled)}
          id="toggle-cctv-scanner-btn"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            scannerEnabled
              ? 'bg-sky-500 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title="Toggle White CC Corner Light"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>CC Light: {scannerEnabled ? 'ON' : 'OFF'}</span>
        </button>

        {/* Speed Toggle */}
        {scannerEnabled && (
          <button
            type="button"
            onClick={() => setIsTurbo(!isTurbo)}
            id="toggle-cctv-speed-btn"
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-colors ${
              isTurbo
                ? 'bg-blue-600 text-white'
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isTurbo ? 'Dynamic' : 'Soft Gentle'}</span>
          </button>
        )}

        {/* Upload or Remove Picture Buttons */}
        <div className="flex items-center gap-1.5">
          {onUpdateImage && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              id="upload-custom-photo-btn"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                !hasImage
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200'
              }`}
              title="Upload your real photo from your computer"
            >
              <Camera className={`w-3.5 h-3.5 ${!hasImage ? 'text-white' : 'text-sky-600'}`} />
              <span>{hasImage ? 'Change Photo' : 'Upload Exact Photo'}</span>
            </button>
          )}

          {hasImage && onUpdateImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              id="remove-photo-btn"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
              title="Remove picture"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
