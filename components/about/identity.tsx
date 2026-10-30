"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue } from "motion/react";
import { entities } from "@/lib/content";
import { sectionHeading, wrap } from "@/lib/layout";
import { duration, ease } from "@/lib/motion";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** How long each entity stays on stage, in ms. */
const DWELL = 3600;
const longest = entities.reduce((a, b) => (b.name.length > a.length ? b.name : a), "").replace(/^Inter/, "");

/**
 * One IDN identity, three entities told through colour.
 * The Intercontinental mark stays fixed while the name cycles Intercontinental, Interdigital, Intercom
 * and its colour shifts gold, blue, red. Hovering or focusing the showcase pauses it; the legend jumps to an entity.
 */
export function Identity() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const showcase = useRef<HTMLDivElement>(null);
  const inView = useInView(showcase, { amount: 0.4 });
  const progress = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (paused || !inView) return;
    const next = progress.get() + delta / DWELL;
    if (next >= 1) {
      progress.set(0);
      setActive((i) => (i + 1) % entities.length);
    } else {
      progress.set(next);
    }
  });

  const select = (i: number) => {
    progress.set(0);
    setActive(i);
  };

  const current = entities[active];

  return (
    <section aria-labelledby="identity-title" className="py-24 sm:py-32">
      <div className={wrap}>
        <div className="rounded-[28px] bg-bone p-6 sm:p-10 lg:p-14">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <Pill tone="white">Our identity</Pill>
              <h2 id="identity-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
                Different disciplines. <span className="text-gold-ink">One shared purpose.</span>
              </h2>
            </div>
            <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
              IDN is one company with one name. Three specialist entities sit within it, each known by its own colour
              and each held to the same standard.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 sm:mt-16">
            <div
              ref={showcase}
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
              className="grid gap-2"
            >
              <div
                id="identity-stage"
                className="relative isolate grid min-h-[300px] place-items-center overflow-hidden rounded-[20px] bg-surface px-4 py-14 shadow-[0_0_0_1px_var(--color-line)] sm:min-h-[400px]"
              >
                {entities.map((e, i) => (
                  <motion.div
                    key={e.name}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                      background: `radial-gradient(45% 65% at 50% 55%, color-mix(in oklab, ${e.color} 14%, transparent), transparent 75%)`,
                    }}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.9, ease: ease.inOut }}
                  />
                ))}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgb(0_0_0/0.07)_1px,transparent_1px)] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)] bg-[size:22px_22px]"
                />

                <p className="sr-only">
                  IDN brings together {entities.map((e) => `${e.name} Data Networks`).join(", ")}.
                </p>
                <div aria-hidden className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
                  <span className="idn-mark h-11 shrink-0 text-gold sm:h-16 lg:h-20" />
                  <span className="hidden h-20 w-px bg-line sm:block" />
                  <span className="block">
                    <span className="flex text-[1.75rem] leading-none font-medium tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]">
                      Inter
                      <span className="inline-grid">
                        <span className="invisible col-start-1 row-start-1">{longest}</span>
                        <AnimatePresence initial={false}>
                          <motion.span
                            key={current.name}
                            className="col-start-1 row-start-1"
                            style={{ color: current.color }}
                            initial={{ opacity: 0, y: "0.3em", filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: ease.out } }}
                            exit={{ opacity: 0, y: "-0.2em", filter: "blur(4px)", transition: { duration: duration.fast } }}
                          >
                            {current.name.replace(/^Inter/, "")}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    </span>
                    <span className="mt-2 block text-lg text-text-secondary sm:mt-3 sm:text-2xl">Data Networks</span>
                  </span>
                </div>
              </div>

              <ul aria-label="IDN entities" className="grid gap-2 sm:grid-cols-3">
                {entities.map((e, i) => (
                  <li key={e.name}>
                    <button
                      type="button"
                      aria-pressed={i === active}
                      aria-controls="identity-stage"
                      onClick={() => select(i)}
                      className="group w-full rounded-[16px] bg-surface p-4 text-left shadow-[0_0_0_1px_var(--color-line)] transition-shadow duration-150 hover:shadow-[0_0_0_1px_var(--color-line),0_8px_24px_-12px_rgb(0_0_0/0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-5"
                    >
                      <span aria-hidden className="block h-0.5 overflow-hidden rounded-full bg-layer-2">
                        <motion.span
                          className="block h-full origin-left"
                          style={{ backgroundColor: e.color, scaleX: i === active ? progress : 0 }}
                        />
                      </span>
                      <span className="mt-4 flex items-center gap-2.5">
                        <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
                        <span
                          className={cn(
                            "text-base font-medium transition-colors duration-300",
                            i === active ? "text-text-primary" : "text-text-muted group-hover:text-text-secondary",
                          )}
                        >
                          {e.name} Data Networks
                        </span>
                      </span>
                      <span className="mt-1 block pl-[1.125rem] text-sm text-text-muted">{e.focus}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
