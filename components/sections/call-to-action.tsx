import { ArrowRight } from "lucide-react";

import { OrbitBadge } from "@/components/brand/orbit-badge";
import { SceneLabel } from "@/components/brand/scene-label";
import { NavLink } from "@/components/layout/nav-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { Button } from "@/components/ui/button";
import { callToAction } from "@/lib/content";

export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="dark relative isolate overflow-hidden bg-violet-600 py-32 text-center text-foreground sm:py-44">
      {/* Aurora: slow-moving pools of stage light. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-1/3 -left-1/4 size-[48rem] animate-float rounded-full bg-lavender-500/60 blur-[120px]" />
        <div className="absolute -right-1/4 -bottom-1/2 size-[52rem] animate-float rounded-full bg-violet-950/70 blur-[120px] [animation-delay:-4s]" />
        <div className="absolute top-1/4 right-1/4 size-[26rem] animate-float rounded-full bg-mint-200/25 blur-[100px] [animation-delay:-2s]" />
        <div className="film-grain" />
      </div>

      <div className="container-page relative">
        <OrbitBadge
          id="cta"
          text="Brands · Stories · Experiences · "
          className="mx-auto mb-10 size-32 text-mint-100 sm:size-36"
        />
        <SceneLabel scene="11" className="justify-center text-mint-200">
          The next scene
        </SceneLabel>
        <WordReveal
          as="h2"
          text={callToAction.title}
          accent={["meaningful"]}
          accentClassName="italic text-shimmer animate-shimmer"
          className="mx-auto mt-8 max-w-5xl font-display text-display-xl text-mint-50"
        />
        <Reveal className="mx-auto mt-8 max-w-2xl space-y-4" delay={0.2}>
          <p className="text-lead text-mint-50/85">{callToAction.body}</p>
          <p className="font-display text-2xl text-mint-100 italic">{callToAction.belief}</p>
        </Reveal>
        <Reveal className="mt-12" delay={0.35}>
          <Magnetic>
            <Button asChild variant="mint" size="lg">
              <NavLink hash="contact">
                Start your creative journey
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </NavLink>
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
