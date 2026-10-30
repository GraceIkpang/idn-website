"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { SolutionPage } from "@/lib/solution-pages";
import { sectionHeading, sectionSpace, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { contactHref, type ContactTopic } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Pick a platform and features; see a rough timeline and the engagement that fits. */
export function SolutionScoper({ scoper, topic }: { scoper: NonNullable<SolutionPage["scoper"]>; topic: ContactTopic }) {
  const { pill, heading, intro, platforms, features, teamThreshold } = scoper;
  const [platform, setPlatform] = useState(0);
  const [picked, setPicked] = useState<ReadonlySet<number>>(new Set([0]));

  const toggle = (i: number) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const [lo, hi] = [...picked].reduce<[number, number]>(
    ([a, b], i) => [a + features[i].weeks[0], b + features[i].weeks[1]],
    [platforms[platform].weeks[0], platforms[platform].weeks[1]],
  );
  const team = hi > teamThreshold;

  return (
    <section aria-labelledby="scoper-title" className={sectionSpace}>
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>{pill}</Pill>
            <h2 id="scoper-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
              {heading[0]} <span className="text-gold-ink">{heading[1]}</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            {intro}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-2 rounded-[28px] bg-layer-1 p-2 sm:mt-16 lg:grid-cols-2">
          <div className="rounded-[20px] bg-surface p-6 sm:p-10">
            <fieldset>
              <legend className="text-base text-text-secondary">What are we building?</legend>
              <div className="mt-4 grid grid-cols-1 gap-2 rounded-[18px] bg-layer-1 p-1.5 sm:grid-cols-3">
                {platforms.map((p, i) => (
                  <label
                    key={p.label}
                    className={cn(
                      "flex h-12 cursor-pointer items-center justify-center rounded-[14px] px-3 text-base transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                      platform === i ? "bg-surface font-medium shadow-[0_0_0_1px_var(--color-line),0_2px_8px_-2px_rgb(0_0_0/0.12)]" : "text-text-secondary hover:text-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name="scoper-platform"
                      checked={platform === i}
                      onChange={() => setPlatform(i)}
                      className="sr-only"
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="text-base text-text-secondary">What should it do?</legend>
              <ul className="mt-4 flex flex-wrap gap-2">
                {features.map((f, i) => {
                  const on = picked.has(i);
                  return (
                    <li key={f.label}>
                      <label
                        className={cn(
                          "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full pr-4 pl-3 text-base transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                          on ? "bg-gold-tint text-text-primary" : "bg-layer-1 text-text-secondary hover:bg-layer-2",
                        )}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggle(i)} className="sr-only" />
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-5 place-items-center rounded-full transition-colors duration-150",
                            on ? "bg-gold text-ink" : "bg-surface shadow-[0_0_0_1px_var(--color-line)]",
                          )}
                        >
                          {on && <Check className="size-3" strokeWidth={2.5} />}
                        </span>
                        {f.label}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <p className="mt-10 text-sm leading-relaxed text-text-muted text-pretty">
              A rough guide only. We confirm scope, timeline and cost after a short discovery call.
            </p>
          </div>

          <div className="flex flex-col rounded-[20px] bg-ink p-6 text-white sm:p-10">
            <p className="text-base text-white/60">Estimated timeline</p>
            <p className="mt-3 text-4xl font-medium tracking-[-0.035em] text-gold tabular-nums sm:text-5xl" aria-live="polite">
              {lo} to {hi} weeks
            </p>
            <p className="mt-2 text-base text-white/70 tabular-nums">
              {platforms[platform].label} with {picked.size} {picked.size === 1 ? "feature" : "features"}
            </p>

            <div className="mt-10 border-t border-line-inverse pt-8">
              <p className="text-sm text-white/60">Best way to work with us</p>
              <a href="#packages" className="mt-2 inline-block text-2xl font-medium underline-offset-4 hover:underline">
                {team ? "Dedicated team" : "Fixed-scope project"}
              </a>
              <p className="mt-2 max-w-[44ch] text-base leading-relaxed text-white/70 text-pretty">
                {team
                  ? "A larger build is easier to steer with a team that works in weekly sprints and adjusts as you learn."
                  : "A clear scope like this can be quoted up front, with a fixed price and delivery date."}
              </p>
            </div>

            <div className="mt-auto pt-10">
              <a
                href={contactHref(topic)}
                className="press group inline-flex h-12 w-fit items-center gap-3 rounded-full bg-gold pr-2 pl-5 text-base font-medium text-ink"
              >
                Book a discovery call
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
