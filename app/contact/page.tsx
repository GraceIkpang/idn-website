import type { Metadata } from "next";
import { sectionSpace } from "@/lib/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Offices } from "@/components/about/offices";
import { MessageForm } from "@/components/contact/message-form";
import { Footer } from "@/components/sections/footer";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Contact | IDN",
  description:
    "Talk to an IDN engineer, request a quote or visit our offices in Abuja and Lagos. We typically reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <PageHero
        pill="Contact"
        title="Contact us"
        tagline="Talk to an engineer, request a quote or visit one of our offices in Abuja and Lagos."
        image={{
          src: "/images/contact/hero.jpg",
          alt: "Lit orange arrow sign on a dark brick wall, pointing down",
          focus: "68% center",
          focusLg: "70% center",
        }}
        cta={{ label: "Send a message", href: "#message" }}
      />
      <main id="main">
        <Offices
          media="map"
          heading={["Find us", "in Nigeria."]}
          intro="Visit, call or email the office nearest you. Both teams take on projects anywhere in the country."
          // Top padding is one section gap minus the hero frame padding, as on the solution pages.
          className={cn("pt-22 sm:pt-29", sectionSpace)}
        />
        <MessageForm />
      </main>
      <Footer cta={false} />
    </>
  );
}
