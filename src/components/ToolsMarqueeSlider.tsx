import React, { useState } from 'react';
import {
  Video,
  Play,
  Pause,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

export interface ToolItem {
  id: string;
  name: string;
  banglaName: string;
  category: string;
  brandColor: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
}

export const ToolsMarqueeSlider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSpeed, setActiveSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');

  // Authentic, pristine original brand software tools with original brand colors and logos
  const tools: ToolItem[] = [
    {
      id: 'premiere-pro',
      name: 'Adobe Premiere Pro',
      banglaName: 'প্রিমিয়ার প্রো',
      category: 'Video Editing',
      brandColor: '#9999FF',
      borderColor: 'border-indigo-900/60 hover:border-[#9999FF]',
      glowColor: 'hover:shadow-[0_0_24px_rgba(153,153,255,0.5)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#00005B] border-[1.5px] border-[#9999FF] flex items-center justify-center shadow-md overflow-hidden select-none">
          {/* Subtle glossy sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <span className="font-sans font-extrabold text-[16px] tracking-tight text-[#9999FF] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Pr
          </span>
        </div>
      )
    },
    {
      id: 'after-effects',
      name: 'Adobe After Effects',
      banglaName: 'আফটার ইফেক্ট',
      category: 'VFX & Motion',
      brandColor: '#CF96FD',
      borderColor: 'border-purple-900/60 hover:border-[#CF96FD]',
      glowColor: 'hover:shadow-[0_0_24px_rgba(207,150,253,0.5)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#1A0033] border-[1.5px] border-[#CF96FD] flex items-center justify-center shadow-md overflow-hidden select-none">
          {/* Subtle glossy sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <span className="font-sans font-extrabold text-[16px] tracking-tight text-[#CF96FD] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Ae
          </span>
        </div>
      )
    },
    {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      banglaName: 'ফটোশপ',
      category: 'Image & Thumbnails',
      brandColor: '#31A8FF',
      borderColor: 'border-sky-900/60 hover:border-[#31A8FF]',
      glowColor: 'hover:shadow-[0_0_24px_rgba(49,168,255,0.45)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#001E36] border-[1.5px] border-[#31A8FF] flex items-center justify-center shadow-md overflow-hidden select-none">
          {/* Subtle glossy sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <span className="font-sans font-extrabold text-[16px] tracking-tight text-[#31A8FF] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Ps
          </span>
        </div>
      )
    },
    {
      id: 'illustrator',
      name: 'Adobe Illustrator',
      banglaName: 'ইলাস্ট্রেটর',
      category: 'Vector & CV Design',
      brandColor: '#FF9A00',
      borderColor: 'border-amber-900/60 hover:border-[#FF9A00]',
      glowColor: 'hover:shadow-[0_0_24px_rgba(255,154,0,0.45)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#261300] border-[1.5px] border-[#FF9A00] flex items-center justify-center shadow-md overflow-hidden select-none">
          {/* Subtle glossy sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <span className="font-sans font-extrabold text-[16px] tracking-tight text-[#FF9A00] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Ai
          </span>
        </div>
      )
    },
    {
      id: 'capcut-desktop',
      name: 'CapCut Desktop',
      banglaName: 'ক্যাপকাট ডেস্কটপ',
      category: 'Fast Dynamic Cut',
      brandColor: '#FFFFFF',
      borderColor: 'border-slate-800 hover:border-white',
      glowColor: 'hover:shadow-[0_0_24px_rgba(255,255,255,0.5)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#000000] border-[1.5px] border-white/80 flex items-center justify-center shadow-md overflow-hidden select-none">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          {/* Authentic Official CapCut Monochrome Black & White Dual Chevron Logo */}
          <svg viewBox="0 0 36 36" className="w-6 h-6 drop-shadow-md" fill="none">
            {/* Top blade - Pure White */}
            <path
              d="M6 10 L19 10 L30 18 L17 18 Z"
              fill="#FFFFFF"
            />
            {/* Bottom blade - Pure White */}
            <path
              d="M30 26 L17 26 L6 18 L19 18 Z"
              fill="#FFFFFF"
            />
            {/* Dark slit gap */}
            <line x1="6" y1="18" x2="30" y2="18" stroke="#000000" strokeWidth="1.8" />
          </svg>
        </div>
      )
    },
    {
      id: 'reels-shorts',
      name: 'Reels & Shorts Edit',
      banglaName: 'রিলস ও শর্ট এডিট',
      category: 'Viral Social Video',
      brandColor: '#F43F5E',
      borderColor: 'border-pink-900/60 hover:border-pink-500',
      glowColor: 'hover:shadow-[0_0_24px_rgba(244,63,94,0.45)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] border-[1.5px] border-pink-300/60 flex items-center justify-center shadow-md overflow-hidden select-none">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white drop-shadow-md" fill="currentColor">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 16.5v-6l4.5 3-3.25 1.75z" />
          </svg>
        </div>
      )
    },
    {
      id: 'davinci-resolve',
      name: 'DaVinci Resolve',
      banglaName: 'ডিভেন্স / কালার গ্রেডিং',
      category: 'Color & Mastering',
      brandColor: '#ED2224',
      borderColor: 'border-slate-800 hover:border-slate-500',
      glowColor: 'hover:shadow-[0_0_24px_rgba(237,34,36,0.35)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#11141A] border-[1.5px] border-slate-600/70 flex items-center justify-center shadow-md overflow-hidden select-none">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          {/* Authentic Blackmagic DaVinci Resolve 3-Petal Rosette */}
          <svg viewBox="0 0 36 36" className="w-6 h-6 drop-shadow-md" fill="none">
            {/* Top Red Petal */}
            <path
              d="M18 6 C21 6 23.5 8.5 23 12 C22.5 15.5 19.5 17 18 17 C16.5 17 13.5 15.5 13 12 C12.5 8.5 15 6 18 6 Z"
              fill="#ED2224"
            />
            {/* Bottom Left Blue Petal */}
            <path
              d="M8.5 22.5 C10 20 12.8 19 16 20 C19.2 21 20 24 19 26.5 C18 29 15 30 12.5 30 C10 30 7 25 8.5 22.5 Z"
              fill="#0072BC"
            />
            {/* Bottom Right Yellow/Gold Petal */}
            <path
              d="M27.5 22.5 C29 25 26 30 23.5 30 C21 30 18 29 17 26.5 C16 24 16.8 21 20 20 C23.2 19 26 20 27.5 22.5 Z"
              fill="#FFCE00"
            />
            {/* Center Core Dot */}
            <circle cx="18" cy="20" r="3.2" fill="#11141A" stroke="#222834" strokeWidth="1" />
          </svg>
        </div>
      )
    },
    {
      id: 'ai-automation',
      name: 'AI Automation & Workflows',
      banglaName: 'অটোমেশন (n8n/Make)',
      category: 'Smart Workflows',
      brandColor: '#06B6D4',
      borderColor: 'border-cyan-950 hover:border-[#06B6D4]',
      glowColor: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.45)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#0B132B] border-[1.5px] border-[#06B6D4] flex items-center justify-center shadow-md overflow-hidden select-none">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-md" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" fill="#10B981" stroke="#10B981" />
            <path d="M9 1v3" />
            <path d="M15 1v3" />
            <path d="M9 20v3" />
            <path d="M15 20v3" />
            <path d="M20 9h3" />
            <path d="M20 14h3" />
            <path d="M1 9h3" />
            <path d="M1 14h3" />
          </svg>
        </div>
      )
    },
    {
      id: 'motion-graphics',
      name: 'Motion Graphics',
      banglaName: 'মোশন গ্রাফিক্স',
      category: 'Keyframe Animation',
      brandColor: '#F59E0B',
      borderColor: 'border-amber-950 hover:border-[#F59E0B]',
      glowColor: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.45)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#1A1208] border-[1.5px] border-[#F59E0B] flex items-center justify-center shadow-md overflow-hidden select-none">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-md" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#F59E0B" fillOpacity="0.25" />
          </svg>
        </div>
      )
    },
    {
      id: 'typography-layout',
      name: 'Visual Typography',
      banglaName: 'টাইপোগ্রাফি ও লেআউট',
      category: 'Graphic Art',
      brandColor: '#C084FC',
      borderColor: 'border-purple-950 hover:border-[#C084FC]',
      glowColor: 'hover:shadow-[0_0_24px_rgba(192,132,252,0.45)]',
      icon: (
        <div className="relative w-10 h-10 rounded-xl bg-[#1A0B2E] border-[1.5px] border-[#C084FC] flex items-center justify-center shadow-md overflow-hidden select-none">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <span className="font-serif font-black text-[17px] text-[#E9D5FF] tracking-tighter drop-shadow-md select-none">
            Aa
          </span>
        </div>
      )
    }
  ];

  // Duplicate for seamless 0 -> -50% infinite slider loop
  const duplicatedTools = [...tools, ...tools];

  const speedDuration =
    activeSpeed === 'slow' ? '40s' : activeSpeed === 'fast' ? '15s' : '24s';

  return (
    <div className={`w-full max-w-5xl mx-auto my-4 select-none ${className}`}>
      {/* Header bar above slider */}
      <div className="flex items-center justify-between gap-3 px-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/20 border border-sky-400/50 shadow-sm shadow-sky-500/30">
            <Video className="w-4 h-4 text-sky-300 animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
            <span>Specialized Tools & Software</span>
            <span className="text-sky-400 font-normal lowercase hidden sm:inline">
              • মাউস নিলে আইকন মাথা তুলে দেখবে (Peeking Head Effect)
            </span>
          </span>
        </div>

        {/* Small slider speed & pause controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
              isPaused
                ? 'bg-amber-950/80 border-amber-500/80 text-amber-200'
                : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isPaused ? 'Resume sliding' : 'Pause sliding'}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3 text-sky-400" />}
            <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (activeSpeed === 'normal') setActiveSpeed('fast');
              else if (activeSpeed === 'fast') setActiveSpeed('slow');
              else setActiveSpeed('normal');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Toggle slide speed"
          >
            <SlidersHorizontal className="w-3 h-3 text-sky-400" />
            <span className="capitalize">{activeSpeed}</span>
          </button>
        </div>
      </div>

      {/* Marquee Track with gradient fade edges (pt-8 pb-4 provides headroom for peek-up icon) */}
      <div className="relative w-full overflow-hidden pt-8 pb-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md shadow-xl">
        {/* Soft edge fade left */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10" />
        {/* Soft edge fade right */}
        <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent z-10" />

        {/* Sliding Row (Right to Left continuous, continues sliding on hover) */}
        <div
          className="animate-slide-rtl flex items-center gap-3.5 py-1.5 px-4 overflow-visible"
          style={{
            animationDuration: speedDuration,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedTools.map((tool, index) => (
            <div
              key={`${tool.id}-${index}`}
              className={`group relative flex items-center gap-3 px-4 py-2.5 sm:px-4.5 sm:py-3 rounded-2xl bg-slate-900/95 hover:bg-slate-850 border ${tool.borderColor} shadow-md ${tool.glowColor} transition-all duration-200 cursor-pointer shrink-0 overflow-visible`}
            >
              {/* Tool Icon Box with Peeking Head Animation ("মাথা তুলে তাকায়") */}
              <div className="relative overflow-visible shrink-0 flex items-center justify-center">
                {/* Base placeholder slot showing where the icon popped out from */}
                <div className="absolute inset-0 rounded-xl bg-black/60 border border-slate-700/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* The Authentic High-Resolution Brand Icon that pops UP on hover */}
                <div
                  className={`tool-peek-icon relative flex items-center justify-center select-none ${tool.glowColor}`}
                >
                  {tool.icon}
                </div>
              </div>

              {/* Tool Name & Category (Crisp, High-Resolution Typography) */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-sky-300 transition-colors whitespace-nowrap tracking-tight">
                  {tool.name}
                </span>
                <span className="text-[11px] font-semibold text-slate-300 group-hover:text-slate-100 whitespace-nowrap">
                  {tool.banglaName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsMarqueeSlider;
