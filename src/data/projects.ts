/**
 * Project + case-study data.
 *
 * Single source of truth for the home "Selected work" stack and the
 * `/work/[slug]` case-study template. Adding or reordering work is a data
 * edit here, no component changes.
 *
 * Rich copy (challenge body, build lead, results statement) uses the
 * `*asterisk*` convention to mark the one ember-highlighted phrase per block;
 * the <RichText> component renders those spans. Short heading highlights use
 * an explicit `{ pre, ember, post }` split.
 *
 * Honesty note: metrics are real, measured Lighthouse scores (desktop preset,
 * run against the live sites). Testimonials are only included where a real
 * client quote about the work exists; `quote` is optional and currently
 * omitted everywhere until real testimonials are collected.
 *
 * i18n note: to localize, these string fields become locale-keyed lookups;
 * the types and component contracts stay identical, so it's a content task.
 */

import type { Locale } from "@/i18n/routing";

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
  /** Caption key, e.g. "01 / Homepage". */
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
  /** Square avatar (normalized to 200×200); shown in the quote card when set. */
  avatar?: string;
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
  /** CandidLeap-style summary band, right under the hero. */
  /** 3 outcome bullets; each may carry one `*ember phrase*`. */
  highlights: string[];
  /** Engagement scope, e.g. "Strategy", "Development", "Webflow CMS". */
  services: string[];
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
  /** Aspect ratio for the build-gallery frames, e.g. "2 / 1". Tuned per case
   *  study to match its screenshots' proportions. Defaults to 16 / 9. */
  shotAspect?: string;
  shots: CaseStudyShot[];
  /** Results (ember-flooded) band. */
  resultsStatement: string;
  resultsSub: string;
  metrics: CaseStudyMetric[];
  /** Pull quote, optional; only rendered when a real client testimonial exists. */
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
      pre: "Custom hockey & baseball kits for a BC brand. A Webflow store, ",
      ember: "built different",
      post: ", with scroll-tied product reveals.",
    },
    image: "/assets/truenorth-hero.webp",
    imageAlt: "True North Jerseys: custom hockey & baseball apparel store",
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
      heroImageAlt: "True North Jerseys: 'built different' storefront",
      heroBadge: "truenorthjerseys.com · shop",
      highlights: [
        "A CMS-driven catalog the *family-run team runs and grows themselves*.",
        "Native Webflow Ecommerce + custom-quote flow, wired in on-brand.",
        "Built to scale: new product lines drop in as components, not rebuilds.",
      ],
      services: ["Strategy", "Web Design", "Development", "Webflow Ecommerce", "Webflow CMS"],
      challengeHeading: "A premium, made-to-order product on a generic shelf.",
      challengeBody:
        "True North makes custom hockey and baseball jerseys in BC: sublimated, reversible, embroidered, the craft is the whole pitch. But that detail is exactly what a stock template *flattens into a grid*. The brand needed a store that felt as considered as the product, kept the catalog easy to run, and put the path to a quote one tap away.",
      challengeVisualCaption: "truenorthjerseys.com · shop",
      specs: [
        { key: "role", value: "Front-end build, end to end" },
        { key: "stack", value: "Webflow · GSAP · CMS" },
        { key: "integration", value: "Webflow Ecommerce" },
      ],
      buildHeading: "A store that shows the craft before it asks for the sale.",
      buildLead:
        "I built the storefront end to end in Webflow on native Webflow Ecommerce, with a CMS-driven catalog and *GSAP scroll-tied reveals that let each kit breathe*. Product lines (hockey, baseball, team apparel) are structured so the family-run team adds and edits everything itself, with the cart and quote flow wired in without leaving the brand.",
      shots: [
        {
          n: "01",
          label: "01 / Storefront",
          lead: "A bold “built different” brand, front and center",
          body: ". Action photography and scroll-tied reveals that mirror the craft, not a generic grid.",
          placeholder: "Storefront: drop screenshot",
          image: "/assets/truenorth-shot1.webp",
        },
        {
          n: "02",
          label: "02 / Product lines",
          lead: "Hockey, baseball and team apparel, CMS-driven",
          body: ". Sublimated, reversible and embroidered options the team manages without code.",
          placeholder: "Product line: drop screenshot",
          image: "/assets/truenorth-shot2.webp",
        },
        {
          n: "03",
          label: "03 / Order & quote",
          lead: "Webflow Ecommerce wired in, on-brand throughout",
          body: ". The order and quote path stays one tap away the moment intent lands.",
          placeholder: "Order: drop screenshot",
          image: "/assets/truenorth-shot3.webp",
        },
      ],
      resultsStatement: "The store finally feels like the product: considered, bold, and theirs to run.",
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
      pre: "Developer tooling for GeneXus. A trilingual Webflow site with ",
      ember: "performance-tuned",
      post: " Client-First motion.",
    },
    image: "/assets/k2btools-hero.webp",
    imageAlt: "K2BTools: GeneXus developer tooling site",
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
      heroImageAlt: "K2BTools: 'Impulsamos el mundo GeneXus' homepage",
      heroBadge: "k2btools.com · home",
      highlights: [
        "A Client-First component system the *marketing team ships pages with, solo*.",
        "Trilingual on Webflow Localization: es / en / pt from one CMS.",
        "Eight-plus products made legible without burying the buyer.",
      ],
      services: ["Strategy", "Development", "Client-First System", "Webflow Localization"],
      challengeHeading: "A whole product suite, three languages, one team to run it.",
      challengeBody:
        "K2BTools builds tooling that accelerates GeneXus development: eight-plus products, from web and mobile generators to auditing and AI. The site had to make that range *legible without burying the buyer*, ship in Spanish, English and Portuguese, and stay editable by the marketing team. Motion had to signal engineering quality without dragging the page down.",
      challengeVisualCaption: "k2btools.com · home",
      specs: [
        { key: "role", value: "Front-end build" },
        { key: "stack", value: "Webflow · Client-First · GSAP" },
        { key: "integration", value: "Webflow Localization · es / en / pt" },
      ],
      buildHeading: "A component system the team ships in three languages.",
      buildLead:
        "I built the marketing site in Webflow on Client-First, with GSAP doing the heavy lifting: *scroll animations that read as craft*, reduced-motion aware. The whole thing runs on Webflow Localization across three languages (Spanish, English, Portuguese), componentized and CMS-driven, so the team ships solution pages, articles and success stories in any locale without a developer in the loop.",
      shots: [
        {
          n: "01",
          label: "01 / The suite",
          lead: "Eight-plus tools, each its own clear page",
          body: ". A Client-First component system, tuned to stay light under GSAP motion.",
          placeholder: "Tools: drop screenshot",
          image: "/assets/k2btools-shot1.webp",
        },
        {
          n: "02",
          label: "02 / Plans",
          lead: "A clear path from tool to purchase",
          body: ". Pricing and plans laid out so the buyer never has to dig.",
          placeholder: "Plans: drop screenshot",
          image: "/assets/k2btools-shot2.webp",
        },
        {
          n: "03",
          label: "03 / Localization",
          lead: "Three languages on Webflow Localization",
          body: ". Spanish, English and Portuguese from one CMS, articles and success stories the team ships itself.",
          placeholder: "Localization: drop screenshot",
          image: "/assets/k2btools-shot3.webp",
        },
      ],
      resultsStatement: "Componentised and trilingual: the marketing team ships in any language, solo.",
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
      pre: "A Montevideo English school that teaches by talking. A Webflow build with a custom loader and a ",
      ember: "3D bike on the 404",
      post: ".",
    },
    image: "/assets/bike-hero.webp",
    imageAlt: "BIKE: bike.uy homepage",
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
      heroImageAlt: "BIKE: bike.uy homepage",
      heroBadge: "bike.uy · home",
      highlights: [
        "Courses, content and forms the *team runs themselves* from the CMS.",
        "A custom preloader and paced reveals that set the brand's tone.",
        "An interactive 3D-bike 404 that turns a dead end into part of the brand.",
      ],
      services: ["Development", "Web Build", "Motion", "Webflow CMS"],
      challengeHeading: "A method built on movement, flattened into a static page.",
      challengeBody:
        "BIKE teaches English the way you learn to ride a bike: by doing, from day one. The brand leans entirely on that metaphor (pedaling as progress), so a flat, conventional site would have *undercut the whole pitch*. It needed motion that felt playful and earned, a structure the team could keep editing, and the personality to carry levels from A1 to C2 without ever feeling like a textbook.",
      challengeVisualCaption: "bike.uy · home",
      specs: [
        { key: "role", value: "Front-end build (design: Clearframe Studio)" },
        { key: "stack", value: "Webflow · GSAP · Spline" },
        { key: "integration", value: "Webflow CMS · Finsweet" },
      ],
      buildHeading: "A site that moves the way a conversation does.",
      buildLead:
        "I built BIKE in Webflow with GSAP carrying the motion: a *custom preloader* that sets the tone before the first scroll, reveals that pace the story, and Finsweet-driven accordions and forms the team runs themselves. The 404 is its own small moment: an interactive Spline bicycle for anyone who pedals somewhere that doesn't exist yet.",
      shotAspect: "16 / 9",
      shots: [
        {
          n: "01",
          label: "01 / Loader",
          lead: "A custom preloader that sets the tone",
          body: ". The bike mark draws in before the first scroll, motion paced by GSAP.",
          placeholder: "Loader: drop screenshot",
          image: "/assets/bike-shot1.webp",
        },
        {
          n: "02",
          label: "02 / Courses",
          lead: "Roadmap, Talk and Career, structured A1 to C2",
          body: ". CMS-driven, so the team adds and edits courses without touching code.",
          placeholder: "Courses: drop screenshot",
          image: "/assets/bike-shot2.webp",
        },
        {
          n: "03",
          label: "03 / 404",
          lead: "An interactive 3D bicycle for the lost",
          body: ". A Spline scene that turns a dead end into a piece of the brand.",
          placeholder: "404 / 3D bike: drop screenshot",
          image: "/assets/bike-shot3.webp",
        },
      ],
      resultsStatement: "A site that feels like a class: fast, playful, unmistakably BIKE.",
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
      post: ". Vanilla JS, GSAP, and a before/after slider I built from scratch.",
    },
    image: "/assets/homeorganizers-hero.webp",
    imageAlt: "Home Organizers Long Island: custom-coded site",
    kind: "full",
    caseStudy: {
      platform: "Custom code",
      year: "2026",
      liveUrl: "https://homeorganizersli.com",
      liveLabel: "homeorganizersli.com",
      outcome: {
        pre: "A calm, premium service that deserved a site to match, so I built it ",
        ember: "from scratch.",
      },
      tags: ["HTML", "CSS", "Vanilla JS", "GSAP", "Netlify"],
      heroImage: "/assets/homeorganizers-hero.webp",
      heroImageAlt: "Home Organizers Long Island: 'a home that finally feels calm'",
      heroBadge: "homeorganizersli.com · home",
      highlights: [
        "Taken end to end: *design, copy, SEO and hand-written code*.",
        "A before/after reveal slider built from scratch in vanilla JS.",
        "Deliberate SEO, down to the JSON-LD LocalBusiness schema.",
      ],
      services: ["Strategy", "Design", "Copywriting", "Development", "SEO"],
      challengeHeading: "A warm, hands-on service, with no site to show for it.",
      challengeBody:
        "Home Organizers help busy Long Island homeowners reclaim their space, and the whole promise is *calm without judgment*. That feeling is hard to fake with a template. I took the project end to end (design, copy, SEO and code) and chose to hand-build it: no Webflow, no framework, no build step, so every detail of the feel and the performance was mine to tune.",
      challengeVisualCaption: "homeorganizersli.com · home",
      specs: [
        { key: "role", value: "Design, build, copy & SEO" },
        { key: "stack", value: "HTML · CSS · vanilla JS · GSAP" },
        { key: "integration", value: "Netlify Forms · JSON-LD" },
      ],
      buildHeading: "A bespoke static build, tuned by hand.",
      buildLead:
        "Hand-written HTML, CSS custom properties and vanilla JavaScript: no framework, self-hosted Sora and Overpass for speed, and GSAP + ScrollTrigger for the motion. The centerpiece is a *before/after slider I wrote from scratch*: a carousel with a draggable reveal handle on mobile. Contact runs on Netlify Forms, and the SEO is deliberate down to the JSON-LD LocalBusiness schema.",
      shotAspect: "2 / 1",
      shots: [
        {
          n: "01",
          label: "01 / Services",
          lead: "Three ways to lighten the load, before/after up front",
          body: ". Warm neutral palette, Sora + Overpass, GSAP reveals that breathe.",
          placeholder: "Services: drop screenshot",
          image: "/assets/homeorganizers-shot1.webp",
        },
        {
          n: "02",
          label: "02 / Before / After",
          lead: "A reveal slider built by hand in vanilla JS",
          body: ". Drag to compare on mobile, dot-navigated carousel on desktop. No library.",
          placeholder: "Before/After slider: drop screenshot",
          image: "/assets/homeorganizers-shot2.webp",
        },
        {
          n: "03",
          label: "03 / The result",
          lead: "Calm, organized spaces, the outcome the brand promises",
          body: ". Real project photography, framed by a system built for performance and SEO.",
          placeholder: "Result: drop screenshot",
          image: "/assets/homeorganizers-shot3.webp",
        },
      ],
      resultsStatement: "Proof I can take a brand from blank page to live: design, copy, code and SEO.",
      resultsSub:
        "No framework, no page builder: a fast static site I own end to end. The numbers below are measured on the live build.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "100", label: "Lighthouse best practices" },
        { value: "94", label: "Lighthouse accessibility" },
      ],
      quote: {
        quote:
          "Our site has a complex custom-code setup, and Lucas understood it *without needing much guidance*. New pages, detailed layouts, advanced flows, always clear and professional. Highly recommended.",
        name: "Carolina Freese",
        role: "Founder, Home Organizers Long Island",
        avatar: "/assets/avatars/carolinafreese.webp",
      },
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
      pre: "A Montevideo cybersecurity firm. A Webflow build with ",
      ember: "custom illustration",
      post: " for its managed-security platform.",
    },
    image: "/assets/nextfense-hero.webp",
    imageAlt: "Nextfense: cybersecurity site",
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
      heroImageAlt: "Nextfense: 'Construye un futuro digital más seguro' hero",
      heroBadge: "nextfense.com · home",
      highlights: [
        "A bilingual (es / en) build the *team extends as the offering grows*.",
        "Six-pillar approach anchored by custom Illustrator artwork.",
        "An abstract security service made concrete and credible.",
      ],
      services: ["Strategy", "Development", "Custom Illustration", "Webflow Localization"],
      challengeHeading: "Selling trust in a category built on it.",
      challengeBody:
        "Nextfense centralises managed cybersecurity (pentesting, vulnerability scanning, virtual CISO) into one platform, Nextfense Core. The site had to make a complex, abstract service feel *concrete and credible* to a corporate buyer, hold up in two languages, and stay easy for the team to extend as the offering grows.",
      challengeVisualCaption: "nextfense.com · home",
      specs: [
        { key: "role", value: "Front-end build & custom illustration" },
        { key: "stack", value: "Webflow · GSAP · Illustrator" },
        { key: "integration", value: "Webflow Localization · es / en" },
      ],
      buildHeading: "A platform site that earns the word “secure”.",
      buildLead:
        "I built Nextfense in Webflow with a *six-pillar approach laid out around custom Illustrator artwork*: abstract security iconography that gives an intangible service something to look at. The whole thing is bilingual (es/en) on Webflow Localization, CMS-driven for case studies and blog, with GSAP carrying restrained, on-brand motion.",
      shots: [
        {
          n: "01",
          label: "01 / Nextfense Core",
          lead: "The managed-security platform, one clear diagram",
          body: ". A complex service made concrete with custom graphics and restrained motion.",
          placeholder: "Core platform: drop screenshot",
          image: "/assets/nextfense-shot1.webp",
        },
        {
          n: "02",
          label: "02 / Approach",
          lead: "Six pillars, anchored by custom Illustrator artwork",
          body: ". Bespoke iconography that gives an abstract service something to read.",
          placeholder: "Approach / illustration: drop screenshot",
          image: "/assets/nextfense-shot2.webp",
        },
        {
          n: "03",
          label: "03 / Services",
          lead: "Offensive security & pentesting, detailed and bilingual",
          body: ". Es/en on Webflow Localization, so the team ships new work without a developer.",
          placeholder: "Services: drop screenshot",
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
      pre: "A century-old Uruguayan ship chandler. A clean Webflow site spanning ",
      ember: "500+ clients",
      post: " across 30+ countries.",
    },
    image: "/assets/seilas-hero.webp",
    imageAlt: "Seilas Ship Supplies: 'Since 1921, your trusted ship supplier in Uruguay'",
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
      heroImageAlt: "Seilas Ship Supplies: 'Since 1921, your trusted ship supplier in Uruguay'",
      heroBadge: "nadetir.com · home",
      highlights: [
        "A century of trust, finally *legible online* for B2B buyers.",
        "A world map of 500+ clients across 30+ countries, front and center.",
        "CMS-driven where it counts, so the team keeps it current.",
      ],
      services: ["Strategy", "Web Design", "Development", "Webflow CMS"],
      challengeHeading: "A hundred years of trust, and nothing online to show it.",
      challengeBody:
        "Seilas Ship Supplies (Nadetir S.A.) has provisioned vessels at every port in Uruguay since 1921: deck and safety gear, engine-room supplies, provisions, bonded stores. A century of reputation, but a web presence that *didn't carry the weight*. The brief: a credible, international-feeling B2B site that says “trusted since 1921” without saying a word.",
      challengeVisualCaption: "nadetir.com · home",
      specs: [
        { key: "role", value: "Front-end build" },
        { key: "stack", value: "Webflow · CMS" },
        { key: "integration", value: "Webflow CMS" },
      ],
      buildHeading: "A clean, global home for a century-old supplier.",
      buildLead:
        "I built the site in Webflow: restrained, confident, and built to scale. A *world map of 500+ clients across 30+ countries* anchors the story, the full service range is laid out for maritime buyers, and the brand's 1921 heritage runs through the whole thing. CMS-driven where it counts, so the team keeps it current.",
      shots: [
        {
          n: "01",
          label: "01 / Home",
          lead: "“Keeping vessels moving, worldwide”",
          body: ". A world map of 500+ clients across 30+ countries, front and center.",
          image: "/assets/seilas-card.webp",
          placeholder: "Home / map: drop screenshot",
        },
        {
          n: "02",
          label: "02 / Heritage",
          lead: "A hundred years of history, told with intent",
          body: ". The 1921 founding story, framed for a B2B audience.",
          image: "/assets/seilas-history.webp",
          placeholder: "About / history: drop screenshot",
        },
      ],
      resultsStatement: "A site that finally looks the part: a century of trust, online.",
      resultsSub:
        "Shipped on Webflow and handed off clean. The numbers below are measured on the live site.",
      metrics: [
        { value: "100", label: "Lighthouse SEO" },
        { value: "100", label: "Lighthouse best practices" },
        { value: "90", label: "Lighthouse accessibility" },
      ],
      quote: {
        quote:
          "Working with Lucas has been an absolute pleasure. His Webflow expertise is *unparalleled*. Proactive with solutions, transparent, and a joy to work with. Highly recommended.",
        name: "Eugenia Gallo",
        role: "Business Development Manager, Seilas Ship Supplies",
        avatar: "/assets/avatars/eugenia.webp",
      },
    },
  },
];

