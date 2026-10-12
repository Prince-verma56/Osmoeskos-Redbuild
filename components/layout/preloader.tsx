"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Logo } from "@/components/brand/logo";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const context = gsap.context(() => {
      const counter = { value: 0 };
      const timeline = gsap.timeline({ onComplete });
      // The two parts of the official lockup animate in place, so the
      // settled composition is exactly the supplied logo.
      const mark = logoRef.current?.querySelector('[data-logo-part="mark"]');
      const wordmark = logoRef.current?.querySelector('[data-logo-part="wordmark"]');

      timeline
        // Monogram settles in first.
        .fromTo(
          mark ?? [],
          { autoAlpha: 0, scale: 0.86, y: 6, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0,
        )
        // Wordmark rises into place beneath it.
        .fromTo(
          wordmark ?? [],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.75, ease: "power4.out" },
          0.12,
        )
        .fromTo(
          taglineRef.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.42,
        )
        .fromTo(
          frameRef.current ? Array.from(frameRef.current.children) : [],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          0.25,
        )
        .fromTo(
          statusRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
          0.3,
        )
        // Counter + bar advance together.
        .to(
          counter,
          {
            value: 100,
            duration: 1.65,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.round(counter.value),
                ).padStart(3, "0");
              }
            },
          },
          0.15,
        )
        .to(
          barRef.current,
          { scaleX: 1, duration: 1.65, ease: "power2.inOut" },
          0.15,
        )
        // Content eases away, then the whole curtain slides up to reveal the
        // hero behind it.
        .to(
          [centerRef.current, statusRef.current, frameRef.current],
          { autoAlpha: 0, y: -18, duration: 0.45, ease: "power2.in" },
          "+=0.2",
        )
        .to(
          container,
          { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
          "-=0.15",
        );
    }, container);

    return () => context.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Loading OsmeKos"
      className="pointer-events-auto fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F7F5EF] text-[#243526]"
    >
      {/* Editorial corner framing */}
      <div
        ref={frameRef}
        className="pointer-events-none absolute inset-x-6 top-8 flex items-center justify-end text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-[#77766C] sm:inset-x-10"
        aria-hidden="true"
      >
        <span className="text-[#B7A06B]">Body Care</span>
      </div>

      {/* Center composition */}
      <div ref={centerRef} className="flex flex-col items-center px-6 text-center" aria-hidden="true">
        <span ref={logoRef} className="block">
          <Logo decorative className="h-28 sm:h-36" />
        </span>

        <span
          ref={taglineRef}
          className="mt-6 block text-[0.625rem] font-medium uppercase tracking-[0.3em] text-[#77766C]"
        >
          Thoughtful body care
        </span>
      </div>

      {/* Progress */}
      <div
        ref={statusRef}
        className="absolute inset-x-6 bottom-10 mx-auto flex w-auto max-w-[30rem] flex-col gap-3 sm:inset-x-10 sm:bottom-14"
        aria-hidden="true"
      >
        <div className="flex items-end justify-between gap-4">
          <span className="text-[0.625rem] font-medium uppercase tracking-[0.24em] text-[#77766C]">
            Preparing your ritual
          </span>
          <span
            ref={countRef}
            className="font-heading text-2xl leading-none tabular-nums text-[#243526]"
          >
            000
          </span>
        </div>
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#243526]/12">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 rounded-full bg-[#C0392B]"
          />
        </div>
      </div>
    </div>
  );
}
