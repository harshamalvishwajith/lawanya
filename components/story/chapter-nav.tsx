"use client";

import { useLenis } from "lenis/react";
import { motion } from "motion/react";

import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface ChapterNavProps {
  chapters: readonly { id: string; title: string }[];
}

/** Sticky table of contents that follows the reader through the chapters. */
export function ChapterNav({ chapters }: ChapterNavProps) {
  const lenis = useLenis();
  const active = useActiveSection(chapters.map((chapter) => chapter.id));

  return (
    <nav aria-label="Chapters" className="sticky top-32">
      <p className="eyebrow text-ink-soft">Chapters</p>
      <ol className="mt-5 space-y-1 border-l border-border">
        {chapters.map((chapter, i) => {
          const isActive = active === chapter.id;
          return (
            <li key={chapter.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="chapter-indicator"
                  className="absolute top-0 -left-px h-full w-0.5 bg-violet-600"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  if (!lenis) return;
                  event.preventDefault();
                  lenis.scrollTo(`#${chapter.id}`, { offset: -120, duration: 1.4 });
                }}
                className={cn(
                  "flex gap-3 py-2 pl-5 text-[0.95rem] leading-snug transition-colors duration-300",
                  isActive ? "text-violet-600" : "text-ink-soft hover:text-ink"
                )}
              >
                <span className="font-mono text-xs leading-6 opacity-60">0{i + 1}</span>
                {chapter.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
