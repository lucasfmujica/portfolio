"use client";

import Script from "next/script";

/**
 * Loads Google Analytics 4 with Consent Mode v2. Analytics storage defaults to
 * "denied" so no analytics cookies are set until the visitor opts in via the
 * consent banner (see ConsentBanner, which flips it to "granted"). GA4 still
 * receives cookieless pings while denied, so aggregate traffic is modelled
 * without tracking cookies — compliant by default.
 *
 * Rendered only when NEXT_PUBLIC_GA_ID is set, so local dev / preview without
 * the env var stays analytics-free.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
          });
          // Honour a prior choice stored this device.
          try {
            if (localStorage.getItem('consent') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
