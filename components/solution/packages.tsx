import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { SolutionPage } from "@/lib/solution-pages";
import { contactHref, type ContactTopic, tapsunUrl } from "@/lib/content";
import { sectionHeading, sectionSpace, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/**
 * Ways to buy, such as packages by size or engagement models. With `shop`, each card also links to TapSun kits once its URL is set
 * in lib/content.ts.
 */
export function SolutionPackages({
  packages,
  topic,
  shop = false,
}: {
  packages: NonNullable<SolutionPage["packages"]>;
  topic: ContactTopic;
  shop?: boolean;
}) {
  const { pill, heading, intro, items } = packages;
  return (
    <section id="packages" aria-labelledby="packages-title" className={cn("scroll-mt-24", sectionSpace)}>
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>{pill}</Pill>
            <h2 id="packages-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
              {heading[0]} <span className="text-gold-ink">{heading[1]}</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            {intro}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-2 rounded-[28px] bg-layer-1 p-2 sm:mt-16 lg:grid-cols-3">
          {items.map((p) => (
            <RevealItem key={p.name} className="flex flex-col rounded-[20px] bg-surface p-6 sm:p-8">
              <h3 className="text-3xl font-medium tracking-[-0.035em]">{p.name}</h3>
              <p className="mt-2 text-base text-text-secondary">{p.audience}</p>
              <p className="mt-6 rounded-[14px] bg-layer-1 px-4 py-3 text-base font-medium">{p.system}</p>
              <ul className="mt-6 space-y-3">
                {p.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-text-secondary">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-tint text-gold-ink">
                      <Check aria-hidden className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                <a
                  href={contactHref(topic, `We're interested in the ${p.name} option. Please send us a quote.`)}
                  className="press group inline-flex h-11 items-center gap-2 rounded-full bg-ink pr-4 pl-5 text-sm font-medium text-white"
                >
                  Request a quote
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" strokeWidth={2} />
                </a>
                {shop && tapsunUrl && (
                  <a
                    href={tapsunUrl}
                    target="_blank"
                    rel="noopener"
                    className="press inline-flex h-11 items-center gap-2 rounded-full bg-layer-1 px-5 text-sm font-medium transition-colors duration-150 hover:bg-layer-2"
                  >
                    Shop kits on TapSun
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
