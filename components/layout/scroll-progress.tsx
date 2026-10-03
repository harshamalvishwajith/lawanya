"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A hairline of light across the top edge that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-linear-to-r from-violet-600 via-lavender-500 to-mint-400"
      style={{ scaleX }}
    />
  );
}
