"use client";

import { motion } from "motion/react";

import { cinematicEase } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p";

interface WordRevealProps {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Words (without punctuation) to set in italic accent colour. */
  accent?: readonly string[];
  accentClassName?: string;
}

/**
 * Each word rises out of its own mask, like titles in an opening sequence.
 * Real text stays in the DOM, so it reads normally to assistive tech and search.
 */
export function WordReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  accent = [],
  accentClassName = "italic text-lavender-500",
}: WordRevealProps) {
  const Component = motion[as];
  const words = text.split(" ");

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => {
        const bare = word.replace(/[.,!?;:’'“”]/g, "");
        const isAccent = accent.includes(bare);
        return (
          <span key={`${word}-${i}`} className="inline-flex overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className={cn("inline-block will-change-transform", isAccent && accentClassName)}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                shown: { y: "0%", rotate: 0 },
              }}
              transition={{ duration: 1, ease: cinematicEase }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </Component>
  );
}
