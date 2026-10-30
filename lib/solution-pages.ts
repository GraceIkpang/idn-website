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
  /** Dark card in the bento layout. The illustration should be light line art. */
  featured?: boolean;
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

/** A big figure with a unit, for example 25 years or 99.9% uptime. */
export type Assurance = { value: string; unit?: string; title: string; body: string };

/** Heading pairs are [plain part, gold part]. */
type SectionCopy = { pill: string; heading: readonly [string, string]; intro: string };

export type CapabilityGroup = { title: string; items: readonly string[] };

/** One problem a visitor can tick, and the services that fix it (offering titles). */
export type Symptom = { label: string; fixes: readonly string[] };

export type SolutionPage = {
  slug: string;
  id: "power" | "networking" | "software";
  title: string;
  tagline: string;
  /** `focus` is the crop point on small screens; `focusLg` overrides it from the lg breakpoint. */
  hero: { image: string; alt: string; focus: string; focusLg?: string; compact?: boolean };
  overview: {
    lead: string;
    rest: string;
    /** Optional photo card beside the statement, with a caption panel. */
    feature?: { image: string; alt: string; title: string; body: string };
  };
  stats?: readonly Stat[];
  story?: readonly StoryStep[];
  offerings: {
    heading: string;
    intro: string;
    /** "grid": illustrated wells in one shell. "bento": uneven cards, illustration beside the text. */
    layout?: "grid" | "bento";
    items: readonly Offering[];
  };
  packages?: SectionCopy & { items: readonly Package[] };
  estimator?: Estimator;
  /** Heading is [plain part, gold part]. */
  process?: { heading: readonly [string, string]; steps: readonly ProcessStep[] };
  project?: FeaturedProject;
  assurances?: SectionCopy & { items: readonly Assurance[]; brands: readonly string[] };
  capabilities?: SectionCopy & { groups: readonly CapabilityGroup[] };
  healthCheck?: SectionCopy & { symptoms: readonly Symptom[] };
  faqs?: readonly { q: string; a: string }[];
};

