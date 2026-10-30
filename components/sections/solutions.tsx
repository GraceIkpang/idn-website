"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowRight, CodeXml, Network, Plus, Zap } from "lucide-react";
import { solutions } from "@/lib/content";
import { motion } from "motion/react";
import { sectionHeading, wrap } from "@/lib/layout";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { duration, ease, stagger } from "@/lib/motion";

const icons = { power: Zap, networking: Network, software: CodeXml } as const;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.out } },
};

/**
 * Solutions as shell cards: a light grey shell carries the title, a white well carries the
 * content. On lg+ the cards sit in one row and the selected one expands; below lg they stack open.
 */
export function Solutions() {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <section id="solutions" className="py-24 sm:py-32">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-12">
          <SectionLabel className="lg:col-span-2">Solutions</SectionLabel>
          <Reveal className="lg:col-span-10">
            <h2 className={sectionHeading}>
              Three disciplines.
              <br />
              <span className="text-gold-ink">One accountable team.</span>
            </h2>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
          className="mt-14 flex flex-col gap-3 lg:mt-20 lg:h-[640px] lg:flex-row"
        >
          {solutions.map((s, i) => {
            const open = i === active;
            const Icon = icons[s.id];
            const panelId = `${baseId}-${s.id}`;
            return (
              <motion.li
                variants={item}
                key={s.id}
                id={s.id}
                data-open={open}
                className="group/card relative flex min-w-0 flex-col rounded-[28px] bg-layer-1 p-2 shadow-[inset_0_0_0_1px_var(--color-line)] lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-out-soft lg:data-[open=false]:grow lg:data-[open=true]:grow-[2.6]"
              >
                {/* Shell header: category icon, title, index */}
                <div className="flex items-center gap-3 py-2 pr-2 pl-2">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-gold-ink shadow-[0_0_0_1px_var(--color-line)]">
                    <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="min-w-0 flex-1 truncate text-xl font-medium tracking-[-0.02em]">
                    <span className="lg:hidden">{s.title}</span>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      className="cursor-pointer text-left outline-none focus-visible:underline lg:after:absolute lg:after:inset-0 lg:after:z-10 lg:after:rounded-[28px] lg:group-data-[open=true]/card:after:hidden lg:group-data-[open=true]/card:cursor-default max-lg:hidden"
                    >
                      {s.title}
                    </button>
                  </h3>
                  <span className="shrink-0 rounded-full bg-layer-2 px-2.5 py-1 text-xs font-medium text-text-secondary tabular-nums">
                    {s.index}
                  </span>
                </div>

                {/* White well */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[20px] bg-surface lg:min-h-0">
                  <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      style={{ objectPosition: s.focus }}
                      className="object-cover outline-1 -outline-offset-1 outline-black/8 transition-transform duration-700 ease-out-soft lg:group-data-[open=false]/card:scale-[1.04]"
                    />
                    {"grade" in s && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(0_0_0/0)_35%,rgb(0_0_0/0.5)_100%)]"
                      />
                    )}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgb(0_0_0/0)_45%,rgb(0_0_0/0.35)_100%)] transition-opacity duration-500 lg:block lg:group-data-[open=true]/card:opacity-0"
                    />
                    <span
                      aria-hidden
                      className="absolute right-3 bottom-3 hidden size-10 place-items-center rounded-full bg-white/90 text-ink backdrop-blur-md transition-opacity duration-300 lg:grid lg:group-data-[open=true]/card:opacity-0"
                    >
                      <Plus className="size-4" strokeWidth={2} />
                    </span>
                  </div>

                  {/* Content: always shown when stacked; on lg only for the open card, fading in once it has room. */}
                  <div
                    id={panelId}
                    className="relative p-5 sm:p-6 lg:absolute lg:bottom-2 lg:left-2 lg:w-[min(420px,calc(100%-1rem))] lg:rounded-[12px] lg:bg-surface lg:p-6 lg:shadow-[0_0_0_1px_var(--color-line),0_16px_40px_-16px_rgb(0_0_0/0.35)] lg:transition-[opacity,translate,visibility] lg:group-data-[open=false]/card:invisible lg:group-data-[open=false]/card:translate-y-2 lg:group-data-[open=false]/card:opacity-0 lg:group-data-[open=false]/card:duration-150 lg:group-data-[open=true]/card:delay-300 lg:group-data-[open=true]/card:duration-500"
                  >
                    <p className="text-base leading-relaxed text-text-secondary text-pretty">{s.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.points.map((p) => (
                        <li key={p} className="inline-flex h-8 items-center gap-2 rounded-full bg-layer-1 px-3 text-sm whitespace-nowrap">
                          <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="press group/cta mt-6 inline-flex h-11 items-center gap-3 rounded-full bg-ink pr-1.5 pl-5 text-sm font-medium whitespace-nowrap text-white"
                    >
                      <span className="sm:hidden">Plan your project</span>
                      <span className="max-sm:hidden">Plan your {s.title.toLowerCase()} project</span>
                      <span className="grid size-8 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 ease-out-soft group-hover/cta:translate-x-0.5">
                        <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                      </span>
                    </a>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
