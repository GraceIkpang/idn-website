import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/lib/content";
import { sectionSpace, wrap } from "@/lib/layout";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { solutionIcons } from "@/components/ui/solution-icons";
import type { SolutionPage } from "@/lib/solution-pages";

/** Cross-links to the other two solutions, just before the footer. */
export function SolutionRelated({ current }: { current: SolutionPage["id"] }) {
  const others = solutions.filter((s) => s.id !== current);
  return (
    <section aria-labelledby="related-title" className={sectionSpace}>
      <div className={wrap}>
        <h2 id="related-title" className="text-sm text-text-muted">
          Explore other solutions
        </h2>
        <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2">
          {others.map((s) => {
            const Icon = solutionIcons[s.id];
            return (
              <RevealItem key={s.id}>
                <Link
                  href={s.href}
                  className="group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[24px] p-6 text-white sm:min-h-[320px] sm:p-8"
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
                    style={{ objectPosition: s.focus }}
                  />
                  <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.1),rgb(0_0_0/0.75))]" />
                  <span className="absolute top-6 left-6 grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur-md sm:top-8 sm:left-8">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="flex items-end justify-between gap-6">
                    <span>
                      <span className="block text-3xl font-medium tracking-[-0.035em]">{s.title}</span>
                      <span className="mt-1 block text-base text-white/75">{s.blurb}</span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 ease-out-soft group-hover:rotate-45">
                      <ArrowUpRight aria-hidden className="size-5" strokeWidth={2} />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
