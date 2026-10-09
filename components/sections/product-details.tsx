import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Droplet, ShieldCheck, Sparkles, Activity } from "lucide-react";

export function ProductDetails() {
  const benefits = [
    {
      icon: Droplet,
      title: "Deep & Long-lasting Hydration",
    },
    {
      icon: ShieldCheck,
      title: "Strengthens Skin Barrier",
    },
    {
      icon: Sparkles,
      title: "Improves Skin Texture",
    },
    {
      icon: Activity,
      title: "Suitable For All Skin Types",
    }
  ];

  return (
    <section id="product" className="relative py-24 lg:py-40 px-6 md:px-12 lg:px-24 bg-primary text-primary-foreground -mt-16 pt-32 lg:-mt-32 lg:pt-56 pb-32 lg:pb-48 rounded-b-[4rem] lg:rounded-b-[8rem] z-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">A Lotion That Does More</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.1]">
              More Than <br className="hidden md:block"/>a Lotion.
            </h2>
          </div>
          
          <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-lg">
            A lightweight, non-greasy formula that absorbs quickly, leaving your skin soft, supple, and beautifully hydrated all day. Formulated with a Triple Ceramide Complex (NP, AP, EOP) to nurture your skin from the first touch.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mt-4">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground border border-primary-foreground/20 group-hover:bg-primary-foreground/20 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-primary-foreground/90">{benefit.title}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-8">
            <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-medium shadow-lg transition-transform hover:scale-105 border-none">
              Shop Now &rarr;
            </Button>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-primary-foreground">Body Lotion</span>
              <span className="text-xs text-primary-foreground/60">300 ML / 10.1 FL OZ</span>
            </div>
          </div>
        </div>

        {/* Right Media */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] lg:rounded-tl-[8rem] lg:rounded-br-[8rem] overflow-hidden bg-background shadow-2xl border border-primary-foreground/10">
          <Image 
            src="/images/osmekos-product-detail.jpg" 
            alt="OsmeKos Body Lotion Details" 
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  );
}
