import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { FormulaStorytelling } from "@/components/sections/formula-storytelling";
import { Ingredients } from "@/components/sections/ingredients";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <About />
      <ProductShowcase />
      <FormulaStorytelling />
      <Ingredients />
    </main>
  );
}
