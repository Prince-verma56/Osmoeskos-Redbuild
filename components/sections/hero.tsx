import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative z-40 flex min-h-[100svh] w-full items-center overflow-hidden rounded-b-[2rem] bg-background sm:rounded-b-[3rem] lg:rounded-b-[8rem]"
    >
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/Hero.png"
          alt="OsmeKos Body Lotion surrounded by botanical ingredients"
          fill
          className="object-cover object-[68%_center] sm:object-center"
          sizes="100vw"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-24 md:px-12 lg:px-24">
        <div className="flex max-w-xl flex-col items-start gap-5 rounded-[1.75rem] border border-white/45 bg-[#F7F5EF]/65 p-5 shadow-[0_1rem_3rem_rgba(36,53,38,0.1)] backdrop-blur-md sm:gap-6 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/80 sm:text-xs sm:tracking-[0.2em]">
            Skincare That Feels Like Care
          </span>
          <h1 className="max-w-[12ch] font-heading text-[clamp(2.65rem,10vw,3.75rem)] leading-[1.03] text-primary md:text-6xl lg:text-7xl">
            Deep Hydration, Every Day.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-primary/90 sm:text-lg">
            A lightweight, nourishing body lotion with a triple ceramide complex designed to leave your skin feeling soft, comfortable, and cared for.
          </p>
          <div className="mt-3 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link href="/shop" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90 sm:w-auto sm:px-8 sm:py-4 sm:text-base">
              Shop Now &rarr;
            </Link>
            <Link
              href="/ingredients"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-primary/20 px-6 py-3.5 text-sm font-medium text-primary backdrop-blur-sm transition-colors hover:bg-primary/5 sm:w-auto sm:py-4 sm:text-base"
            >
              Explore Ingredients
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
