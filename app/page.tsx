import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { HorizontalStory } from "@/components/sections/horizontal-story";
import { ScrollVideo } from "@/components/sections/scroll-video";
import { FormulaStorytelling } from "@/components/sections/formula-storytelling";
import { Ingredients } from "@/components/sections/ingredients";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <Hero />
      <About />
      <ProductShowcase />
      <HorizontalStory />
      <ScrollVideo />
      <FormulaStorytelling />
      <Ingredients />
    </main>
  );
}
