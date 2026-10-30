# IDN website

Website for IDN: alternative power, enterprise networking and custom software, Abuja and Lagos.

Live site: https://idn-website-sigma.vercel.app

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Motion. Every push to `main` deploys to Vercel.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3002. Edits reload the page as you save.

The dev server uses port 3002 so it does not clash with the separate design-directions project, which runs on port 3000.

```bash
npm run build   # production build
npm run lint    # lint
```

## Pages

| Page | URL | Built from |
|---|---|---|
| Home | `/` | `app/page.tsx` |
| About | `/about` | `app/about/page.tsx` |
| Alternative power | `/solutions/alternative-power` | `app/solutions/[slug]/page.tsx` |
| Networking | `/solutions/networking` | `app/solutions/[slug]/page.tsx` |
| Software | `/solutions/software` | `app/solutions/[slug]/page.tsx` |
| Contact | `/contact` | `app/contact/page.tsx` |

The three solution pages share one template. Each page's content, and which optional sections it shows, lives in `lib/solution-pages.ts`.

## Where things live

| To change | Edit |
|---|---|
| Nav, home copy, offices, contact topics, footer links, TapSun URL | `lib/content.ts` |
| Solution page content (hero, offerings, packages, FAQs and the rest) | `lib/solution-pages.ts` |
| Section order | the page file in `app/` (see Pages above) |
| Home sections | `components/sections/` |
| About sections | `components/about/` |
| Solution page sections | `components/solution/` |
| Contact form | `components/contact/message-form.tsx` |
| Nav, sticky header and Solutions dropdown | `components/ui/site-header.tsx`, `components/ui/solutions-menu.tsx` |
| Shared pieces (page hero, pill, reveal animations, menu, logo, accordion, newsletter form) | `components/ui/` |
| Colours, radii, easing | `app/globals.css` (`@theme` tokens) |
| Page width, section heading size, section spacing | `lib/layout.ts` |
| Animation timing | `lib/motion.ts` |
| Images | `public/images/` |

## Contact links

Buttons across the site link to the contact form with `contactHref(topic, message)` from `lib/content.ts`. It preselects the enquiry topic and can start the message, for example with the package or estimate the visitor chose.

The contact form has no backend yet. Sending opens the visitor's email app addressed to `contactEmail` (info@idnng.com). Connect a form service or API route in the form's `send` function when one is ready.

## Before launch

Items marked `PLACEHOLDER` still need real data or decisions from IDN. Search the code for `PLACEHOLDER` to find them all. The main ones:

- **Content** (`lib/content.ts`): partner logos, testimonials, project details, office hours and photos, social links (hidden until set) and the TapSun marketplace URL (TapSun links switch to it automatically).
- **Solution pages** (`lib/solution-pages.ts`): proof figures, packages, estimator and scoper factors, timings, featured projects, warranties and commitments, FAQ answers and the IDN AI example answers.
- **Newsletter** (`components/ui/newsletter-form.tsx`): no mailing list is connected; it says sign-ups open soon.
- **Contact form**: no backend yet (see above).

To add an office photo, put it in `public/images/about/` and set that office's `image` field in `lib/content.ts`.

## Generated images

These images are AI-generated stand-ins. Swap in real IDN photos when they are available:

- Home hero: `public/images/hero-engineer.png`
- Alternative power hero: `public/images/solutions/alternative-power/hero-engineers.jpg` (also on the home Alternative power card)
- Alternative power challenge: `public/images/solutions/alternative-power/challenge-power-lines.jpg`
