// Motion tokens. The full rationale lives in docs/motion-plan.md.
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  reveal: 0.6,
  hero: 0.9,
} as const;

export const stagger = 0.08;
