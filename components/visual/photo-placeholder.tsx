import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

/**
 * Stand-in for photography awaiting client approval.
 *
 * Several AI-generated stills showed packaging that is not OsmeKos (third-party
 * brand names, a non-official wordmark, invented scent/origin/ingredient
 * claims), so they were withdrawn from the site. Each affected slot renders
 * this cream-led panel with the official monogram until an approved photograph
 * is supplied — then swap it back for a next/image <Image fill>. See AGENTS.md
 * ("Phase 26") for the slot list.
 *
 * Fills its positioned parent, like <Image fill>, and is decorative to
 * assistive tech. `slot` names the shot that belongs here; it is shown as a
 * caption in development only.
 */

const tones = {
  ivory: {
    color: "#243526",
    backgroundImage: "radial-gradient(120% 100% at 30% 15%, #FFFFFF 0%, #F7F5EF 45%, #EAE4D9 100%)",
  },
  sand: {
    color: "#243526",
    backgroundImage:
      "radial-gradient(90% 80% at 75% 20%, rgba(183, 160, 107, 0.16) 0%, transparent 60%), linear-gradient(160deg, #F7F5EF 0%, #EAE4D9 100%)",
  },
  sage: {
    color: "#243526",
    backgroundImage: "radial-gradient(120% 100% at 30% 15%, #F7F5EF 0%, #DCE3D4 70%)",
  },
  green: {
    color: "#F7F5EF",
    backgroundImage: "radial-gradient(120% 100% at 30% 15%, #243526 0%, #1b2a1f 100%)",
  },
} satisfies Record<string, CSSProperties>;

type PhotoPlaceholderProps = {
  /** The approved shot that belongs in this slot (development caption). */
  slot: string;
  tone?: keyof typeof tones;
  /** Set false for small thumbnails or layered duplicates. */
  caption?: boolean;
  className?: string;
};

export function PhotoPlaceholder({
  slot,
  tone = "ivory",
  caption = true,
  className,
}: PhotoPlaceholderProps) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      aria-hidden="true"
      data-photo-placeholder={slot}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden",
        className,
      )}
      style={tones[tone]}
    >
      <Logo
        variant="mark"
        decorative
        className={cn(
          "w-[clamp(1.75rem,16%,7.5rem)]",
          tone === "green" ? "opacity-35" : "opacity-20",
        )}
      />
      {isDev && caption ? (
        <span className="rounded-full bg-[#F7F5EF]/85 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-[#77766C]">
          Placeholder · {slot}
        </span>
      ) : null}
    </div>
  );
}
