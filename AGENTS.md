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
