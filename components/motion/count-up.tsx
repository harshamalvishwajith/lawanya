"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  /** The final value as displayed, e.g. "3.76" or "60+". Non-numeric values render as-is. */
  value: string;
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!node || !match || !inView || reduceMotion) return;
    const target = Number.parseFloat(match[1]);
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${latest.toFixed(decimals)}${match[2]}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  // Server-render the final value so it is correct without JavaScript.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
