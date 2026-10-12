// Centralized media references for replaceable placeholder assets.
//
// Keep replacement trivial: when an authentic OsmeKos original becomes
// available, update the `src` here and the consuming section needs no change.
// `src: null` means no approved photograph exists yet; the consumer renders
// <PhotoPlaceholder> instead.
//
// Rule (AGENTS.md): authentic OsmeKos imagery only — never the Seed/Aura
// assets (`osmekos-bottle-cutout.jpg`, `hero-product.jpg`, `product-detail.jpg`),
// nor the withdrawn mis-branded stills listed under Phase 26.

export type MediaRef = {
  src: string | null;
  alt: string;
  /** True while the slot has no bespoke, approved asset. */
  isPlaceholder: boolean;
  /** CSS object-position for art-directed cropping. */
  focal?: string;
};

export const media = {
  /**
   * Texture Studio macro still. Add a dedicated, approved close-up
   * (`/images/osmekos-texture-macro.webp`) when shot. The previous stand-in
   * (`about-skincare.jpg`) showed third-party "SERALIS" packaging and was
   * withdrawn.
   */
  textureMacro: {
    src: null,
    alt: "A close, tactile look at the OsmeKos lotion texture",
    isPlaceholder: true,
    focal: "center",
  },
} satisfies Record<string, MediaRef>;
