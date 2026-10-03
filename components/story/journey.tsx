"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { story } from "@/lib/content";
import { cn } from "@/lib/utils";

/** The path from Kandy to the studio, drawn as you scroll. */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section aria-labelledby="journey-title" className="dark relative isolate overflow-hidden bg-violet-950 py-28 text-foreground sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="film-grain" />
      </div>
      <div className="container-page">
        <p className="eyebrow text-mint-200">The journey so far</p>
        <h2 id="journey-title" className="mt-5 max-w-3xl font-display text-display-lg text-mint-50">
          From a hill-country microphone to a <span className="text-mint-200 italic">creative studio</span>.
        </h2>

        <ol ref={ref} className="relative mt-16 md:mt-20">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-1.5 w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <motion.span style={{ scaleY: draw }} className="absolute inset-0 origin-top bg-linear-to-b from-mint-200 via-lavender-400 to-mint-200" />
          </span>
          {story.journey.map((stop, i) => {
            const right = i % 2 === 1;
            return (
              <motion.li
                key={stop.place}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative grid pb-12 pl-10 last:pb-0 md:w-1/2 md:pl-0",
                  right ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1.5 left-0 size-3.5 rounded-full border-2 border-mint-200 bg-violet-950 shadow-[0_0_0_6px_rgb(20_4_40)]",
                    right ? "md:-left-[0.4375rem]" : "md:right-[-0.4375rem] md:left-auto"
                  )}
                />
                <span className="font-mono text-xs tracking-[0.2em] text-lavender-300">Stop 0{i + 1}</span>
                <span className="mt-2 font-display text-2xl text-mint-50 sm:text-3xl">{stop.place}</span>
                <span className="mt-1 text-mint-50/65">{stop.detail}</span>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
