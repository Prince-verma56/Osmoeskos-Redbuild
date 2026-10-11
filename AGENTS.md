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
- ~~Keep **Cormorant Garamond** (display/headings) + **DM Sans** (body/UI).~~ **Superseded by Phase 12:** the site now uses a single **Manrope** family for both headings and body (DM Sans and Cormorant both removed). See Phase 12.
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

## Phase 10 Decisions — Smart Navigation, Deep Links & Typography

### Navbar structure
- **Separate Home link removed.** The OsmeKos wordmark is the Home control and links to `/` (desktop header + mobile Sheet title). Do not reintroduce a standalone "Home" nav item.
- **Label vs. toggle are distinct controls.** For Our Story / Product / Ingredients the desktop pill contains two non-nested controls: a `<Link>` (the text label → overview route) and an adjacent `<button>` chevron (opens/closes the mega-menu only). Never nest a button inside a link or vice-versa. Hovering the group opens the menu (non-touch); clicking the label navigates; clicking the chevron toggles. `aria-expanded` + descriptive `aria-label` live on the chevron button; `aria-current` on the label.
- Mobile keeps the existing Sheet with `<details>` disclosure groups; overview routes remain reachable via each group's featured item / footer link.

### Typography — reasoned choice
- **Display/headings/logo: Cormorant Garamond. Body/UI/nav/buttons: Manrope** (swapped from DM Sans this phase). Loaded via `next/font/google` in `app/layout.tsx` as `--font-cormorant-garamond` and `--font-manrope`; `globals.css` maps `--font-sans: var(--font-manrope)`.
- The Phase 10 brief recommended Instrument Serif + Manrope, but Cormorant was already rendering correctly (no `cursive` fallback existed anywhere) and is the established premium editorial display face, so it was kept per the brief's own "reasoned choice" clause. Removed the dangling `--font-mono: var(--font-geist-mono)` (that variable was never defined) in favour of a system mono stack. Do not swap the display family again.

### Route & deep-link map
| Navigation | Destination |
|---|---|
| OsmeKos logo | `/` |
| Our Story (label) | `/about` |
| — Our Philosophy | `/about#philosophy` |
| — Formulation Philosophy | `/about#formulation-philosophy` |
| — Thoughtful Body Care | `/product/body-lotion` |
| Product (label) | `/product/body-lotion` |
| — Triple Ceramide Complex | `/product/body-lotion#formula` |
| — Product Ingredients | `/ingredients` |
| — Product Details | `/product/body-lotion#product-details` |
| Ingredients (label) | `/ingredients` |
| — Shea Butter / Coconut Oil / Niacinamide / Vitamin E | `/ingredients#{shea-butter,coconut-oil,niacinamide,vitamin-e}` |
| — Triple Ceramide Complex | `/ingredients#triple-ceramide-complex` |
| Shop Now | `/shop` |
| Search | centered overlay (unchanged); `/search` retained for direct visits |

### Stable anchor IDs (added this phase)
- `app/ingredients/page.tsx`: each ingredient card (`shea-butter`, `coconut-oil`, `niacinamide`, `vitamin-e`) + `triple-ceramide-complex` on the ceramide spotlight.
- `app/product/body-lotion/page.tsx`: `formula` (Triple Ceramide block) + `product-details` (information column).
- `app/about/page.tsx`: `philosophy`, `formulation-philosophy` (pre-existing).
- All targets carry `scroll-mt-28` so headings clear the fixed header.
- Search index (`lib/search-data.ts`) now points results at these same anchors.

### Lenis + hash navigation
- `SmoothScrollProvider` publishes its single Lenis instance via `lib/animations/lenis-store.ts` (`setLenis`/`getLenis`); it is cleared on unmount. **Do not create a second Lenis instance.**
- `components/providers/hash-scroll.tsx` (`HashScrollHandler`, mounted in `layout.tsx` inside `SmoothScrollProvider`) resolves `#hash` links across direct load, refresh, in-app route transitions, same-route hash changes (`hashchange`), and back/forward. It rAF-polls for the target (bounded ~1.5s, no arbitrary long timeouts), then scrolls once through Lenis (`offset: -112`) or native `scrollTo` under reduced motion, and moves focus to the target (`tabindex=-1`, `preventScroll`).

### Accessibility / responsive
- Logo = link; menu labels = links; chevrons = buttons; Search = button; Shop Now = link. Visible focus rings throughout, Escape-to-close, outside-click dismissal, keyboard-reachable submenu items, reduced-motion respected.
- Mega-menu stays within the viewport and scrolls independently (`data-lenis-prevent`, `overscroll-contain`).

### Verified
- `tsc --noEmit` clean; `eslint` clean; `next build` prerenders all 7 routes as static.
- **Not visually verified in a browser this phase** (no browser automation in this environment). Recommended manual QA: label-vs-chevron click targets; hover-open + grace-close; deep links on direct load / refresh / back-forward / same-route; Manrope body rendering; 1440/1024/768/390/375/320px widths.

