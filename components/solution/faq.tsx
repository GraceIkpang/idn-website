import { sectionHeading, sectionSpace, wrap } from "@/lib/layout";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export function SolutionFaq({ title, items }: { title: string; items: readonly { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="solution-faq-title" className={sectionSpace}>
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-5">
          <Pill>FAQ</Pill>
          <h2 id="solution-faq-title" className={cn("mt-6 max-w-[14ch] text-balance", sectionHeading)}>
            {title} <span className="text-gold-ink">questions, answered.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="lg:col-span-7">
          <FaqAccordion tone="line" items={items} />
        </Reveal>
      </div>
    </section>
  );
}
