"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { duration, ease, stagger } from "@/lib/motion";
import { StickyHeader, TopNav } from "@/components/ui/site-header";

const line = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: duration.hero, ease: ease.out } },
};

export function Hero() {
  return (
    <>
      <StickyHeader current="Home" />
      <section id="top" className="p-2 sm:p-3">
        <div className="relative isolate flex min-h-[640px] flex-col overflow-hidden rounded-[24px] bg-ink text-white sm:rounded-[32px] lg:h-[calc(100svh-1.5rem)] lg:max-h-[940px]">
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 1.6, ease: ease.out }}
          >
            <Image
              src="/images/hero-engineer.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[60%_30%]"
            />
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-black/50"
          />

          <TopNav dark current="Home" />

          <motion.div
            className="mt-auto grid gap-10 px-5 pt-32 pb-6 sm:px-8 sm:pb-8 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-12 lg:pb-20"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.2 } } }}
          >
            <div className="lg:col-span-8">
              <motion.p
                variants={line}
                className="inline-flex h-8 items-center gap-2 rounded-full bg-white/12 px-3 text-sm text-white/90 backdrop-blur-md"
              >
                <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
                Power, networking and software
              </motion.p>
              <h1 className="mt-5 font-outfit text-[2.75rem] leading-[0.98] font-medium tracking-[-0.035em] sm:text-6xl lg:text-[5.5rem]">
                <motion.span variants={line} className="block">
                  Reliable energy
                </motion.span>
                <motion.span variants={line} className="block">
                  for homes&nbsp;<span className="text-gold">&amp;</span> businesses
                </motion.span>
              </h1>
              <motion.p variants={line} className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/80 sm:text-lg">
                Solar and backup power, enterprise networking and custom software. Designed, installed and
                supported by one team.
              </motion.p>
              <motion.div variants={line} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#solutions"
                  className="press group relative inline-flex h-14 items-center justify-center gap-4 rounded-full bg-gold px-14 text-base font-medium text-ink sm:static sm:justify-start sm:pr-2 sm:pl-6"
                >
                  Explore solutions
                  <span className="absolute right-2 grid size-10 place-items-center rounded-full bg-ink text-white transition-transform duration-300 ease-out-soft group-hover:rotate-45 sm:static">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </a>
                <a
                  href="#tapsun"
                  className="press inline-flex h-14 items-center justify-center rounded-full bg-white/12 px-6 text-base font-medium backdrop-blur-md transition-colors duration-150 hover:bg-white/20"
                >
                  Get a backup recommendation
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
