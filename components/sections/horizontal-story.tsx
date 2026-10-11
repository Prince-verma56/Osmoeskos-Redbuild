"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reveal";
import { ingredients } from "@/lib/osmekos-data";

/**
 * Signature Experience A — Horizontal Product Storytelling.
 *
 * Each panel is a full-screen scene (100vw on desktop).
 * On desktop (>=1024px), the section pins cleanly at the top of the viewport
 * and translates horizontally through all 4 scenes as the user scrolls vertically.
 *
 * Micro-animations are synchronized to the master scrub timeline:
 * - Scene 1: Initial focus, gentle exit dimming.
 * - Scene 2: Header reveals, followed by staggered entrance of ceramides NP, AP, EOP.
 * - Scene 3: Header reveals, followed by staggered rise & scale settle of the 4 botanical cards.
 * - Scene 4: Texture background settles from scale, editorial headline and CTA bloom in.
 *
 * All animations smoothly reverse when scrolling backward.
 * On mobile (<1024px) and under reduced motion, content stacks vertically and stays fully visible.
 */

const ceramideCodes = ["NP", "AP", "EOP"] as const;

export function HorizontalStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const panelCount = 4;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const reduce = prefersReducedMotion();

        const getDistance = () => {
          const panels = Array.from(
            track.querySelectorAll<HTMLElement>(".hs-panel"),
          );
          if (panels.length === 0) {
            return Math.max(0, track.scrollWidth - window.innerWidth);
          }
          const totalPanelsWidth = panels.reduce(
            (sum, p) => sum + p.offsetWidth,
            0,
          );
          // Guaranteed distance: at least (panelCount - 1) viewport widths
          return Math.max(
            window.innerWidth * (panelCount - 1),
            totalPanelsWidth - window.innerWidth,
          );
        };

        const distance = getDistance();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + getDistance(),
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) {
                barRef.current.style.width = `${Math.max(4, self.progress * 100)}%`;
              }
              if (counterRef.current) {
                const idx = Math.min(
                  panelCount - 1,
                  Math.round(self.progress * (panelCount - 1)),
                );
                counterRef.current.textContent = String(idx + 1).padStart(
                  2,
                  "0",
                );
              }
            },
          },
        });

        // 1. Linear horizontal ribbon translation
        tl.to(
          track,
          {
            x: () => -getDistance(),
            ease: "none",
            duration: 3,
          },
          0,
        );

        // 2. Coordinated phase-by-phase scene reveals (skipped under reduced motion)
        if (!reduce) {
          // Scene 1: soft exit fade
          tl.to(
            ".p1-content",
            { autoAlpha: 0.35, y: -20, duration: 0.45, ease: "power2.inOut" },
            0.55,
          );

          // Scene 2: Header reveals, then ceramides stagger in one by one
          tl.fromTo(
            ".p2-header",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.62,
          );
          tl.fromTo(
            ".p2-ceramide-row",
            { autoAlpha: 0, y: 45, x: 24 },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              duration: 0.36,
              stagger: 0.12,
              ease: "power2.out",
            },
            0.72,
          );

          // Scene 2: soft exit fade
          tl.to(
            [".p2-header", ".p2-ceramide-row"],
            { autoAlpha: 0.3, y: -20, duration: 0.45, ease: "power2.inOut" },
            1.55,
          );

          // Scene 3: Header reveals, then 4 ingredient cards stagger & lift in
          tl.fromTo(
            ".p3-header",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            1.62,
          );
          tl.fromTo(
            ".p3-ingredient-card",
            { autoAlpha: 0, y: 55, scale: 0.9 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.38,
              stagger: 0.1,
              ease: "power2.out",
            },
            1.72,
          );

          // Scene 3: soft exit fade
          tl.to(
            [".p3-header", ".p3-ingredient-card"],
            { autoAlpha: 0.3, y: -20, duration: 0.45, ease: "power2.inOut" },
            2.52,
          );

          // Scene 4: Cream texture settles from slight scale, content blooms in
          tl.fromTo(
            ".p4-bg",
            { scale: 1.14 },
            { scale: 1.0, duration: 0.65, ease: "power2.out" },
            2.42,
          );
          tl.fromTo(
            ".p4-content",
            { autoAlpha: 0, y: 45 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
            2.52,
          );
        }

        return () => {
          tl.kill();
          gsap.set(
            [
              track,
              ".p1-content",
              ".p2-header",
              ".p2-ceramide-row",
              ".p3-header",
              ".p3-ingredient-card",
              ".p4-bg",
              ".p4-content",
            ],
            { clearProps: "all" },
          );
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-heading"
      className="relative z-20 w-full overflow-hidden bg-[#EAE4D9] lg:h-screen"
    >
      {/* Accessible section title */}
      <h2 id="story-heading" className="sr-only">
        The OsmeKos Body Lotion story
      </h2>

      {/* Progress indicator — desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden items-center gap-4 px-8 pt-8 lg:flex xl:px-16"
      >
        <span
          ref={counterRef}
          className="type-eyebrow text-[0.625rem] text-[#243526]/60"
        >
          01
        </span>
        <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-[#243526]/12">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 rounded-full bg-[#243526]/70 transition-none"
            style={{ width: "4%" }}
          />
        </div>
        <span className="type-eyebrow text-[0.625rem] text-[#243526]/40">
          {String(panelCount).padStart(2, "0")}
        </span>
      </div>

      {/* Panel track — stacked vertically on mobile, full-screen horizontal ribbon on desktop */}
      <div
        ref={trackRef}
        className="flex w-full flex-col lg:h-screen lg:w-max lg:flex-row lg:flex-nowrap"
      >
        {/* Panel 01 — Daily Body Care */}
        <article className="hs-panel flex w-full shrink-0 flex-col justify-center gap-10 px-6 py-20 sm:px-10 lg:h-screen lg:w-screen lg:flex-row lg:items-center lg:gap-20 lg:py-0 lg:px-24 xl:px-32">
          <div className="p1-content flex max-w-lg flex-col items-start gap-6 lg:order-1 will-change-transform">
            <span className="type-eyebrow text-[0.6875rem] text-accent">
              01 — Daily Ritual
            </span>
            <h3 className="font-heading text-4xl leading-[1.05] text-[#25291F] md:text-5xl lg:text-6xl">
              Care begins with the everyday.
            </h3>
            <p className="max-w-md text-base leading-relaxed text-[#77766C] md:text-lg">
              A lightweight, nourishing body lotion made to fold into your daily
              routine — soft, comfortable, and quietly restorative.
            </p>
            <Link
              href="/product/body-lotion"
              className="btn-premium btn-premium--primary mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              View the product{" "}
              <span aria-hidden="true" className="btn-premium__arrow">
                &rarr;
              </span>
            </Link>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-background shadow-xl lg:order-2 lg:max-w-md xl:max-w-lg">
            <Image
              src="/images/osmekos-product-detail.jpg"
              alt="OsmeKos Body Lotion on a stone plinth"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-center"
            />
          </div>
        </article>

        {/* Panel 02 — Triple Ceramide Complex */}
        <article className="hs-panel flex w-full shrink-0 flex-col justify-center gap-10 bg-[#243526] px-6 py-20 text-[#F7F5EF] sm:px-10 lg:h-screen lg:w-screen lg:flex-row lg:items-center lg:gap-20 lg:px-24 lg:py-0 xl:px-32">
          <div className="p2-header flex max-w-md flex-col gap-5 will-change-transform">
            <span className="type-eyebrow text-[0.6875rem] text-[#B7A06B]">
              02 — The Complex
            </span>
            <h3 className="font-heading text-4xl leading-[1.05] text-[#F9F5EB] md:text-5xl lg:text-6xl">
              Triple Ceramide Complex.
            </h3>
            <p className="max-w-sm text-base leading-relaxed text-[#F7F5EF]/75 md:text-lg">
              Three barrier lipids — NP, AP, and EOP — chosen to support the
              skin&apos;s natural moisture barrier, day after day.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-0 max-w-2xl">
            {ceramideCodes.map((code, i) => (
              <div
                key={code}
                className="p2-ceramide-row flex items-baseline gap-6 border-t border-[#F7F5EF]/15 py-6 first:border-t-0 sm:gap-10 will-change-transform"
              >
                <span className="font-heading text-[2.75rem] leading-none text-[#B7A06B] sm:text-6xl lg:text-7xl">
                  {code}
                </span>
                <span className="text-sm text-[#F7F5EF]/75 sm:text-base">
                  Ceramide {code} — part of the lipid matrix that helps keep the
                  skin&apos;s protective layer supple and intact.
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto hidden font-heading text-sm text-[#F7F5EF]/30 sm:block"
                >
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Panel 03 — Botanical Ingredients */}
        <article className="hs-panel flex w-full shrink-0 flex-col justify-center gap-8 bg-[#DCE3D4] px-6 py-20 sm:px-10 lg:h-screen lg:w-screen lg:justify-center lg:px-24 lg:py-0 xl:px-32">
          <div className="p3-header flex max-w-xl flex-col gap-3 will-change-transform">
            <span className="type-eyebrow text-[0.6875rem] text-[#243526]/70">
              03 — From Nature
            </span>
            <h3 className="font-heading text-4xl leading-[1.05] text-[#243526] md:text-5xl lg:text-6xl">
              Botanical ingredients.
            </h3>
            <p className="max-w-lg text-base leading-relaxed text-[#3c4636] md:text-lg">
              A considered pairing of nourishing botanicals and skin-loving
              actives — each at a confirmed concentration.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8 max-w-5xl">
            {ingredients.map((ing) => (
              <li
                key={ing.id}
                className="p3-ingredient-card flex flex-col gap-3 will-change-transform"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-background shadow-sm">
                  <Image
                    src={ing.image}
                    alt={ing.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 18rem"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-base font-semibold text-[#243526]">
                    {ing.name}
                  </span>
                  <span className="text-xs text-[#3c4636]/70">
                    {ing.role} · {ing.percentage}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>

        {/* Panel 04 — Texture & Experience */}
        <article className="hs-panel relative flex w-full shrink-0 flex-col justify-end overflow-hidden px-6 py-20 sm:px-10 lg:h-screen lg:w-screen lg:justify-center lg:px-24 lg:py-0 xl:px-32">
          <div className="p4-bg absolute inset-0 -z-10 will-change-transform">
            <Image
              src="/images/Luminous Lotion on Dewy Skin.png"
              alt="A swathe of OsmeKos lotion catching the light on skin"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#1b2a1f]/85 via-[#1b2a1f]/35 to-transparent lg:bg-gradient-to-r lg:from-[#1b2a1f]/85 lg:via-[#1b2a1f]/30 lg:to-transparent"
            />
          </div>
          <div className="p4-content flex max-w-lg flex-col items-start gap-6 text-[#F7F5EF] will-change-transform">
            <span className="type-eyebrow text-[0.6875rem] text-[#E9DFBF]">
              04 — Texture & Feel
            </span>
            <h3 className="font-heading text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
              A finish that feels like care.
            </h3>
            <p className="max-w-md text-base leading-relaxed text-[#F7F5EF]/85 md:text-lg">
              A creamy, non-greasy texture that absorbs quickly and leaves skin
              soft, supple, and comfortable.
            </p>
            <Link
              href="/ingredients"
              className="btn-premium btn-premium--light mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Explore the formula{" "}
              <span aria-hidden="true" className="btn-premium__arrow">
                &rarr;
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
