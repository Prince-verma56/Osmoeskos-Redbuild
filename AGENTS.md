<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## OsmeKos Project Guidelines
- **Project Identity**: This is an OsmeKos frontend project. Do not implement backend APIs or authentication.
- **Scope limit**: Only Hero, About, Product Details, and Ingredients are approved for the core landing-page implementation.
- **Design Inspiration**: Use Seed.com as inspiration, not as a template to copy.
- **Visual Tone**: Keep the design premium, minimal, botanical, editorial, and responsive.
- **UI Components**: Use shadcn/ui selectively rather than indiscriminately.
- **Imagery**: Do not repeat product imagery without a specific design reason.
- **Content Integrity**: Do not introduce dummy content or fake product claims. Never invent product benefits, customer testimonials, clinical statistics, or scientific results.
- **Architecture**: Preserve existing functionality and configuration. Avoid unnecessary dependencies, abstractions, and refactoring.
- **Standards**: Use semantic HTML, accessible interactions, and reduced-motion support.
- **Build Checks**: Check the production build after meaningful configuration changes.

## Phase 02 Visual Decisions
- **Hero Landscape**: Full-width continuous background image. Avoid separated card layouts.
- **Section Integrity**: Flowing transitions between sections with distinct palettes (Ivory, Muted Sage, Olive Green, Cream). Do not use repetitive styling.
- **Image Mapping**: All assets (`osmekos-hero-landscape`, `osmekos-about-lifestyle`, etc.) must be carefully matched to their designated sections without duplication.

## Phase 03 Decisions
- **Product Showcase**: Uses a premium botanical-green glassmorphism panel. Missing Asset: Authentic bottle cutout with transparent background (`/images/osmekos-bottle-cutout.png`). Uses a placeholder currently.
- **Formula Storytelling**: A flowing skin-and-cream layout (`#formula`) with parallax scroll. Missing Asset: Wide landscape cream texture background (`/images/osmekos-formula-bg.jpg`).
- **Animations**: GSAP used for scroll-triggered entry sequences and parallax. No Lenis duplication.
- **Brand Credit**: Added "Made by The Angaar Labs" footer linking to `https://labs.theangaarbatch.in/`.
- **Preloader**: Deferred until final stability.

## Phase 04 Decisions
- **Product Showcase Rebuild**: Removed the inaccurate Seed-branded asset in favor of a sleek, purely CSS-styled OsmeKos product placeholder (rounded pill with branding) to maintain context without misinformation.
- **Formula Storytelling Refinement**: Lightened the dark background gradient to preserve the organic cream texture's visibility and adjusted the CTA routing.
- **Route Architecture**: Replaced single-page anchors in navigation with true Next.js routes: `/` (Home), `/about` (Our Story), `/product/body-lotion` (Product), `/ingredients` (Ingredients), `/shop` (Shop), and `/search`.
- **Navigation Fix**: Added `scroll-padding-top` to `globals.css` to prevent fixed header overlap on the homepage. Moved `Navigation` and footer to `layout.tsx` for shared persistence.
- **Search Component**: Implemented a local, client-side search index on `/search` capable of filtering known pages and product details without a backend.

## Phase 05 Decisions — PERMANENT DESIGN RULES

### OsmeKos Visual Identity
**OsmeKos is a cream-led, editorial skincare brand. Warm ivory and cream are the dominant surfaces. Natural beige and skin tones provide photographic warmth. Soft sage provides secondary contrast. Deep botanical green is reserved for selected feature areas, calls to action, navigation accents, text, and details. Champagne gold is used sparingly. Never turn every homepage section or route page green.**

