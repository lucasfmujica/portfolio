import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next internals (_next)
  // - Netlify internals
  // - static files (anything with a dot, e.g. .png, .ico, .svg)
  // - metadata image routes (opengraph-image / twitter-image): they live under
  //   [locale] and must be served at their bare `/en/...` path. Without this,
  //   `as-needed` redirects `/en/opengraph-image` → `/opengraph-image` (307),
  //   which social scrapers don't follow, and the de-localed path 500s.
  matcher: ["/((?!api|_next|_vercel|.*\\..*|.*(?:opengraph|twitter)-image).*)"],
};
