import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Lotion | OsmeKos",
  description: "OsmeKos Body Lotion with Triple Ceramide Complex — Shea Butter, Coconut Oil, Niacinamide & Vitamin E.",
};

export default function ProductPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-32 pb-24">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Media Area */}
        <div className="relative w-full aspect-[4/3] lg:aspect-[5/6] bg-[#EAE4D9] rounded-[2rem] lg:rounded-[3rem] border border-[#DCE3D4] overflow-hidden">
          <Image
            src="/images/osmekos-hero-landscape.jpg"
            alt="OsmeKos Premium Body Lotion in a botanical interior"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 43vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#243526]/35 to-transparent" aria-hidden="true" />
          <span className="absolute left-5 top-5 rounded-full border border-[#F7F5EF]/60 bg-[#F7F5EF]/70 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-sm md:left-7 md:top-7">
            Daily care
          </span>
        </div>

        {/* Information Area */}
        <div className="flex flex-col justify-center gap-7 lg:py-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent">Daily Care</span>
            <h1 className="text-5xl lg:text-6xl font-heading text-foreground leading-[1.05]">Body Lotion</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mt-1 max-w-xl">
              A lightweight daily body lotion with a Triple Ceramide Complex and nourishing botanicals for skin that feels soft, comfortable, and cared for.
            </p>
          </div>

          <div className="h-px w-full bg-border/70" />

          {/* Ceramide Complex */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-heading font-medium text-foreground">Triple Ceramide Complex</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Featuring Ceramides NP, AP, and EOP, this formula places skin-barrier lipids at the center of a considered everyday routine.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {["NP", "AP", "EOP"].map((c) => (
                <span key={c} className="text-[10px] uppercase tracking-widest font-semibold border border-foreground/20 rounded-full px-3 py-1 text-foreground/60">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border/70" />

          {/* Key Ingredients */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-heading font-medium text-foreground">Key Ingredients</h3>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Shea Butter 3%",  desc: "Deeply moisturizes and softens." },
                { name: "Coconut Oil 2%",  desc: "Locks in moisture and improves elasticity." },
                { name: "Niacinamide 2%",  desc: "Strengthens the natural barrier." },
                { name: "Vitamin E 0.5%",  desc: "Rich in antioxidants." },
              ].map(({ name, desc }) => (
                <li key={name} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{name}</span> — {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/ingredients" 
              className="flex-1 text-center py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              Explore Ingredients
            </Link>
            <Link 
              href="/shop" 
              className="flex-1 text-center py-4 rounded-full border border-border text-foreground hover:bg-muted transition-colors font-medium text-sm"
            >
              Back to Shop
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
