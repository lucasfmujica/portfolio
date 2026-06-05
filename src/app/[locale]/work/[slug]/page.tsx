import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { caseStudies, getProject } from "@/data/projects";
import { siteName, siteUrl } from "@/lib/site";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { JsonLd } from "@/components/seo/JsonLd";
import { caseStudyJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};

  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("caseStudy.titleTemplate", { title: project.name });
  const description = `${project.caseStudy.outcome.pre}${project.caseStudy.outcome.ember} — ${project.category}, ${project.year}.`;
  const url = `${siteUrl}/work/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}`, languages: { en: `/work/${slug}` } },
    openGraph: {
      type: "article",
      siteName,
      title,
      description,
      url,
      images: project.image ? [{ url: project.image, alt: project.imageAlt ?? project.name }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project || project.kind !== "full" || !project.caseStudy) notFound();

  return (
    <>
      <JsonLd data={caseStudyJsonLd(project)} />
      <CaseStudyView project={project as typeof project & { caseStudy: NonNullable<typeof project.caseStudy> }} />
    </>
  );
}
