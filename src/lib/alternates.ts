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

/**
 * `hreflang` map for `path`: every locale the page exists in (all of them by
 * default), plus `x-default` on the default one.
 */
export function languagesFor(
  path: string,
  toUrl: (p: string) => string = (p) => p,
  locales: readonly string[] = routing.locales,
) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, toUrl(localizedPath(path, l))])),
    "x-default": toUrl(localizedPath(path, routing.defaultLocale)),
  };
}

/**
 * `alternates` for a page's metadata. The canonical is the page's OWN locale:
 * pointing `/es/*` at the English URL contradicts the hreflang pair. A locale
 * the page is not written in (an untranslated post rendered in English under
 * `/es`) canonicalizes to the default locale and is left out of hreflang.
 */
export function alternatesFor(
  path: string,
  locale: string,
  locales: readonly string[] = routing.locales,
) {
  const own = locales.includes(locale) ? locale : routing.defaultLocale;
  return { canonical: localizedPath(path, own), languages: languagesFor(path, undefined, locales) };
}
