import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Eye, EyeOff, Sparkles, Sliders } from 'lucide-react';

interface WatermarkBackgroundProps {
  customImageUrl?: string;
}

export const WatermarkBackground: React.FC<WatermarkBackgroundProps> = ({
  customImageUrl
}) => {
  // Use the newly provided character watermark image as primary watermark
  const watermarkSrc = customImageUrl || '/watermark-character.png';
  const [opacityLevel, setOpacityLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('portfolio_watermark_opacity_v4');
      return saved ? parseFloat(saved) : 0.20;
    } catch {
      return 0.20;
    }
  });

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Bind to overall page scroll
  const { scrollYProgress } = useScroll();

  // Scroll zoom animation: starts wide and expands majestically across the screen as user scrolls down
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.95, 1.15, 1.38, 1.6]);
  const smoothScale = useSpring(rawScale, {
    stiffness: 90,
    damping: 25,
    mass: 0.35
  });

  // Dynamic opacity: clearly visible from the very first frame, enriching as user scrolls
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacityLevel * 0.9, opacityLevel, opacityLevel * 1.15]
  );
  const smoothOpacity = useSpring(rawOpacity, {
    stiffness: 85,
    damping: 24
  });

  // Subtle motion graphics tilt on scroll
  const rawRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1, 0, 1]);
  const smoothRotate = useSpring(rawRotate, {
    stiffness: 60,
    damping: 30
  });

  // Save opacity preference
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_watermark_opacity_v4', opacityLevel.toString());
    } catch {
      // ignore
    }
  }, [opacityLevel]);

  return (
    <>
      {/* Fixed Fullscreen Landscape Watermark Background Container */}
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
            className="relative w-screen h-screen max-w-none flex items-center justify-center transition-opacity duration-300 pointer-events-none"
          >
            {/* High-Clarity Fullscreen Landscape Watermark Image in Dark Mode */}
            <img
              src={watermarkSrc}
              alt="Hasan Ullah Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center select-none filter drop-shadow-[0_0_24px_rgba(56,189,248,0.2)] opacity-35"
              style={{
                // Gentle vignette mask so it fades smoothly into the deep dark canvas
                maskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 75%, rgba(0,0,0,0.5) 90%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 75%, rgba(0,0,0,0.5) 90%, transparent 100%)'
              }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.includes('watermark.jpg')) {
                  target.src = '/watermark.jpg';
                }
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Floating Watermark Controls Badge (Bottom-Right corner) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {showControls && (
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl text-xs text-slate-200 animate-fadeIn">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Watermark Clarity:
            </span>
            <input
              type="range"
              min="0.10"
              max="0.70"
              step="0.02"
              value={opacityLevel}
              onChange={(e) => setOpacityLevel(parseFloat(e.target.value))}
              className="w-24 accent-sky-400 cursor-pointer"
              title="Adjust watermark visibility"
            />
            <span className="font-mono text-[11px] text-sky-300 font-bold w-9 text-right">
              {Math.round(opacityLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 ml-1"
              title={isVisible ? 'Hide Watermark' : 'Show Watermark'}
            >
              {isVisible ? <Eye className="w-3.5 h-3.5 text-sky-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          id="btn-watermark-toggle"
          title="Watermark Motion Graphics Settings"
          className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-sky-400 shadow-xl shadow-sky-500/10 transition-all hover:scale-105 active:scale-95"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
