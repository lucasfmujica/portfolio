import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LeadSourceTracker } from "@/components/LeadSourceTracker";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ConsentBanner } from "@/components/ConsentBanner";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl, twitterHandle } from "@/lib/site";
import { clashDisplay, generalSans, geistMono } from "../fonts";

import { Nav } from "@/components/layout/Nav";
import { Dock } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { ScrollChrome } from "@/components/layout/ScrollChrome";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollFX } from "@/components/motion/ScrollFX";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ClientFX } from "@/components/motion/ClientFX";

import "@/styles/globals.css";

// Applies a saved accent before first paint so there's no flash of the default.
const accentInitScript = `(function(){try{var c=localStorage.getItem('lm-accent');if(!c||c.toLowerCase()==='#ff4d2e')return;var d=document.documentElement.style;d.setProperty('--ember',c);d.setProperty('--ember-hover','color-mix(in srgb, '+c+', black 12%)');d.setProperty('--ember-deep','color-mix(in srgb, '+c+', black 70%)');d.setProperty('--ember-tint','color-mix(in srgb, '+c+', white 76%)');d.setProperty('--glow-ember','0 14px 50px -16px color-mix(in srgb, '+c+', transparent 45%)');}catch(e){}})();`;

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
      languages: { en: "/", es: "/es" },
    },
    openGraph: {
      type: "website",
      siteName,
      title: t("home.title"),
      description: t("home.description"),
      url: locale === "en" ? siteUrl : `${siteUrl}/${locale}`,
      locale: locale === "es" ? "es_ES" : "en_US",
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang={locale}
      className={`${clashDisplay.variable} ${generalSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentInitScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <ScrollProgress />
          <ScrollFX />
          <ScrollChrome />
          <Nav />
          <Dock />
          <main id="top">{children}</main>
          <Footer />
          <ClientFX />
          <div className="grain" aria-hidden="true" />
          {/* Inside the intl provider — ConsentBanner reads translations. */}
          <ConsentBanner enabled={Boolean(gaId)} />
        </NextIntlClientProvider>
        <LeadSourceTracker />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
