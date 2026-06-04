import { useTranslations } from "next-intl";

/**
 * Locale-scoped 404 — renders inside the root layout (nav, dock, footer, grain
 * all present), matching the site's dark ember aesthetic.
 */
export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="nf">
      <div
        className="bloom"
        style={{ top: "10%", left: "50%", transform: "translateX(-50%)", width: "50vw", height: "50vw", maxWidth: 620, maxHeight: 620 }}
      />
      <div className="nf__inner">
        <span className="eyebrow eyebrow--accent">{t("eyebrow")}</span>
        <h1>{t("heading")}</h1>
        <p className="lede">{t("body")}</p>
        <div className="nf__actions">
          <a href="/" className="btn btn--primary">
            {t("home")}
          </a>
          <a href="/#work" className="btn btn--ghost">
            {t("work")}
          </a>
        </div>
      </div>
    </section>
  );
}
