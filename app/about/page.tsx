import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | OsmeKos",
  description: "The OsmeKos brand story and skincare philosophy.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-32 pb-0">
      {/* Hero Section */}
      <section id="philosophy" className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 lg:mb-24 scroll-mt-20 lg:scroll-mt-24">
        <div className="flex flex-col items-center gap-5 text-center mb-10 md:mb-12">
          <span className="type-eyebrow text-accent">Our Philosophy</span>
          <h1 className="type-page-title text-foreground">
            Rooted in <br className="hidden sm:block"/>Botanical Science.
          </h1>
          <p className="max-w-xl type-body text-muted-foreground">
            OsmeKos is built on the philosophy that body care should be as thoughtful, intentional, and effective as facial care. We prioritize skin compatibility, barrier health, and premium textures over everything else.
          </p>
          <Link
            href="/product/body-lotion"
            className="btn-premium btn-premium--primary mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Discover the Body Lotion <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
          </Link>
        </div>
        
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lg lg:rounded-[3rem]">
          <Image
            src="/images/osmekos-about-lifestyle.jpg"
            alt="A quiet body-care ritual in a botanical interior"
            fill
            className="object-cover object-[center_top]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
        </div>
      </section>

      {/* Editorial Section — warm sage */}
      <section id="formulation-philosophy" className="w-full bg-[#DCE3D4] py-20 lg:py-28 rounded-t-[3rem] lg:rounded-t-[6rem] scroll-mt-0">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1 flex flex-col gap-7">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Formulation Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-heading text-foreground">
              Beyond Surface Hydration.
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              We focus on the foundations of healthy skin. Our formulations blend a Triple Ceramide Complex and Niacinamide with rich, nourishing botanicals — Shea Butter and Coconut Oil.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              The result is a deeply protective, long-lasting barrier that feels lightweight and luxurious.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/product/body-lotion#formula" className="btn-premium btn-premium--primary inline-flex w-fit items-center gap-2 rounded-full px-8 py-4 text-sm font-medium">
                Explore Our Formula <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
              </Link>
              <Link href="/ingredients" className="btn-premium btn-premium--outline inline-flex w-fit items-center rounded-full px-8 py-4 text-sm font-medium">
                Our Ingredients
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-md lg:rounded-[3rem]">
             <Image
              src="/images/osmekos-formula-bg.jpg"
              alt="Cream formula with dried botanicals"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
        </div>
      </section>

      {/* Thoughtful Body Care — closing editorial section on warm ivory */}
      <section
        id="thoughtful-care"
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 scroll-mt-20 lg:scroll-mt-24 lg:py-28"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-md lg:rounded-[3rem]">
            <Image
              src="/images/about-skincare.jpg"
              alt="A calm, unhurried daily body-care moment in soft daylight"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-2 flex flex-col items-start gap-6">
            <span className="type-eyebrow text-accent">Thoughtful Body Care</span>
            <h2 className="font-heading text-4xl text-foreground md:text-5xl leading-[1.05]">
              A daily ritual, <br className="hidden sm:block" />not an afterthought.
            </h2>
            <p className="type-body text-muted-foreground max-w-md">
              OsmeKos is made for the few unhurried minutes you give yourself each day. The lotion layers easily after a shower and absorbs quickly, leaving skin feeling soft and comfortable rather than sticky.
            </p>
            <p className="type-body text-muted-foreground max-w-md">
              We kept the texture light and the finish clean, so caring for your body can feel as considered as caring for your face.
            </p>
            <Link
              href="/product/body-lotion"
              className="btn-premium btn-premium--primary mt-1 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Discover the Body Lotion <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
