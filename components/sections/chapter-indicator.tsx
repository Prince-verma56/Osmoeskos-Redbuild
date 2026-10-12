"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { getLenis } from "@/lib/animations/lenis-store";

/**
 * Chapter scroll indicator (homepage only).
 *
 * A restrained vertical marker on the right (lg+ only — hidden on smaller
 * screens so it never overlaps content). Each chapter maps to a real homepage
 * section; the active chapter is derived from scroll position, and clicking a
 * chapter scrolls to its section through the shared Lenis instance (or native
 * scroll under reduced motion). It never traps scrolling.
 */

type Chapter = {
  id: string;
  label: string;
  /** "#id" of the target section, or null for the top of the page. */
  target: string | null;
};

const chapters: Chapter[] = [
  { id: "discover", label: "Discover", target: null },
  { id: "story", label: "The Story", target: "#story" },
  { id: "film", label: "The Film", target: "#film" },
  { id: "texture", label: "The Texture", target: "#texture" },
  { id: "ingredients", label: "Ingredients", target: "#ingredients" },
];

export function ChapterIndicator() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(chapters[0].id);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      const middle = window.scrollY + window.innerHeight / 2;
      let current = chapters[0].id;
      for (const chapter of chapters) {
        const top = chapter.target
          ? (document.querySelector<HTMLElement>(chapter.target)?.getBoundingClientRect()
              .top ?? Infinity) + window.scrollY
          : 0;
        if (top <= middle) current = chapter.id;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const goTo = (chapter: Chapter) => {
    const lenis = getLenis();
    if (chapter.target === null) {
      if (lenis && !reduceMotion) lenis.scrollTo(0, { duration: 1 });
      else window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    const el = document.querySelector<HTMLElement>(chapter.target);
    if (!el) return;
    if (lenis && !reduceMotion) {
      lenis.scrollTo(el, { duration: 1, offset: -80 });
    } else {
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Chapters"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col gap-1">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeId;
          return (
            <li key={chapter.id} className="pointer-events-auto">
              <button
                type="button"
                onClick={() => goTo(chapter)}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-3 rounded-full py-1.5 pl-3 pr-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
              >
                <span
                  className={[
                    "whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                    isActive
                      ? "text-[#243526] opacity-100"
                      : "text-[#77766C] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                  ].join(" ")}
                >
                  {chapter.label}
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    "block rounded-full transition-all duration-300",
                    isActive
                      ? "h-2.5 w-2.5 bg-[#243526]"
                      : "h-2 w-2 bg-[#243526]/25 group-hover:bg-[#243526]/50",
                  ].join(" ")}
                />
                <span className="sr-only">Go to {chapter.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
