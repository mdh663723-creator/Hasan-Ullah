import React from 'react';
import { Code2, Server, Layout, CheckCircle, Cpu, Sparkles, Layers } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const categoryThemes = [
    {
      icon: Code2,
      accent: 'from-sky-500 to-blue-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      glow: 'shadow-sky-500/10'
    },
    {
      icon: Server,
      accent: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      glow: 'shadow-emerald-500/10'
    },
    {
      icon: Layout,
      accent: 'from-purple-500 to-indigo-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      glow: 'shadow-purple-500/10'
    }
  ];

  return (
    <section id="skills" className="py-20 sm:py-24 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-md">
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>Technical Capabilities & Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Skills &{' '}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
            Consistently practicing industry best practices, modern architectural patterns, and responsive design systems to build high-grade software.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const theme = categoryThemes[idx % categoryThemes.length];
            const IconComp = theme.icon;
            return (
              <div
                key={idx}
                className={`bg-slate-950 rounded-3xl p-7 border-2 border-slate-800 shadow-xl ${theme.glow} hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-slate-800">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${theme.accent} flex items-center justify-center text-white shadow-md`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills list with animated progress indicators */}
                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => {
                    const gradient = skill.colorGradient || theme.accent;
                    return (
                      <div key={sIdx} className="group">
                        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                            {skill.name}
                          </span>
                          <span className="text-sky-400 font-mono font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <div
                            className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 group-hover:brightness-125`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
