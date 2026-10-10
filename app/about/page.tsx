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
      <section id="philosophy" className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 lg:mb-24">
        <div className="flex flex-col items-center gap-5 text-center mb-10 md:mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            Rooted in <br className="hidden sm:block"/>Botanical Science.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            OsmeKos is built on the philosophy that body care should be as thoughtful, intentional, and effective as facial care. We prioritize skin compatibility, barrier health, and premium textures.
          </p>
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
      <section id="formulation-philosophy" className="w-full bg-[#DCE3D4] py-20 lg:py-28 rounded-t-[3rem] lg:rounded-t-[6rem]">
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
              <Link href="/product/body-lotion" className="w-fit px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm">
                Explore Our Formula
              </Link>
              <Link href="/ingredients" className="w-fit px-8 py-4 rounded-full border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors font-medium text-sm">
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
    </main>
  );
}
