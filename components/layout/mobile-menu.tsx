"use client";

import { useLenis } from "lenis/react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { Emblem } from "@/components/brand/logo";
import { SocialIcon } from "@/components/brand/social-icon";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigation, site } from "@/lib/content";

const links = [...navigation, { label: "Contact", hash: "contact" }] as const;

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) lenis?.stop();
    else lenis?.start();
  }

  const close = () => handleOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-sm" className={className} aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        data-lenis-prevent
        className="dark h-dvh overflow-y-auto border-none bg-violet-950 px-6 pt-24 pb-10 text-foreground"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Jump to a section of the Lawanya site.</SheetDescription>

        <Emblem className="pointer-events-none absolute -right-24 -bottom-16 size-[26rem] text-violet-800/60" />

        <nav aria-label="Mobile" className="relative">
          <ul className="flex flex-col gap-1">
            {links.map((item, i) => (
              <motion.li
                key={item.hash}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavLink
                  hash={item.hash}
                  scrollDelay={360}
                  onClick={close}
                  className="group flex items-baseline gap-4 py-2 font-display text-4xl text-mint-50 transition-colors hover:text-mint-200 sm:text-5xl"
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-lavender-300">0{i + 1}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-2">{item.label}</span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="relative mt-12 space-y-4 border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a href={site.phone.href} className="block text-lg text-mint-50/90">
            {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className="block text-lg text-mint-50/90">
            {site.email}
          </a>
          <ul className="flex gap-2 pt-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-mint-50/80 transition-colors hover:border-mint-200 hover:text-mint-200"
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
