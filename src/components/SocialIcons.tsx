import React from 'react';
import { UserProfile } from '../types';

interface SocialLinkConfig {
  id: string;
  name: string;
  url: string;
  color: string;
  hoverBg: string;
  borderColor: string;
  icon: React.ReactNode;
}

interface SocialIconsProps {
  profile: UserProfile;
  variant?: 'hero' | 'contact' | 'compact';
  onEditLinks?: () => void;
}

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.201.3-.777.979-.953 1.18-.175.201-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.494-.894-.798-1.498-1.783-1.674-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.677-1.633-.928-2.235-.245-.587-.494-.508-.677-.517-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376-.276.3-1.053 1.028-1.053 2.508 0 1.48 1.079 2.909 1.229 3.11.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.72.23 1.376.197 1.895.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.276-.201-.577-.352zM12 21.82c-1.77 0-3.5-.463-5.02-1.341l-.36-.208-3.73.978.995-3.636-.229-.364C2.71 15.65 2.18 13.86 2.18 12c0-5.414 4.406-9.82 9.82-9.82 5.414 0 9.82 4.406 9.82 9.82 0 5.414-4.406 9.82-9.82 9.82zm0-21.82C5.373 0 0 5.373 0 12c0 2.115.552 4.103 1.516 5.836L0 24l6.335-1.487C8.01 23.473 9.948 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const SocialIconsBar: React.FC<SocialIconsProps> = ({ profile, variant = 'hero' }) => {
  const facebookUrl = profile.facebookUrl || 'https://www.facebook.com/profile.php?id=61593510214841';
  const whatsappUrl = profile.whatsappUrl || 'https://wa.me/?text=Hi%20Hasanullah%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project';
  const telegramUrl = profile.telegramUrl || 'https://t.me/hasanullah';
  const instagramUrl = profile.instagramUrl || 'https://instagram.com/';
  const twitterUrl = profile.twitterUrl || 'https://twitter.com/';

  const socialLinks: SocialLinkConfig[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      url: facebookUrl,
      color: 'text-[#1877F2]',
      hoverBg: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40',
      borderColor: 'border-[#1877F2]/20',
      icon: <FacebookIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: whatsappUrl,
      color: 'text-[#25D366]',
      hoverBg: 'hover:bg-[#25D366]/10 hover:border-[#25D366]/40',
      borderColor: 'border-[#25D366]/20',
      icon: <WhatsAppIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
    },
    {
      id: 'telegram',
      name: 'Telegram',
      url: telegramUrl,
      color: 'text-[#229ED9]',
      hoverBg: 'hover:bg-[#229ED9]/10 hover:border-[#229ED9]/40',
      borderColor: 'border-[#229ED9]/20',
      icon: <TelegramIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: instagramUrl,
      color: 'text-[#E1306C]',
      hoverBg: 'hover:bg-gradient-to-tr hover:from-[#F58529]/10 hover:via-[#DD2A7B]/10 hover:to-[#8134AF]/10 hover:border-[#E1306C]/40',
      borderColor: 'border-[#E1306C]/20',
      icon: <InstagramIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      url: twitterUrl,
      color: 'text-slate-100',
      hoverBg: 'hover:bg-slate-800 hover:border-slate-500',
      borderColor: 'border-slate-700',
      icon: <TwitterIcon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
    }
  ];

  if (variant === 'contact') {
    return (
      <div className="flex flex-wrap items-center gap-2.5">
        {socialLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`contact-social-${item.id}`}
            aria-label={`Open ${item.name} profile`}
            className={`group inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 border ${item.borderColor} ${item.color} ${item.hoverBg} shadow-2xs hover:shadow-lg transition-all duration-200 active:scale-95`}
          >
            {item.icon}
            <span className="text-xs font-bold text-slate-300 group-hover:text-white">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    );
  }

  // Hero variant - prominent, centered right in the middle below intro
  return (
    <div className="w-full my-6 p-3 sm:p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 shadow-xl shadow-black/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#1877F2] animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-slate-200 tracking-tight">
            Connect Directly • Social Profiles:
          </span>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`hero-social-${item.id}`}
              title={`Visit Hasanullah's ${item.name}`}
              className={`group relative overflow-hidden flex items-center justify-center p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-900 border ${item.borderColor} ${item.color} ${item.hoverBg} shadow-xs hover:shadow-2xl transition-all duration-300 hover:scale-125 hover:-translate-y-1.5 active:scale-95 z-10 hover:z-30`}
            >
              {/* Radiating Light Aura on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/0 via-white/0 to-cyan-400/0 group-hover:from-sky-400/20 group-hover:via-white/20 group-hover:to-cyan-400/20 transition-all duration-300 pointer-events-none rounded-2xl" />

              {/* Surface Light Sweep Flare */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-hover-light-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              {/* Outer Neon Glow Ring */}
              <div className="absolute -inset-1 rounded-2xl bg-current opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 pointer-events-none" />

              <span className="relative z-10 transition-transform duration-300 group-hover:scale-115 filter group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]">
                {item.icon}
              </span>

              <span className="hidden md:inline-block ml-2 text-xs font-bold text-slate-300 group-hover:text-white relative z-10">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
