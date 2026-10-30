// Site copy. Items marked PLACEHOLDER need real data from IDN.

// PLACEHOLDER: the TapSun marketplace URL. While null, TapSun links point to the TapSun section on the home page
// and the "Shop kits on TapSun" buttons stay hidden.
export const tapsunUrl: string | null = null;
export const tapsunHref = tapsunUrl ?? "/#tapsun";

/** True for links that leave the site, so they can open in a new tab. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);
/** Spread onto a link so external destinations open in a new tab. */
export const externalProps = (href: string) => (isExternal(href) ? { target: "_blank", rel: "noopener" } : {});

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/#solutions" },
  { label: "TapSun", href: tapsunHref },
] as const;

export const solutions = [
  {
    id: "power",
    index: "01",
    title: "Alternative power",
    href: "/solutions/alternative-power",
    blurb: "Solar, inverters and battery backup",
    summary:
      "Solar, inverter and battery systems sized to your load, installed and maintained by our own engineers.",
    points: ["Load assessment", "Solar and inverter installs", "Backup and maintenance"],
    image: "/images/solutions/alternative-power/hero-engineers.jpg",
    alt: "Two engineers installing and checking rooftop solar panels at sunset",
    // Horizontal crop point, keeps the person in frame when the card is narrow.
    focus: "85% center",
    grade: true,
  },
  {
    id: "networking",
    index: "02",
    title: "Networking",
    href: "/solutions/networking",
    blurb: "Fibre, cabling and secure intercom",
    summary:
      "Enterprise fiber, structured cabling and secure intercom setups that stay fast and stay up.",
    points: ["Fiber and structured cabling", "Network design", "Secure intercommunication"],
    image: "/images/service-networking.png",
    alt: "Technician patching fiber cables in a server rack",
    focus: "95% center",
  },
  {
    id: "software",
    index: "03",
    title: "Software",
    href: "/solutions/software",
    blurb: "Custom tools and workflow automation",
    summary:
      "Custom digital tools and workflow automation that cut downtime and help teams scale with confidence.",
    points: ["Custom internal tools", "Workflow automation", "Systems integration"],
    image: "/images/service-software-office.jpg",
    alt: "IDN software team working together at laptops in front of a sprint board",
    focus: "48% center",
    // Unlike the networking export, this photo has no built-in grade, so one is added in CSS.
    grade: true,
  },
] as const;

export const pillars = [
  {
    title: "Expertise",
    body: "Certified engineers design every system to industry-grade standards before a single panel or cable goes in.",
  },
  {
    title: "Nationwide presence",
    body: "Teams in Abuja and Lagos, with project delivery across Nigeria.",
  },
  {
    title: "End-to-end delivery",
    body: "One partner from assessment and design to installation, handover and ongoing support.",
  },
  {
    title: "Trusted partnership",
    body: "We stay on after go-live, with maintenance and a direct line to the people who built your system.",
  },
] as const;

// PLACEHOLDER names: the original design repeats one stock name. Swap in real clients.
export const testimonials = [
  {
    quote:
      "Since switching to IDN TapSun, our monthly generator costs have dropped significantly. The solar and backup system gives us reliable power and peace of mind.",
    name: "Amaka Obi",
    role: "Business owner, Lagos",
  },
  {
    quote:
      "The installation was seamless and professional. We now enjoy uninterrupted power while contributing to a cleaner environment.",
    name: "Tunde Bello",
    role: "Homeowner, Abuja",
  },
  {
    quote:
      "They understood our requirements from day one and delivered a network that scales with our growing business.",
    name: "Ngozi Eze",
    role: "Head of Technology, Retail chain",
  },
  {
    quote:
      "IDN upgraded our network infrastructure and the difference was immediate: faster connectivity, better security and virtually zero downtime.",
    name: "Ibrahim Musa",
    role: "IT Manager, Financial institution",
  },
  {
    quote:
      "We were looking for a technology partner, not just a vendor. IDN has become a trusted advisor in our digital transformation.",
    name: "Chiamaka Nwosu",
    role: "CIO, Enterprise client",
  },
  {
    quote:
      "From consultation to implementation, the experience was exceptional. Their solutions have improved productivity across our organization.",
    name: "Femi Adeyemi",
    role: "General Manager, Educational institution",
  },
] as const;

// PLACEHOLDER titles and locations: confirm with IDN.
export const projects = [
  { title: "Steel canopy and solar mount", place: "Abuja", image: "/images/project-pergola.png" },
  { title: "Residential facade and backup install", place: "Abuja", image: "/images/project-facade.png" },
  { title: "Rooftop solar array", place: "Lagos", image: "/images/service-alternative-power.png" },
  { title: "Server room fiber build", place: "Lagos", image: "/images/service-networking.png" },
] as const;

