"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { CinematicOverlay } from "@/components/visual/cinematic-overlay";

/**
 * Signature Experience B — Scroll-controlled video scrubbing.
 *
 * The video's timeline is bound to vertical scroll progress: while the section
 * is pinned, scrolling down advances `currentTime`, scrolling up reverses it.
 * It is NOT an autoplay/loop background — playback position IS the scroll.
 *
 * Readiness is handled defensively (brief Part 5.4):
 *  - the scrub only initialises once valid duration metadata is available;
 *  - it never seeks before `readyState >= HAVE_CURRENT_DATA`;
 *  - redundant seeks are skipped with a small epsilon;
 *  - ScrollTrigger + tween are torn down on unmount / media-query change.
 *
 * Fallbacks: under reduced motion or on small screens there is no pin/scrub —
 * the poster and all copy render normally. If the asset is missing or fails to
 * load, a premium poster image is shown instead of a broken <video>, plus a
 * dev-only note documenting the required asset. No stock or other-brand video
 * is ever substituted.
 *
 * To activate the real experience, drop a web-optimised file at `src`:
 *   - H.264 MP4 (baseline/main profile), muted, no audio track needed
 *   - frequent keyframes (~every 0.25–0.5s) for smooth seeking
 *   - consistent frame rate, ~1080p, sensibly compressed
 *   - a matching poster image
 */

type ScrollVideoProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Video source. Drop a real file here to activate scrubbing. */
  src?: string;
  /** Poster/fallback still (also shown under reduced motion). */
  poster?: string;
  posterAlt?: string;
  /** Pinned scroll distance as a multiple of viewport height (%). */
  scrubViewportHeights?: number;
};

export function ScrollVideo({
  eyebrow = "The Film",
  title = "A quiet ritual, in motion.",
  description = "Warm light, the turn of the bottle, the first press of cream — the OsmeKos body lotion, from first look to finish.",
  ctaHref = "/product/body-lotion",
  ctaLabel = "Discover the product",
  src = "/videos/osmekos-body-lotion-story.mp4",
  poster = "/images/osmekos-hero-landscape.jpg",
  posterAlt = "OsmeKos Body Lotion in a light-filled botanical setting",
  scrubViewportHeights = 2.2,
}: ScrollVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  // True only once the scroll-scrub pin is actually created (valid video
  // metadata). Until then the section must size to its content — NOT reserve a
  // full 100vh, which would leave a large empty viewport between sections when
  // no real video asset exists yet.
  const [pinned, setPinned] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const video = videoRef.current;
          if (!video) return;

          let initialised = false;
          let st: ScrollTrigger | null = null;
          let tween: gsap.core.Tween | null = null;
          const proxy = { t: 0 };
          const epsilon = 1 / 60; // ~one frame at 60fps

          const init = () => {
            if (initialised) return;
            const duration = video.duration;
            if (!duration || !isFinite(duration) || duration <= 0) return;
            initialised = true;

            tween = gsap.to(proxy, {
              t: 1,
              ease: "none",
              onUpdate: () => {
                // Never seek before the first frame of data is decodable.
                if (video.readyState < 2) return;
                const target = proxy.t * duration;
                if (Math.abs(target - video.currentTime) < epsilon) return;
                video.currentTime = target;
              },
            });

            st = ScrollTrigger.create({
              animation: tween,
              trigger: section,
              start: "top top",
              end: () =>
                "+=" + Math.round(window.innerHeight * scrubViewportHeights),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });

            // Geometry just changed (a pin was added) — re-measure.
            ScrollTrigger.refresh();
            setPinned(true);
          };

          const onMeta = () => init();
          const onError = () => setStatus("error");

          video.addEventListener("loadedmetadata", onMeta);
          video.addEventListener("error", onError);
          // Metadata may already be present (fast cache / re-mount).
          if (video.readyState >= 1) init();

          return () => {
            video.removeEventListener("loadedmetadata", onMeta);
            video.removeEventListener("error", onError);
            st?.kill();
            tween?.kill();
            setPinned(false);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [status] },
  );

  const showVideo = status !== "error";
  const isDev = process.env.NODE_ENV === "development";

  return (
    <section
      ref={sectionRef}
      id="film"
      aria-labelledby="film-heading"
      className={`relative flex w-full items-center overflow-hidden bg-background px-6 py-20 md:px-12 lg:px-24 scroll-mt-20 lg:scroll-mt-24 ${
        pinned ? "lg:h-screen lg:py-0" : "lg:py-28"
      }`}
    >
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/* Video stage */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#1b2a1f] shadow-[0_2rem_5rem_-1.5rem_rgba(27,42,31,0.55)] sm:aspect-[16/10] lg:aspect-[4/3] lg:rounded-[2.5rem]">
          {showVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={poster}
              muted
              playsInline
              preload="auto"
              aria-label={`${title}. ${description}`}
              onError={() => setStatus("error")}
              onLoadedMetadata={() => setStatus("ready")}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={poster}
              alt={posterAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />
          )}

          {/* Cinematic film grain + vignette for graded-footage depth. */}
          <CinematicOverlay
            grainOpacity={0.06}
            vignetteStrength={0.34}
            className="rounded-[inherit]"
          />

          {/* Soft edge vignette for depth; never obscures the frame. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
          />

          {isDev && status === "error" ? (
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-[#B7A06B]/40 bg-[#1b2a1f]/85 px-4 py-3 text-[0.6875rem] leading-relaxed text-[#F7F5EF]/90 backdrop-blur-sm">
              <span className="font-semibold text-[#E9DFBF]">
                Dev note — production asset missing.
              </span>{" "}
              Add a web-optimised H.264 MP4 at{" "}
              <code className="text-[#E9DFBF]">{src}</code> (frequent keyframes
              for smooth seeking) to activate scroll-scrub playback. Poster shown
              as fallback.
            </div>
          ) : null}
        </div>

        {/* Copy column */}
        <div className="flex max-w-md flex-col items-start gap-5">
          <span className="type-eyebrow text-[0.6875rem] text-accent">
            {eyebrow}
          </span>
          <h2
            id="film-heading"
            className="font-heading text-4xl leading-[1.08] text-foreground md:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="btn-premium btn-premium--primary mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
          >
            {ctaLabel}{" "}
            <span aria-hidden="true" className="btn-premium__arrow">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
