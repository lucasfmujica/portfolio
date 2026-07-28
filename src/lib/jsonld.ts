/**
 * Schema.org JSON-LD builders.
 *
 * Emitted via the <JsonLd> component. The Person is the site's root entity;
 * the home page carries Person + WebSite, each case study carries a
 * CreativeWork that credits the Person as creator.
 */
import type { Project } from "@/data/projects";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

/** Absolute URL for a path under the given locale ("" prefix for the default). */
const localeUrl = (locale: Locale, path = "") =>
  `${siteUrl}${locale === "en" ? "" : `/${locale}`}${path}`;

const personEntity = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteName,
  url: siteUrl,
  email: "hello@lucasmujica.dev",
  image: `${siteUrl}/assets/portrait.jpg`,
  jobTitle: "Senior Webflow & Front-End Developer",
  description:
    "Senior Webflow & front-end developer with 5+ years deep building high-performing, component-driven Webflow sites marketing teams and small businesses can own, scale and maintain.",
  // Every profile Lucas controls, so Google can collapse them into one entity.
  // Worth keeping complete: Search Console (Jul 2026) shows 100% of search
  // impressions are brand queries, and "lucas mujica" only averages position
  // 4.3 — the brand SERP is the entire organic channel right now.
  sameAs: ["https://www.linkedin.com/in/lucasfmujica", "https://github.com/lucasfmujica"],
  knowsAbout: [
    "Webflow",
    "Front-end development",
    "GSAP",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Web performance",
    "Web animation",
    "Client-First",
  ],
};

/** Person + WebSite graph for the home page. */
export function homeJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personEntity,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteUrl,
        name: siteName,
        inLanguage: locale,
        publisher: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
      },
    ],
  };
}

/** Blog index graph. */
export function blogJsonLd(locale: Locale) {
  const url = localeUrl(locale, "/blog");
  const en = locale === "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      personEntity,
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: en ? `Notes · ${siteName}` : `Notas · ${siteName}`,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale) },
          { "@type": "ListItem", position: 2, name: en ? "Blog" : "Blog", item: url },
        ],
      },
    ],
  };
}

/**
 * BlogPosting graph for a single post.
 *
 * `dateModified` mirrors `datePublished` because posts carry one date. If
 * substantive edits start happening, add a `updated` field to the Post record
 * and read it here rather than letting the two silently drift.
 */
export function postJsonLd(
  post: { slug: string; title: string; description: string; date: string; tags: string[] },
  locale: Locale,
) {
  const url = localeUrl(locale, `/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      personEntity,
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        url,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: locale,
        keywords: post.tags.join(", "),
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": `${localeUrl(locale, "/blog")}#blog` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale) },
          { "@type": "ListItem", position: 2, name: "Blog", item: localeUrl(locale, "/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

/**
 * Service graph for /services, with the Person as provider.
 *
 * Carries the published floor as a real `PriceSpecification` (minPrice, no
 * maxPrice) rather than prose, so the commercial offer is machine-readable. The
 * ladder above the floor stays out on purpose: it filters below-minimum
 * enquiries without capping a quote.
 */
export function servicesJsonLd(locale: Locale) {
  const url = localeUrl(locale, "/services");
  const en = locale === "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      personEntity,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: en ? `Services · ${siteName}` : `Servicios · ${siteName}`,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: en ? "Webflow development" : "Desarrollo Webflow",
        serviceType: "Webflow development",
        provider: { "@id": PERSON_ID },
        areaServed: "Worldwide",
        availableLanguage: ["en", "es"],
        url,
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: 3000,
          },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: en ? "Webflow services" : "Servicios de Webflow",
          itemListElement: (en
            ? ["Webflow site build", "Webflow migration and rebuild"]
            : ["Sitio en Webflow", "Migración y rebuild en Webflow"]
          ).map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale) },
          { "@type": "ListItem", position: 2, name: en ? "Services" : "Servicios", item: url },
        ],
      },
    ],
  };
}

/** ProfilePage graph for the about page, with the Person as its main entity. */
export function aboutJsonLd(locale: Locale) {
  const url = localeUrl(locale, "/about");
  return {
    "@context": "https://schema.org",
    "@graph": [
      personEntity,
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: `About · ${siteName}`,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale) },
          { "@type": "ListItem", position: 2, name: "About", item: url },
        ],
      },
    ],
  };
}

/** CollectionPage + ItemList graph for the work index, listing the case studies. */
export function workJsonLd(locale: Locale) {
  const url = localeUrl(locale, "/work");
  // Only "full" projects have their own indexable case-study page; compact
  // entries route to the contact CTA and have no canonical URL to list.
  const cases = getProjects(locale).filter((p) => p.kind === "full");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collectionpage`,
        url,
        name: `Work · ${siteName}`,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": `${url}#worklist` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#worklist`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: cases.length,
        itemListElement: cases.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          item: localeUrl(locale, `/work/${p.slug}`),
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale) },
          { "@type": "ListItem", position: 2, name: "Work", item: url },
        ],
      },
    ],
  };
}

/** CreativeWork + BreadcrumbList graph for a case study, crediting the Person. */
export function caseStudyJsonLd(project: Project, locale: Locale) {
  const cs = project.caseStudy;
  const url = localeUrl(locale, `/work/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.name,
        headline: `${project.name} · ${project.category}`,
        description: cs ? `${cs.outcome.pre}${cs.outcome.ember}` : project.blurb.ember,
        url,
        inLanguage: locale,
        dateCreated: project.year,
        datePublished: project.year,
        keywords: project.tags.join(", "),
        genre: project.category,
        ...(project.image ? { image: `${siteUrl}${project.image}` } : {}),
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        ...(cs?.liveUrl ? { sameAs: cs.liveUrl } : {}),
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale) },
          { "@type": "ListItem", position: 2, name: "Work", item: localeUrl(locale, "/work") },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
}
