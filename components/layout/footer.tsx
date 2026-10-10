import Link from "next/link";

const exploreLinks = [
  { href: "/product/body-lotion", label: "Body Lotion" },
  { href: "/about", label: "Our Story" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/shop", label: "The Collection" },
];

export function Footer() {
  return (
    <footer className="mt-auto w-full rounded-t-[3rem] border-t border-primary-foreground/10 bg-primary px-6 pb-8 pt-16 text-primary-foreground md:px-12 lg:rounded-t-[4rem] lg:px-24 lg:pt-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Link href="/" className="w-fit font-heading text-3xl font-medium tracking-wide">
              OsmeKos
            </Link>
            <p className="max-w-sm text-base leading-relaxed text-primary-foreground/70">
              Skincare that feels like care. Formulated with a Triple Ceramide Complex and thoughtful botanicals for a considered daily ritual.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">Explore</h2>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 lg:col-span-4 lg:items-end">
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/65 lg:text-right">
              Explore the complete body-lotion formula and its ingredients.
            </p>
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-foreground px-7 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"
            >
              Explore the collection
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 border-t border-primary-foreground/10 pt-7 text-center">
          <p className="text-xs text-primary-foreground/50">© OsmeKos. All rights reserved.</p>
          <a
            href="https://labs.theangaarbatch.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.625rem] font-medium uppercase tracking-[0.28em] text-primary-foreground/45 transition-colors hover:text-primary-foreground/80"
            aria-label="Made by The Angaar Labs (opens in a new tab)"
          >
            Made by The Angaar Labs
          </a>
        </div>
      </div>
    </footer>
  );
}
