import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Emblem } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="dark relative isolate grid min-h-svh place-items-center overflow-hidden bg-violet-950 px-6 text-center text-foreground">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="film-grain" />
        <div className="absolute top-1/2 left-1/2 size-[40rem] -translate-1/2 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 size-[30rem] -translate-1/2 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-0 h-px w-full bg-white/5" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-white/5" />
      </div>
      <div>
        <Emblem className="mx-auto size-16 text-mint-200" />
        <p className="eyebrow mt-8 text-lavender-300">Scene 404 · Take missing</p>
        <h1 className="mt-4 font-display text-display-xl text-mint-50">
          This reel <span className="text-mint-200 italic">didn’t make the cut.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lead text-mint-50/70">
          The page you’re looking for has moved or never existed. Let’s take you back to the opening scene.
        </p>
        <Button asChild variant="mint" size="lg" className="mt-10">
          <Link href="/">
            <ArrowLeft />
            Back to the studio
          </Link>
        </Button>
      </div>
    </main>
  );
}