const power = "/images/solutions/alternative-power";
const net = "/images/solutions/networking";

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
    packages: {
      pill: "Packages",
      heading: ["A starting point", "for every site."],
      intro: "Every system is sized to your load after a site visit. These ranges show where most projects land.",
      items: [
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
    },
    // PLACEHOLDER factors: rules of thumb until IDN confirms its own.
    estimator: {
      spend: { min: 50_000, max: 3_000_000, step: 25_000, initial: 300_000 },
      offset: [0.6, 0.8],
      costPerKwh: 400,
      sunHours: 4.5,
      storageShare: 0.6,
    },
    // PLACEHOLDER timings: confirm with IDN.
    process: {
      heading: ["From first call", "to steady power."],
      steps: [
        { title: "Site assessment", body: "An engineer visits, measures your load and checks your roof or mounting space.", time: "1 to 2 days" },
        { title: "Design and quote", body: "We size the panels, inverter and batteries to your load and send a clear, itemised quote.", time: "3 to 5 days" },
        { title: "Installation", body: "Our own team installs, wires and commissions the system, then walks you through it.", time: "1 to 5 days" },
        { title: "Monitoring and support", body: "We track performance, schedule maintenance and stay on call when you need us.", time: "Ongoing" },
      ],
    },
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
      pill: "Warranties",
      heading: ["Built to last.", "Backed in writing."],
      intro: "We install quality equipment from established manufacturers and stand behind our own work.",
      items: [
        { value: "25", unit: "years", title: "Solar panels", body: "Manufacturer performance warranty on every panel we install." },
        { value: "10", unit: "years", title: "Batteries", body: "Up to ten years of manufacturer cover, depending on the model." },
        { value: "5", unit: "years", title: "Inverters", body: "Manufacturer warranty, with IDN handling any claims for you." },
        { value: "2", unit: "years", title: "Workmanship", body: "IDN's own warranty on installation, wiring and mounting." },
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
  {
    slug: "networking",
    id: "networking",
    title: "Networking",
    tagline: "Enterprise fibre, structured cabling and secure connectivity that stay fast and stay up.",
    hero: {
      image: `${net}/hero.jpg`,
      alt: "IDN engineer patching fibre cables in a labelled server rack",
      // Narrow screens show a thin slice; this keeps the fibre panel and the engineer's hand in view.
      focus: "22% center",
      // Wide screens show most of the banner; this keeps the engineer fully in frame on the right.
      focusLg: "85% center",
      compact: true,
    },
    overview: {
      lead: "From structured cabling to enterprise-wide connectivity, IDN designs dependable",
      rest: "network infrastructure that keeps people, systems and data seamlessly connected.",
      feature: {
        image: `${net}/overview.jpg`,
        alt: "Two IDN engineers working on server racks in a data room",
        title: "Reliable connections, stronger operations",
        body: "End-to-end networking that powers communication and keeps performance high.",
      },
    },
    // PLACEHOLDER figures: replace with IDN's real numbers before launch.
    stats: [
      { value: "5,000+", label: "Network points installed" },
      { value: "150+", label: "Sites connected" },
      { value: "99.9%", label: "Managed uptime target" },
      { value: "4 h", label: "Critical response target" },
    ],
    offerings: {
      heading: "Our networking solutions",
      intro: "We design dependable network environments that connect your people, systems and data, securely and seamlessly.",
      layout: "bento",
      items: [
        {
          title: "Network infrastructure",
          body: "Reliable network systems designed to support seamless communication and everyday operations.",
          image: `${net}/infrastructure.png`,
          width: 318,
          height: 283,
        },
        {
          title: "Structured cabling",
          body: "Organised, scalable cabling built for dependable data, voice and device connectivity.",
          image: `${net}/cabling.png`,
          width: 312,
          height: 244,
        },
        {
          title: "Enterprise networking services",
          body: "Advanced network solutions tailored to the performance, security and scalability needs of growing operations.",
          image: `${net}/enterprise.png`,
          width: 323,
          height: 294,
          featured: true,
        },
        {
          title: "Connectivity solutions",
          body: "Secure, efficient connections that keep your people, devices and locations linked.",
          image: `${net}/connectivity.png`,
          width: 313,
          height: 263,
        },
      ],
    },
    // PLACEHOLDER: confirm scope with IDN.
    capabilities: {
      pill: "What's covered",
      heading: ["Every layer", "of your network."],
      intro: "From the cable in the wall to the link between branches, one team designs, installs and supports it all.",
      groups: [
        {
          title: "Cabling",
          items: ["Cat6 and Cat6A copper", "Fibre backbones", "Racks and patch panels", "Labelling and as-built drawings", "Certification testing"],
        },
        {
          title: "Wi-Fi",
          items: ["Coverage surveys and heatmaps", "Enterprise access points", "Seamless roaming", "Separate guest networks"],
        },
        {
          title: "Security",
          items: ["Firewalls", "VLAN segmentation", "Secure remote access (VPN)", "Access control and logging"],
        },
        {
          title: "Voice and video",
          items: ["IP phones and VoIP", "Intercom systems", "IP CCTV", "Door access integration"],
        },
        {
          title: "Connectivity",
          items: ["Backup internet and failover", "Site-to-site links", "Multi-branch networks", "Bandwidth management"],
        },
      ],
    },
    healthCheck: {
      pill: "Network health check",
      heading: ["Is your network", "holding you back?"],
      intro: "Most network problems show up as everyday frustrations. Tick the ones you recognise to see where we would start.",
      symptoms: [
        { label: "Wi-Fi is weak or drops in some rooms", fixes: ["Wi-Fi survey and redesign"] },
        { label: "Everything slows down at busy times", fixes: ["Network infrastructure upgrade", "Bandwidth management"] },
        { label: "The internet goes down and work stops", fixes: ["Backup internet and failover"] },
        { label: "Cables are tangled, unlabelled or undocumented", fixes: ["Structured cabling"] },
        { label: "Staff and guests share one network and password", fixes: ["Network security review", "Wi-Fi survey and redesign"] },
        { label: "Branches can't easily share files or systems", fixes: ["Site-to-site connectivity"] },
        { label: "No one is watching the network until it breaks", fixes: ["Managed monitoring and support"] },
      ],
    },
    // PLACEHOLDER: confirm engagement models with IDN.
    packages: {
      pill: "Ways to work with us",
      heading: ["Build it, run it", "or fix what you have."],
      intro: "Pick a one-off project, ongoing management, or a review of the network you already run.",
      items: [
        {
          name: "Design and build",
          audience: "New offices, fit-outs and expansions",
          system: "A complete network, designed, installed and certified",
          includes: ["Site survey", "Network design", "Cabling, racks and Wi-Fi", "Certification and as-built drawings"],
        },
        {
          name: "Managed network",
          audience: "Teams without in-house network staff",
          system: "A monthly plan: we monitor, maintain and fix",
          includes: ["24/7 monitoring", "Agreed response times", "Updates and changes", "Monthly health reports"],
        },
        {
          name: "Audit and upgrade",
          audience: "Networks that are slow, messy or insecure",
          system: "A full review, then a prioritised fix plan",
          includes: ["Speed and coverage tests", "Security review", "Cabling and rack tidy-up", "Upgrade roadmap"],
        },
      ],
    },
    // PLACEHOLDER timings: confirm with IDN.
    process: {
      heading: ["From site survey", "to a network that stays up."],
      steps: [
        { title: "Survey", body: "We walk the site, map users and devices, test existing cabling and measure Wi-Fi coverage.", time: "1 to 2 days" },
        { title: "Design", body: "We plan cable routes, racks, switching, security and access points, then send an itemised quote.", time: "3 to 5 days" },
        { title: "Install and certify", body: "Our team installs, labels and configures everything, then tests and certifies every link.", time: "2 to 10 days" },
        { title: "Handover and support", body: "You get as-built drawings and passwords in one place, plus a team on call when you need us.", time: "Ongoing" },
      ],
    },
    // PLACEHOLDER details and testimonial: replace with a real project and client.
    project: {
      title: "Server room fibre build",
      place: "Lagos",
      summary:
        "A full server room fit-out with a fibre backbone linking every floor, new racks and patching, and secure Wi-Fi across the office.",
      images: [{ src: "/images/service-networking.png", alt: "IDN technician patching fibre cables in a server rack" }],
      facts: [
        { value: "120+", label: "Network points" },
        { value: "100%", label: "Wi-Fi floor coverage" },
        { value: "5 days", label: "Build and test" },
      ],
      testimonial: {
        quote:
          "IDN upgraded our network infrastructure and the difference was immediate: faster connectivity, better security and virtually zero downtime.",
        name: "Ibrahim Musa",
        role: "IT Manager, Financial institution",
      },
    },
    // PLACEHOLDER figures and brands: confirm with IDN.
    assurances: {
      pill: "Standards and support",
      heading: ["Tested, documented,", "supported."],
      intro: "Every link is certified, every port is labelled, and someone is always on call when it matters.",
      items: [
        { value: "25", unit: "years", title: "Cabling system warranty", body: "Manufacturer warranty on certified cabling installed to standard." },
        { value: "100%", title: "Links tested", body: "Every cable is tested and certified before handover, with the results in writing." },
        { value: "99.9%", unit: "uptime", title: "Managed network target", body: "Our uptime target for networks we monitor and maintain." },
        { value: "4 h", title: "Critical response", body: "Our response target when a managed network goes down." },
      ],
      brands: ["Brand one", "Brand two", "Brand three", "Brand four", "Brand five"],
    },
    // PLACEHOLDER answers: confirm with IDN.
    faqs: [
      {
        q: "How long does a network project take?",
        a: "Small offices usually take a few days. Larger, multi-floor sites take one to two weeks, depending on scope and access.",
      },
      {
        q: "Will installation disrupt our work?",
        a: "We plan around you, doing noisy or disruptive work in evenings or at weekends, and switch over with as little downtime as possible.",
      },
      {
        q: "Can you upgrade our existing network instead of starting over?",
        a: "Yes. We audit what you have, keep what still performs and fix the parts that are holding you back.",
      },
      {
        q: "Can you connect our branches?",
        a: "Yes. We link sites securely so branches can share files, systems and phones as if they were in one building.",
      },
      {
        q: "What documentation do we get?",
        a: "As-built drawings, labelled ports, test certificates and a record of equipment and settings, so anyone can support it later.",
      },
      {
        q: "How do you keep the network secure?",
        a: "We separate traffic with VLANs, configure firewalls and secure Wi-Fi, and control who can access what.",
      },
    ],
  },
];

export const getSolutionPage = (slug: string) => solutionPages.find((p) => p.slug === slug);
