import { ArrowRight } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Chapters } from "@/components/story/chapters";
import { Credentials, Expertise } from "@/components/story/expertise";
import { Journey } from "@/components/story/journey";
import { StoryHero } from "@/components/story/story-hero";
import { StoryStats } from "@/components/story/story-stats";
import { Button } from "@/components/ui/button";
import { founder, story } from "@/lib/content";

export const metadata: Metadata = {
  title: `${founder.name} — Founder’s Story`,
  description: story.statement,
};

// The story opens on a night-violet hero.
export const viewport: Viewport = {
  themeColor: "#140428",
};

export default function StoryPage() {
  return (
    <main id="main">
      <StoryHero />
      <StoryStats />
      <Chapters />
      <Journey />
      <Expertise />
      <Credentials />

      <section aria-labelledby="story-cta-title" className="bg-mint-100 py-24 text-center sm:py-32">
        <Reveal className="container-page">
          <p className="eyebrow text-violet-600">Work with the studio</p>
          <h2 id="story-cta-title" className="mx-auto mt-5 max-w-3xl font-display text-display-lg text-ink">
            Let’s create work that <span className="text-violet-600 italic">educates, inspires and connects.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/#contact">
                  Start your project
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg" className="text-violet-600">
              <Link href="/#divisions">Explore the divisions</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
