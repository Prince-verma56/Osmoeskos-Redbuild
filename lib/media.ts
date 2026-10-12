// Centralized media references for replaceable placeholder assets.
//
// Keep replacement trivial: when an authentic OsmeKos original becomes
// available, update the `src` here and the consuming section needs no change.
// `isPlaceholder` documents that the current `src` is an approved stand-in
// (an existing authentic asset) rather than a bespoke shot for that slot.
//
// Rule (AGENTS.md): authentic OsmeKos imagery only — never the Seed/Aura
// assets (`osmekos-bottle-cutout.jpg`, `hero-product.jpg`, `product-detail.jpg`).

export type MediaRef = {
  src: string;
  alt: string;
  /** True while `src` is an approved stand-in, not a bespoke asset. */
  isPlaceholder: boolean;
  /** CSS object-position for art-directed cropping. */
  focal?: string;
};

export const media = {
  /**
   * Texture Studio macro still. Replace with a dedicated close-up
   * (`/images/osmekos-texture-macro.webp`) when shot; currently reuses the
   * authentic skincare-texture still so nothing is ever broken.
   */
  textureMacro: {
    src: "/images/about-skincare.jpg",
    alt: "A close, tactile look at the OsmeKos lotion texture",
    isPlaceholder: true,
    focal: "center",
  },
} satisfies Record<string, MediaRef>;
