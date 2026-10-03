"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import styles from "./hero.module.css";

const pad = (value: number) => String(value).padStart(2, "0");

/** Camera viewfinder overlay: the whole hero is framed as a live shot. */
export function Viewfinder() {
  const timecodeRef = useRef<HTMLSpanElement>(null);

  // Running SMPTE timecode at 24 fps, written straight to the DOM (no re-renders).
  useEffect(() => {
    const node = timecodeRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let lastFrame = -1;
    let raf = 0;
    const tick = (now: number) => {
      const frames = Math.floor(((now - start) / 1000) * 24);
      if (frames !== lastFrame) {
        lastFrame = frames;
        const seconds = Math.floor(frames / 24);
        node.textContent = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}:${pad(frames % 24)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden="true" className={cn(styles.hud, "eyebrow text-[0.62rem]")}>
      <div className={styles.thirds} />
      <span className={cn(styles.corner, styles.cornerTL)} />
      <span className={cn(styles.corner, styles.cornerTR)} />
      <span className={cn(styles.corner, styles.cornerBL)} />
      <span className={cn(styles.corner, styles.cornerBR)} />

      <div className="absolute top-3 left-5 flex items-center gap-2.5 sm:left-6">
        <span className="size-2 animate-blink rounded-full bg-violet-600 shadow-[0_0_10px_var(--color-lavender-500)]" />
        <span className="text-violet-700">Rec</span>
        <span ref={timecodeRef} className="tabular-nums">
          00:00:00:00
        </span>
      </div>

      <div className="absolute top-3 left-1/2 hidden -translate-x-1/2 md:block">Sc. 01 · Take 03 · Kandy</div>

      <div className="absolute top-3 right-5 flex items-center gap-3 sm:right-6">
        <span className="hidden sm:inline">4K · 24 fps</span>
        <span className="flex h-2.5 w-6 items-center rounded-[2px] border border-current p-[1.5px] after:ml-px after:h-1 after:w-0.5 after:bg-current after:content-['']">
          <span className="h-full w-3/4 rounded-[1px] bg-violet-600" />
        </span>
      </div>

      <div className="absolute bottom-3 left-5 hidden items-end gap-3 sm:left-6 sm:flex">
        <span>A1</span>
        <span className={styles.meter}>
          {[0.7, 1.1, 0.8, 1.3, 0.9, 1.2].map((duration, i) => (
            <span key={i} style={{ "--eq-duration": `${duration}s`, animationDelay: `${-i * 0.23}s` } as React.CSSProperties} />
          ))}
        </span>
        <span>A2</span>
        <span className={styles.meter}>
          {[1.2, 0.8, 1.4, 0.7, 1, 0.9].map((duration, i) => (
            <span key={i} style={{ "--eq-duration": `${duration}s`, animationDelay: `${-i * 0.31}s` } as React.CSSProperties} />
          ))}
        </span>
      </div>

      <div className="absolute right-5 bottom-3 hidden gap-4 sm:right-6 lg:flex">
        <span>ISO 800</span>
        <span>ƒ/1.8</span>
        <span>1/50</span>
        <span>5600K</span>
      </div>
    </div>
  );
}
