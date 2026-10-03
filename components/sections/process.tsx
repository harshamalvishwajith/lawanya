"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { SceneLabel } from "@/components/brand/scene-label";
import { WordReveal } from "@/components/motion/word-reveal";
import { processSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

const clipStyles = [
  "bg-violet-600 text-mint-50",
  "bg-lavender-500 text-mint-50",
  "bg-mint-300 text-violet-950",
  "bg-mint-200 text-violet-950",
];

// Deterministic "audio", rounded to whole percents so every JS engine renders
// identical markup for hydration.
const waveform = Array.from({ length: 96 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.37) * 0.6 + Math.sin(i * 1.13) * 0.3 + Math.sin(i * 0.07) * 0.25);
  return Math.round(Math.max(0.12, Math.min(1, v)) * 100);
});

const pad = (value: number) => String(value).padStart(2, "0");
const RUNTIME_SECONDS = 4 * 60;

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.85", "end 0.3"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.0005 });
  const playhead = useTransform(progress, [0, 1], ["0%", "100%"]);
  const railFill = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(progress, "change", (value) => {
    setActive(Math.min(processSteps.length - 1, Math.max(0, Math.floor(value * processSteps.length))));
    if (timecodeRef.current) {
      const total = Math.max(0, value) * RUNTIME_SECONDS;
      const frames = Math.floor((total % 1) * 24);
      timecodeRef.current.textContent = `00:${pad(Math.floor(total / 60))}:${pad(Math.floor(total % 60))}:${pad(frames)}`;
    }
  });

  return (
    <section id="process" aria-labelledby="process-title" className="dark relative isolate overflow-hidden bg-violet-950 py-28 text-foreground sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="film-grain" />
        <div className="absolute top-1/3 -left-40 size-[34rem] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-mint-200/10 blur-3xl" />
      </div>

      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SceneLabel scene="07" className="text-mint-200">
              Our process
            </SceneLabel>
            <WordReveal
              as="h2"
              text="Every great project follows a creative journey."
              accent={["creative", "journey"]}
              accentClassName="italic text-mint-200"
              className="mt-6 font-display text-display-lg text-mint-50"
            />
          </div>
          <p className="text-mint-50/60 lg:col-span-4 lg:text-right">
            Four scenes, one cut — scroll to scrub the timeline.
          </p>
        </div>

        <div ref={trackRef} className="mt-14 sm:mt-20">
          {/* The edit timeline */}
          <div aria-hidden="true" className="relative rounded-3xl border border-white/10 bg-violet-900/50 p-4 backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between font-mono text-[0.65rem] tracking-[0.2em] text-lavender-300 uppercase">
              <span>Lawanya_Project_Final.edit</span>
              <span className="flex items-center gap-2 text-mint-200">
                <span className="size-1.5 animate-blink rounded-full bg-mint-200" />
                <span ref={timecodeRef} className="tabular-nums">
                  00:00:00:00
                </span>
              </span>
            </div>

            <div className="relative">
              {/* Ruler */}
              <div className="flex h-6 items-end border-b border-white/10 pl-10">
                {Array.from({ length: 41 }, (_, i) => (
                  <span
                    key={i}
                    className={cn("flex-1 border-l border-white/15", i % 10 === 0 ? "h-4" : i % 5 === 0 ? "h-2.5" : "h-1.5")}
                  />
                ))}
              </div>

              {/* V1: the four clips */}
              <div className="mt-3 flex items-stretch gap-2">
                <span className="w-8 shrink-0 self-center font-mono text-[0.6rem] text-lavender-300">V1</span>
                <div className="flex flex-1 gap-1.5">
                  {processSteps.map((step, i) => (
                    <div
                      key={step.title}
                      className={cn(
                        "flex h-16 flex-1 items-center gap-3 overflow-hidden rounded-lg px-3 transition-[box-shadow,filter,opacity] duration-500 sm:h-20 sm:px-4",
                        clipStyles[i],
                        i <= active ? "opacity-100 saturate-100" : "opacity-45 saturate-50",
                        i === active && "shadow-[0_0_0_2px_var(--color-mint-50),0_0_40px_-6px_var(--color-mint-200)]"
                      )}
                    >
                      <span className="font-mono text-xs opacity-70">{step.number}</span>
                      <span className="hidden truncate font-display text-xl sm:block lg:text-2xl">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* A1: soundtrack */}
              <div className="mt-2 flex items-center gap-2">
                <span className="w-8 shrink-0 font-mono text-[0.6rem] text-lavender-300">A1</span>
                <div className="flex h-10 flex-1 items-center gap-[2px] rounded-lg bg-white/[0.04] px-2">
                  {waveform.map((height, i) => (
                    <span key={i} className="flex-1 rounded-full bg-lavender-400/60" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>

              {/* Playhead */}
              <div className="pointer-events-none absolute inset-y-0 right-0 left-10">
                <motion.div style={{ left: playhead }} className="absolute inset-y-[-0.5rem] w-px bg-mint-200 shadow-[0_0_12px_var(--color-mint-200)]">
                  <span className="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-mint-200" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* The scenes, in words */}
          <ol className="relative mt-10 grid gap-8 pl-8 sm:pl-10 lg:mt-14 lg:grid-cols-4 lg:gap-6 lg:pl-0">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-2 w-px bg-white/10 lg:hidden">
              <motion.span style={{ scaleY: railFill }} className="absolute inset-0 origin-top bg-mint-200" />
            </span>
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className={cn("relative transition-opacity duration-500", i <= active ? "opacity-100" : "opacity-40")}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-2 -left-[1.625rem] size-2.5 rounded-full border border-mint-200 transition-colors duration-500 sm:-left-[2.125rem] lg:hidden",
                    i <= active ? "bg-mint-200" : "bg-violet-950"
                  )}
                />
                <p className="font-mono text-xs tracking-[0.2em] text-mint-200">Scene {step.number}</p>
                <h3 className="mt-2 font-display text-3xl text-mint-50 sm:text-4xl">{step.title}</h3>
                <div className="mt-3 space-y-2 text-mint-50/70">
                  {step.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
