import { Emblem } from "@/components/brand/logo";
import { Marquee } from "@/components/motion/marquee";
import { divisions, promise } from "@/lib/content";

const services = divisions.flatMap((division) => division.items);

/** Two counter-running bands: the promise in script, the services in slate type. */
export function PromiseBand() {
  return (
    <section aria-label="What we promise" className="relative z-10 -my-6 overflow-hidden py-10">
      <div className="-mx-4 -rotate-[1.6deg] bg-violet-600 py-5 text-mint-50 shadow-[0_24px_60px_-30px_rgb(20_4_40/0.8)]">
        <Marquee duration={42}>
          {promise.map((line) => (
            <span key={line} className="flex items-center gap-10 pr-10 font-display text-4xl whitespace-nowrap italic sm:text-5xl lg:text-6xl">
              Creating {line}
              <Emblem className="size-9 text-mint-200 sm:size-11" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="-mx-4 mt-1 rotate-[0.8deg] bg-mint-200 py-3 text-violet-950">
        <Marquee duration={60} reverse>
          {services.map((service) => (
            <span key={service} className="eyebrow flex items-center gap-6 pr-6 whitespace-nowrap">
              {service}
              <span aria-hidden="true" className="size-1.5 rotate-45 bg-violet-600" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
