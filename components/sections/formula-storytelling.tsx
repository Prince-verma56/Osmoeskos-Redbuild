"use client";

import Image from "next/image";
import Link from "next/link";
import { Droplet, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reveal";

const benefits = [
  { icon: Droplet, title: "Deep & Long-lasting Hydration" },
  { icon: ShieldCheck, title: "Strengthens Skin Barrier" },
  { icon: Sparkles, title: "Improves Skin Texture" },
  { icon: Leaf, title: "Suitable For All Skin Types" },
];

export function FormulaStorytelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .from(leftContentRef.current, {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          rightListRef.current?.children ?? [],
          {
            x: 24,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.45",
        );

      gsap.to(backgroundRef.current, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="formula"
      ref={sectionRef}
      aria-labelledby="formula-heading"
      className="relative isolate flex min-h-[40rem] w-full items-center overflow-hidden bg-[#243526] px-6 py-24 text-[#F7F5EF] md:px-12 lg:min-h-[48rem] lg:px-24 lg:py-44 scroll-mt-0"
    >
      <div className="absolute inset-0 -z-30 overflow-hidden" aria-hidden="true">
        <div ref={backgroundRef} className="absolute -inset-x-4 -top-[8%] h-[116%]">
          <Image
            src="/images/Luminous Lotion on Dewy Skin.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(22,40,27,0.78)_0%,rgba(30,52,34,0.60)_28%,rgba(34,55,36,0.08)_52%,rgba(28,48,32,0.52)_76%,rgba(20,36,25,0.70)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[#243526]/8" aria-hidden="true" />

      <svg
        className="pointer-events-none absolute left-0 top-0 z-0 block w-full"
        style={{ height: "clamp(3.5rem, 7vw, 7rem)" }}
        viewBox="0 0 1440 112"
        preserveAspectRatio="none"
        fill="var(--background)"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 0h1440v39c-127 37-229 40-376 8-178-38-276-35-448 7-183 45-344 38-470-1C88 37 37 36 0 53V0Z" />
      </svg>

      <svg
        className="pointer-events-none absolute bottom-0 left-0 z-0 block w-full"
        style={{ height: "clamp(4rem, 8vw, 8rem)" }}
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        fill="var(--background)"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 128h1440V74c-143-35-251-36-395-4-173 38-278 35-444-7-181-46-343-44-475-4C79 79 35 78 0 63v65Z" />
      </svg>

      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-12 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:gap-16 xl:gap-24">
        <div ref={leftContentRef} className="max-w-xl">
          <p className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[#F3EAD8]/75">
            Everyday Barrier Care
          </p>
          <h2 id="formula-heading" className="max-w-md font-heading text-5xl leading-[0.95] text-[#F9F5EB] md:text-6xl lg:text-7xl">
            More than <span className="italic">a lotion.</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-[#F7F5EF]/85 md:text-lg">
            A lightweight, non-greasy formula that absorbs quickly, leaving your skin soft, supple, and beautifully hydrated.
          </p>
          <Link
            href="/product/body-lotion"
            className="btn-premium btn-premium--light mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F5EF]"
          >
            Discover the product
            <span aria-hidden="true" className="btn-premium__arrow">→</span>
          </Link>
        </div>

        <div className="justify-self-stretch lg:justify-self-end lg:max-w-md">
          <div
            ref={rightListRef}
            className="rounded-[2rem] border border-[#F7F5EF]/35 bg-[#F7F5EF]/15 p-6 shadow-[0_1.5rem_4rem_rgba(13,27,17,0.18)] backdrop-blur-md md:p-8"
          >
            <p className="mb-6 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[#F7F5EF]/70">
              Made for daily ritual
            </p>
            <ul className="space-y-1" aria-label="Body lotion highlights">
              {benefits.map(({ icon: Icon, title }) => (
                <li key={title} className="flex items-center gap-4 border-t border-[#F7F5EF]/20 py-4 first:border-t-0 first:pt-0 last:pb-0">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#F7F5EF]/35 bg-[#F7F5EF]/10 text-[#F7F5EF]">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-medium text-[#F7F5EF] md:text-base">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
