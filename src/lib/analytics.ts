import { track } from "@vercel/analytics";

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Single funnel for every custom event on the site. Sends to Google Analytics 4
 * (via gtag, once loaded and consented) and also to Vercel Analytics — the
 * latter is a no-op on the Hobby dashboard but harmless and future-proof if the
 * project ever moves to a Pro team. GA4 is the source of truth for events.
 */
export function trackEvent(name: string, params: Params = {}): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
  track(name, params);
}
