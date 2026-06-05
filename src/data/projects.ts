/**
 * Project + case-study data.
 *
 * Single source of truth for the home "Selected work" stack and the
 * `/work/[slug]` case-study template. Adding or reordering work is a data
 * edit here — no component changes.
 *
 * Rich copy (challenge body, build lead, results statement) uses the
 * `*asterisk*` convention to mark the one ember-highlighted phrase per block;
 * the <RichText> component renders those spans. Short heading highlights use
 * an explicit `{ pre, ember, post }` split.
 *
 * Honesty note: metrics are real, measured Lighthouse scores (desktop preset,
 * run against the live sites). Testimonials are only included where a real
 * client quote about the work exists — `quote` is optional and currently
 * omitted everywhere until real testimonials are collected.
 *
 * i18n note: to localize, these string fields become locale-keyed lookups;
 * the types and component contracts stay identical, so it's a content task.
 */

export type IconName =
  | "target"
  | "design"
  | "launch"
  | "build"
  | "code"
  | "bolt"
  | "hub";

export interface Blurb {
  pre: string;
  ember: string;
  post: string;
}

export type SpecKey = "role" | "stack" | "integration" | "timeline";

export interface CaseStudySpec {
  key: SpecKey;
  value: string;
}

export interface CaseStudyShot {
  /** "01" etc. */
  n: string;
  /** Caption key, e.g. "01 — Homepage". */
  label: string;
  /** Bold lead of the caption. */
  lead: string;
  /** Trailing description. */
  body: string;
  /** Placeholder text for the (swappable) screenshot. */
  placeholder: string;
  /** Optional real image. */
  image?: string;
}

export interface CaseStudyMetric {
  value: string;
  unit?: string;
  label: string;
}

export interface CaseStudyQuote {
  /** Body copy with a single `*ember phrase*`. */
  quote: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  /** Hero meta strip. */
  platform: string;
  year: string;
  liveUrl?: string;
  liveLabel?: string;
  /** Hero outcome line: `pre` + ember highlight. */
  outcome: { pre: string; ember: string };
  tags: string[];
  /** Big hero media. */
  heroImage?: string;
  heroImageAlt?: string;
  heroBadge: string;
  /** Challenge section. */
  challengeHeading: string;
  /** Body copy with one `*ember phrase*`. */
  challengeBody: string;
  challengeVisualCaption: string;
  specs: CaseStudySpec[];
  /** Build section. */
  buildHeading: string;
  /** Lead with one `*ember phrase*`. */
  buildLead: string;
  shots: CaseStudyShot[];
  /** Results (ember-flooded) band. */
  resultsStatement: string;
  resultsSub: string;
  metrics: CaseStudyMetric[];
  /** Pull quote — optional; only rendered when a real client testimonial exists. */
  quote?: CaseStudyQuote;
}

