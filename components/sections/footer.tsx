import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactHref, externalProps, footerLinks, offices, type ContactTopic } from "@/lib/content";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/**
 * Site footer. `cta` adds the "Ready to power your next move?" block; the contact page leaves it out.
 * `topic` preselects the enquiry topic behind "Talk to an engineer". Links still set to "#" are hidden.
 */
export function Footer({ cta = true, topic }: { cta?: boolean; topic?: ContactTopic }) {
  const groups = Object.entries(footerLinks)
    .map(([group, links]) => [group, links.filter((l) => l.href !== "#")] as const)
    .filter(([, links]) => links.length > 0);
  return (
    <footer id="contact" className="p-2 sm:p-3">
      <div className="relative isolate overflow-hidden rounded-[24px] bg-ink text-white sm:rounded-[32px]">
        <Image
          src="/images/service-backup-team.png"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-top opacity-50"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.2),rgb(0_0_0/0.92)_45%)]" />

        {cta && (
          <Reveal className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
            <h2 className="max-w-[16ch] text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              Ready to power your <span className="text-gold">next move?</span>
            </h2>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-[44ch] text-base text-white/70 text-pretty sm:text-lg">
                Talk to an engineer about your site. We will recommend the right system and send a clear quote.
              </p>
              <a
                href={contactHref(topic)}
                className="press group inline-flex h-14 shrink-0 items-center justify-between gap-4 rounded-full bg-gold pr-2 pl-7 text-base font-medium text-ink sm:justify-start"
              >
                Talk to an engineer
                <span className="grid size-10 place-items-center rounded-full bg-ink text-white transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5">
                  <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                </span>
              </a>
            </div>
            <div className="mt-16 border-t border-line-inverse sm:mt-20" />
          </Reveal>
        )}

        <div className={cn("mx-auto grid max-w-6xl gap-12 px-5 pb-10 sm:px-8 lg:grid-cols-12", cta ? "mt-10" : "pt-16 sm:pt-20")}>
          <div className="lg:col-span-5">
            <NewsletterForm className="max-w-sm" />
            <div className="mt-8 grid grid-cols-2 gap-6">
              {offices.map((o) => (
                <address key={o.city} className="not-italic">
                  <p className="text-base font-medium">{o.city} office</p>
                  <p className="mt-3 text-sm text-white/60">{o.address}</p>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-1 block text-sm text-white/60 tabular-nums hover:text-white">
                    {o.phone}
                  </a>
                  <a href={`mailto:${o.email}`} className="mt-1 block break-all text-sm text-white/60 hover:text-white">
                    {o.email}
                  </a>
                </address>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {groups.map(([group, links]) => (
              <div key={group}>
                <p className="text-sm text-white/50">{group}</p>
                <ul className="mt-4 space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        {...externalProps(l.href)}
                        className="text-base text-white/85 transition-colors duration-150 hover:text-gold"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line-inverse px-5 py-6 text-sm text-white/50 sm:flex-row sm:justify-between sm:px-8">
          <p>© 2026 IDN. All rights reserved.</p>
          <p>Abuja · Lagos</p>
        </div>
      </div>
    </footer>
  );
}
