"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { media } from "@/lib/media";
import { PhotoPlaceholder } from "@/components/visual/photo-placeholder";

/**
 * Texture Studio — an image-led sensory moment for the lotion texture.
 *
 * Signature interaction (desktop, fine pointer, no reduced motion): a soft
 * circular "lens" follows the cursor — the surrounding image is gently washed
 * back while the texture stays crisp beneath the lens, so the surface reads as
 * tactile. On touch / coarse pointers / reduced motion the interaction is
 * absent and the crisp image simply shows in full (never a broken or blank
 * stage). The macro asset is centralized in lib/media.ts for easy replacement.
 *
 * Copy uses approved sensory language only — no absorption/barrier/clinical
 * claims.
 */
export function TextureStudio() {
  const stageRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const asset = media.textureMacro;

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    // Defer the state update out of the effect body (rAF / change callback)
    // so it never runs synchronously during the effect.
    const compute = () => setInteractive(mq.matches && !reduceMotion);
    const frame = window.requestAnimationFrame(compute);
    mq.addEventListener("change", compute);
    return () => {
      window.cancelAnimationFrame(frame);
      mq.removeEventListener("change", compute);
    };
  }, [reduceMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return;
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    lens.style.setProperty("--mx", `${x}%`);
    lens.style.setProperty("--my", `${y}%`);
  };

  const lensMask =
    "radial-gradient(circle 8.5rem at var(--mx,50%) var(--my,50%), #000 0, #000 55%, transparent 80%)";

  return (
    <section
      id="texture"
      aria-labelledby="texture-heading"
      className="relative z-0 bg-[#EAE4D9] px-6 py-24 scroll-mt-20 md:px-12 lg:px-24 lg:py-36 lg:scroll-mt-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Texture stage */}
        <Reveal
          media
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-[#DCE3D4] shadow-sm lg:aspect-[16/12] lg:rounded-[2.5rem]"
        >
          <div
            ref={stageRef}
            className="absolute inset-0"
            onPointerMove={handlePointerMove}
            onPointerEnter={() => interactive && setHovering(true)}
            onPointerLeave={() => setHovering(false)}
          >
            {/* Base (crisp) image */}
            {asset.src ? (
              <Image
                src={asset.src}
                alt={asset.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                style={{ objectPosition: asset.focal }}
              />
            ) : (
              <PhotoPlaceholder slot="Texture macro close-up" tone="ivory" />
            )}

            {/* Soft wash — only while the lens is active */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#1b2a1f]/35 backdrop-blur-[2px] transition-opacity duration-300"
              style={{ opacity: interactive && hovering ? 1 : 0 }}
            />

            {/* Lens — re-reveals the crisp texture inside a soft circle */}
            <div
              ref={lensRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
              style={{
                opacity: interactive && hovering ? 1 : 0,
                WebkitMaskImage: lensMask,
                maskImage: lensMask,
              }}
            >
              {asset.src ? (
                <Image
                  src={asset.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  style={{ objectPosition: asset.focal }}
                />
              ) : (
                <PhotoPlaceholder slot="Texture macro close-up" tone="ivory" caption={false} />
              )}
            </div>
          </div>

          {/* Hint — desktop interactive only */}
          {interactive ? (
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-[#F7F5EF]/85 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[#243526]/70 backdrop-blur-sm">
              Move to explore
            </span>
          ) : null}
        </Reveal>

        {/* Copy */}
        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <span className="type-eyebrow text-[0.6875rem] text-accent">
              The Texture
            </span>
          </Reveal>
          <RevealHeading
            as="h2"
            id="texture-heading"
            className="font-heading text-4xl leading-[1.08] text-foreground md:text-5xl"
            text="A finish you can feel."
            delay={0.05}
          />
          <Reveal delay={0.16}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              A creamy, cushioned texture that spreads easily and settles into a
              soft, comfortable finish — the quiet, everyday pleasure at the
              heart of the ritual.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <Link
              href="/product/body-lotion#formula"
              className="btn-premium btn-premium--primary mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Inside the formula{" "}
              <span aria-hidden="true" className="btn-premium__arrow">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
