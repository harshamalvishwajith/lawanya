"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface RoleTickerProps {
  roles: readonly string[];
  className?: string;
}

/** Cycles through the founder's roles like lower-third captions. */
export function RoleTicker({ roles, className }: RoleTickerProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % roles.length), 2400);
    return () => window.clearInterval(timer);
  }, [reduceMotion, roles.length]);

  return (
    <p className={cn("flex items-center gap-4", className)}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
      <span aria-hidden="true" className="relative inline-flex h-[1.3em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={roles[index]}
            className="block whitespace-nowrap"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
