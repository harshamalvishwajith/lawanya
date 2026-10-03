"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useSpring, type Variants } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cinematicEase } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

import { useHeroDelay } from "./hero-sequence";
import styles from "./hero.module.css";

interface HeadlineLine {
  lead: string;
  key: string;
}

interface HeroHeadlineProps {
  lines: readonly HeadlineLine[];
  className?: string;
}

type Frame = { subject: string; verb: string; keyword: string; stop: string };

/** "Ideas become" + "stories." → subject "Ideas", verb "become", keyword "stories", stop "." */
function toFrame({ lead, key }: HeadlineLine): Frame {
  const [subject, ...verb] = lead.split(" ");
  const match = key.match(/^(.*?)([.!?]?)$/);
  return { subject, verb: verb.join(" "), keyword: match?.[1] ?? key, stop: match?.[2] ?? "" };
}

const LAVENDER = "#8367c7";
const VIOLET = "#5603ad";
const HOLD = 2800; // ms each sentence rests
const HOLD_LAST = 3800; // the payoff line lingers
const TRAVEL = 0.95; // s for the relay word to climb a line
const spring = { stiffness: 220, damping: 26, mass: 0.7 };

const subjectVariants: Variants = {
  // A fresh subject (first frame of a loop) racks in from below.
  enter: { opacity: 0, y: "0.4em", filter: "blur(10px)", color: LAVENDER },
  // The relay word arrives still violet; layoutId carries it up from line two.
  arrive: { opacity: 1, y: "0em", filter: "blur(0px)", color: VIOLET },
  center: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    color: LAVENDER,
    transition: { duration: TRAVEL, ease: cinematicEase },
  },
  leave: { opacity: 0, y: "-0.45em", filter: "blur(8px)", transition: { duration: 0.55, ease: cinematicEase } },
};

const keywordVariants: Variants = {
  enter: { opacity: 0, y: "0.5em", filter: "blur(12px)" },
  center: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.3, ease: cinematicEase },
  },
  // When the keyword relays upward it lives on as the next subject: hand over instantly
  // (a crossfade would double-expose "stories." and "Stories").
  leave: (relay: boolean) =>
    relay
      ? { opacity: 0, transition: { duration: 0 } }
      : { opacity: 0, y: "0.3em", filter: "blur(10px)", transition: { duration: 0.5, ease: cinematicEase } },
};

type Sequence = { index: number; from: number | null; cycle: number };

/**
 * The tagline as a relay: one sentence at a time across two lines. Each
 * sentence's last word climbs to become the subject of the next —
 * "Ideas become / stories." → "Stories become / experiences." → …
 * The camera's autofocus brackets follow the word up, then pull focus to the new one.
 */
