import Image from "next/image";
import { sectionHeading } from "@/lib/layout";
import { Reveal } from "@/components/ui/reveal";
import { Pill } from "@/components/ui/pill";

/** Full-bleed office photo with the culture statement over it. */
export function Culture() {
  return (
    <section aria-labelledby="culture-title" className="p-2 sm:p-3">
      <div className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden rounded-[24px] bg-ink text-white sm:min-h-[640px] sm:rounded-[32px] lg:h-[calc(100svh-1.5rem)] lg:max-h-[880px]">
        <Image
          src="/images/about/office.jpg"
          alt="IDN's reception, with the company logo on the wall"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[20%_center]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-black/50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0)_40%,rgb(0_0_0/0.55)_100%)]" />

        <Reveal className="px-5 pt-32 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-16">
          <Pill tone="glass">Our culture</Pill>
          <h2 id="culture-title" className={`mt-5 max-w-[15ch] text-balance ${sectionHeading}`}>
            Built by people who care <span className="text-gold">about the details.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/80 text-pretty sm:text-lg">
            We bridge the gap between technical understanding and a practical commitment to customer success.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
