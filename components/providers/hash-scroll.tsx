"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/animations/lenis-store";
import { prefersReducedMotion } from "@/lib/animations/reveal";

/**
 * Calculates the exact document Y scroll position for an anchor element.
 * Reads the element's computed `scroll-margin-top` so that:
 * - Full-bleed sections with `scroll-mt-0` scroll to elementTop (touch the top of viewport).
 * - Content/card sections with `scroll-mt-20` or `scroll-mt-24` clear the floating header (~80-96px).
 *
 * Passing an explicit number to Lenis bypasses its internal double-counting of
 * scrollMargin + scrollPadding, guaranteeing the target lands at the exact intended pixel.
 */
function getTargetScrollPosition(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const currentScroll = window.scrollY;
  const elementTop = rect.top + currentScroll;

  const computedStyle = window.getComputedStyle(el);
  const scrollMarginTop = parseFloat(computedStyle.scrollMarginTop);

  // If the element defines scroll-margin-top (including 0), respect it.
  // Otherwise fallback to 80px (the bottom of the floating navbar).
  const margin = !isNaN(scrollMarginTop) ? scrollMarginTop : 80;

  return Math.max(0, Math.round(elementTop - margin));
}

/**
 * Drives hash deep links reliably and smoothly across all scenarios:
 * 1. Same-route clicks (mega-menu items / in-page buttons): intercepted and animated smoothly.
 * 2. Cross-route transitions: resets stale scroll state from previous route, waits for layout stability,
 *    and smoothly glides to the target section.
 * 3. Direct URL visits / refresh / back-forward navigation.
 * 4. Ensures sections touch the top and properly cover the page frame rather than landing halfway down.
 */
export function HashScrollHandler() {
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const cancelPending = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const executeScroll = (el: HTMLElement, target: number) => {
      isScrollingRef.current = true;
      const lenis = getLenis();

      if (lenis && !prefersReducedMotion()) {
        lenis.scrollTo(target, {
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            isScrollingRef.current = false;
            el.setAttribute("tabindex", "-1");
            el.focus({ preventScroll: true });
          },
        });
      } else {
        window.scrollTo({
          top: target,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
        isScrollingRef.current = false;
        el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
    };

    const scrollToHash = (rawHash: string, isInitial = false) => {
      const id = decodeURIComponent(rawHash.replace(/^#/, ""));
      if (!id) return;

      cancelPending();
      let attempts = 0;
      const maxAttempts = 60; // Up to ~1s of rAF
      let lastTarget = -1;
      let stableFrames = 0;

      const attempt = () => {
        const el = document.getElementById(id);
        if (!el) {
          if (attempts++ < maxAttempts) {
            rafRef.current = requestAnimationFrame(attempt);
          } else {
            rafRef.current = null;
          }
          return;
        }

        const target = getTargetScrollPosition(el);

        // For initial/cross-route load, verify layout stability across 2 frames
        // so images/fonts settling above the section don't shift the measurement.
        if (isInitial) {
          if (Math.abs(target - lastTarget) <= 1) {
            stableFrames++;
          } else {
            stableFrames = 0;
          }
          lastTarget = target;

          if (stableFrames >= 2 || attempts >= 15) {
            rafRef.current = null;
            executeScroll(el, target);
            return;
          }

          attempts++;
          rafRef.current = requestAnimationFrame(attempt);
          return;
        }

        // Same-page click: layout is already stable, execute immediately
        rafRef.current = null;
        executeScroll(el, target);
      };

      attempt();
    };

    // When route changes, sync Lenis with the browser scroll position so
    // stale scroll coordinates from the previous route do not corrupt the calculation.
    const lenis = getLenis();
    if (lenis && Math.abs(lenis.scroll - window.scrollY) > 10) {
      lenis.scrollTo(window.scrollY, { immediate: true });
    }

    if (window.location.hash) {
      // Small timeout gives Next.js a clean tick to finish committing the route DOM
      const timer = setTimeout(() => {
        scrollToHash(window.location.hash, true);
      }, 30);

      // Re-align if late fonts or images shift document layout
      const handleLayoutSettle = () => {
        if (!isScrollingRef.current && window.location.hash) {
          const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
          const el = document.getElementById(id);
          if (el) {
            const currentTarget = getTargetScrollPosition(el);
            if (Math.abs(window.scrollY - currentTarget) > 20) {
              const activeLenis = getLenis();
              if (activeLenis && !prefersReducedMotion()) {
                activeLenis.scrollTo(currentTarget, { duration: 0.6 });
              } else {
                window.scrollTo({ top: currentTarget, behavior: "smooth" });
              }
            }
          }
        }
      };

      document.fonts?.ready.then(handleLayoutSettle).catch(() => {});
      window.addEventListener("load", handleLayoutSettle, { once: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener("load", handleLayoutSettle);
        cancelPending();
      };
    } else if (lenis && window.scrollY === 0) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Intercept in-page hash clicks so they glide smoothly via Lenis instead
    // of jumping instantly or triggering browser default hash handling.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!url.hash) return;
      if (url.pathname !== window.location.pathname) return;

      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      event.preventDefault();
      if (window.location.hash !== url.hash) {
        window.history.pushState(null, "", url.hash);
      }
      scrollToHash(url.hash, false);
    };

    const onPopState = () => {
      if (window.location.hash) scrollToHash(window.location.hash, false);
    };

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
      cancelPending();
    };
  }, [pathname]);

  return null;
}
