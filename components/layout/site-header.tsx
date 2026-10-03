"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { navigation } from "@/lib/content";
import { cn } from "@/lib/utils";

const sectionIds = ["top", ...navigation.map((item) => item.hash), "contact"];

// Pages whose opening section is light; elsewhere the header starts on a dark hero.
const lightHeroRoutes = new Set(["/"]);

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection(sectionIds);
  const pathname = usePathname();
  // Transparent over a light hero: ink on paper. Once condensed, the dark glass pill.
  const onLightHero = lightHeroRoutes.has(pathname) && !scrolled;

  // Condense into a pill once the page moves; tuck away while reading downward.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (y > 480 && y > previous + 4) setHidden(true);
    else if (y < previous - 4 || y <= 480) setHidden(false);
  });

  return (
    <motion.header
      className={cn("fixed inset-x-0 top-0 z-50", !onLightHero && "dark")}
      initial={false}
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-page pt-3 sm:pt-4">
        <div
          className={cn(
            "flex h-16 items-center justify-between gap-4 rounded-full border pr-2 pl-4 text-foreground transition-[color,background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:pl-5",
            scrolled
              ? "border-white/10 bg-violet-950/70 shadow-[0_20px_50px_-24px_rgb(0_0_0/0.7)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <NavLink hash="top" aria-label="Lawanya Events & Digital — home" className="rounded-full">
            <Logo />
          </NavLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => {
                const isActive = active === item.hash;
                return (
                  <li key={item.hash}>
                    <NavLink
                      hash={item.hash}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-300 hover:text-primary",
                        isActive ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-4 -bottom-0.5 mx-auto h-[3px] w-[3px] rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <NavLink hash="contact">
                Start a project
                <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </NavLink>
            </Button>
            <MobileMenu className="lg:hidden" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
