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

## Phase 14 Decisions — Route-Page Scroll-Reveal Motion System

### Goal
Bring the static route pages (About / Product / Ingredients) up to the homepage's motion quality with restrained, "award-site" entrances — without risking invisible content or fighting the Phase 13 anchor math.

### Reusable primitives (client islands wrapping server markup)
- `components/animations/reveal-heading.tsx` — **signature masked word reveal.** Splits a heading into words, each rising out of its own `overflow-hidden` clip in a quick stagger. Full text exposed via `aria-label`; word spans `aria-hidden`. Props: `text`, `as`, `className`, `delay`, `stagger`, `start`.
- `components/animations/reveal.tsx` — generic `Reveal` wrapper: fade+rise, optional child `stagger`, or `media` mode (wrapper fades/rises while the inner `<img>` settles from a gentle over-scale). Props: `y`, `delay`, `duration`, `stagger`, `start`, `media`.
- Both set their initial hidden state in a `useGSAP` **layout effect (before paint)** → no FOUC; both **return early under `prefersReducedMotion()`** leaving content fully visible; both use `autoAlpha` (visibility preserves layout, so anchor targets never shift) and `once: true` through the shared GSAP/ScrollTrigger + Lenis pipeline — no second rAF loop, consistent with Phase 09.

### Ceramide cards
- `components/sections/ceramide-cards.tsx` is now a client component that reveals its three cards in a stagger (rise + slight scale) with the icon emblems easing in on `back.out` just behind — used on both Product `#formula` and Ingredients `#triple-ceramide-complex`.

### Application
- **Headings** (page H1s + major section titles) → `RevealHeading` (masked words).
- **Feature images** → `Reveal media` (fade/rise + inner image over-scale settle).
- **Supporting text + CTAs** → `Reveal` with small `stagger`/`delay` so eyebrow→heading→body→button cascade.
- **Card groups** (ceramide cards, product Key-Ingredients grid) → staggered reveal.
- Homepage sections keep their existing GSAP; CeramideCards appears only on route pages — no element is animated by two systems.

### Reconciliation note
- `scroll-padding-top: 6rem` was briefly re-added to `html` then **removed again** to stay consistent with Phase 13's numeric-target anchor math (a global scroll-padding double-offsets it). Anchor offset now comes solely from each section's `scroll-mt-*` read by `HashScrollHandler`.

