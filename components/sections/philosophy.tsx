"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Emblem } from "@/components/brand/logo";
import { SceneLabel } from "@/components/brand/scene-label";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { philosophy } from "@/lib/content";

type Line = (typeof philosophy.lines)[number];

function ManifestoLine({ line, index }: { line: Line; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // Lights up as the line travels from the lower third to the centre of the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.45"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.18, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-24, 0]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity }}
      className="grid items-baseline gap-x-8 gap-y-1 py-6 sm:py-8 lg:grid-cols-12"
    >
      <span className="font-mono text-xs tracking-[0.2em] text-lavender-300 lg:col-span-1">0{index + 1}</span>
      <motion.span style={{ x }} className="font-display text-display-lg text-mint-50 lg:col-span-4">
        {line.subject}
      </motion.span>
      <span className="eyebrow text-lavender-300 lg:col-span-2">{line.verb}</span>
      <span className="font-display text-display-lg text-mint-200 italic lg:col-span-5">{line.object}</span>
    </motion.li>
  );
}

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="dark relative isolate overflow-hidden bg-violet-950 py-28 text-foreground sm:py-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="film-grain" />
        <Parallax distance={260} className="absolute top-0 -right-48 h-full w-[46rem]">
          <Emblem className="mt-24 size-[46rem] text-violet-900" />
        </Parallax>
        <div className="absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="container-page">
        <SceneLabel scene="04" className="text-mint-200">
          Our philosophy
        </SceneLabel>
        <h2 id="philosophy-title" className="sr-only">
          Our philosophy
        </h2>

        <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {philosophy.lines.map((line, i) => (
            <ManifestoLine key={line.subject} line={line} index={i} />
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between" effect="focus">
          <p className="font-display text-display-md text-mint-50 italic">{philosophy.closing}</p>
          <Emblem className="size-14 text-mint-200" />
        </Reveal>
      </div>
    </section>
  );
}
