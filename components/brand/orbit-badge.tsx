import { Emblem } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const RADIUS = 76;
const CIRCUMFERENCE = Math.floor(2 * Math.PI * RADIUS);

interface OrbitBadgeProps {
  /** One lap of text (spacing stretches to fit); end it with a separator so the loop reads cleanly. */
  text: string;
  /** Unique per page — used for the SVG path reference. */
  id: string;
  className?: string;
}

/** A slowly turning ring of type around the emblem, like a festival seal. */
export function OrbitBadge({ text, id, className }: OrbitBadgeProps) {
  const pathId = `orbit-${id}`;
  return (
    <div aria-hidden="true" className={cn("relative grid place-items-center rounded-full", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-[spin_28s_linear_infinite]">
        <defs>
          <path id={pathId} d={`M100 100m-${RADIUS} 0a${RADIUS} ${RADIUS} 0 1 1 ${RADIUS * 2} 0a${RADIUS} ${RADIUS} 0 1 1-${RADIUS * 2} 0`} />
        </defs>
        <text className="fill-current font-mono text-[12.5px] tracking-[0.3em] uppercase">
          <textPath href={`#${pathId}`} textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Emblem className="size-[38%]" />
    </div>
  );
}
