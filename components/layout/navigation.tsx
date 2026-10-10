"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { filterSearchResults } from "@/lib/search-data";

type MenuKey = "story" | "product" | "ingredients" | "shop";

type MenuItem = {
  title: string;
  description?: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

type MegaMenu = {
  trigger: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  featured?: MenuItem;
  items: MenuItem[];
  footerLink: MenuItem;
};

const megaMenus: Record<MenuKey, MegaMenu> = {
  story: {
    trigger: "Our Story",
    href: "/about",
    eyebrow: "Our Story",
    title: "Rooted in Thoughtful Care",
    description: "Explore the considered approach behind OsmeKos body care.",
    items: [
      {
        title: "Our Philosophy",
        description: "The point of view that guides our daily rituals.",
        href: "/about#philosophy",
        image: "/images/osmekos-about-lifestyle.jpg",
        imageAlt: "A quiet body-care ritual in a botanical interior",
      },
      {
        title: "Formulation Philosophy",
        description: "A closer look at our balanced approach to body care.",
        href: "/about#formulation-philosophy",
        image: "/images/osmekos-formula-bg.jpg",
        imageAlt: "Cream formula with dried botanicals",
      },
      {
        title: "Thoughtful Body Care",
        description: "Discover the signature lotion at the centre of OsmeKos.",
        href: "/product/body-lotion",
        image: "/images/Hero.png",
        imageAlt: "OsmeKos Body Lotion surrounded by botanical ingredients",
      },
    ],
    footerLink: { title: "Visit Our Story", href: "/about" },
  },
  product: {
    trigger: "Product",
    href: "/product/body-lotion",
    eyebrow: "Signature Care",
    title: "The Body Lotion",
    description:
      "A lightweight daily lotion centred on a Triple Ceramide Complex and nourishing botanicals.",
    featured: {
      title: "OsmeKos Body Lotion",
      description: "A considered essential for an everyday body-care ritual.",
      href: "/product/body-lotion",
      image: "/images/Hero.png",
      imageAlt: "OsmeKos Body Lotion surrounded by botanical ingredients",
    },
    items: [
      {
        title: "Triple Ceramide Complex",
        description: "Explore the formula story.",
        href: "/#formula",
      },
      {
        title: "Product Ingredients",
        description: "Meet the botanicals and actives in the formula.",
        href: "/ingredients",
      },
    ],
    footerLink: { title: "View Product Details", href: "/product/body-lotion" },
  },
  ingredients: {
    trigger: "Ingredients",
    href: "/ingredients",
    eyebrow: "Formula Notes",
    title: "Thoughtful Ingredients",
    description:
      "Four distinct ingredients, selected for a balanced everyday formula.",
    items: [
      {
        title: "Shea Butter",
        description: "A rich botanical butter in the formula.",
        href: "/ingredients",
        image: "/images/ingredient-shea-butter.jpg",
        imageAlt: "Shea butter",
      },
      {
        title: "Coconut Oil",
        description: "A familiar nourishing botanical.",
        href: "/ingredients",
        image: "/images/ingredient-coconut-oil.jpg",
        imageAlt: "Coconut oil",
      },
      {
        title: "Niacinamide",
        description: "Vitamin B3, used in the body-care formula.",
        href: "/ingredients",
        image: "/images/ingredient-niacinamide.jpg",
        imageAlt: "Niacinamide ingredient",
      },
      {
        title: "Vitamin E",
        description: "An antioxidant that supports the formula.",
        href: "/ingredients",
        image: "/images/ingredient-vitamin-e.jpg",
        imageAlt: "Vitamin E ingredient",
      },
    ],
    footerLink: { title: "Explore All Ingredients", href: "/ingredients" },
  },
  shop: {
    trigger: "Shop Now",
    href: "/shop",
    eyebrow: "Single-Product Collection",
    title: "Explore Body Care",
    description:
      "Discover the OsmeKos Body Lotion and the ingredients that shape its daily-care ritual.",
    featured: {
      title: "OsmeKos Body Lotion",
      description:
        "A lightweight body lotion with a Triple Ceramide Complex and nourishing botanicals.",
      href: "/product/body-lotion",
      image: "/images/Hero.png",
      imageAlt: "OsmeKos Body Lotion surrounded by botanical ingredients",
    },
    items: [
      {
        title: "Shop All",
        description: "Visit the OsmeKos collection.",
        href: "/shop",
      },
      {
        title: "Explore Ingredients",
        description: "See the formula's four considered ingredients.",
        href: "/ingredients",
      },
    ],
    footerLink: { title: "Visit Shop", href: "/shop" },
  },
};

const desktopMenuKeys: MenuKey[] = ["story", "product", "ingredients"];

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
function MenuFeature({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group/feature block overflow-hidden rounded-[1.25rem] border border-[#243526]/10 bg-[#DCE3D4]/65 p-3 transition-colors hover:bg-[#DCE3D4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7A06B]"
    >
      <div className="relative aspect-[16/8] overflow-hidden rounded-[0.9rem] bg-[#EAE4D9]">
        {item.image && (
          <Image
            src={item.image}
            alt={item.imageAlt ?? ""}
            fill
            sizes="27rem"
            className="object-cover object-[72%_center] transition-transform duration-500 group-hover/feature:scale-[1.025]"
          />
        )}
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pb-1 pt-4">
        <div>
          <p className="font-heading text-2xl leading-none text-[#243526]">
            {item.title}
          </p>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-[#77766C]">
              {item.description}
            </p>
          )}
        </div>
        <ArrowUpRight
          className="mt-1 size-4 shrink-0 text-[#243526] transition-transform duration-200 group-hover/feature:-translate-y-0.5 group-hover/feature:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

function MenuRow({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group/row flex min-w-0 items-center gap-4 rounded-2xl px-2 py-2 transition-colors hover:bg-[#EAE4D9]/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
    >
      {item.image && (
        <div className="relative size-[4.25rem] shrink-0 overflow-hidden rounded-[0.9rem] bg-[#EAE4D9]">
          <Image
            src={item.image}
            alt={item.imageAlt ?? ""}
            fill
            sizes="68px"
            className="object-cover transition-transform duration-500 group-hover/row:scale-105"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#25291F]">{item.title}</p>
        {item.description && (
          <p className="mt-1 text-sm leading-snug text-[#77766C]">
            {item.description}
          </p>
        )}
      </div>
      <ArrowUpRight
        className="size-4 shrink-0 text-[#77766C] transition-transform duration-200 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-[#243526]"
        aria-hidden="true"
      />
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeroAtTop, setIsHeroAtTop] = useState(pathname === "/");
  const [panelPosition, setPanelPosition] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setActiveMenu(null);
  }, [clearCloseTimer]);

  const openMenu = useCallback(
    (menu: MenuKey) => {
      clearCloseTimer();
      setActiveMenu(menu);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(closeMenu, 180);
  }, [clearCloseTimer, closeMenu]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    const updateHeaderSurface = () => {
      scrollFrameRef.current = null;
      const nextHeroAtTop = pathname === "/" && window.scrollY < 48;

      setIsHeroAtTop((current) =>
        current === nextHeroAtTop ? current : nextHeroAtTop,
      );
    };

    const requestHeaderSurfaceUpdate = () => {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(
          updateHeaderSurface,
        );
      }
    };

    requestHeaderSurfaceUpdate();
    window.addEventListener("scroll", requestHeaderSurfaceUpdate, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", requestHeaderSurfaceUpdate);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (!activeMenu) return;

    const updatePanelPosition = () => {
      if (!barRef.current) return;

      if (window.innerWidth < 1024) {
        closeMenu();
        return;
      }

      const barBounds = barRef.current.getBoundingClientRect();
      const viewportGutter = 16;
      const width = Math.min(472, window.innerWidth - viewportGutter * 2);
      const left = Math.min(
        Math.max(viewportGutter, barBounds.left),
        window.innerWidth - width - viewportGutter,
      );
      const top = barBounds.bottom + 12;

      setPanelPosition({
        top,
        left,
        width,
        maxHeight: Math.max(240, window.innerHeight - top - viewportGutter),
      });
    };

    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);
    return () => window.removeEventListener("resize", updatePanelPosition);
  }, [activeMenu, closeMenu]);

  useEffect(() => {
    if (!activeMenu) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !wrapperRef.current?.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activeMenu, closeMenu]);

  const currentMenu = activeMenu ? megaMenus[activeMenu] : null;
  const headerIsTransparent = pathname === "/" && isHeroAtTop;
  const filteredSearchResults = filterSearchResults(searchQuery);

  return (
    <>
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-[#17231d]/30 px-4 pb-10 pt-24 backdrop-blur-[2px]"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-5xl"
            >
              <div className="rounded-[2rem] border border-[#243526]/10 bg-[#f6f1ea]/95 p-4 shadow-[0_2rem_4rem_rgba(19,31,24,0.18)] backdrop-blur-xl sm:p-5">
                <div className="flex items-center gap-3 rounded-full border border-[#243526]/10 bg-[#f7f5ef] px-4 py-3 sm:px-5">
                  <Search className="size-5 shrink-0 text-[#243526]/65" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search OsmeKos..."
                    autoFocus
                    className="w-full border-0 bg-transparent text-base text-[#243526] placeholder:text-[#77766C] focus:outline-none sm:text-[1.05rem]"
                    aria-label="Search OsmeKos"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="inline-flex size-8 items-center justify-center rounded-full text-[#243526]/80 transition-colors hover:bg-[#EAE4D9] hover:text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                      aria-label="Clear search"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <div className="mt-6 min-h-[9rem] rounded-[1.5rem] border border-[#243526]/8 bg-[#f9f5f0]/80 p-4 sm:p-6">
                  {searchQuery.trim().length === 0 ? (
                    <div className="flex min-h-[11rem] flex-col items-center justify-center gap-4 text-center text-[#77766C]">
                      <Search className="size-12 opacity-30" aria-hidden="true" />
                      <p className="max-w-xl text-lg leading-relaxed text-[#243526]/75">
                        Try searching for “Ceramides”, “Shea Butter”, or “Our Story”.
                      </p>
                    </div>
                  ) : filteredSearchResults.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#243526]/60">
                        {filteredSearchResults.length} {filteredSearchResults.length === 1 ? "result" : "results"}
                      </p>
                      <ul className="space-y-3">
                        {filteredSearchResults.map((result) => (
                          <li key={result.title}>
                            <Link
                              href={result.href}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="group block rounded-[1.2rem] border border-[#243526]/8 bg-white/80 p-4 transition-colors hover:border-[#B7A06B]/50 hover:bg-[#F7F5EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <p className="font-heading text-2xl leading-none text-[#243526]">
                                    {result.title}
                                  </p>
                                  <p className="mt-2 text-sm leading-relaxed text-[#77766C]">
                                    {result.description}
                                  </p>
                                </div>
                                <ArrowUpRight
                                  className="size-5 shrink-0 text-[#243526] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                  aria-hidden="true"
                                />
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex min-h-[11rem] flex-col items-center justify-center gap-4 text-center text-[#77766C]">
                      <X className="size-12 opacity-30" aria-hidden="true" />
                      <p className="text-lg text-[#243526]/75">No results found for “{searchQuery}”.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        ref={wrapperRef}
        className="fixed inset-x-0 top-0 z-50 mt-5 px-4 lg:mt-6"
        onPointerEnter={clearCloseTimer}
        onPointerLeave={scheduleClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            scheduleClose();
          }
        }}
      >
        <div
          ref={barRef}
          className={classes(
            "mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-6",
            !headerIsTransparent &&
              "rounded-full border border-[#F7F5EF]/70 bg-[#F7F5EF]/90 shadow-[0_0.5rem_2.5rem_rgba(36,53,38,0.12)] supports-backdrop-filter:bg-[#F7F5EF]/76 supports-backdrop-filter:backdrop-blur-xl",
          )}
        >
          <div className="flex min-w-0 items-center gap-7 xl:gap-10">
            <Link
              href="/"
              onClick={closeMenu}
              className="shrink-0 font-heading text-[1.35rem] font-semibold tracking-[0.01em] text-[#243526] transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7A06B]"
              aria-label="OsmeKos home"
            >
              OsmeKos
            </Link>

            <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
              <Link
                href="/"
                onClick={closeMenu}
                aria-current={pathname === "/" ? "page" : undefined}
                className={classes(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]",
                  pathname === "/"
                    ? "bg-[#DCE3D4]/80 text-[#243526]"
                    : "text-[#25291F]/75 hover:bg-[#EAE4D9]/85 hover:text-[#243526]",
                )}
              >
                Home
              </Link>

              {desktopMenuKeys.map((menuKey) => {
                const menu = megaMenus[menuKey];
                const isOpen = activeMenu === menuKey;
                const routeIsActive =
                  (menuKey === "story" && pathname.startsWith("/about")) ||
                  (menuKey === "product" && pathname.startsWith("/product/body-lotion")) ||
                  (menuKey === "ingredients" && pathname.startsWith("/ingredients"));

                return (
                  <button
                    key={menuKey}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? "osmekos-mega-menu" : undefined}
                    onFocus={() => openMenu(menuKey)}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") openMenu(menuKey);
                    }}
                    onClick={() =>
                      setActiveMenu((current) =>
                        current === menuKey ? null : menuKey,
                      )
                    }
                    className={classes(
                      "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]",
                      isOpen || routeIsActive
                        ? "bg-[#DCE3D4]/80 text-[#243526]"
                        : "text-[#25291F]/75 hover:bg-[#EAE4D9]/85 hover:text-[#243526]",
                    )}
                  >
                    {menu.trigger}
                    <ChevronDown
                      className={classes(
                        "size-3.5 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          <div
            className={classes(
              "hidden items-center gap-2 lg:flex",
              headerIsTransparent &&
                "rounded-full border border-[#F7F5EF]/45 bg-transparent px-1.5 py-1 shadow-[0_0.5rem_1.5rem_rgba(36,53,38,0.08)] supports-backdrop-filter:bg-[#F7F5EF]/12 supports-backdrop-filter:backdrop-blur-xl",
            )}
          >
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                closeMenu();
              }}
              className={classes(
                "inline-flex size-9 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]",
                searchOpen
                  ? "bg-[#DCE3D4]/80 text-[#243526]"
                  : "text-[#25291F]/75 hover:bg-[#EAE4D9]/85 hover:text-[#243526]",
              )}
              aria-label="Open search"
              aria-expanded={searchOpen}
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
            <Link
              href={megaMenus.shop.href}
              onClick={closeMenu}
              aria-current={pathname.startsWith("/shop") ? "page" : undefined}
              className="inline-flex rounded-full bg-[#243526] px-5 py-2.5 text-sm font-semibold text-[#F7F5EF] transition-colors hover:bg-[#243526]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
            >
              Shop Now
            </Link>
          </div>

          <div
            className={classes(
              "flex items-center lg:hidden",
              headerIsTransparent &&
                "rounded-full border border-[#F7F5EF]/45 bg-transparent p-1 shadow-[0_0.5rem_1.5rem_rgba(36,53,38,0.08)] supports-backdrop-filter:bg-[#F7F5EF]/12 supports-backdrop-filter:backdrop-blur-xl",
            )}
          >
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="inline-flex size-9 items-center justify-center rounded-full text-[#243526] transition-colors hover:bg-[#EAE4D9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent
                side="right"
                data-lenis-prevent
                className="w-[calc(100vw-1.5rem)] border-[#EAE4D9] bg-[#F7F5EF] p-0 text-[#25291F] sm:w-[24rem]"
              >
                <div className="flex h-full flex-col overscroll-contain overflow-y-auto px-6 pb-8 pt-8 touch-pan-y">
                  <SheetTitle className="pr-10 font-heading text-3xl text-[#243526]">
                    OsmeKos
                  </SheetTitle>
                  <nav aria-label="Mobile navigation" className="mt-9 flex flex-col">
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="border-b border-[#243526]/10 py-4 text-base font-medium text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                    >
                      Home
                    </Link>

                    {desktopMenuKeys.map((menuKey) => {
                      const menu = megaMenus[menuKey];
                      const mobileItems = [
                        ...(menu.featured ? [menu.featured] : []),
                        ...menu.items,
                      ];

                      return (
                        <details key={menuKey} className="group border-b border-[#243526]/10">
                          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-medium text-[#243526] marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B] [&::-webkit-details-marker]:hidden">
                            {menu.trigger}
                            <ChevronDown
                              className="size-4 transition-transform duration-200 group-open:rotate-180"
                              aria-hidden="true"
                            />
                          </summary>
                          <div className="space-y-1 pb-4">
                            {mobileItems.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-xl px-3 py-2.5 text-sm text-[#77766C] transition-colors hover:bg-[#EAE4D9] hover:text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                              >
                                <span className="block font-medium text-[#25291F]">
                                  {item.title}
                                </span>
                                {item.description && (
                                  <span className="mt-0.5 block leading-relaxed">
                                    {item.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                            <Link
                              href={menu.footerLink.href}
                              onClick={() => setMobileOpen(false)}
                              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#243526] underline decoration-[#B7A06B] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                            >
                              {menu.footerLink.title}
                              <ArrowUpRight className="size-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </details>
                      );
                    })}

                    <Link
                      href={megaMenus.shop.href}
                      onClick={() => setMobileOpen(false)}
                      className="border-b border-[#243526]/10 py-4 text-base font-medium text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                    >
                      Shop Now
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchOpen(true);
                      }}
                      className="mt-2 inline-flex items-center gap-3 py-4 text-left text-base font-medium text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B]"
                    >
                      <Search className="size-4" aria-hidden="true" />
                      Search
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key="menu-backdrop"
              aria-hidden="true"
              className="fixed inset-0 -z-10 bg-[#243526]/20 backdrop-blur-[6px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: "easeOut" }}
              onPointerEnter={scheduleClose}
              onPointerDown={closeMenu}
            />
          )}
          {activeMenu && currentMenu && panelPosition && (
            <motion.section
              key="menu-panel"
              id="osmekos-mega-menu"
              aria-labelledby={"mega-menu-heading-" + activeMenu}
              data-lenis-prevent
              className="mega-menu-scrollbar fixed z-50 overscroll-contain overflow-x-hidden overflow-y-auto rounded-[1.75rem] border border-[#F7F5EF]/80 bg-[#F7F5EF]/95 p-5 shadow-[0_1.5rem_4rem_rgba(36,53,38,0.18)] touch-pan-y supports-backdrop-filter:bg-[#F7F5EF]/82 supports-backdrop-filter:backdrop-blur-xl sm:p-6"
              style={{
                top: panelPosition.top,
                left: panelPosition.left,
                width: panelPosition.width,
                maxHeight: panelPosition.maxHeight,
              }}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: "easeOut" }}
              onPointerEnter={clearCloseTimer}
              onPointerLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-5 top-5 inline-flex size-8 items-center justify-center rounded-full text-[#77766C] transition-colors hover:bg-[#EAE4D9] hover:text-[#243526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7A06B] sm:right-6 sm:top-6"
                aria-label="Close navigation panel"
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeMenu}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
                  transition={{ duration: reduceMotion ? 0.1 : 0.2, ease: "easeOut" }}
                >
                  <div className="border-b border-[#243526]/10 pb-5 pr-10">
                    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[#B7A06B]">
                      {currentMenu.eyebrow}
                    </p>
                    <h2
                      id={"mega-menu-heading-" + activeMenu}
                      className="mt-2 font-heading text-[2rem] leading-none text-[#243526]"
                    >
                      {currentMenu.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#77766C]">
                      {currentMenu.description}
                    </p>
                  </div>

                  <div className="pt-5">
                    {currentMenu.featured && (
                      <motion.div
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduceMotion ? 0.1 : 0.24,
                          delay: reduceMotion ? 0 : 0.04,
                          ease: "easeOut",
                        }}
                      >
                        <MenuFeature item={currentMenu.featured} onNavigate={closeMenu} />
                      </motion.div>
                    )}

                    <div
                      className={classes(
                        "divide-y divide-[#243526]/10",
                        currentMenu.featured ? "mt-4" : "-mt-1",
                      )}
                    >
                      {currentMenu.items.map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 7 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reduceMotion ? 0.1 : 0.24,
                            delay: reduceMotion ? 0 : 0.08 + index * 0.045,
                            ease: "easeOut",
                          }}
                        >
                          <MenuRow item={item} onNavigate={closeMenu} />
                        </motion.div>
                      ))}
                    </div>

                    <Link
                      href={currentMenu.footerLink.href}
                      onClick={closeMenu}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#243526] underline decoration-[#B7A06B] decoration-1 underline-offset-4 transition-colors hover:text-[#77766C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7A06B]"
                    >
                      {currentMenu.footerLink.title}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
