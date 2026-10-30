# IDN website

Landing page for IDN: alternative power, enterprise networking and custom software, Abuja and Lagos.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Motion.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits reload the page as you save.

```bash
npm run build   # production build
npm run lint    # lint
```

## Where things live

| To change | Edit |
|---|---|
| Section order | `app/page.tsx` |
| Most copy (nav, solutions, testimonials, FAQs, projects, offices, footer links) | `lib/content.ts` |
| A section's layout | `components/sections/<section>.tsx` |
| Shared pieces (reveal animations, menu, logo, accordion, newsletter form) | `components/ui/` |
| Colours, radii, easing | `app/globals.css` (`@theme` tokens) |
| Animation timing | `lib/motion.ts` |
| Images | `public/images/` |

## Before launch

Items marked `PLACEHOLDER` in `lib/content.ts` and `components/sections/about.tsx` still need real data from IDN:
partner logos, testimonials, office addresses and phone numbers, and project details.

The hero photo (`public/images/hero-engineer.png`) is AI-generated. Swap in a real photo of the IDN team when one is available.
