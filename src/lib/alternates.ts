import { routing } from "@/i18n/routing";

/**
 * Path for `path` in `locale`, matching `localePrefix: "as-needed"`: the default
 * locale stays at the bare path, others are prefixed. The home of a prefixed
 * locale is `/es`, not `/es/` (which 308s).
 */
export function localizedPath(path: string, locale: string) {
  if (locale === routing.defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** `hreflang` map for `path`: every locale, plus `x-default` on the default one. */
export function languagesFor(path: string, toUrl: (p: string) => string = (p) => p) {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, toUrl(localizedPath(path, l))])),
    "x-default": toUrl(localizedPath(path, routing.defaultLocale)),
  };
}

/**
 * `alternates` for a page's metadata. The canonical is the page's OWN locale:
 * pointing `/es/*` at the English URL contradicts the hreflang pair.
 */
export function alternatesFor(path: string, locale: string) {
  return { canonical: localizedPath(path, locale), languages: languagesFor(path) };
}
