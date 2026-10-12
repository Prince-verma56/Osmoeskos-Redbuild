import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ingredients } from "@/lib/osmekos-data";
import { CeramideCards } from "@/components/sections/ceramide-cards";
import { Reveal } from "@/components/animations/reveal";
import { RevealHeading } from "@/components/animations/reveal-heading";

export const metadata: Metadata = {
  title: "Ingredients | OsmeKos",
  description:
    "Explore the natural and clinical ingredients in OsmeKos Body Lotion — Shea Butter, Coconut Oil, Niacinamide, Vitamin E, and the Triple Ceramide Complex.",
};

export default function IngredientsPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-32 pb-0">
      {/* Page Header */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center lg:mb-20">
        <Reveal className="mb-6">
          <span className="type-eyebrow text-accent block">Transparent Formulation</span>
        </Reveal>
        <RevealHeading
          as="h1"
          className="type-page-title text-foreground mb-8"
          text="The Science of Nature."
          delay={0.05}
        />
        <Reveal delay={0.2}>
          <p className="type-body text-muted-foreground max-w-2xl mx-auto">
            We believe in full transparency. Our formula combines the restorative power of botanicals with carefully chosen actives to nurture and protect your skin.
          </p>
        </Reveal>
      </section>

      {/* Triple Ceramide Complex — deep-green feature area, one of the few
          intentional uses of botanical green per the design system. */}
      <section
        id="triple-ceramide-complex"
        data-surface="dark"
        data-theme="dark"
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24 lg:mb-32 scroll-mt-20 lg:scroll-mt-24"
      >
        <div className="overflow-hidden rounded-[2rem] bg-primary text-primary-foreground lg:rounded-[3rem]">
          <div className="flex flex-col gap-12 p-7 md:p-12 lg:p-16">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <Reveal className="mb-4">
                  <span className="type-eyebrow text-primary-foreground/60 block">Core Technology</span>
                </Reveal>
                <RevealHeading
                  as="h2"
                  className="font-heading text-4xl md:text-5xl leading-[1.05]"
                  text="Triple Ceramide Complex"
                  delay={0.05}
                />
                <Reveal delay={0.2}>
                  <p className="type-body text-primary-foreground/80 mt-5">
                    Ceramides are lipids found naturally in the skin barrier. Our formula brings together Ceramides NP, AP, and EOP as part of an everyday, skin-first body-care routine.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Three individually labelled identifiers, icon-led. */}
            <CeramideCards variant="dark" />

            <Link
              href="/product/body-lotion#formula"
              className="btn-premium btn-premium--light inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              See it in the formula <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Four distinct ingredient sections — one per active, alternating sides,
          each with its own correct image, confirmed percentage, and a link
          back to the product. */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-24 pb-24 lg:gap-32 lg:pb-32">
        {ingredients.map((ingredient, index) => {
          const mediaFirst = index % 2 === 1;
          return (
            <section
              key={ingredient.id}
              id={ingredient.id}
              className="grid grid-cols-1 items-center gap-10 scroll-mt-20 lg:scroll-mt-24 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal
                media
                className={
                  "relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted lg:aspect-[5/4] lg:rounded-[2.5rem] " +
                  (mediaFirst ? "lg:order-1" : "lg:order-2")
                }
              >
                <Image
                  src={ingredient.image}
                  alt={ingredient.imageAlt}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Reveal>
              <Reveal
                stagger={0.1}
                className={
                  "flex flex-col items-start gap-5 " +
                  (mediaFirst ? "lg:order-2" : "lg:order-1")
                }
              >
                <span className="type-eyebrow text-accent">{ingredient.role}</span>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="font-heading text-4xl text-foreground md:text-5xl">{ingredient.name}</h2>
                  <span className="font-heading text-2xl text-accent md:text-3xl">{ingredient.percentage}</span>
                </div>
                <p className="type-body text-muted-foreground max-w-md">{ingredient.description}</p>
                <Link
                  href="/product/body-lotion#product-details"
                  className="btn-premium btn-premium--outline mt-1 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                >
                  See it in the Body Lotion <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
                </Link>
              </Reveal>
            </section>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <section className="w-full bg-[#EAE4D9] py-20 flex justify-center">
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            href="/product/body-lotion"
            className="btn-premium btn-premium--primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-sm font-medium"
          >
            Back to Product
          </Link>
          <Link
            href="/"
            className="btn-premium btn-premium--outline inline-flex items-center justify-center rounded-full px-8 py-4 text-center text-sm font-medium"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}
