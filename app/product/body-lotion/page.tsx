import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ingredients } from "@/lib/osmekos-data";
import { CeramideCards } from "@/components/sections/ceramide-cards";
import { Reveal } from "@/components/animations/reveal";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { PhotoPlaceholder } from "@/components/visual/photo-placeholder";

export const metadata: Metadata = {
  title: "Body Lotion | OsmeKos",
  description:
    "OsmeKos Body Lotion with Triple Ceramide Complex — Shea Butter, Coconut Oil, Niacinamide & Vitamin E.",
};

export default function ProductPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-32 pb-24">
      {/* Product Details — main product information */}
      <section
        id="product-details"
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 scroll-mt-20 lg:scroll-mt-24 pb-16 lg:pb-24"
      >
        {/* Media — portrait bottle still life in a matching portrait frame */}
        <Reveal media className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#DCE3D4] bg-[#EAE4D9] lg:rounded-[3rem]">
          <PhotoPlaceholder slot="Product packshot (portrait)" tone="sand" />
          <span className="absolute left-5 top-5 z-10 rounded-full border border-[#F7F5EF]/60 bg-[#F7F5EF]/75 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-sm md:left-7 md:top-7">
            Daily care
          </span>
        </Reveal>

        {/* Information */}
        <div className="flex flex-col justify-center gap-7 lg:py-4">
          <div className="flex flex-col gap-4">
            <Reveal>
              <span className="type-eyebrow text-accent">Daily Care</span>
            </Reveal>
            <RevealHeading as="h1" className="type-page-title text-foreground" text="Body Lotion" delay={0.05} />
            <Reveal delay={0.18}>
              <p className="type-body text-muted-foreground mt-1 max-w-xl">
                A lightweight daily body lotion with a Triple Ceramide Complex and nourishing botanicals for skin that feels soft, comfortable, and cared for. It absorbs quickly and leaves no greasy residue.
              </p>
            </Reveal>
          </div>

          <div className="h-px w-full bg-border/70" />

          {/* Quick highlights */}
          <Reveal stagger={0.1} y={18}>
            <ul className="flex flex-col gap-3">
              {[
                "Triple Ceramide Complex — NP, AP & EOP",
                "Nourishing Shea Butter and Coconut Oil",
                "Lightweight, fast-absorbing, non-greasy finish",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="#formula"
              className="btn-premium btn-premium--primary inline-flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-center text-sm font-medium"
            >
              Explore the Formula <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
            </Link>
            <Link
              href="/shop"
              className="btn-premium btn-premium--outline inline-flex flex-1 items-center justify-center rounded-full py-4 text-center text-sm font-medium"
            >
              Shop
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Triple Ceramide Complex — dedicated formula section */}
      <section
        id="formula"
        className="w-full bg-[#DCE3D4]/50 py-20 lg:py-28 scroll-mt-0"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col items-start gap-6">
              <Reveal>
                <span className="type-eyebrow text-accent">The Formula</span>
              </Reveal>
              <RevealHeading
                as="h2"
                className="font-heading text-4xl text-foreground md:text-5xl leading-[1.05]"
                text="Triple Ceramide Complex"
                delay={0.05}
              />
              <Reveal delay={0.18} stagger={0.1} className="flex flex-col items-start gap-6">
                <p className="type-body text-muted-foreground max-w-md">
                  At the centre of the formula sits a blend of three skin-identical ceramides. Ceramides are lipids found naturally in the skin barrier — our complex pairs them with nourishing botanicals for an everyday, skin-first ritual.
                </p>
                <Link
                  href="/ingredients#triple-ceramide-complex"
                  className="btn-premium btn-premium--primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                >
                  More on the complex <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
                </Link>
              </Reveal>
            </div>

            <Reveal media className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] lg:rounded-[2.5rem]">
              <Image
                src="/images/Luminous Lotion on Dewy Skin.png"
                alt="A swatch of OsmeKos lotion on dewy skin among botanical leaves"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </Reveal>
          </div>

          {/* Three individually labelled ceramides, icon-led */}
          <div className="mt-12 lg:mt-16">
            <CeramideCards variant="light" />
          </div>
        </div>
      </section>

      {/* Key Ingredients — product-local summary linking to each detail */}
      <section
        id="key-ingredients"
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24"
      >
        <div className="flex flex-col items-start gap-3 mb-10 lg:mb-14">
          <Reveal>
            <span className="type-eyebrow text-accent">What&apos;s inside</span>
          </Reveal>
          <RevealHeading as="h2" className="font-heading text-4xl text-foreground md:text-5xl" text="Key Ingredients" delay={0.05} />
          <Reveal delay={0.18}>
            <p className="type-body text-muted-foreground max-w-xl">
              Four considered actives, each at a confirmed concentration. Explore any of them in detail.
            </p>
          </Reveal>
        </div>

        <Reveal stagger={0.1} y={24} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ingredients.map((ingredient) => (
            <div key={ingredient.id}>
              <Link
                href={`/ingredients#${ingredient.id}`}
                className="group flex items-center gap-5 rounded-[1.5rem] border border-border bg-card p-4 transition-colors hover:border-accent/40 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-[1.1rem] bg-muted">
                  <Image
                    src={ingredient.image}
                    alt={ingredient.imageAlt}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-heading text-xl text-foreground">{ingredient.name}</p>
                    <span className="text-sm font-semibold text-accent">{ingredient.percentage}</span>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground line-clamp-2">
                    {ingredient.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/ingredients"
            className="btn-premium btn-premium--primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-sm font-medium"
          >
            All Ingredients <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
          </Link>
          <Link
            href="/shop"
            className="btn-premium btn-premium--outline inline-flex items-center justify-center rounded-full px-8 py-4 text-center text-sm font-medium"
          >
            Back to Shop
          </Link>
        </Reveal>
      </section>
    </main>
  );
}




