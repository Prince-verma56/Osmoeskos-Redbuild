import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { ProductQuickView } from "@/components/product/product-quick-view";

export function ProductShowcase() {
  return (
    <section 
      id="product" 
      className="relative py-24 lg:py-40 px-6 md:px-12 lg:px-24 bg-background text-foreground -mt-16 pt-32 lg:-mt-32 lg:pt-56 pb-32 lg:pb-48 rounded-b-[4rem] lg:rounded-b-[8rem] z-20 scroll-mt-0"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/3 flex flex-col items-start gap-6 text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                Signature Care
              </span>
            </div>
          </Reveal>
          <RevealHeading
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground leading-[1.1]"
            text="Daily essentials for barrier health."
            delay={0.05}
          />
          <Reveal delay={0.18}>
            <p className="text-base text-muted-foreground leading-relaxed mt-2">
              Our clinically formulated body lotion pairs a triple ceramide complex with nourishing botanicals to deeply hydrate, lock in moisture, and restore your skin&apos;s natural balance.
            </p>
          </Reveal>
          <Reveal delay={0.28} className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/product/body-lotion"
              className="btn-premium btn-premium--primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
            >
              Shop Body Lotion <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
            </Link>
            <ProductQuickView triggerClassName="btn-premium btn-premium--outline inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium" />
          </Reveal>
        </div>

        {/* Right Content - Grid Collage */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Main Top Card with signature media zoom settle */}
          <Reveal 
            media
            className="w-full relative aspect-[4/3] sm:aspect-[16/9] bg-[#EAE4D9] rounded-[2rem] lg:rounded-[3rem] overflow-hidden flex items-center justify-center border border-[#DCE3D4]/50 shadow-sm"
          >
            {/* Full-bleed landscape product scene. */}
            <Image
              src="/images/osmekos-hero-landscape.jpg"
              alt="OsmeKos body lotion in a botanical interior"
              fill
              sizes="(max-width: 1024px) 100vw, 67vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#243526]/20 via-transparent to-[#243526]/10" aria-hidden="true" />
            
            {/* Decorative Labels like Seed */}
            <div className="absolute top-10 left-10 hidden sm:flex flex-col gap-1 items-start">
               <span className="text-[9px] uppercase tracking-widest font-semibold text-primary/60 border border-primary/20 px-2 py-0.5 rounded-full bg-white/50 backdrop-blur-sm">NP / AP / EOP</span>
               <div className="w-[1px] h-8 bg-primary/20 ml-6 mt-1" />
            </div>

            <div className="absolute top-16 right-12 hidden sm:flex flex-col gap-1 items-end">
               <span className="text-[9px] uppercase tracking-widest font-semibold text-primary/60 border border-primary/20 px-2 py-0.5 rounded-full bg-white/50 backdrop-blur-sm">Botanical Blend</span>
               <div className="w-[1px] h-12 bg-primary/20 mr-8 mt-1" />
            </div>

            {/* Bottom connector — anchors the composition like a labelled product stage */}
            <div className="absolute bottom-10 left-10 hidden sm:flex flex-col items-start gap-1">
               <div className="w-[1px] h-8 bg-primary/20 ml-6 mb-1" />
               <span className="text-[9px] uppercase tracking-widest font-semibold text-primary/60 border border-primary/20 px-2 py-0.5 rounded-full bg-white/50 backdrop-blur-sm">Shea Butter 3%</span>
            </div>
          </Reveal>

          {/* Bottom Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <Reveal 
              media
              delay={0.1}
              className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-muted border border-border/50 shadow-sm group"
            >
              <Image 
                src="/images/about-skincare.jpg" 
                alt="Skincare Texture" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </Reveal>
            
            <Reveal 
              delay={0.18}
              y={20}
              className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-primary/5 border border-primary/10 shadow-sm p-6 flex flex-col justify-center items-center text-center group transition-colors hover:bg-primary/10"
            >
               <h3 className="text-3xl font-heading text-primary mb-2">3%</h3>
               <span className="text-xs uppercase tracking-widest font-semibold text-primary/70">Shea Butter</span>
               <div className="w-8 h-[1px] bg-primary/20 my-3" />
               <p className="text-[10px] text-muted-foreground leading-relaxed">Deeply moisturizing barrier support.</p>
            </Reveal>
            
            <Reveal 
              media
              delay={0.26}
              className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-muted border border-border/50 shadow-sm group"
            >
              <Image 
                src="/images/osmekos-formula-bg.jpg" 
                alt="Cream texture with botanicals" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}
