import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingredients | OsmeKos",
  description: "Explore the natural and clinical ingredients in OsmeKos body lotion.",
};

export default function IngredientsPage() {
  const ingredients = [
    {
      name: "Shea Butter 3%",
      description: "A rich botanical butter that deeply moisturizes and softens dry skin, providing essential fatty acids and vitamins for a supple, healthy finish.",
      imagePath: "/images/ingredient-shea-butter.jpg",
    },
    {
      name: "Coconut Oil 2%",
      description: "Renowned for its hydrating and emollient properties, it locks in moisture, improves skin elasticity, and leaves the skin smooth without a greasy residue.",
      imagePath: "/images/ingredient-coconut-oil.jpg",
    },
    {
      name: "Niacinamide 2%",
      description: "A versatile vitamin B3 derivative that helps even skin tone, calm the complexion, and fortify the natural skin barrier against environmental damage.",
      imagePath: "/images/ingredient-niacinamide.jpg",
    },
    {
      name: "Vitamin E 0.5%",
      description: "A powerful antioxidant that protects the skin from free radicals while supporting the healing and repair of the skin's surface for a radiant appearance.",
      imagePath: "/images/ingredient-vitamin-e.jpg",
    }
  ];

  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-32 pb-0">
      {/* Page Header */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center lg:mb-20">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-6 block">Transparent Formulation</span>
        <h1 className="type-page-title text-foreground mb-8">
          The Science of <br className="hidden sm:block"/>Nature.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We believe in full transparency. Our formulas combine the restorative power of botanicals with clinically proven actives to nurture and protect your skin.
        </p>
      </section>

      {/* Ceramide Spotlight — one place where deep green is used intentionally */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 lg:mb-28">
        <div className="flex flex-col items-center justify-between gap-10 rounded-[2rem] bg-primary p-7 text-primary-foreground md:flex-row md:p-12 lg:rounded-[3rem] lg:p-16">
          <div className="flex-1 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-4 block">Core Technology</span>
            <h2 className="text-4xl font-heading mb-6">Triple Ceramide Complex</h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Ceramides are lipids found naturally in the skin barrier. Our formula includes Ceramides NP, AP, and EOP as part of an everyday, skin-first body-care routine.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-wrap items-center justify-center gap-3 md:w-auto md:flex-nowrap md:gap-4">
            {["NP", "AP", "EOP"].map((ceramide) => (
              <div key={ceramide} className="flex size-20 items-center justify-center rounded-full border border-primary-foreground/20 font-heading text-base tracking-widest md:size-24 md:text-lg">
                {ceramide}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients — cream background */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-y-20">
          {ingredients.map((ingredient) => (
            <div key={ingredient.name} className="flex flex-col gap-6 group">
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted">
                <Image 
                  src={ingredient.imagePath} 
                  alt={ingredient.name} 
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-3 max-w-md">
                <h3 className="text-3xl font-heading text-foreground">{ingredient.name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="w-full bg-[#EAE4D9] py-20 flex justify-center">
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            href="/product/body-lotion"
            className="btn-premium btn-premium--primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-sm font-medium"
          >
            Back to Product
          </Link>
          <Link
            href="/"
            className="btn-premium btn-premium--outline inline-flex items-center justify-center rounded-full px-8 py-4 text-center text-sm font-medium"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}