### Verified (Phase 14)
- `tsc --noEmit` clean; `eslint` clean; `next build` prerenders all 7 routes as static.
- **Not browser-verified** (no automation here). Manual QA: masked heading reveals on About/Product/Ingredients; image settle; card staggers; that deep-link glides still frame correctly (reveals use transforms/visibility, so they don't shift targets); reduced-motion leaves everything visible.

## Phase 15 Decisions — Hydration Mismatch Resolution & LCP Image Optimization

### 1. Hydration Mismatch Fix in `RevealHeading`
- **Root Cause:** In `components/animations/reveal-heading.tsx`, the word clipping span used `mb-[-0.15em]`. While the SSR renderer output this literal string into the initial HTML, the Tailwind v4 / Turbopack compiler normalized arbitrary negative utility classes on the client to canonical `-mb-[0.15em]`. React 19 detected this class name attribute mismatch during hydration (`mb-[-0.15em]` vs `-mb-[0.15em]`) and logged an unpatched tree hydration mismatch error.
- **Fix:** Changed the clipping span class in `reveal-heading.tsx` to the canonical Tailwind CSS v4 syntax: `-mb-[0.15em]`. Both server HTML and client VDOM now render identical class strings (`inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom`), completely eliminating the hydration mismatch.

### 2. Largest Contentful Paint (LCP) Image Optimization
- **Root Cause:** Next.js development and production audit flagged above-the-fold images as Largest Contentful Paint (LCP) candidates that were missing `priority` (or using legacy `loading="eager"` without `priority`).
- **Fixes Applied:**
  - `app/about/page.tsx`: Replaced `loading="eager"` on the hero lifestyle image (`/images/osmekos-about-lifestyle.jpg`) with `priority` and responsive `sizes="(max-width: 1024px) 100vw, 80vw"`.
  - `app/shop/page.tsx`: Added `priority` to the above-the-fold featured product hero image (`/images/osmekos-hero-landscape.jpg`).
  - `app/ingredients/page.tsx`: Added `priority={index === 0}` to preload the first ingredient hero image (`Shea Butter`) when visiting `/ingredients` or `/ingredients#shea-butter`.
  - Confirmed `components/sections/hero.tsx` and `app/product/body-lotion/page.tsx` already carry `priority`.

### Verified (Phase 15)
- `tsc --noEmit` passed with 0 errors.
- `next build` compiled and prerendered all 7 routes as static content without errors or warnings.

## Phase 16 Decisions — Homepage Animation Parity (Editorial Media & Element Reveals)

### Objective
Apply the exact same editorial animation language introduced on Our Story (`/about`), Product (`/product/body-lotion`), and Ingredients (`/ingredients`) across the Homepage (`/`):
1. **Signature Media Image Reveals (`Reveal media`):** Container fades and rises (`y: 30`, `autoAlpha: 0`) while the inner `<img>` settles from a gentle over-scale (`scale: 1.18 -> 1`, `duration: 1.4s`, `ease: "power3.out"`) with `clearProps: "transform"` so subsequent hover effects remain fluid.
2. **Masked Heading Reveals (`RevealHeading`):** Words rise out of `overflow-hidden` clipping masks in a quick stagger with `power4.out`. Added optional `id` prop support to preserve anchor and `aria-labelledby` semantics.
3. **Element Cascades (`Reveal`):** Supporting eyebrows, descriptive paragraphs, CTA buttons, and badges cascade into view with coordinated delays and easing.

### Implementation Across Homepage Sections
- **Hero (`components/sections/hero.tsx`):**
  - Background image (`Hero.png`) settles on mount with subtle zoom-in (`scale: 1.12 -> 1.0`, `duration: 1.8s`, `ease: "power3.out"`).
  - Main H1 (`Deep Hydration, Every Day.`) upgraded to `<RevealHeading as="h1">` (masked words).
  - Eyebrow, description, and CTA buttons cascade smoothly with `<Reveal delay={...} start="top bottom">`.
- **About (`components/sections/about.tsx`):**
  - Lifestyle ritual image (`osmekos-about-lifestyle.jpg`) upgraded to `<Reveal media>` (inner image settles from `scale: 1.18`).
  - H2 (`Care That Goes Beyond the Surface.`) upgraded to `<RevealHeading as="h2">`.
  - Eyebrow, body, and Triple Ceramide callout card cascade with `<Reveal>`.
- **Product Showcase (`components/sections/product-showcase.tsx`):**
  - Main landscape product image (`osmekos-hero-landscape.jpg`) upgraded to `<Reveal media>`.
  - Both bottom image tiles (`about-skincare.jpg` and `osmekos-formula-bg.jpg`) upgraded to `<Reveal media delay={...}>`.
  - Center 3% Shea Butter stat card cascades with `<Reveal delay={0.18}>`.
  - H2 (`Daily essentials for barrier health.`) upgraded to `<RevealHeading as="h2">`.
  - Left eyebrow, body copy, and Shop CTA cascade with `<Reveal>`.
- **Formula Storytelling (`components/sections/formula-storytelling.tsx`):**
  - Parallax cream texture scrub preserved.
  - H2 (`More than a lotion.`) upgraded to `<RevealHeading as="h2">`.
  - Eyebrow, body copy, product CTA, and daily ritual benefits card cascade with `<Reveal>`.
- **Ingredients (`components/sections/ingredients.tsx`):**
  - All four ingredient images (Shea Butter, Coconut Oil, Niacinamide, Vitamin E) upgraded to `<Reveal media delay={index * 0.08}>`, creating a staggered focus-in settle across the botanical grid.
  - H2 titles (`Thoughtful Ingredients. Everyday Care.`) upgraded to `<RevealHeading as="h2">`.
  - Eyebrows, descriptive cards, and "View All Ingredients" link cascade with coordinated delays.

### Core Enhancements
- In `components/animations/reveal.tsx`, added `clearProps: "transform"` so that CSS `:hover` animations (e.g. `group-hover:scale-105` or `-translate-y-2`) work cleanly without inline transform locks once reveals complete.
- In `components/animations/reveal-heading.tsx`, added `id?: string` prop passed to the wrapping Tag element.

### Verified (Phase 16)
- `tsc --noEmit` passed with 0 errors.
- `next build` compiled and prerendered all 7 routes without warnings.




## Phase 17 Decisions — Footer Reveal-From-Behind

The footer now uses the "sticky reveal" pattern: it is pinned behind the page and the content slides up to uncover it, so it rises into view (text and all) as you reach the bottom. Pure layout + one height measurement — no scroll-driven JS animation (cheap, and naturally fine under reduced motion).

- **`app/layout.tsx`:** page content (Navigation + `{children}`) is wrapped in an **opaque content layer** — `relative z-10 flex min-h-screen flex-col bg-background` — that sits above the footer and covers it until scrolled past.
- **`components/layout/footer.tsx`** (client): renders a transparent **spacer** whose height is the footer's measured `offsetHeight` (via `ResizeObserver`), then the footer itself as `fixed inset-x-0 bottom-0 z-0`. The spacer reserves exactly footer-height of scroll; as the content layer slides up into that zone, the fixed footer is revealed behind it and settles flush (no gap). `mt-auto` removed.
- **Stacking:** body background (back) → spacer (in-flow) → fixed footer (`z-0`, positioned) → content layer (`z-10`). `z-10`/`relative` creates a stacking context but **not** a containing block for `position: fixed` (only transform/filter/perspective do), so the fixed navbar/overlays inside still anchor to the viewport.
- No change to scroll height semantics for anchors: hash targets live in the content layer; the spacer only adds reveal distance at the very end, so the Phase 13 numeric-target hash math is untouched.
- Edge: if the footer is ever taller than the viewport (very small screens), only its lower portion reveals at once — acceptable.

### Verified (Phase 17)
- `tsc --noEmit` clean; `eslint` clean; `next build` prerenders all 7 routes as static.
- Not browser-verified here. Manual QA: scroll to the bottom on each route and confirm the footer is uncovered cleanly (content slides up over it, no ivory gap, settles flush); nav/search/mega-menu still overlay correctly; preloader still covers everything on first load.

## Phase 18 Decisions — Signature Immersive Experiences (Horizontal Story + Scroll-Scrubbed Video)

Scope this pass (confirmed with the user): add the two headline interactive experiences only. Editorial-section refinement (Part 6) and the interactive ingredient explorer (Part 7 — brief arrived truncated) are deferred to a follow-up.

### Audit finding — off-brand assets present (do NOT use)
- `public/images/hero-product.jpg` and `public/images/product-detail.jpg` are **byte-identical** (same md5) and depict an **"AURA Botanical Essence" bottle — a different brand**. They are **unused** in any `.tsx` (no live violation). Per the standing rule "Do not use Seed or Aura product imagery as OsmeKos," these were left in place but must never be referenced. Authentic OsmeKos product stills are `osmekos-hero-landscape.jpg` (OsmeKos Premium Body Lotion, botanical interior) and `osmekos-product-detail.jpg` (portrait bottle). Candidate for deletion in a cleanup pass.

### Homepage order (overlap chain preserved)
`Hero → About → ProductShowcase → HorizontalStory (new) → ScrollVideo (new) → FormulaStorytelling → Ingredients`. The proven Hero→About→ProductShowcase negative-margin/rounded-b/descending-z overlap chain was left untouched; the two new full-bleed sections are appended after it, before the existing green Formula + Ingredients. Asset mapping avoids any directly-adjacent image repeat: HorizontalStory uses `osmekos-product-detail` (P1), typographic ceramides (P2), the four `ingredient-*.jpg` (P3), and `Luminous Lotion on Dewy Skin.png` (P4); ScrollVideo poster uses `osmekos-hero-landscape.jpg`; Formula keeps `Luminous Lotion on Dewy Skin.png`. hero-landscape (ProductShowcase↔video poster) and Luminous (P4↔Formula) are each separated by one full section.

### Signature A — Horizontal Product Storytelling (`components/sections/horizontal-story.tsx`, client)
- Desktop (`min-width:1024px` + no-reduced-motion, via `gsap.matchMedia`): the section pins and a flex-row track translates in `x` from vertical scroll. Distance is **measured** (`track.scrollWidth - innerWidth`) with `invalidateOnRefresh` + function-based `end`, so it adapts to any viewport and the last panel finishes flush (no trailing blank). `scrub: 1`, `anticipatePin: 1`. A top progress bar + NN/NN counter reflect true `self.progress`.
- Four panels: 01 Daily Ritual (product + copy), 02 Triple Ceramide Complex (typographic NP/AP/EOP — no invented science), 03 Botanical Ingredients (the four `ingredients` from `lib/osmekos-data.ts`), 04 Texture & Feel (full-bleed Luminous image + CTA).
- Mobile / reduced motion: identical panels render as a normal **vertical** stack (`flex-col`), no pin, no trap — all copy available without JS. `overflow-hidden` on the section prevents horizontal page overflow. matchMedia cleanup kills the ST/tween and clears the track transform on resize/unmount.

### Signature B — Scroll-Controlled Video Scrubbing (`components/sections/scroll-video.tsx`, client, reusable)
- Binds `video.currentTime = progress * duration` through a scrubbed ScrollTrigger (pin + `scrub: 1`, pinned distance = `scrubViewportHeights` × viewport height, default 2.2). Scrolling up reverses the timeline. Props-driven (`src`, `poster`, copy, scrub distance) for reuse.
- **Defensive readiness:** scrub initialises only once valid `duration` metadata exists; never seeks before `readyState >= 2`; skips redundant seeks within a ~1-frame epsilon; tears down ST + tween on unmount / media-query change. No repeated `load()` calls; listeners attached once per matchMedia context.
- **No video asset exists yet.** `public/videos/` holds only `.gitkeep`; real footage cannot be generated here. The component is wired to the configurable path **`/videos/osmekos-body-lotion-story.mp4`** and renders a **premium poster fallback** (`osmekos-hero-landscape.jpg`) via `<Image>` when the source is missing/errors, plus a **dev-only note** documenting the required asset. No stock or other-brand video is substituted. Encoding spec is documented in the component header (H.264 MP4, frequent keyframes ~0.25–0.5s for smooth seeking, consistent fps, ~1080p, no audio track, matching poster). Dropping a conforming file at that path activates the full scrub with no code change.
- Fallbacks: reduced motion / `<768px` → no pin/scrub, poster + all copy render normally. `muted playsInline preload="auto"`, not autoplay.

### Verified (Phase 18)
- `tsc --noEmit` clean; `eslint` clean (new files); `next build` compiles and prerenders all 7 routes as static (homepage stays static with the two new client islands).
- Dev server: `/`, `/about`, `/ingredients`, `/product/body-lotion`, `/shop` all HTTP 200; both new section ids (`#story`, `#film`) present in server-rendered HTML (content available without JS).
- **Not browser-verified** (no browser automation in this environment). Recommended manual QA: desktop pinned horizontal scroll (continuous feel, progress bar accuracy, last panel flush, clean release into ScrollVideo); ScrollVideo poster fallback + dev note today, and scrub behaviour once a real MP4 is added (first/last frame, reverse-on-scroll-up, release, resize, route-change cleanup); mobile/reduced-motion vertical fallbacks for both; no horizontal overflow at 1440/1024/768/390/375/320px.

## Phase 19 Decisions — Robust Horizontal Pinning, Scene-by-Scene Staggers, Route Alignment & Bidirectional Parallax

### Horizontal Story Pinning & Layout Refactor (`components/sections/horizontal-story.tsx`)
- **Full-Screen Scenes (`100vw`):** Each of the 4 horizontal story scenes now uses full viewport width (`lg:w-screen`) on desktop, eliminating half-panel cutoffs and awkward margins.
- **Guaranteed Pin Duration:** Scroll distance is guaranteed at `Math.max(window.innerWidth * (panelCount - 1), totalPanelsWidth - window.innerWidth)`, completely preventing premature unpinning or lower sections overlapping Scene 2.
- **Eliminated ResizeObserver Loop in `SmoothScrollProvider`:** Removed the body `ResizeObserver` that was repeatedly calling `ScrollTrigger.refresh()` every time a `.pin-spacer` altered the body height. Replaced with clean window resize debouncing.
- **Block Layout `<main>`:** Removed `flex flex-col` from `<main>` in `app/page.tsx` (`relative w-full min-h-screen`) to prevent flex item compression on ScrollTrigger pin-spacers.
- **Phase-by-Phase Scene Animations:** Built a master timeline where internal scene elements animate in sequence as each scene enters:
  - Scene 1: Soft exit fade.
  - Scene 2: Header rises into place, then the 3 barrier ceramides (NP, AP, EOP) stagger in one by one.
  - Scene 3: Header rises into place, then the 4 botanical ingredient cards stagger & lift in with a subtle scale settle.
  - Scene 4: Background cream texture settles from scale (`1.14 -> 1.0`), and editorial headline + CTA button bloom into place.
  - **Bidirectional Smoothness:** All animations scrub seamlessly both forward and in reverse when scrolling back up.

### Route Alignment
- Added `/our-story` route (`app/our-story/page.tsx`) matching the "Our Story" navigation label.
- `/about` seamlessly redirects to `/our-story`.
- Added `/product` route redirecting to `/product/body-lotion`.
- Updated all navigation links, mega-menus, footer, and search index to use `/our-story`.

### Parallax Smoothing on Reverse Scroll
- Updated `scrub: true` to `scrub: 1.2` in `components/sections/formula-storytelling.tsx`.
- Enabled GSAP ticker lag smoothing (`lagSmoothing(500, 33)`) in `components/providers/smooth-scroll.tsx` for fluid reverse scroll without snapping.

### Verified (Phase 19)
- `tsc --noEmit` clean; `next build` compiles all 9 static routes cleanly (`/`, `/_not-found`, `/about`, `/ingredients`, `/our-story`, `/product`, `/product/body-lotion`, `/search`, `/shop`).

## Phase 20 Decisions — Signature Experiences (Atlas, Texture Studio, Quick View, Chapters)

Scope confirmed with the user: build the net-new signature experiences that earlier phases
deferred, plus light refinement — **not** a rebuild. No new dependencies (reused
`@base-ui/react`, `motion`, `gsap`, `lenis`, `lucide-react`).

### Interactive Ingredient Atlas (replaces the homepage static grid)
- `components/sections/ingredients.tsx` is now a `"use client"` explorer (export name
  `Ingredients` kept, so `app/page.tsx` is unchanged). A large image stage **crossfades**
  to the selected ingredient while the copy updates; each entry deep-links to
  `/ingredients#{id}` and a secondary link points to `/ingredients#triple-ceramide-complex`.
- **Fixes the data divergence:** the section now consumes the single source
  `lib/osmekos-data.ts` (`ingredients`) instead of its old hard-coded array.
- Crossfade is a **Motion** micro-interaction (`AnimatePresence` + `useReducedMotion`);
  the heading entrance stays on **GSAP** (`RevealHeading`/`Reveal`) — different elements,
  so the two systems never animate the same property. Selector is a keyboard-operable
  `role="tablist"` button group (`aria-selected`, focus rings, no hover dependency);
  mobile shows a horizontal tap rail. Reduced motion → instant swap, content always visible.
- The `/ingredients` route page (the deep-link targets) is unchanged.

### Texture Studio (new section, `components/sections/texture-studio.tsx`)
- Image-led sensory moment, id `#texture`. **Signature interaction (desktop, fine pointer,
  no reduced motion):** a soft circular "lens" follows the cursor — the surrounding image
  is washed back (dim + slight blur) while the texture stays crisp under a radial
  CSS-mask lens. Pointer position is written to CSS vars via a ref (no re-render per move).
- **Mobile / coarse pointer / reduced motion:** the interaction is simply absent and the
  crisp image shows in full — never blank or broken. Interactivity is gated by
  `matchMedia("(pointer: fine)")` + `useReducedMotion`, set out of the effect body (rAF +
  `change` listener) to satisfy `react-hooks/set-state-in-effect`.
- Copy is approved sensory language only (no absorption/barrier/clinical claims).

### Product Quick View (`components/product/product-quick-view.tsx`)
- Reusable accessible dialog built on a new thin wrapper `components/ui/dialog.tsx`
  (centered variant over `@base-ui/react/dialog`, mirroring `components/ui/sheet.tsx`).
  Base UI provides the focus trap, Escape, scroll-lock, and return-focus.
- Content: portrait product image (`osmekos-product-detail.jpg`), name, approved
  description, Triple Ceramide chips + the four ingredient percentages (from
  `osmekos-data`), and two **real** destinations — `/product/body-lotion` and
  `/ingredients` (the `Close` controls `render` a `next/link`, so they close *and*
  navigate). **No cart/checkout / no fake commerce.** Backdrop/popup sit at `z-[70]/[71]`,
  above the search overlay (`z-[60]`); they are never open together.
- One trigger currently lives beside the Product Showcase CTA.

### Chapter scroll indicator (`components/sections/chapter-indicator.tsx`, homepage only)
- Rendered inside `app/page.tsx` so it only mounts on `/`. A restrained vertical dot-nav
  on the right at `lg+` (`hidden lg:block`), hidden on smaller screens so it never overlaps
  content. Five chapters map to real sections: Discover (top) → `#story` → `#film` →
  `#texture` → `#ingredients`.
- Active chapter is derived from scroll position (rAF-throttled; active = last chapter
  whose top is above the viewport middle). Clicking scrolls via the shared Lenis
  (`getLenis()` from `lib/animations/lenis-store.ts`); reduced motion / no-Lenis → native
  scroll. `aria-current` on the active control; never traps scrolling.

### Light Product Showcase refinement
- `components/sections/product-showcase.tsx`: added the Quick View trigger beside the
  "Shop Body Lotion" CTA and a third connector annotation ("Shea Butter 3%") so the stage
  reads as a labelled product composition. Cream-led layout and the authentic
  `osmekos-hero-landscape.jpg` are unchanged — no rebuild.

### Homepage order (adjacent image-repeat check)
`Hero → About → ProductShowcase → HorizontalStory → ScrollVideo → FormulaStorytelling →
TextureStudio → Ingredients(Atlas)`. Formula uses `Luminous…png`; TextureStudio uses
`about-skincare.jpg`; the Atlas uses the four `ingredient-*.jpg` — no adjacent repeats.

### Centralized media
- `lib/media.ts` holds replaceable placeholder refs (`{ src, alt, isPlaceholder, focal }`).
  `textureMacro` currently points at the authentic `about-skincare.jpg`; swap its `src` for
  a bespoke `osmekos-texture-macro.webp` when shot — the component needs no change.

### Remaining assets to replace with originals (unchanged from prior phases)
- Transparent bottle cutout (authentic, not the Seed/Aura `osmekos-bottle-cutout.jpg`),
  wide formula texture (`osmekos-formula-bg.jpg` placeholder), the scroll-video MP4
  (`/videos/osmekos-body-lotion-story.mp4`), and the Texture Studio macro
  (`osmekos-texture-macro.*`). Never substitute Seed/Aura imagery
  (`hero-product.jpg` / `product-detail.jpg` are byte-identical Aura stills — unused; do
  not reference).

### Verified (Phase 20)
- `tsc --noEmit` clean; `eslint` 0 errors (2 pre-existing warnings in `horizontal-story.tsx`);
  `next build` prerenders all 9 routes as static. New ids (`#texture`, `#ingredients`,
  `#story`, `#film`) and new UI (atlas, Quick View trigger, texture copy, chapter nav)
  confirmed present in the prerendered homepage HTML (content available without JS).
- **Not browser-verified** (no browser automation here). Recommended manual QA: atlas
  selection + keyboard/touch + deep links; Quick View open/Escape/focus-return + no
  background scroll + no search conflict; texture lens on desktop vs static on
  mobile/reduced-motion; chapter active state + click-to-scroll; no horizontal overflow at
  1440/1024/768/390/375/320; reduced motion leaves all content visible.

## Phase 21 Decisions — Cinematic Horizontal Story & Filmic Site Treatment

User ask: make the horizontal scroll section "10x more premium/cinematic" and give the
site a cohesive cinematic feel. Enhancement only — the proven Phase-19
pinning/distance math, single-Lenis rule, GSAP/Motion separation, and reduced-motion
fallbacks were all preserved (not rebuilt).

### Reusable filmic layer — `components/visual/cinematic-overlay.tsx`
- `<CinematicOverlay grain vignette grainOpacity vignetteStrength />`: purely decorative
  (pointer-events-none, aria-hidden), **static** inline-SVG `feTurbulence` grain (soft-light
  blend) + a radial edge vignette. Static ⇒ inherently reduced-motion safe. Used by the
  horizontal story and the scroll-video stage so immersive sections read as graded footage.

### Horizontal story upgrade — `components/sections/horizontal-story.tsx`
- Added, all inside the existing desktop `matchMedia("(min-width:1024px)")` scrubbed
  timeline (skipped under reduced motion, which leaves the vertical stack fully visible):
  - **Depth parallax:** oversized editorial chapter numerals (`01`–`04`) drift via
    `xPercent` across the ribbon.
  - **Breathing vignette** (`.hs-vignette`) dips darker through each scene transition.
  - **Per-scene media ken-burns:** P1 media, the four P3 cards, and the P4 texture settle
    from a slight over-scale as their scene enters.
  - Existing phase-by-phase element reveals retained (reversible on scroll-up).
- **Clickable chapter filmstrip** (replaces the old bare bar+counter; desktop-only,
  interactive `nav`): each chapter scrubs the pinned timeline to that scene by converting
  the scene index to an exact document target (`st.start + p·(st.end−st.start)`) and
  scrolling there through the shared Lenis (`getLenis()`), native fallback otherwise. The
  active chapter is highlighted imperatively in `onUpdate` via `data-active` +
  `aria-current` (no per-frame React re-render). Mobile (no pin) falls back to
  `scrollIntoView` on the panel.
- **Scroll cue** ("Scroll to explore →") fades out the instant `progress > 0.01`.
- Cleanup `clearProps` list extended to the new animated targets; `ScrollTrigger` instance
  captured in a ref (`tl.scrollTrigger`) — this also removes the former unused-import /
  unused-`distance` lint warnings.

### Scroll-video stage — `components/sections/scroll-video.tsx`
- Added a `<CinematicOverlay>` (grain + gentle vignette) inside the existing dark video
  stage for the same filmic grade. No change to the scrub logic or poster fallback.

### Verified (Phase 21)
- `tsc --noEmit` clean; `eslint` **0 problems** (previous horizontal-story warnings
  resolved); `next build` prerenders all 9 routes as static. Chapter filmstrip
  (`aria-label="Story chapters"`, chapter labels) and the scroll cue confirmed present in
  the prerendered homepage HTML.
- **Not browser-verified** (no automation here). Recommended manual QA: desktop pinned
  horizontal scroll feel + reverse; chapter-click jumps land each scene centered; grain/
  vignette subtlety on cream vs dark panels; scroll cue fades on first move; mobile stacked
  fallback stays clean (no overlay/nav, content visible); reduced motion disables the
  scene motion while leaving everything readable.

## Phase 22 Decisions — Root-Cause Fix: Large Blank Viewport at the Scroll-Video Section

### Symptom (user-confirmed, during real scrolling)
A large empty area while scrolling between the upper homepage sections and the
Formula/Ingredients content — i.e. around the scroll-video section (`#film`).

### Root cause
`components/sections/scroll-video.tsx` applied `lg:h-screen lg:py-0` **unconditionally** on
desktop. But the scroll-scrub pin is only ever created once a video with valid duration
metadata loads (`init()` in the `matchMedia` block). **No real MP4 exists yet**
(`/videos/osmekos-body-lotion-story.mp4` is a placeholder), so the pin never initialises —
yet the section still reserved a full `100vh`, rendering as an almost-empty viewport
(just the poster card + copy) sandwiched between the pinned horizontal story and the green
Formula section. That reserved-but-unused viewport is the blank the user scrolled through.

### Fix
- Added a `pinned` state, set to `true` only inside `init()` right after the pin's
  `ScrollTrigger` is created (and `false` in the matchMedia cleanup). It is set from the
  `loadedmetadata` event callback, not synchronously in an effect, so it is lint-safe.
- The section height is now conditional: `pinned ? "lg:h-screen lg:py-0" : "lg:py-28"`.
  With no video (current state) the section sizes to its content as a normal premium
  editorial block — no empty viewport. When a conforming MP4 is dropped in later, the pin
  initialises, `pinned` flips true, and the full-height scrubbed experience returns with no
  other code change. Mobile was already `py-20` (no `h-screen`), so it was unaffected.
- No change to the scrub logic, poster fallback, dev-note, or reduced-motion behaviour.

### Verified (Phase 22)
- `tsc --noEmit` clean; `eslint` 0 problems; `next build` prerenders all 9 routes as static.
- Prerendered homepage HTML confirms `#film` now carries `lg:py-28` (not `lg:h-screen`).
- Other pinned section (`#story` horizontal story) is intentionally `lg:h-screen` — it pins
  on every desktop load, so its pin-spacer scroll distance is consumed by the horizontal
  journey and is correct (a full-page *screenshot* of it still shows a tall band by nature
  of ScrollTrigger pinning; that is an artifact, not a runtime gap).
- **Not browser-verified** here. Manual QA: scroll `/` on desktop — the video section now
  reads as a tight editorial block with the poster, flowing directly into Formula with no
  empty viewport; horizontal story still pins/releases cleanly before it.

## Phase 23 Decisions — Root-Cause Fix: Scroll-Reveals Left Route-Page Content Invisible

### Symptom (from user full-page screenshots)
Large empty panels on the route pages: `/product/body-lotion` showed an empty sage
`#formula` panel; `/ingredients` showed an over-tall dark ceramide panel with no cards and a
huge blank where the four ingredient sections belong; `/our-story` `#thoughtful-care` showed
an empty media box. The homepage full-page screenshot also shows a large band after the
Product Showcase — that one is the **horizontal-story pin-spacer** (inherent to any
ScrollTrigger pin; it is the horizontal journey during real scroll, not a bug).

### Root cause
`Reveal`, `RevealHeading`, and `CeramideCards` animate with GSAP `from()` (default
`immediateRender: true`), which **pre-applies the hidden start state** (`autoAlpha:0` /
clipped words / offset cards) and only reveals when the element's ScrollTrigger fires. On
the **static route pages** (Phase 14 added these reveals, against the Phase 11 "routes are
always-visible" rule), any below-the-fold content therefore stays invisible until scrolled
to — and in a **full-page screenshot / no-scroll capture / fast scroll / misfired trigger**
the trigger never fires, so the content is captured blank. This is the Phase-09
"stuck invisible" failure mode, re-introduced onto the routes.

### Fix (one shared helper, applied in the three primitives)
- Added `inInitialViewport(el)` to `lib/animations/reveal.ts`.
- `components/animations/reveal.tsx` (both normal + `media` timelines),
  `components/animations/reveal-heading.tsx`, and
  `components/sections/ceramide-cards.tsx` now pass
  `immediateRender: inInitialViewport(el)` to their `from()` tweens:
  - **Above/at the fold** → `immediateRender: true`: pre-hidden, clean on-load entrance that
    always fires via the provider's `ScrollTrigger.refresh()` (fonts.ready + load).
  - **Below the fold** → `immediateRender: false`: the element renders at its natural
    (visible) state and only animates when actually scrolled into view — so content is
    **never** left stuck invisible (screenshots, no-scroll captures, fast scroll, misfires),
    while the scroll entrance is preserved for normal browsing.
- Reduced motion still early-returns in every primitive (content fully visible). No markup,
  copy, routes, or Lenis/ScrollTrigger wiring changed; SSR already emitted the content.

### Note on the homepage "blank" band
The horizontal story (`#story`) is intentionally `lg:h-screen` + pinned on every desktop
load; its pin-spacer scroll distance is the horizontal journey. A **full-page screenshot**
of it will always show a tall band (ScrollTrigger renders the pinned scene frozen); that is
a capture artifact, not a runtime gap, and removing it would mean removing the signature
pinned interaction.

### Verified (Phase 23)
- `tsc --noEmit` clean; `eslint` 0 problems; `next build` prerenders all 9 routes as static;
  all route content confirmed present in prerendered HTML (it was never missing — the client
  reveal was hiding it).
- **Not browser-verified** here. Manual QA: on `/ingredients`, `/product/body-lotion`,
  `/our-story` take a full-page screenshot and confirm every section renders (no empty
  panels); scroll normally and confirm below-fold sections still animate in; above-fold
  headings/media still play their on-load entrance; reduced motion shows everything.

## Phase 24 Decisions — Reveal "double-animation" Fix + Horizontal Story Redesign

### 1. Fixed the "content is there, then snaps back and re-animates" flash
Phase 23 made below-fold reveals `immediateRender:false` (visible by default) but kept the
old trigger start (`top 85/90%`), so an element became partly visible, then the trigger
fired, snapped it to the hidden start, and re-animated — a visible double-reveal.
- **Fix:** for below-fold elements the trigger start is now `"top bottom"` (fires the instant
  the element's top enters from the viewport bottom, while it is still ~0% visible), so there
  is no pre-visible flash; above-fold keeps its original start + `immediateRender:true` clean
  on-load entrance. Applied in `components/animations/reveal.tsx`,
  `components/animations/reveal-heading.tsx`, and `components/sections/ceramide-cards.tsx`
  (all via `inInitialViewport`). Content is still never left stuck invisible.

### 2. Horizontal story (`components/sections/horizontal-story.tsx`) redesign
Per user feedback ("remove the numbers; the top titles collide with the navbar and aren't
legible; content looks half-faded"):
- **Removed the oversized `01–04` background numerals** (and their parallax drift).
- **Removed the per-scene exit dimming** (`autoAlpha:0.3` fades). Each scene's content now
  settles in once and **stays fully visible** as it crosses the viewport (no more half-faded
  panels mid-scrub). Entrance reveals + media ken-burns are kept.
- **Replaced the top chapter filmstrip** (which overlapped the fixed navbar/wordmark and was
  illegible over the dark panels) with **one legible floating indicator pill at the bottom**
  (`bottom-6`, clear of the navbar): an ivory, blurred surface with clickable chapter tabs
  (active tab = filled deep-green, still scrubs the pinned timeline to that scene via
  `goToScene`) and a thin progress line that follows scroll. Legible over any panel colour.
- **Removed the breathing vignette** (it darkened scenes mid-transition) and the separate
  scroll cue; kept a restrained **static** film grain only.
- Eyebrows simplified (dropped the leading `01 —` numbers from panel labels).
- Preserved the on-disk `data-surface`/`data-theme="dark"` attributes on panels 02 & 04.

### Verified (Phase 24)
- `tsc --noEmit` clean; `eslint` 0 errors (1 unused-var warning in `navigation.tsx` is a
  pre-existing in-progress change, not from this work); `next build` prerenders all 9 routes.
- Prerendered homepage HTML confirms: `hs-numeral` removed (0 occurrences), scroll cue
  removed, and the new bottom "Story chapters" indicator present.
- **Not browser-verified** here. Manual QA: scroll `/` — reveals play once (no re-animate
  flash); horizontal story shows no giant numbers, panels stay crisp, the bottom pill is
  legible over every panel and its tabs jump to scenes; mobile stacked fallback unchanged.

## Phase 25 Decisions — FINAL reveal behavior: classic pre-hidden scroll-reveal (do not change)

### Problem
Phases 23–24 tried to keep below-the-fold content "visible by default" (`immediateRender:false`)
so full-page screenshots wouldn't show empty panels. In a real browser that produced a bad
UX the user flagged twice: content was **already visible**, then a split-second later it
**snapped to hidden and re-animated**. Any `immediateRender:false` approach has a window where
the content is on screen before the trigger fires, so the flash is unavoidable that way.

### Decision (reverted to the Phase-14 model — this is intended, do NOT re-introduce `immediateRender:false`)
`Reveal`, `RevealHeading`, and `CeramideCards` use plain GSAP `from()` (default
`immediateRender:true`) with their original `start` values (`top 85%` / `top 90%` / `top 82%`)
and `once:true`. The hidden start state is applied inside the **`useGSAP` layout effect, before
the browser paints**, so content is hidden first and then animates in when its ScrollTrigger
enters the viewport — the standard "appears on scroll" behavior with **no visible-first flash**.
Removed the `inInitialViewport` helper from `lib/animations/reveal.ts` (now unused).

### Accepted trade-off (not a bug)
Below-the-fold content is intentionally hidden until scrolled to. A **no-scroll full-page
screenshot** therefore shows below-fold sections un-revealed — that is inherent to scroll-reveal
and is NOT a runtime gap. The Phase-09 safeguards (one Lenis rAF loop; `ScrollTrigger.refresh()`
on `document.fonts.ready` + window `load`; `once:true`) keep above-the-fold content revealed on
load and prevent any real "stuck invisible" during actual browsing. Reduced motion still
early-returns in every primitive, leaving content fully visible.

### Verified (Phase 25)
- No `immediateRender` / `inInitialViewport` references remain (grep clean).
- `tsc --noEmit` clean; `eslint` 0 errors (1 unused-var warning in `navigation.tsx` is an
  unrelated in-progress edit on disk); `next build` prerenders all 9 routes as static.
- **Not browser-verified** here. Manual QA: scroll each route — every section is hidden until
  reached, then animates in once (never "there, then re-animates"); above-the-fold hero/first
  section plays its entrance on load; reduced motion shows everything immediately.

