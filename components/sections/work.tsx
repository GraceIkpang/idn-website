"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/lib/content";
import { sectionHeading } from "@/lib/layout";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/cn";

/** Selected projects as a native scroll-snap strip with button controls. Works with touch, trackpad and keyboard. */
export function Work() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const el = track.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };

  return (
    <section aria-labelledby="work-title" className="bg-bone py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Selected work</SectionLabel>
          <h2 id="work-title" className={cn("mt-6", sectionHeading)}>
            On the ground
          </h2>
        </Reveal>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous project"
            disabled={active === 0}
            onClick={() => scrollTo(Math.max(0, active - 1))}
            className="press grid size-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-line)] transition-opacity duration-150 disabled:opacity-30"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next project"
            disabled={active >= projects.length - 1}
            onClick={() => scrollTo(Math.min(projects.length - 1, active + 1))}
            className="press grid size-12 place-items-center rounded-full bg-ink text-white transition-opacity duration-150 disabled:opacity-30"
          >
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={onScroll}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:scroll-px-8 sm:px-8 xl:scroll-px-[max(2rem,calc((100vw-1400px)/2+2rem))] xl:px-[max(2rem,calc((100vw-1400px)/2+2rem))]"
      >
        {projects.map((p, i) => (
          <li key={p.title} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[34%]">
            <figure className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-layer-2">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="min-w-0 text-base font-medium">{p.title}</span>
                <span className="shrink-0 text-sm text-text-muted tabular-nums">
                  0{i + 1} · {p.place}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
