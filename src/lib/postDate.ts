import type { Locale } from "@/i18n/routing";

/**
 * Format a post's ISO date for display.
 *
 * Parsed as UTC on purpose. `new Date("2026-07-28")` is already UTC midnight,
 * but formatting it in a negative-offset timezone (Buenos Aires is UTC-3) rolls
 * it back to the 27th. Forcing the UTC timezone keeps the rendered date equal to
 * the string in the data file, and keeps server and client output identical so
 * it can't cause a hydration mismatch.
 */
export function formatPostDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(
    locale === "es" ? "es-AR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  );
}
