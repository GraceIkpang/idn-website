"use client";

import { MotionConfig } from "motion/react";

// "user" drops transform animations for people who prefer reduced motion; opacity fades remain.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
