import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl, twitterHandle } from "@/lib/site";
import { clashDisplay, generalSans, geistMono } from "../fonts";

import { Nav } from "@/components/layout/Nav";
import { Dock } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { ScrollChrome } from "@/components/layout/ScrollChrome";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark",
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
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("home.title"), template: "%s" },
    description: t("home.description"),
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    keywords: [
      "Lucas Mujica",
      "Webflow developer",
      "front-end developer",
      "GSAP",
      "web animation",
      "Next.js",
      "Client-First",
      "portfolio",
    ],
    formatDetection: { telephone: false },
    appleWebApp: { capable: true, title: siteName, statusBarStyle: "black-translucent" },
    alternates: {
      canonical: "/",
      languages: { en: "/" },
    },
    openGraph: {
      type: "website",
      siteName,
      title: t("home.title"),
      description: t("home.description"),
      url: siteUrl,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
      creator: twitterHandle,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${clashDisplay.variable} ${generalSans.variable} ${geistMono.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <ScrollChrome />
          <Nav />
          <Dock />
          <main id="top">{children}</main>
          <Footer />
          <div className="grain" aria-hidden="true" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
