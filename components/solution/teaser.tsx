"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUp, Database, Sparkles } from "lucide-react";
import type { SolutionPage } from "@/lib/solution-pages";
import { sectionSpace, wrap } from "@/lib/layout";
import { Reveal } from "@/components/ui/reveal";
import { contactHref, type ContactTopic } from "@/lib/content";
import { cn } from "@/lib/cn";

type Phase = "typing" | "thinking" | "answering" | "done";

/** Timings for the preview, in ms. */
const TYPE_MS = 32;
const THINK_MS = 900;
const WORD_MS = 55;
const HOLD_MS = 3800;

function Caret() {
  return <span aria-hidden className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] animate-pulse bg-sky-300" />;
}

function AiMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-[conic-gradient(from_200deg,var(--color-gold),var(--color-interdigital),rgb(56_189_248),var(--color-gold))] text-white",
        className,
      )}
    >
      <Sparkles className="size-[55%]" strokeWidth={2} />
    </span>
  );
}

/**
 * "Coming soon" card for IDN AI with a self-playing preview: a question types itself, the assistant thinks,
 * then streams an answer with its data source. Visitors can pick an example to replay it. With reduced motion
 * the answer shows in full and nothing advances on its own. The preview is decorative; the examples are
 * repeated as plain text for screen readers.
 */
