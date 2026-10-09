import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navigation() {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Our Story", href: "#about" },
    { name: "Product", href: "#product" },
    { name: "Ingredients", href: "#ingredients" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4">
      <div className="w-full max-w-5xl bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-3 flex items-center justify-between shadow-sm">
        {/* Brand */}
        <Link href="#home" className="text-xl font-heading font-semibold text-foreground tracking-wide">
          OsmeKos
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Search">
            <Search className="w-4 h-4" />
          </button>
          <Button variant="default" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6">
            Shop Now
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger className="text-foreground p-1" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground border-border w-[300px]">
              <SheetTitle className="text-left font-heading text-2xl text-foreground mb-8">OsmeKos</SheetTitle>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 mt-6 border-t border-border flex flex-col gap-4">
                  <Button variant="default" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Shop Now
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
