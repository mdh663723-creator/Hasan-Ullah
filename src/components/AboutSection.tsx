import React from 'react';
import { User, CheckCircle2, Award, Zap, HeartHandshake, ShieldCheck, Sparkles, MapPin, Mail, Clock, Palette, Video, Bot } from 'lucide-react';
import { UserProfile } from '../types';

interface AboutSectionProps {
  profile: UserProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const highlights = [
    {
      icon: Palette,
      title: 'Visual Identity & Graphic Design',
      desc: 'Expertise in custom logo design, social media banners, posters, and high-CTR YouTube thumbnail art.',
      color: 'from-amber-400 to-orange-500'
    },
    {
      icon: Video,
      title: 'Dynamic Video Editing & Reels',
      desc: 'High-retention Reels, YouTube videos, cinematic color grading in DaVinci Resolve, and tailored sound effects.',
      color: 'from-purple-400 to-indigo-600'
    },
    {
      icon: Bot,
      title: 'AI Automation & Smart Pipelines',
      desc: 'Automated content pipelines with n8n/Make, auto-generated synchronized captions, and generative AI assets.',
      color: 'from-sky-400 to-blue-600'
    },
    {
      icon: HeartHandshake,
      title: 'Dedicated Client Satisfaction',
      desc: '1 year of focused creative dedication, rapid turnarounds, clear communication, and pixel-perfect deliverables.',
      color: 'from-emerald-400 to-teal-600'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Profile Card of Hasanullah */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glowing colorful gradient backdrop */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-sky-500/20 via-cyan-500/20 to-blue-600/20 rounded-[32px] blur-xl opacity-60" />

              <div className="relative bg-slate-950 rounded-3xl p-6 sm:p-8 border-2 border-slate-800 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar Frame with colorful ring and white CC scanner */}
                  <div className="relative w-20 h-20 rounded-2xl p-0.5 bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-600 shadow-md overflow-hidden group shrink-0">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src && !target.src.endsWith('/watermark.jpg')) {
                            target.src = '/watermark.jpg';
                          }
                        }}
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    ) : (
                      <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-slate-900 to-sky-950 flex items-center justify-center text-white font-extrabold text-xl tracking-wider">
                        <span>HU</span>
                      </div>
                    )}
                    {/* White CC Corner Light (Delicate Diagonal Flare) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[14px]">
                      <div className="absolute top-0 left-0 w-[220%] h-6 pointer-events-none origin-top-left animate-corner-cc-light">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_6px_#ffffff]" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      {profile.name}
                    </h3>
                    <p className="text-xs font-extrabold text-sky-400 uppercase tracking-wide mt-0.5">
                      Graphic Designer & Video Editor
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  "I am passionate about visual storytelling through graphic design and video editing, continuously integrating AI automation tools to accelerate production workflows and deliver top-tier creative work."
                </p>

                {/* Info Pills */}
                <div className="space-y-3 mb-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      Experience:
                    </span>
                    <span className="font-bold text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-md border border-sky-800/60">
                      {profile.experienceYears}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-400" />
                      Direct Email:
                    </span>
                    <span className="font-bold text-sky-300">
                      {profile.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-purple-400" />
                      Learning Focus:
                    </span>
                    <span className="font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-800/60">
                      AI Automation
                    </span>
                  </div>
                </div>

                {/* Quick Checklist */}
                <div className="pt-5 border-t border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Quality & High-Resolution Project Deliverables</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited revisions to ensure complete client satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Optimized social media formats (YouTube, Reels, Facebook)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-md">
              <User className="w-4 h-4 text-sky-400" />
              <span>About My Profile & Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Creative Graphic Design, Video Editing &{' '}
              <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-400 bg-clip-text text-transparent">
                AI Automation
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              With 1 year of dedicated experience in graphic design and video editing, I focus on crafting visually compelling, high-converting digital assets. From high-retention social reels and high-CTR thumbnails to comprehensive brand identities, I combine sharp creative instincts with AI Automation tools to ensure high-speed, top-caliber execution.
            </p>

            {/* Highlights 2x2 Grid with vibrant colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 hover:border-sky-500/60 hover:shadow-lg transition-all duration-200"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white mb-3.5 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-extrabold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
