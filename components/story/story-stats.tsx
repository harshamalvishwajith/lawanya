import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { story } from "@/lib/content";

export function StoryStats() {
  return (
    <section aria-label="At a glance" className="relative bg-violet-600 py-14 text-mint-50 sm:py-16">
      <Stagger className="container-page grid gap-10 sm:grid-cols-3 sm:gap-6" stagger={0.12}>
        {story.stats.map((stat) => (
          <StaggerItem key={stat.label} className="border-l border-mint-200/30 pl-6">
            <p className="font-display text-6xl leading-none text-mint-200 sm:text-7xl">
              <CountUp value={stat.value} />
            </p>
            <p className="mt-4 max-w-xs text-mint-50/80">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
