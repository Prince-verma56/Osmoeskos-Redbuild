"use client";

import { useRef } from "react";
import { Droplets, Layers, ShieldCheck, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reveal";
import { ceramides } from "@/lib/osmekos-data";

// Each ceramide gets an icon that echoes its role in the description:
// NP → hydration, AP → barrier matrix/layers, EOP → protection.
const ceramideIcons: Record<string, LucideIcon> = {
  NP: Droplets,
  AP: Layers,
  EOP: ShieldCheck,
};

type Variant = "dark" | "light";

/**
 * The three Triple Ceramide Complex identifiers, rendered as premium
 * icon-led editorial cards. Shared by the Ingredients feature panel
 * (dark green) and the Product formula section (light sage) via `variant`.
 * Cards rise and settle in a short stagger on scroll; the emblem and index
 * ease in just behind each card for a layered, crafted entrance.
 */
export function CeramideCards({ variant = "light" }: { variant?: Variant }) {
  const dark = variant === "dark";
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-ceramide-card]", el);

      // Hidden start state applied in this useGSAP layout effect (before paint),
      // so the cards never flash visible first — they stay hidden, then rise in
      // once the group's ScrollTrigger enters.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
      tl.from(cards, {
        y: 46,
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      }).from(
        el.querySelectorAll("[data-ceramide-emblem]"),
        { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "back.out(1.7)", stagger: 0.12 },
        0.15,
      );
    },
    { scope: ref },
  );

  const card = dark
    ? "border-primary-foreground/15 bg-primary-foreground/[0.06]"
    : "border-[#243526]/10 bg-[#F7F5EF]";
  const emblem = dark
    ? "border-primary-foreground/25 text-primary-foreground"
    : "border-[#243526]/15 text-primary";
  const index = dark ? "text-primary-foreground/25" : "text-[#243526]/15";
  const code = dark ? "text-[#CBB987]" : "text-accent";
  const name = dark ? "text-primary-foreground" : "text-foreground";
  const desc = dark ? "text-primary-foreground/70" : "text-muted-foreground";

  return (
    <div ref={ref} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {ceramides.map((ceramide, i) => {
        const Icon = ceramideIcons[ceramide.code] ?? Droplets;
        return (
          <div
            key={ceramide.code}
            data-ceramide-card
            className={`flex flex-col gap-5 rounded-[1.5rem] border p-6 lg:p-7 ${card}`}
          >
            <div className="flex items-start justify-between">
              <span
                data-ceramide-emblem
                className={`grid size-14 place-items-center rounded-2xl border ${emblem}`}
              >
                <Icon className="size-6" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span className={`font-heading text-3xl font-medium tabular-nums ${index}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <span className={`type-eyebrow block ${code}`}>Ceramide {ceramide.code}</span>
              <p className={`mt-2 font-heading text-xl ${name}`}>{ceramide.name}</p>
              <p className={`mt-2 text-sm leading-relaxed ${desc}`}>{ceramide.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