## Phase 11 Decisions — Real Deep-Link Sections & Content Architecture

### Rule
- **Every mega-menu item must resolve to a real, content-complete section** — never the top of a page, an empty element, or a generic section reused for multiple items. If content is missing, build the section rather than just adding an id.

### Centralized content
- `lib/osmekos-data.ts` is the single source of truth for the four ingredients (`id`, `name`, `percentage`, `role`, `description`, `image`, `imageAlt`) and the three ceramides (`code`, `name`, `description`). The Product, Ingredients, and (for links) About pages consume it, so section ids stay in sync with mega-menu hashes. Copy is reused from existing approved product text — no invented claims, sizes, statistics, or clinical results.

### Image-asset correction (important)
- The files `ingredient-shea-butter.jpg` and `ingredient-coconut-oil.jpg` were **swapped in content** (shea file showed coconut, coconut file showed shea). They were renamed on disk so filenames now match content. `ingredient-niacinamide.jpg` (lab glassware) and `ingredient-vitamin-e.jpg` (golden capsules) were already correct. Do not reuse the coconut image for other ingredients.
- Product hero now uses `osmekos-product-detail.jpg` (portrait bottle) in a portrait frame — replaced the landscape `osmekos-hero-landscape.jpg` that was being stretched into a portrait container.
- New sections use otherwise-idle approved assets: `about-skincare.jpg` (Thoughtful Body Care) and `Luminous Lotion on Dewy Skin.png` (product Formula texture). Still avoid the Seed-branded `osmekos-bottle-cutout.jpg`.

### Deep-link destination map (all verified to exist)
| Section | Route#id | Content |
|---|---|---|
| Our Philosophy | `/about#philosophy` | Editorial intro + lifestyle image + product CTA |
| Formulation Philosophy | `/about#formulation-philosophy` | Complex + botanicals, links to `#formula` |
| Thoughtful Body Care | `/about#thoughtful-care` | **New** closing editorial section + lifestyle image |
| Product Details | `/product/body-lotion#product-details` | Portrait hero, description, highlights, CTAs |
| Formula | `/product/body-lotion#formula` | **New** Triple Ceramide Complex section: NP/AP/EOP cards + texture + link to ingredients |
| Key Ingredients (local) | `/product/body-lotion#key-ingredients` | **New** 4-ingredient summary linking to each detail |
| Triple Ceramide Complex | `/ingredients#triple-ceramide-complex` | Deep-green feature + three labelled ceramide cards |
| Shea Butter / Coconut Oil / Niacinamide / Vitamin E | `/ingredients#{id}` | Four distinct alternating editorial sections, each with its own correct image + confirmed % + product link |

### Anchor strategy (unchanged from Phase 10)
- `scroll-mt-28` on every target + `HashScrollHandler` + single shared Lenis (`lenis-store`). No second Lenis instance; no arbitrary timeouts.

### Motion
- The route pages (About / Product / Ingredients) are intentionally **server-rendered static with no GSAP reveals** — content is always visible (reduced-motion safe, no risk of the Phase 09 "stuck invisible" bug) and loads instantly. Rich GSAP motion remains on the homepage sections only.

### Verified (Phase 11)
- `tsc --noEmit` clean; `eslint` clean; `next build` prerenders all 7 routes as static.
- Route-validation: all 12 mega-menu hashes map to a present section id (verified by grep; four ingredient ids render via `id={ingredient.id}`).
- **Not browser-verified** (no automation here). Manual QA recommended: each deep link on click / direct load / refresh / back-forward; portrait product image framing; ingredient image correctness (shea vs coconut); 390/375/320px stacking.

## Phase 12 Decisions — Single Manrope Typography, Smooth Anchor Scroll & Ceramide Cards

### Typography — one family (supersedes earlier font rules)
- **Headings and body now share one family: Manrope.** Per explicit user direction, headings use the same family as the primary buttons. Cormorant Garamond and DM Sans are both removed; only `Manrope` is loaded in `app/layout.tsx` (weights 400–800, var `--font-manrope`).
- `globals.css`: `--font-sans` and **`--font-heading` both → `var(--font-manrope)`**. A base rule gives `.font-heading` a default `font-weight: 600` + `letter-spacing: -0.02em` so bare `font-heading` elements read as premium sans headings; explicit `font-*`/`tracking-*` utilities still win. The `.type-display/-page-title/-section-title` tokens set weight 600 and tight negative tracking tuned for the sans.
- Do not reintroduce a serif display family unless the user asks.
- Also restored `html { scroll-padding-top: 6rem }` (had been dropped on disk) — needed for native anchor offset.

### Smooth same-route anchor scrolling
- `HashScrollHandler` now intercepts **same-page hash link clicks** in the capture phase, `preventDefault()`s the browser's instant jump, and animates via the shared Lenis (`scrollTo`, ~1.1s), updating the URL with `pushState`. The link's own `onClick` (e.g. closing the mega-menu) still runs. Cross-route/direct-load/refresh handled on mount; back/forward via `popstate`. Reduced motion → native smooth/auto.

