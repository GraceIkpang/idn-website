// Site copy. Items marked PLACEHOLDER need real data from IDN.

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Products", href: "/#tapsun" },
] as const;

export const solutions = [
  {
    id: "power",
    index: "01",
    title: "Alternative power",
    summary:
      "Solar, inverter and battery systems sized to your load, installed and maintained by our own engineers.",
    points: ["Load assessment", "Solar and inverter installs", "Backup and maintenance"],
    image: "/images/service-alternative-power.png",
    alt: "Engineer checking solar panels on a rooftop array",
    // Horizontal crop point, keeps the person in frame when the card is narrow.
    focus: "65% center",
  },
  {
    id: "networking",
    index: "02",
    title: "Networking",
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
    summary:
      "Custom digital tools and workflow automation that cut downtime and help teams scale with confidence.",
    points: ["Custom internal tools", "Workflow automation", "Systems integration"],
    image: "/images/service-software.jpg",
    alt: "Two developers reviewing code together on a laptop",
    focus: "100% center",
    // Unlike the other two exports, this photo has no built-in grade, so one is added in CSS.
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

type Office = {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  /** Path under /public. Null shows a placeholder panel until a photo is added. */
  image: string | null;
  /** Google Maps link for the office. */
  directions: string;
};

// PLACEHOLDER contact details, hours, photos and map links.
export const offices: readonly Office[] = [
  {
    city: "Abuja",
    address: "Office address, Abuja, FCT",
    phone: "+234 000 000 0000",
    email: "abuja@idn.ng",
    hours: "Monday to Friday, 8:00 to 17:00",
    image: null,
    directions: "https://maps.google.com/?q=Abuja",
  },
  {
    city: "Lagos",
    address: "Office address, Lagos",
    phone: "+234 000 000 0000",
    email: "lagos@idn.ng",
    hours: "Monday to Friday, 8:00 to 17:00",
    image: null,
    directions: "https://maps.google.com/?q=Lagos",
  },
];

// PLACEHOLDER social URLs.
export const footerLinks = {
  Company: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Contact", href: "#contact" },
  ],
  Solutions: [
    { label: "Alternative power", href: "/#solutions" },
    { label: "Networking", href: "/#solutions" },
    { label: "Software", href: "/#solutions" },
    { label: "TapSun", href: "/#tapsun" },
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
