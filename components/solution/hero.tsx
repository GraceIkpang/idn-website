import { contactHref } from "@/lib/content";
import type { SolutionPage } from "@/lib/solution-pages";
import { PageHero } from "@/components/ui/page-hero";

export function SolutionHero({ page }: { page: SolutionPage }) {
  const { hero } = page;
  return (
    <PageHero
      current="Solutions"
      pill="Solutions"
      title={page.title}
      tagline={page.tagline}
      image={{ src: hero.image, alt: hero.alt, focus: hero.focus, focusLg: hero.focusLg }}
      cta={{ label: "Plan your project", href: contactHref(page.id) }}
    />
  );
}
