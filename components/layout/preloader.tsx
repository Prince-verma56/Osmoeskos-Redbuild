"use client";

import { useEffect, useRef } from "react";
import { Leaf } from "lucide-react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
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

      timeline
        // Emblem settles in first.
        .fromTo(
          emblemRef.current,
          { autoAlpha: 0, scale: 0.86, y: 6 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0,
        )
        // Wordmark rises out of its mask — an editorial reveal.
        .fromTo(
          wordRef.current,
          { yPercent: 115 },
          { yPercent: 0, duration: 0.75, ease: "power4.out" },
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
        className="pointer-events-none absolute inset-x-6 top-8 flex items-center justify-between text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-[#77766C] sm:inset-x-10"
        aria-hidden="true"
      >
        <span>OsmeKos</span>
        <span className="text-[#B7A06B]">Body Care</span>
      </div>

      {/* Center composition */}
      <div ref={centerRef} className="flex flex-col items-center px-6 text-center" aria-hidden="true">
        <span
          ref={emblemRef}
          className="mb-8 grid size-[4.5rem] place-items-center rounded-full border border-[#243526]/15 bg-white/60 shadow-[0_0.75rem_2.5rem_rgba(36,53,38,0.08)]"
        >
          <span className="grid size-12 place-items-center rounded-full border border-[#B7A06B]/50">
            <Leaf className="size-5 text-[#243526]" strokeWidth={1.4} />
          </span>
        </span>

        <span className="block overflow-hidden pb-[0.12em]">
          <span
            ref={wordRef}
            className="block font-heading text-6xl font-medium leading-[0.95] tracking-[0.02em] sm:text-7xl"
          >
            OsmeKos
          </span>
        </span>

        <span
          ref={taglineRef}
          className="mt-4 block text-[0.625rem] font-medium uppercase tracking-[0.3em] text-[#77766C]"
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
