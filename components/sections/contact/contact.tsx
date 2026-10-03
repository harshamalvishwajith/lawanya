import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SceneLabel } from "@/components/brand/scene-label";
import { SocialIcon } from "@/components/brand/social-icon";
import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { contact, site } from "@/lib/content";

import { InquiryForm } from "./inquiry-form";

const channels = [
  { icon: Phone, label: "Call", value: site.phone.display, href: site.phone.href },
  { icon: MessageCircle, label: "WhatsApp", value: site.phone.display, href: `https://wa.me/${site.phone.whatsapp}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Studio", value: site.location, href: undefined },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="dark relative isolate overflow-hidden bg-violet-950 py-28 text-foreground sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-mint-200/40 to-transparent" />
        <div className="absolute -top-60 right-0 size-[40rem] rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SceneLabel scene="12" className="text-mint-200">
            Contact
          </SceneLabel>
          <WordReveal
            as="h2"
            text={contact.title}
            accent={["journey"]}
            accentClassName="italic text-mint-200"
            className="mt-6 font-display text-display-lg text-mint-50"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 text-lead text-mint-50/75">{contact.subtitle}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-mint-200 transition-colors duration-300 group-hover:border-mint-200 group-hover:bg-mint-200 group-hover:text-violet-950">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow block text-lavender-300">{label}</span>
                      <span className="mt-1 block truncate text-lg text-mint-50">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 py-4"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="eyebrow mt-10 text-lavender-300">Follow the story</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid size-12 place-items-center rounded-full border border-white/15 text-mint-50/80 transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-mint-200 hover:text-mint-200"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1} effect="focus">
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
