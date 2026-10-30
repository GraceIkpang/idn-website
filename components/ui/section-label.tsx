import { cn } from "@/lib/cn";

/** Small muted label that sits beside a section heading. */
export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-text-muted", className)}>{children}</p>;
}
