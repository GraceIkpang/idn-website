import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { contactHref, externalProps, pillars, tapsunUrl } from "@/lib/content";
import { sectionHeading, wrap } from "@/lib/layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DrawLine } from "@/components/ui/draw-line";

const tiles = [
  {
    id: "tapsun",
    href: tapsunUrl ?? contactHref("tapsun"),
    tag: "Marketplace",
    title: "TapSun",
    body: "Inverters, batteries, solar panels and complete energy kits, ready to ship.",
    action: "Shop TapSun",
    image: "/images/project-tapsun-marketplace.png",
    alt: "IDN TapSun inverter unit",
  },
  {
    id: "consultation",
    href: contactHref("consultation"),
    tag: "Free consultation",
    title: "Unsure what your site needs?",
    body: "Share how you use power and an IDN engineer will recommend a backup system that fits your load and budget, at no cost.",
    action: "Book a free consultation",
    image: "/images/service-backup-team.png",
    alt: "Three engineers reviewing plans in front of solar panels",
  },
] as const;

/** Dark band: TapSun and free consultation tiles, then the four reasons to choose IDN. */
export function Products() {
  return (
    <section id="tapsun" className="bg-ink py-24 text-white sm:py-32">
      <div className={wrap}>
        <RevealGroup className="grid gap-4 lg:grid-cols-2">
          {tiles.map((t) => (
            <RevealItem key={t.id}>
              <a href={t.href} {...externalProps(t.href)} className="group relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[24px] p-6 sm:min-h-[560px] sm:p-8">
                <Image
                  src={t.image}
                  alt={t.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0)_35%,rgb(0_0_0/0.85)_100%)]" />
                <span className="absolute top-6 left-6 rounded-full bg-gold px-3 py-1 text-xs font-medium text-ink sm:top-8 sm:left-8">
                  {t.tag}
                </span>
                <h3 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl">{t.title}</h3>
                <p className="mt-3 max-w-[40ch] text-base text-white/75">{t.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-base font-medium">
                  {t.action}
                  <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 ease-out-soft group-hover:rotate-45" strokeWidth={2} />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-24 grid gap-6 sm:mt-32 lg:grid-cols-12">
          <p className="text-sm text-white/50 lg:col-span-2">Why IDN</p>
          <Reveal className="lg:col-span-10">
            <h2 className={sectionHeading}>
              Built right, <span className="text-gold">then looked after.</span>
            </h2>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {pillars.map((p, i) => (
            <li key={p.title}>
              <DrawLine delay={i * 0.1} />
              <Reveal delay={0.1 + i * 0.08}>
                <p className="mt-5 text-sm text-gold tabular-nums">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-medium">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/60">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
