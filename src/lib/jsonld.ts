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
  sameAs: ["https://www.linkedin.com/in/lucasfmujica"],
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
