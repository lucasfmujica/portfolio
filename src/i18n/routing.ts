import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config.
 *
 * English only for launch. Adding Spanish later is a *content* task, not a
 * refactor: append `"es"` to `locales`, drop a `messages/es.json` in place,
 * and translate the strings. Routing, middleware, hreflang and the locale
 * switcher all read from this single source of truth.
 *
 * `localePrefix: "as-needed"` keeps the default locale at the bare path
 * (`/`, `/work/bike`) and only prefixes additional locales (`/es`, `/es/work/bike`).
 */
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
