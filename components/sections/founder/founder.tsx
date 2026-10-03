import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import { LaurelBadge } from "@/components/brand/laurel";
import { OrbitBadge } from "@/components/brand/orbit-badge";
import { SceneLabel } from "@/components/brand/scene-label";
import { Photo } from "@/components/media/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { Button } from "@/components/ui/button";
import { founder } from "@/lib/content";

import { RoleTicker } from "./role-ticker";

export function Founder() {
  return (
    <section id="founder" aria-labelledby="founder-title" className="relative overflow-hidden bg-mint-100 py-28 sm:py-36">
      <div aria-hidden="true" className="absolute top-0 right-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_top_right,rgb(131_103_199/0.18),transparent_60%)]" />

      <div className="container-page relative grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" effect="focus">
          <div aria-hidden="true" className="absolute -inset-3 -rotate-3 rounded-[2.4rem] border border-violet-600/25 sm:-inset-5" />
          <ViewTransition name="founder-portrait">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-violet-900 shadow-[0_50px_100px_-50px_rgb(20_4_40/0.7)]">
              <Photo image={founder.portrait} fill sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-violet-950/70 via-transparent to-transparent" />
              <p className="eyebrow absolute bottom-6 left-6 text-mint-50">Founder · Creative Director</p>
            </div>
          </ViewTransition>
          <OrbitBadge
            id="founder"
            text="Educate · Inspire · Connect · "
            className="absolute -top-8 -right-4 size-32 bg-violet-600 text-mint-50 shadow-xl sm:-right-8 sm:size-36"
          />
        </Reveal>

        <div className="lg:col-span-7 lg:pl-8">
          <SceneLabel scene="06" className="text-violet-600">
            Meet the founder
          </SceneLabel>
          <WordReveal
            as="h2"
            text={founder.name}
            accent={["Rammandala"]}
            accentClassName="italic text-violet-600"
            className="mt-6 font-display text-display-lg text-ink"
          />
          <RoleTicker roles={founder.roles} className="mt-4 font-display text-2xl text-lavender-500 italic sm:text-3xl" />

          <Reveal className="mt-8 space-y-4" delay={0.1}>
            <p className="text-lead text-ink">{founder.summary}</p>
            <p className="text-ink-soft">{founder.bio}</p>
          </Reveal>

          <Reveal className="mt-10" delay={0.15}>
            <blockquote className="relative rounded-3xl bg-violet-600 p-8 text-mint-50 sm:p-10">
              <Quote
                aria-hidden="true"
                strokeWidth={1.25}
                className="pointer-events-none absolute top-6 right-7 size-14 text-lavender-400/70"
              />
              <p className="eyebrow relative text-mint-200">{founder.principleLead}</p>
              <p className="relative mt-3 font-display text-display-md italic">{founder.principle}</p>
            </blockquote>
          </Reveal>

          <Stagger className="mt-10 flex flex-wrap justify-center gap-2 text-violet-600 sm:justify-start" stagger={0.12}>
            {founder.honours.map((honour) => (
              <StaggerItem key={honour.value} effect="focus">
                <LaurelBadge value={honour.value} label={honour.label} className="w-40 sm:w-44" />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10" delay={0.1}>
            <Button asChild size="lg">
              <Link href="/story">
                Read my story
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
