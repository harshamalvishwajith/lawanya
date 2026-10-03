import Link from "next/link";

import { Emblem } from "@/components/brand/logo";
import { SocialIcon } from "@/components/brand/social-icon";
import { BackToTop } from "@/components/layout/back-to-top";
import { NavLink } from "@/components/layout/nav-link";
import { divisions, navigation, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="dark relative isolate overflow-hidden bg-violet-950 text-foreground">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="film-grain" />
        <div className="absolute top-10 left-1/2 h-72 w-[64rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="container-page pt-24 pb-10 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Emblem className="size-16 text-mint-200" />
            <p className="mt-6 font-display text-3xl sm:text-4xl">{site.name}</p>
            <p className="eyebrow mt-3 text-lavender-300">{site.descriptor}</p>
            <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-display text-xl text-mint-50/85 italic">
              {site.positioning.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow text-lavender-300">Studio</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.hash}>
                  <NavLink hash={item.hash} className="text-mint-50/80 transition-colors hover:text-mint-200">
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link href="/story" className="text-mint-50/80 transition-colors hover:text-mint-200">
                  Founder’s story
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow text-lavender-300">Divisions</p>
            <ul className="mt-5 space-y-3">
              {divisions.map((division) => (
                <li key={division.id}>
                  <NavLink hash="divisions" className="text-mint-50/80 transition-colors hover:text-mint-200">
                    {division.title}
                    <span className="block text-sm text-mint-50/45">{division.discipline}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-lavender-300">Say hello</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.phone.href} className="text-mint-50/80 transition-colors hover:text-mint-200">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-mint-50/80 transition-colors hover:text-mint-200">
                  {site.email}
                </a>
              </li>
              <li className="text-mint-50/80">{site.location}</li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-mint-50/75 transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-mint-200 hover:text-mint-200"
                  >
                    <SocialIcon name={social.icon} className="size-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* End credits: the name, set huge and half-lit. */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-20 -mb-[0.2em] bg-linear-to-b from-violet-700 to-violet-950 bg-clip-text text-center font-display text-[23vw] leading-[0.8] tracking-[-0.03em] text-transparent select-none"
        >
          Lawanya
        </p>

        <div className="relative flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-mint-50/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
