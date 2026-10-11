import { Droplets, Layers, ShieldCheck, type LucideIcon } from "lucide-react";
import { ceramides } from "@/lib/osmekos-data";

// Each ceramide gets an icon that echoes its role in the description:
// NP → hydration, AP → barrier matrix/layers, EOP → protection.
const ceramideIcons: Record<string, LucideIcon> = {
  NP: Droplets,
  AP: Layers,
  EOP: ShieldCheck,
};

type Variant = "dark" | "light";

/**
 * The three Triple Ceramide Complex identifiers, rendered as premium
 * icon-led editorial cards. Shared by the Ingredients feature panel
 * (dark green) and the Product formula section (light sage) via `variant`.
 */
export function CeramideCards({ variant = "light" }: { variant?: Variant }) {
  const dark = variant === "dark";

  const card = dark
    ? "border-primary-foreground/15 bg-primary-foreground/[0.06]"
    : "border-[#243526]/10 bg-[#F7F5EF]";
  const emblem = dark
    ? "border-primary-foreground/25 text-primary-foreground"
    : "border-[#243526]/15 text-primary";
  const index = dark ? "text-primary-foreground/25" : "text-[#243526]/15";
  const code = dark ? "text-[#CBB987]" : "text-accent";
  const name = dark ? "text-primary-foreground" : "text-foreground";
  const desc = dark ? "text-primary-foreground/70" : "text-muted-foreground";

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {ceramides.map((ceramide, i) => {
        const Icon = ceramideIcons[ceramide.code] ?? Droplets;
        return (
          <div
            key={ceramide.code}
            className={`flex flex-col gap-5 rounded-[1.5rem] border p-6 lg:p-7 ${card}`}
          >
            <div className="flex items-start justify-between">
              <span
                className={`grid size-14 place-items-center rounded-2xl border ${emblem}`}
              >
                <Icon className="size-6" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span className={`font-heading text-3xl font-medium tabular-nums ${index}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <span className={`type-eyebrow block ${code}`}>Ceramide {ceramide.code}</span>
              <p className={`mt-2 font-heading text-xl ${name}`}>{ceramide.name}</p>
              <p className={`mt-2 text-sm leading-relaxed ${desc}`}>{ceramide.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
