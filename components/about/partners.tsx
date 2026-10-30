import { partners, sectors } from "@/lib/content";
import { sectionHeading, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** One marquee row. Each copy repeats the list so it is always wider than the band, keeping the loop seamless. */
function LogoRow({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  const run = [...items, ...items];
  return (
    <div className="group/row overflow-hidden motion-reduce:no-scrollbar motion-reduce:overflow-x-auto">
      <div
        className={cn(
          "flex w-max group-hover/row:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex motion-reduce:[&:nth-child(2)]:hidden">
            {run.map((p, i) => (
              // PLACEHOLDER: swap the wordmark for the partner's SVG logo
              <li
                key={`${p}-${i}`}
                aria-hidden={i >= items.length || undefined}
                className="grid h-20 w-40 shrink-0 place-items-center text-lg font-semibold sm:text-xl tracking-tight text-text-primary/35 transition-colors duration-150 hover:text-text-primary sm:h-28 sm:w-60"
              >
                {p}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section aria-labelledby="partners-title" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>Trusted by</Pill>
            <h2 id="partners-title" className={cn("mt-6 max-w-[18ch] text-balance", sectionHeading)}>
              Relied on by businesses <span className="text-gold-ink">across Nigeria.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg">
              From banks and schools to retail chains and family homes, our clients count on IDN to keep them powered
              and connected.
            </p>
            <ul aria-label="Sectors we serve" className="mt-6 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s} className="inline-flex h-9 items-center rounded-full bg-layer-1 px-4 text-sm whitespace-nowrap">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-[28px] bg-layer-1 p-2 sm:mt-16">
          <div className="overflow-hidden rounded-[20px] bg-surface">
            <div className="divide-y divide-line [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
              <LogoRow items={partners} />
              {/* Same partners in reverse, for texture; read once by assistive tech. */}
              <div aria-hidden>
                <LogoRow items={[...partners].reverse()} reverse />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
