// Content for the /solutions/[slug] pages. Each page uses the same template; add an entry to publish one.

export type StoryStep = {
  key: "challenge" | "approach" | "benefits";
  title: string;
  body: string;
  /** Decorative: the step text already says what the photo shows. */
  image: string;
};

export type Offering = {
  title: string;
  body: string;
  /** Transparent line illustration. */
  image: string;
  width: number;
  height: number;
};

export type Stat = { value: string; label: string };

export type ProcessStep = { title: string; body: string; time: string };

export type Package = {
  name: string;
  audience: string;
  system: string;
  includes: readonly string[];
};

/** Inputs and rule-of-thumb factors for the savings estimator. */
export type Estimator = {
  spend: { min: number; max: number; step: number; initial: number };
  /** Share of the monthly energy spend solar typically replaces, as a low to high range. */
  offset: readonly [number, number];
  /** Rough naira cost of one kWh from a generator, used to back out daily usage. */
  costPerKwh: number;
  /** Average peak sun hours per day. */
  sunHours: number;
  /** Battery size as a share of daily usage. */
  storageShare: number;
};

export type FeaturedProject = {
  title: string;
  place: string;
  summary: string;
  images: readonly { src: string; alt: string }[];
  facts: readonly Stat[];
  testimonial: { quote: string; name: string; role: string };
};

export type Assurance = { years: string; title: string; body: string };

export type SolutionPage = {
  slug: string;
  id: "power" | "networking" | "software";
  title: string;
  tagline: string;
  hero: { image: string; alt: string; focus: string };
  overview: { lead: string; rest: string };
  stats?: readonly Stat[];
  story: readonly StoryStep[];
  offerings: { heading: string; intro: string; items: readonly Offering[] };
  packages?: readonly Package[];
  estimator?: Estimator;
  process?: readonly ProcessStep[];
  project?: FeaturedProject;
  assurances?: { items: readonly Assurance[]; brands: readonly string[] };
  faqs?: readonly { q: string; a: string }[];
};

const power = "/images/solutions/alternative-power";

