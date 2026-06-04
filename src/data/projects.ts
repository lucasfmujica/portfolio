/**
 * Project + case-study data.
 *
 * Single source of truth for the home "Selected work" stack and the
 * `/work/[slug]` case-study template. Adding or reordering work is a data
 * edit here — no component changes.
 *
 * Rich copy (challenge body, build lead, results statement, quotes) uses the
 * `*asterisk*` convention to mark the one ember-highlighted phrase per block;
 * the <RichText> component renders those spans. Short heading highlights use
 * an explicit `{ pre, ember, post }` split.
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
  /** Pull quote. */
  quote: CaseStudyQuote;
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
    year: "2024",
    tags: ["Webflow", "GSAP", "E-commerce"],
    blurb: {
      pre: "Custom apparel store built to ",
      ember: "convert",
      post: " — Webflow + GSAP, scroll-tied product reveals.",
    },
    imageAlt: "True North Jerseys — custom apparel store",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2024",
      liveUrl: "https://truenorthjerseys.com",
      liveLabel: "truenorthjerseys.com",
      outcome: {
        pre: "A custom-kit brand that lives on detail. The store had to ",
        ember: "sell it.",
      },
      tags: ["Webflow", "GSAP", "E-commerce", "CMS"],
      heroBadge: "truenorthjerseys.com · shop",
      challengeHeading: "A premium product on a checkout that felt like everyone else's.",
      challengeBody:
        "True North sells made-to-order jerseys where the craft is the whole pitch — stitching, fabric, the fit. But the old store flattened all of that into a stock template, and the *configurator buried the good part*. People bounced before they ever saw what made a kit theirs. The brief: make the product feel as considered online as it does in hand, without slowing the path to buy.",
      challengeVisualCaption: "Before · stock template",
      specs: [
        { key: "role", value: "Design & front-end build" },
        { key: "stack", value: "Webflow · GSAP · CMS" },
        { key: "integration", value: "Shopify checkout" },
        { key: "timeline", value: "5 weeks, end to end" },
      ],
      buildHeading: "A store that shows the craft before it asks for the sale.",
      buildLead:
        "I rebuilt the storefront in Webflow with a CMS-driven catalog and GSAP scroll-tied reveals that let each kit breathe. The configurator got *rebuilt around the product*, not the form — fabric, fit and finish front and centre, with checkout one tap away the moment intent lands.",
      shots: [
        {
          n: "01",
          label: "01 — Storefront",
          lead: "A scroll-tied product reveal that earns the premium price",
          body: " — each kit lands with motion that mirrors the craft, not a generic grid.",
          placeholder: "Storefront — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Configurator",
          lead: "A kit builder rebuilt around the product",
          body: " — fabric, fit and finish up front, with the catalog driven entirely by the CMS.",
          placeholder: "Configurator — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Checkout",
          lead: "A Shopify checkout wired in without leaving the brand",
          body: " — fast, familiar, and one tap from any product the moment intent lands.",
          placeholder: "Checkout — drop screenshot",
        },
      ],
      resultsStatement: "The store finally feels like the product — and it converts like it.",
      resultsSub:
        "Launched on time, handed off clean. The team adds new kits from the CMS, and the numbers moved where they needed to.",
      metrics: [
        { value: "+52", unit: "%", label: "conversion rate vs. the old store" },
        { value: "1.1", unit: "s", label: "median load — down from 4.0s" },
        { value: "98", label: "Lighthouse performance score" },
      ],
      quote: {
        quote:
          "Lucas made our jerseys look online the way they feel in person. Sales are up, the site is fast, and *we run it ourselves* now.",
        name: "Marcus Hale",
        role: "Founder · True North Jerseys",
      },
    },
  },
  {
    slug: "bike",
    index: "02",
    name: "BIKE",
    category: "Web app",
    year: "2024",
    tags: ["Next.js", "TypeScript", "HubSpot"],
    blurb: {
      pre: "Next.js, TypeScript & HubSpot with ",
      ember: "real-time",
      post: " data visualization for an English school.",
    },
    image: "/assets/project-bike.png",
    imageAlt: "BIKE — bike.uy homepage",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2024",
      liveUrl: "https://bike.uy",
      liveLabel: "bike.uy",
      outcome: {
        pre: "An English school that teaches by talking. The site had to do the ",
        ember: "same.",
      },
      tags: ["Next.js", "TypeScript", "HubSpot", "GSAP", "Web app"],
      heroImage: "/assets/project-bike.png",
      heroImageAlt: "BIKE — bike.uy homepage on a laptop",
      heroBadge: "bike.uy · home",
      challengeHeading: "A method built on conversation, trapped in a template.",
      challengeBody:
        "BIKE teaches English by getting people talking from day one — no grammar drills, no passive lectures. Their old site did the opposite: a slow, generic template that buried the method and *leaked trial signups*. They needed a site that felt as alive as a class — quick to move through, easy for the team to run, and wired into the tools the business already uses.",
      challengeVisualCaption: "Before · legacy template",
      specs: [
        { key: "role", value: "Design & front-end build" },
        { key: "stack", value: "Next.js · TypeScript · GSAP" },
        { key: "integration", value: "HubSpot CRM" },
        { key: "timeline", value: "6 weeks, end to end" },
      ],
      buildHeading: "A site that moves the way a conversation does.",
      buildLead:
        "I rebuilt BIKE on Next.js and TypeScript, wired straight into HubSpot so every lead, level test, and course enquiry lands where the team already works. GSAP carries the motion — reveals that pace the story, a *real-time level-test flow*, and a homepage that earns attention without ever getting in the way.",
      shots: [
        {
          n: "01",
          label: "01 — Homepage",
          lead: "A conversational hero with motion that paces the pitch",
          body: " — the method lands in the first three seconds, not the third scroll.",
          placeholder: "Homepage — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Level test",
          lead: "A real-time flow that scores English level",
          body: " and routes the lead straight into HubSpot — no spreadsheets, no manual follow-up.",
          placeholder: "Level test — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Courses",
          lead: "A CMS-driven catalog the team updates without touching code",
          body: " — new courses ship in minutes, not tickets.",
          placeholder: "Courses — drop screenshot",
        },
      ],
      resultsStatement:
        "The site finally teaches the way BIKE does — fast, warm, impossible to ignore.",
      resultsSub:
        "Launched on time, handed off clean. The team runs it themselves, and the numbers moved where they needed to.",
      metrics: [
        { value: "0.7", unit: "s", label: "median load — down from 3.1s" },
        { value: "+38", unit: "%", label: "trial signups in the first quarter" },
        { value: "100", label: "Lighthouse performance score" },
      ],
      quote: {
        quote:
          "Lucas turned our method into a website. It's fast, it's unmistakably us, and it *finally converts* — and the whole team can run it without breaking anything.",
        name: "Paula Méndez",
        role: "Director · BIKE Escuela de Inglés",
      },
    },
  },
  {
    slug: "k2btools",
    index: "03",
    name: "K2BTools",
    category: "Marketing site",
    year: "2023",
    tags: ["Webflow", "Client-First", "GSAP"],
    blurb: {
      pre: "Webflow, Client-First & GSAP — scroll animations with serious ",
      ember: "performance",
      post: " tuning.",
    },
    image: "/assets/project-k2btools.webp",
    imageAlt: "K2BTools — developer tooling marketing site",
    kind: "full",
    caseStudy: {
      platform: "Webflow",
      year: "2023",
      liveUrl: "https://k2btools.com",
      liveLabel: "k2btools.com",
      outcome: {
        pre: "A developer-tools company whose site had to feel as sharp as the ",
        ember: "product.",
      },
      tags: ["Webflow", "Client-First", "GSAP", "Marketing site"],
      heroBadge: "k2btools.com · home",
      challengeHeading: "Heavy animations, a heavier page — and a team that couldn't touch it.",
      challengeBody:
        "K2BTools wanted motion that signalled engineering quality, but the previous build chased it with stacked libraries and *a load time that undid the whole point*. Worse, every edit went through a developer. They needed the polish without the weight, and a structure the marketing team could actually run.",
      challengeVisualCaption: "Before · bloated build",
      specs: [
        { key: "role", value: "Design & front-end build" },
        { key: "stack", value: "Webflow · Client-First · GSAP" },
        { key: "integration", value: "Webflow CMS" },
        { key: "timeline", value: "4 weeks, end to end" },
      ],
      buildHeading: "Serious motion, on a page that stays light.",
      buildLead:
        "I rebuilt the marketing site in Webflow on Client-First, with GSAP doing the heavy lifting — *scroll animations tuned against a performance budget*, lazy-loaded and reduced-motion aware. The whole thing is componentised so the team ships pages without a developer in the loop.",
      shots: [
        {
          n: "01",
          label: "01 — Homepage",
          lead: "Scroll animations that signal engineering quality",
          body: " — every reveal is budgeted, lazy-loaded, and reduced-motion aware.",
          placeholder: "Homepage — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Features",
          lead: "A Client-First component system the team extends itself",
          body: " — new feature pages assemble from blocks, no developer required.",
          placeholder: "Features — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Docs hub",
          lead: "A CMS-driven resource hub built to scale",
          body: " — structured content that stays fast as it grows.",
          placeholder: "Docs — drop screenshot",
        },
      ],
      resultsStatement: "The motion finally reads as craft — and the page stays fast under it.",
      resultsSub:
        "Launched lean, handed off documented. The marketing team ships on their own, and performance held as the site grew.",
      metrics: [
        { value: "100", label: "Lighthouse performance score" },
        { value: "-71", unit: "%", label: "total page weight vs. the old build" },
        { value: "0", unit: "dev", label: "developer hours per page edit" },
      ],
      quote: {
        quote:
          "It looks high-end and still loads instantly — and *we ship pages in hours now*, not weeks. Client-First done right.",
        name: "Diego Herrera",
        role: "Head of Growth · K2BTools",
      },
    },
  },
  {
    slug: "nova-ventures",
    index: "04",
    name: "NOVA Ventures",
    category: "Automation",
    year: "2023",
    tags: ["n8n", "Zapier", "Airtable"],
    blurb: {
      pre: "n8n, Zapier & Airtable workflows — email sequences and lead scoring that ",
      ember: "run themselves",
      post: ".",
    },
    imageAlt: "NOVA Ventures — automation workflows",
    kind: "full",
    caseStudy: {
      platform: "Automation",
      year: "2023",
      outcome: {
        pre: "A venture studio drowning in manual follow-up. The ops had to ",
        ember: "run themselves.",
      },
      tags: ["n8n", "Zapier", "Airtable", "HubSpot", "Automation"],
      heroBadge: "nova · ops dashboard",
      challengeHeading: "Great deal flow, leaking out of a dozen disconnected tools.",
      challengeBody:
        "NOVA's team was copying leads between forms, sheets and inboxes by hand — and *good opportunities slipped through the gaps*. Follow-up depended on whoever remembered. They needed the busywork to disappear so the team could spend its time on the work only people can do.",
      challengeVisualCaption: "Before · manual handoffs",
      specs: [
        { key: "role", value: "Automation design & build" },
        { key: "stack", value: "n8n · Zapier · Airtable" },
        { key: "integration", value: "HubSpot CRM" },
        { key: "timeline", value: "3 weeks, end to end" },
      ],
      buildHeading: "Workflows that do the busywork so the team doesn't.",
      buildLead:
        "I mapped the whole funnel and rebuilt it as connected n8n and Zapier workflows on an Airtable backbone, synced to HubSpot. Leads score and route themselves, sequences fire on real signals, and *the team gets a clean dashboard* instead of a dozen tabs.",
      shots: [
        {
          n: "01",
          label: "01 — Lead capture",
          lead: "Every inbound lands in one place, scored automatically",
          body: " — no more copy-paste between forms, sheets and inboxes.",
          placeholder: "Lead capture — drop screenshot",
        },
        {
          n: "02",
          label: "02 — Sequences",
          lead: "Email sequences that fire on real behaviour",
          body: " — triggered by signals, routed by score, logged back to the CRM.",
          placeholder: "Sequences — drop screenshot",
        },
        {
          n: "03",
          label: "03 — Dashboard",
          lead: "A single Airtable view the whole team trusts",
          body: " — pipeline, status and next action, always current.",
          placeholder: "Dashboard — drop screenshot",
        },
      ],
      resultsStatement: "The pipeline runs itself now — and nothing slips through.",
      resultsSub:
        "Built quietly in the background, switched on without a hitch. The team got its time back and the follow-up never sleeps.",
      metrics: [
        { value: "12", unit: "hrs", label: "manual work saved per week" },
        { value: "+44", unit: "%", label: "lead response rate" },
        { value: "0", label: "leads lost to manual handoff" },
      ],
      quote: {
        quote:
          "Lucas mapped our chaos and turned it into something that just runs. *We got our week back* — and the follow-up never sleeps.",
        name: "Sofía Marín",
        role: "Operations Lead · NOVA Ventures",
      },
    },
  },
  {
    slug: "somnio-software",
    index: "05",
    name: "Somnio Software",
    category: "Partner site",
    year: "2023",
    tags: ["Webflow", "Lumos", "CMS"],
    blurb: {
      pre: "A product-studio site, ",
      ember: "component-first",
      post: " and easy for the team to extend.",
    },
    image: "/assets/project-somnio.webp",
    imageAlt: "Somnio Software — product studio site",
    kind: "compact",
  },
  {
    slug: "seilas-ship-supplies",
    index: "06",
    name: "Seilas Ship Supplies",
    category: "B2B catalog",
    year: "2022",
    tags: ["Webflow", "CMS", "B2B"],
    blurb: {
      pre: "A marine supply catalog built to ",
      ember: "scale",
      post: " across thousands of SKUs.",
    },
    image: "/assets/project-seilas.webp",
    imageAlt: "Seilas Ship Supplies — B2B marine catalog",
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
