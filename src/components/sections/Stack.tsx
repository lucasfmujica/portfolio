import { useTranslations } from "next-intl";
import { RevealScope } from "@/components/motion/RevealScope";
import { DrawUnderline } from "@/components/motion/DrawUnderline";
import { Icon, type IconName } from "@/components/ui/Icon";

const TECHS = [
  "Webflow", "Client-First", "Lumos", "React", "Next.js", "TypeScript", "GSAP",
  "ScrollTrigger", "DrawSVG", "n8n", "Make", "Zapier", "Airtable", "HubSpot",
  "Stripe", "Notion", "Slack", "Figma",
];
const HOT = new Set(["Webflow", "GSAP", "Next.js", "n8n", "HubSpot"]);

const TIERS: { key: "build" | "code" | "motion" | "automation" | "connect"; icon: IconName }[] = [
  { key: "build", icon: "build" },
  { key: "code", icon: "code" },
  { key: "motion", icon: "spark" },
  { key: "automation", icon: "bolt" },
  { key: "connect", icon: "hub" },
];

function Chip({ label }: { label: string }) {
  return <span className={`smqchip${HOT.has(label) ? " on" : ""}`}>{label}</span>;
}

/**
 * Stack — two kinetic marquee rows scrolling opposite directions (CSS, pause on
 * hover), with ember dots on the headline techs, over four capability tiers.
 * Rows are duplicated so the infinite scroll loops seamlessly.
 */
export function Stack() {
  const t = useTranslations("Stack");
  const rowA = [...TECHS, ...TECHS];
  const rowB = [...[...TECHS].reverse(), ...[...TECHS].reverse()];

  return (
    <RevealScope as="section" className="section" id="stack">
      <div
        className="bloom bloom--b"
        style={{ bottom: "-12%", left: "-6%", width: "42vw", height: "42vw", maxWidth: 560, maxHeight: 560 }}
      />
      <div className="container">
        <div className="section-head center" style={{ marginBottom: 64 }} data-reveal>
          <span className="eyebrow eyebrow--accent">{t("eyebrow")}</span>
          <h2>
            {t("headingPre")}
            <DrawUnderline>
              <span className="ember-word">{t("headingEmber")}</span>
            </DrawUnderline>
          </h2>
          <p className="lede">{t("lede")}</p>
        </div>

        <div className="smq" aria-hidden="true" data-skew>
          <div className="smq__row smq__row--a">
            <div className="smq__t">
              {rowA.map((tech, i) => (
                <Chip key={`a-${i}`} label={tech} />
              ))}
            </div>
          </div>
          <div className="smq__row smq__row--b">
            <div className="smq__t">
              {rowB.map((tech, i) => (
                <Chip key={`b-${i}`} label={tech} />
              ))}
            </div>
          </div>
        </div>

        <div className="smq__tiers">
          {TIERS.map((tier, i) => (
            <span className="smq__tier" key={tier.key} data-reveal data-reveal-delay={i}>
              <Icon name={tier.icon} />
              <b>{t(`tiers.${tier.key}.label`)}</b> — {t(`tiers.${tier.key}.items`)}
            </span>
          ))}
        </div>
      </div>
    </RevealScope>
  );
}
