import { Photo } from "@/components/media/photo";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { story } from "@/lib/content";

import { ChapterNav } from "./chapter-nav";

export function Chapters() {
  return (
    <section aria-label="Biography" className="relative bg-background py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <ChapterNav chapters={story.chapters} />
        </div>

        <div className="space-y-24 lg:col-span-9 lg:space-y-32">
          {story.chapters.map((chapter, i) => (
            <article key={chapter.id} id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="scroll-mt-32">
              <Reveal>
                <p className="eyebrow text-violet-600">Chapter 0{i + 1}</p>
                <h2 id={`${chapter.id}-title`} className="mt-4 max-w-3xl font-display text-display-lg text-ink">
                  {chapter.title}
                </h2>
              </Reveal>

              <Reveal className="mt-10 overflow-hidden rounded-3xl" effect="focus" amount={0.2}>
                <Parallax distance={90} className="relative aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
                  <div className="absolute -inset-y-12 inset-x-0">
                    <Photo image={chapter.image} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
                  </div>
                </Parallax>
              </Reveal>

              <div className="mt-10 grid gap-6 xl:grid-cols-2 xl:gap-10">
                {chapter.paragraphs.map((paragraph, index) => (
                  <Reveal key={index} delay={index * 0.08}>
                    <p className={index === 0 ? "text-lead text-ink" : "text-ink-soft"}>{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              {"quote" in chapter && chapter.quote && (
                <Reveal className="mt-12" effect="focus">
                  <figure className="relative overflow-hidden rounded-3xl bg-violet-600 p-8 text-mint-50 sm:p-12">
                    <span aria-hidden="true" className="absolute -top-10 right-6 font-display text-[12rem] leading-none text-violet-500">
                      ”
                    </span>
                    <blockquote className="relative font-display text-display-md italic">“{chapter.quote}”</blockquote>
                    <figcaption className="eyebrow relative mt-6 text-mint-200">Nisangi Lawanya Rammandala</figcaption>
                  </figure>
                </Reveal>
              )}
              {"after" in chapter && chapter.after && (
                <Reveal className="mt-8 max-w-3xl">
                  <p className="text-ink-soft">{chapter.after}</p>
                </Reveal>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
