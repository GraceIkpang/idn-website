"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { useScrolled } from "@/lib/use-scrolled";
import { Logo } from "@/components/ui/logo";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { SolutionsMenu } from "@/components/ui/solutions-menu";
import { cn } from "@/lib/cn";

export type Page = (typeof nav)[number]["label"];

export function NavLinks({ dark, current, id }: { dark: boolean; current?: Page; id: "top" | "sticky" }) {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {nav.map((item) =>
        item.label === "Solutions" ? (
          <li key={item.href}>
            <SolutionsMenu dark={dark} current={current === "Solutions"} id={id} />
          </li>
        ) : (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.label === current ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-full px-4 text-[15px] transition-colors duration-150",
                dark
                  ? "text-white/70 hover:text-white aria-[current=page]:text-white"
                  : "text-text-secondary hover:text-ink aria-[current=page]:text-ink",
              )}
            >
              {item.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

export function ContactButton({ className }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={cn(
        "press hidden h-11 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-white sm:inline-flex",
        className,
      )}
    >
      Contact us
    </Link>
  );
}

/** Top-of-page nav row. `dark` sets light text for use over imagery. */
export function TopNav({ dark = false, current }: { dark?: boolean; current?: Page }) {
  return (
    <nav aria-label="Main" className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
      <Logo className="text-gold" />
      <NavLinks dark={dark} current={current} id="top" />
      <div className="flex items-center gap-2">
        <ContactButton />
        <MobileMenu light={dark} />
      </div>
    </nav>
  );
}

/** Floating pill header that takes over once the top nav scrolls away. */
export function StickyHeader({ current, threshold = 560 }: { current?: Page; threshold?: number }) {
  const visible = useScrolled(threshold);
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, transition: { duration: duration.fast } }}
          transition={{ duration: duration.base, ease: ease.out }}
          className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-40 px-3"
        >
          <nav
            aria-label="Main"
            className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full bg-white pr-2 pl-5 shadow-[0_0_0_1px_var(--color-line),0_12px_32px_-12px_rgb(0_0_0/0.18)] lg:bg-white/85 lg:backdrop-blur-xl"
          >
            <Logo className="text-gold" />
            <NavLinks dark={false} current={current} id="sticky" />
            <div className="flex items-center gap-2">
              <ContactButton />
              <MobileMenu />
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
