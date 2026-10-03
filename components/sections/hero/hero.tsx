import { ArrowRight, Play } from "lucide-react";
import { Fragment } from "react";

import { NavLink } from "@/components/layout/nav-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/content";

import { FilmReels } from "./film-reels";
import { HeroHeadline } from "./hero-headline";
import { HeroItem, HeroSequence, ScrollDrift } from "./hero-sequence";
import styles from "./hero.module.css";
import { Particles } from "./particles";
import { StageLights } from "./stage-lights";
import { Viewfinder } from "./viewfinder";

/**
 * Opening scene. Behind the headline the studio is at work: stage lights sweep
 * the rig, strips of footage roll through 3D space, venue bokeh drifts up and
 * flash bulbs pop — all seen through a live camera viewfinder.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-mint-50 text-foreground"
    >
      <div className={styles.backdrop} aria-hidden="true">
        <ScrollDrift className="absolute inset-0">
          <FilmReels frames={hero.reel} />
        </ScrollDrift>
        <div className={styles.shade} />
        <StageLights />
        <Particles className={styles.particles} />
        <div className={styles.vignette} />
        <div className="film-grain-ink" />
      </div>

      <Viewfinder />

      <HeroSequence className="container-page relative z-10 flex flex-1 flex-col justify-center pt-36 pb-44 sm:pt-40 sm:pb-32">
        <HeroItem>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-violet-600">
            {hero.disciplines.map((discipline, i) => (
              <Fragment key={discipline}>
                {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-lavender-400" />}
                <span>{discipline}</span>
              </Fragment>
            ))}
          </p>
        </HeroItem>

        <HeroHeadline
          lines={hero.lines}
          className="mt-6 font-display tracking-[-0.015em] text-ink"
        />

        <div className="mt-10 max-w-xl lg:mt-12">
          <HeroItem at={1.35}>
            <p className="text-lead text-ink-soft">{hero.intro}</p>
          </HeroItem>
          <HeroItem at={1.5} className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="lg">
                <NavLink hash="contact">
                  Start your project
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </NavLink>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg" className="text-violet-700">
              <NavLink hash="work">
                <Play className="size-3.5 fill-current" />
                Explore the work
              </NavLink>
            </Button>
          </HeroItem>
        </div>
      </HeroSequence>

      <HeroItem at={1.9} className="pointer-events-none absolute inset-x-0 bottom-7 z-10 hidden justify-center sm:flex">
        <div aria-hidden="true" className="flex flex-col items-center gap-3 text-ink-soft/80">
          <span className="eyebrow text-[0.6rem]">Scroll · the story begins</span>
          <span className="relative h-10 w-px overflow-hidden bg-violet-600/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2s_var(--ease-cine)_infinite] bg-violet-600" />
          </span>
        </div>
      </HeroItem>
    </section>
  );
}
