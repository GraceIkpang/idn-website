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
  /** Dark card in the bento and rows layouts. The illustration should be light line art. */
  featured?: boolean;
  /** Short chips under the description, used by the rows layout. */
  tags?: readonly string[];
};

export type Stat = { value: string; label: string };

export type ProcessStep = { title: string; body: string; time?: string };

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

/** Rough project timeline from a platform choice plus features, in weeks. */
export type Scoper = {
  platforms: readonly { label: string; weeks: readonly [number, number] }[];
  features: readonly { label: string; weeks: readonly [number, number] }[];
  /** Above this many weeks (upper estimate) we suggest a dedicated team instead of a fixed-scope project. */
  teamThreshold: number;
};

/** One problem a visitor can tick, and the services that fix it (offering titles). */
export type Symptom = { label: string; fixes: readonly string[] };

export type SolutionPage = {
  slug: string;
  id: "power" | "networking" | "software";
  title: string;
  tagline: string;
  /** `focus` is the crop point on small screens; `focusLg` overrides it from the lg breakpoint. */
  hero: { image: string; alt: string; focus: string; focusLg?: string };
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
    /** "grid": illustrated wells in one shell. "bento": uneven cards. "rows": full-width cards with tags. */
    layout?: "grid" | "bento" | "rows";
    items: readonly Offering[];
  };
  packages?: SectionCopy & { items: readonly Package[] };
  estimator?: Estimator;
  /** Heading is [plain part, gold part]. */
  /** "line": steps under hairlines. "cards": numbered white cards in a shell. */
  process?: { heading: readonly [string, string]; layout?: "line" | "cards"; steps: readonly ProcessStep[] };
  project?: FeaturedProject;
  assurances?: SectionCopy & { items: readonly Assurance[]; brands: readonly string[] };
  capabilities?: SectionCopy & { groups: readonly CapabilityGroup[] };
  healthCheck?: SectionCopy & { symptoms: readonly Symptom[] };
  scoper?: SectionCopy & Scoper;
  teaser?: {
    tag: string;
    title: string;
    body: string;
    abilities: readonly string[];
    cta: string;
    /** Example questions the preview panel plays through. */
    examples: readonly { prompt: string; answer: string; source: string }[];
  };
  faqs?: readonly { q: string; a: string }[];
};

