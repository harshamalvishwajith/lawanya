"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total drift in px across the element's pass through the viewport. Negative drifts up. */
  distance?: number;
}

export function Parallax({ children, className, distance = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="size-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
