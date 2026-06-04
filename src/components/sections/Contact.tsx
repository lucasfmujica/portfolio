import { useTranslations } from "next-intl";
import { RevealScope } from "@/components/motion/RevealScope";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "./ContactForm";

const SOCIALS = [
  { name: "x" as const, label: "X", href: "https://x.com/" },
  { name: "in" as const, label: "LinkedIn", href: "https://linkedin.com/" },
  { name: "gh" as const, label: "GitHub", href: "https://github.com/" },
  { name: "ig" as const, label: "Instagram", href: "https://instagram.com/" },
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
            {t("heading")}
          </h2>
          <p className="contact__lead" data-reveal data-reveal-delay="2">
            {t("lead")}
          </p>
          <div className="contact__meta" data-reveal data-reveal-delay="2">
            <a href={`mailto:${t("email")}`} className="contact__mail">
              {t("email")} <Icon name="arrow-ur" />
            </a>
            <div className="contact__avail">
              <span className="contact__pulse" /> {t("available")}
            </div>
            <div className="contact__loc">{t("location")}</div>
          </div>
          <div className="contact__socials" aria-label={t("socialsAria")} data-reveal data-reveal-delay="3">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <Icon name={s.name} />
              </a>
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