export interface Project {
  slug: string;
  /** "01"–"06", drives the numbered badge + card eyebrow. */
  index: string;
  name: string;
  category: string;
  year: string;
  tags: string[];
  blurb: Blurb;
  /** Real screenshot if one exists; otherwise the styled placeholder shows. */
  image?: string;
  imageAlt?: string;
  /** "full" → dedicated /work/[slug] case study; "compact" → listed only. */
  kind: "full" | "compact";
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "true-north-jerseys",
    index: "01",
    name: "True North Jerseys",
    category: "E-commerce build",
    year: "2026",
    tags: ["Webflow", "Ecommerce", "GSAP"],
    blurb: {
      pre: "Custom hockey & baseball kits for a BC brand — a Webflow store, ",
      ember: "built different",
      post: ", with scroll-tied product reveals.",
    },
    image: "/assets/truenorth-hero.webp",
    imageAlt: "True North Jerseys — custom hockey & baseball apparel store",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2026",
      liveUrl: "https://truenorthjerseys.com",
      liveLabel: "truenorthjerseys.com",
      outcome: {
        pre: "A custom-kit brand that lives on detail. The store had to ",
        ember: "show it.",
      },
      tags: ["Webflow", "Ecommerce", "GSAP", "CMS"],
      heroImage: "/assets/truenorth-hero.webp",
      heroImageAlt: "True North Jerseys — 'built different' storefront",
      heroBadge: "truenorthjerseys.com · shop",
      challengeHeading: "A premium, made-to-order product on a generic shelf.",
      challengeBody:
        "True North makes custom hockey and baseball jerseys in BC — sublimated, reversible, embroidered, the craft is the whole pitch. But that detail is exactly what a stock template *flattens into a grid*. The brand needed a store that felt as considered as the product, kept the catalog easy to run, and put the path to a quote one tap away.",
      challengeVisualCaption: "truenorthjerseys.com · shop",
      specs: [
        { key: "role", value: "Front-end build, end to end" },
        { key: "stack", value: "Webflow · GSAP · CMS" },
        { key: "integration", value: "Webflow Ecommerce" },
      ],
      buildHeading: "A store that shows the craft before it asks for the sale.",
      buildLead:
        "I built the storefront end to end in Webflow on native Webflow Ecommerce, with a CMS-driven catalog and *GSAP scroll-tied reveals that let each kit breathe*. Product lines — hockey, baseball, team apparel — are structured so the family-run team adds and edits everything itself, with the cart and quote flow wired in without leaving the brand.",
      shots: [
        {
          n: "01",
          label: "01 — Storefront",
          lead: "A bold “built different” brand, front and centre",
          body: " — action photography and scroll-tied reveals that mirror the craft, not a generic grid.",
          placeholder: "Storefront — drop screenshot",
          image: "/assets/truenorth-shot1.webp",
        },
        {
          n: "02",
          label: "02 — Product lines",
          lead: "Hockey, baseball and team apparel, CMS-driven",
          body: " — sublimated, reversible and embroidered options the team manages without code.",
          placeholder: "Product line — drop screenshot",
          image: "/assets/truenorth-shot2.webp",
        },
        {
          n: "03",
          label: "03 — Order & quote",
          lead: "Webflow Ecommerce wired in, on-brand throughout",
          body: " — the order and quote path stays one tap away the moment intent lands.",
          placeholder: "Order — drop screenshot",
          image: "/assets/truenorth-shot3.webp",
        },
      ],
      resultsStatement: "The store finally feels like the product — considered, bold, and theirs to run.",
      resultsSub:
        "Shipped on Webflow and handed off clean: the team adds kits from the CMS. The numbers below are measured on the live store.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "92", label: "Lighthouse accessibility" },
        { value: "87", label: "Lighthouse performance" },
      ],
    },
  },
  {
    slug: "k2btools",
    index: "02",
    name: "K2BTools",
    category: "Marketing site",
    year: "2025",
    tags: ["Webflow", "Client-First", "GSAP"],
    blurb: {
      pre: "Developer tooling for GeneXus — a trilingual Webflow site with ",
      ember: "performance-tuned",
      post: " Client-First motion.",
    },
    image: "/assets/k2btools-hero.webp",
    imageAlt: "K2BTools — GeneXus developer tooling site",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2025",
      liveUrl: "https://web.k2btools.com",
      liveLabel: "k2btools.com",
      outcome: {
        pre: "A developer-tools company whose site had to feel as sharp as the ",
        ember: "product.",
      },
      tags: ["Webflow", "Client-First", "GSAP", "Webflow Localization"],
      heroImage: "/assets/k2btools-hero.webp",
      heroImageAlt: "K2BTools — 'Impulsamos el mundo GeneXus' homepage",
      heroBadge: "k2btools.com · home",
      challengeHeading: "A whole product suite, three languages, one team to run it.",
      challengeBody:
        "K2BTools builds tooling that accelerates GeneXus development — eight-plus products, from web and mobile generators to auditing and AI. The site had to make that range *legible without burying the buyer*, ship in Spanish, English and Portuguese, and stay editable by the marketing team. Motion had to signal engineering quality without dragging the page down.",
      challengeVisualCaption: "k2btools.com · home",
      specs: [
        { key: "role", value: "Front-end build" },
        { key: "stack", value: "Webflow · Client-First · GSAP" },
        { key: "integration", value: "Webflow Localization · es / en / pt" },
      ],
      buildHeading: "Serious motion on a structure that scales to three languages.",
      buildLead:
        "I built the marketing site in Webflow on Client-First, with GSAP doing the heavy lifting — *scroll animations that read as craft*, reduced-motion aware. The whole thing runs on Webflow Localization across three languages (Spanish, English, Portuguese), componentised and CMS-driven, so the team ships solution pages, articles and success stories in any locale without a developer in the loop.",
      shots: [
        {
          n: "01",
          label: "01 — The suite",
          lead: "Eight-plus tools, each its own clear page",
          body: " — a Client-First component system, tuned to stay light under GSAP motion.",
          placeholder: "Tools — drop screenshot",
          image: "/assets/k2btools-shot1.webp",
        },
        {
          n: "02",
          label: "02 — Plans",
          lead: "A clear path from tool to purchase",
          body: " — pricing and plans laid out so the buyer never has to dig.",
          placeholder: "Plans — drop screenshot",
          image: "/assets/k2btools-shot2.webp",
        },
        {
          n: "03",
          label: "03 — Localization",
          lead: "Three languages on Webflow Localization",
          body: " — Spanish, English and Portuguese from one CMS, articles and success stories the team ships itself.",
          placeholder: "Localization — drop screenshot",
          image: "/assets/k2btools-shot3.webp",
        },
      ],
      resultsStatement: "The motion reads as craft — and the structure holds across three languages.",
      resultsSub:
        "Launched on Client-First and handed off documented: the marketing team ships in any locale. Measured on the live site, the build scores clean.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "100", label: "Lighthouse best practices" },
        { value: "95", label: "Lighthouse accessibility" },
      ],
    },
  },
  {
    slug: "bike",
    index: "03",
    name: "BIKE",
    category: "Webflow build",
    year: "2025",
    tags: ["Webflow", "GSAP", "3D / Spline"],
    blurb: {
      pre: "A Montevideo English school that teaches by talking — a Webflow build with a custom loader and a ",
      ember: "3D bike on the 404",
      post: ".",
    },
    image: "/assets/bike-hero.webp",
    imageAlt: "BIKE — bike.uy homepage",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2025",
      liveUrl: "https://bike.uy",
      liveLabel: "bike.uy",
      outcome: {
        pre: "An English school that teaches by talking. The site had to feel just as ",
        ember: "alive.",
      },
      tags: ["Webflow", "GSAP", "Spline", "Finsweet"],
      heroImage: "/assets/bike-hero.webp",
      heroImageAlt: "BIKE — bike.uy homepage",
      heroBadge: "bike.uy · home",
      challengeHeading: "A method built on movement — flattened into a static page.",
      challengeBody:
        "BIKE teaches English the way you learn to ride a bike: by doing, from day one. The brand leans entirely on that metaphor — pedalling as progress — so a flat, conventional site would have *undercut the whole pitch*. It needed motion that felt playful and earned, a structure the team could keep editing, and the personality to carry levels from A1 to C2 without ever feeling like a textbook.",
      challengeVisualCaption: "bike.uy · home",
      specs: [
        { key: "role", value: "Front-end build (design: Clearframe Studio)" },
        { key: "stack", value: "Webflow · GSAP · Spline" },
        { key: "integration", value: "Webflow CMS · Finsweet" },
      ],
      buildHeading: "A site that moves the way a conversation does.",
      buildLead:
        "I built BIKE in Webflow with GSAP carrying the motion — a *custom preloader* that sets the tone before the first scroll, reveals that pace the story, and Finsweet-driven accordions and forms the team runs themselves. The 404 is its own small moment: an interactive Spline bicycle for anyone who pedals somewhere that doesn't exist yet.",
      shots: [
        {
          n: "01",
          label: "01 — Loader",
          lead: "A custom preloader that sets the tone",
          body: " — the bike mark draws in before the first scroll, motion paced by GSAP.",
          placeholder: "Loader — drop screenshot",
          image: "/assets/bike-shot1.webp",
        },
        {
          n: "02",
          label: "02 — Courses",
          lead: "Roadmap, Talk and Career — structured A1 to C2",
          body: " — CMS-driven, so the team adds and edits courses without touching code.",
          placeholder: "Courses — drop screenshot",
          image: "/assets/bike-shot2.webp",
        },
        {
          n: "03",
          label: "03 — 404",
          lead: "An interactive 3D bicycle for the lost",
          body: " — a Spline scene that turns a dead end into a piece of the brand.",
          placeholder: "404 / 3D bike — drop screenshot",
          image: "/assets/bike-shot3.webp",
        },
      ],
      resultsStatement: "A site that feels like a class — fast, playful, unmistakably BIKE.",
      resultsSub:
        "Shipped on Webflow and handed off clean: the team runs courses, content and forms themselves. Measured on the live site, the build holds up where it counts.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "90", label: "Lighthouse accessibility" },
        { value: "81", label: "Lighthouse performance" },
      ],
    },
  },
  {
    slug: "home-organizers",
    index: "04",
    name: "Home Organizers LI",
    category: "Custom-coded site",
    year: "2026",
    tags: ["Custom code", "Vanilla JS", "GSAP"],
    blurb: {
      pre: "A Long Island organizing studio, ",
      ember: "hand-coded end to end",
      post: " — vanilla JS, GSAP, and a before/after slider I built from scratch.",
    },
    image: "/assets/homeorganizers-hero.webp",
    imageAlt: "Home Organizers Long Island — custom-coded site",
    kind: "full",
    caseStudy: {
      platform: "Custom code",
      year: "2026",
      liveUrl: "https://homeorganizersli.com",
      liveLabel: "homeorganizersli.com",
      outcome: {
        pre: "A calm, premium service that deserved a site to match — so I built it ",
        ember: "from scratch.",
      },
      tags: ["HTML", "CSS", "Vanilla JS", "GSAP", "Netlify"],
      heroImage: "/assets/homeorganizers-hero.webp",
      heroImageAlt: "Home Organizers Long Island — 'a home that finally feels calm'",
      heroBadge: "homeorganizersli.com · home",
      challengeHeading: "A warm, hands-on service — with no site to show for it.",
      challengeBody:
        "Home Organizers help busy Long Island homeowners reclaim their space, and the whole promise is *calm without judgment*. That feeling is hard to fake with a template. I took the project end to end — design, copy, SEO and code — and chose to hand-build it: no Webflow, no framework, no build step, so every detail of the feel and the performance was mine to tune.",
      challengeVisualCaption: "homeorganizersli.com · home",
      specs: [
        { key: "role", value: "Design, build, copy & SEO" },
        { key: "stack", value: "HTML · CSS · vanilla JS · GSAP" },
        { key: "integration", value: "Netlify Forms · JSON-LD" },
      ],
      buildHeading: "A bespoke static build, tuned by hand.",
      buildLead:
        "Hand-written HTML, CSS custom properties and vanilla JavaScript — no framework, self-hosted Sora and Overpass for speed, and GSAP + ScrollTrigger for the motion. The centrepiece is a *before/after slider I wrote from scratch*: a carousel with a draggable reveal handle on mobile. Contact runs on Netlify Forms, and the SEO is deliberate down to the JSON-LD LocalBusiness schema.",
      shots: [
        {
          n: "01",
          label: "01 — Services",
          lead: "Three ways to lighten the load, before/after up front",
          body: " — warm neutral palette, Sora + Overpass, GSAP reveals that breathe.",
          placeholder: "Services — drop screenshot",
          image: "/assets/homeorganizers-shot1.webp",
        },
        {
          n: "02",
          label: "02 — Before / After",
          lead: "A reveal slider built by hand in vanilla JS",
          body: " — drag to compare on mobile, dot-navigated carousel on desktop. No library.",
          placeholder: "Before/After slider — drop screenshot",
          image: "/assets/homeorganizers-shot2.webp",
        },
        {
          n: "03",
          label: "03 — The result",
          lead: "Calm, organized spaces — the outcome the brand promises",
          body: " — real project photography, framed by a system built for performance and SEO.",
          placeholder: "Result — drop screenshot",
          image: "/assets/homeorganizers-shot3.webp",
        },
      ],
      resultsStatement: "Proof I can take a brand from blank page to live — design, copy, code and SEO.",
      resultsSub:
        "No framework, no page builder — a fast static site I own end to end. The numbers below are measured on the live build.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "100", label: "Lighthouse best practices" },
        { value: "94", label: "Lighthouse accessibility" },
      ],
    },
  },
  {
    slug: "nextfense",
    index: "05",
    name: "Nextfense",
    category: "Webflow build",
    year: "2025",
    tags: ["Webflow", "GSAP", "Illustration"],
    blurb: {
      pre: "A Montevideo cybersecurity firm — a Webflow build with ",
      ember: "custom illustration",
      post: " for its managed-security platform.",
    },
    image: "/assets/nextfense-hero.webp",
    imageAlt: "Nextfense — cybersecurity site",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2025",
      liveUrl: "https://nextfense.com",
      liveLabel: "nextfense.com",
      outcome: {
        pre: "A security platform is only as trusted as it looks. This one had to read as ",
        ember: "serious.",
      },
      tags: ["Webflow", "GSAP", "Illustrator", "Webflow Localization"],
      heroImage: "/assets/nextfense-hero.webp",
      heroImageAlt: "Nextfense — 'Construye un futuro digital más seguro' hero",
      heroBadge: "nextfense.com · home",
      challengeHeading: "Selling trust in a category built on it.",
      challengeBody:
        "Nextfense centralises managed cybersecurity — pentesting, vulnerability scanning, virtual CISO — into one platform, Nextfense Core. The site had to make a complex, abstract service feel *concrete and credible* to a corporate buyer, hold up in two languages, and stay easy for the team to extend as the offering grows.",
      challengeVisualCaption: "nextfense.com · home",
      specs: [
        { key: "role", value: "Front-end build & custom illustration" },
        { key: "stack", value: "Webflow · GSAP · Illustrator" },
        { key: "integration", value: "Webflow Localization · es / en" },
      ],
      buildHeading: "A platform site that earns the word “secure”.",
      buildLead:
        "I built Nextfense in Webflow with a *six-pillar approach laid out around custom Illustrator artwork* — abstract security iconography that gives an intangible service something to look at. The whole thing is bilingual (es/en) on Webflow Localization, CMS-driven for case studies and blog, with GSAP carrying restrained, on-brand motion.",
      shots: [
        {
          n: "01",
          label: "01 — Nextfense Core",
          lead: "The managed-security platform, one clear diagram",
          body: " — a complex service made concrete with custom graphics and restrained motion.",
          placeholder: "Core platform — drop screenshot",
          image: "/assets/nextfense-shot1.webp",
        },
        {
          n: "02",
          label: "02 — Approach",
          lead: "Six pillars, anchored by custom Illustrator artwork",
          body: " — bespoke iconography that gives an abstract service something to read.",
          placeholder: "Approach / illustration — drop screenshot",
          image: "/assets/nextfense-shot2.webp",
        },
        {
          n: "03",
          label: "03 — Services",
          lead: "Offensive security & pentesting, detailed and bilingual",
          body: " — es/en on Webflow Localization, so the team ships new work without a developer.",
          placeholder: "Services — drop screenshot",
          image: "/assets/nextfense-shot3.webp",
        },
      ],
      resultsStatement: "A site that reads as credible as the service it sells.",
      resultsSub:
        "Bilingual, CMS-driven and handed off clean. Measured on the live site, the build scores where trust is decided.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "100", label: "Lighthouse best practices" },
        { value: "97", label: "Lighthouse accessibility" },
      ],
    },
  },
  {
    slug: "seilas-ship-supplies",
    index: "06",
    name: "Seilas Ship Supplies",
    category: "B2B site",
    year: "2024",
    tags: ["Webflow", "CMS", "B2B"],
    blurb: {
      pre: "A century-old Uruguayan ship chandler — a clean Webflow site spanning ",
      ember: "500+ clients",
      post: " across 30+ countries.",
    },
    image: "/assets/seilas-hero.webp",
    imageAlt: "Seilas Ship Supplies — 'Since 1921, your trusted ship supplier in Uruguay'",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2024",
      liveUrl: "https://www.nadetir.com",
      liveLabel: "nadetir.com",
      outcome: {
        pre: "A ship chandler that's supplied Uruguay's ports for a century. The site had to carry that ",
        ember: "legacy.",
      },
      tags: ["Webflow", "CMS", "B2B"],
      heroImage: "/assets/seilas-hero.webp",
      heroImageAlt: "Seilas Ship Supplies — 'Since 1921, your trusted ship supplier in Uruguay'",
      heroBadge: "nadetir.com · home",
      challengeHeading: "A hundred years of trust — and nothing online to show it.",
      challengeBody:
        "Seilas Ship Supplies (Nadetir S.A.) has provisioned vessels at every port in Uruguay since 1921 — deck and safety gear, engine-room supplies, provisions, bonded stores. A century of reputation, but a web presence that *didn't carry the weight*. The brief: a credible, international-feeling B2B site that says “trusted since 1921” without saying a word.",
      challengeVisualCaption: "nadetir.com · home",
      specs: [
        { key: "role", value: "Front-end build" },
        { key: "stack", value: "Webflow · CMS" },
        { key: "integration", value: "Webflow CMS" },
      ],
      buildHeading: "A clean, global home for a century-old supplier.",
      buildLead:
        "I built the site in Webflow — restrained, confident, and built to scale. A *world map of 500+ clients across 30+ countries* anchors the story, the full service range is laid out for maritime buyers, and the brand's 1921 heritage runs through the whole thing. CMS-driven where it counts, so the team keeps it current.",
      shots: [
        {
          n: "01",
          label: "01 — Home",
          lead: "“Keeping vessels moving, worldwide”",
          body: " — a world map of 500+ clients across 30+ countries, front and centre.",
          image: "/assets/seilas-card.webp",
          placeholder: "Home / map — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Heritage",
          lead: "A hundred years of history, told with intent",
          body: " — the 1921 founding story, framed for a B2B audience.",
          image: "/assets/seilas-history.webp",
          placeholder: "About / history — drop screenshot",
        },
      ],
      resultsStatement: "A site that finally looks the part — a century of trust, online.",
      resultsSub:
        "Shipped on Webflow and handed off clean. The numbers below are measured on the live site.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "100", label: "Lighthouse best practices" },
        { value: "90", label: "Lighthouse accessibility" },
      ],
    },
  },
];

/** Projects with a dedicated case-study page, in display order. */
export const caseStudies = projects.filter(
  (p): p is Project & { caseStudy: CaseStudy } => p.kind === "full" && !!p.caseStudy,
);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The next full case study after `slug`, wrapping around. */
export function getNextCaseStudy(slug: string): Project & { caseStudy: CaseStudy } {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}
