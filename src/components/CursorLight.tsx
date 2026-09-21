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
    let lastSpawnX = -1000;
    let lastSpawnY = -1000;
    let isVisible = false;
    let speed = 0;
    let lastTime = performance.now();
    let isClicking = false;
    let isHoveringInteractive = false;

    const rings: LightRing[] = [];
    const sparkles: SparkleParticle[] = [];

    // Helper to spawn circular radiating light ring
    const spawnRing = (x: number, y: number, isBurst = false) => {
      const baseRadius = isBurst ? 8 : 12;
      const maxRadius = isBurst ? 110 : 75 + Math.min(speed * 1.5, 45);
      const decay = isBurst ? 0.022 : 0.028;
      const lineWidth = isBurst ? 3 : 2;
      const hue = isBurst ? 190 : 195; // Vibrant cyan/sky tone

      rings.push({
        x,
        y,
        radius: baseRadius,
        maxRadius,
        opacity: isBurst ? 0.9 : 0.65,
        decay,
        lineWidth,
        hue,
      });

      // Keep array reasonable
      if (rings.length > 25) {
        rings.shift();
      }
    };

    // Helper to spawn light sparkles
    const spawnSparkles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 0.8 + Math.random() * 2.2;
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          radius: 1 + Math.random() * 2,
          alpha: 0.8 + Math.random() * 0.2,
          decay: 0.025 + Math.random() * 0.03,
          color: Math.random() > 0.4 ? '#38bdf8' : '#818cf8',
        });
      }
      if (sparkles.length > 40) {
        sparkles.splice(0, sparkles.length - 40);
      }
    };

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
        lastSpawnX = targetX;
        lastSpawnY = targetY;
      }
    };

    const onPointerLeave = () => {
      isVisible = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      isClicking = true;
      spawnRing(e.clientX, e.clientY, true);
      spawnSparkles(e.clientX, e.clientY, 8);
    };

    const onPointerUp = () => {
      isClicking = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    // Main render loop
    let pulsePhase = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      if (!isVisible && rings.length === 0 && sparkles.length === 0) {
        return;
      }

      // Smooth cursor lerp
      const lerpFactor = 0.35;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * lerpFactor;
      currentY += dy * lerpFactor;

      // Calculate instantaneous movement speed
      const moveDist = Math.hypot(dx, dy);
      speed = Math.min(moveDist * 1.8, 50);

      // Distance from last ring spawn
      const distFromLastSpawn = Math.hypot(currentX - lastSpawnX, currentY - lastSpawnY);

      // Spawn circular light rings as cursor moves
      if (isVisible && distFromLastSpawn > 28) {
        spawnRing(currentX, currentY);
        if (speed > 12) {
          spawnSparkles(currentX, currentY, Math.min(Math.floor(speed / 10), 3));
        }
        lastSpawnX = currentX;
        lastSpawnY = currentY;
      }

      pulsePhase += dt * 3.5;

      // 1. Draw expanding circular light rings (the radiating circular light waves)
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += (ring.maxRadius - ring.radius) * 0.09 + 0.8;
        ring.opacity -= ring.decay;

        if (ring.opacity <= 0.01 || ring.radius >= ring.maxRadius) {
          rings.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);

        // Circular glow wave border
        ctx.strokeStyle = `rgba(14, 165, 233, ${ring.opacity * 0.75})`;
        ctx.lineWidth = ring.lineWidth * (ring.opacity / 0.7);
        ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Very soft circular interior sheen
        const ringGrad = ctx.createRadialGradient(
          ring.x,
          ring.y,
          Math.max(0, ring.radius - 8),
          ring.x,
          ring.y,
          ring.radius
        );
        ringGrad.addColorStop(0, `rgba(56, 189, 248, 0)`);
        ringGrad.addColorStop(1, `rgba(56, 189, 248, ${ring.opacity * 0.18})`);
        ctx.fillStyle = ringGrad;
        ctx.fill();

        ctx.restore();
      }

      // 2. Draw radiating light sparkles / dust
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0.02) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw the main circular light radiating from the cursor
      if (isVisible && currentX > -100 && currentY > -100) {
        ctx.save();

        // Pulsing ambient glow scale
        const pulse = Math.sin(pulsePhase) * 4;
        const baseRadius = isHoveringInteractive ? 85 : 65;
        const dynamicRadius = baseRadius + Math.min(speed * 0.9, 45) + pulse;

        // Wide soft circular ambient light aura
        const ambientRadius = dynamicRadius * 2.2;
        const ambientGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          ambientRadius
        );
        ambientGrad.addColorStop(0, isHoveringInteractive ? 'rgba(56, 189, 248, 0.28)' : 'rgba(14, 165, 233, 0.20)');
        ambientGrad.addColorStop(0.35, isHoveringInteractive ? 'rgba(99, 102, 241, 0.14)' : 'rgba(56, 189, 248, 0.10)');
        ambientGrad.addColorStop(0.7, 'rgba(129, 140, 248, 0.04)');
        ambientGrad.addColorStop(1, 'rgba(129, 140, 248, 0)');

        ctx.beginPath();
        ctx.arc(currentX, currentY, ambientRadius, 0, Math.PI * 2);
        ctx.fillStyle = ambientGrad;
        ctx.fill();

        // Mid vibrant circular light core
        const coreGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          dynamicRadius
        );
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        coreGrad.addColorStop(0.2, isHoveringInteractive ? 'rgba(56, 189, 248, 0.55)' : 'rgba(14, 165, 233, 0.45)');
        coreGrad.addColorStop(0.55, 'rgba(99, 102, 241, 0.22)');
        coreGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.beginPath();
        ctx.arc(currentX, currentY, dynamicRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // Glowing circular perimeter ring around cursor light
        ctx.beginPath();
        ctx.arc(currentX, currentY, isHoveringInteractive ? 28 : 20, 0, Math.PI * 2);
        ctx.strokeStyle = isHoveringInteractive
          ? 'rgba(56, 189, 248, 0.65)'
          : 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.7)';
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Small focal light bead right at cursor tip
        const beadRadius = isClicking ? 6 : isHoveringInteractive ? 4.5 : 3.5;
        ctx.beginPath();
        ctx.arc(currentX, currentY, beadRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
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
