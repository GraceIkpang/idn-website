"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { duration, ease, stagger } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fades content up once as it enters the viewport. */
export function Reveal({ delay = 0, y = 16, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.reveal, ease: ease.out, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct RevealItem children in small groups. */
export function RevealGroup({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.out } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