export function HeroHeadline({ lines, className }: HeroHeadlineProps) {
  const frames = lines.map(toFrame);
  const delay = useHeroDelay();
  const reduceMotion = useReducedMotion();
  const [sequence, setSequence] = useState<Sequence>({ index: 0, from: null, cycle: 0 });
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [focus, setFocus] = useState<"subject" | "keyword" | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subjectRef = useRef<HTMLSpanElement | null>(null);
  const keywordRef = useRef<HTMLSpanElement | null>(null);
  const placedRef = useRef(false);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const width = useSpring(0, spring);
  const height = useSpring(0, spring);

  // Exiting words unmount after the new ones mount, so ignore their null and keep the latest.
  const setSubjectEl = useCallback((node: HTMLSpanElement | null) => {
    if (node) subjectRef.current = node;
  }, []);
  const setKeywordEl = useCallback((node: HTMLSpanElement | null) => {
    if (node) keywordRef.current = node;
  }, []);

  const { index, from, cycle } = sequence;
  const frame = frames[index];
  const relay = from !== null && frames[from].keyword.toLowerCase() === frame.subject.toLowerCase();
  // Scope shared-layout ids to the loop so a new cycle never inherits an old position.
  const layoutKey = (word: string) => `${cycle}-${word.toLowerCase()}`;

  // Advance through the sentences; pause on hover, off-screen, or for reduced motion.
  useEffect(() => {
    if (reduceMotion || hovered || !inView) return;
    const rest = index === frames.length - 1 ? HOLD_LAST : HOLD;
    const lead = from === null ? (delay + 1.2) * 1000 : TRAVEL * 1000;
    const timer = window.setTimeout(() => {
      setSequence((current) => ({
        index: (current.index + 1) % frames.length,
        from: current.index,
        cycle: current.index === frames.length - 1 ? current.cycle + 1 : current.cycle,
      }));
    }, lead + rest);
    return () => window.clearTimeout(timer);
  }, [delay, frames.length, from, hovered, inView, index, reduceMotion]);

  // Focus pulls: follow the relay word up, then rack down to the new keyword.
  useEffect(() => {
    const timers: number[] = [];
    if (from === null) {
      timers.push(window.setTimeout(() => setFocus("keyword"), (delay + 1.1) * 1000));
    } else if (relay) {
      timers.push(window.setTimeout(() => setFocus("subject"), 40));
      timers.push(window.setTimeout(() => setFocus("keyword"), (TRAVEL + 0.25) * 1000));
    } else {
      timers.push(window.setTimeout(() => setFocus("keyword"), 700));
    }
    return () => timers.forEach(window.clearTimeout);
  }, [delay, from, index, relay]);

  // Keep the brackets on the focused word (layout offsets ignore in-flight transforms).
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || focus === null) return;

    const place = (instant: boolean) => {
      const word = focus === "subject" ? subjectRef.current : keywordRef.current;
      if (!word) return;
      let left = 0;
      let top = 0;
      let node: HTMLElement | null = word;
      while (node && node !== heading) {
        left += node.offsetLeft;
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      const values = [left - 14, top - 2, word.offsetWidth + 28, word.offsetHeight + 4];
      [x, y, width, height].forEach((value, i) => (instant ? value.jump(values[i]) : value.set(values[i])));
    };

    place(!placedRef.current);
    placedRef.current = true;
    const observer = new ResizeObserver(() => place(true));
    observer.observe(heading);
    void document.fonts.ready.then(() => place(true));
    return () => observer.disconnect();
  }, [focus, index, x, y, width, height]);

  // Stop cycling while the hero is scrolled out of view.
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  const sentence = lines.map((line) => `${line.lead} ${line.key}`).join(" ");

  return (
    <h1
      ref={headingRef}
      className={cn("relative", className)}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span className="sr-only">{sentence}</span>

      {/* The relay (two lines, fixed height so nothing below ever jumps). */}
      <span
        aria-hidden="true"
        className="block text-[clamp(2.75rem,0.9rem+7.6vw,8.75rem)] leading-[1.02] motion-reduce:hidden"
      >
        <LayoutGroup id="hero-relay">
          <motion.span
            className="relative block whitespace-nowrap"
            initial={{ opacity: 0, filter: "blur(16px)", y: "0.15em" }}
            animate={{ opacity: 1, filter: "blur(0px)", y: "0em", transitionEnd: { filter: "none" } }}
            transition={{ delay, duration: 1.2, ease: cinematicEase }}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={relay}>
              <motion.span
                key={`subject-${layoutKey(frame.subject)}`}
                ref={setSubjectEl}
                layoutId={layoutKey(frame.subject)}
                layout="position"
                custom={relay}
                variants={subjectVariants}
                initial={relay ? "arrive" : "enter"}
                animate="center"
                exit="leave"
                transition={{ layout: { duration: TRAVEL, ease: cinematicEase } }}
                className="inline-block italic"
              >
                {frame.subject}
              </motion.span>
            </AnimatePresence>{" "}
            <motion.span
              layout="position"
              transition={{ layout: { duration: TRAVEL, ease: cinematicEase } }}
              className="inline-block"
            >
              {frame.verb}
            </motion.span>
          </motion.span>

          <motion.span
            className="relative block whitespace-nowrap"
            initial={{ opacity: 0, filter: "blur(16px)", y: "0.2em" }}
            animate={{ opacity: 1, filter: "blur(0px)", y: "0em", transitionEnd: { filter: "none" } }}
            transition={{ delay: delay + 0.35, duration: 1.2, ease: cinematicEase }}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={relay}>
              <motion.span
                key={`keyword-${layoutKey(frame.keyword)}`}
                ref={setKeywordEl}
                layoutId={layoutKey(frame.keyword)}
                layout="position"
                custom={relay}
                variants={keywordVariants}
                initial="enter"
                animate="center"
                exit="leave"
                transition={{ layout: { duration: TRAVEL, ease: cinematicEase } }}
                className="inline-block text-violet-600 italic [text-shadow:0_0_40px_rgb(131_103_199/0.28)]"
              >
                {frame.keyword}
                {frame.stop}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </LayoutGroup>
      </span>

      {/* Reduced motion: the whole chain, still. */}
      <span aria-hidden="true" className="hidden text-[clamp(2.4rem,1rem+4.2vw,6rem)] leading-[1.05] motion-reduce:block">
        {frames.map((line) => (
          <span key={line.subject} className="block">
            <span className="text-lavender-500 italic">{line.subject}</span> {line.verb}{" "}
            <span className="text-violet-600 italic">
              {line.keyword}
              {line.stop}
            </span>
          </span>
        ))}
      </span>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 hidden sm:motion-safe:block"
        style={{ x, y, width, height }}
        initial={{ opacity: 0 }}
        animate={{ opacity: focus === null ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          key={`${index}-${focus}`}
          className={cn(styles.focusBox, "absolute inset-0")}
          initial={{ scale: 1.12, color: "#b9a8ea" }}
          animate={{ scale: 1, color: VIOLET }}
          transition={{ duration: 0.45, ease: cinematicEase }}
        >
          <i />
          <span className={styles.focusLabel}>AF · {focus === "subject" ? "Tracking" : "Locked"}</span>
        </motion.span>
      </motion.span>
    </h1>
  );
}
