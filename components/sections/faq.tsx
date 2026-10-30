import { sectionHeading, wrap } from "@/lib/layout";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { cn } from "@/lib/cn";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="pb-24 sm:pb-32">
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-5">
          <SectionLabel>FAQ</SectionLabel>
          <h2 id="faq-title" className={cn("mt-6", sectionHeading)}>
            Good questions, <span className="text-gold-ink">straight answers.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="lg:col-span-7">
          <FaqAccordion tone="line" />
        </Reveal>
      </div>
    </section>
  );
}
