"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Inertia scrolling (Lenis) + a global Motion config. Both honour
 * `prefers-reduced-motion`: Lenis drops smoothing, Motion skips transform animations.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {/* autoToggle pauses Lenis whenever <html> is overflow:hidden (e.g. during the intro). */}
      <ReactLenis root options={{ lerp: 0.085, smoothWheel: true, stopInertiaOnNavigate: true, autoToggle: true }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
