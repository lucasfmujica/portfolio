import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";

const LAST_UPDATED = "June 10, 2026";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: `Privacy · ${siteName}`,
  description: "How lucasmujica.dev handles your data: no cookies, no trackers, anonymous analytics only.",
  alternates: { canonical: "/privacy", languages: { en: "/privacy" } },
  openGraph: {
    type: "website",
    siteName,
    title: `Privacy · ${siteName}`,
    description: "How lucasmujica.dev handles your data: no cookies, no trackers, anonymous analytics only.",
    url: `${siteUrl}/privacy`,
  },
  robots: { index: true, follow: true },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <section className="section legal">
      <div className="container legal__inner">
        <p className="eyebrow eyebrow--accent">Privacy</p>
        <h1 className="legal__title">Privacy policy</h1>
        <p className="legal__updated">Last updated: {LAST_UPDATED}</p>

        <h2>The short version</h2>
        <p>
          This site doesn&apos;t use cookies, doesn&apos;t run ad trackers, and doesn&apos;t sell or share your
          data with anyone. The only data it touches is anonymous visit statistics and whatever you choose to
          send me when you get in touch.
        </p>

        <h2>Analytics</h2>
        <p>
          I use Vercel Web Analytics to understand how the site is used: page views, referrers, country, device
          type. It is cookieless and doesn&apos;t identify individual visitors. Visits are recognized through a
          temporary hash that is discarded after the visit ends, so you can&apos;t be tracked across sites or
          over time. See{" "}
          <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel&apos;s analytics privacy documentation
          </a>{" "}
          for details.
        </p>

        <h2>Contact</h2>
        <p>
          If you email me or use a contact form on this site, I receive the details you send (your name, email
          address, and message) and use them only to reply to you. Form messages are delivered to my inbox via{" "}
          <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Resend
          </a>
          , an email delivery service. I don&apos;t add you to any mailing list.
        </p>

        <h2>Local preferences</h2>
        <p>
          If you customize the accent color, that choice is saved in your browser&apos;s local storage on your
          device only. It never leaves your browser and you can clear it anytime through your browser settings.
        </p>

        <h2>Hosting</h2>
        <p>
          The site is hosted on{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel
          </a>
          . Like any web host, Vercel processes standard request data (such as IP addresses) to serve the site
          and protect it from abuse.
        </p>

        <h2>Your rights</h2>
        <p>
          Since the site stores no personal data about visitors, there&apos;s usually nothing to request, but if
          you&apos;ve contacted me and want your messages deleted, just ask. Questions about any of this:{" "}
          <a href="mailto:hello@lucasmujica.dev">hello@lucasmujica.dev</a>.
        </p>
      </div>
    </section>
  );
}
