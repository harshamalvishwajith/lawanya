"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { createContext, useContext, useRef, useState } from "react";

import { cinematicEase } from "@/components/motion/reveal";
import { useScrollRange } from "@/components/motion/use-scroll-range";

/**
 * Seconds until the hero may begin its entrance. While the opening titles play
 * (html[data-intro="play"]) we wait for the curtain; otherwise start at once.
 */
function getHeroDelay() {
  if (typeof window === "undefined") return 0;
  if (document.documentElement.dataset.intro === "play") {
    return Math.max(0.2, 1.75 - performance.now() / 1000);
  }
  return 0.2;
}

const HeroDelayContext = createContext(0.2);

export function useHeroDelay() {
  return useContext(HeroDelayContext);
}

interface HeroSequenceProps {
  children: React.ReactNode;
  className?: string;
}

/** Orchestrates the hero entrance and lets the content drift away as you scroll. */
export function HeroSequence({ children, className }: HeroSequenceProps) {
  const [delay] = useState(getHeroDelay);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useScrollRange(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <HeroDelayContext.Provider value={delay}>
      <motion.div ref={ref} style={{ y, opacity }} className={className}>
        {children}
      </motion.div>
    </HeroDelayContext.Provider>
  );
}

interface HeroItemProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds after the sequence starts. */
  at?: number;
}

export function HeroItem({ children, className, at = 0 }: HeroItemProps) {
  const delay = useHeroDelay();
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + (reduceMotion ? at * 0.15 : at), duration: reduceMotion ? 0.35 : 1, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollDriftProps {
  children: React.ReactNode;
  className?: string;
}

/** Backdrop layer that falls behind more slowly than the page — cheap depth. */
export function ScrollDrift({ children, className }: ScrollDriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <motion.div ref={ref} style={{ y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
