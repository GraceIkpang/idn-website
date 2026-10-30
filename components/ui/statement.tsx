"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const TEXT =
  "At IDN, we deliver end-to-end systems that keep operations running, from solar and inverter installs to enterprise fiber, secure intercom and the custom software that ties it together.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

/** Words brighten as the paragraph scrolls through the viewport. The full text is always in the DOM. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const reduce = useReducedMotion();
  const words = TEXT.split(" ");

  return (
    <p
      ref={ref}
      className="text-[1.625rem] leading-[1.18] font-medium tracking-[-0.035em] sm:text-[2rem] lg:text-[2.75rem]"
    >
      <span className="sr-only">{TEXT}</span>
      <span aria-hidden>
        {reduce ? TEXT : words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}
