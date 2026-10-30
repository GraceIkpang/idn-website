import { partners } from "@/lib/content";
import { wrap } from "@/lib/layout";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { cn } from "@/lib/cn";

const facts = [
  ["Two offices", "Abuja and Lagos, delivering nationwide"],
  ["Three disciplines", "Power, networking and software"],
  ["One team", "From first assessment to long-term support"],
] as const;

export function About() {
  return (
    <section id="about" className="bg-bone py-24 sm:py-32 lg:py-40">
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
        <SectionLabel className="lg:col-span-2">About IDN</SectionLabel>
        <div className="lg:col-span-10">
          <Statement />
          <Reveal className="mt-14 grid gap-px overflow-hidden rounded-[20px] bg-line sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-bone p-6 sm:py-8">
                <p className="text-2xl font-medium tracking-[-0.035em]">{k}</p>
                <p className="mt-2 text-base text-text-secondary">{v}</p>
              </div>
            ))}
          </Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="text-sm text-text-muted">Trusted by</p>
            {/* PLACEHOLDER: partner SVG logos */}
            {partners.map((p) => (
              <span key={p} className="text-lg font-semibold tracking-tight text-text-primary/35">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
