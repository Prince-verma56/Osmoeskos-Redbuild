"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reveal";
import { getLenis } from "@/lib/animations/lenis-store";
import { ingredients } from "@/lib/osmekos-data";
import { CinematicOverlay } from "@/components/visual/cinematic-overlay";

/**
 * Signature Experience A — Cinematic Horizontal Product Storytelling.
 *
 * Desktop (>=1024px, no reduced motion): the section pins and a full-screen
 * flex-row track translates horizontally as the user scrolls vertically, on top
 * of the proven Phase-19 pinning/distance math. Each scene's content settles in
 * once (header → details) and STAYS fully visible as it crosses the viewport —
 * no dimming — with a gentle media ken-burns and a restrained static film grade.
 *
 * Orientation is a single legible floating indicator pill at the bottom (clear
 * of the fixed navbar): its chapter tabs are clickable and scrub the pinned
 * timeline to that scene, and its progress line follows the scroll.
 *
 * Mobile (<1024px) / reduced motion: the same panels render as a normal vertical
 * stack — no pin, no trap, all copy visible without JS. The grain overlay and
 * indicator are desktop-only so mobile stays clean.
 */

const ceramideCodes = ["NP", "AP", "EOP"] as const;
const chapterLabels = [
  "Daily Ritual",
  "The Complex",
  "Botanicals",
  "Texture",
] as const;

