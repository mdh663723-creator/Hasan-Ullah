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
    { name: 'Adobe Photoshop', bg: 'bg-sky-50 text-sky-700 border-sky-200' },
    { name: 'Adobe Premiere Pro', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Adobe Illustrator', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    { name: 'Reels & Shorts Editing', bg: 'bg-pink-50 text-pink-700 border-pink-200' },
    { name: 'After Effects', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'DaVinci Resolve', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'AI Automation (n8n/Make)', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { name: 'CapCut Desktop', bg: 'bg-slate-100 text-slate-800 border-slate-300' }
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white"
    >
      {/* Dynamic Colorful Ambient Lighting Orbs */}
      <div
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-sky-300/45 via-cyan-200/35 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-blue-300/35 via-sky-200/30 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 -left-24 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-300/35 via-sky-100/40 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro & Headline */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status Pill with Colorful Gradient Border */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-sky-200 shadow-xs text-sky-800 text-xs sm:text-sm font-bold mb-6 hover:border-sky-300 transition-colors">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide">
                Available for Freelance Projects & Remote Work
              </span>
              <Sparkles className="w-4 h-4 text-sky-500 ml-0.5" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 bg-clip-text text-transparent underline decoration-sky-300/80 decoration-wavy decoration-2">
                {profile.name}
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
                Graphic Designer & Video Editor
              </span>
            </h1>

            {/* Special AI Automation Learning Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 text-purple-900 text-xs sm:text-sm font-bold mb-6 shadow-2xs">
              <Bot className="w-4 h-4 text-purple-600 animate-pulse" />
              <span>Currently Learning & Mastering: <span className="text-indigo-700 font-extrabold">AI Automation & Smart Workflows</span></span>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-9 leading-relaxed font-normal">
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10 w-full sm:w-auto">
              <button
                onClick={onViewShowcase}
                id="hero-btn-showcase"
                type="button"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/40 transition-all duration-200 active:scale-98"
              >
                <span>View Portfolio & Video Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#contact"
                id="hero-btn-contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-sky-50/90 border border-sky-200 hover:border-sky-300 shadow-xs hover:shadow-sm transition-all duration-200"
              >
                <span>Contact Me</span>
                <ExternalLink className="w-4 h-4 text-sky-600" />
              </a>

              <a
                href="#skills"
                id="hero-btn-resume"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-sky-800 bg-sky-100/80 hover:bg-sky-100 border border-sky-200 transition-all duration-200"
              >
                <Palette className="w-4 h-4 text-sky-600" />
                <span>Skills & Tools</span>
              </a>
            </div>

            {/* Prominent Direct Social Icons: Facebook, WhatsApp, Telegram, Instagram, Twitter/X */}
            <SocialIconsBar profile={profile} />

            {/* Tech Badges Row */}
            <div className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 mr-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-sky-600" />
                Specialized Tools:
              </span>
              {techBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border shadow-2xs transition-transform hover:-translate-y-0.5 ${badge.bg}`}
                >
                  {badge.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Prominent Portrait & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Vibrant Glowing Gradient Backdrop */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-600 rounded-[36px] blur-xl opacity-40 animate-pulse" />

              {/* Main Card Container with CCTV Scanner Photo Frame */}
              <div className="relative bg-white/95 backdrop-blur-md rounded-[32px] p-4 sm:p-5 border-2 border-sky-200/90 shadow-2xl shadow-sky-500/20">
                <ScannerPhotoFrame
                  imageUrl={profile.avatarUrl}
                  name={profile.name}
                  onUpdateImage={onUpdateAvatar}
                  aspectRatioClass="aspect-[3/4] sm:aspect-square"
                />

                {/* Floating Highlight Card 1: 1 Year Experience */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sky-200 shadow-lg shadow-sky-500/15 flex items-center gap-3 z-20">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-xs">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">{profile.experienceYears}</div>
                    <div className="text-[11px] font-medium text-slate-500">Dedicated Experience</div>
                  </div>
                </div>

                {/* Floating Highlight Card 2: Satisfaction & Role */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sky-200 shadow-lg shadow-sky-500/15 flex items-center gap-3 z-20">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Graphic & Video</div>
                    <div className="text-[11px] font-medium text-emerald-600 font-semibold">100% Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Bar */}
        <div className="mt-16 pt-8 border-t border-sky-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-sky-150 shadow-xs hover:border-sky-300 hover:shadow-md transition-all duration-200 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {stat.number}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
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
