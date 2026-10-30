import Image from "next/image";
import { Globe } from "lucide-react";
import type { SolutionPage } from "@/lib/solution-pages";
import { wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const statement = "text-[1.625rem] leading-[1.18] font-medium tracking-[-0.035em] text-pretty sm:text-[2rem] lg:text-[2.75rem]";

/**
 * One-sentence summary of the solution, with the second half muted, then the proof numbers.
 * With a `feature`, the statement sits beside a photo card instead of under an indented label.
 */
export function SolutionOverview({ page }: { page: SolutionPage }) {
  const { lead, rest, feature } = page.overview;
  return (
    <section aria-label="Overview" className={cn(wrap, "pt-20 pb-16 sm:pt-28 sm:pb-20")}>
      {feature ? (
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between gap-10 lg:col-span-7">
            <Pill className="self-start">Overview</Pill>
            <Reveal>
              <p className={statement}>
                {lead} <span className="text-text-muted">{rest}</span>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <figure className="relative isolate aspect-[4/5] overflow-hidden rounded-[24px] bg-layer-1 sm:aspect-square">
              <Image src={feature.image} alt={feature.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="-z-10 object-cover" />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-[18px] bg-black/35 p-5 text-white ring-1 ring-white/15 backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:p-6">
                <span className="grid size-11 place-items-center rounded-full bg-white/15">
                  <Globe aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <span className="mt-5 block text-2xl font-medium tracking-[-0.02em]">{feature.title}</span>
                <span className="mt-2 block text-base leading-relaxed text-white/85 text-pretty">{feature.body}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Pill>Overview</Pill>
          </div>
          <Reveal className="lg:col-span-9">
            <p className={statement}>
              {lead} <span className="text-text-muted">{rest}</span>
            </p>
          </Reveal>
        </div>
      )}

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
