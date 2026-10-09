import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProductDetails } from "@/components/sections/product-details";
import { Ingredients } from "@/components/sections/ingredients";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navigation />
      <Hero />
      <About />
      <ProductDetails />
      <Ingredients />
    </main>
  );
}
