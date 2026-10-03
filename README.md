# Lawanya Events & Digital — website

Marketing site for **Lawanya Events & Digital**, an independent creative studio in Kandy, Sri Lanka.
Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, shadcn/ui (Radix), Motion and Lenis.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://lawanya.lk`) in production so share previews use absolute URLs.

## Editing the site

| What | Where |
| --- | --- |
| All text (home + founder story) | `lib/content.ts` |
| Photos | `public/images/*.jpg` — replace a file with one of the **same name**; size and blur placeholder update automatically |
| Photo alt text | `lib/images.ts` |
| Colours, fonts, type scale | `app/globals.css` (the palette card colours are at the top) |
| Logo files | `public/brand/` (made from `logo_white.svg`), favicon `app/icon.svg`, share image `app/opengraph-image.png` |

### Placeholders to replace before launch

Search `lib/content.ts` for `SAMPLE`:

- **Photos** — every image in `public/images` is a free Pexels stock stand-in (see credits below), including `founder-portrait.jpg`.
- **Projects** — titles, categories and meta lines in `projects` (only "Film Reading · iTV" is real).
- **Partner logos** — `partners` currently shows invented placeholder names.
- **Social links** — `site.socials` point to `#`.

The inquiry form needs no backend: it opens the visitor's email app or WhatsApp with the message pre-written
to `lawanyaeventz@gmail.com` / `+94 70 200 5762`. To receive inquiries directly, replace `handleSubmit` in
`components/sections/contact/inquiry-form.tsx` with a Server Action and an email service.

## How it's put together

```
app/                 routes: / (home), /story (founder), not-found, metadata files
components/
  ui/                shadcn/ui primitives, restyled to the brand
  brand/             emblem, laurel, orbit badge, scene labels, social icons
  layout/            header, mobile menu, footer, intro titles, scroll progress
  motion/            reusable reveal / parallax / marquee / magnetic helpers
  sections/          home page sections (hero lives in sections/hero)
  story/             founder story page sections
lib/                 content, image registry, utils
hooks/               useActiveSection
```

## Sample photo credits

All sample photos are from [Pexels](https://www.pexels.com) (free to use; attribution appreciated). Replace them with the studio's own work.

| File | Pexels photo | Photographer |
| --- | --- | --- |
| wedding-couple.jpg | [30335822](https://www.pexels.com/photo/30335822/) | Eyyup Gürel |
| wedding-reception.jpg | [10994594](https://www.pexels.com/photo/10994594/) | Tolga Aslanturk |
| wedding-traditional.jpg | [11563688](https://www.pexels.com/photo/11563688/) | — |
| destination-wedding.jpg | [2788494](https://www.pexels.com/photo/2788494/) | — |
| concert-stage.jpg | [2263435](https://www.pexels.com/photo/2263435/) | Teddy Yang |
| corporate-keynote.jpg | [9275222](https://www.pexels.com/photo/9275222/) | FreeStockPro |
| gala-dinner.jpg | [16935910](https://www.pexels.com/photo/16935910/) | Matheus Bertelli |
| brand-activation.jpg | [10508110](https://www.pexels.com/photo/10508110/) | Han Zibar |
| cinema-camera.jpg | [28532582](https://www.pexels.com/photo/28532582/) | deep Bhullar |
| film-set.jpg | [3411414](https://www.pexels.com/photo/3411414/) | Kyle Loftus |
| clapperboard.jpg | [29508639](https://www.pexels.com/photo/29508639/) | StockHouse Films LLC |
| studio-shoot.jpg | [17764817](https://www.pexels.com/photo/17764817/) | — |
| creative-team.jpg | [8636606](https://www.pexels.com/photo/8636606/) | — |
| content-creation.jpg | [8371401](https://www.pexels.com/photo/8371401/) | — |
| music-video.jpg | [18421598](https://www.pexels.com/photo/18421598/) | Ezkol Arnak |
| tv-studio.jpg | [7865064](https://www.pexels.com/photo/7865064/) | — |
| podcast-mic.jpg | [27616685](https://www.pexels.com/photo/27616685/) | — |
| celebration.jpg | [15964966](https://www.pexels.com/photo/15964966/) | Danik Prihodko |
| founder-portrait.jpg | [15345390](https://www.pexels.com/photo/15345390/) | — (stand-in for Nisangi's portrait) |
| kandy.jpg | [39797661](https://www.pexels.com/photo/39797661/) | Thilina Alagiyawanna |
| graduation.jpg | [267885](https://www.pexels.com/photo/267885/) | — |
| lecture.jpg | [8199162](https://www.pexels.com/photo/8199162/) | Yan Krukau |
| event-decor.jpg | [17023020](https://www.pexels.com/photo/17023020/) | Matheus Bertelli |
| editing-suite.jpg | [8102677](https://www.pexels.com/photo/8102677/) | Ron Lach |

## Notes

**Motion.** The opening titles play once per browser session. Everything honours
`prefers-reduced-motion`: Lenis drops smooth scrolling, Motion skips transform animations, the hero
canvas and timecode stand still and the intro is skipped.
