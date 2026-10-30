import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { cn } from "@/lib/cn";

function Row({ items, reverse }: { items: readonly (typeof testimonials)[number][]; reverse?: boolean }) {
  return (
    <div className="group/row overflow-hidden motion-reduce:no-scrollbar motion-reduce:overflow-x-auto">
      <div
        className={cn(
          "flex w-max gap-4 pr-4 group-hover/row:[animation-play-state:paused] group-focus-within/row:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {/* Duplicated once for a seamless loop; the copy is hidden from assistive tech. */}
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="flex gap-4 motion-reduce:[&:nth-child(2)]:hidden">
            {items.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section aria-labelledby="testimonials-title" className="py-20 sm:py-28">
      <Reveal className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <h2 id="testimonials-title" className="text-4xl leading-[1.02] font-medium tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          What our clients say
        </h2>
        <p className="mx-auto mt-4 max-w-[44ch] text-base text-text-secondary">
          Homes, businesses and institutions running on IDN power and networks.
        </p>
      </Reveal>
      <div className="mt-12 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <Row items={testimonials.slice(0, half)} />
        <Row items={testimonials.slice(half)} reverse />
      </div>
    </section>
  );
}
