import React from 'react';
import { ArrowRight, Download, Sparkles, CheckCircle2, ExternalLink, Flame, Trophy, Palette, Video, Bot } from 'lucide-react';
import { UserProfile } from '../types';
import { ScannerPhotoFrame } from './ScannerPhotoFrame';
import { SocialIconsBar } from './SocialIcons';

interface HeroProps {
  profile: UserProfile;
  onViewShowcase: () => void;
  onUpdateAvatar?: (newUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onViewShowcase, onUpdateAvatar }) => {
  const stats = [
    { number: profile.completedProjects, label: 'Completed Projects', icon: Trophy, color: 'from-sky-500 to-blue-600' },
    { number: profile.clientRating, label: 'Client Satisfaction', icon: CheckCircle2, color: 'from-emerald-400 to-teal-600' },
    { number: profile.experienceYears, label: 'Dedicated Experience', icon: Flame, color: 'from-amber-400 to-orange-500' },
    { number: 'AI Automation', label: 'Continuous Learning & Focus', icon: Bot, color: 'from-purple-500 to-indigo-600' }
  ];

  const techBadges = [
    { name: 'Adobe Photoshop', bg: 'bg-sky-950/70 text-sky-300 border-sky-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(56,189,248,0.7)]' },
    { name: 'Adobe Premiere Pro', bg: 'bg-purple-950/70 text-purple-300 border-purple-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(192,132,252,0.7)]' },
    { name: 'Adobe Illustrator', bg: 'bg-amber-950/70 text-amber-300 border-amber-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(251,191,36,0.7)]' },
    { name: 'Reels & Shorts Editing', bg: 'bg-pink-950/70 text-pink-300 border-pink-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(244,114,182,0.7)]' },
    { name: 'After Effects', bg: 'bg-indigo-950/70 text-indigo-300 border-indigo-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(129,140,248,0.7)]' },
    { name: 'DaVinci Resolve', bg: 'bg-emerald-950/70 text-emerald-300 border-emerald-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(52,211,153,0.7)]' },
    { name: 'AI Automation (n8n/Make)', bg: 'bg-cyan-950/70 text-cyan-300 border-cyan-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(34,211,238,0.7)]' },
    { name: 'CapCut Desktop', bg: 'bg-slate-900 text-slate-200 border-slate-700', glow: 'group-hover:shadow-[0_0_24px_rgba(148,163,184,0.7)]' }
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-black/60 via-slate-950/50 to-transparent"
    >
      {/* Dynamic Soft Ambient Lighting Orbs tuned for dark black background */}
      <div
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-sky-600/15 via-blue-900/10 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-20 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-600/10 via-blue-950/15 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 -left-24 w-[380px] h-[380px] bg-gradient-to-tr from-sky-900/15 via-slate-900/10 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro & Headline */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status Pill with Colorful Gradient Border */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-lg text-sky-300 text-xs sm:text-sm font-bold mb-6 hover:border-sky-400 transition-colors">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide">
                Available for Freelance Projects & Remote Work
              </span>
              <Sparkles className="w-4 h-4 text-sky-400 ml-0.5" />
            </div>

            {/* Main Headline with Interactive Cursor Zoom & Radiant Light Glow */}
            <div className="group/hero-title inline-block cursor-pointer transition-all duration-500 hover:scale-105 origin-center lg:origin-left mb-6 p-2 -m-2 rounded-2xl hover:bg-slate-900/60 hover:backdrop-blur-xs">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.14] transition-all duration-300">
                <span className="inline-block mr-3 sm:mr-4 transition-all duration-300 group-hover/hero-title:text-sky-400 group-hover/hero-title:drop-shadow-[0_0_20px_rgba(56,189,248,0.85)]">
                  Hi, I'm
                </span>
                <span className="relative inline-block bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 bg-clip-text text-transparent underline decoration-sky-400/80 decoration-wavy decoration-2 transition-all duration-300 group-hover/hero-title:drop-shadow-[0_0_28px_rgba(56,189,248,0.95)]">
                  {profile.name}
                  {/* Subtle Light Flare Sweep under name on hover */}
                  <span className="absolute -inset-1 rounded-lg bg-sky-400/0 group-hover/hero-title:bg-sky-400/20 blur-lg transition-colors duration-500 pointer-events-none" />
                </span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-200 inline-block transition-all duration-300 group-hover/hero-title:text-indigo-400 group-hover/hero-title:drop-shadow-[0_0_24px_rgba(129,140,248,0.8)]">
                  Graphic Designer & Video Editor
                </span>
              </h1>
            </div>

            {/* Special AI Automation Learning Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/80 text-purple-200 text-xs sm:text-sm font-bold mb-6 shadow-md">
              <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Currently Learning & Mastering: <span className="text-purple-300 font-extrabold">AI Automation & Smart Workflows</span></span>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-9 leading-relaxed font-normal">
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10 w-full sm:w-auto">
              <button
                onClick={onViewShowcase}
                id="hero-btn-showcase"
                type="button"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-200 active:scale-98"
              >
                <span>View Portfolio & Video Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#contact"
                id="hero-btn-contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 shadow-sm transition-all duration-200"
              >
                <span>Contact Me</span>
                <ExternalLink className="w-4 h-4 text-sky-400" />
              </a>

              <a
                href="#skills"
                id="hero-btn-resume"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800/80 transition-all duration-200"
              >
                <Palette className="w-4 h-4 text-sky-400" />
                <span>Skills & Tools</span>
              </a>
            </div>

            {/* Prominent Direct Social Icons: Facebook, WhatsApp, Telegram, Instagram, Twitter/X */}
            <SocialIconsBar profile={profile} />

            {/* Tech Badges Row with Larger Badges, Cursor Zoom & Light Glow */}
            <div className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 mr-1 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-sky-400 animate-pulse" />
                Specialized Tools:
              </span>
              {techBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl border shadow-xs transition-all duration-300 hover:scale-115 hover:-translate-y-1.5 cursor-pointer select-none ${badge.bg} ${badge.glow} z-10 hover:z-20`}
                >
                  {/* Subtle radiating light sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-hover-light-sweep bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  {/* Surface Neon Glow backdrop */}
                  <div className="absolute -inset-0.5 rounded-xl bg-current opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 pointer-events-none" />

                  <span className="relative z-10 tracking-tight transition-transform duration-200 group-hover:scale-105 inline-block">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Prominent Portrait & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Vibrant Glowing Gradient Backdrop */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-sky-500/40 via-cyan-500/30 to-blue-600/40 rounded-[36px] blur-xl opacity-60 animate-pulse" />

              {/* Main Card Container with CCTV Scanner Photo Frame */}
              <div className="relative bg-slate-950/90 backdrop-blur-md rounded-[32px] p-4 sm:p-5 border-2 border-slate-800 shadow-2xl shadow-black/80">
                <ScannerPhotoFrame
                  imageUrl={profile.avatarUrl}
                  name={profile.name}
                  onUpdateImage={onUpdateAvatar}
                  aspectRatioClass="aspect-[3/4] sm:aspect-square"
                />

                {/* Floating Highlight Card 1: 1 Year Experience */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700 shadow-xl shadow-black/60 flex items-center gap-3 z-20">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-xs">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">{profile.experienceYears}</div>
                    <div className="text-[11px] font-medium text-slate-400">Dedicated Experience</div>
                  </div>
                </div>

                {/* Floating Highlight Card 2: Satisfaction & Role */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700 shadow-xl shadow-black/60 flex items-center gap-3 z-20">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">Graphic & Video</div>
                    <div className="text-[11px] font-medium text-emerald-400 font-semibold">100% Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/90 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xs border border-slate-800 shadow-md hover:border-slate-700 hover:shadow-xl transition-all duration-200 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
