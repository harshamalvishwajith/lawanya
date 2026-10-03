import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import { Photo } from "@/components/media/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { founder, story } from "@/lib/content";

export function StoryHero() {
  return (
    <section aria-labelledby="story-title" className="dark relative isolate overflow-hidden bg-violet-950 pt-36 pb-20 text-foreground sm:pt-44 sm:pb-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="film-grain" />
        <div className="absolute -top-40 right-0 size-[44rem] rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute bottom-0 -left-40 size-[30rem] rounded-full bg-lavender-500/15 blur-3xl" />
      </div>

      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal effect="fade">
            <Link
              href="/#founder"
              className="group inline-flex items-center gap-2 text-sm text-mint-50/70 transition-colors hover:text-mint-200"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to the studio
            </Link>
          </Reveal>
          <Reveal effect="fade" delay={0.1}>
            <p className="eyebrow mt-10 text-mint-200">The founder’s story</p>
          </Reveal>
          <WordReveal
            as="h1"
            text={founder.name}
            accent={["Rammandala"]}
            accentClassName="italic text-mint-200"
            className="mt-5 font-display text-display-xl text-mint-50"
            delay={0.15}
          />
          <Stagger as="ul" className="mt-8 flex flex-wrap gap-2" delay={0.5} stagger={0.06}>
            {story.titles.map((title) => (
              <StaggerItem key={title} as="li">
                <span className="inline-flex rounded-full border border-white/15 px-4 py-1.5 text-sm text-mint-50/85">{title}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.7} effect="focus">
            <blockquote className="mt-12 border-l-2 border-mint-200 pl-6 font-display text-display-md text-mint-50 italic">
              “{story.statement}”
            </blockquote>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-4 rotate-3 rounded-[2.4rem] border border-mint-200/20" />
          <ViewTransition name="founder-portrait">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-violet-900">
              <Photo
                image={founder.portrait}
                fill
                preload
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-violet-950/70 via-transparent to-transparent" />
              <p className="eyebrow absolute bottom-6 left-6 text-mint-50">Kandy · Sri Lanka</p>
            </div>
          </ViewTransition>
        </div>
      </div>
    </section>
  );
}
