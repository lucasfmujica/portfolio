/**
 * Schema.org JSON-LD builders.
 *
 * Emitted via the <JsonLd> component. The Person is the site's root entity;
 * the home page carries Person + WebSite, each case study carries a
 * CreativeWork that credits the Person as creator.
 */
import type { Project } from "@/data/projects";
import { siteName, siteUrl } from "@/lib/site";

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

const personEntity = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteName,
  url: siteUrl,
  email: "hello@lucasmujica.dev",
  image: `${siteUrl}/assets/portrait.webp`,
  jobTitle: "Senior Webflow & Front-End Developer",
  description:
    "Senior Webflow & front-end developer, 5+ years deep — fast, scalable sites with motion that earns its place.",
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
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personEntity,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteUrl,
        name: siteName,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
      },
    ],
  };
}

/** CreativeWork graph for a case study, crediting the Person. */
export function caseStudyJsonLd(project: Project) {
  const cs = project.caseStudy;
  const url = `${siteUrl}/work/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.name,
    headline: `${project.name} — ${project.category}`,
    description: cs ? `${cs.outcome.pre}${cs.outcome.ember}` : project.blurb.ember,
    url,
    inLanguage: "en",
    dateCreated: project.year,
    datePublished: project.year,
    keywords: project.tags.join(", "),
    genre: project.category,
    ...(project.image ? { image: `${siteUrl}${project.image}` } : {}),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    ...(cs?.liveUrl ? { sameAs: cs.liveUrl } : {}),
    isPartOf: { "@id": WEBSITE_ID },
  };
}