export function SolutionTeaser({ teaser, topic }: { teaser: NonNullable<SolutionPage["teaser"]>; topic: ContactTopic }) {
  const { examples } = teaser;
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const inView = useInView(panel, { amount: 0.5 });

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [chars, setChars] = useState(0);
  const [words, setWords] = useState(0);

  const ex = examples[idx];
  const answerWords = ex.answer.split(" ");

  useEffect(() => {
    if (reduce || !inView) return;
    if (phase === "typing") {
      if (chars >= ex.prompt.length) {
        const t = window.setTimeout(() => setPhase("thinking"), 250);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setChars((c) => c + 1), TYPE_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "thinking") {
      const t = window.setTimeout(() => setPhase("answering"), THINK_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "answering") {
      if (words >= answerWords.length) {
        setPhase("done");
        return;
      }
      const t = window.setTimeout(() => setWords((w) => w + 1), WORD_MS);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => play((idx + 1) % examples.length), HOLD_MS);
    return () => window.clearTimeout(t);
    // play is stable for our purposes; it only resets state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, chars, words, idx, inView, reduce]);

  function play(i: number) {
    setIdx(i);
    setChars(0);
    setWords(0);
    setPhase("typing");
  }

  // Reduced motion: always show the finished exchange.
  const showChars = reduce ? ex.prompt.length : chars;
  const showPhase: Phase = reduce ? "done" : phase;
  const showWords = reduce ? answerWords.length : words;

  return (
    <section aria-labelledby="teaser-title" className={sectionSpace}>
      <Reveal className={wrap}>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-navy text-white">
          {/* Dot grid, faint network lines and two drifting glows behind the preview. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.09)_1px,transparent_1px)] [mask-image:radial-gradient(70%_80%_at_75%_50%,black,transparent)] bg-[size:24px_24px]" />
            <svg className="absolute inset-0 size-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 60">
              <g stroke="rgb(125 211 252)" strokeWidth="0.08" fill="none">
                <path d="M55 8 L70 18 L88 10 M70 18 L76 34 L94 40 M76 34 L60 46 L72 56 M60 46 L52 30 L55 8" />
              </g>
              <g fill="rgb(186 230 253)">
                {[[55, 8], [70, 18], [88, 10], [76, 34], [94, 40], [60, 46], [72, 56], [52, 30]].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="0.45" />
                ))}
              </g>
            </svg>
            <div className="animate-drift absolute top-[-25%] right-[-10%] aspect-square w-[60%] rounded-full bg-[radial-gradient(circle,rgb(56_189_248/0.55),transparent_65%)] blur-2xl" />
            <div className="animate-drift-slow absolute right-[25%] bottom-[-40%] aspect-square w-[45%] rounded-full bg-[radial-gradient(circle,var(--color-interdigital),transparent_65%)] opacity-70 blur-2xl" />
          </div>

          <div className="grid gap-12 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-16 lg:py-20">
            <div className="lg:col-span-5">
              <p className="inline-flex h-8 items-center gap-2 rounded-full bg-white/10 px-3 text-sm text-gold ring-1 ring-white/10">
                <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
                {teaser.tag}
              </p>
              <h2
                id="teaser-title"
                className="mt-6 flex items-center gap-4 text-5xl font-medium tracking-[-0.035em] sm:text-6xl"
              >
                <AiMark className="size-12 sm:size-14" />
                <span className="bg-[linear-gradient(90deg,#fff_40%,rgb(125_211_252))] bg-clip-text text-transparent">
                  {teaser.title}
                </span>
              </h2>
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/80 text-pretty sm:text-lg">{teaser.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {teaser.abilities.map((a) => (
                  <li key={a} className="inline-flex h-9 items-center gap-2 rounded-full bg-white/8 px-3.5 text-sm text-white/85 ring-1 ring-white/10">
                    <Sparkles aria-hidden className="size-3.5 text-sky-300" strokeWidth={2} />
                    {a}
                  </li>
                ))}
              </ul>
              <a
                href={contactHref(topic)}
                className="press group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-white pr-2 pl-5 text-base font-medium text-navy"
              >
                {teaser.cta}
                <span className="grid size-8 place-items-center rounded-full bg-navy text-white transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5">
                  <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                </span>
              </a>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <ul className="sr-only">
                {examples.map((e) => (
                  <li key={e.prompt}>
                    Example question: {e.prompt} Example answer: {e.answer}
                  </li>
                ))}
              </ul>

              <div
                ref={panel}
                aria-hidden
                className="overflow-hidden rounded-[22px] bg-white/[0.06] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/12 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                  <span className="flex items-center gap-2.5 text-sm font-medium">
                    <AiMark className="size-7" />
                    IDN AI
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/60">Preview</span>
                </div>

                <div className="flex min-h-[280px] flex-col gap-5 p-5 sm:min-h-[260px] sm:p-6">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-[18px] rounded-br-[6px] bg-white/12 px-4 py-3 text-base">
                      {ex.prompt.slice(0, showChars)}
                      {showPhase === "typing" && <Caret />}
                    </p>
                  </div>

                  {showPhase !== "typing" && (
                    <div className="flex gap-3">
                      <AiMark className="mt-0.5 size-7" />
                      <div className="min-w-0 flex-1">
                        {showPhase === "thinking" ? (
                          <p className="flex h-7 items-center gap-1.5 text-sm text-white/60">
                            Thinking
                            {[0, 150, 300].map((d) => (
                              <span key={d} className="size-1.5 animate-pulse rounded-full bg-sky-300" style={{ animationDelay: `${d}ms` }} />
                            ))}
                          </p>
                        ) : (
                          <>
                            <p className="text-base leading-relaxed text-white/90">
                              {answerWords.slice(0, showWords).join(" ")}
                              {showPhase === "answering" && <Caret />}
                            </p>
                            <p
                              className={cn(
                                "mt-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-white/8 px-2.5 text-xs text-white/60 transition-opacity duration-300",
                                showPhase === "done" ? "opacity-100" : "opacity-0",
                              )}
                            >
                              <Database className="size-3" strokeWidth={2} />
                              Source: {ex.source}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <div className="flex h-12 items-center justify-between rounded-full bg-white/[0.06] pr-1.5 pl-4 text-sm text-white/40 ring-1 ring-white/10">
                    Ask IDN AI anything…
                    <span className="grid size-9 place-items-center rounded-full bg-white/90 text-navy">
                      <ArrowUp className="size-4" strokeWidth={2.25} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-white/50">Try:</span>
                {examples.map((e, i) => (
                  <button
                    key={e.prompt}
                    type="button"
                    aria-pressed={i === idx}
                    onClick={() => play(i)}
                    className="rounded-full bg-white/8 px-3.5 py-2 text-left text-sm text-white/75 ring-1 ring-white/10 transition-colors duration-150 hover:bg-white/14 hover:text-white aria-pressed:bg-white/16 aria-pressed:text-white"
                  >
                    {e.prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
