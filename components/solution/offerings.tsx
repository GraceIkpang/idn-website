import Image from "next/image";
import type { SolutionPage } from "@/lib/solution-pages";
import { sectionHeading, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** What the solution includes: illustrated wells inside one shell. */
export function SolutionOfferings({ page }: { page: SolutionPage }) {
  const { heading, intro, items } = page.offerings;
  return (
    <section id="offerings" aria-labelledby="offerings-title" className="scroll-mt-24 pb-24 sm:pb-32">
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>What we offer</Pill>
            <h2 id="offerings-title" className={cn("mt-6 max-w-[18ch] text-balance", sectionHeading)}>
              {heading}
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            {intro}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-2 rounded-[28px] bg-layer-1 p-2 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((o) => (
            <RevealItem key={o.title} className="flex flex-col rounded-[20px] bg-surface p-6 sm:p-8">
              <div className="flex h-36 items-center justify-center sm:h-40">
                <Image
                  src={o.image}
                  alt=""
                  width={o.width}
                  height={o.height}
                  className="h-auto max-h-full w-auto max-w-full object-contain opacity-80 outline-none"
                />
              </div>
              <h3 className="mt-8 text-xl font-medium tracking-[-0.02em]">{o.title}</h3>
              <p className="mt-2 max-w-[40ch] text-base leading-relaxed text-text-secondary text-pretty">{o.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
