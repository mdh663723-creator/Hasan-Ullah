import React, { useState } from 'react';
import {
  Video,
  Film,
  Sparkles,
  Bot,
  Scissors,
  Layers,
  Palette,
  Play,
  Pause,
  SlidersHorizontal,
  Flame,
  Smartphone
} from 'lucide-react';

export interface ToolItem {
  id: string;
  name: string;
  banglaName: string;
  category: string;
  shortCode?: string;
  iconBg: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
}

export const ToolsMarqueeSlider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSpeed, setActiveSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');

  const tools: ToolItem[] = [
    {
      id: 'premiere-pro',
      name: 'Adobe Premiere Pro',
      banglaName: 'প্রিমিয়ার প্রো',
      category: 'Video Editing',
      shortCode: 'Pr',
      iconBg: 'bg-[#00005B]',
      textColor: 'text-[#9999FF]',
      borderColor: 'border-[#9999FF]/40 hover:border-[#9999FF]',
      glowColor: 'hover:shadow-[0_0_20px_rgba(153,153,255,0.5)]',
      icon: (
        <span className="font-black text-xs sm:text-sm tracking-tight text-[#9999FF]">
          Pr
        </span>
      )
    },
    {
      id: 'after-effects',
      name: 'Adobe After Effects',
      banglaName: 'আফটার ইফেক্ট',
      category: 'VFX & Motion',
      shortCode: 'Ae',
      iconBg: 'bg-[#00005B]',
      textColor: 'text-[#9999FF]',
      borderColor: 'border-[#9999FF]/40 hover:border-[#9999FF]',
      glowColor: 'hover:shadow-[0_0_20px_rgba(153,153,255,0.5)]',
      icon: (
        <span className="font-black text-xs sm:text-sm tracking-tight text-[#9999FF]">
          Ae
        </span>
      )
    },
    {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      banglaName: 'ফটোশপ',
      category: 'Image & Thumbnails',
      shortCode: 'Ps',
      iconBg: 'bg-[#001E36]',
      textColor: 'text-[#31A8FF]',
      borderColor: 'border-[#31A8FF]/40 hover:border-[#31A8FF]',
      glowColor: 'hover:shadow-[0_0_20px_rgba(49,168,255,0.5)]',
      icon: (
        <span className="font-black text-xs sm:text-sm tracking-tight text-[#31A8FF]">
          Ps
        </span>
      )
    },
    {
      id: 'illustrator',
      name: 'Adobe Illustrator',
      banglaName: 'ইলাস্ট্রেটর',
      category: 'Vector & CV Design',
      shortCode: 'Ai',
      iconBg: 'bg-[#330000]',
      textColor: 'text-[#FF9A00]',
      borderColor: 'border-[#FF9A00]/40 hover:border-[#FF9A00]',
      glowColor: 'hover:shadow-[0_0_20px_rgba(255,154,0,0.5)]',
      icon: (
        <span className="font-black text-xs sm:text-sm tracking-tight text-[#FF9A00]">
          Ai
        </span>
      )
    },
    {
      id: 'reels-shorts',
      name: 'Reels & Shorts Edit',
      banglaName: 'রিলস ও শর্ট এডিট',
      category: 'Viral Social Video',
      iconBg: 'bg-gradient-to-tr from-pink-600 to-purple-600',
      textColor: 'text-pink-300',
      borderColor: 'border-pink-500/40 hover:border-pink-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(244,114,182,0.5)]',
      icon: <Smartphone className="w-4 h-4 text-white" />
    },
    {
      id: 'davinci-resolve',
      name: 'DaVinci Resolve',
      banglaName: 'ডিভেন্স / কালার গ্রেডিং',
      category: 'Color & Mastering',
      iconBg: 'bg-slate-900',
      textColor: 'text-emerald-300',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.5)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <circle cx="12" cy="7" r="4" fill="#EF4444" />
          <circle cx="7" cy="15" r="4" fill="#3B82F6" />
          <circle cx="17" cy="15" r="4" fill="#EAB308" />
        </svg>
      )
    },
    {
      id: 'ai-automation',
      name: 'AI Automation & Workflows',
      banglaName: 'অটোমেশন (n8n/Make)',
      category: 'Smart Automation',
      iconBg: 'bg-cyan-950',
      textColor: 'text-cyan-300',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]',
      icon: <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
    },
    {
      id: 'capcut-desktop',
      name: 'CapCut Desktop',
      banglaName: 'ক্যাপকাট ডেস্কটপ',
      category: 'Fast Dynamic Cut',
      iconBg: 'bg-slate-900',
      textColor: 'text-slate-100',
      borderColor: 'border-slate-500/50 hover:border-white',
      glowColor: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]',
      icon: <Scissors className="w-4 h-4 text-white" />
    },
    {
      id: 'motion-graphics',
      name: 'Motion Graphics',
      banglaName: 'মোশন গ্রাফিক্স',
      category: 'Keyframe Animation',
      iconBg: 'bg-amber-950',
      textColor: 'text-amber-300',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]',
      icon: <Sparkles className="w-4 h-4 text-amber-300" />
    },
    {
      id: 'typography-layout',
      name: 'Visual Typography',
      banglaName: 'টাইপোগ্রাফি ও লেআউট',
      category: 'Graphic Art',
      iconBg: 'bg-indigo-950',
      textColor: 'text-indigo-300',
      borderColor: 'border-indigo-500/40 hover:border-indigo-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(129,140,248,0.5)]',
      icon: <Layers className="w-4 h-4 text-indigo-300" />
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
          <div className="p-1 rounded-lg bg-sky-500/10 border border-sky-500/30">
            <Video className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <span>Specialized Tools & Software</span>
            <span className="text-sky-400 font-normal lowercase hidden sm:inline">
              • ডান দিক থেকে বামে স্লাইড হচ্ছে
            </span>
          </span>
        </div>

        {/* Small slider speed & pause controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
              isPaused
                ? 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-slate-200'
            }`}
            title={isPaused ? 'Resume sliding' : 'Pause sliding'}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3" />}
            <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (activeSpeed === 'normal') setActiveSpeed('fast');
              else if (activeSpeed === 'fast') setActiveSpeed('slow');
              else setActiveSpeed('normal');
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 border border-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors"
            title="Toggle slide speed"
          >
            <SlidersHorizontal className="w-3 h-3 text-sky-400" />
            <span className="capitalize">{activeSpeed}</span>
          </button>
        </div>
      </div>

      {/* Marquee Track with gradient fade edges */}
      <div className="relative w-full overflow-hidden py-1 rounded-2xl bg-slate-950/40 border border-slate-800/40 backdrop-blur-xs">
        {/* Soft edge fade left */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
        {/* Soft edge fade right */}
        <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10" />

        {/* Sliding Row (Right to Left continuous) */}
        <div
          className="animate-slide-rtl flex items-center gap-3 py-1.5 px-4"
          style={{
            animationDuration: speedDuration,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedTools.map((tool, index) => (
            <div
              key={`${tool.id}-${index}`}
              className={`group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border ${tool.borderColor} shadow-xs ${tool.glowColor} transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer shrink-0`}
            >
              {/* Tool Icon Box */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${tool.iconBg} flex items-center justify-center border border-white/10 shadow-xs group-hover:scale-110 transition-transform shrink-0`}
              >
                {tool.icon}
              </div>

              {/* Tool Name & Category */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 whitespace-nowrap">
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
