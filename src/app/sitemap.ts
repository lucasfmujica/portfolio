import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

/**
 * One entry per page, with `alternates.languages` listing every locale so search
 * engines see the en/es pair. The default locale lives at the bare path; others
 * are prefixed (`/es/...`), matching `localePrefix: "as-needed"`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localizedUrl = (path: string, locale: string) =>
    `${siteUrl}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`;

  const languagesFor = (path: string) =>
    Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(path, l)]));

  const entry = (
    path: string,
    changeFrequency: "monthly" | "yearly",
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: localizedUrl(path, routing.defaultLocale),
    lastModified: now,
    changeFrequency,
    priority,
    alternates: { languages: languagesFor(path) },
  });

  return [
    entry("/", "monthly", 1),
    entry("/work", "monthly", 0.9),
    entry("/about", "monthly", 0.7),
    entry("/privacy", "yearly", 0.2),
    ...caseStudies.map((p) => entry(`/work/${p.slug}`, "yearly", 0.8)),
  ];
}