// PLACEHOLDER answers except the solar one, which comes from the original design.
export const faqs = [
  {
    q: "What services does IDN provide?",
    a: "Alternative power (solar, inverters and batteries), enterprise networking and fiber, and custom software and workflow automation.",
  },
  {
    q: "Can IDN design and install a complete solar system?",
    a: "Yes. Our team assesses your energy needs, designs the right system and handles installation, maintenance and ongoing support.",
  },
  {
    q: "Does IDN work with both small and large businesses?",
    a: "Yes. We size every project to the site, from a single home or shop to multi-site enterprise deployments.",
  },
  {
    q: "How can I buy solar products from TapSun?",
    a: "Browse inverters, batteries and panels on the TapSun Marketplace, or contact us and we will recommend a complete kit.",
  },
  {
    q: "How do I request a consultation or quote?",
    a: "Use the contact form or call either office. An engineer will follow up to understand your site and send a quote.",
  },
] as const;

// PLACEHOLDER names: swap for real partner logos.
export const partners = ["Logoipsum", "Northwind", "Kestrel", "Halcyon", "Meridian", "Arbor"] as const;

// Sectors IDN serves, drawn from the client testimonials.
export const sectors = ["Financial services", "Education", "Retail", "Enterprise", "Homes"] as const;

export type Office = {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  /** Path under /public. Null shows a placeholder panel until a photo is added. */
  image: string | null;
};

/** tel: link for a Nigerian number written locally (0705-555-2445) or internationally (+234 ...). */
export const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("0") ? `+234${digits.slice(1)}` : digits}`;
};

/** Google Maps embed and directions links, built from the address so they always match it. */
export const mapEmbedUrl = (o: Office) => `https://maps.google.com/maps?q=${encodeURIComponent(o.address)}&z=15&output=embed`;
export const directionsUrl = (o: Office) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(o.address)}`;

// PLACEHOLDER opening hours and photos. Addresses, phone and email are confirmed by IDN.
export const offices: readonly Office[] = [
  {
    city: "Abuja",
    address: "19, Olu Awotesu Street, Lifecamp, Jabi 900108, Abuja",
    phone: "0705-555-2445",
    email: "info@idnng.com",
    hours: "Monday to Friday, 8:00 to 17:00",
    image: null,
  },
  {
    city: "Lagos",
    address: "Plot 11934, Kasumu Ekemede Street, Victoria Island, Lagos",
    phone: "0705-555-2445",
    email: "info@idnng.com",
    hours: "Monday to Friday, 8:00 to 17:00",
    image: null,
  },
];

// PLACEHOLDER social URLs. Links left as "#" are hidden until a real URL is added.
export const footerLinks = {
  Company: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Solutions: [
    { label: "Alternative power", href: "/solutions/alternative-power" },
    { label: "Networking", href: "/solutions/networking" },
    { label: "Software", href: "/solutions/software" },
    { label: "TapSun", href: tapsunHref },
  ],
  Social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

// About page

export const facts = [
  ["Two offices", "Abuja and Lagos, delivering nationwide"],
  ["Three disciplines", "Power, networking and software"],
  ["One team", "From first assessment to long-term support"],
] as const;

export const principles = {
  vision:
    "To be a vibrant data network company that leads the way in providing cutting-edge digital solutions in Nigeria.",
  mission: "To provide excellent customer service in all data and internet-related communications in Nigeria.",
  values: ["Excellence", "Innovation", "Integrity", "Customer satisfaction", "Reliability"],
} as const;

export const leaders = [
  { name: "Joe Okojie", role: "Managing Director", image: "/images/about/okojie.jpg" },
  { name: "Ehichioya Osagie", role: "Chief Operations Officer", image: "/images/about/osagie.jpg" },
  { name: "Patricia Ozioko", role: "HR Manager", image: "/images/about/patricia.jpg" },
] as const;

// The three IDN entities. The site stays under the IDN name; these appear only as visual storytelling.
export const entities = [
  { name: "Intercontinental", focus: "Global infrastructure and fibre", color: "var(--color-intercontinental)" },
  { name: "Interdigital", focus: "Cloud computing and processing", color: "var(--color-interdigital)" },
  { name: "Intercom", focus: "Secure routing and voice networks", color: "var(--color-intercom)" },
] as const;

// Contact page

/** Where general enquiries go. */
export const contactEmail = "info@idnng.com";

export const contactTopics = [
  { id: "power", label: "Alternative power" },
  { id: "networking", label: "Networking" },
  { id: "software", label: "Software" },
  { id: "tapsun", label: "TapSun products" },
  { id: "consultation", label: "Free consultation" },
  { id: "ai", label: "IDN AI early access" },
  { id: "partnerships", label: "Partnerships" },
  { id: "general", label: "General enquiry" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["id"];

/** Link to the contact form, optionally with a topic chosen and the message started for the visitor. */
export const contactHref = (topic?: ContactTopic, message?: string) => {
  const params = new URLSearchParams();
  if (topic) params.set("topic", topic);
  if (message) params.set("message", message);
  const query = params.toString();
  return `/contact${query ? `?${query}` : ""}#message`;
};
