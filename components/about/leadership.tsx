"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { leaders } from "@/lib/content";
import { sectionHeading, wrap } from "@/lib/layout";
import { duration, ease, stagger } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.out } },
};

/** Leadership portraits, then the managing director's quote. Portraits swipe on mobile. */
export function Leadership() {
  const md = leaders[0];
  return (
    <section aria-labelledby="leadership-title" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <div className="min-w-0">
          <Reveal>
            <Pill>Leadership</Pill>
            <h2 id="leadership-title" className={cn("mt-6", sectionHeading)}>
              Guided by experience. <span className="text-gold-ink">Driven by possibility.</span>
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg">
              Meet the people behind IDN, combining decades of experience, innovation and leadership to shape the
              company&rsquo;s direction.
            </p>
          </Reveal>

          <div className="-mx-5 mt-12 sm:mx-0 sm:mt-14">
            <motion.ul
              aria-label="Leadership team"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
              className="flex snap-x snap-mandatory scroll-px-5 gap-3 no-scrollbar overflow-x-auto px-5 pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
            >
              {leaders.map((p) => (
                <motion.li key={p.name} variants={item} className="w-[78%] shrink-0 snap-start sm:w-auto">
                  <figure className="group relative isolate aspect-[4/5] overflow-hidden rounded-[24px] bg-layer-2 outline-1 -outline-offset-1 outline-black/8">
                    <Image
                      src={p.image}
                      alt={`Portrait of ${p.name}`}
                      fill
                      sizes="(min-width: 1400px) 450px, (min-width: 640px) 33vw, 78vw"
                      className="-z-10 object-cover object-top transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.03]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0)_55%,rgb(0_0_0/0.75)_100%)]" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                      <p className="text-xl font-medium tracking-[-0.02em]">{p.name}</p>
                      <p className="mt-1 text-sm text-white/75">{p.role}</p>
                    </figcaption>
                  </figure>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Reveal className="mt-16 sm:mt-20">
            <figure className="rounded-[28px] bg-bone p-6 sm:p-10 lg:p-14">
              <span aria-hidden className="block text-6xl leading-[0.6] font-medium text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-6 max-w-[30ch] text-[1.625rem] leading-[1.18] font-medium tracking-[-0.035em] text-balance sm:text-[2rem] lg:text-[2.75rem]">
                Inside IDN, innovation is encouraged, learning is constant and excellence is the standard.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-layer-2">
                  <Image src={md.image} alt="" fill sizes="48px" className="object-cover object-top" />
                </span>
                <span>
                  <span className="block text-base font-medium">{md.name}</span>
                  <span className="block text-sm text-text-secondary">{md.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
