import { cn } from "@/lib/utils";

interface EmblemProps {
  className?: string;
  /** Provide a label when the emblem stands alone; omit when text sits beside it. */
  label?: string;
}

/** The laurel + script "L" emblem, recoloured through `currentColor`. */
export function Emblem({ className, label }: EmblemProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("emblem-mask inline-block aspect-square shrink-0", className)}
    />
  );
}

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Emblem className="size-10" />
      <span className={cn("flex flex-col leading-none", compact && "sr-only")}>
        <span className="font-display text-[1.35rem] tracking-[0.01em]">Lawanya</span>
        <span className="mt-1 font-mono text-[0.58rem] tracking-[0.3em] uppercase opacity-70">
          Events &amp; Digital
        </span>
      </span>
    </span>
  );
}
