import React from 'react';
import { ArrowUp, Heart, Mail, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { FacebookIcon, WhatsAppIcon, TelegramIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

interface FooterProps {
  profile: UserProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t-2 border-sky-150 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand with Hasanullah's Photo */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-600 shadow-md shrink-0">
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
                <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-slate-900 to-sky-950 flex items-center justify-center text-white font-extrabold text-xs tracking-wider">
                  <span>HU</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900">
                  {profile.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                  PORTFOLIO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Graphic Designer & Video Editor • Learning AI Automation
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
            <a href="#home" className="hover:text-sky-600 transition-colors">
              Home
            </a>
            <a href="#showcase" className="hover:text-sky-600 transition-colors">
              Showcase
            </a>
            <a href="#skills" className="hover:text-sky-600 transition-colors">
              Skills
            </a>
            <a href="#about" className="hover:text-sky-600 transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-sky-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            type="button"
            id="footer-back-to-top"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 shadow-2xs transition-all hover:scale-105 active:scale-95"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky-600 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Official Social Branding Icons Row */}
        <div className="mt-8 pt-6 border-t border-sky-100/80 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Official Profiles & Direct Links:
          </span>
          <div className="flex items-center gap-2">
            <a
              href={profile.facebookUrl || "https://www.facebook.com/profile.php?id=61593510214841"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-colors shadow-2xs hover:scale-105"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.whatsappUrl || "https://wa.me/"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors shadow-2xs hover:scale-105"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.telegramUrl || "https://t.me/hasanullah"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#229ED9]/10 text-[#229ED9] border border-[#229ED9]/20 hover:border-[#229ED9]/40 transition-colors shadow-2xs hover:scale-105"
              title="Telegram"
            >
              <TelegramIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.instagramUrl || "https://instagram.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#E1306C]/10 text-[#E1306C] border border-[#E1306C]/20 hover:border-[#E1306C]/40 transition-colors shadow-2xs hover:scale-105"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.twitterUrl || "https://twitter.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-900/10 text-slate-800 border border-slate-300 hover:border-slate-500 transition-colors shadow-2xs hover:scale-105"
              title="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-8 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with passion, clean code, and vibrant gradients for</span>
            <span className="font-bold text-sky-700">{profile.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