const power = "/images/solutions/alternative-power";
const net = "/images/solutions/networking";
const soft = "/images/solutions/software";

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
        // Generated stand-in: swap for a real photo when one is available.
        image: `${power}/challenge-generator.jpg`,
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
  {
    slug: "software",
    id: "software",
    title: "Software",
    tagline: "Custom web and mobile software, automation and technology advice, built around how your business really works.",
    hero: {
      image: `${soft}/hero.jpg`,
      alt: "Developer's monitor showing code and a project file tree",
      focus: "55% center",
      focusLg: "60% center",
    },
    overview: {
      lead: "From idea to deployment, IDN builds",
      rest: "software that works as hard as your business demands.",
      feature: {
        image: `${soft}/overview.jpg`,
        alt: "Three IDN team members reviewing work on a tablet together",
        title: "Built for scale, designed for people",
        // The original design repeated the networking caption here.
        body: "Software shaped around how your team actually works, ready to grow when you do.",
      },
    },
    // Capability highlights rather than achievement figures, so nothing here needs verifying.
    stats: [
      { value: "Web + mobile", label: "One team for every platform" },
      { value: "Local", label: "Payments, SMS and WhatsApp ready" },
      { value: "NDPA", label: "Data protection by design" },
      { value: "Cloud", label: "AWS, Azure or Google Cloud" },
    ],
    offerings: {
      heading: "Our software solutions",
      intro: "End-to-end capabilities for organisations ready to lead with technology.",
      layout: "rows",
      items: [
        {
          title: "Custom software development",
          body: "Bespoke applications designed around your business processes, from mobile apps to enterprise platforms.",
          image: `${soft}/custom.png`,
          width: 218,
          height: 171,
          featured: true,
          tags: ["Web apps", "Mobile", "APIs", "Enterprise"],
        },
        {
          title: "Digital transformation",
          body: "Modernise legacy operations with cloud infrastructure, automated workflows and dependable data pipelines.",
          image: `${soft}/automation.png`,
          width: 164,
          height: 126,
          tags: ["Cloud migration", "Automation", "Process design"],
        },
        {
          title: "Technology consulting",
          body: "Strategic guidance on architecture, stack selection, vendor evaluation and long-term technology roadmaps.",
          image: `${soft}/consulting.png`,
          width: 183,
          height: 152,
          tags: ["Architecture", "Stack review", "Roadmaps"],
        },
        {
          title: "Product development",
          body: "An end-to-end product studio, from ideas and UX research through launch, iteration and growth.",
          image: `${soft}/product.png`,
          width: 223,
          height: 116,
          tags: ["UX and UI design", "Prototyping", "Launch", "Growth"],
        },
      ],
    },
    // PLACEHOLDER: confirm the platforms and integrations IDN supports.
    capabilities: {
      pill: "What we work with",
      heading: ["Fits into", "how you already work."],
      intro: "We build on proven platforms and connect to the tools your business already relies on.",
      groups: [
        { title: "Platforms", items: ["Web applications", "iOS and Android apps", "Internal dashboards", "APIs and integrations"] },
        {
          title: "Integrations",
          items: ["Payments such as Paystack and Flutterwave", "Accounting and ERP systems", "Microsoft 365 and Google Workspace", "WhatsApp, SMS and email"],
        },
        { title: "Cloud and data", items: ["AWS, Azure and Google Cloud", "Data pipelines", "Reporting dashboards", "Automated backups"] },
        {
          title: "Security",
          items: ["Role-based access", "Encryption in transit and at rest", "Audit logs", "Nigeria Data Protection Act compliance"],
        },
        { title: "After launch", items: ["Monitoring and alerts", "Bug fixes and updates", "New features", "User training"] },
      ],
    },
    // PLACEHOLDER week ranges: rough guides until IDN confirms its own.
    scoper: {
      pill: "Project scoper",
      heading: ["How long would", "it take?"],
      intro: "Pick what you need for a rough timeline and the best way to work with us. No commitment, no email needed.",
      platforms: [
        { label: "Web app", weeks: [4, 6] },
        { label: "Mobile app", weeks: [6, 8] },
        { label: "Web and mobile", weeks: [8, 12] },
      ],
      features: [
        { label: "User accounts", weeks: [1, 2] },
        { label: "Payments", weeks: [2, 3] },
        { label: "Admin dashboard", weeks: [2, 4] },
        { label: "Reports and analytics", weeks: [2, 3] },
        { label: "Connect existing systems", weeks: [2, 4] },
        { label: "Notifications", weeks: [1, 2] },
        { label: "Workflow automation", weeks: [2, 4] },
        { label: "Offline mode", weeks: [2, 3] },
      ],
      teamThreshold: 16,
    },
    // PLACEHOLDER: confirm engagement models with IDN.
    packages: {
      pill: "Ways to work with us",
      heading: ["Pick the model", "that fits the work."],
      intro: "A clear scope suits a fixed price. Bigger or evolving products suit a dedicated team.",
      items: [
        {
          name: "Fixed-scope project",
          audience: "A clear brief with a defined outcome",
          system: "One price and one delivery date, agreed up front",
          includes: ["Discovery workshop", "Design and build", "Testing and launch", "30 days of post-launch fixes"],
        },
        {
          name: "Dedicated team",
          audience: "Larger products that keep evolving",
          system: "A team in weekly sprints, billed monthly",
          includes: ["Product lead and developers", "Weekly demos", "Flexible priorities", "Shared roadmap"],
        },
        {
          name: "Support and maintenance",
          audience: "Software that is already live",
          system: "A monthly plan to keep it healthy and improving",
          includes: ["Monitoring and alerts", "Bug fixes and updates", "Agreed response times", "Small improvements"],
        },
      ],
    },
    process: {
      heading: ["Our process,", "start to launch."],
      layout: "cards",
      steps: [
        { title: "Discover", body: "We map your challenges, goals and constraints through structured workshops and stakeholder interviews." },
        { title: "Design", body: "Wireframes, architecture diagrams and technical specs, all agreed before a single line of production code." },
        { title: "Develop", body: "Agile sprints with continuous delivery, weekly demos and real-time updates in your preferred channel." },
        { title: "Deploy", body: "Automated releases, production hardening, user training and handover documentation, as standard." },
      ],
    },
    // PLACEHOLDER: the example answers illustrate the idea; confirm IDN AI's real capabilities before launch.
    teaser: {
      tag: "Coming soon",
      title: "IDN AI",
      body: "An intelligent automation layer designed to transform how Nigerian businesses operate. Ask questions in plain language and get answers from your power, network and business data.",
      abilities: ["Answers in plain language", "Spots problems early", "Writes your reports"],
      cta: "Ask about early access",
      examples: [
        {
          prompt: "Which Abuja sites lost power this week?",
          answer:
            "Three sites switched to battery backup on Tuesday and all recovered within 40 minutes. Site 12's batteries are ageing, so I'd schedule a check.",
          source: "Power monitoring",
        },
        {
          prompt: "Why is the Lagos office Wi-Fi slow?",
          answer:
            "Access point 4 on the second floor is overloaded at peak hours, with 63 devices connected. Adding one access point would balance the load.",
          source: "Network monitoring",
        },
        {
          prompt: "Draft this month's operations report",
          answer:
            "Done. Uptime was 99.8%, 14 tickets were resolved and diesel spend fell 22%. I've added charts and sent it to you for review.",
          source: "Business reports",
        },
      ],
    },
    // PLACEHOLDER figures: confirm terms with IDN.
    assurances: {
      pill: "Our commitments",
      heading: ["Your software,", "your code."],
      intro: "Clear ownership, steady communication and support that continues after launch.",
      items: [
        { value: "100%", title: "Code ownership", body: "You own the code and the data. Everything is handed over with documentation." },
        { value: "Weekly", title: "Demos", body: "See working software every week, not just at the end." },
        { value: "30", unit: "days", title: "Post-launch fixes", body: "We fix any bugs found in the first month after launch, at no cost." },
        { value: "99.9%", unit: "uptime", title: "Hosting target", body: "Our uptime target for software we host and maintain." },
      ],
      brands: ["Tool one", "Tool two", "Tool three", "Tool four", "Tool five"],
    },
    // PLACEHOLDER answers: confirm with IDN.
    faqs: [
      {
        q: "How much does custom software cost?",
        a: "It depends on scope. After a short discovery call we send a clear quote, either a fixed price for a defined project or a monthly rate for a dedicated team.",
      },
      {
        q: "How long does it take to build?",
        a: "Simple web apps often take six to ten weeks. Larger platforms are released in stages so you get value early. Try the project scoper above for a rough guide.",
      },
      {
        q: "Who owns the code?",
        a: "You do. When the project is paid for, the code, designs and data are yours, with documentation so any team can maintain them.",
      },
      {
        q: "Can you work with our existing systems?",
        a: "Yes. We connect new software to the tools you already use, such as accounting, ERP, payment gateways and messaging, rather than replacing them.",
      },
      {
        q: "How do you keep our data secure?",
        a: "We build with role-based access, encryption and audit logs, and handle personal data in line with the Nigeria Data Protection Act.",
      },
      {
        q: "What happens after launch?",
        a: "We fix bugs for the first 30 days, then you can choose a support plan for monitoring, updates and new features.",
      },
    ],
  },
];

export const getSolutionPage = (slug: string) => solutionPages.find((p) => p.slug === slug);
