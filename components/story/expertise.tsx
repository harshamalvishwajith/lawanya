import { Clapperboard, GraduationCap, Megaphone } from "lucide-react";

import { LaurelBadge } from "@/components/brand/laurel";
import { Photo } from "@/components/media/photo";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { story } from "@/lib/content";

const areaIcons = [Clapperboard, Megaphone, GraduationCap];

export function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="relative overflow-hidden bg-background py-28 sm:py-36">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-violet-600">Core expertise</p>
          <h2 id="expertise-title" className="mt-5 max-w-3xl font-display text-display-lg text-ink">
            Where media, marketing and <span className="text-violet-600 italic">education</span> meet.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {story.coreExpertise.map((group, i) => {
            const Icon = areaIcons[i];
            return (
              <StaggerItem
                key={group.area}
                className="group rounded-3xl border border-violet-600/10 bg-card p-8 shadow-[0_24px_60px_-40px_rgb(86_3_173/0.5)] transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="grid size-12 place-items-center rounded-full bg-violet-600 text-mint-50 transition-transform duration-500 group-hover:rotate-12">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-3xl text-ink">{group.area}</h3>
                <ul className="mt-5 space-y-2.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-baseline gap-2.5 text-ink-soft">
                      <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-0.15em] rotate-45 bg-violet-600" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <div className="mt-20">
        <p className="container-page eyebrow text-ink-soft">Areas of expertise</p>
        <Marquee duration={50} className="mt-6">
          {story.areasOfExpertise.map((area) => (
            <span key={area} className="flex items-center gap-6 pr-6 font-display text-3xl whitespace-nowrap text-ink sm:text-4xl">
              {area}
              <span aria-hidden="true" className="size-2 rotate-45 bg-lavender-500" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export function Credentials() {
  return (
    <section aria-labelledby="credentials-title" className="dark relative isolate overflow-hidden bg-violet-950 py-28 text-foreground sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Photo image="graduation" decorative fill sizes="100vw" className="object-cover opacity-20 saturate-0" />
        <div className="absolute inset-0 bg-linear-to-b from-violet-950 via-violet-950/80 to-violet-950" />
        <div className="film-grain" />
      </div>
      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow text-mint-200">Academic & professional credentials</p>
          <h2 id="credentials-title" className="mx-auto mt-5 max-w-3xl font-display text-display-lg text-mint-50">
            A proud product of <span className="text-mint-200 italic">free education</span>.
          </h2>
        </Reveal>
        <Stagger as="ul" className="mt-16 grid gap-10 sm:grid-cols-3" stagger={0.15}>
          {story.credentials.map((credential) => (
            <StaggerItem key={credential.title} as="li" effect="focus" className="flex flex-col items-center text-center">
              <LaurelBadge value={credential.short} label={credential.badge} className="w-44 text-mint-200" />
              <h3 className="mt-6 max-w-xs font-display text-2xl text-mint-50">{credential.title}</h3>
              <p className="mt-2 text-mint-50/65">{credential.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
