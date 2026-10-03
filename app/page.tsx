import { Intro } from "@/components/layout/intro";
import { CallToAction } from "@/components/sections/call-to-action";
import { Contact } from "@/components/sections/contact/contact";
import { Divisions } from "@/components/sections/divisions";
import { Founder } from "@/components/sections/founder/founder";
import { Hero } from "@/components/sections/hero/hero";
import { Insights } from "@/components/sections/insights";
import { Partners } from "@/components/sections/partners";
import { Philosophy } from "@/components/sections/philosophy";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { PromiseBand } from "@/components/sections/promise-band";
import { WeCreate } from "@/components/sections/we-create";
import { WhoWeAre } from "@/components/sections/who-we-are/who-we-are";

export default function HomePage() {
  return (
    <>
      <Intro />
      <main id="main">
        <Hero />
        <PromiseBand />
        <WeCreate />
        <WhoWeAre />
        <Philosophy />
        <Divisions />
        <Founder />
        <Process />
        <Projects />
        <Partners />
        <Insights />
        <CallToAction />
        <Contact />
      </main>
    </>
  );
}
