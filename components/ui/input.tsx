import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-xl border border-input bg-card/60 px-4 text-base text-foreground transition-[border-color,box-shadow,background-color] duration-300 outline-none placeholder:text-muted-foreground/70 hover:border-ring/60 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15 dark:bg-white/[0.035] dark:[color-scheme:dark]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
