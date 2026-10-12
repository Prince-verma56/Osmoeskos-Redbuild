"use client";

import { Fragment, useRef, type ElementType, type Ref } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reveal";

type RevealHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
};

/**
 * Signature heading reveal: each word rises out of its own clipping mask in a
 * quick stagger — an editorial, "award-site" entrance. The whole heading is
 * exposed to assistive tech via aria-label; the per-word spans are hidden.
 * Reduced motion leaves every word in place (fully visible). The initial
 * masked state is set in a layout effect (before paint) so nothing flashes.
 */
export function RevealHeading({
  text,
  as = "h2",
  id,
  className,
  delay = 0,
  stagger = 0.075,
  start = "top 90%",
}: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag: ElementType = as;
  const words = text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const parts = el.querySelectorAll<HTMLElement>("[data-rh-word]");
      if (!parts.length) return;

      // The masked (clipped) start state is applied here in the useGSAP layout
      // effect before paint, so words never flash in place first — they stay
      // masked, then rise in once the heading's ScrollTrigger enters.
      gsap.from(parts, {
        yPercent: 120,
        duration: 0.9,
        ease: "power4.out",
        stagger,
        delay,
        clearProps: "all",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as Ref<HTMLHeadingElement>} id={id} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {/* pb / negative mb pair extends the clip box for descenders
              without adding layout height. */}
          <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom" aria-hidden="true">
            <span data-rh-word className="inline-block will-change-transform">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
