"use client";

import { useEffect, useRef } from "react";
import { Leaf } from "lucide-react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

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
        .fromTo(
          logoRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
          0,
        )
        .fromTo(
          statusRef.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
          0.2,
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.round(counter.value),
                ).padStart(3, "0");
              }
            },
          },
          0,
        )
        .to(
          barRef.current,
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          0,
        )
        .to(
          container,
          { yPercent: -100, duration: 0.7, ease: "power3.inOut" },
          "+=0.18",
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
      <div className="flex flex-col items-center px-6 text-center" aria-hidden="true">
        <div
          ref={logoRef}
          className="flex flex-col items-center"
        >
          <span className="mb-7 grid size-[4.5rem] place-items-center rounded-full border border-[#243526]/15 bg-white/50 shadow-[0_0.75rem_2.5rem_rgba(36,53,38,0.08)]">
            <span className="grid size-12 place-items-center rounded-full border border-[#B7A06B]/50">
              <Leaf className="size-5 text-[#243526]" strokeWidth={1.4} />
            </span>
          </span>
          <span className="font-heading text-5xl font-medium tracking-[0.035em] sm:text-6xl">
            OsmeKos
          </span>
          <span className="mt-3 text-[0.625rem] font-medium uppercase tracking-[0.28em] text-[#77766C]">
            Thoughtful body care
          </span>
        </div>
      </div>

      <div
        ref={statusRef}
        className="absolute inset-x-6 bottom-9 mx-auto flex w-auto max-w-[28rem] flex-col gap-3 sm:inset-x-10 sm:bottom-12"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between gap-4 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#77766C]">
          <span>Preparing your ritual</span>
          <span ref={countRef} className="tabular-nums text-[#243526]">
            000
          </span>
        </div>
        <div className="h-px w-full overflow-hidden bg-[#243526]/12">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-[#C0392B]"
          />
        </div>
      </div>
    </div>
  );
}
