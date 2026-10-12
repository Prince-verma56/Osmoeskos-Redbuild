import { Reveal } from "@/components/animations/reveal";
import { PhotoPlaceholder } from "@/components/visual/photo-placeholder";
import { RevealHeading } from "@/components/animations/reveal-heading";

export function About() {
  return (
    <section id="about" className="relative px-6 md:px-12 lg:px-24 bg-secondary -mt-16 pt-28 lg:-mt-32 lg:pt-48 pb-24 lg:pb-40 rounded-b-[4rem] lg:rounded-b-[8rem] z-30 scroll-mt-0">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Media with signature zoom settle */}
        <Reveal
          media
          className="order-2 lg:order-1 relative w-full aspect-[4/3] rounded-[2rem] lg:rounded-tr-[6rem] lg:rounded-bl-[6rem] overflow-hidden bg-background shadow-xl"
        >
          <PhotoPlaceholder slot="Lifestyle ritual" tone="ivory" />
        </Reveal>

        {/* Right Content */}
        <div className="order-1 lg:order-2 flex flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground/70">Real Care. Real Skin.</span>
                <div className="h-[1px] w-12 bg-secondary-foreground/20" />
              </div>
            </Reveal>
            <RevealHeading
              as="h2"
              className="text-4xl md:text-5xl font-heading text-secondary-foreground leading-[1.15]"
              text="Care That Goes Beyond the Surface."
              delay={0.05}
            />
          </div>
          
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-6 text-secondary-foreground/80 leading-relaxed text-lg">
              <p>
                Powered by a triple ceramide complex, our formula is designed to help restore, protect, and maintain your skin&apos;s natural barrier. Experience hydration that feels deeply nourishing and completely weightless.
              </p>
            </div>
          </Reveal>

          {/* Feature Callout */}
          <Reveal delay={0.25} y={20}>
            <div className="mt-4 p-6 bg-background/50 backdrop-blur-sm rounded-[2rem] rounded-tr-none border border-secondary-foreground/10 flex flex-col gap-2">
              <h3 className="font-heading text-xl text-secondary-foreground font-semibold">Triple Ceramide Complex</h3>
              <p className="text-sm text-secondary-foreground/70">NP, AP, EOP: Carefully formulated with a skin-first philosophy for maximum compatibility.</p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
