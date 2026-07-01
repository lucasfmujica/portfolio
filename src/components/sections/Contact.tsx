import { useTranslations } from "next-intl";
import { RevealScope } from "@/components/motion/RevealScope";
import { RichText } from "@/components/ui/RichText";
import { Icon } from "@/components/ui/Icon";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { ContactForm } from "./ContactForm";

const SOCIALS = [
  { name: "in" as const, label: "LinkedIn", href: "https://www.linkedin.com/in/lucasfmujica" },
  { name: "gh" as const, label: "GitHub", href: "https://github.com/lucasfmujica" },
];

/**
 * Contact — the single ember-flooded band. Info column on the left (direct
 * email, availability, location, socials) with the giant "LM." watermark
 * behind; the conversational madlib form on the right.
 */
export function Contact() {
  const t = useTranslations("Contact");
  return (
    <RevealScope as="section" className="section contact scheme-ember" id="contact">
      <div className="contact__ghost" aria-hidden="true">
        LM<span className="e">.</span>
      </div>
      <div className="container contact__grid">
        <div className="contact__main">
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 data-reveal data-reveal-delay="1">
            <RichText text={t("heading")} />
          </h2>
          <p className="contact__lead" data-reveal data-reveal-delay="2">
            {t("lead")}
          </p>
          <div className="contact__meta" data-reveal data-reveal-delay="2">
            <TrackedAnchor
              href={`mailto:${t("email")}`}
              className="contact__mail"
              event="email_click"
              data={{ location: "contact" }}
            >
              {t("email")} <Icon name="arrow-ur" />
            </TrackedAnchor>
            <div className="contact__avail">
              <span className="contact__pulse" /> {t("available")}
            </div>
            <div className="contact__loc">{t("location")}</div>
          </div>
          <div className="contact__socials" aria-label={t("socialsAria")} data-reveal data-reveal-delay="3">
            {SOCIALS.map((s) => (
              <TrackedAnchor
                key={s.name}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                event="social_click"
                data={{ network: s.label, location: "contact" }}
              >
                <Icon name={s.name} />
              </TrackedAnchor>
            ))}
          </div>
        </div>
        <div className="contact__formwrap" data-reveal data-reveal-delay="2">
          <ContactForm />
        </div>
      </div>
    </RevealScope>
  );
}
