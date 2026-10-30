import { cn } from "@/lib/cn";

const tones = {
  light: "bg-layer-1 text-text-secondary",
  white: "bg-surface text-text-secondary",
  dark: "bg-white/10 text-white/90",
  glass: "bg-white/12 text-white/90 backdrop-blur-md",
} as const;

/** Section tag: a small rounded label with the gold diamond. */
export function Pill({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <p className={cn("inline-flex h-8 items-center gap-2 rounded-full px-3 text-sm whitespace-nowrap", tones[tone], className)}>
      <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
      {children}
    </p>
  );
}
