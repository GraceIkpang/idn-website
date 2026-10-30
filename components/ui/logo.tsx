import { cn } from "@/lib/cn";

/** IDN monogram. Inherits `color`, so set it with a text-* class. */
export function Logo({ className, label = "IDN home" }: { className?: string; label?: string }) {
  return (
    <a href="#top" aria-label={label} className={cn("inline-flex items-center rounded-sm", className)}>
      <span aria-hidden className="idn-mark h-7 sm:h-8" />
    </a>
  );
}
