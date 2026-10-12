"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { ingredients } from "@/lib/osmekos-data";

/**
 * Interactive Ingredient Atlas (homepage).
 *
 * Replaces the earlier static 4-card grid with an editorial explorer: a large
 * image stage crossfades to the selected ingredient while the copy updates,
 * and each entry deep-links to its detailed section on /ingredients.
 *
 * - Single source of truth: `ingredients` from lib/osmekos-data.ts.
 * - Crossfade is a Motion micro-interaction (Motion's domain); the heading
 *   entrance stays on GSAP (RevealHeading/Reveal) — different elements, so the
 *   two systems never animate the same property.
 * - Selector is a keyboard-operable button group (no hover dependency); under
 *   reduced motion the swap is instant and all content stays visible.
 */
export function Ingredients() {
  const [activeId, setActiveId] = useState(ingredients[0].id);
  const reduceMotion = useReducedMotion();
  const active = ingredients.find((i) => i.id === activeId) ?? ingredients[0];

  const fade = reduceMotion
    ? { initial: false as const, animate: {}, exit: {}, transition: { duration: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4, ease: "easeOut" as const },
      };

  const copyFade = reduceMotion
    ? { initial: false as const, animate: {}, exit: {}, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3, ease: "easeOut" as const },
      };

  return (
    <section
      id="ingredients"
      className="relative z-0 bg-background px-6 py-24 scroll-mt-20 md:px-12 lg:px-24 lg:py-40 lg:scroll-mt-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-xl flex-col items-start gap-4">
            <Reveal>
              <span className="type-eyebrow text-xs text-accent">
                Powered by Nature &amp; Science
              </span>
            </Reveal>
            <div className="flex flex-col">
              <RevealHeading
                as="h2"
                className="font-heading text-4xl leading-[1.15] text-foreground md:text-5xl"
                text="Thoughtful Ingredients."
                delay={0.05}
              />
              <RevealHeading
                as="h2"
                className="font-heading text-4xl leading-[1.15] text-foreground md:text-5xl"
                text="Explore the Formula."
                delay={0.12}
              />
            </div>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/ingredients"
              className="group flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
            >
              View All Ingredients
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Atlas */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Image stage */}
          <div className="relative order-2 aspect-[5/4] w-full overflow-hidden rounded-[2rem] border border-border/40 bg-muted shadow-sm sm:aspect-[16/11] lg:order-1 lg:aspect-[4/5]">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={fade.initial}
                animate={fade.animate}
                exit={fade.exit}
                transition={fade.transition}
              >
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
            {/* Active percentage badge */}
            <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/40 bg-[#17231d]/35 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-sm font-semibold text-[#F7F5EF]">
                {active.percentage}
              </span>
            </div>
          </div>

          {/* Selector + copy */}
          <div className="order-1 flex flex-col gap-7 lg:order-2 lg:justify-center">
            {/* Selector: horizontal rail on mobile, vertical list on desktop */}
            <div
              role="tablist"
              aria-label="Select an ingredient"
              aria-orientation="horizontal"
              className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
            >
              {ingredients.map((ing) => {
                const isActive = ing.id === activeId;
                return (
                  <button
                    key={ing.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(ing.id)}
                    className={[
                      "group flex shrink-0 items-center justify-between gap-4 rounded-full border px-5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B] lg:rounded-2xl lg:px-6 lg:py-4",
                      isActive
                        ? "border-[#243526]/20 bg-[#DCE3D4]/70 text-[#243526]"
                        : "border-border/60 bg-background text-[#25291F]/70 hover:border-[#243526]/15 hover:bg-[#EAE4D9]/60 hover:text-[#243526]",
                    ].join(" ")}
                  >
                    <span className="font-heading text-base font-semibold lg:text-lg">
                      {ing.name}
                    </span>
                    <span
                      className={[
                        "text-xs font-semibold lg:text-sm",
                        isActive ? "text-accent" : "text-[#77766C]",
                      ].join(" ")}
                    >
                      {ing.percentage}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active details */}
            <div className="relative min-h-[11rem]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={active.id}
                  className="flex flex-col gap-3"
                  initial={copyFade.initial}
                  animate={copyFade.animate}
                  exit={copyFade.exit}
                  transition={copyFade.transition}
                >
                  <span className="type-eyebrow text-[0.625rem] text-[#77766C]">
                    {active.role}
                  </span>
                  <h3 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
                    {active.name}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                    {active.description}
                  </p>
                  <Link
                    href={`/ingredients#${active.id}`}
                    className="group mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#243526] underline decoration-[#B7A06B] decoration-1 underline-offset-4 transition-colors hover:text-[#77766C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                  >
                    View {active.name} details
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Secondary deep link to the ceramide complex */}
            <Link
              href="/ingredients#triple-ceramide-complex"
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#77766C] transition-colors hover:text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
            >
              <span aria-hidden="true" className="text-accent">
                &#9679;
              </span>
              Discover the Triple Ceramide Complex
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
