import Image from "next/image";
import Link from "next/link";

export function Ingredients() {
  const ingredients = [
    {
      name: "Shea Butter 3%",
      description: "Deeply moisturizes and softens dry skin.",
      imagePath: "/images/ingredient-shea-butter.jpg",
    },
    {
      name: "Coconut Oil 2%",
      description: "Locks in moisture and improves skin elasticity.",
      imagePath: "/images/ingredient-coconut-oil.jpg",
    },
    {
      name: "Niacinamide 2%",
      description: "Helps even skin tone and strengthens skin barrier.",
      imagePath: "/images/ingredient-niacinamide.jpg",
    },
    {
      name: "Vitamin E 0.5%",
      description: "Rich in antioxidants for healthier, radiant skin.",
      imagePath: "/images/ingredient-vitamin-e.jpg",
    }
  ];

  return (
    <section id="ingredients" className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-background -mt-16 pt-32 lg:-mt-32 lg:pt-48 z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div className="flex flex-col items-start gap-4 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Powered By Nature & Science</span>
            <h2 className="text-4xl md:text-5xl font-heading text-foreground leading-[1.15]">
              Thoughtful Ingredients.<br />Everyday Care.
            </h2>
          </div>
          <Link 
            href="#product"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
          >
            View All Ingredients
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-6 group">
              {/* Media Slot */}
              <div className="relative w-full aspect-square max-w-[240px] sm:max-w-none rounded-[2rem] sm:rounded-tr-[4rem] sm:rounded-bl-[4rem] overflow-hidden bg-muted border border-border/50 shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
                <Image 
                  src={ingredient.imagePath} 
                  alt={ingredient.name} 
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-xl font-semibold text-foreground">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
