import { SceneLabel } from "@/components/brand/scene-label";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { partners, partnersCopy, type PartnerMark } from "@/lib/content";
import { cn } from "@/lib/utils";

// Placeholder marks until real partner logos are supplied.
const marks: Record<PartnerMark, React.ReactNode> = {
  circle: <circle cx="12" cy="12" r="8.5" fill="currentColor" />,
  diamond: <path d="M12 2.5 21.5 12 12 21.5 2.5 12Z" fill="currentColor" />,
  petal: (
    <g fill="currentColor">
      <path d="M12 2.5c3.2 2.6 3.2 7.2 0 9.5-3.2-2.3-3.2-6.9 0-9.5Z" />
      <path d="M12 21.5c-3.2-2.6-3.2-7.2 0-9.5 3.2 2.3 3.2 6.9 0 9.5Z" />
      <path d="M2.5 12c2.6-3.2 7.2-3.2 9.5 0-2.3 3.2-6.9 3.2-9.5 0Z" />
      <path d="M21.5 12c-2.6 3.2-7.2 3.2-9.5 0 2.3-3.2 6.9-3.2 9.5 0Z" />
    </g>
  ),
  peak: <path d="M2 20 9 6.5l4.2 6.4L16 9l6 11Z" fill="currentColor" />,
  star: <path d="m12 2.5 2.5 6.7 7 .4-5.5 4.5 1.9 6.9L12 17l-5.9 4 1.9-6.9L2.5 9.6l7-.4Z" fill="currentColor" />,
  wave: <path d="M2 15c3-5 5.5-5 8.5 0s5.5 5 8.5 0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />,
  ring: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </g>
  ),
  square: <rect x="4.5" y="4.5" width="15" height="15" rx="3" transform="rotate(14 12 12)" fill="currentColor" />,
};

const typeStyles = [
  "font-display text-3xl italic",
  "font-sans text-xl font-semibold tracking-[0.18em] uppercase",
  "font-display text-3xl",
  "font-mono text-lg tracking-[0.12em] uppercase",
];

function PartnerLogo({ name, mark, index }: { name: string; mark: PartnerMark; index: number }) {
  return (
    <span className="flex items-center gap-3 px-8 whitespace-nowrap text-violet-800/55 transition-colors duration-300 hover:text-violet-600 sm:px-12">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8 shrink-0">
        {marks[mark]}
      </svg>
      <span className={cn(typeStyles[index % typeStyles.length])}>{name}</span>
    </span>
  );
}

export function Partners() {
  const firstRow = partners.slice(0, 4);
  const secondRow = partners.slice(4);

  return (
    <section aria-labelledby="partners-title" className="relative overflow-hidden bg-mint-100 py-24 sm:py-28">
      <div className="container-page grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <SceneLabel scene="09" className="text-violet-600">
            Partners
          </SceneLabel>
          <h2 id="partners-title" className="mt-6 font-display text-display-md text-ink">
            {partnersCopy.title}
          </h2>
        </div>
        <Reveal className="lg:col-span-6" delay={0.1}>
          <p className="text-ink-soft">{partnersCopy.body}</p>
        </Reveal>
      </div>

      <div className="mt-14 space-y-6">
        <Marquee duration={38}>
          {[...firstRow, ...firstRow].map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} name={partner.name} mark={partner.mark} index={i} />
          ))}
        </Marquee>
        <Marquee duration={44} reverse>
          {[...secondRow, ...secondRow].map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} name={partner.name} mark={partner.mark} index={i + 1} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
