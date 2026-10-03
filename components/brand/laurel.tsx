import { cn } from "@/lib/utils";

/**
 * Film-festival style laurel, echoing the wreath in the Lawanya emblem.
 * Leaves are placed along an arc so the branch reads as hand-drawn, not clip-art.
 */
const CX = 60;
const CY = 60;
const R = 46;
const LEAF = "M0 0C3-3.6 3.3-9.8 0-15.5C-3.3-9.8-3-3.6 0 0Z";

// Pairs of leaves along the stem, tapering toward the tip.
const leaves = Array.from({ length: 11 }, (_, i) => {
  const theta = ((104 + i * 12.4) * Math.PI) / 180;
  const x = CX + R * Math.cos(theta);
  const y = CY + R * Math.sin(theta);
  const along = (theta * 180) / Math.PI + 180;
  return [
    { x, y, rotate: along + 30, scale: 1.05 - i * 0.045 },
    { x, y, rotate: along - 36, scale: 0.95 - i * 0.045 },
  ];
}).flat();

function Branch() {
  return (
    <g>
      <path
        d={`M${CX + R * Math.cos((100 * Math.PI) / 180)} ${CY + R * Math.sin((100 * Math.PI) / 180)} A${R} ${R} 0 0 1 ${CX + R * Math.cos((232 * Math.PI) / 180)} ${CY + R * Math.sin((232 * Math.PI) / 180)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {leaves.map((leaf, i) => (
        <path
          key={i}
          d={LEAF}
          fill="currentColor"
          transform={`translate(${leaf.x.toFixed(2)} ${leaf.y.toFixed(2)}) rotate(${leaf.rotate.toFixed(1)}) scale(${leaf.scale.toFixed(3)})`}
        />
      ))}
    </g>
  );
}

interface LaurelProps {
  className?: string;
}

export function Laurel({ className }: LaurelProps) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={cn("overflow-visible", className)}>
      <Branch />
      <g transform="translate(120 0) scale(-1 1)">
        <Branch />
      </g>
    </svg>
  );
}

interface LaurelBadgeProps {
  value: string;
  label: string;
  className?: string;
}

/** An achievement framed like a festival selection laurel. */
export function LaurelBadge({ value, label, className }: LaurelBadgeProps) {
  return (
    <div className={cn("relative grid aspect-square w-44 place-items-center text-center", className)}>
      <Laurel className="absolute inset-0 size-full text-current opacity-80" />
      <div className="relative max-w-[62%]">
        <p className="font-display text-2xl leading-none italic">{value}</p>
        <p className="mt-2 text-[0.62rem] leading-snug tracking-[0.14em] uppercase opacity-80">
          {label}
        </p>
      </div>
    </div>
  );
}
