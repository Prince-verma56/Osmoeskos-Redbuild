import Image from "next/image";

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-secondary -mt-16 pt-32 lg:-mt-32 lg:pt-48 pb-32 lg:pb-40 rounded-b-[4rem] lg:rounded-b-[8rem] z-30">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Media */}
        <div className="order-2 lg:order-1 relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] lg:rounded-tr-[8rem] lg:rounded-bl-[8rem] overflow-hidden bg-background shadow-xl">
          <Image 
            src="/images/osmekos-about-lifestyle.jpg" 
            alt="OsmeKos Brand Story" 
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Content */}
        <div className="order-1 lg:order-2 flex flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground/70">Real Care. Real Skin.</span>
              <div className="h-[1px] w-12 bg-secondary-foreground/20" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading text-secondary-foreground leading-[1.15]">
              Care That Goes Beyond the Surface.
            </h2>
          </div>
          
          <div className="flex flex-col gap-6 text-secondary-foreground/80 leading-relaxed text-lg">
            <p>
              Powered by a triple ceramide complex, our formula is designed to help restore, protect, and maintain your skin&apos;s natural barrier. Experience hydration that feels deeply nourishing and completely weightless.
            </p>
          </div>

          {/* Feature Callout */}
          <div className="mt-4 p-6 bg-background/50 backdrop-blur-sm rounded-[2rem] rounded-tr-none border border-secondary-foreground/10 flex flex-col gap-2">
            <h3 className="font-heading text-xl text-secondary-foreground font-semibold">Triple Ceramide Complex</h3>
            <p className="text-sm text-secondary-foreground/70">NP, AP, EOP: Carefully formulated with a skin-first philosophy for maximum compatibility.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
