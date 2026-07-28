import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RevealScope } from "@/components/motion/RevealScope";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { RichText } from "@/components/ui/RichText";
import { Mockup } from "@/components/ui/Mockup";
import { Icon } from "@/components/ui/Icon";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

/**
 * The three cards that lead the home page. Named explicitly instead of
 * `.slice(0, 3)`, which just took whatever happened to sit at the top of the
 * `caseStudies` array.
 *
 * Ordered by what actually pulls visitors (analytics, 30 days to 2026-07-27):
 * bike 6 and true-north-jerseys 5 lead clearly, so they go first. The remaining
 * four tie at 2–3 visitors, which is noise at this volume — k2btools stays as
 * the third simply because it was already featured. Revisit once
 * `case_study_view` has real numbers behind it (the event was being dropped on
 * direct loads until 2026-07-27, so anything older undercounts).
 *
 * Deliberately does NOT reorder the `caseStudies` array itself — /work renders
 * from that and has its own curation.
 */
const FEATURED_SLUGS = ["bike", "true-north-jerseys", "k2btools"];

/**
 * Selected work — the three lead case studies as alternating stacking cards.
 * The full set lives on /work; a primary CTA below sends people there.
 */
export function SelectedWork() {
  const t = useTranslations("Work");
  const locale = useLocale() as Locale;
  const all = getProjects(locale);
  const FEATURED = FEATURED_SLUGS.map((slug) => all.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
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
            <MaskHeading><RichText text={t("heading")} /></MaskHeading>
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
                <Mockup
                  src={p.image}
                  alt={p.imageAlt ?? p.name}
                  label={p.caseStudy?.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  badge={p.index}
                  placeholder={`${p.name}: drop screenshot`}
                />
              </div>
              <div className="wcard__body">
                <span className="wcard__eyebrow">
                  {p.index} / {p.category} · {p.year}
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
                  <a href="#contact" className="wcard__link">
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
