"use client";

import Script from "next/script";

/**
 * Loads the remote GA4 library. The bootstrap that defines `window.gtag`, sets
 * Consent Mode v2 defaults and calls `config` is NOT here — it ships inline in
 * <head> via `gaInitScript`, because it has to run before hydration or mount
 * effects fire events into a `gtag` that doesn't exist yet (see lib/gaInit.ts).
 *
 * This script only needs to arrive eventually: gtag.js replays whatever the
 * inline bootstrap already queued on the dataLayer.
 *
 * Rendered only when NEXT_PUBLIC_GA_ID is set, so local dev / preview without
 * the env var stays analytics-free.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      strategy="afterInteractive"
    />
  );
}
