import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Eye, EyeOff, Sparkles, Sliders } from 'lucide-react';

interface WatermarkBackgroundProps {
  customImageUrl?: string;
}

export const WatermarkBackground: React.FC<WatermarkBackgroundProps> = ({
  customImageUrl
}) => {
  // Try local watermark or fallback
  const watermarkSrc = customImageUrl || '/watermark.jpg';
  const [opacityLevel, setOpacityLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('portfolio_watermark_opacity');
      return saved ? parseFloat(saved) : 0.06;
    } catch {
      return 0.06;
    }
  });

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Bind to overall page scroll
  const { scrollYProgress } = useScroll();

  // Motion Graphics transformation: grows smoothly from small to large as user scrolls down
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.15, 1.55]);
  const smoothScale = useSpring(rawScale, {
    stiffness: 75,
    damping: 24,
    mass: 0.4
  });

  // Dynamic opacity: subtle increase as user travels through the portfolio
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacityLevel * 0.85, opacityLevel, opacityLevel * 1.3]
  );
  const smoothOpacity = useSpring(rawOpacity, {
    stiffness: 80,
    damping: 25
  });

  // Subtle motion graphics rotation on scroll
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-1, 1.5]);
  const smoothRotate = useSpring(rawRotate, {
    stiffness: 60,
    damping: 30
  });

  // Save opacity preference
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_watermark_opacity', opacityLevel.toString());
    } catch {
      // ignore
    }
  }, [opacityLevel]);

  return (
    <>
      {/* Fixed Fullscreen Watermark Background Container */}
      <div
        id="watermark-container"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden flex items-center justify-center select-none"
        aria-hidden="true"
      >
        {isVisible && (
          <motion.div
            style={{
              scale: smoothScale,
              opacity: smoothOpacity,
              rotate: smoothRotate
            }}
            className="relative w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] flex items-center justify-center transition-opacity duration-300"
          >
            {/* Ambient Backlight Glow Ring for Motion Graphics Depth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/20 via-cyan-300/15 to-blue-500/20 blur-3xl" />

            {/* Feathered Watermark Image with Vignette Mask */}
            <img
              src={watermarkSrc}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full mix-blend-multiply filter contrast-105"
              style={{
                maskImage: 'radial-gradient(circle at center, black 40%, rgba(0,0,0,0.6) 65%, transparent 88%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, rgba(0,0,0,0.6) 65%, transparent 88%)'
              }}
              onError={(e) => {
                // Fallback to project image if watermark asset is resolving
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.includes('profile_watermark')) {
                  target.src = '/projects/shoe-mockup.webp';
                }
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Floating Watermark Controls Badge (Bottom-Right corner) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {showControls && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200 shadow-xl text-xs text-slate-700 animate-fadeIn">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              Watermark:
            </span>
            <input
              type="range"
              min="0.02"
              max="0.18"
              step="0.01"
              value={opacityLevel}
              onChange={(e) => setOpacityLevel(parseFloat(e.target.value))}
              className="w-20 accent-sky-600 cursor-pointer"
              title="Adjust watermark opacity"
            />
            <span className="font-mono text-[11px] text-slate-500 w-8">
              {Math.round(opacityLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
              title={isVisible ? 'Hide Watermark' : 'Show Watermark'}
            >
              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          id="btn-watermark-toggle"
          title="Watermark Motion Graphics Settings"
          className="p-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-sky-200 text-slate-600 hover:text-sky-600 shadow-lg shadow-sky-500/10 transition-all hover:scale-105 active:scale-95"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
