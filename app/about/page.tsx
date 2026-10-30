import type { Metadata } from "next";
import { StickyHeader, TopNav } from "@/components/ui/site-header";
import { Intro } from "@/components/about/intro";
import { Principles } from "@/components/about/principles";
import { Leadership } from "@/components/about/leadership";
import { Culture } from "@/components/about/culture";
import { Identity } from "@/components/about/identity";
import { Offices } from "@/components/about/offices";
import { Partners } from "@/components/about/partners";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "About | IDN",
  description:
    "IDN brings alternative power, enterprise networking and custom software together under one trusted identity. Meet the team behind it.",
};

export default function AboutPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <StickyHeader current="About" threshold={320} />
      <header id="top" className="p-2 sm:p-3">
        <TopNav current="About" />
      </header>
      <main id="main">
        <Intro />
        <Principles />
        <Leadership />
        <Culture />
        <Identity />
        <Offices />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
