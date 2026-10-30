import { Binoculars, ShieldCheck, Target, type LucideIcon } from "lucide-react";
import { principles } from "@/lib/content";
import { wrap } from "@/lib/layout";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const cards: { title: string; icon: LucideIcon; body?: string; tags?: readonly string[] }[] = [
  { title: "Vision", icon: Binoculars, body: principles.vision },
  { title: "Mission", icon: Target, body: principles.mission },
  { title: "Values", icon: ShieldCheck, tags: principles.values },
];

/** Vision, mission and values in one shell. Values read as tags rather than a sentence. */
export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="pb-24 sm:pb-32">
      <h2 id="principles-title" className="sr-only">
        Vision, mission and values
      </h2>
      <div className={wrap}>
        <RevealGroup className="grid gap-2 rounded-[28px] bg-layer-1 p-2 lg:grid-cols-3">
          {cards.map(({ title, icon: Icon, body, tags }) => (
            <RevealItem key={title} className="flex flex-col rounded-[20px] bg-surface p-6 sm:p-8">
              <span className="grid size-11 place-items-center rounded-full bg-gold-tint text-gold-ink">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-10 text-2xl font-medium tracking-[-0.035em] lg:mt-16">{title}</h3>
              {body && <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-text-secondary text-pretty">{body}</p>}
              {tags && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <li key={t} className="inline-flex h-9 items-center rounded-full bg-layer-1 px-4 text-sm whitespace-nowrap">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
