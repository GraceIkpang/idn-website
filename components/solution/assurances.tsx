import type { SolutionPage } from "@/lib/solution-pages";
import { sectionHeading, wrap } from "@/lib/layout";
import { DrawLine } from "@/components/ui/draw-line";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Guarantees as big figures on a dark band (warranty years, uptime, response times), then equipment brands. */
export function SolutionAssurances({ assurances }: { assurances: NonNullable<SolutionPage["assurances"]> }) {
  const { pill, heading, intro } = assurances;
  return (
    <section aria-labelledby="assurances-title" className="px-2 pb-24 sm:px-3 sm:pb-32">
      <div className="rounded-[24px] bg-ink py-20 text-white sm:rounded-[32px] sm:py-28">
        <div className={wrap}>
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <Pill tone="dark">{pill}</Pill>
              <h2 id="assurances-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
                {heading[0]} <span className="text-gold">{heading[1]}</span>
              </h2>
            </div>
            <p className="max-w-[44ch] text-base leading-relaxed text-white/70 text-pretty sm:text-lg lg:col-span-5">
              {intro}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {assurances.items.map((a, i) => (
              <li key={a.title}>
                <DrawLine delay={i * 0.1} />
                <Reveal delay={0.1 + i * 0.08}>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="text-6xl font-medium tracking-[-0.04em] whitespace-nowrap text-gold tabular-nums">{a.value}</span>
                    {a.unit && <span className="text-base text-white/60">{a.unit}</span>}
                  </p>
                  <h3 className="mt-4 text-xl font-medium">{a.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/60 text-pretty">{a.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-16 flex flex-col gap-6 border-t border-line-inverse pt-8 sm:mt-20 lg:flex-row lg:items-center lg:gap-12">
            <p className="shrink-0 text-sm text-white/50">Equipment we install</p>
            {/* PLACEHOLDER: swap the names for partner brand logos */}
            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {assurances.brands.map((b) => (
                <li key={b} className="text-lg font-semibold tracking-tight text-white/40">
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
