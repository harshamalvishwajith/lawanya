import { cn } from "@/lib/utils";

interface SceneLabelProps {
  scene: string;
  children: React.ReactNode;
  className?: string;
}

/** Section eyebrow styled like a clapperboard slate: "SC. 02 — Who we are". */
export function SceneLabel({ scene, children, className }: SceneLabelProps) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden="true" className="flex h-3.5 w-7 overflow-hidden rounded-[3px] border border-current/40">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className={cn("h-full w-1/4 -skew-x-[30deg]", i % 2 === 0 && "bg-current/50")} />
        ))}
      </span>
      <span className="opacity-75">Sc. {scene}</span>
      <span aria-hidden="true" className="h-px w-6 bg-current/40" />
      <span>{children}</span>
    </p>
  );
}
