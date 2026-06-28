import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutJsonLd } from "@/lib/jsonld";

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
    title: t("about.title"),
    description: t("about.description"),
    alternates: {
      canonical: "/about",
      languages: { en: "/about", es: "/es/about" },
    },
    openGraph: {
      type: "profile",
      siteName,
      title: t("about.title"),
      description: t("about.description"),
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}/about`,
    },
    twitter: { card: "summary_large_image", title: t("about.title"), description: t("about.description") },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={aboutJsonLd(locale as Locale)} />
      <AboutPageContent />
      <Contact />
    </>
  );
}
