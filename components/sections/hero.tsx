"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reveal";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { Reveal } from "@/components/animations/reveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const bgImg = bgImgRef.current?.querySelector("img");
      if (bgImg) {
        gsap.from(bgImg, {
          scale: 1.12,
          duration: 1.8,
          ease: "power3.out",
          clearProps: "transform",
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-40 flex min-h-[100svh] w-full items-center overflow-hidden rounded-b-[2rem] bg-background sm:rounded-b-[3rem] lg:rounded-b-[8rem]"
    >
      {/* Background Image with initial subtle settle */}
      <div ref={bgImgRef} className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/Hero.png"
          alt="OsmeKos Body Lotion surrounded by botanical ingredients"
          fill
          className="object-cover object-[68%_center] sm:object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-24 md:px-12 lg:px-24">
        <div className="flex max-w-xl flex-col items-start gap-5 rounded-[1.75rem] border border-white/45 bg-[#F7F5EF]/65 p-5 shadow-[0_1rem_3rem_rgba(36,53,38,0.1)] backdrop-blur-md sm:gap-6 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
          <Reveal delay={0.08} start="top bottom">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/80 sm:text-xs sm:tracking-[0.2em] block">
              Skincare That Feels Like Care
            </span>
          </Reveal>
          <RevealHeading
            as="h1"
            className="max-w-[12ch] font-heading text-[clamp(2.65rem,10vw,3.75rem)] leading-[1.03] text-primary md:text-6xl lg:text-7xl"
            text="Deep Hydration, Every Day."
            delay={0.16}
            start="top bottom"
          />
          <Reveal delay={0.32} start="top bottom">
            <p className="max-w-md text-base leading-relaxed text-primary/90 sm:text-lg">
              A lightweight, nourishing body lotion with a triple ceramide complex designed to leave your skin feeling soft, comfortable, and cared for.
            </p>
          </Reveal>
          <Reveal delay={0.44} start="top bottom">
            <div className="mt-3 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link href="/shop" className="btn-premium btn-premium--primary inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                Shop Now <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
              </Link>
              <Link
                href="/ingredients"
                className="btn-premium btn-premium--outline inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium backdrop-blur-sm sm:w-auto sm:py-4 sm:text-base"
              >
                Explore Ingredients
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
