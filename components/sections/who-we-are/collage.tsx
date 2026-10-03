"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Photo } from "@/components/media/photo";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

interface CollageProps {
  /** Up to three stills; extras are ignored. */
  frames: readonly ImageKey[];
}

const layout = [
  { className: "top-0 right-0 w-[72%] aspect-[4/5]", drift: -60, caption: "024 · Reception", captionClassName: "top-3 right-3" },
  { className: "bottom-[6%] left-0 w-[52%] aspect-[4/3]", drift: 70, caption: "117 · On set", captionClassName: "bottom-3 left-3" },
  { className: "top-[8%] left-[4%] w-[34%] aspect-square", drift: 130, caption: "062 · Strategy", captionClassName: "bottom-2.5 left-2.5" },
] as const;

/** Three stills at different depths — they separate as you scroll past. */
export function Collage({ frames }: CollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift0 = useTransform(scrollYProgress, [0, 1], [layout[0].drift / 2, -layout[0].drift / 2]);
  const drift1 = useTransform(scrollYProgress, [0, 1], [layout[1].drift / 2, -layout[1].drift / 2]);
  const drift2 = useTransform(scrollYProgress, [0, 1], [layout[2].drift / 2, -layout[2].drift / 2]);
  const drifts = [drift0, drift1, drift2];

  return (
    <div ref={ref} className="relative aspect-[5/6] w-full">
      {frames.slice(0, layout.length).map((key, i) => (
        <motion.figure
          key={key}
          style={{ y: drifts[i] }}
          className={cn(
            "absolute overflow-hidden rounded-2xl bg-violet-900 shadow-[0_40px_80px_-40px_rgb(20_4_40/0.6)]",
            layout[i].className,
            i === 2 && "z-10 border-[6px] border-background",
            i === 1 && "z-[5]"
          )}
        >
          <Photo image={key} fill sizes="(min-width: 1024px) 30vw, 70vw" className="object-cover" />
          <figcaption
            className={cn(
              "absolute rounded-full bg-violet-950/70 px-3 py-1 font-mono text-[0.58rem] tracking-[0.2em] whitespace-nowrap text-mint-50 uppercase backdrop-blur-sm",
              layout[i].captionClassName
            )}
          >
            {layout[i].caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
