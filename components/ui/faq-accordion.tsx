"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Tone = "card" | "line";

/** Single-open accordion. "card" = filled rows, "line" = hairline-divided rows. */
export function FaqAccordion({ tone = "card", className }: { tone?: Tone; className?: string }) {
  const [open, setOpen] = useState<number | null>(1);
  const baseId = useId();

  return (
    <ul className={cn(tone === "card" ? "space-y-3" : "border-t border-line", className)}>
      {faqs.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li
            key={item.q}
            className={cn(
              tone === "card"
                ? "rounded-2xl bg-surface shadow-[0_0_0_1px_var(--color-line)]"
                : "border-b border-line",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-start justify-between gap-6 text-left text-base font-medium sm:text-lg",
                  tone === "card" ? "px-5 py-5 sm:px-6" : "py-6",
                )}
              >
                <span className="min-w-0">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full transition-[background-color,rotate] duration-300 ease-out-soft",
                    isOpen ? "rotate-45 bg-gold text-ink" : "bg-layer-1 text-text-primary",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: duration.base, ease: ease.out }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-[60ch] text-base leading-relaxed text-text-secondary",
                      tone === "card" ? "px-5 pb-6 sm:px-6" : "pb-6 pr-12",
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