/**
 * Projects with a dedicated case-study page, in display order. Locale-independent
 * (slugs/structure are shared) — use for `generateStaticParams` and the sitemap.
 */
export const caseStudies = projects.filter(
  (p): p is Project & { caseStudy: CaseStudy } => p.kind === "full" && !!p.caseStudy,
);

/* ------------------------------------------------------------------ *
 * Localization
 *
 * `projects` (above) is the canonical English source AND the single source for
 * non-text structure (slugs, indexes, images, Lighthouse numbers, live URLs).
 * Translations live in a per-locale *copy overlay* that carries only text and
 * is deep-merged over the English project at read time, so numbers/images/slugs
 * never drift. Consumers call the locale-aware accessors below.
 * ------------------------------------------------------------------ */

type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

/** Translatable copy for one project. Omit any field to keep the English text. */
export type ProjectCopy = DeepPartial<Project>;

/**
 * Element-wise deep merge: objects merge recursively, arrays merge by index
 * (so a `shots`/`metrics` overlay can override only the text subfields of each
 * entry and inherit `image`/`value` from English), primitives are replaced.
 */
function mergeCopy<T>(base: T, overlay: DeepPartial<T> | undefined): T {
  if (overlay === undefined) return base;
  if (Array.isArray(base)) {
    const ov = overlay as unknown[];
    return base.map((item, i) => mergeCopy(item, ov[i] as never)) as unknown as T;
  }
  if (base && typeof base === "object") {
    const out = { ...(base as Record<string, unknown>) };
    for (const k of Object.keys(overlay as object)) {
      out[k] = mergeCopy(
        (base as Record<string, unknown>)[k],
        (overlay as Record<string, unknown>)[k] as never,
      );
    }
    return out as T;
  }
  return overlay as unknown as T;
}