export const solutionPages: readonly SolutionPage[] = [
  {
    slug: "alternative-power",
    id: "power",
    title: "Alternative power",
    tagline:
      "Solar, inverter and battery systems sized to your load, installed and maintained by our own engineers.",
    hero: {
      image: `${power}/hero-engineers.jpg`,
      alt: "Two engineers installing and checking rooftop solar panels at sunset above a city skyline",
      // Keeps both engineers in frame on narrow screens.
      focus: "88% center",
    },
    overview: {
      lead: "IDN provides complete solar solutions, from design and installation",
      rest: "to equipment and ongoing support, powering homes and businesses reliably, day and night.",
    },
    story: [
      {
        key: "challenge",
        title: "The challenge",
        body: "Unreliable power supply, rising energy costs and generator dependence disrupt productivity and drive up operating expenses.",
        image: `${power}/challenge.jpg`,
      },
      {
        key: "approach",
        title: "Our approach",
        body: "We design, install and maintain solar energy systems, inverters, batteries and backup power tailored to your exact energy needs.",
        image: `${power}/approach.jpg`,
      },
      {
        key: "benefits",
        title: "The benefits",
        body: "Reliable power, lower energy costs, better efficiency and energy independence, with a more sustainable future for your home or business.",
        image: `${power}/benefits.jpg`,
      },
    ],
    offerings: {
      heading: "Our alternative power solutions",
      intro:
        "From first assessment to long-term support, we deliver complete power systems that keep homes and businesses running.",
      items: [
        {
          title: "Solar system design and installation",
          body: "Solar energy systems engineered for your site, for strong performance and long-term value.",
          image: `${power}/solar-design.png`,
          width: 667,
          height: 437,
        },
        {
          title: "Inverter systems",
          body: "High-performance inverters for efficient power conversion and seamless energy management.",
          image: `${power}/inverter.png`,
          width: 250,
          height: 354,
        },
        {
          title: "Batteries and energy storage",
          body: "Battery storage that keeps power flowing through outages and stores energy for when you need it.",
          image: `${power}/batteries.png`,
          width: 405,
          height: 337,
        },
        {
          title: "Security systems (CCTV)",
          // PLACEHOLDER copy: the original design repeated the solar description here. Confirm with IDN.
          body: "Camera and monitoring systems installed and networked to protect your site, kept running on backup power.",
          image: `${power}/cctv.png`,
          width: 635,
          height: 145,
        },
        {
          title: "Solar panels",
          body: "High-efficiency panels built for maximum energy generation and long service life.",
          image: `${power}/solar-panels.png`,
          width: 513,
          height: 349,
        },
        {
          title: "Maintenance and support",
          body: "Proactive monitoring and expert support to keep your system performing at its best.",
          image: `${power}/maintenance.png`,
          width: 310,
          height: 399,
        },
      ],
    },
    // PLACEHOLDER figures: replace with IDN's real numbers before launch.
    stats: [
      { value: "250+", label: "Solar systems installed" },
      { value: "1.5 MW", label: "Capacity installed" },
      { value: "Up to 70%", label: "Lower energy spend" },
      { value: "48 h", label: "Support response time" },
    ],
    // PLACEHOLDER specs: confirm package sizes with IDN.
    packages: [
      {
        name: "Home",
        audience: "Apartments and family homes",
        system: "2 to 5 kW solar, 5 to 10 kWh battery",
        includes: ["Load assessment", "Installation and setup", "First-year maintenance visit"],
      },
      {
        name: "Business",
        audience: "Shops, offices, clinics and schools",
        system: "5 to 30 kW solar, 10 to 60 kWh battery",
        includes: ["Site survey and system design", "Installation and commissioning", "Remote monitoring", "Quarterly maintenance"],
      },
      {
        name: "Enterprise",
        audience: "Factories, campuses and multi-site operations",
        system: "30 kW and above, sized per site",
        includes: ["Engineering study", "Phased rollout", "Dedicated support line", "Performance reporting"],
      },
    ],
    // PLACEHOLDER factors: rules of thumb until IDN confirms its own.
    estimator: {
      spend: { min: 50_000, max: 3_000_000, step: 25_000, initial: 300_000 },
      offset: [0.6, 0.8],
      costPerKwh: 400,
      sunHours: 4.5,
      storageShare: 0.6,
    },
    // PLACEHOLDER timings: confirm with IDN.
    process: [
      { title: "Site assessment", body: "An engineer visits, measures your load and checks your roof or mounting space.", time: "1 to 2 days" },
      { title: "Design and quote", body: "We size the panels, inverter and batteries to your load and send a clear, itemised quote.", time: "3 to 5 days" },
      { title: "Installation", body: "Our own team installs, wires and commissions the system, then walks you through it.", time: "1 to 5 days" },
      { title: "Monitoring and support", body: "We track performance, schedule maintenance and stay on call when you need us.", time: "Ongoing" },
    ],
    // PLACEHOLDER details and testimonial: replace with a real project and client.
    project: {
      title: "Steel canopy and solar mount",
      place: "Abuja",
      summary:
        "A custom steel canopy built to carry a rooftop-style solar array, giving the home shade below and steady power through grid outages.",
      // Add a second photo (for example the finished canopy with panels) to show a two-photo layout.
      images: [{ src: `${power}/approach.jpg`, alt: "IDN team assembling the steel canopy frame" }],
      facts: [
        { value: "8 kW", label: "Solar array" },
        { value: "15 kWh", label: "Battery storage" },
        { value: "6 days", label: "Build and install" },
      ],
      testimonial: {
        quote:
          "Since switching to IDN, our monthly generator costs have dropped significantly. The solar and backup system gives us reliable power and peace of mind.",
        name: "Amaka Obi",
        role: "Homeowner, Abuja",
      },
    },
    // PLACEHOLDER terms and brands: confirm warranties and partner brands with IDN.
    assurances: {
      items: [
        { years: "25", title: "Solar panels", body: "Manufacturer performance warranty on every panel we install." },
        { years: "10", title: "Batteries", body: "Up to ten years of manufacturer cover, depending on the model." },
        { years: "5", title: "Inverters", body: "Manufacturer warranty, with IDN handling any claims for you." },
        { years: "2", title: "Workmanship", body: "IDN's own warranty on installation, wiring and mounting." },
      ],
      brands: ["Brand one", "Brand two", "Brand three", "Brand four", "Brand five"],
    },
    // PLACEHOLDER answers: confirm with IDN.
    faqs: [
      {
        q: "Will solar still power my site at night or in the rainy season?",
        a: "Yes. Batteries store daytime energy for the evening, and we size the system with cloudy weeks in mind. Where needed, it can also switch to the grid or a generator automatically.",
      },
      {
        q: "How long does installation take?",
        a: "Most homes are installed in one to two days and most businesses within a week, after the site assessment and design are agreed.",
      },
      {
        q: "How much maintenance does a solar system need?",
        a: "Very little. Panels need occasional cleaning and we recommend a check-up visit every three to six months. We monitor performance and flag issues early.",
      },
      {
        q: "Can I start small and expand later?",
        a: "Yes. We design systems so you can add panels or batteries as your needs grow.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Ask our team about current payment options when you request a quote.",
      },
    ],
  },
];
export const getSolutionPage = (slug: string) => solutionPages.find((p) => p.slug === slug);
