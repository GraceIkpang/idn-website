"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { externalProps, nav, solutions } from "@/lib/content";
import { duration, ease, stagger } from "@/lib/motion";
import { solutionIcons } from "@/components/ui/solution-icons";
import { cn } from "@/lib/cn";

/** Hamburger and full-screen sheet for < lg. `light` sets the trigger color over dark imagery. */
export function MobileMenu({ light = false, cta = "Contact us" }: { light?: boolean; cta?: string }) {
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnFocusTo = trigger.current;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnFocusTo?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          "press grid size-11 place-items-center rounded-full lg:hidden",
          light ? "bg-white/15 text-white backdrop-blur-md" : "bg-layer-1 text-ink",
        )}
      >
        <Menu className="size-5" strokeWidth={1.75} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: duration.fast } }}
            transition={{ duration: duration.base, ease: ease.out }}
            className="fixed inset-0 z-50 flex flex-col bg-ink px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-white lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span aria-hidden className="idn-mark h-7 text-gold" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="press grid size-11 place-items-center rounded-full bg-white/10"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <motion.nav
              aria-label="Mobile"
              className="no-scrollbar mt-10 mb-6 flex min-h-0 flex-col overflow-y-auto"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: stagger / 2, delayChildren: 0.05 } } }}
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
                  }}
                  className="border-b border-line-inverse"
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    {...externalProps(item.href)}
                    onClick={() => setOpen(false)}
                    className="block py-5 text-3xl font-medium tracking-tight"
                  >
                    {item.label}
                  </a>
                  {item.label === "Solutions" && (
                    <ul className="-mt-1 grid gap-1 pb-5">
                      {solutions.map((s) => {
                        const Icon = solutionIcons[s.id];
                        return (
                          <li key={s.id}>
                            <a
                              href={s.href}
                              onClick={() => setOpen(false)}
                              className="flex h-12 items-center gap-3 rounded-full pr-4 text-lg text-white/75 transition-colors duration-150 active:bg-white/10"
                            >
                              <span className="grid size-9 place-items-center rounded-full bg-white/10 text-gold">
                                <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                              </span>
                              {s.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="press mt-auto flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-gold text-base font-medium text-ink"
            >
              {cta}
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
