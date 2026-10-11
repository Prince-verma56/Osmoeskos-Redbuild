import { gsap } from "@/lib/animations/gsap";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type RevealOptions = {
  trigger: Element | null;
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  delay?: number;
};

// Fade + rise entrance tied to scroll. Plays once, then kills its own
// ScrollTrigger. `once` + the provider's post-load ScrollTrigger.refresh()
// guarantee content is never left stuck at opacity 0 if positions are
// measured before fonts/images settle.
export function reveal(targets: gsap.TweenTarget, options: RevealOptions) {
  const {
    trigger,
    y = 28,
    x = 0,
    duration = 0.8,
    stagger = 0,
    start = "top 82%",
    delay = 0,
  } = options;

  return gsap.from(targets, {
    y,
    x,
    autoAlpha: 0,
    duration,
    stagger,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger ?? undefined,
      start,
      once: true,
    },
  });
}