- **Color proportions (art-direction guidance):** 60–70% warm ivory/cream neutrals, 15–25% photography, 5–15% soft sage and muted olive, small accents of deep green and champagne gold.
- **Preloader:** Brief GSAP counter (0–100), restrained red accent (#C0392B) confined to the progress bar only. Slides up to reveal the hero. Only plays once per session (sessionStorage guard). Skipped with `prefers-reduced-motion`.
- **Section order (homepage):** Hero → About/Brand Story → Product Showcase → More Than a Lotion → Ingredients → Brand Credit.
- **Product Showcase:** Light cream/sage glassmorphism panel on warm neutral (#EAE4D9) background. NOT a dark green section.
- **Formula Storytelling:** Cream texture image visible through a gentle warm overlay. Left side headline + CTA, right side ivory glass card with benefits.
- **Authentic product asset:** The bottle placeholder uses a CSS shape. Replace with a transparent PNG/WebP asset at `/images/osmekos-bottle-cutout.png` when available. Never use Seed-branded or third-party imagery.
- **Ingredient images:** Four distinct images, one per ingredient (`ingredient-shea-butter.jpg`, `ingredient-coconut-oil.jpg`, `ingredient-niacinamide.jpg`, `ingredient-vitamin-e.jpg`). Never reuse across entries.

### Route Map
| Route | Page | Notes |
|---|---|---|
| `/` | Homepage | Full landing page |
| `/about` | Our Story | Editorial brand story |
| `/product/body-lotion` | Product Detail | Two-column layout, no fake commerce |
| `/ingredients` | Ingredients | Four ingredients + ceramide panel |
| `/shop` | Shop | Single-product collection, no invented catalog |
| `/search` | Search | Client-side local index, no backend |

### Animation Rules
- GSAP (`@gsap/react` / `useGSAP`) for section reveals and the preloader timeline.
- Motion (Framer Motion) for micro-interactions only.
- Lenis for smooth scrolling via `SmoothScrollProvider` — only one instance.
- Respect `prefers-reduced-motion` everywhere.
- No animation that blocks navigation.

### Accessibility
- Keyboard-navigable navigation, visible focus rings.
- Proper semantic heading hierarchy per page.
- `scroll-padding-top: 6rem` on `html` for anchor offset.
- Navigation wraps all pages via `app/layout.tsx`.

## Phase 07 Decisions — Navigation and Mega-Menus

- **Desktop mega-menu:** The shared navigation uses left-aligned, fixed-position disclosure panels measured from the header shell. Panels must stay within the viewport, preserve the current page behind them, and scroll independently when content exceeds the available height. Use `data-lenis-prevent` and contained overscroll for panel scrolling so Lenis never moves the page in place of the menu.
- **Header surface:** Keep the homepage header transparent across the full hero, including when a mega-menu is open, with the wordmark and route controls grouped left and the search/Shop action held right. The hero may use a subtle frosted treatment around only the right-side action group for contrast. Apply the warm-ivory glass surface after scrolling or on non-home routes.
- **Approved menu content:** Home and Search navigate directly. Our Story, Product, Ingredients, and Shop Now reveal OsmeKos-specific contextual menus. Shop remains a single-product experience: never add prices, discounts, variants, or invented products.
- **Valid destinations:** Story links use `/about#philosophy` and `/about#formulation-philosophy`; Product formula links use `/#formula`; all other navigation uses the established route map.
- **Interaction model:** Desktop supports hover with a short close grace period, click-to-toggle, outside-click dismissal, and Escape. Mobile uses the existing Sheet with compact native disclosure groups that close after navigation.
- **Motion and accessibility:** Use Motion only for restrained UI transitions (approximately 200–250ms) and remove positional/staggered motion with `prefers-reduced-motion`. Keep disclosure buttons, direct links, focus rings, and `aria-expanded` states semantic and keyboard-accessible.
- **Menu art direction:** Use a translucent warm-ivory, softly blurred, cream-led surface with sage highlights and restrained gold details. Menu imagery must be authentic OsmeKos imagery or the four dedicated ingredient assets. Never use Seed branding, Seed imagery, or the Seed-branded `osmekos-bottle-cutout.jpg` asset.

## Phase 09 Decisions — Motion System, Spacing & Responsive Audit

### Root-cause fix: content stuck invisible (empty formula panel + large mobile blank)
- **Cause:** Section reveals used `gsap.from(..., {opacity:0})` with ScrollTrigger while Lenis ran its own rAF loop and never updated/refreshed ScrollTrigger. Trigger positions were measured before fonts/images settled, so the Product Showcase and the Formula benefits panel could be left permanently at `opacity:0` — read as a "large blank" and an "empty translucent panel".
- **Fix:** `SmoothScrollProvider` now integrates Lenis with ScrollTrigger: `lenis.on("scroll", ScrollTrigger.update)`, GSAP's ticker drives `lenis.raf` (one rAF loop, not two), and `ScrollTrigger.refresh()` runs on `document.fonts.ready` and window `load`. All section reveals use `once: true` and `autoAlpha`, so content is revealed a single time and never re-hidden on scroll-up.

### Animation responsibilities (reaffirmed, now centralized)
- **Plugin registration:** single source in `lib/animations/gsap.ts`. Components import `{ gsap, ScrollTrigger }` from it — no per-component `registerPlugin`.
- **Reusable reveal:** `lib/animations/reveal.ts` exports `prefersReducedMotion()` and `reveal(targets, { trigger, y, x, duration, stagger, start, delay })` — a fade+rise entrance that plays once. Keep this minimal; do not grow it into a framework.
- **GSAP + ScrollTrigger:** section entrances, staggers, and the one scrubbed parallax (formula background). **Motion (Framer):** menu/search overlay + micro-interactions only. **Lenis:** smooth scroll via the single provider instance. Never let GSAP and Motion animate the same element's transform/opacity.
- **Reduced motion:** every GSAP block returns early via `prefersReducedMotion()`, leaving server-rendered content fully visible. Reduced motion also skips Lenis (native scroll) but still refreshes ScrollTrigger.

### Reusable scroll-reveal patterns in use
- Hero: on-mount timeline (no ScrollTrigger — it is above the fold) staggering the eyebrow → headline → paragraph → CTA group; completes under the preloader on first visit, so no duplicate reveal.
- About / home Ingredients: `reveal()` on media + staggered content/cards.
- Product Showcase / Formula: scoped `useGSAP` timelines with `once: true`.

### Typography
- Keep **Cormorant Garamond** (display/headings) + **DM Sans** (body/UI). Do not swap font families again.
- Centralized `clamp()` tokens live in `globals.css` under `@layer components`: `.type-display`, `.type-page-title`, `.type-section-title`, `.type-eyebrow`, `.type-body`. All four route H1s use `.type-page-title` for a consistent hierarchy.

### Spacing / responsive
- Mobile whitespace between stacked sections was trimmed at the source (About mobile `pt-28/pb-24`, Formula mobile `py-24` + `min-h-[40rem]`) while the desktop layered/curved overlap (negative margins + rounded bottoms) is preserved. Do not paper over gaps with arbitrary negative margins or filler content.

### Correctness fixes
- Formula section background corrected from off-token `#263526` to `#243526`; SVG wave fills changed from hardcoded `#f7f5ef` to `fill="var(--background)"`.
- `/search` route now imports `filterSearchResults` from `lib/search-data` (single source) instead of a divergent inline index.
- Search overlay backdrop gets `data-lenis-prevent` + `overscroll-contain` so the page behind it does not scroll.
- Hero background image uses `priority` (LCP) rather than `loading="eager"`.

### Verified
- `tsc --noEmit` clean; `eslint` clean; production build (`next build`) prerenders all 7 routes as static; all 6 routes serve HTTP 200 in dev.
- **Not visually verified in a browser this phase** (no browser automation available in the environment). Recommended manual QA: homepage scroll reveals, formula panel visibility, mobile (390/375/320px) spacing between About → Product → Formula, mega-menu + search overlay interactions.

### Known / unresolved
- Missing authentic assets still outstanding: transparent bottle cutout (`/images/osmekos-bottle-cutout.png`), wide formula texture (`/images/osmekos-formula-bg.jpg` placeholder in use). Do not substitute third-party/Seed imagery.
- The preloader progress bar intentionally uses the restrained red `#C0392B` (Phase 05 permanent rule) — not a bug; do not "brand-correct" it.
- `megaMenus.shop` keeps only its `href`/`trigger` in use (Shop Now is a direct CTA, not a flyout); its `featured`/`items` are unused by design.
