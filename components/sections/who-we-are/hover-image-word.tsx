"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Photo } from "@/components/media/photo";
import type { ImageKey } from "@/lib/images";

interface HoverImageWordProps {
  word: string;
  image: ImageKey;
  /** Alternate the tilt so neighbouring previews don't look stamped out. */
  tilt?: number;
}

/** A word that flashes a small photograph of itself on hover (pointer devices only). */
export function HoverImageWord({ word, image, tilt = -6 }: HoverImageWordProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-block cursor-default text-violet-600 italic underline decoration-violet-600/30 decoration-1 underline-offset-[0.2em]"
      onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={() => setOpen(false)}
    >
      {word}
      <AnimatePresence>
        {open && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[130%] left-1/2 z-20 block w-44 overflow-hidden rounded-lg border-4 border-white shadow-[0_24px_50px_-18px_rgb(20_4_40/0.55)]"
            initial={{ opacity: 0, y: 16, x: "-50%", rotate: tilt * 1.6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: "-50%", rotate: tilt, scale: 1 }}
            exit={{ opacity: 0, y: 8, x: "-50%", scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <Photo image={image} decorative placeholder="empty" sizes="176px" className="aspect-[4/5] w-full object-cover" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
