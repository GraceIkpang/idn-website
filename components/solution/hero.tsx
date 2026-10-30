"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { SolutionPage } from "@/lib/solution-pages";
import { duration, ease, stagger } from "@/lib/motion";
import { StickyHeader, TopNav } from "@/components/ui/site-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";

const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.hero, ease: ease.out } },
};

export function SolutionHero({ page }: { page: SolutionPage }) {
  return (
    <>
      <StickyHeader current="Solutions" threshold={480} />
      <header id="top" className="p-2 sm:p-3">
        <div
          className={cn(
            "relative isolate flex min-h-[560px] flex-col overflow-hidden rounded-[24px] bg-ink text-white sm:rounded-[32px]",
            // Very wide banner photos zoom in less, and keep people in frame, in a shorter hero.
            page.hero.compact ? "lg:h-[520px] lg:min-h-0" : "lg:h-[min(76svh,640px)] lg:min-h-[560px]",
          )}
        >
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: ease.out }}
          >
            <Image
              src={page.hero.image}
              alt={page.hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[var(--focus)] lg:object-[var(--focus-lg)]"
              style={
                {
                  "--focus": page.hero.focus,
                  "--focus-lg": page.hero.focusLg ?? page.hero.focus,
                } as React.CSSProperties
              }
            />
          </motion.div>
          {/* Two layers: top-to-bottom for the nav and buttons, left-to-right behind the headline. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.55),rgb(0_0_0/0.2)_28%,rgb(0_0_0/0.4)_55%,rgb(0_0_0/0.85))]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(0_0_0/0.55),rgb(0_0_0/0.25)_45%,transparent_75%)]"
          />

          <TopNav dark current="Solutions" />

          <motion.div
            className={cn("mt-auto px-5 pt-24 pb-6 sm:px-8 sm:pb-8 lg:px-12 lg:pb-14", page.hero.compact && "lg:pt-6 lg:pb-12")}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.15 } } }}
          >
            <motion.div variants={line}>
              <Pill tone="glass">Solutions</Pill>
            </motion.div>
            <motion.h1
              variants={line}
              className="mt-5 text-[2.75rem] leading-[0.98] font-medium tracking-[-0.035em] sm:text-6xl lg:text-[5.5rem]"
            >
              {page.title}
            </motion.h1>
            <motion.div variants={line} className="mt-6 flex flex-col gap-8">
              <p className="max-w-[46ch] text-base leading-relaxed text-white/80 text-pretty sm:text-lg">{page.tagline}</p>
              <div className="flex flex-col sm:flex-row">
                <a
                  href="#contact"
                  className="press group relative inline-flex h-14 shrink-0 items-center justify-center gap-4 rounded-full bg-gold px-14 text-base font-medium text-ink sm:static sm:justify-start sm:pr-2 sm:pl-6"
                >
                  Plan your project
                  <span className="absolute right-2 grid size-10 place-items-center rounded-full bg-ink text-white transition-transform duration-300 ease-out-soft group-hover:rotate-45 sm:static">
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>
    </>
  );
}
