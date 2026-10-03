"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useSpring } from "motion/react";
import { useRef, useState } from "react";

import { SocialIcon } from "@/components/brand/social-icon";
import { SceneLabel } from "@/components/brand/scene-label";
import { Photo } from "@/components/media/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { insights } from "@/lib/content";
import { cn } from "@/lib/utils";

/** An index of topics; on pointer devices a still from each subject trails the cursor. */
export function Insights() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useSpring(0, { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 28, mass: 0.5 });

  function handlePointerEnter(event: React.PointerEvent<HTMLDivElement>, index: number) {
    if (event.pointerType !== "mouse" || !areaRef.current) return;
    if (hovered === null) {
      const rect = areaRef.current.getBoundingClientRect();
      x.jump(event.clientX - rect.left);
      y.jump(event.clientY - rect.top);
    }
    setHovered(index);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <section id="insights" aria-labelledby="insights-title" className="relative bg-background py-28 sm:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SceneLabel scene="10" className="text-violet-600">
              Insights
            </SceneLabel>
            <WordReveal
              as="h2"
              text={insights.title}
              accent={["knowledge"]}
              accentClassName="italic text-violet-600"
              className="mt-6 font-display text-display-lg text-ink"
            />
            <Reveal className="mt-6 space-y-5" delay={0.15}>
              <p className="text-lead text-ink-soft">{insights.body}</p>
              <p className="font-display text-xl text-ink italic">{insights.closing}</p>
              <p className="flex items-start gap-3 rounded-2xl border border-violet-600/15 bg-card p-4 text-sm text-ink-soft">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-violet-600 text-mint-50">
                  <SocialIcon name="youtube" className="size-4" />
                </span>
                {insights.channel}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow text-ink-soft">Topics include</p>
          <div
            ref={areaRef}
            className="relative mt-4"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setHovered(null)}
          >
            <Stagger as="ol" className="border-t border-border" stagger={0.05}>
              {insights.topics.map((topic, i) => (
                <StaggerItem key={topic.title} as="li">
                  <div
                    onPointerEnter={(event) => handlePointerEnter(event, i)}
                    className={cn(
                      "group flex items-center gap-5 border-b border-border py-5 transition-[padding,background-color] duration-500 ease-(--ease-cine) sm:py-6",
                      hovered === i && "bg-mint-200/50 px-4"
                    )}
                  >
                    <span className="w-8 font-mono text-xs text-violet-500">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-display text-2xl text-ink sm:text-3xl">{topic.title}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-violet-600 opacity-40 transition-[opacity,transform] duration-500 group-hover:rotate-45 group-hover:opacity-100"
                    />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 z-20 hidden w-52 overflow-hidden rounded-2xl shadow-[0_30px_60px_-24px_rgb(20_4_40/0.55)] lg:block"
                  style={{ x, y, translateX: "-50%", translateY: "-115%" }}
                  initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={hovered}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Photo
                        image={insights.topics[hovered].image}
                        decorative
                        placeholder="empty"
                        sizes="208px"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