/**
 * Spanish (rioplatense, "vos") copy overlay, keyed by slug. Only translatable
 * text — numbers, images, slugs and live URLs stay in `projects`. Client pull
 * quotes are intentionally omitted so they keep the speaker's original wording.
 */
export const projectsCopyEs: Record<string, ProjectCopy> = {
  "true-north-jerseys": {
    category: "Proyecto e-commerce",
    blurb: {
      pre: "Kits de hockey y béisbol a medida para una marca de BC. Una tienda Webflow, ",
      ember: "construida distinta",
      post: ", con reveals de producto atados al scroll.",
    },
    imageAlt: "True North Jerseys: tienda de indumentaria de hockey y béisbol a medida",
    caseStudy: {
      outcome: {
        pre: "Una marca de kits a medida que vive del detalle. La tienda tenía que ",
        ember: "mostrarlo.",
      },
      heroImageAlt: "True North Jerseys: tienda 'built different'",
      heroBadge: "truenorthjerseys.com · tienda",
      highlights: [
        "Un catálogo manejado por CMS que el *equipo familiar maneja y hace crecer solo*.",
        "Webflow Ecommerce nativo + flujo de cotización a medida, integrado con la marca.",
        "Construido para escalar: las nuevas líneas entran como componentes, sin rehacer nada.",
      ],
      services: ["Estrategia", "Diseño web", "Desarrollo", "Webflow Ecommerce", "Webflow CMS"],
      challengeHeading: "Un producto premium, hecho a pedido, en una góndola genérica.",
      challengeBody:
        "True North hace camisetas de hockey y béisbol a medida en BC: sublimadas, reversibles, bordadas; el oficio es todo el pitch. Pero ese detalle es justo lo que una plantilla genérica *aplana en una grilla*. La marca necesitaba una tienda que se sintiera tan pensada como el producto, que mantuviera el catálogo fácil de manejar, y que dejara el camino a la cotización a un toque de distancia.",
      challengeVisualCaption: "truenorthjerseys.com · tienda",
      specs: [
        { value: "Build front-end, de punta a punta" },
        { value: "Webflow · GSAP · CMS" },
        { value: "Webflow Ecommerce" },
      ],
      buildHeading: "Una tienda que muestra el oficio antes de pedir la venta.",
      buildLead:
        "Construí la tienda de punta a punta en Webflow sobre Webflow Ecommerce nativo, con un catálogo manejado por CMS y *reveals atados al scroll con GSAP que dejan respirar a cada kit*. Las líneas de producto (hockey, béisbol, indumentaria de equipo) están estructuradas para que el equipo familiar agregue y edite todo solo, con el carrito y el flujo de cotización integrados sin salir de la marca.",
      shots: [
        {
          label: "01 / Tienda",
          lead: "Una marca audaz, “built different”, al frente",
          body: ". Fotografía de acción y reveals atados al scroll que reflejan el oficio, no una grilla genérica.",
          placeholder: "Tienda: poné screenshot",
        },
        {
          label: "02 / Líneas de producto",
          lead: "Hockey, béisbol e indumentaria de equipo, manejado por CMS",
          body: ". Opciones sublimadas, reversibles y bordadas que el equipo maneja sin código.",
          placeholder: "Línea de producto: poné screenshot",
        },
        {
          label: "03 / Pedido & cotización",
          lead: "Webflow Ecommerce integrado, con la marca de punta a punta",
          body: ". El camino al pedido y la cotización queda a un toque en cuanto aparece la intención.",
          placeholder: "Pedido: poné screenshot",
        },
      ],
      resultsStatement: "La tienda por fin se siente como el producto: pensada, audaz y suya.",
      resultsSub:
        "Entregada en Webflow y traspasada prolija: el equipo agrega kits desde el CMS. Los números de abajo están medidos en la tienda en vivo.",
      metrics: [
        { label: "Lighthouse SEO" },
        { label: "Lighthouse accesibilidad" },
        { label: "Lighthouse rendimiento" },
      ],
    },
  },
  k2btools: {
    category: "Sitio de marketing",
    blurb: {
      pre: "Herramientas de desarrollo para GeneXus. Un sitio Webflow trilingüe con movimiento Client-First ",
      ember: "ajustado para rendimiento",
      post: ".",
    },
    imageAlt: "K2BTools: sitio de herramientas de desarrollo para GeneXus",
    caseStudy: {
      outcome: {
        pre: "Una empresa de developer tools cuyo sitio tenía que sentirse tan pulido como el ",
        ember: "producto.",
      },
      heroImageAlt: "K2BTools: home 'Impulsamos el mundo GeneXus'",
      heroBadge: "k2btools.com · inicio",
      highlights: [
        "Un sistema de componentes Client-First con el que el *equipo de marketing publica páginas solo*.",
        "Trilingüe sobre Webflow Localization: es / en / pt desde un solo CMS.",
        "Más de ocho productos que se entienden sin enterrar al comprador.",
      ],
      services: ["Estrategia", "Desarrollo", "Sistema Client-First", "Webflow Localization"],
      challengeHeading: "Toda una suite de productos, tres idiomas, un equipo para manejarlo.",
      challengeBody:
        "K2BTools construye herramientas que aceleran el desarrollo en GeneXus: más de ocho productos, desde generadores web y mobile hasta auditoría e IA. El sitio tenía que hacer que ese abanico se *entendiera sin enterrar al comprador*, salir en español, inglés y portugués, y quedar editable por el equipo de marketing. El movimiento tenía que señalar calidad de ingeniería sin frenar la página.",
      challengeVisualCaption: "k2btools.com · inicio",
      specs: [
        { value: "Build front-end" },
        { value: "Webflow · Client-First · GSAP" },
        { value: "Webflow Localization · es / en / pt" },
      ],
      buildHeading: "Un sistema de componentes que el equipo publica en tres idiomas.",
      buildLead:
        "Construí el sitio de marketing en Webflow sobre Client-First, con GSAP haciendo el laburo pesado: *animaciones de scroll que se leen como oficio*, conscientes de reduced-motion. Todo corre sobre Webflow Localization en tres idiomas (español, inglés, portugués), componentizado y manejado por CMS, así el equipo publica páginas de solución, artículos y casos de éxito en cualquier idioma sin un desarrollador en el medio.",
      shots: [
        {
          label: "01 / La suite",
          lead: "Más de ocho herramientas, cada una con su página clara",
          body: ". Un sistema de componentes Client-First, ajustado para mantenerse liviano bajo el movimiento de GSAP.",
          placeholder: "Herramientas: poné screenshot",
        },
        {
          label: "02 / Planes",
          lead: "Un camino claro de la herramienta a la compra",
          body: ". Precios y planes presentados para que el comprador nunca tenga que escarbar.",
          placeholder: "Planes: poné screenshot",
        },
        {
          label: "03 / Localización",
          lead: "Tres idiomas sobre Webflow Localization",
          body: ". Español, inglés y portugués desde un solo CMS; artículos y casos de éxito que el equipo publica solo.",
          placeholder: "Localización: poné screenshot",
        },
      ],
      resultsStatement: "Componentizado y trilingüe: el equipo de marketing publica en cualquier idioma, solo.",
      resultsSub:
        "Lanzado sobre Client-First y traspasado documentado: el equipo de marketing publica en cualquier idioma. Medido en el sitio en vivo, el build puntúa prolijo.",
      metrics: [
        { label: "Lighthouse SEO" },
        { label: "Lighthouse buenas prácticas" },
        { label: "Lighthouse accesibilidad" },
      ],
    },
  },
  bike: {
    category: "Proyecto Webflow",
    blurb: {
      pre: "Una escuela de inglés de Montevideo que enseña hablando. Un build Webflow con un loader a medida y una ",
      ember: "bici 3D en el 404",
      post: ".",
    },
    imageAlt: "BIKE: home de bike.uy",
    caseStudy: {
      outcome: {
        pre: "Una escuela de inglés que enseña hablando. El sitio tenía que sentirse igual de ",
        ember: "vivo.",
      },
      heroImageAlt: "BIKE: home de bike.uy",
      heroBadge: "bike.uy · inicio",
      highlights: [
        "Cursos, contenido y formularios que el *equipo maneja solo* desde el CMS.",
        "Un preloader a medida y reveals bien acompasados que marcan el tono de la marca.",
        "Un 404 interactivo con una bici 3D que convierte un callejón sin salida en parte de la marca.",
      ],
      services: ["Desarrollo", "Construcción web", "Movimiento", "Webflow CMS"],
      challengeHeading: "Un método construido sobre el movimiento, aplanado en una página estática.",
      challengeBody:
        "BIKE enseña inglés como se aprende a andar en bici: haciéndolo, desde el día uno. La marca se apoya entera en esa metáfora (pedalear como progreso), así que un sitio plano y convencional habría *tirado abajo todo el pitch*. Necesitaba un movimiento que se sintiera lúdico y que se ganara su lugar, una estructura que el equipo pudiera seguir editando, y la personalidad para llevar los niveles de A1 a C2 sin sentirse nunca como un libro de texto.",
      challengeVisualCaption: "bike.uy · inicio",
      specs: [
        { value: "Build front-end (diseño: Clearframe Studio)" },
        { value: "Webflow · GSAP · Spline" },
        { value: "Webflow CMS · Finsweet" },
      ],
      buildHeading: "Un sitio que se mueve como lo hace una conversación.",
      buildLead:
        "Construí BIKE en Webflow con GSAP llevando el movimiento: un *preloader a medida* que marca el tono antes del primer scroll, reveals que le dan ritmo a la historia, y acordeones y formularios con Finsweet que el equipo maneja solo. El 404 tiene su propio momentito: una bicicleta interactiva en Spline para cualquiera que pedalee hacia un lugar que todavía no existe.",
      shots: [
        {
          label: "01 / Loader",
          lead: "Un preloader a medida que marca el tono",
          body: ". La marca de la bici se dibuja antes del primer scroll, con el movimiento pausado por GSAP.",
          placeholder: "Loader: poné screenshot",
        },
        {
          label: "02 / Cursos",
          lead: "Roadmap, Talk y Career, estructurados de A1 a C2",
          body: ". Manejado por CMS, así el equipo agrega y edita cursos sin tocar código.",
          placeholder: "Cursos: poné screenshot",
        },
        {
          label: "03 / 404",
          lead: "Una bicicleta 3D interactiva para los perdidos",
          body: ". Una escena en Spline que convierte un callejón sin salida en una pieza de la marca.",
          placeholder: "404 / bici 3D: poné screenshot",
        },
      ],
      resultsStatement: "Un sitio que se siente como una clase: rápido, lúdico, inconfundiblemente BIKE.",
      resultsSub:
        "Entregado en Webflow y traspasado prolijo: el equipo maneja cursos, contenido y formularios solo. Medido en el sitio en vivo, el build aguanta donde importa.",
      metrics: [
        { label: "Lighthouse SEO" },
        { label: "Lighthouse accesibilidad" },
        { label: "Lighthouse rendimiento" },
      ],
    },
  },
  "home-organizers": {
    category: "Sitio a medida",
    tags: ["Código a medida", "Vanilla JS", "GSAP"],
    blurb: {
      pre: "Un estudio de organización de Long Island, ",
      ember: "codeado a mano de punta a punta",
      post: ". Vanilla JS, GSAP y un slider de antes/después que construí desde cero.",
    },
    imageAlt: "Home Organizers Long Island: sitio a medida",
    caseStudy: {
      outcome: {
        pre: "Un servicio premium y tranquilo que merecía un sitio a la altura, así que lo construí ",
        ember: "desde cero.",
      },
      heroImageAlt: "Home Organizers Long Island: 'un hogar que por fin se siente en calma'",
      heroBadge: "homeorganizersli.com · inicio",
      highlights: [
        "Hecho de punta a punta: *diseño, copy, SEO y código escrito a mano*.",
        "Un slider de revelado antes/después construido desde cero en vanilla JS.",
        "SEO deliberado, hasta el schema JSON-LD LocalBusiness.",
      ],
      services: ["Estrategia", "Diseño", "Copywriting", "Desarrollo", "SEO"],
      challengeHeading: "Un servicio cálido y artesanal, sin un sitio que lo mostrara.",
      challengeBody:
        "Home Organizers ayuda a dueños de casa ocupados de Long Island a recuperar su espacio, y toda la promesa es *calma sin juzgar*. Esa sensación es difícil de fingir con una plantilla. Agarré el proyecto entero (diseño, copy, SEO y código) y elegí construirlo a mano: sin Webflow, sin framework, sin build step, así cada detalle de la sensación y el rendimiento quedaba en mis manos para ajustar.",
      challengeVisualCaption: "homeorganizersli.com · inicio",
      specs: [
        { value: "Diseño, build, copy & SEO" },
        { value: "HTML · CSS · vanilla JS · GSAP" },
        { value: "Netlify Forms · JSON-LD" },
      ],
      buildHeading: "Un build estático a medida, ajustado a mano.",
      buildLead:
        "HTML escrito a mano, custom properties de CSS y JavaScript vanilla: sin framework, con Sora y Overpass self-hosted para la velocidad, y GSAP + ScrollTrigger para el movimiento. La pieza central es un *slider de antes/después que escribí desde cero*: un carrusel con un handle de revelado arrastrable en mobile. El contacto corre sobre Netlify Forms, y el SEO es deliberado hasta el schema JSON-LD LocalBusiness.",
      shots: [
        {
          label: "01 / Servicios",
          lead: "Tres formas de aligerar la carga, antes/después al frente",
          body: ". Paleta neutra y cálida, Sora + Overpass, reveals con GSAP que respiran.",
          placeholder: "Servicios: poné screenshot",
        },
        {
          label: "02 / Antes / Después",
          lead: "Un slider de revelado hecho a mano en vanilla JS",
          body: ". Arrastrá para comparar en mobile, carrusel navegado por puntos en desktop. Sin librería.",
          placeholder: "Slider antes/después: poné screenshot",
        },
        {
          label: "03 / El resultado",
          lead: "Espacios en calma y organizados, el resultado que promete la marca",
          body: ". Fotografía real de proyectos, enmarcada por un sistema construido para rendimiento y SEO.",
          placeholder: "Resultado: poné screenshot",
        },
      ],
      resultsStatement: "La prueba de que puedo llevar una marca de la página en blanco a producción: diseño, copy, código y SEO.",
      resultsSub:
        "Sin framework, sin page builder: un sitio estático rápido que tengo de punta a punta. Los números de abajo están medidos en el build en vivo.",
      metrics: [
        { label: "Lighthouse SEO" },
        { label: "Lighthouse buenas prácticas" },
        { label: "Lighthouse accesibilidad" },
      ],
    },
  },
  nextfense: {
    category: "Proyecto Webflow",
    tags: ["Webflow", "GSAP", "Ilustración"],
    blurb: {
      pre: "Una firma de ciberseguridad de Montevideo. Un build Webflow con ",
      ember: "ilustración a medida",
      post: " para su plataforma de seguridad gestionada.",
    },
    imageAlt: "Nextfense: sitio de ciberseguridad",
    caseStudy: {
      outcome: {
        pre: "Una plataforma de seguridad es tan confiable como se ve. Esta tenía que leerse como ",
        ember: "seria.",
      },
      heroImageAlt: "Nextfense: hero 'Construye un futuro digital más seguro'",
      heroBadge: "nextfense.com · inicio",
      highlights: [
        "Un build bilingüe (es / en) que el *equipo extiende a medida que crece la oferta*.",
        "Enfoque de seis pilares anclado por ilustración a medida hecha en Illustrator.",
        "Un servicio de seguridad abstracto hecho concreto y creíble.",
      ],
      services: ["Estrategia", "Desarrollo", "Ilustración a medida", "Webflow Localization"],
      challengeHeading: "Vender confianza en una categoría construida sobre ella.",
      challengeBody:
        "Nextfense centraliza la ciberseguridad gestionada (pentesting, escaneo de vulnerabilidades, CISO virtual) en una sola plataforma, Nextfense Core. El sitio tenía que hacer que un servicio complejo y abstracto se sintiera *concreto y creíble* para un comprador corporativo, aguantar en dos idiomas, y quedar fácil de extender por el equipo a medida que crece la oferta.",
      challengeVisualCaption: "nextfense.com · inicio",
      specs: [
        { value: "Build front-end & ilustración a medida" },
        { value: "Webflow · GSAP · Illustrator" },
        { value: "Webflow Localization · es / en" },
      ],
      buildHeading: "Un sitio de plataforma que se gana la palabra “seguro”.",
      buildLead:
        "Construí Nextfense en Webflow con un *enfoque de seis pilares armado alrededor de ilustración a medida en Illustrator*: iconografía de seguridad abstracta que le da a un servicio intangible algo para mirar. Todo es bilingüe (es/en) sobre Webflow Localization, manejado por CMS para casos y blog, con GSAP llevando un movimiento contenido y con la marca.",
      shots: [
        {
          label: "01 / Nextfense Core",
          lead: "La plataforma de seguridad gestionada, un diagrama claro",
          body: ". Un servicio complejo hecho concreto con gráficos a medida y movimiento contenido.",
          placeholder: "Plataforma Core: poné screenshot",
        },
        {
          label: "02 / Enfoque",
          lead: "Seis pilares, anclados por ilustración a medida en Illustrator",
          body: ". Iconografía a medida que le da a un servicio abstracto algo para leer.",
          placeholder: "Enfoque / ilustración: poné screenshot",
        },
        {
          label: "03 / Servicios",
          lead: "Seguridad ofensiva & pentesting, detallado y bilingüe",
          body: ". Es/en sobre Webflow Localization, así el equipo publica trabajo nuevo sin un desarrollador.",
          placeholder: "Servicios: poné screenshot",
        },
      ],
      resultsStatement: "Un sitio que se lee tan creíble como el servicio que vende.",
      resultsSub:
        "Bilingüe, manejado por CMS y traspasado prolijo. Medido en el sitio en vivo, el build puntúa donde se decide la confianza.",
      metrics: [
        { label: "Lighthouse SEO" },
        { label: "Lighthouse buenas prácticas" },
        { label: "Lighthouse accesibilidad" },
      ],
    },
  },
  "seilas-ship-supplies": {
    category: "Sitio B2B",
    blurb: {
      pre: "Un proveedor naval uruguayo centenario. Un sitio Webflow prolijo que abarca ",
      ember: "más de 500 clientes",
      post: " en más de 30 países.",
    },
    imageAlt: "Seilas Ship Supplies: 'Desde 1921, tu proveedor naval de confianza en Uruguay'",
    caseStudy: {
      outcome: {
        pre: "Un proveedor naval que abastece los puertos de Uruguay hace un siglo. El sitio tenía que estar a la altura de ese ",
        ember: "legado.",
      },
      heroImageAlt: "Seilas Ship Supplies: 'Desde 1921, tu proveedor naval de confianza en Uruguay'",
      heroBadge: "nadetir.com · inicio",
      highlights: [
        "Un siglo de confianza, por fin *legible online* para compradores B2B.",
        "Un mapa mundial de más de 500 clientes en más de 30 países, al frente.",
        "Manejado por CMS donde cuenta, así el equipo lo mantiene al día.",
      ],
      services: ["Estrategia", "Diseño web", "Desarrollo", "Webflow CMS"],
      challengeHeading: "Cien años de confianza, y nada online que lo mostrara.",
      challengeBody:
        "Seilas Ship Supplies (Nadetir S.A.) abastece embarcaciones en todos los puertos de Uruguay desde 1921: equipo de cubierta y seguridad, insumos de sala de máquinas, provisiones, pañol aduanero. Un siglo de reputación, pero una presencia web que *no estaba a la altura*. El brief: un sitio B2B creíble, con aire internacional, que diga “de confianza desde 1921” sin decir una palabra.",
      challengeVisualCaption: "nadetir.com · inicio",
      specs: [
        { value: "Build front-end" },
        { value: "Webflow · CMS" },
        { value: "Webflow CMS" },
      ],
      buildHeading: "Una presencia global y prolija para un proveedor centenario.",
      buildLead:
        "Construí el sitio en Webflow: sobrio, seguro y hecho para escalar. Un *mapa mundial de más de 500 clientes en más de 30 países* ancla la historia, toda la gama de servicios está presentada para compradores marítimos, y la herencia de 1921 de la marca atraviesa todo. Manejado por CMS donde cuenta, así el equipo lo mantiene al día.",
      shots: [
        {
          label: "01 / Home",
          lead: "“Manteniendo a las embarcaciones en movimiento, en todo el mundo”",
          body: ". Un mapa mundial de más de 500 clientes en más de 30 países, al frente.",
          placeholder: "Home / mapa: poné screenshot",
        },
        {
          label: "02 / Herencia",
          lead: "Cien años de historia, contados con intención",
          body: ". La historia fundacional de 1921, enmarcada para una audiencia B2B.",
          placeholder: "Sobre / historia: poné screenshot",
        },
      ],
      resultsStatement: "Un sitio que por fin luce como debe: un siglo de confianza, online.",
      resultsSub:
        "Entregado en Webflow y traspasado prolijo. Los números de abajo están medidos en el sitio en vivo.",
      metrics: [
        { label: "Lighthouse SEO" },
        { label: "Lighthouse buenas prácticas" },
        { label: "Lighthouse accesibilidad" },
      ],
    },
  },
};

const copyByLocale: Record<Locale, Record<string, ProjectCopy>> = {
  en: {},
  es: projectsCopyEs,
};

/** All projects, localized to `locale`. */
export function getProjects(locale: Locale): Project[] {
  if (locale === "en") return projects;
  const overlay = copyByLocale[locale] ?? {};
  return projects.map((p) => mergeCopy(p, overlay[p.slug]));
}

/** Full case studies, localized to `locale`. */
export function getCaseStudies(locale: Locale): (Project & { caseStudy: CaseStudy })[] {
  return getProjects(locale).filter(
    (p): p is Project & { caseStudy: CaseStudy } => p.kind === "full" && !!p.caseStudy,
  );
}

/** A single project by slug, localized to `locale`. */
export function getProject(slug: string, locale: Locale): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

/** The next full case study after `slug`, wrapping around, localized to `locale`. */
export function getNextCaseStudy(
  slug: string,
  locale: Locale,
): Project & { caseStudy: CaseStudy } {
  const cs = getCaseStudies(locale);
  const i = cs.findIndex((p) => p.slug === slug);
  return cs[(i + 1) % cs.length];
}
