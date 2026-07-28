import { useTranslations } from "next-intl";
import { RevealScope } from "@/components/motion/RevealScope";
import { RichText } from "@/components/ui/RichText";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { TrackedLink } from "@/components/TrackedLink";

interface Service {
  icon: IconName;
  title: string;
  body: string;
  fit: string;
  /** Optional proof: a case study on this site that shows the work. */
  caseSlug?: string;
  caseLabel?: string;
}

interface Credential {
  label: string;
  note: string;
  /** Optional public profile that verifies the credential. */
  href?: string;
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
 * Pricing states the *typical range*, not the floor (Jul 2026). Leading with
 * "starts at 3k" anchored every quote to the cheapest project Lucas takes, and
 * the form's own first budget tier used to sit below it — so someone with 2.5k
 * could tick a box, believe they qualified, and burn a call. The floor still
 * appears, phrased as a disqualifier rather than a reference number.
 *
 * The credential strip and the case-study link exist because the page had no
 * proof of any kind on it: it asked for a five-figure budget on the strength of
 * the copy alone.
 */
export function ServicesPageContent() {
  const t = useTranslations("Services");
  const core = t.raw("core") as Service[];
  const cred = t.raw("cred") as Credential[];
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

        <ul className="svc__cred" aria-label={t("credLabel")} data-reveal>
          {cred.map((c) => (
            <li key={c.label}>
              <Icon name="check" aria-hidden="true" />
              <span>
                {c.href ? (
                  <TrackedAnchor
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    event="credential_click"
                    data={{ credential: "client-first" }}
                  >
                    {c.label} <Icon name="arrow-ur" />
                  </TrackedAnchor>
                ) : (
                  c.label
                )}
                <span className="svc__cred-note">{c.note}</span>
              </span>
            </li>
          ))}
        </ul>

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
              {s.caseSlug && s.caseLabel && (
                <TrackedLink
                  href={`/work/${s.caseSlug}`}
                  className="svc__case"
                  event="service_case_click"
                  data={{ slug: s.caseSlug }}
                >
                  {s.caseLabel} <Icon name="arrow-right" />
                </TrackedLink>
              )}
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
        {/* No closing CTA block here on purpose: the Contact section with the
            form renders immediately below, so a "start a project" button was a
            scroll back to where the visitor already was. */}
      </div>
    </RevealScope>
  );
}
