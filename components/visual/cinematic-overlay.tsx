import { cn } from "@/lib/utils";

/**
 * Cinematic overlay — a reusable, purely decorative film layer.
 *
 * Adds a static film-grain texture and/or an edge vignette over an immersive
 * section so it reads like graded footage rather than a flat web section.
 * Pointer-events-none and aria-hidden; the grain is static (no animation), so
 * it is inherently reduced-motion safe. Place as an absolutely-positioned
 * sibling above the content and below any interactive UI.
 */

// Inline SVG fractal-noise grain (grayscale), tiled. Kept subtle via opacity
// and a soft-light blend so it never muddies the cream palette.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type CinematicOverlayProps = {
  className?: string;
  grain?: boolean;
  vignette?: boolean;
  /** Grain intensity (0–1). */
  grainOpacity?: number;
  /** Vignette darkness tuning. */
  vignetteStrength?: number;
};

export function CinematicOverlay({
  className,
  grain = true,
  vignette = true,
  grainOpacity = 0.09,
  vignetteStrength = 0.4,
}: CinematicOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {vignette && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(130% 100% at 50% 50%, transparent 55%, rgba(16,22,16,${vignetteStrength}) 100%)`,
          }}
        />
      )}
      {grain && (
        <div
          className="absolute inset-[-50%] bg-repeat"
          style={{
            backgroundImage: GRAIN_URL,
            opacity: grainOpacity,
            mixBlendMode: "soft-light",
          }}
        />
      )}
    </div>
  );
}
