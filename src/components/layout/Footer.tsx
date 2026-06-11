import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";
import { CertBadge } from "@/components/ui/CertBadge";
import { DraggableWord } from "@/components/motion/DraggableWord";
import { Wordmark } from "./Wordmark";

const SOCIALS = [
  { name: "in" as const, label: "LinkedIn", href: "https://www.linkedin.com/in/lucasfmujica" },
];

/**
 * The closing block on every route: big "Let's build something that moves."
 * CTA, the direct email, and a wordmark / nav / socials row.
 */
export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer__cta">
          {t("ctaPre")}
          <DraggableWord className="ember-word">{t("ctaEmber")}</DraggableWord>
        </h2>
        <a href={`mailto:${t("email")}`} className="footer__mail">
          {t("email")} <span className="ember-word">↗</span>
        </a>
        <div className="footer__row">
          <Wordmark className="footer__wordmark" dotClass="footer__dot" />
          <nav className="footer__nav" aria-label={t("navAria")}>
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <a href="/#stack">Stack</a>
            <a href="/#process">Process</a>
            <Link href="/privacy">Privacy</Link>
          </nav>
          <div className="footer__soc" aria-label={t("socialsAria")}>
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <Icon name={s.name} />
              </a>
            ))}
          </div>
        </div>
        <CertBadge className="footer__cert" />
        <div className="footer__copy">{t("copyright", { year })}</div>
      </div>
    </footer>
  );
}
