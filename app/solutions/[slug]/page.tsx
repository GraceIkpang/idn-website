import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolutionPage, solutionPages } from "@/lib/solution-pages";
import { SolutionHero } from "@/components/solution/hero";
import { SolutionOverview } from "@/components/solution/overview";
import { SolutionStory } from "@/components/solution/story";
import { SolutionOfferings } from "@/components/solution/offerings";
import { SolutionPackages } from "@/components/solution/packages";
import { SolutionEstimator } from "@/components/solution/estimator";
import { SolutionProcess } from "@/components/solution/process";
import { SolutionProject } from "@/components/solution/project";
import { SolutionAssurances } from "@/components/solution/assurances";
import { SolutionFaq } from "@/components/solution/faq";
import { SolutionRelated } from "@/components/solution/related";
import { Footer } from "@/components/sections/footer";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getSolutionPage((await params).slug);
  if (!page) return {};
  return { title: `${page.title} | IDN`, description: page.tagline };
}

export default async function SolutionRoute({ params }: Props) {
  const page = getSolutionPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <SolutionHero page={page} />
      <main id="main">
        <SolutionOverview page={page} />
        <SolutionStory page={page} />
        <SolutionOfferings page={page} />
        {page.packages && <SolutionPackages packages={page.packages} />}
        {page.estimator && <SolutionEstimator estimator={page.estimator} packages={page.packages} />}
        {page.process && <SolutionProcess steps={page.process} />}
        {page.project && <SolutionProject project={page.project} />}
        {page.assurances && <SolutionAssurances assurances={page.assurances} />}
        {page.faqs && <SolutionFaq title={page.title} items={page.faqs} />}
        <SolutionRelated current={page.id} />
      </main>
      <Footer />
    </>
  );
}
