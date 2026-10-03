"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function BackToTop() {
  const lenis = useLenis();

  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-3 rounded-full py-1 text-sm text-mint-50/70 transition-colors hover:text-mint-200"
    >
      Back to the opening scene
      <span className="grid size-9 place-items-center rounded-full border border-white/15 transition-[border-color,transform] duration-500 group-hover:-translate-y-1 group-hover:border-mint-200">
        <ArrowUp className="size-4" />
      </span>
    </button>
  );
}
