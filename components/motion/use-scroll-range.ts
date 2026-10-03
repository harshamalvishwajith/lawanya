"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * Maps a window of scroll progress (e.g. 0.3 → 0.5) onto a numeric output,
 * holding the end values outside that window.
 *
 * Motion hardware-accelerates scroll-linked values with native ScrollTimelines.
 * Without explicit 0 and 1 stops, the browser pads the timeline with the
 * element's underlying style, so values drift back outside the window. Spelling
 * the stops out keeps the accelerated and JS-driven results identical.
 */
export function useScrollRange(
  progress: MotionValue<number>,
  [start, end]: readonly [number, number],
  [from, to]: readonly [number, number]
) {
  const input: number[] = [];
  const output: number[] = [];
  if (start > 0) {
    input.push(0);
    output.push(from);
  }
  input.push(start, end);
  output.push(from, to);
  if (end < 1) {
    input.push(1);
    output.push(to);
  }
  return useTransform(progress, input, output);
}
