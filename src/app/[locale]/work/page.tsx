import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { ImageFill } from "@/components/ui/ImageFill";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("work.title"),
    description: t("work.description"),
    alternates: { canonical: "/work", languages: { en: "/work" } },
    openGraph: {
      type: "website",
      siteName,
      title: t("work.title"),
      description: t("work.description"),
      url: `${siteUrl}/work`,
    },
    twitter: { card: "summary_large_image", title: t("work.title"), description: t("work.description") },
  };
}

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Work");

  return (
    <section className="section allwork">
      <div className="container">
        <div className="allwork__head" id="hero">
          <Link href="/" className="allwork__back">
            <Icon name="arrow-left" /> {t("backHome")}
          </Link>
          <div className="section-head" style={{ marginBottom: 8 }}>
            <span className="eyebrow">{t("allEyebrow")}</span>
            <h1><RichText text={t("allHeading")} /></h1>
            <p className="lede">{t("allLede")}</p>
          </div>
        </div>

        <div className="allwork__grid">
          {projects.map((p) => {
            const isCase = p.kind === "full";
            const inner = (
              <>
                <svg className="awcard__frame" aria-hidden="true">
                  <rect pathLength={100} />
                </svg>
                <div className="awcard__media">
                  <span className="awcard__num">{p.index}</span>
                  <ImageFill
                    src={p.image}
                    alt={p.imageAlt ?? p.name}
                    placeholder={`${p.name} — drop screenshot`}
                    sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div className="awcard__info">
                  <span className="awcard__eyebrow">
                    {p.category} · {p.year}
                  </span>
                  <h2 className="awcard__title">{p.name}</h2>
                  <div className="awcard__tags">
                    {p.tags.map((tag) => (
                      <span className="awcard__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="awcard__cta">
                    {isCase ? t("viewCase") : t("startProject")}{" "}
                    <Icon name="arrow-ur" />
                  </span>
                </div>
              </>
            );

            return isCase ? (
              <Link key={p.slug} href={`/work/${p.slug}`} className="awcard" data-cursor="View">
                {inner}
              </Link>
            ) : (
              <a key={p.slug} href="/#contact" className="awcard" data-cursor="View">
                {inner}
              </a>
            );
          })}
        </div>

        <div className="allwork__cta">
          <a href="/#contact" className="btn btn--primary">
            {t("startProject")} <Icon name="arrow-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