export function HorizontalStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const chapterBtnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const panelCount = 4;

  const goToScene = (index: number) => {
    const reduce = prefersReducedMotion();
    const st = stRef.current;
    const lenis = getLenis();

    if (st) {
      // Pinned: translate scene index → an exact document scroll target so the
      // scrubbed timeline lands that scene centered in the viewport.
      const p = panelCount > 1 ? index / (panelCount - 1) : 0;
      const target = Math.round(st.start + p * (st.end - st.start));
      if (lenis && !reduce) lenis.scrollTo(target, { duration: 1.1 });
      else window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    // Not pinned (mobile / reduced motion): scroll the panel into view.
    const panels = trackRef.current?.querySelectorAll<HTMLElement>(".hs-panel");
    panels?.[index]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

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
          // Guaranteed distance: at least (panelCount - 1) viewport widths.
          return Math.max(
            window.innerWidth * (panelCount - 1),
            totalPanelsWidth - window.innerWidth,
          );
        };

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
              const idx = Math.min(
                panelCount - 1,
                Math.round(self.progress * (panelCount - 1)),
              );
              chapterBtnRefs.current.forEach((btn, bi) => {
                if (!btn) return;
                const on = bi === idx;
                btn.dataset.active = on ? "true" : "false";
                btn.setAttribute("aria-current", on ? "true" : "false");
              });
            },
          },
        });

        stRef.current = tl.scrollTrigger ?? null;

        // 1. Linear horizontal ribbon translation
        tl.to(track, { x: () => -getDistance(), ease: "none", duration: 3 }, 0);

        // 2. Per-scene reveals + media ken-burns (skipped under reduced motion).
        //    Content settles in once and stays fully visible — no exit dimming.
        if (!reduce) {
          // Scene 1: product still settles from a slight over-scale.
          tl.fromTo(
            ".p1-media img",
            { scale: 1.12 },
            { scale: 1, duration: 1.2, ease: "power2.out" },
            0,
          );

          // Scene 2: header rises, then the three ceramides stagger in.
          tl.fromTo(
            ".p2-header",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
            0.55,
          );
          tl.fromTo(
            ".p2-ceramide-row",
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
            0.68,
          );

          // Scene 3: header rises, then the four botanical cards lift + settle.
          tl.fromTo(
            ".p3-header",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
            1.55,
          );
          tl.fromTo(
            ".p3-ingredient-card",
            { autoAlpha: 0, y: 48, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, stagger: 0.1, ease: "power2.out" },
            1.66,
          );
          tl.fromTo(
            ".p3-ingredient-card img",
            { scale: 1.14 },
            { scale: 1, duration: 0.9, stagger: 0.06, ease: "power2.out" },
            1.66,
          );

          // Scene 4: cream texture settles from scale, content blooms in.
          tl.fromTo(
            ".p4-bg",
            { scale: 1.16 },
            { scale: 1.0, duration: 0.9, ease: "power2.out" },
            2.4,
          );
          tl.fromTo(
            ".p4-content",
            { autoAlpha: 0, y: 44 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            2.55,
          );
        }

        return () => {
          tl.kill();
          stRef.current = null;
          gsap.set(
            [
              track,
              ".p1-media img",
              ".p2-header",
              ".p2-ceramide-row",
              ".p3-header",
              ".p3-ingredient-card",
              ".p3-ingredient-card img",
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
      <h2 id="story-heading" className="sr-only">
        The OsmeKos Body Lotion story
      </h2>

      {/* Panel track — stacked vertically on mobile, full-screen horizontal ribbon on desktop */}
      <div
        ref={trackRef}
        className="flex w-full flex-col lg:h-screen lg:w-max lg:flex-row lg:flex-nowrap"
      >
        {/* Panel 01 — Daily Body Care */}
        <article className="hs-panel relative flex w-full shrink-0 flex-col justify-center gap-10 overflow-hidden px-6 py-20 sm:px-10 lg:h-screen lg:w-screen lg:flex-row lg:items-center lg:gap-20 lg:py-0 lg:px-24 xl:px-32">
          <div className="p1-content relative z-10 flex max-w-lg flex-col items-start gap-6 lg:order-1">
            <span className="type-eyebrow text-[0.6875rem] text-accent">
              Daily Ritual
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
          <div className="p1-media relative z-10 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-background shadow-xl lg:order-2 lg:max-w-md xl:max-w-lg">
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
        <article
          data-surface="dark"
          data-theme="dark"
          className="hs-panel relative flex w-full shrink-0 flex-col justify-center gap-10 overflow-hidden bg-[#243526] px-6 py-20 text-[#F7F5EF] sm:px-10 lg:h-screen lg:w-screen lg:flex-row lg:items-center lg:gap-20 lg:px-24 lg:py-0 xl:px-32"
        >
          <div className="p2-header relative z-10 flex max-w-md flex-col gap-5">
            <span className="type-eyebrow text-[0.6875rem] text-[#B7A06B]">
              The Complex
            </span>
            <h3 className="font-heading text-4xl leading-[1.05] text-[#F9F5EB] md:text-5xl lg:text-6xl">
              Triple Ceramide Complex.
            </h3>
            <p className="max-w-sm text-base leading-relaxed text-[#F7F5EF]/75 md:text-lg">
              Three barrier lipids — NP, AP, and EOP — chosen to support the
              skin&apos;s natural moisture barrier, day after day.
            </p>
          </div>
          <div className="relative z-10 flex max-w-2xl flex-1 flex-col gap-0">
            {ceramideCodes.map((code, i) => (
              <div
                key={code}
                className="p2-ceramide-row flex items-baseline gap-6 border-t border-[#F7F5EF]/15 py-6 first:border-t-0 sm:gap-10"
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
        <article className="hs-panel relative flex w-full shrink-0 flex-col justify-center gap-8 overflow-hidden bg-[#DCE3D4] px-6 py-20 sm:px-10 lg:h-screen lg:w-screen lg:justify-center lg:px-24 lg:py-0 xl:px-32">
          <div className="p3-header relative z-10 flex max-w-xl flex-col gap-3">
            <span className="type-eyebrow text-[0.6875rem] text-[#243526]/70">
              From Nature
            </span>
            <h3 className="font-heading text-4xl leading-[1.05] text-[#243526] md:text-5xl lg:text-6xl">
              Botanical ingredients.
            </h3>
            <p className="max-w-lg text-base leading-relaxed text-[#3c4636] md:text-lg">
              A considered pairing of nourishing botanicals and skin-loving
              actives — each at a confirmed concentration.
            </p>
          </div>
          <ul className="relative z-10 grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
            {ingredients.map((ing) => (
              <li
                key={ing.id}
                className="p3-ingredient-card flex flex-col gap-3"
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
        <article
          data-surface="dark"
          data-theme="dark"
          className="hs-panel relative flex w-full shrink-0 flex-col justify-end overflow-hidden px-6 py-20 sm:px-10 lg:h-screen lg:w-screen lg:justify-center lg:px-24 lg:py-0 xl:px-32"
        >
          <div className="p4-bg absolute inset-0 -z-10">
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
          <div className="p4-content relative z-10 flex max-w-lg flex-col items-start gap-6 text-[#F7F5EF]">
            <span className="type-eyebrow text-[0.6875rem] text-[#E9DFBF]">
              Texture &amp; Feel
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

      {/* Restrained static film grain — desktop only (no animated vignette). */}
      <div className="pointer-events-none absolute inset-0 z-[25] hidden lg:block">
        <CinematicOverlay grain vignette={false} grainOpacity={0.05} />
      </div>

      {/* Chapter indicator — one legible floating pill, clear of the navbar.
          Tabs are clickable (scrub to a scene); the line follows scroll. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 hidden justify-center px-4 lg:flex">
        <div className="pointer-events-auto flex flex-col gap-2.5 rounded-[1.25rem] border border-[#243526]/10 bg-[#F7F5EF]/88 px-3 py-2.5 shadow-[0_0.6rem_2rem_rgba(36,53,38,0.16)] backdrop-blur-md">
          <nav aria-label="Story chapters">
            <ol className="flex items-center gap-1">
              {chapterLabels.map((label, i) => (
                <li key={label}>
                  <button
                    type="button"
                    ref={(el) => {
                      chapterBtnRefs.current[i] = el;
                    }}
                    data-active={i === 0 ? "true" : "false"}
                    aria-current={i === 0 ? "true" : undefined}
                    onClick={() => goToScene(i)}
                    className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#77766C] transition-colors duration-300 hover:text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B] data-[active=true]:bg-[#243526] data-[active=true]:text-[#F7F5EF]"
                  >
                    <span className="tabular-nums opacity-60">0{i + 1}</span>
                    {label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className="relative mx-2 h-[2px] overflow-hidden rounded-full bg-[#243526]/12">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 rounded-full bg-[#243526]/70"
              style={{ width: "4%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
