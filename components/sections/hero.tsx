import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[90vh] md:min-h-[100svh] flex items-center overflow-hidden rounded-b-[4rem] lg:rounded-b-[8rem] z-40 bg-background">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image 
          src="/images/osmekos-hero-landscape.jpg" 
          alt="OsmeKos Body Lotion in a luxury bathroom" 
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Cream-tinted Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/70 to-transparent w-full md:w-3/4 lg:w-2/3" />

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24 relative z-10">
        <div className="flex flex-col items-start gap-6 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Skincare That Feels Like Care
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-primary leading-[1.1]">
            Deep Hydration, Every Day.
          </h1>
          <p className="text-lg text-primary/90 leading-relaxed max-w-md">
            A lightweight, nourishing body lotion with a triple ceramide complex designed to leave your skin feeling soft, comfortable, and cared for.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base shadow-lg transition-transform hover:scale-105">
              Shop Now &rarr;
            </Button>
            <Link 
              href="#ingredients" 
              className="px-6 py-4 rounded-full border border-primary/20 text-primary hover:bg-primary/5 backdrop-blur-sm transition-colors text-base font-medium"
            >
              Explore Ingredients
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
