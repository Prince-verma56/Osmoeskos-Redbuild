import type Lenis from "lenis";

// Single shared reference to the one Lenis instance created by
// SmoothScrollProvider. Exposed so hash-based deep links can scroll through
// the same instance instead of spawning a second one. Null under reduced
// motion (no Lenis) and during SSR.
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}
