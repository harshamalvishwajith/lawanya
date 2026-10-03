import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Serif, Jost } from "next/font/google";

import { introScript } from "@/components/layout/intro";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lawanya Events & Digital — Creative Studio, Production House & Event Design",
    template: "%s · Lawanya Events & Digital",
  },
  description:
    "An independent creative studio in Kandy, Sri Lanka, specializing in branding, cinematic production, digital storytelling, and experiential event design.",
  keywords: [
    "event design Sri Lanka",
    "wedding films Kandy",
    "video production",
    "brand strategy",
    "creative studio",
    "Lawanya Events",
  ],
  openGraph: {
    type: "website",
    siteName: "Lawanya Events & Digital",
    title: "Lawanya Events & Digital",
    description: "Ideas become stories. Stories become experiences. Experiences become unforgettable.",
    locale: "en_LK",
  },
};

export const viewport: Viewport = {
  themeColor: "#f0fff1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${jost.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* Reveal animations start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-mint-200 focus:px-5 focus:py-3 focus:text-violet-950"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
