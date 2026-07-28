import { useTranslations } from "next-intl";
import { RevealScope } from "@/components/motion/RevealScope";
import { RichText } from "@/components/ui/RichText";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";

interface Service {
  icon: IconName;
  title: string;
  body: string;
  fit: string;
}

/**
 * The /services page body. Server Component: it's static copy, so it only
 * needs RevealScope's client wrapper for the scroll-in, same as Contact.
 *
 * Why this page exists: Search Console (Jul 2026) showed four distinct queries
 * in three months, three of them Lucas's own name or a client's. Nothing on the
 * site answered "what can I buy and what does it cost" — the case studies show
 * what was built, not what's for sale. The service taxonomy and the price floor
 * already existed inside the contact form, which meant a visitor only found out
 * the price after deciding to get in touch.
 *
 * The floor is stated and the ladder is not: it filters out below-minimum leads
 * without capping the quote or making a future rate rise awkward.
 */
export function ServicesPageContent() {
  const t = useTranslations("Services");
  const core = t.raw("core") as Service[];
  const ready = t.raw("ready") as string[];

  return (
    <RevealScope as="section" className="section svc">
      <div className="container">
        <div className="section-head svc__head">
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h1 data-reveal data-reveal-delay="1">
            <RichText text={t("heading")} />
          </h1>
          <p className="lede" data-reveal data-reveal-delay="2">
            {t("lede")}
          </p>
          <p className="svc__price" data-reveal data-reveal-delay="3">
            <strong>{t("price")}</strong> {t("priceNote")}
          </p>
        </div>

        <h2 className="svc__label" data-reveal>
          {t("coreLabel")}
        </h2>
        <div className="svc__grid">
          {core.map((s) => (
            <article className="svc__card" key={s.title} data-reveal>
              <div className="svc__ic">
                <Icon name={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <p className="svc__fit">{s.fit}</p>
            </article>
          ))}
        </div>

        <div className="svc__also" data-reveal>
          <h2 className="svc__label">{t("alsoLabel")}</h2>
          <p>{t("also")}</p>
        </div>

        <div className="svc__ready" data-reveal>
          <h2 className="svc__label">{t("readyLabel")}</h2>
          <ul>
            {ready.map((item) => (
              <li key={item}>
                <Icon name="check" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/#process" className="btn btn--ghost svc__process">
            {t("processLink")} <Icon name="arrow-right" />
          </Link>
        </div>

        <div className="svc__cta" data-reveal>
          <h2>{t("ctaHeading")}</h2>
          <p>{t("ctaBody")}</p>
          <a href="#contact" className="btn btn--primary">
            {t("cta")}
          </a>
        </div>
      </div>
    </RevealScope>
  );
}
