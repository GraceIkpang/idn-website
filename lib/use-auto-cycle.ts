"use client";

import { useRef, useState } from "react";
import { useAnimationFrame, useInView, useMotionValue } from "motion/react";

/**
 * Steps through `count` items every `dwell` ms while the bound element is on screen.
 * Mouse hover or keyboard focus inside the element pauses it. `progress` (0 to 1) drives progress bars
 * without re-rendering every frame. Pass `enabled: false` to keep it still until someone picks an item.
 */
export function useAutoCycle<T extends HTMLElement>(count: number, dwell: number, { enabled = true } = {}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const progress = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (!enabled || paused || !inView) return;
    const next = progress.get() + delta / dwell;
    if (next >= 1) {
      progress.set(0);
      setActive((i) => (i + 1) % count);
    } else {
      progress.set(next);
    }
  });

  const select = (i: number) => {
    progress.set(0);
    setActive(i);
  };

  const pauseProps = {
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setPaused(true),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: (e: React.FocusEvent) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false),
  };

  return { ref, active, select, progress, pauseProps };
}
