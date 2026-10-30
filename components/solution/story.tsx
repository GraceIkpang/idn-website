"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type MotionValue } from "motion/react";
import { BrickWall, Lightbulb, ThumbsUp } from "lucide-react";
import type { StoryStep } from "@/lib/solution-pages";
import { sectionSpace, wrap } from "@/lib/layout";
import { duration, ease } from "@/lib/motion";
import { useAutoCycle } from "@/lib/use-auto-cycle";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** How long each step stays open, in ms. Long enough to read the paragraph. */
const DWELL = 6000;
const icons = { challenge: BrickWall, approach: Lightbulb, benefits: ThumbsUp } as const;
const shortLabel = { challenge: "Challenge", approach: "Approach", benefits: "Benefits" } as const;

function Progress({ value, active, className }: { value: MotionValue<number>; active: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn("block h-0.5 overflow-hidden rounded-full", className)}>
      <motion.span className="block h-full origin-left bg-gold" style={{ scaleX: active ? value : 0 }} />
    </span>
  );
}

/**
 * Challenge, approach and benefits. Steps advance on their own while on screen; hover, focus or a tap
 * takes over. Desktop widens the open card into a photo; mobile keeps one fixed-height photo panel with tabs
 * below, so the page never jumps as steps change. With reduced motion the steps only change when chosen.
 */
export function SolutionStory({ steps }: { steps: readonly StoryStep[] }) {
  const reduce = useReducedMotion();
  const { ref, active, select, progress, pauseProps } = useAutoCycle<HTMLDivElement>(steps.length, DWELL, {
    enabled: !reduce,
  });
  const current = steps[active];

  return (
    <section aria-labelledby="story-title" className={sectionSpace}>
      <h2 id="story-title" className="sr-only">
        The challenge, our approach and the benefits
      </h2>
      <Reveal className={wrap}>
        <div ref={ref} {...pauseProps}>
          {/* Desktop: expanding cards */}
          <div className="hidden h-[560px] gap-3 lg:flex">
            {steps.map((s, i) => (
              <DesktopCard key={s.key} step={s} open={i === active} progress={progress} onSelect={() => select(i)} />
            ))}
          </div>

          {/* Mobile and tablet: photo panel with tabs */}
          <div className="lg:hidden">
            <div className="relative isolate h-[500px] overflow-hidden rounded-[24px] bg-ink text-white sm:h-[560px]">
              {steps.map((s, i) => (
                <motion.div
                  key={s.key}
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: ease.inOut }}
                >
                  <Image src={s.image} alt="" fill sizes="100vw" className="object-cover" />
                </motion.div>
              ))}
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_35%,rgb(0_0_0/0.45))]" />
              <div
                className="absolute inset-x-3 bottom-3 overflow-hidden rounded-[18px] bg-black/35 p-5 ring-1 ring-white/15 backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:p-6"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } }}
                    exit={{ opacity: 0, y: -4, transition: { duration: duration.fast } }}
                  >
                    <StepText step={current} tone="dark" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div role="group" aria-label="Steps" className="mt-2 grid grid-cols-3 gap-2">
              {steps.map((s, i) => {
                const Icon = icons[s.key];
                return (
                  <button
                    key={s.key}
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => select(i)}
                    className="rounded-[16px] bg-layer-1 p-3 text-left transition-colors duration-150 aria-pressed:bg-layer-2 sm:p-4"
                  >
                    <Progress value={progress} active={i === active} className="bg-black/8" />
                    <span className="mt-3 flex items-center gap-2">
                      <Icon aria-hidden className="hidden size-4 shrink-0 sm:block" strokeWidth={1.75} />
                      <span className={cn("truncate text-sm font-medium", i !== active && "text-text-secondary")}>
                        {shortLabel[s.key]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function StepText({ step, tone }: { step: StoryStep; tone: "dark" | "light" }) {
  const Icon = icons[step.key];
  const dark = tone === "dark";
  return (
    <>
      <span
        className={cn(
          "grid size-11 place-items-center rounded-full transition-colors duration-500",
          dark ? "bg-white/15 text-white" : "bg-surface text-ink",
        )}
      >
        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
      </span>
      <span className="mt-5 block text-2xl font-medium tracking-[-0.02em]">{step.title}</span>
      <span
        className={cn(
          "mt-2 block max-w-[46ch] text-base leading-relaxed text-pretty transition-colors duration-500",
          dark ? "text-white/85" : "text-text-secondary",
        )}
      >
        {step.body}
      </span>
    </>
  );
}

function DesktopCard({
  step,
  open,
  progress,
  onSelect,
}: {
  step: StoryStep;
  open: boolean;
  progress: MotionValue<number>;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={open}
      onClick={onSelect}
      data-open={open}
      className="group/card relative isolate flex min-w-0 grow basis-0 flex-col justify-end overflow-hidden rounded-[28px] bg-layer-1 p-3 text-left transition-[flex-grow,background-color] duration-700 ease-in-out-soft hover:bg-layer-2 data-[open=true]:grow-[1.9] data-[open=true]:bg-ink"
    >
      <span aria-hidden className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-data-[open=true]/card:opacity-100">
        <Image src={step.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(0_0_0/0.4))]" />
      </span>

      <span
        className={cn(
          "block rounded-[20px] p-6 transition-[background-color,color,box-shadow,backdrop-filter] duration-500",
          open ? "bg-black/35 text-white ring-1 ring-white/15 backdrop-blur-xl" : "text-ink",
        )}
      >
        <Progress value={progress} active={open} className={cn("mb-6 transition-opacity duration-500", open ? "bg-white/20" : "opacity-0")} />
        <StepText step={step} tone={open ? "dark" : "light"} />
      </span>
    </button>
  );
}
