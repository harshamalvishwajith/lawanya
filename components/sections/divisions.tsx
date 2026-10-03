"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { SceneLabel } from "@/components/brand/scene-label";
import { NavLink } from "@/components/layout/nav-link";
import { Photo } from "@/components/media/photo";
import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { divisions, type Division } from "@/lib/content";
import { cn } from "@/lib/utils";

function DivisionDetails({ division, className }: { division: Division; className?: string }) {
  return (
    <div className={className}>
      <p className="text-lead text-mint-50/90">{division.lead}</p>
      {division.body && <p className="mt-3 text-mint-50/70">{division.body}</p>}
      <p className="eyebrow mt-7 text-mint-200">{division.listLabel}</p>
      <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {division.items.map((item) => (
          <li key={item} className="flex items-baseline gap-2.5 text-mint-50/85">
            <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-0.15em] rotate-45 bg-mint-200" />
            {item}
          </li>
        ))}
      </ul>
      {division.closing && (
        <p className="mt-7 max-w-lg font-display text-xl leading-snug text-mint-50 italic">{division.closing}</p>
      )}
    </div>
  );
}

interface PanelProps {
  division: Division;
  active: boolean;
  onActivate: () => void;
}

function Panel({ division, active, onActivate }: PanelProps) {
  const panelId = `division-${division.id}`;

  return (
    <article
      onPointerEnter={onActivate}
      className={cn(
        "dark relative isolate min-w-0 overflow-hidden rounded-3xl bg-violet-950 text-foreground transition-[flex-grow] duration-[900ms] ease-(--ease-cine)",
        active ? "grow-[3.4]" : "grow"
      )}
    >
      <Photo
        image={division.image}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className={cn(
          "-z-20 object-cover transition-[transform,filter] duration-[1200ms] ease-(--ease-cine)",
          active ? "scale-100 saturate-100" : "scale-110 saturate-0"
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(20_4_40/0.3)_0%,rgb(20_4_40/0.66)_45%,rgb(20_4_40/0.97)_100%)]"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 bg-violet-950/55 transition-opacity duration-700",
          active ? "opacity-0" : "opacity-100"
        )}
      />

      <button
        type="button"
        aria-expanded={active}
        aria-controls={panelId}
        onClick={onActivate}
        onFocus={onActivate}
        className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-7 text-left"
      >
        <span className="font-mono text-sm tracking-[0.2em] text-mint-200">{division.number}</span>
        <span className="eyebrow rounded-full border border-white/20 px-3 py-1.5 text-[0.6rem] text-mint-50/80">
          {division.discipline}
        </span>
      </button>

      {/* Collapsed: the title runs up the spine of the panel. */}
      <p
        aria-hidden="true"
        className={cn(
          "absolute bottom-8 left-7 font-display text-5xl whitespace-nowrap text-mint-50 transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180",
          active ? "opacity-0" : "opacity-100 delay-300"
        )}
      >
        {division.title}
      </p>

      <div
        id={panelId}
        className={cn(
          "absolute inset-x-0 bottom-0 w-[min(40rem,100%)] p-8 transition-[opacity,transform] duration-700 ease-(--ease-cine)",
          active ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"
        )}
      >
        <h3 className="font-display text-display-lg text-mint-50">{division.title}</h3>
        <DivisionDetails division={division} className="mt-5" />
      </div>
    </article>
  );
}

export function Divisions() {
  const [active, setActive] = useState(0);

  return (
    <section id="divisions" aria-labelledby="divisions-title" className="relative bg-background py-28 sm:py-36">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SceneLabel scene="05" className="text-violet-600">
              Our studio
            </SceneLabel>
            <WordReveal
              as="h2"
              text="Creative divisions"
              accent={["divisions"]}
              accentClassName="italic text-violet-600"
              className="mt-6 font-display text-display-xl text-ink"
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.2}>
            <p className="text-lead text-ink-soft">
              Three disciplines under one roof — so your story stays whole, from the first idea to the final frame.
            </p>
            <NavLink
              hash="contact"
              className="group mt-5 inline-flex items-center gap-2 font-medium text-violet-600"
            >
              Plan something with us
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavLink>
          </Reveal>
        </div>

        <Reveal className="mt-16 hidden h-[42rem] gap-3 lg:flex" amount={0.15}>
          {divisions.map((division, i) => (
            <Panel key={division.id} division={division} active={active === i} onActivate={() => setActive(i)} />
          ))}
        </Reveal>

        <div className="mt-12 grid gap-6 lg:hidden">
          {divisions.map((division) => (
            <motion.article
              key={division.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="dark overflow-hidden rounded-3xl bg-violet-950 text-foreground"
            >
              <div className="relative aspect-[4/3]">
                <Photo image={division.image} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-violet-950 via-violet-950/30 to-transparent" />
                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-5xl text-mint-50">{division.title}</h3>
                  <span className="font-mono text-sm tracking-[0.2em] text-mint-200">{division.number}</span>
                </div>
              </div>
              <div className="p-6 pt-4">
                <p className="eyebrow text-lavender-300">{division.discipline}</p>
                <DivisionDetails division={division} className="mt-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
