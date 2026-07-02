import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";

// Kept as a single source date; rendered in the visitor's locale below.
const LAST_UPDATED: Record<Locale, string> = {
  en: "July 1, 2026",
  es: "1 de julio de 2026",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical: "/privacy",
      languages: { en: "/privacy", es: "/es/privacy" },
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}/privacy`,
    },
    robots: { index: true, follow: true },
  };
}

/** External link helper for the rich-text policy bodies. */
const ext = (href: string) => (chunks: ReactNode) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {chunks}
  </a>
);

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <section className="section legal">
      <div className="container legal__inner">
        <p className="eyebrow eyebrow--accent">{t("eyebrow")}</p>
        <h1 className="legal__title">{t("title")}</h1>
        <p className="legal__updated">{t("updated", { date: LAST_UPDATED[locale as Locale] })}</p>

        <h2>{t("shortHeading")}</h2>
        <p>{t("shortBody")}</p>

        <h2>{t("analyticsHeading")}</h2>
        <p>
          {t.rich("analyticsBody", {
            vlink: ext("https://vercel.com/docs/analytics/privacy-policy"),
            glink: ext("https://policies.google.com/privacy"),
          })}
        </p>

        <h2>{t("cookiesHeading")}</h2>
        <p>{t("cookiesBody")}</p>

        <h2>{t("contactHeading")}</h2>
        <p>
          {t.rich("contactBody", {
            link: ext("https://resend.com/legal/privacy-policy"),
          })}
        </p>

        <h2>{t("prefsHeading")}</h2>
        <p>{t("prefsBody")}</p>

        <h2>{t("hostingHeading")}</h2>
        <p>
          {t.rich("hostingBody", {
            link: ext("https://vercel.com/legal/privacy-policy"),
          })}
        </p>

        <h2>{t("rightsHeading")}</h2>
        <p>
          {t.rich("rightsBody", {
            email: (chunks) => <a href="mailto:hello@lucasmujica.dev">{chunks}</a>,
          })}
        </p>
      </div>
    </section>
  );
}
