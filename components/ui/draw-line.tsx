"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Gold hairline that draws from the left when it scrolls in. `className` styles the track. */
export function DrawLine({ delay = 0, className }: { delay?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("h-px", className ?? "bg-white/15")}>
      <motion.div
        className="h-px origin-left bg-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1, ease: ease.out, delay }}
      />
    </div>
  );
}
