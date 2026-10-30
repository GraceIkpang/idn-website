"use client";

import { motion } from "motion/react";
import { wrap } from "@/lib/layout";
import { duration, ease, stagger } from "@/lib/motion";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";

const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.hero, ease: ease.out } },
};

/** About page opener: the story headline and paragraph. */
export function Intro() {
  return (
    <section aria-labelledby="about-title" className={cn(wrap, "pt-14 pb-20 sm:pt-24 sm:pb-28 lg:pt-28")}>
      <motion.div
        className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } } }}
      >
        <div className="lg:col-span-7">
          <motion.div variants={line}>
            <Pill>About IDN</Pill>
          </motion.div>
          <motion.h1
            variants={line}
            id="about-title"
            className="mt-5 text-[2.75rem] leading-[0.98] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.5rem]"
          >
            IDN was built <span className="text-gold-ink">to solve what businesses rely on most.</span>
          </motion.h1>
        </div>
        <motion.p
          variants={line}
          className="max-w-[52ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5"
        >
          Unreliable power, fragmented connectivity and inefficient digital systems create friction every day. IDN
          exists to remove that friction. Across alternative power, enterprise networking and custom software, we
          bring technical disciplines together under one trusted identity.
        </motion.p>
      </motion.div>
    </section>
  );
}
