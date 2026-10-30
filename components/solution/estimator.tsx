"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Estimator, Package } from "@/lib/solution-pages";
import { sectionHeading, sectionSpace, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const naira = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
const nairaShort = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  notation: "compact",
  maximumFractionDigits: 1,
});
const roundTo = (n: number, step: number) => Math.max(step, Math.round(n / step) * step);

/** Rule-of-thumb estimate from monthly energy spend. Every factor lives in the page data. */
function estimate(spend: number, e: Estimator) {
  const dailyKwh = spend / e.costPerKwh / 30;
  const solarKw = roundTo(dailyKwh / e.sunHours, 0.5);
  const batteryKwh = roundTo(dailyKwh * e.storageShare, 5);
  const [low, high] = e.offset.map((o) => spend * o);
  const tier = solarKw < 5 ? 0 : solarKw <= 30 ? 1 : 2;
  return { solarKw, batteryKwh, low, high, tier };
}

export function SolutionEstimator({ estimator, packages }: { estimator: Estimator; packages?: readonly Package[] }) {
  const [spend, setSpend] = useState(estimator.spend.initial);
  const inputId = useId();
  const r = estimate(spend, estimator);
  const pkg = packages?.[r.tier];
  const { min, max, step } = estimator.spend;
  const fill = ((spend - min) / (max - min)) * 100;

  return (
    <section aria-labelledby="estimator-title" className={sectionSpace}>
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>Savings estimator</Pill>
            <h2 id="estimator-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
              See what you <span className="text-gold-ink">could save.</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            Move the slider to match what you spend on diesel, petrol and grid power each month.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-2 rounded-[28px] bg-layer-1 p-2 sm:mt-16 lg:grid-cols-2">
          <div className="flex flex-col rounded-[20px] bg-surface p-6 sm:p-10">
            <label htmlFor={inputId} className="text-base text-text-secondary">
              Monthly spend on fuel and grid power
            </label>
            <output htmlFor={inputId} className="mt-3 block text-4xl font-medium tracking-[-0.035em] tabular-nums sm:text-5xl">
              {naira.format(spend)}
            </output>
            <input
              id={inputId}
              type="range"
              min={min}
              max={max}
              step={step}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              aria-valuetext={naira.format(spend)}
              style={{ background: `linear-gradient(90deg, var(--color-gold) ${fill}%, var(--color-layer-2) ${fill}%)` }}
              className="estimator-range mt-10 h-2 w-full cursor-pointer appearance-none rounded-full"
            />
            <div className="mt-3 flex justify-between text-sm text-text-muted tabular-nums">
              <span>{nairaShort.format(min)}</span>
              <span>{nairaShort.format(max)}</span>
            </div>
            <p className="mt-auto pt-10 text-sm leading-relaxed text-text-muted text-pretty">
              Estimates only, based on typical generator costs and sunshine in Nigeria. An engineer confirms the right
              system and the real numbers after a site visit.
            </p>
          </div>

          <div className="flex flex-col rounded-[20px] bg-ink p-6 text-white sm:p-10">
            <p className="text-base text-white/60">Estimated monthly saving</p>
            <p className="mt-3 text-3xl font-medium tracking-[-0.035em] text-gold tabular-nums sm:text-4xl">
              {naira.format(r.low)} <span className="text-white/40">to</span> {naira.format(r.high)}
            </p>
            <p className="mt-2 text-base text-white/70 tabular-nums">
              About {nairaShort.format(r.low * 12)} to {nairaShort.format(r.high * 12)} a year
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line-inverse pt-8">
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-white/60">Suggested solar array</dt>
                <dd className="text-2xl font-medium whitespace-nowrap tabular-nums">{r.solarKw} kW</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-white/60">Suggested battery</dt>
                <dd className="text-2xl font-medium whitespace-nowrap tabular-nums">{r.batteryKwh} kWh</dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row sm:items-center sm:justify-between">
              {pkg && (
                <a href="#packages" className="text-base text-white/80 underline-offset-4 hover:text-white hover:underline">
                  Closest package: <span className="font-medium text-white">{pkg.name}</span>
                </a>
              )}
              <a
                href="#contact"
                className="press group inline-flex h-12 w-fit items-center gap-3 rounded-full bg-gold pr-2 pl-5 text-base font-medium text-ink"
              >
                Get an exact quote
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
