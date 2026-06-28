import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";
import { LocaleSwitcher } from "./LocaleSwitcher";

/**
 * Sticky top bar. Centered links (Work / About / Stack), wordmark left,
 * "Let's talk" right. Background fades to blurred ink on scroll, and the
 * links + CTA recede once the hero is scrolled past (handed off to the dock) —
 * both driven by <ScrollChrome> toggling classes.
 *
 * Hash links use plain anchors so they resolve to the home route from any
 * page and glide via Lenis on the home route itself.
 */
export function Nav() {
  const t = useTranslations("Nav");
  return (
    <nav className="nav" id="nav">
      <div className="nav__inner">
        <Link className="nav__brand" href="/" aria-label={t("brandAria")}>
          <Wordmark dotClass="nav__dot" />
        </Link>
        <div className="nav__links">
          <Link href="/work">{t("work")}</Link>
          <Link href="/about">{t("about")}</Link>
          <a href="/#stack">{t("stack")}</a>
        </div>
        <div className="nav__right">
          <LocaleSwitcher className="nav__locale" />
          <a href="#contact" className="btn btn--primary">
            {t("talk")}
          </a>
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
}
