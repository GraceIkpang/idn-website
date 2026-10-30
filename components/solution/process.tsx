import type { ProcessStep } from "@/lib/solution-pages";
import { sectionHeading, sectionSpace, wrap } from "@/lib/layout";
import { DrawLine } from "@/components/ui/draw-line";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** What happens after someone gets in touch: steps under hairlines, or numbered cards. */
export function SolutionProcess({
  heading,
  steps,
  layout = "line",
}: {
  heading: readonly [string, string];
  steps: readonly ProcessStep[];
  layout?: "line" | "cards";
}) {
  return (
    <section aria-labelledby="process-title" className={sectionSpace}>
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>How it works</Pill>
            <h2 id="process-title" className={cn("mt-6 max-w-[16ch] text-balance", sectionHeading)}>
              {heading[0]} <span className="text-gold-ink">{heading[1]}</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            One team handles every step, so you always know what happens next and who to call.
          </p>
        </Reveal>

        {layout === "cards" ? (
          <ol className="mt-12 grid gap-2 rounded-[28px] bg-layer-1 p-2 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-[20px] bg-surface">
                <Reveal delay={i * 0.08} className="flex h-full flex-col p-6 sm:p-8">
                  <span className="text-5xl tracking-[-0.04em] text-gold-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-10 text-xl font-medium tracking-[-0.02em] sm:mt-16">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary text-pretty">{s.body}</p>
                  {s.time && <p className="mt-auto pt-6 text-sm text-text-muted">{s.time}</p>}
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title}>
                <DrawLine delay={i * 0.12} className="bg-line" />
                <Reveal delay={0.1 + i * 0.08}>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sm text-gold-ink tabular-nums">Step {i + 1}</span>
                    {s.time && (
                      <span className="inline-flex h-7 items-center rounded-full bg-layer-1 px-3 text-xs whitespace-nowrap text-text-secondary">
                        {s.time}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary text-pretty">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
