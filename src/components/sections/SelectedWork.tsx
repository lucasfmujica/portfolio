import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RevealScope } from "@/components/motion/RevealScope";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { ImageFill } from "@/components/ui/ImageFill";
import { Icon } from "@/components/ui/Icon";
import { projects } from "@/data/projects";

/**
 * Selected work — the three lead case studies as alternating stacking cards.
 * The full set lives on /work; a primary CTA below sends people there.
 */
const FEATURED = projects.slice(0, 3);

export function SelectedWork() {
  const t = useTranslations("Work");
  return (
    <RevealScope as="section" className="section" id="work">
      <div
        className="bloom"
        style={{ top: "-8%", right: "-5%", width: "46vw", height: "46vw", maxWidth: 640, maxHeight: 640 }}
      />
      <div className="container">
        <div className="work__top">
          <div className="section-head">
            <span className="eyebrow" data-reveal>{t("eyebrow")}</span>
            <MaskHeading>{t("heading")}</MaskHeading>
            <p className="lede" data-reveal data-reveal-delay="1">{t("lede")}</p>
          </div>
          <Link href="/work" className="btn btn--link" data-reveal data-reveal-delay="1">
            {t("viewAll")} <Icon name="arrow-right" />
          </Link>
        </div>

        <div className="workstack">
          {FEATURED.map((p) => (
            <article className="wcard" key={p.slug} data-reveal data-cursor="View">
              <svg className="wcard__frame" aria-hidden="true">
                <rect x="1" y="1" rx="31" ry="31" pathLength={100} />
              </svg>
              <div className="wcard__media">
                <span className="wcard__num">{p.index}</span>
                <ImageFill
                  src={p.image}
                  alt={p.imageAlt ?? p.name}
                  placeholder={`${p.name} — drop screenshot`}
                />
              </div>
              <div className="wcard__body">
                <span className="wcard__eyebrow">
                  {p.index} — {p.category} · {p.year}
                </span>
                <h3 className="wcard__title">{p.name}</h3>
                <p className="wcard__blurb">
                  {p.blurb.pre}
                  <span className="ember-word">{p.blurb.ember}</span>
                  {p.blurb.post}
                </p>
                <div className="wcard__tags">
                  {p.tags.map((tag) => (
                    <span className="wcard__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {p.kind === "full" ? (
                  <Link href={`/work/${p.slug}`} className="wcard__link">
                    {t("viewCase")} <Icon name="arrow-ur" />
                  </Link>
                ) : (
                  <a href="/#contact" className="wcard__link">
                    {t("viewCase")} <Icon name="arrow-ur" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="work__cta" data-reveal>
          <Link href="/work" className="btn btn--primary">
            {t("seeAll")} <Icon name="arrow-right" />
          </Link>
        </div>
      </div>
    </RevealScope>
  );
}
