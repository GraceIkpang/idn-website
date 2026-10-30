import type { SolutionPage } from "@/lib/solution-pages";
import { wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** One-sentence summary of the solution, with the second half muted, then the proof numbers. */
export function SolutionOverview({ page }: { page: SolutionPage }) {
  return (
    <section aria-label="Overview" className={cn(wrap, "pt-20 pb-16 sm:pt-28 sm:pb-20")}>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <Pill>Overview</Pill>
        </div>
        <Reveal className="lg:col-span-9">
          <p className="text-[1.625rem] leading-[1.18] font-medium tracking-[-0.035em] text-pretty sm:text-[2rem] lg:text-[2.75rem]">
            {page.overview.lead} <span className="text-text-muted">{page.overview.rest}</span>
          </p>
        </Reveal>
      </div>

      {page.stats && (
        <RevealGroup className="mt-14 sm:mt-20 lg:grid lg:grid-cols-12 lg:gap-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-8 sm:grid-cols-4 lg:col-span-9 lg:col-start-4">
            {page.stats.map((s) => (
              <RevealItem key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="text-sm text-text-secondary">{s.label}</dt>
                <dd className="text-3xl font-medium tracking-[-0.035em] tabular-nums sm:text-4xl">{s.value}</dd>
              </RevealItem>
            ))}
          </dl>
        </RevealGroup>
      )}
    </section>
  );
}
