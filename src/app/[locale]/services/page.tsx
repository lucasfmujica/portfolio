import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";
import { ServicesPageContent } from "@/components/sections/services/ServicesPageContent";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicesJsonLd } from "@/lib/jsonld";

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
    title: t("services.title"),
    description: t("services.description"),
    alternates: {
      canonical: "/services",
      languages: { en: "/services", es: "/es/services" },
    },
    openGraph: {
      type: "website",
      siteName,
      title: t("services.title"),
      description: t("services.description"),
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}/services`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("services.title"),
      description: t("services.description"),
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={servicesJsonLd(locale as Locale)} />
      <ServicesPageContent />
      <Contact />
    </>
  );
}
