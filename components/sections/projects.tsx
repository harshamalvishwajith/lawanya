"use client";

import { Play } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";

import { SceneLabel } from "@/components/brand/scene-label";
import { Photo } from "@/components/media/photo";
import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { projectCategories, projects, projectsCopy, type Project, type ProjectCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "All";

const footprint: Record<Project["size"], string> = {
  wide: "sm:col-span-2",
  tall: "lg:row-span-2",
  regular: "",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative isolate overflow-hidden rounded-3xl bg-violet-900", footprint[project.size])}
    >
      <Photo
        image={project.image}
        fill
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-[1400ms] ease-(--ease-cine) group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-violet-950/95 via-violet-950/45 via-45% to-transparent transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute top-5 right-5 left-5 flex items-center justify-between">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mint-50/70">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="grid size-11 scale-75 place-items-center rounded-full bg-mint-200 text-violet-950 opacity-0 transition-[opacity,transform] duration-500 ease-(--ease-cine) group-hover:scale-100 group-hover:opacity-100"
        >
          <Play className="size-4 translate-x-px fill-current" />
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 translate-y-2 transition-transform duration-500 ease-(--ease-cine) group-hover:translate-y-0">
        <p className="eyebrow text-mint-200">{project.category}</p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-mint-50 sm:text-3xl">{project.title}</h3>
        <p className="mt-1 text-sm text-mint-50/70">{project.meta}</p>
      </div>
    </motion.li>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);
  const filters: Filter[] = ["All", ...projectCategories];

  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-background py-28 sm:py-36">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SceneLabel scene="08" className="text-violet-600">
              Selected projects
            </SceneLabel>
            <WordReveal
              as="h2"
              text="Stories brought to life"
              accent={["life"]}
              accentClassName="italic text-violet-600"
              className="mt-6 font-display text-display-xl text-ink"
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lead text-ink-soft">{projectsCopy.intro}</p>
          </Reveal>
        </div>

        <Reveal className="mt-12" delay={0.1}>
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            <LayoutGroup id="project-filters">
              {filters.map((option) => {
                const selected = option === filter;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(option)}
                    className={cn(
                      "relative isolate shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors duration-300",
                      selected
                        ? "border-violet-600 text-mint-50"
                        : "border-violet-600/20 text-ink-soft hover:border-violet-600/60 hover:text-ink"
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-violet-600"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{option}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </Reveal>

        <motion.ul
          layout
          className="mt-10 grid auto-rows-[20rem] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} index={projects.indexOf(project)} />
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-10 max-w-2xl font-display text-2xl leading-snug text-ink italic">{projectsCopy.closing}</p>
      </div>
    </section>
  );
}
