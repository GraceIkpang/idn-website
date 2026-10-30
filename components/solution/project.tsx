import Image from "next/image";
import { Quote } from "lucide-react";
import type { FeaturedProject } from "@/lib/solution-pages";
import { sectionHeading, sectionSpace, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** One real installation: photos, key numbers and what the client said. */
export function SolutionProject({ project }: { project: FeaturedProject }) {
  const [main, second] = project.images;
  const t = project.testimonial;
  return (
    <section aria-labelledby="project-title" className={sectionSpace}>
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-12 lg:gap-8")}>
        <Reveal className="grid grid-cols-5 gap-2 lg:col-span-7">
          <div className={cn("relative col-span-5 aspect-[4/3] overflow-hidden rounded-[24px] bg-layer-1 sm:aspect-auto sm:min-h-[520px]", second && "sm:col-span-3")}>
            <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 35vw, (min-width: 640px) 60vw, 100vw" className="object-cover" />
          </div>
          {second && (
            <div className="relative hidden overflow-hidden rounded-[24px] bg-layer-1 sm:col-span-2 sm:block">
              <Image src={second.src} alt={second.alt} fill sizes="(min-width: 1024px) 24vw, 40vw" className="object-cover" />
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col lg:col-span-5">
          <Pill className="self-start">Featured project</Pill>
          <h2 id="project-title" className={cn("mt-6 text-balance", sectionHeading)}>
            {project.title}
          </h2>
          <p className="mt-2 text-base text-text-muted">{project.place}</p>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg">{project.summary}</p>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
            {project.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-text-secondary">{f.label}</dt>
                <dd className="text-2xl font-medium tracking-[-0.035em] tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>

          <figure className="mt-8 rounded-[20px] bg-bone p-6">
            <Quote aria-hidden className="size-5 fill-gold text-gold" strokeWidth={0} />
            <blockquote className="mt-3 text-base leading-relaxed text-text-primary text-pretty">{t.quote}</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-medium">{t.name}</span>
              <span className="text-text-muted">, {t.role}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
