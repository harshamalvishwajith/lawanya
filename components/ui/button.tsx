import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  // A soft beam of light sweeps across on hover — a nod to stage lighting.
  "group/button relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full border border-transparent font-medium tracking-[0.02em] whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-(--ease-cine) outline-none select-none before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:-z-10 before:w-1/2 before:-skew-x-12 before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent before:opacity-0 before:transition-[left,opacity] before:duration-700 before:ease-(--ease-cine) hover:before:left-full hover:before:opacity-100 focus-visible:ring-4 focus-visible:ring-ring/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_12px_32px_-14px_var(--primary)] hover:shadow-[0_18px_44px_-14px_var(--primary)]",
        mint: "bg-mint-200 text-violet-950 shadow-[0_12px_40px_-14px_var(--color-mint-200)] hover:bg-mint-100",
        outline:
          "border-current/25 bg-transparent text-current hover:border-current/60 hover:bg-current/[0.06]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-mint-300",
        ghost: "text-current before:hidden hover:bg-current/[0.08]",
        link: "rounded-none px-0 text-current underline decoration-current/30 underline-offset-[6px] before:hidden hover:decoration-current",
      },
      size: {
        default: "h-12 px-6 text-[0.95rem]",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "size-12",
        "icon-sm": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
