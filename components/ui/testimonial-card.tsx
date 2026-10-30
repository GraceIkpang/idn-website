import { Quote } from "lucide-react";
import { cn } from "@/lib/cn";

type Testimonial = { quote: string; name: string; role: string };

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("flex w-[300px] shrink-0 flex-col rounded-[20px] bg-layer-1 p-6 sm:w-[360px]", className)}>
      <Quote aria-hidden className="size-5 fill-gold text-gold" strokeWidth={0} />
      <blockquote className="mt-4 text-base leading-relaxed text-text-primary">{t.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span aria-hidden className="grid size-9 place-items-center rounded-full bg-gold-tint text-xs font-semibold text-gold-ink">
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">{t.name}</span>
          <span className="block truncate text-xs text-text-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
