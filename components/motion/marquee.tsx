import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
}

/** Infinite CSS marquee: two identical tracks slide by exactly one track width. */
export function Marquee({ children, className, duration = 40, reverse = false }: MarqueeProps) {
  return (
    <div className={cn("group/marquee flex overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee group-hover/marquee:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
