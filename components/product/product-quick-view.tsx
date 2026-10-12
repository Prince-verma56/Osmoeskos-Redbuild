"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ingredients, ceramides } from "@/lib/osmekos-data";

/**
 * Reusable, accessible Product Quick View.
 *
 * Previews the OsmeKos Body Lotion without leaving the current page. Built on
 * the Base UI Dialog (focus trap, Escape, scroll-lock, return-focus handled
 * for us). Content is drawn only from approved product data — no invented
 * claims and no fake commerce: the actions link to the real Product Details
 * and Ingredients pages.
 */

type ProductQuickViewProps = {
  triggerLabel?: string;
  triggerClassName?: string;
};

export function ProductQuickView({
  triggerLabel = "Quick view",
  triggerClassName = "btn-premium btn-premium--outline inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
}: ProductQuickViewProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={triggerClassName}
        aria-haspopup="dialog"
      >
        {triggerLabel}
        <span aria-hidden="true" className="btn-premium__arrow">
          &rarr;
        </span>
      </DialogTrigger>

      <DialogContent>
        <div className="grid max-h-[85vh] grid-cols-1 overflow-y-auto overscroll-contain sm:grid-cols-[0.9fr_1.1fr]">
          {/* Product image */}
          <div className="relative aspect-[4/5] w-full bg-[#EAE4D9] sm:aspect-auto sm:min-h-[26rem]">
            <Image
              src="/images/osmekos-product-detail.jpg"
              alt="The OsmeKos Body Lotion bottle"
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <span className="type-eyebrow text-[0.625rem] text-accent">
                Signature Care
              </span>
              <DialogTitle>OsmeKos Body Lotion</DialogTitle>
              <DialogDescription>
                A lightweight daily body lotion built around a Triple Ceramide
                Complex and nourishing botanicals to help hydrate skin and
                support its natural moisture barrier.
              </DialogDescription>
            </div>

            {/* Triple Ceramide Complex */}
            <div className="flex flex-col gap-2">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#243526]/70">
                Triple Ceramide Complex
              </span>
              <div className="flex flex-wrap gap-2">
                {ceramides.map((c) => (
                  <span
                    key={c.code}
                    className="inline-flex items-center rounded-full border border-[#243526]/15 bg-[#DCE3D4]/50 px-3 py-1 text-xs font-semibold text-[#243526]"
                  >
                    {c.code}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredient highlights */}
            <div className="flex flex-col gap-2">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#243526]/70">
                Key Ingredients
              </span>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {ingredients.map((ing) => (
                  <li
                    key={ing.id}
                    className="flex items-baseline justify-between gap-2 text-sm text-[#25291F]"
                  >
                    <span>{ing.name}</span>
                    <span className="font-semibold text-accent">
                      {ing.percentage}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions — real destinations only, no fake commerce */}
            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              <DialogClose
                render={
                  <Link href="/product/body-lotion" />
                }
                className="btn-premium btn-premium--primary inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              >
                View product details
                <span aria-hidden="true" className="btn-premium__arrow">
                  &rarr;
                </span>
              </DialogClose>
              <DialogClose
                render={<Link href="/ingredients" />}
                className="btn-premium btn-premium--outline inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              >
                Explore ingredients
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
