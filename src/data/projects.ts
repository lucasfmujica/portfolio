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
    slug: "bike",
    index: "01",
    name: "BIKE",
    category: "Webflow build",
    year: "2025",
    tags: ["Webflow", "GSAP", "3D / Spline"],
    blurb: {
      pre: "A Montevideo English school that teaches by talking — a Webflow build with a custom loader and a ",
      ember: "3D bike on the 404",
      post: ".",
    },
    image: "/assets/project-bike.png",
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
      heroImage: "/assets/project-bike.png",
      heroImageAlt: "BIKE — bike.uy homepage on a laptop",
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
          label: "01 — Homepage",
          lead: "A conversational hero with a custom loader",
          body: " — the bike metaphor lands in the first three seconds, motion paced by GSAP.",
          placeholder: "Homepage — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Courses",
          lead: "Roadmap, Talk and Career, structured A1–C2",
          body: " — CMS-driven so the team adds courses and content without touching code.",
          placeholder: "Courses — drop screenshot",
        },
        {
          n: "03",
          label: "03 — 404 page",
          lead: "An interactive 3D bicycle for the lost",
          body: " — a Spline scene that turns a dead end into a piece of the brand.",
          placeholder: "404 / 3D bike — drop screenshot",
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
    index: "02",
    name: "Home Organizers LI",
    category: "Custom-coded site",
    year: "2026",
    tags: ["Custom code", "Vanilla JS", "GSAP"],
    blurb: {
      pre: "A Long Island organizing studio, ",
      ember: "hand-coded end to end",
      post: " — vanilla JS, GSAP, and a before/after slider I built from scratch.",
    },
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
          label: "01 — Hero",
          lead: "“Trade the clutter for a home that finally feels calm”",
          body: " — warm neutral palette, Sora + Overpass, GSAP reveals that breathe.",
          placeholder: "Hero — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Before / After",
          lead: "A reveal slider built by hand in vanilla JS",
          body: " — drag to compare on mobile, dot-navigated carousel on desktop. No library.",
          placeholder: "Before/After slider — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Contact",
          lead: "A validated form on Netlify, with real SEO underneath",
          body: " — Open Graph, Twitter cards and JSON-LD ProfessionalService schema, all hand-authored.",
          placeholder: "Contact — drop screenshot",
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
    index: "03",
    name: "Nextfense",
    category: "Webflow build",
    year: "2025",
    tags: ["Webflow", "GSAP", "Illustration"],
    blurb: {
      pre: "A Montevideo cybersecurity firm — a Webflow build with ",
      ember: "custom illustration",
      post: " for its managed-security platform.",
    },
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
      tags: ["Webflow", "GSAP", "Illustrator", "Multilingual"],
      heroBadge: "nextfense.com · home",
      challengeHeading: "Selling trust in a category built on it.",
      challengeBody:
        "Nextfense centralises managed cybersecurity — pentesting, vulnerability scanning, virtual CISO — into one platform, Nextfense Core. The site had to make a complex, abstract service feel *concrete and credible* to a corporate buyer, hold up in two languages, and stay easy for the team to extend as the offering grows.",
      challengeVisualCaption: "nextfense.com · home",
      specs: [
        { key: "role", value: "Front-end build & custom illustration" },
        { key: "stack", value: "Webflow · GSAP · Illustrator" },
        { key: "integration", value: "Webflow CMS · es / en" },
      ],
      buildHeading: "A platform site that earns the word “secure”.",
      buildLead:
        "I built Nextfense in Webflow with a *six-pillar approach laid out around custom Illustrator artwork* — abstract security iconography that gives an intangible service something to look at. The whole thing is bilingual (es/en) on Webflow locales, CMS-driven for case studies and blog, with GSAP carrying restrained, on-brand motion.",
      shots: [
        {
          n: "01",
          label: "01 — Hero",
          lead: "“Construye un futuro digital más seguro”",
          body: " — a violet-led, high-contrast hero that signals security without the cliché padlocks.",
          placeholder: "Hero — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Approach",
          lead: "Six pillars, anchored by custom illustration",
          body: " — Illustrator artwork gives an abstract managed service something concrete to read.",
          placeholder: "Approach / illustration — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Case studies",
          lead: "CMS-driven success stories, bilingual",
          body: " — es/en on Webflow locales, so the team ships new work without a developer.",
          placeholder: "Case studies — drop screenshot",
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
    slug: "true-north-jerseys",
    index: "04",
    name: "True North Jerseys",
    category: "E-commerce build",
    year: "2026",
    tags: ["Webflow", "Ecommerce", "GSAP"],
    blurb: {
      pre: "Custom hockey & baseball kits for a BC brand — a Webflow store, ",
      ember: "built different",
      post: ", with scroll-tied product reveals.",
    },
    imageAlt: "True North Jerseys — custom apparel store",
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
        "I built the storefront in Webflow on native Webflow Ecommerce, with a CMS-driven catalog and *GSAP scroll-tied reveals that let each kit breathe*. Product lines — hockey, baseball, team apparel — are structured so the family-run team adds and edits everything itself, with the cart and quote flow wired in without leaving the brand.",
      shots: [
        {
          n: "01",
          label: "01 — Storefront",
          lead: "A bold “built different” brand, front and centre",
          body: " — action photography and scroll-tied reveals that mirror the craft, not a generic grid.",
          placeholder: "Storefront — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Product lines",
          lead: "Hockey, baseball and team apparel, CMS-driven",
          body: " — sublimated, reversible and embroidered options the team manages without code.",
          placeholder: "Product line — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Cart & quote",
          lead: "Webflow Ecommerce wired in, on-brand throughout",
          body: " — add-to-cart and the quote path stay one tap away the moment intent lands.",
          placeholder: "Cart — drop screenshot",
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
    index: "05",
    name: "K2BTools",
    category: "Marketing site",
    year: "2025",
    tags: ["Webflow", "Client-First", "GSAP"],
    blurb: {
      pre: "Developer tooling for GeneXus — a trilingual Webflow site with ",
      ember: "performance-tuned",
      post: " Client-First motion.",
    },
    image: "/assets/project-k2btools.webp",
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
      tags: ["Webflow", "Client-First", "GSAP", "Multilingual"],
      heroBadge: "k2btools.com · home",
      challengeHeading: "A whole product suite, three languages, one team to run it.",
      challengeBody:
        "K2BTools builds tooling that accelerates GeneXus development — eight-plus products, from web and mobile generators to auditing and AI. The site had to make that range *legible without burying the buyer*, ship in Spanish, English and Portuguese, and stay editable by the marketing team. Motion had to signal engineering quality without dragging the page down.",
      challengeVisualCaption: "k2btools.com · home",
      specs: [
        { key: "role", value: "Front-end build" },
        { key: "stack", value: "Webflow · Client-First · GSAP" },
        { key: "integration", value: "Webflow CMS · es / en / pt" },
      ],
      buildHeading: "Serious motion on a structure that scales to three languages.",
      buildLead:
        "I built the marketing site in Webflow on Client-First, with GSAP doing the heavy lifting — *scroll animations that read as craft*, reduced-motion aware. The whole thing is componentised and CMS-driven across three locales, so the team ships solution pages, articles and success stories in any language without a developer in the loop.",
      shots: [
        {
          n: "01",
          label: "01 — Homepage",
          lead: "“Impulsamos el mundo GeneXus”, with motion that signals quality",
          body: " — GSAP reveals on a Client-First structure, tuned to stay light.",
          placeholder: "Homepage — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Solutions",
          lead: "Eight-plus products, each its own clear page",
          body: " — a Client-First component system the team extends without code.",
          placeholder: "Solutions — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Trilingual CMS",
          lead: "Spanish, English and Portuguese from one source",
          body: " — articles, success stories and solution pages, localized and team-run.",
          placeholder: "Multilingual — drop screenshot",
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
    image: "/assets/project-seilas.webp",
    imageAlt: "Seilas Ship Supplies — B2B marine supplier",
    kind: "compact",
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
