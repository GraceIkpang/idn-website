"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { solutions } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { solutionIcons } from "@/components/ui/solution-icons";
import { cn } from "@/lib/cn";

/**
 * Desktop "Solutions" disclosure. Opens on hover for mouse users and on click or keyboard for everyone;
 * Escape, an outside click or choosing a link closes it.
 */
export function SolutionsMenu({ dark, current, id }: { dark: boolean; current: boolean; id: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // When hover opened the menu a moment ago, the click that follows should not toggle it shut.
  const hoverOpenedAt = useRef(0);
  // A fixed id per nav bar: useId differed between server and client render here.
  const panelId = `solutions-menu-${id}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = e.timeStamp;
    setOpen(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={root}
      className="relative"
      onPointerEnter={hoverOpen}
      onPointerLeave={hoverClose}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={current ? "page" : undefined}
        onClick={(e) => {
          if (open && e.timeStamp - hoverOpenedAt.current < 500) return;
          setOpen((o) => !o);
        }}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-full px-4 text-[15px] transition-colors duration-150",
          dark
            ? "text-white/70 hover:text-white aria-expanded:text-white aria-[current=page]:text-white"
            : "text-text-secondary hover:text-ink aria-expanded:text-ink aria-[current=page]:text-ink",
        )}
      >
        Solutions
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-200 ease-out-soft", open && "rotate-180")}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {open && (
          // pt-3 is a hover bridge so the pointer can travel from the trigger to the panel without closing it.
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, filter: "blur(4px)", transition: { duration: duration.fast } }}
            transition={{ duration: duration.base, ease: ease.out }}
            className="absolute top-full left-1/2 z-50 w-[400px] -translate-x-1/2 origin-top pt-3"
          >
            <div className="rounded-[24px] bg-surface p-2 text-ink shadow-[0_0_0_1px_var(--color-line),0_24px_48px_-16px_rgb(0_0_0/0.25)]">
              <ul>
                {solutions.map((s) => {
                  const Icon = solutionIcons[s.id];
                  return (
                    <li key={s.id}>
                      <Link
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-4 rounded-[16px] p-3 transition-colors duration-150 hover:bg-layer-1 focus-visible:bg-layer-1"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-tint text-gold-ink">
                          <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-medium">{s.title}</span>
                          <span className="block text-sm text-text-secondary">{s.blurb}</span>
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="size-4 shrink-0 -translate-x-1 text-text-muted opacity-0 transition-[opacity,translate] duration-200 ease-out-soft group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                          strokeWidth={2}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/#solutions"
                onClick={() => setOpen(false)}
                className="mt-1 flex h-11 items-center justify-between rounded-[16px] bg-layer-1 px-4 text-sm text-text-secondary transition-colors duration-150 hover:text-ink"
              >
                Not sure which fits? Compare all three
                <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
