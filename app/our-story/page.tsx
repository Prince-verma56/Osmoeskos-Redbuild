import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Reveal } from "@/components/animations/reveal";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { PhotoPlaceholder } from "@/components/visual/photo-placeholder";

export const metadata: Metadata = {
  title: "Our Story | OsmeKos",
  description: "The OsmeKos brand story and skincare philosophy.",
};

export default function OurStoryPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-32 pb-0">
      {/* Hero Section */}
      <section id="philosophy" className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 lg:mb-24 scroll-mt-20 lg:scroll-mt-24">
        <div className="flex flex-col items-center gap-5 text-center mb-10 md:mb-12">
          <Reveal>
            <span className="type-eyebrow text-accent">Our Philosophy</span>
          </Reveal>
          <RevealHeading
            as="h1"
            className="type-page-title text-foreground"
            text="Rooted in Botanical Science."
            delay={0.05}
          />
          <Reveal delay={0.2} stagger={0.1} className="flex flex-col items-center gap-5">
            <p className="max-w-xl type-body text-muted-foreground">
              OsmeKos is built on the philosophy that body care should be as thoughtful, intentional, and effective as facial care. We prioritize skin compatibility, barrier health, and premium textures over everything else.
            </p>
            <Link
              href="/product/body-lotion"
              className="btn-premium btn-premium--primary mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Discover the Body Lotion <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
            </Link>
          </Reveal>
        </div>

        <Reveal media className="relative w-full aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lg lg:rounded-[3rem]">
          <PhotoPlaceholder slot="Our Story lifestyle hero" tone="sage" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-foreground/15 to-transparent" />
        </Reveal>
      </section>

      {/* Editorial Section — warm sage */}
      <section id="formulation-philosophy" className="w-full bg-[#DCE3D4] py-20 lg:py-28 rounded-t-[3rem] lg:rounded-t-[6rem] scroll-mt-0">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1 flex flex-col gap-7">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Formulation Philosophy</span>
            </Reveal>
            <RevealHeading
              as="h2"
              className="type-section-title text-foreground"
              text="Balancing science and botanical nutrition."
              delay={0.05}
            />
            <Reveal delay={0.15} className="flex flex-col gap-4">
              <p className="type-body text-foreground/80">
                Every ingredient in an OsmeKos formula serves a defined physiological purpose. We reject filler, synthetic fragrance, and sensitizing agents in favour of skin-identical lipids, gentle cold-pressed plant oils, and proven actives.
              </p>
              <p className="type-body text-foreground/80">
                Our Triple Ceramide Complex reproduces the natural lipid bilayer of human stratum corneum — reinforcing the skin barrier, locking in hydration, and protecting against environmental stress.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Link
                href="/product/body-lotion#formula"
                className="btn-premium btn-premium--primary self-start inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
              >
                Explore the Triple Ceramide Complex <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
              </Link>
            </Reveal>
          </div>
          <Reveal media delay={0.1} className="order-1 md:order-2 relative w-full aspect-square rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-md">
            <Image
              src="/images/osmekos-formula-bg.jpg"
              alt="Botanical ingredients and cream texture"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Closing Editorial Section — Thoughtful Body Care (deep link target) */}
      <section id="thoughtful-care" className="w-full bg-background py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal media className="relative w-full aspect-[4/3] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-md">
            <PhotoPlaceholder slot="Body-care ritual close-up" tone="sand" />
          </Reveal>
          <div className="flex flex-col gap-7">
            <Reveal>
              <span className="type-eyebrow text-accent">Thoughtful Body Care</span>
            </Reveal>
            <RevealHeading
              as="h2"
              className="type-section-title text-foreground"
              text="A daily ritual designed to endure."
              delay={0.05}
            />
            <Reveal delay={0.15} className="flex flex-col gap-4">
              <p className="type-body text-muted-foreground">
                We believe body care should never be an afterthought. By formulating with the same rigor, elegance, and biocompatible ingredients traditionally reserved for the face, OsmeKos turns an everyday habit into an intentional ritual of restoration.
              </p>
              <p className="type-body text-muted-foreground">
                Crafted in small batches with cold-pressed botanical oils, pure plant-derived ceramides, and skin-calming vitamins — nothing more, nothing less.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Link
                href="/product/body-lotion"
                className="btn-premium btn-premium--primary self-start inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
              >
                View OsmeKos Body Lotion <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
