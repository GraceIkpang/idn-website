import Image from "next/image";
import { ArrowUpRight, Clock, ImageIcon, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { directionsUrl, mapEmbedUrl, offices, telHref } from "@/lib/content";
import { sectionHeading, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

function Detail({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-gold-ink">
        <Icon aria-hidden className="size-4" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 self-center text-base text-text-secondary">{children}</div>
    </div>
  );
}

type OfficesProps = {
  /** "photo" shows the office photo (or a placeholder); "map" embeds a live Google Map of the address. */
  media?: "photo" | "map";
  /** Heading is [plain part, gold part]. */
  heading?: readonly [string, string];
  intro?: string;
  className?: string;
};

/** Abuja and Lagos as two shell cards: photo or map well on top, contact details below. */
export function Offices({
  media = "photo",
  heading = ["Two offices.", "Nationwide reach."],
  intro = "Our teams in Abuja and Lagos plan, install and support projects across Nigeria. Visit us, call or send an email and the nearest office will pick it up.",
  className = "pb-24 sm:pb-32",
}: OfficesProps) {
  return (
    <section aria-labelledby="offices-title" className={className}>
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Pill>Our offices</Pill>
            <h2 id="offices-title" className={cn("mt-6", sectionHeading)}>
              {heading[0]} <span className="text-gold-ink">{heading[1]}</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg lg:col-span-5">
            {intro}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-2">
          {offices.map((o) => (
            <RevealItem key={o.city} className="flex flex-col rounded-[28px] bg-layer-1 p-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-layer-2 outline-1 -outline-offset-1 outline-black/8">
                {media === "map" ? (
                  <iframe
                    src={mapEmbedUrl(o)}
                    title={`Map of IDN's ${o.city} office`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 size-full border-0 grayscale-[35%]"
                  />
                ) : o.image ? (
                  <Image
                    src={o.image}
                    alt={`IDN's ${o.city} office`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  // PLACEHOLDER: swap in a photo by setting `image` in lib/content.ts
                  <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,transparent_0_12px,rgb(0_0_0/0.025)_12px_24px)]">
                    <span className="flex flex-col items-center gap-2 text-sm text-text-muted">
                      <ImageIcon aria-hidden className="size-6" strokeWidth={1.5} />
                      {o.city} office photo
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col px-4 pt-6 pb-4 sm:px-6 sm:pt-8 sm:pb-6">
                <h3 className="text-3xl font-medium tracking-[-0.035em]">{o.city} office</h3>
                <address className="mt-6 grid gap-3 not-italic sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
                  <Detail icon={MapPin}>{o.address}</Detail>
                  <Detail icon={Clock}>{o.hours}</Detail>
                  <Detail icon={Phone}>
                    <a href={telHref(o.phone)} className="tabular-nums transition-colors duration-150 hover:text-ink">
                      {o.phone}
                    </a>
                  </Detail>
                  <Detail icon={Mail}>
                    <a href={`mailto:${o.email}`} className="break-all transition-colors duration-150 hover:text-ink">
                      {o.email}
                    </a>
                  </Detail>
                </address>
                <a
                  href={directionsUrl(o)}
                  target="_blank"
                  rel="noreferrer"
                  className="press group mt-8 inline-flex h-12 w-fit items-center gap-3 rounded-full bg-ink pr-2 pl-5 text-base font-medium text-white"
                >
                  Get directions
                  <span className="grid size-8 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 ease-out-soft group-hover:rotate-45">
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
                  </span>
                  <span className="sr-only">to the {o.city} office (opens in a new tab)</span>
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
