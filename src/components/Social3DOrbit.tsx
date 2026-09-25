import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { UserProfile } from '../types';
import {
  FacebookIcon,
  WhatsAppIcon,
  TelegramIcon,
  InstagramIcon,
  TwitterIcon,
  BehanceIcon
} from './SocialIcons';
import {
  ExternalLink,
  MoveVertical,
  CheckCircle2,
  Play,
  Pause
} from 'lucide-react';

export interface Social3DOrbitProps {
  profile: UserProfile;
  className?: string;
  onExploreProjects?: () => void;
}

interface OrbitItem {
  id: string;
  name: string;
  banglaName: string;
  handle: string;
  actionText: string;
  url: string;
  brandColor: string;
  secondaryColor: string;
  badgeBg: string;
  borderColor: string;
  borderGlow: string;
  icon: React.ReactNode;
}

export const Social3DOrbit: React.FC<Social3DOrbitProps> = ({
  profile,
  className = '',
  onExploreProjects
}) => {
  // URLs from profile or defaults
  const facebookUrl = profile.facebookUrl || 'https://www.facebook.com/profile.php?id=61593510214841';
  const whatsappUrl = profile.whatsappUrl || 'https://wa.me/?text=Hi%20Hasanullah%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project';
  const telegramUrl = profile.telegramUrl || 'https://t.me/hasanullah';
  const instagramUrl = profile.instagramUrl || 'https://instagram.com/';
  const twitterUrl = profile.twitterUrl || 'https://twitter.com/';
  const behanceUrl = profile.behanceUrl || 'https://www.behance.net/hasanullah88';

  // Rotation & State
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<OrbitItem | null>(null);
  const [displayScalePercent, setDisplayScalePercent] = useState<number>(100);

  // Dynamic Scale: small to large based on cursor Y (top to bottom)
  const targetScaleRef = useRef<number>(1.0);
  const currentScaleRef = useRef<number>(1.0);

  // Animation refs for 60-120fps direct DOM transforms
  const stageRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);
  const itemElementsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const orbitRingsSvgRef = useRef<SVGSVGElement | null>(null);
  const centerCoreRef = useRef<HTMLDivElement | null>(null);

  // Responsive stage width state
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    const updateSize = () => {
      if (stageRef.current) {
        setContainerWidth(stageRef.current.clientWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Social Items definition: 6 items evenly spaced across 360 degrees (60 deg apart)
  const allSocialItems: OrbitItem[] = useMemo(() => {
    return [
      {
        id: 'facebook',
        name: 'Facebook',
        banglaName: 'ফেসবুক আইডি',
        handle: 'Hasanullah',
        actionText: 'ফেসবুকে যান',
        url: facebookUrl,
        brandColor: '#1877F2',
        secondaryColor: '#0c5ec7',
        badgeBg: 'bg-[#1877F2]',
        borderColor: 'border-[#1877F2]/60 hover:border-[#1877F2]',
        borderGlow: '0 0 28px rgba(24, 119, 242, 0.75)',
        icon: <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        banglaName: 'হোয়াটসঅ্যাপ',
        handle: 'Direct Chat',
        actionText: 'মেসেজ পাঠান',
        url: whatsappUrl,
        brandColor: '#25D366',
        secondaryColor: '#1ea952',
        badgeBg: 'bg-[#25D366]',
        borderColor: 'border-[#25D366]/60 hover:border-[#25D366]',
        borderGlow: '0 0 28px rgba(37, 211, 102, 0.75)',
        icon: <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      },
      {
        id: 'behance',
        name: 'Behance',
        banglaName: 'বিহ্যান্স পোর্টফোলিও',
        handle: 'hasanullah88',
        actionText: 'শোকেস দেখুন',
        url: behanceUrl,
        brandColor: '#0057FF',
        secondaryColor: '#0043c7',
        badgeBg: 'bg-[#0057FF]',
        borderColor: 'border-[#0057FF]/60 hover:border-[#0057FF]',
        borderGlow: '0 0 28px rgba(0, 87, 255, 0.75)',
        icon: <BehanceIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      },
      {
        id: 'telegram',
        name: 'Telegram',
        banglaName: 'টেলিগ্রাম',
        handle: '@hasanullah',
        actionText: 'কানেক্ট করুন',
        url: telegramUrl,
        brandColor: '#229ED9',
        secondaryColor: '#1a7ca9',
        badgeBg: 'bg-[#229ED9]',
        borderColor: 'border-[#229ED9]/60 hover:border-[#229ED9]',
        borderGlow: '0 0 28px rgba(34, 158, 217, 0.75)',
        icon: <TelegramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      },
      {
        id: 'instagram',
        name: 'Instagram',
        banglaName: 'ইনস্টাগ্রাম',
        handle: 'Motion Visuals',
        actionText: 'ফলো করুন',
        url: instagramUrl,
        brandColor: '#E1306C',
        secondaryColor: '#C13584',
        badgeBg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
        borderColor: 'border-[#E1306C]/60 hover:border-[#E1306C]',
        borderGlow: '0 0 28px rgba(225, 48, 108, 0.75)',
        icon: <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      },
      {
        id: 'twitter',
        name: 'Twitter / X',
        banglaName: 'টুইটার (X)',
        handle: 'Updates & Media',
        actionText: 'ফলো করুন',
        url: twitterUrl,
        brandColor: '#F8FAFC',
        secondaryColor: '#94A3B8',
        badgeBg: 'bg-slate-800',
        borderColor: 'border-slate-400/60 hover:border-white',
        borderGlow: '0 0 28px rgba(255, 255, 255, 0.6)',
        icon: <TwitterIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      }
    ];
  }, [facebookUrl, whatsappUrl, behanceUrl, telegramUrl, instagramUrl, twitterUrl]);

  // Perfectly balanced base radii so the icons are spaced out evenly and medium
  const { baseRadiusX, baseRadiusY } = useMemo(() => {
    const w = containerWidth;
    if (w < 440) {
      return { baseRadiusX: Math.min(w * 0.38, 140), baseRadiusY: 58 };
    }
    if (w < 640) {
      return { baseRadiusX: Math.min(w * 0.38, 185), baseRadiusY: 72 };
    }
    if (w < 1024) {
      return { baseRadiusX: Math.min(w * 0.36, 235), baseRadiusY: 90 };
    }
    return { baseRadiusX: 265, baseRadiusY: 100 };
  }, [containerWidth]);

  // Cursor vertical tracking: top (0.75x) to bottom (1.30x)
  const handlePointerVerticalMove = useCallback((clientY: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const topLimit = rect.top - 80;
    const bottomLimit = rect.bottom + 80;
    const progress = Math.max(0, Math.min(1, (clientY - topLimit) / (bottomLimit - topLimit)));
    
    // Scale ranges smoothly from 0.75 to 1.30
    const newTargetScale = 0.75 + progress * 0.55;
    targetScaleRef.current = newTargetScale;
  }, []);

  // Window-level mouse & touch tracking
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      handlePointerVerticalMove(e.clientY);
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointerVerticalMove(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
    };
  }, [handlePointerVerticalMove]);

  // Keep ref sync with states
  const isAutoRotatingRef = useRef(isAutoRotating);
  isAutoRotatingRef.current = isAutoRotating;

  // Direct DOM updates for butter-smooth 60-120fps rotation and scale
  const updateItemPositions = useCallback(() => {
    const totalItems = allSocialItems.length;
    const baseAngle = angleRef.current;

    // Smoothly lerp scale towards target
    const currentScale = currentScaleRef.current + (targetScaleRef.current - currentScaleRef.current) * 0.08;
    currentScaleRef.current = currentScale;

    const dynamicRadiusX = baseRadiusX * currentScale;
    const dynamicRadiusY = baseRadiusY * currentScale;

    // Update SVG rings dynamically
    if (orbitRingsSvgRef.current) {
      const mainEllipse = orbitRingsSvgRef.current.querySelector('#main-orbit-ellipse');
      const innerEllipse = orbitRingsSvgRef.current.querySelector('#inner-orbit-ellipse');
      if (mainEllipse) {
        mainEllipse.setAttribute('rx', `${dynamicRadiusX}`);
        mainEllipse.setAttribute('ry', `${dynamicRadiusY}`);
      }
      if (innerEllipse) {
        innerEllipse.setAttribute('rx', `${dynamicRadiusX * 0.7}`);
        innerEllipse.setAttribute('ry', `${dynamicRadiusY * 0.7}`);
      }
    }

    // Scale center core while strictly maintaining translate(-50%, -50%) dead center
    if (centerCoreRef.current) {
      const coreScale = 0.88 + (currentScale - 1) * 0.35;
      centerCoreRef.current.style.transform = `translate(-50%, -50%) scale(${coreScale})`;
    }

    let closestItem: OrbitItem | null = null;
    let maxZ = -999;

    allSocialItems.forEach((item, idx) => {
      const el = itemElementsRef.current[item.id];
      if (!el) return;

      // Equal 60-degree spacing around the 360-degree circle
      const itemAngle = baseAngle + (idx * (2 * Math.PI / totalItems));
      const sinA = Math.sin(itemAngle);
      const cosA = Math.cos(itemAngle);

      // 3D coordinates relative to center origin
      const x = sinA * dynamicRadiusX;
      const y = cosA * dynamicRadiusY;
      const z = cosA; // -1 (back) to +1 (front)

      const normalizedZ = (z + 1) / 2; // 0 to 1
      const depthScale = 0.74 + 0.38 * normalizedZ;
      const opacity = 0.48 + 0.52 * normalizedZ;
      const zIndex = Math.round(15 + normalizedZ * 70);
      const blur = z < -0.3 ? Math.round(Math.abs(z) * 1.5) : 0;

      if (z > maxZ) {
        maxZ = z;
        closestItem = item;
      }

      const isThisHovered = hoveredItemId === item.id;
      const itemFinalScale = (isThisHovered ? depthScale * 1.25 : depthScale) * (0.88 + (currentScale - 1) * 0.40);
      const finalOpacity = isThisHovered ? 1 : opacity;
      const finalZIndex = isThisHovered ? 99 : zIndex;

      // CRITICAL: Must include translate(-50%, -50%) so card is centered on (x, y) rather than anchored by top-left!
      el.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) scale(${itemFinalScale})`;
      el.style.zIndex = `${finalZIndex}`;
      el.style.opacity = `${finalOpacity}`;
      el.style.filter = blur > 0 && !isThisHovered ? `blur(${blur}px)` : 'none';

      if (normalizedZ > 0.6 || isThisHovered) {
        el.style.boxShadow = item.borderGlow;
      } else {
        el.style.boxShadow = '0 4px 14px rgba(0,0,0,0.6)';
      }
    });

    if (closestItem && !hoveredItemId) {
      setActiveItem(closestItem);
    }
  }, [allSocialItems, baseRadiusX, baseRadiusY, hoveredItemId]);

  // Main 60-120fps animation loop
  useEffect(() => {
    let lastTime = performance.now();
    let tickCount = 0;

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      tickCount++;

      // Dragging on empty stage
      if (isDraggingRef.current) {
        updateItemPositions();
        animFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      // Inertia decay
      if (Math.abs(velocityRef.current) > 0.0005) {
        angleRef.current += velocityRef.current;
        velocityRef.current *= 0.94;
      }

      // Continuous 3D rotation
      if (isAutoRotatingRef.current) {
        const hoverFactor = isHoveredRef.current ? 0.2 : 1.0;
        const angularSpeed = 0.55 * hoverFactor;
        angleRef.current += angularSpeed * dt;
      }

      updateItemPositions();

      if (tickCount % 12 === 0) {
        setDisplayScalePercent(Math.round(currentScaleRef.current * 100));
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [updateItemPositions]);

  // Stage pointer drag on EMPTY SPACE only
  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }

    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = angleRef.current;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerVerticalMove(e.clientY);

    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const deltaX = currentX - dragStartXRef.current;
    const now = performance.now();
    const timeDelta = Math.max(now - lastDragTimeRef.current, 1);

    const rotationSensitivity = 0.008;
    angleRef.current = dragStartAngleRef.current + deltaX * rotationSensitivity;
    velocityRef.current = (deltaX * rotationSensitivity) / (timeDelta / 16.6);
    velocityRef.current = Math.max(Math.min(velocityRef.current, 0.08), -0.08);
    lastDragTimeRef.current = now;
  };

  const handleStagePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Direct fail-safe link opener
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.stopPropagation();
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }
  };

  return (
    <div
      className={`w-full relative select-none py-2 overflow-visible ${className}`}
      id="social-3d-orbit-container"
    >
      {/* 
        NO BOX, NO BORDER, NO ROOM CONTAINER!
        Floats completely freely in open transparent space.
        Profile picture and 3D orbit origin are 100% DEAD-CENTER!
      */}
      <div
        ref={stageRef}
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        onPointerCancel={handleStagePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          setHoveredItemId(null);
        }}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        {/* Subtle Ambient Cosmic Glow in Empty Space */}
        <div
          className="pointer-events-none absolute w-[400px] sm:w-[580px] h-[180px] rounded-full bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl -z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        />

        {/* 3D Holographic Orbit Tracks (Centered at 50% 50%) */}
        <svg
          ref={orbitRingsSvgRef}
          className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible"
        >
          <defs>
            <linearGradient id="orbitGradClean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#0057FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#25D366" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="orbitGradInner" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E1306C" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1877F2" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Primary Orbit Ellipse - Exactly Centered at 50% 50% */}
          <ellipse
            id="main-orbit-ellipse"
            cx="50%"
            cy="50%"
            rx={baseRadiusX}
            ry={baseRadiusY}
            fill="none"
            stroke="url(#orbitGradClean)"
            strokeWidth="2.2"
            strokeDasharray="6 7"
            filter="url(#glowEffect)"
            className="animate-spin-slow opacity-90"
            style={{ transformOrigin: 'center', animationDuration: '40s' }}
          />

          {/* Secondary Concentric Ellipse - Exactly Centered at 50% 50% */}
          <ellipse
            id="inner-orbit-ellipse"
            cx="50%"
            cy="50%"
            rx={baseRadiusX * 0.7}
            ry={baseRadiusY * 0.7}
            fill="none"
            stroke="url(#orbitGradInner)"
            strokeWidth="1.2"
            strokeDasharray="3 5"
            className="opacity-40"
          />
        </svg>

        {/* 
          Central Profile Picture Core
          EXACTLY at 50% 50% (Dead Center / মধ্যস্থল)
        */}
        <div
          ref={centerCoreRef}
          className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none select-none z-35 transition-transform duration-100 ease-out"
          style={{
            transform: 'translate(-50%, -50%) scale(1)'
          }}
        >
          {/* Radial Aura Rings */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-sky-500/20 blur-xl animate-ping opacity-30" />
          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-sky-500/30 via-indigo-500/25 to-purple-600/30 blur-md animate-pulse" />

          {/* Avatar Ring Container */}
          <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 shadow-2xl shadow-sky-500/50 border border-sky-300/50 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-1 overflow-hidden border border-slate-700/80">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-600 to-blue-800 flex items-center justify-center text-white font-black text-xs sm:text-sm">
                  {profile.name.charAt(0) || 'H'}
                </div>
              )}
            </div>

            {/* Orbiting Photon Light Dot */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow pointer-events-none"
              style={{ animationDuration: '6s' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8] -top-1 left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* Central Label */}
          <div className="mt-2 px-3 py-0.5 rounded-full bg-slate-900/90 border border-sky-500/40 backdrop-blur-md text-[10px] sm:text-xs font-bold text-sky-300 shadow-lg flex items-center gap-1">
            <span>Hasanullah</span>
          </div>
        </div>

        {/* 
          3D Orbiting Social Icon Cards Floating in Space
          Centered exactly at 50% 50%, with each card centered on its orbital point
        */}
        <div
          className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none"
          style={{
            transform: 'translate(-50%, -50%)'
          }}
        >
          {allSocialItems.map((item) => (
            <a
              key={item.id}
              ref={(el) => {
                itemElementsRef.current[item.id] = el;
              }}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`orbit-social-${item.id}`}
              title={`Open ${item.name} (${item.banglaName}) - Click to visit`}
              onPointerDown={(e) => {
                // Prevent drag capture on icon click
                e.stopPropagation();
              }}
              onClick={(e) => handleItemClick(e, item.url)}
              onMouseEnter={() => {
                setHoveredItemId(item.id);
                setActiveItem(item);
              }}
              onMouseLeave={() => setHoveredItemId(null)}
              className={`group pointer-events-auto absolute flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border ${item.borderColor} cursor-pointer transition-all duration-150 active:scale-95 shadow-xl select-none`}
              style={{
                willChange: 'transform, opacity, z-index',
                transform: 'translate3d(0,0,0) translate(-50%, -50%) scale(1)'
              }}
            >
              {/* Brand Icon Badge */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${item.badgeBg} flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform duration-200 shrink-0`}
              >
                {item.icon}
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left pr-1 min-w-[70px] sm:min-w-[85px]">
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-sky-300 transition-colors tracking-tight flex items-center gap-1">
                  {item.name}
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-300 truncate">
                  {item.actionText}
                </span>
              </div>

              {/* Light Sweep Sheen on Hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 -translate-x-full group-hover:animate-hover-light-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating Interactive Guide & Controls Bar in Clean Space */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-1 text-xs text-slate-400">
        {/* Dynamic Scale Indicator for Top-to-Bottom Cursor Movement */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/30 text-slate-300 backdrop-blur-md shadow-sm">
          <MoveVertical className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
          <span className="text-slate-300 font-medium">
            কার্সার উপর থেকে নিচে নিলে ছোট-বড় হবে (<span className="text-sky-400 font-bold">{displayScalePercent}%</span>)
          </span>
        </div>

        {/* Rotate Play / Pause Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all ${
            isAutoRotating
              ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-amber-950/60 border-amber-600/50 text-amber-300'
          }`}
          title={isAutoRotating ? 'Pause rotation' : 'Resume rotation'}
        >
          {isAutoRotating ? <Pause className="w-3 h-3 text-sky-400" /> : <Play className="w-3 h-3 text-amber-400" />}
          <span>{isAutoRotating ? '৩D রোটেশন চলছে' : 'পজ করা'}</span>
        </button>

        {/* Direct Link Hint */}
        <div className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>যেকোনো আইকনে ক্লিক করলেই সরাসরি ওপেন হবে</span>
        </div>
      </div>
    </div>
  );
};

export default Social3DOrbit;