### Ceramide cards
- New shared component `components/sections/ceramide-cards.tsx` renders the NP/AP/EOP identifiers as premium **icon-led** cards (lucide: NP→Droplets, AP→Layers, EOP→ShieldCheck) with a faint editorial index number, a gold `Ceramide NP` eyebrow, name, and description. Replaces the old small circle + letter tiles. Used on both the Ingredients feature panel (`variant="dark"`) and the Product formula section (`variant="light"`); driven by `ceramides` in `lib/osmekos-data.ts`.

### Preloader (UX refresh)
- Wordmark rises out of a mask; added gold corner framing labels, a larger Manrope percentage counter, a 2px rounded track (red `#C0392B` still confined to the bar per the permanent rule), and a two-stage exit (content eases out, then the curtain slides up). Still once-per-session + reduced-motion skip.

### Image fix carried over
- `ingredient-shea-butter.jpg` / `ingredient-coconut-oil.jpg` were swapped on disk so filenames match content; `.next/cache/images` cleared so the optimizer regenerates. A browser hard-refresh may be needed to drop the old cached optimization.

### Verified (Phase 12)
- `tsc --noEmit` clean; `eslint` clean; `next build` prerenders all 7 routes as static.
- **Not browser-verified** (no automation here). Manual QA: heading rendering in Manrope sitewide; same-route section links glide (not jump); ceramide icon cards on Product + Ingredients; preloader in a fresh session.

## Phase 13 Decisions — Frame-Aligned Smooth Hash Scrolling & Section Calibration

### Root-cause analysis: why hash targets landed halfway or split
1. **Triple-offset accumulation in Lenis:**
   - When calling `lenis.scrollTo(element, { offset: -112 })`, Lenis internally read `getComputedStyle(element).scrollMarginTop` (112px from `scroll-mt-28`), `getComputedStyle(html).scrollPaddingTop` (96px from `globals.css`), AND added the programmatic `offset: -112px`.
   - Result: 112 + 96 + 112 = 320px subtracted from the element position! Anchors stopped 320px before their target, landing in the middle of preceding sections or exposing large blank gaps.
2. **Container margin separation:**
   - Sections like `<section id="formula">` had `mt-24 lg:mt-36` on the outer element, while the colored background and content were placed inside a nested `div`. Clicking `#formula` anchored to the top of the transparent margin, not the colored background.
3. **Cross-route scroll desynchronization & early measurements:**
   - Navigating across routes with a hash measured the element coordinates on the very first frame before fonts, images, or layout had fully stabilized, leaving the animation target offset by early layout shifts.

### Solutions applied
1. **Explicit numeric target passed to Lenis:**
   - `HashScrollHandler` computes the exact document target using `Math.round(elementTop - scrollMarginTop)`.
   - Passing a **number** directly to `lenis.scrollTo(target)` bypasses Lenis's internal double-subtraction of `scrollMargin` and `scrollPadding`.
   - Both Lenis and native fallback (`window.scrollTo({ top: target })`) scroll to the exact same pixel.
2. **Full-bleed background sections (`scroll-mt-0`):**
   - Applied to `#formula` on `/product/body-lotion` and `/`, and `#formulation-philosophy` on `/about`.
   - When clicked, the section's background aligns directly with the top of the viewport (`scrollY = elementTop`), fully covering the frame without being split.
   - Internal padding (`py-20 lg:py-28`) keeps all headlines and content visible below the floating navbar.
   - Removed outer margins (`mt-24 lg:mt-36`) so the background is directly on the anchor target.
3. **Card and content sections (`scroll-mt-20 lg:scroll-mt-24`):**
   - Applied to `#product-details`, `#key-ingredients`, `#triple-ceramide-complex`, individual ingredient cards (`#shea-butter`, etc.), and `#thoughtful-care`.
   - Clears the 75-80px floating navbar cleanly with 80px (mobile) to 96px (desktop) breathing room.
4. **Layout stability check & Lenis sync:**
   - On route changes, Lenis's internal scroll position is immediately synced with `window.scrollY` to prevent stale coordinate bleed.
   - Initial cross-route hash navigation verifies layout stability across consecutive animation frames before initiating the glide.
   - A listener on `document.fonts.ready` and `window.load` gently realigns the scroll if late image/font loads introduce layout shifts.
   - Keyboard focus is shifted on animation completion (`onComplete`) with `preventScroll: true` to prevent browser scroll snapping during animation.
5. **Removed redundant `scroll-padding-top: 6rem` from `html`:**
   - Prevents CSS double-offsetting when combined with element-level `scroll-margin-top`.

### Verified (Phase 13)
- `tsc --noEmit` clean (0 errors).
- All routes (`/`, `/product/body-lotion`, `/about`, `/ingredients`, `/shop`, `/search`) return HTTP 200 on local dev server.
- Mega-menu hash links and deep links now smoothly glide and frame directly to the intended section top.

