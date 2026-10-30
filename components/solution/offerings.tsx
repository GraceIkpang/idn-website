import Image from "next/image";
import type { SolutionPage } from "@/lib/solution-pages";
import { sectionHeading, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Desktop column spans for the bento layout, repeating every four cards. */
const bentoSpans = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-7", "lg:col-span-5"];

/** What the solution includes, as illustrated wells in one shell or as an uneven bento grid. */
export function SolutionOfferings({ page }: { page: SolutionPage }) {
  const { heading, intro, items, layout = "grid" } = page.offerings;
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

        {layout === "bento" ? (
          <RevealGroup className="mt-12 grid gap-3 sm:mt-16 lg:grid-cols-12">
            {items.map((o, i) => (
              <RevealItem
                key={o.title}
                className={cn(
                  "flex flex-col-reverse gap-8 rounded-[24px] p-6 sm:min-h-[240px] sm:flex-row sm:items-center sm:justify-between sm:p-8",
                  bentoSpans[i % bentoSpans.length],
                  o.featured ? "bg-ink text-white" : "bg-layer-1",
                )}
              >
                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">{o.title}</h3>
                  <p
                    className={cn(
                      "mt-2 max-w-[42ch] text-base leading-relaxed text-pretty",
                      o.featured ? "text-white/70" : "text-text-secondary",
                    )}
                  >
                    {o.body}
                  </p>
                </div>
                <Image
                  src={o.image}
                  alt=""
                  width={o.width}
                  height={o.height}
                  className={cn(
                    "h-24 w-auto shrink-0 self-start object-contain outline-none sm:h-32 sm:self-auto",
                    !o.featured && "opacity-80",
                  )}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
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
        )}
      </div>
    </section>
  );
}
