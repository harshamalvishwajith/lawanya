"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { SceneLabel } from "@/components/brand/scene-label";
import { useScrollRange } from "@/components/motion/use-scroll-range";
import { weCreate } from "@/lib/content";

type Range = [number, number];

interface StruckLineProps {
  text: string;
  progress: MotionValue<number>;
  range: Range;
}

function StruckLine({ text, progress, range }: StruckLineProps) {
  const scaleX = useScrollRange(progress, range, [0, 1]);
  const opacity = useScrollRange(progress, range, [1, 0.32]);
  return (
    <motion.p style={{ opacity }} className="relative w-fit">
      Not just {text}
      <motion.span
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute top-[55%] -right-2 -left-2 h-[0.08em] origin-left rounded-full bg-violet-600"
      />
    </motion.p>
  );
}

interface LitWordProps {
  word: string;
  progress: MotionValue<number>;
  range: Range;
}

function LitWord({ word, progress, range }: LitWordProps) {
  const opacity = useScrollRange(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

interface ChainStepProps {
  label: string;
  index: number;
  progress: MotionValue<number>;
  range: Range;
  last: boolean;
}

function ChainStep({ label, index, progress, range, last }: ChainStepProps) {
  const fill = useScrollRange(progress, range, [0, 1]);
  const labelOpacity = useScrollRange(progress, range, [0.35, 1]);
  const lineScale = useScrollRange(progress, [range[1], Math.min(1, range[1] + 0.06)], [0, 1]);
  // Violet numeral on the empty ring, mint once the ring fills.
  const numberColor = useTransform(fill, [0, 1], ["#5603ad", "#f0fff1"]);

  return (
    <li className="flex items-center gap-3 sm:gap-4">
      <motion.span style={{ opacity: labelOpacity }} className="flex items-center gap-3">
        <span className="relative grid size-9 place-items-center rounded-full border border-violet-600/40 font-mono text-[0.65rem] text-violet-600 sm:size-11">
          <motion.span style={{ scale: fill }} className="absolute inset-0 rounded-full bg-violet-600" />
          <motion.span style={{ color: numberColor }} className="relative">
            0{index + 1}
          </motion.span>
        </span>
        <span className="font-display text-xl text-ink sm:text-2xl">{label}</span>
      </motion.span>
      {!last && (
        <span aria-hidden="true" className="relative hidden h-px w-10 bg-violet-600/15 sm:block lg:w-16">
          <motion.span style={{ scaleX: lineScale }} className="absolute inset-0 origin-left bg-violet-600" />
        </span>
      )}
    </li>
  );
}

/**
 * "We Create." — a pinned scroll scene. The clichés get struck out, the real
 * promise lights up word by word, then the chain from understanding to experience.
 */
export function WeCreate() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const statement = weCreate.statement.split(" ");
  const titleScale = useScrollRange(scrollYProgress, [0, 0.12], [1.06, 1]);

  return (
    <section ref={ref} id="studio" aria-labelledby="we-create-title" className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-[60rem] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(194_248_203/0.55),transparent_62%)]"
        />
        <div className="container-page relative">
          <SceneLabel scene="02" className="text-violet-600">
            What we do
          </SceneLabel>

          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <motion.h2
              id="we-create-title"
              style={{ scale: titleScale }}
              className="origin-left font-display text-display-xl text-ink lg:col-span-6"
            >
              We <span className="text-violet-600 italic">Create.</span>
            </motion.h2>
            <div className="space-y-1 font-display text-display-md text-ink-soft lg:col-span-6">
              {weCreate.notJust.map((item, i) => (
                <StruckLine key={item} text={item} progress={scrollYProgress} range={[0.08 + i * 0.09, 0.15 + i * 0.09]} />
              ))}
            </div>
          </div>

          <p className="mt-10 max-w-5xl font-display text-display-lg text-ink sm:mt-14">
            {statement.map((word, i) => {
              const start = 0.38 + (i / statement.length) * 0.26;
              return <LitWord key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[start, start + 0.05]} />;
            })}
          </p>

          <div className="mt-12 sm:mt-16">
            <p className="eyebrow text-ink-soft">{weCreate.lead}</p>
            <ol className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-4">
              {weCreate.chain.map((step, i) => (
                <ChainStep
                  key={step}
                  label={step}
                  index={i}
                  progress={scrollYProgress}
                  range={[0.7 + i * 0.065, 0.74 + i * 0.065]}
                  last={i === weCreate.chain.length - 1}
                />
              ))}
            </ol>
            <p className="sr-only">
              Understanding becomes strategy. Strategy becomes storytelling. Storytelling becomes experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
