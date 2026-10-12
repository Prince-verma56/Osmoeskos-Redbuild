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
 * scroll under reduced motion).
 *
 * Fixed alignment:
 * All dots sit inside a fixed-width (size-5) centered slot aligned along a
 * single vertical column. Chapter labels float smoothly to the left as absolute
 * badges so differing label lengths never cause horizontal zig-zag or misalignment.
 *
 * Intelligent contrast:
 * Detects whether the indicator's vertical center sits over dark/colored
 * surfaces (e.g. #formula, dark panels) and transitions dots/labels between
 * botanical green and luminous warm ivory with crisp micro drop-shadows,
 * requiring zero solid backgrounds.
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
  const [isDark, setIsDark] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      const middleY = window.innerHeight / 2;
      const scrollMiddle = window.scrollY + middleY;

      // 1. Determine active chapter
      let current = chapters[0].id;
      for (const chapter of chapters) {
        const top = chapter.target
          ? (document.querySelector<HTMLElement>(chapter.target)?.getBoundingClientRect()
              .top ?? Infinity) + window.scrollY
          : 0;
        if (top <= scrollMiddle) current = chapter.id;
      }
      setActiveId((prev) => (prev === current ? prev : current));

      // 2. Check if current vertical midpoint intersects a dark/image surface
      const darkEls = document.querySelectorAll(
        '[data-surface="dark"], [data-theme="dark"]'
      );
      let overDark = false;
      const indicatorX = window.innerWidth - 32;

      for (let i = 0; i < darkEls.length; i++) {
        const rect = darkEls[i].getBoundingClientRect();
        if (rect.top <= middleY && rect.bottom >= middleY) {
          if (rect.left <= indicatorX && rect.right >= 0) {
            overDark = true;
            break;
          }
        }
      }
      setIsDark((prev) => (prev === overDark ? prev : overDark));
    };

    const onScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Also register with Lenis if available
    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      const l = getLenis();
      if (l) l.off("scroll", onScroll);
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
      <ol className="flex flex-col items-end gap-2.5">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeId;
          return (
            <li key={chapter.id} className="pointer-events-auto">
              <button
                type="button"
                onClick={() => goTo(chapter)}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex items-center justify-end py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
              >
                {/* Floating label to the left of the vertical track */}
                <span
                  className={[
                    "pointer-events-none absolute right-7 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                    isDark
                      ? isActive
                        ? "text-[#F7F5EF] opacity-100 translate-x-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
                        : "text-[#F7F5EF]/75 opacity-0 translate-x-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                      : isActive
                        ? "text-[#243526] opacity-100 translate-x-0"
                        : "text-[#77766C] opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                  ].join(" ")}
                >
                  {chapter.label}
                </span>

                {/* Fixed-width dot track ensuring 100% vertical center alignment */}
                <span className="relative flex size-5 items-center justify-center">
                  {/* Subtle active halo */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute inset-0 rounded-full transition-transform duration-300 scale-125",
                        isDark ? "bg-[#F7F5EF]/20" : "bg-[#243526]/12",
                      ].join(" ")}
                    />
                  )}
                  {/* Core dot */}
                  <span
                    aria-hidden="true"
                    className={[
                      "block rounded-full transition-all duration-300",
                      isActive
                        ? isDark
                          ? "size-2.5 bg-[#F7F5EF] shadow-[0_0_12px_rgba(247,245,239,0.75)]"
                          : "size-2.5 bg-[#243526] shadow-[0_0_8px_rgba(36,53,38,0.35)]"
                        : isDark
                          ? "size-2 bg-[#F7F5EF]/45 shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:bg-[#F7F5EF]/90 group-hover:scale-110"
                          : "size-2 bg-[#243526]/30 group-hover:bg-[#243526]/65 group-hover:scale-110",
                    ].join(" ")}
                  />
                </span>
                <span className="sr-only">Go to {chapter.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
