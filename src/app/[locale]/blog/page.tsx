import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";
import { BlogIndex } from "@/components/sections/blog/BlogIndex";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogJsonLd } from "@/lib/jsonld";

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
    title: t("blog.title"),
    description: t("blog.description"),
    alternates: {
      canonical: "/blog",
      languages: { en: "/blog", es: "/es/blog" },
    },
    openGraph: {
      type: "website",
      siteName,
      title: t("blog.title"),
      description: t("blog.description"),
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}/blog`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("blog.title"),
      description: t("blog.description"),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={blogJsonLd(locale as Locale)} />
      <BlogIndex />
      <Contact />
    </>
  );
}
