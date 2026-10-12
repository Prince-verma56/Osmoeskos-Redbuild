"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reveal";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Rise distance in px. */
  y?: number;
  delay?: number;
  duration?: number;
  /** When > 0, the wrapper's direct children animate in sequence. */
  stagger?: number;
  start?: string;
  /**
   * Media reveal: the wrapper fades/rises while an inner <img> settles from a
   * gentle over-scale — a soft "focus-in" that reads more crafted than a
   * plain fade. Use on image containers (which clip via overflow-hidden).
   */
  media?: boolean;
};

/**
 * Scroll-reveal wrapper used across the route pages. A client island that
 * wraps server-rendered content — the markup stays on the server, only the
 * entrance is animated here. Plays once, honours reduced motion (content
 * stays fully visible), and runs through the shared GSAP/ScrollTrigger +
 * Lenis pipeline (no second rAF loop). Initial hidden state is applied in a
 * layout effect (useGSAP) before paint, so there is no flash.
 */
export function Reveal({
  children,
  className,
  y = 30,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  start = "top 85%",
  media = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;

      // Classic scroll-reveal: the hidden start state is applied here in the
      // useGSAP layout effect (before the browser paints), so content never
      // flashes visible first — it is hidden, then animates in once its
      // ScrollTrigger enters. `once:true` + the provider's post-load/fonts
      // ScrollTrigger.refresh() ensure above-the-fold content reveals on load
      // and nothing is left stuck invisible.
      if (media) {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
        tl.from(el, { autoAlpha: 0, y, duration, ease: "power3.out", clearProps: "transform" }, 0);
        if (img) {
          tl.from(img, { scale: 1.18, duration: duration + 0.5, ease: "power3.out", clearProps: "transform" }, 0);
        }
        return;
      }

      const targets = stagger > 0 ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
