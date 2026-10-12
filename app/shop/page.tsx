import Link from "next/link";
import { Metadata } from "next";
import { PhotoPlaceholder } from "@/components/visual/photo-placeholder";

export const metadata: Metadata = {
  title: "Shop | OsmeKos",
  description: "Shop the OsmeKos Body Lotion, premium skincare for everyday body care.",
};

export default function ShopPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-32 pb-0">
      {/* Editorial Header */}
      <section className="w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-4 block">Single-Product Collection</span>
        <h1 className="type-page-title text-foreground mb-6">
          The Collection
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          We believe in doing one thing exceptionally well. Our signature body lotion is carefully formulated for complete barrier care.
        </p>
      </section>

      {/* Featured Product */}
      <section className="w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-0">
        <div className="group relative grid grid-cols-1 overflow-hidden rounded-[2rem] bg-[#EAE4D9] shadow-sm transition-shadow duration-500 hover:shadow-lg md:grid-cols-2 lg:rounded-[3rem]">
          
          {/* Media Side */}
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[32rem]">
            <PhotoPlaceholder
              slot="Product in setting (landscape)"
              tone="sage"
              className="transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#243526]/30 via-transparent to-transparent" aria-hidden="true" />
          </div>

          {/* Details Side */}
          <div className="flex flex-col items-start justify-center gap-7 p-8 text-left md:p-12 lg:p-16">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Signature Care</span>
              <h2 className="text-4xl md:text-5xl font-heading text-foreground leading-tight">Body Lotion</h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Our signature formula brings together a Triple Ceramide Complex and four well-considered ingredients for an easy, everyday body-care ritual.
            </p>
            
            <ul className="flex flex-col gap-2">
              {["Triple Ceramide Complex (NP, AP, EOP)", "Shea Butter 3%", "Coconut Oil 2%", "Niacinamide 2%", "Vitamin E 0.5%"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full max-w-sm">
              <Link
                href="/product/body-lotion"
                className="btn-premium btn-premium--primary inline-flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-center text-sm font-medium"
              >
                View Details <span aria-hidden="true" className="btn-premium__arrow">&rarr;</span>
              </Link>
              <Link
                href="/ingredients"
                className="btn-premium btn-premium--outline inline-flex flex-1 items-center justify-center rounded-full py-4 text-center text-sm font-medium"
              >
                Ingredients
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom spacer with warm tone */}
      <div className="h-24 bg-background" />
    </main>
  );
}
