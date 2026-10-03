"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

export const cinematicEase = [0.22, 1, 0.36, 1] as const;

type RevealEffect = "rise" | "focus" | "fade";

const effects: Record<RevealEffect, Variants> = {
  rise: { hidden: { opacity: 0, y: 36 }, shown: { opacity: 1, y: 0 } },
  // A rack-focus pull: soft and slightly oversized, then sharp.
  focus: {
    hidden: { opacity: 0, filter: "blur(14px)", scale: 1.04 },
    // Drop the filter once sharp so no lingering filter layer softens text.
    shown: { opacity: 1, filter: "blur(0px)", scale: 1, transitionEnd: { filter: "none" } },
  },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  effect?: RevealEffect;
  delay?: number;
  duration?: number;
  /** How much of the element must be visible before it plays (0–1). */
  amount?: number;
}

/** Plays once, the first time the element scrolls into view. */
export function Reveal({
  children,
  className,
  effect = "rise",
  delay = 0,
  duration = 1,
  amount = 0.3,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={effects[effect]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
}

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, amount = 0.2, as = "div" }: StaggerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  effect?: RevealEffect;
  as?: "div" | "li" | "span";
}

export function StaggerItem({ children, className, effect = "rise", as = "div" }: StaggerItemProps) {
  const Component = motion[as];
  return (
    <Component
      className={cn(as === "span" && "inline-block", className)}
      variants={effects[effect]}
      transition={{ duration: 0.9, ease: cinematicEase }}
    >
      {children}
    </Component>
  );
}
