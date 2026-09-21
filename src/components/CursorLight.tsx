import React, { useEffect, useRef } from 'react';

interface LightRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  decay: number;
  lineWidth: number;
  hue: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

export const CursorLight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad), not purely touch screens
    if (typeof window === 'undefined') return;
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High DPI scaling for crisp visuals
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Position state
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isVisible = false;
    let isHoveringInteractive = false;
    let isClicking = false;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;

      // Check if mouse moved over clickable/interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-cursor');
        isHoveringInteractive = !!interactive;
      }

      // Initial jump if offscreen
      if (currentX < -500) {
        currentX = targetX;
        currentY = targetY;
      }
    };

    const onPointerLeave = () => {
      isVisible = false;
    };

    const onPointerDown = () => {
      isClicking = true;
    };

    const onPointerUp = () => {
      isClicking = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    const render = () => {
      animId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      if (!isVisible && currentX < -100) {
        return;
      }

      // Smooth cursor lerp
      const lerpFactor = 0.45;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * lerpFactor;
      currentY += dy * lerpFactor;

      // Clean, soft focused light aura right at cursor (No trailing water waves / ripples)
      if (isVisible && currentX > -100 && currentY > -100) {
        ctx.save();

        const baseRadius = isHoveringInteractive ? 50 : 38;
        const outerRadius = isHoveringInteractive ? 110 : 85;

        // 1. Soft radial ambient light glow
        const ambientGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          outerRadius
        );
        ambientGrad.addColorStop(0, isHoveringInteractive ? 'rgba(56, 189, 248, 0.22)' : 'rgba(56, 189, 248, 0.14)');
        ambientGrad.addColorStop(0.5, isHoveringInteractive ? 'rgba(99, 102, 241, 0.08)' : 'rgba(14, 165, 233, 0.05)');
        ambientGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.beginPath();
        ctx.arc(currentX, currentY, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = ambientGrad;
        ctx.fill();

        // 2. Focused light core
        const coreGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          baseRadius
        );
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        coreGrad.addColorStop(0.3, isHoveringInteractive ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.16)');
        coreGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.beginPath();
        ctx.arc(currentX, currentY, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // 3. Small central light pinpoint
        const beadRadius = isClicking ? 4.5 : isHoveringInteractive ? 3.5 : 2.5;
        ctx.beginPath();
        ctx.arc(currentX, currentY, beadRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] select-none"
      style={{
        mixBlendMode: 'normal',
      }}
    />
  );
};
