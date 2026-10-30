import type { SolutionPage } from "@/lib/solution-pages";
import { sectionHeading, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Technical scope grouped by area, so specialists can check we cover what they need. */
export function SolutionCapabilities({ capabilities }: { capabilities: NonNullable<SolutionPage["capabilities"]> }) {
  const { pill, heading, intro, groups } = capabilities;
  return (
    <section aria-labelledby="capabilities-title" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>{pill}</Pill>
            <h2 id="capabilities-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
              {heading[0]} <span className="text-gold-ink">{heading[1]}</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            {intro}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-2 rounded-[28px] bg-layer-1 p-2 sm:mt-16 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map((g, i) => (
            <RevealItem
              key={g.title}
              className={cn("rounded-[20px] bg-surface p-6", i === groups.length - 1 && groups.length % 2 === 1 && "sm:col-span-2 lg:col-span-1")}
            >
              <h3 className="text-lg font-medium tracking-[-0.02em]">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-base leading-snug text-text-secondary">
                    <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rotate-45 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
