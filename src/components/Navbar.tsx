import React, { useState } from 'react';
import { Menu, X, Send, Plus, Sparkles, Code2, ExternalLink } from 'lucide-react';
import { UserProfile } from '../types';
import { FacebookIcon } from './SocialIcons';

interface NavbarProps {
  profile: UserProfile;
  onOpenAddProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenAddProject
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#showcase', label: 'Work Showcase' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 border-b border-sky-150/80 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Hasanullah's Picture & Name */}
          <a
            href="#home"
            id="nav-brand-logo"
            className="group flex items-center gap-3.5 focus:outline-none"
          >
            {/* Logo Avatar with Sky Blue & Cyan Glowing Ring */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-600 shadow-md shadow-sky-400/30 group-hover:scale-105 group-hover:shadow-sky-400/50 transition-all duration-300">
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
                    className="w-full h-full object-cover rounded-[14px] bg-slate-100"
                  />
                ) : (
                  <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-slate-900 to-sky-950 flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
                    <span>HU</span>
                  </div>
                )}
              </div>
              {/* Online indicator badge */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </span>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-sky-800 to-blue-600 bg-clip-text text-transparent group-hover:to-sky-500 transition-colors">
                  {profile.name}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700 border border-sky-200">
                  PRO
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span className="text-sky-600 font-medium">Graphic Designer & Video Editor</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.href.replace('#', '')}`}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-sky-600 hover:bg-sky-50/80 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Facebook Profile Link */}
            <a
              href={profile.facebookUrl || "https://www.facebook.com/profile.php?id=61593510214841"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#1877F2] bg-white hover:bg-[#1877F2]/10 border border-[#1877F2]/20 hover:border-[#1877F2]/40 rounded-xl shadow-2xs transition-all hover:scale-102"
              title="Visit Hasanullah's Facebook"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>

            {/* Behance Link */}
            <a
              href="https://www.behance.net/hasanullah88"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200/90 rounded-xl shadow-2xs transition-all hover:scale-102"
              title="Visit Hasan Ullah on Behance"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
              <span>Behance</span>
            </a>

            {/* Add Project to Showcase Button */}
            <button
              onClick={onOpenAddProject}
              id="nav-add-project-btn"
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200/90 rounded-xl shadow-2xs transition-all hover:scale-102 active:scale-98"
              title="Add a custom project with live link"
            >
              <Plus className="w-3.5 h-3.5 text-sky-600" />
              <span>Add Project</span>
            </button>

            {/* Get In Touch CTA */}
            <a
              href="#contact"
              id="nav-cta-contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/30 hover:shadow-lg hover:shadow-sky-500/40 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle-btn"
              type="button"
              className="p-2 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-sky-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-sky-150 bg-white/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-sky-150 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddProject();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-sky-800 bg-sky-50 border border-sky-200 rounded-xl"
            >
              <Plus className="w-4 h-4 text-sky-600" />
              <span>+ Add Project to Showcase</span>
            </button>
            <a
              href="https://www.behance.net/hasanullah88"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-sky-800 bg-sky-50/80 border border-sky-200 rounded-xl"
            >
              <ExternalLink className="w-4 h-4 text-sky-600" />
              <span>Visit Hasan on Behance</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-500/30"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch / Hire Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
