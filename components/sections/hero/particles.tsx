"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
  sprite: number;
  twinkle: number;
};

// Lavender, mint and violet bokeh for the light stage (the canvas is multiplied onto the paper).
const COLORS = ["131, 103, 199", "147, 220, 176", "86, 3, 173"];
// Weighted so violet stays an accent rather than dust.
const pickSprite = () => {
  const r = Math.random();
  return r < 0.45 ? 0 : r < 0.82 ? 1 : 2;
};

function makeSprite(rgb: string) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, `rgba(${rgb}, 1)`);
    gradient.addColorStop(0.22, `rgba(${rgb}, 0.55)`);
    gradient.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return canvas;
}

interface ParticlesProps {
  className?: string;
}

/**
 * Bokeh from venue lights drifting upward, with the occasional flash bloom
 * going off in the crowd. Pauses off-screen and in background tabs.
 */
export function Particles({ className }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = COLORS.map(makeSprite);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    let last = performance.now();
    let flash = { x: 0, y: 0, start: -1, size: 0 };
    let nextFlash = performance.now() + 2600;

    const spawn = (anywhere: boolean): Particle => {
      const big = Math.random() < 0.16;
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : height + 40,
        r: big ? 10 + Math.random() * 26 : 0.8 + Math.random() * 2.2,
        speed: big ? 4 + Math.random() * 8 : 9 + Math.random() * 24,
        drift: 6 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        alpha: big ? 0.08 + Math.random() * 0.12 : 0.3 + Math.random() * 0.5,
        sprite: pickSprite(),
        twinkle: 0.6 + Math.random() * 1.8,
      };
    };

    const draw = (now: number, dt: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed * dt;
        if (p.y < -60) Object.assign(p, spawn(false));
        const sway = Math.sin(t * 0.6 + p.phase) * p.drift;
        ctx.globalAlpha = p.alpha * (0.65 + 0.35 * Math.sin(t * p.twinkle + p.phase));
        // Small points get a halo three times their core.
        const size = p.r > 6 ? p.r * 2 : p.r * 6;
        ctx.drawImage(sprites[p.sprite], p.x + sway - size / 2, p.y - size / 2, size, size);
      }
      if (flash.start >= 0) {
        const age = (now - flash.start) / 280;
        if (age >= 1) {
          flash.start = -1;
        } else {
          const size = flash.size * (1 + age * 0.5);
          ctx.globalAlpha = (1 - age) * 0.55;
          ctx.drawImage(sprites[0], flash.x - size / 2, flash.y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (now > nextFlash) {
        flash = { x: Math.random() * width, y: height * (0.15 + Math.random() * 0.5), start: now, size: 110 + Math.random() * 170 };
        nextFlash = now + 3200 + Math.random() * 5200;
      }
      draw(now, dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(36, (width * height) / 14000)));
      particles = Array.from({ length: count }, () => spawn(true));
      if (!running) draw(performance.now(), 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersectionObserver.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
