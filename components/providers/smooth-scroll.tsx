"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { setLenis } from "@/lib/animations/lenis-store";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const refresh = () => ScrollTrigger.refresh();

    // Re-measure ScrollTriggers once fonts and the window load settle the
    // layout, so reveal triggers are never computed against a shifting page.
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    // Re-measure when dynamic images or content expand the page height.
    let resizeTimer: NodeJS.Timeout | null = null;
    const debouncedRefresh = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    };

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      observer = new ResizeObserver(debouncedRefresh);
      observer.observe(document.body);
    }

    if (reduce) {
      // No smooth scroll under reduced motion — native scrolling only.
      return () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        observer?.disconnect();
        window.removeEventListener("load", refresh);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Expose this single instance so deep-link hash scrolling reuses it.
    setLenis(lenis);

    // Single source of scroll truth: Lenis drives ScrollTrigger updates and
    // GSAP's ticker drives Lenis, so there is one rAF loop, not two.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      observer?.disconnect();
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenis(null);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <>{children}</>;
}
