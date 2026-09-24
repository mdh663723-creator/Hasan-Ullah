import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Flame,
  Trophy,
  Palette,
  Video,
  Bot,
  Play,
  RotateCcw,
  Film,
  Expand
} from 'lucide-react';
import { UserProfile } from '../types';
import { ScannerPhotoFrame } from './ScannerPhotoFrame';
import { SocialIconsBar } from './SocialIcons';

interface HeroProps {
  profile: UserProfile;
  onViewShowcase: () => void;
  onUpdateAvatar?: (newUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onViewShowcase, onUpdateAvatar }) => {
  const [isPlayingShowreel, setIsPlayingShowreel] = useState(false);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: profile.completedProjects, label: 'Completed Projects', icon: Trophy, color: 'from-sky-500 to-blue-600' },
    { number: profile.clientRating, label: 'Client Satisfaction', icon: CheckCircle2, color: 'from-emerald-400 to-teal-600' },
    { number: profile.experienceYears, label: 'Dedicated Experience', icon: Flame, color: 'from-amber-400 to-orange-500' },
    { number: 'AI Automation', label: 'Continuous Learning & Focus', icon: Bot, color: 'from-purple-500 to-indigo-600' }
  ];

  const techBadges = [
    { name: 'Adobe Premiere Pro', bg: 'bg-purple-950/70 text-purple-300 border-purple-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(192,132,252,0.7)]' },
    { name: 'After Effects', bg: 'bg-indigo-950/70 text-indigo-300 border-indigo-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(129,140,248,0.7)]' },
    { name: 'Adobe Photoshop', bg: 'bg-sky-950/70 text-sky-300 border-sky-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(56,189,248,0.7)]' },
    { name: 'Adobe Illustrator', bg: 'bg-amber-950/70 text-amber-300 border-amber-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(251,191,36,0.7)]' },
    { name: 'Reels & Shorts Editing', bg: 'bg-pink-950/70 text-pink-300 border-pink-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(244,114,182,0.7)]' },
    { name: 'DaVinci Resolve', bg: 'bg-emerald-950/70 text-emerald-300 border-emerald-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(52,211,153,0.7)]' },
    { name: 'AI Automation (n8n/Make)', bg: 'bg-cyan-950/70 text-cyan-300 border-cyan-700/70', glow: 'group-hover:shadow-[0_0_24px_rgba(34,211,238,0.7)]' },
    { name: 'CapCut Desktop', bg: 'bg-slate-900 text-slate-200 border-slate-700', glow: 'group-hover:shadow-[0_0_24px_rgba(148,163,184,0.7)]' }
  ];

  const handleFullscreenVideo = () => {
    if (videoWrapperRef.current) {
      if (videoWrapperRef.current.requestFullscreen) {
        videoWrapperRef.current.requestFullscreen().catch(() => {});
      } else if ((videoWrapperRef.current as any).webkitRequestFullscreen) {
        (videoWrapperRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-black/60 via-slate-950/50 to-transparent"
    >
      {/* Ambient Lighting Orbs */}
      <div
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-sky-600/15 via-blue-900/10 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 w-[450px] h-[450px] bg-gradient-to-bl from-purple-600/15 via-blue-950/15 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 -left-24 w-[380px] h-[380px] bg-gradient-to-tr from-sky-900/15 via-slate-900/10 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row: Status, Intro, Headline */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-lg text-sky-300 text-xs sm:text-sm font-bold mb-4 hover:border-sky-400 transition-colors">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">
              Available for Video Editing & Graphic Design Projects
            </span>
            <Sparkles className="w-4 h-4 text-sky-400 ml-0.5" />
          </div>

          {/* Main Headline */}
          <div className="group/hero-title inline-block transition-all duration-300 mb-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18]">
              <span className="inline-block mr-3 sm:mr-4 transition-all duration-300 text-white">
                Hi, I'm
              </span>
              <span className="relative inline-block bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 bg-clip-text text-transparent underline decoration-sky-400/80 decoration-wavy decoration-2">
                {profile.name}
              </span>
              <br />
              <span className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-100 via-indigo-200 to-purple-300 bg-clip-text text-transparent inline-block mt-1">
                Graphic Designer & Video Editor
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal mb-3">
            {profile.tagline}
          </p>

          {/* Special AI Automation Learning Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/80 text-purple-200 text-xs sm:text-sm font-medium shadow-md">
            <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Currently Learning: <strong className="text-purple-300 font-bold">AI Automation & Smart Workflows</strong></span>
          </div>
        </div>

        {/* Visual Spotlight Hub: Motion Graphics Showreel (Left 7 Cols) + Hasanullah's Portrait (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Official Motion Graphics Showreel Player */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-sky-500/30 via-purple-500/30 to-blue-600/30 shadow-2xl shadow-sky-500/10 border border-sky-500/30">
              <div className="bg-slate-950/95 backdrop-blur-md rounded-[22px] overflow-hidden p-3 sm:p-4 border border-slate-800">
                {/* Showreel Header Bar */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-purple-950/90 text-purple-300 border border-purple-800/80 shrink-0">
                      Featured Showreel
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                      Motion Graphics & Video Editing
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isPlayingShowreel && (
                      <button
                        type="button"
                        onClick={handleFullscreenVideo}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                        title="Fullscreen View"
                      >
                        <Expand className="w-3.5 h-3.5 text-sky-400" />
                        <span className="hidden sm:inline">Fullscreen</span>
                      </button>
                    )}

                    <a
                      href="https://youtu.be/VP4GKLGXoaU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-800/60 transition-colors"
                      title="Open on YouTube"
                    >
                      <Film className="w-3.5 h-3.5 text-red-400" />
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                    </a>
                  </div>
                </div>

                {/* Video Container (16:9 Landscape) */}
                <div
                  ref={videoWrapperRef}
                  className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800/90 group/video"
                >
                  {isPlayingShowreel ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src="https://www.youtube.com/embed/VP4GKLGXoaU?autoplay=1&rel=0&playsinline=1&fs=1&enablejsapi=1"
                        title="Hasanullah - Motion Graphics & Video Editing Showreel"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full border-0 block"
                      />
                      <button
                        onClick={() => setIsPlayingShowreel(false)}
                        type="button"
                        className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-md transition-colors"
                        title="Back to poster"
                      >
                        <RotateCcw className="w-3 h-3 text-sky-400" />
                        <span>Poster</span>
                      </button>
                    </div>
                  ) : (
                    // Interactive Poster with Pulsing Play Button
                    <div
                      onClick={() => setIsPlayingShowreel(true)}
                      className="relative w-full h-full cursor-pointer overflow-hidden flex items-center justify-center select-none"
                      title="Click to play Hasanullah's Motion Graphics Showreel"
                    >
                      {/* High-Res Showreel Thumbnail */}
                      <img
                        src="/projects/motion-graphics-showreel.jpg"
                        alt="Official Motion Graphics & Video Editing Showreel by Hasanullah"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                      />

                      {/* Ambient Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase bg-black/75 text-sky-300 border border-sky-500/30 backdrop-blur-md">
                          1080p Full HD
                        </span>
                        <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-black/75 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                          After Effects & Premiere Pro
                        </span>
                      </div>

                      {/* Center Vibrant Play Button */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-sky-500/50 group-hover/video:scale-110 active:scale-95 transition-all duration-300">
                          <span className="absolute -inset-2 rounded-full bg-sky-400/40 animate-ping opacity-60 pointer-events-none" />
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white text-white drop-shadow-md" />
                        </div>
                        <div className="mt-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-white shadow-lg group-hover/video:text-sky-300 transition-colors">
                          ▶ Click to Play Showreel
                        </div>
                      </div>

                      {/* Bottom Metrics Bar */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-slate-300 pointer-events-none">
                        <span className="truncate">Highlights of 2D/3D Kinetic Animation, Cuts & VFX</span>
                        <span className="shrink-0 text-emerald-400 font-bold ml-2">Edited by Hasanullah</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Showreel Key Highlights */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Kinetic Typography</span>
                    <span className="text-slate-600">•</span>
                    <span>Scene Cuts</span>
                    <span className="text-slate-600">•</span>
                    <span>Sound Design</span>
                    <span className="text-slate-600">•</span>
                    <span>Visual Effects</span>
                  </div>

                  <span className="text-sky-400 font-semibold text-[11px]">
                    Official 2026 Reel
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hasanullah's Portrait Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Vibrant Glowing Gradient Backdrop */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-sky-500/30 via-cyan-500/20 to-blue-600/30 rounded-[36px] blur-xl opacity-60 animate-pulse" />

              {/* Main Card Container with CCTV Scanner Photo Frame */}
              <div className="relative bg-slate-950/90 backdrop-blur-md rounded-[32px] p-4 sm:p-5 border-2 border-slate-800 shadow-2xl shadow-black/80">
                <ScannerPhotoFrame
                  imageUrl={profile.avatarUrl}
                  name={profile.name}
                  onUpdateImage={onUpdateAvatar}
                  aspectRatioClass="aspect-[3/4] sm:aspect-square"
                />

                {/* Floating Highlight Card 1: 1 Year Experience */}
                <div className="absolute -top-3 -right-3 sm:-right-4 bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 shadow-xl shadow-black/60 flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-xs">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">{profile.experienceYears}</div>
                    <div className="text-[10px] font-medium text-slate-400">Dedicated Experience</div>
                  </div>
                </div>

                {/* Floating Highlight Card 2: Satisfaction & Role */}
                <div className="absolute -bottom-4 -left-3 sm:-left-4 bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 shadow-xl shadow-black/60 flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">Graphic & Video</div>
                    <div className="text-[10px] font-semibold text-emerald-400">{profile.clientRating}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons, Social Icons & Badges Row */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={onViewShowcase}
              id="hero-btn-showcase"
              type="button"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-98"
            >
              <span>Explore All Projects & Videos</span>
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

          {/* Social Icons Bar (WhatsApp, Facebook, Telegram, etc.) */}
          <SocialIconsBar profile={profile} />

          {/* Tech Badges Row */}
          <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 mr-1 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-sky-400 animate-pulse" />
              Specialized Tools:
            </span>
            {techBadges.map((badge, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold rounded-xl border shadow-xs transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer select-none ${badge.bg} ${badge.glow}`}
              >
                <span className="relative z-10 tracking-tight inline-block">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid Bar */}
        <div className="pt-8 border-t border-slate-800/90 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
