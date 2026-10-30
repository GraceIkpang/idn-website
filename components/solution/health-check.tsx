"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import type { SolutionPage } from "@/lib/solution-pages";
import { sectionHeading, wrap } from "@/lib/layout";
import { duration, ease } from "@/lib/motion";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Services that fix the ticked symptoms, most-needed first. */
function recommend(symptoms: NonNullable<SolutionPage["healthCheck"]>["symptoms"], ticked: ReadonlySet<number>) {
  const counts = new Map<string, number>();
  ticked.forEach((i) => symptoms[i].fixes.forEach((f) => counts.set(f, (counts.get(f) ?? 0) + 1)));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([service]) => service);
}

/** Tick the problems you recognise; see which services we would start with. */
export function SolutionHealthCheck({ check }: { check: NonNullable<SolutionPage["healthCheck"]> }) {
  const { pill, heading, intro, symptoms } = check;
  const [ticked, setTicked] = useState<ReadonlySet<number>>(new Set());
  const services = recommend(symptoms, ticked);

  const toggle = (i: number) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section aria-labelledby="health-title" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>{pill}</Pill>
            <h2 id="health-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
              {heading[0]} <span className="text-gold-ink">{heading[1]}</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            {intro}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-2 rounded-[28px] bg-layer-1 p-2 sm:mt-16 lg:grid-cols-2">
          <fieldset className="rounded-[20px] bg-surface p-6 sm:p-10">
            <legend className="sr-only">Problems you have noticed</legend>
            <p aria-hidden className="text-base text-text-secondary">
              Tick everything that sounds familiar
            </p>
            <ul className="mt-6 grid gap-2">
              {symptoms.map((s, i) => {
                const on = ticked.has(i);
                return (
                  <li key={s.label}>
                    <label
                      className={cn(
                        "flex min-h-14 cursor-pointer items-center gap-4 rounded-[16px] px-4 py-3 text-base transition-colors duration-150",
                        on ? "bg-gold-tint text-text-primary" : "bg-layer-1 text-text-secondary hover:bg-layer-2",
                      )}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggle(i)} className="peer sr-only" />
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
                          on ? "bg-gold text-ink" : "bg-surface shadow-[0_0_0_1px_var(--color-line)]",
                        )}
                      >
                        {on && <Check className="size-3.5" strokeWidth={2.5} />}
                      </span>
                      {s.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <div className="flex flex-col rounded-[20px] bg-ink p-6 text-white sm:p-10">
            <p className="text-base text-white/60">Where we would start</p>
            <div aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                {services.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: duration.fast } }}
                    className="mt-4 max-w-[30ch] text-2xl font-medium tracking-[-0.02em] text-white/80 text-pretty"
                  >
                    Tick a problem on the left to see what would fix it.
                  </motion.p>
                ) : (
                  <motion.ol
                    key="list"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } }}
                    exit={{ opacity: 0, transition: { duration: duration.fast } }}
                    className="mt-4 space-y-3"
                  >
                    {services.map((s, i) => (
                      <li key={s} className="flex items-center gap-4">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-sm text-gold tabular-nums">
                          {i + 1}
                        </span>
                        <span className="text-xl font-medium tracking-[-0.02em]">{s}</span>
                      </li>
                    ))}
                  </motion.ol>
                )}
              </AnimatePresence>
            </div>

            {ticked.size >= 3 && (
              <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-white/70 text-pretty">
                Several of these together usually mean the network has outgrown its original design. An audit is the
                fastest way to a clear plan.
              </p>
            )}

            <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/50 tabular-nums">
                {ticked.size} of {symptoms.length} ticked
              </p>
              <a
                href="#contact"
                className="press group inline-flex h-12 w-fit items-center gap-3 rounded-full bg-gold pr-2 pl-5 text-base font-medium text-ink"
              >
                Book a network audit
                <span className="grid size-8 place-items-center rounded-full bg-ink text-white transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5">
                  <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
