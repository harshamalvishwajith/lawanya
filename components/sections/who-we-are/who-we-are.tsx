import { Heart, Sparkles, Users } from "lucide-react";

import { SceneLabel } from "@/components/brand/scene-label";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { whoWeAre } from "@/lib/content";

import { Collage } from "./collage";
import { HoverImageWord } from "./hover-image-word";

const valueIcons = [Heart, Sparkles, Users];

export function WhoWeAre() {
  return (
    <section aria-labelledby="who-title" className="relative overflow-hidden bg-background pt-16 pb-28 sm:pb-36">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SceneLabel scene="03" className="text-violet-600">
            Who we are
          </SceneLabel>

          <div className="mt-10">
            <Reveal>
              <p className="text-lead text-ink-soft">Most agencies ask,</p>
              <p className="mt-1 w-fit font-display text-display-md text-ink-soft/55">
                <span className="relative">
                  “{whoWeAre.theyAsk}”
                  <span aria-hidden="true" className="absolute top-[55%] -right-1 -left-1 h-[2px] bg-ink-soft/45" />
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <p className="text-lead text-ink-soft">We ask,</p>
            </Reveal>
            <WordReveal
              as="h2"
              text={`“${whoWeAre.weAsk}”`}
              className="mt-1 font-display text-display-lg text-violet-600 italic"
              delay={0.25}
            />
          </div>

          <Reveal className="mt-12 max-w-2xl" delay={0.1}>
            <p className="text-lead text-ink">
              Because behind every{" "}
              {whoWeAre.behind.map((item, i) => (
                <span key={item.word}>
                  <HoverImageWord word={item.word} image={item.image} tilt={i % 2 === 0 ? -6 : 5} />
                  {i < whoWeAre.behind.length - 1 ? ", every " : ""}
                </span>
              ))}
              —{whoWeAre.behindEnd}
            </p>
          </Reveal>

          <Reveal className="mt-8 max-w-2xl" delay={0.1}>
            <p className="text-ink-soft">
              <strong className="font-medium text-ink">{whoWeAre.studioLead}</strong>
            </p>
          </Reveal>
          <Stagger as="ul" className="mt-4 flex max-w-2xl flex-wrap gap-2" stagger={0.06}>
            {whoWeAre.people.map((person) => (
              <StaggerItem key={person} as="li">
                <span className="inline-flex rounded-full border border-violet-600/20 bg-mint-200/60 px-4 py-1.5 text-[0.95rem] text-violet-800 transition-colors hover:border-violet-600 hover:bg-mint-200">
                  {person}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-4" delay={0.2}>
            <p className="text-ink-soft">{whoWeAre.studioEnd}</p>
          </Reveal>

          <Reveal className="mt-14 border-t border-border pt-10" delay={0.1}>
            <p className="max-w-xl font-display text-2xl leading-snug text-ink sm:text-3xl">{whoWeAre.belief}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {whoWeAre.values.map((value, i) => {
                const Icon = valueIcons[i];
                return (
                  <li key={value} className="flex items-center gap-3 rounded-2xl bg-card px-4 py-4 shadow-[0_12px_30px_-24px_rgb(86_3_173/0.6)]">
                    <span className="grid size-10 place-items-center rounded-full bg-violet-600 text-mint-50">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-medium text-ink">{value}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-24">
          <div className="lg:sticky lg:top-28">
            <Collage frames={whoWeAre.collage} />
          </div>
        </div>
      </div>
    </section>
  );
}
