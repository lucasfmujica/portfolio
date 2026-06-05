import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RevealScope } from "@/components/motion/RevealScope";
import { RichText } from "@/components/ui/RichText";
import { ImageFill } from "@/components/ui/ImageFill";
import { Icon } from "@/components/ui/Icon";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyGallery } from "./CaseStudyGallery";
import { getNextCaseStudy, type Project, type CaseStudy } from "@/data/projects";

/**
 * The single reusable case-study template. Everything renders from the project
 * data: hero, challenge (+ numbered spec), build gallery, the ember-flooded
 * results band, the pull quote, and a "next project" closer.
 */
export function CaseStudyView({
  project,
}: {
  project: Project & { caseStudy: CaseStudy };
}) {
  const t = useTranslations("CaseStudy");
  const cs = project.caseStudy;
  const next = getNextCaseStudy(project.slug);

  return (
    <>
      <CaseStudyHero project={project} />

      {/* The challenge */}
      <RevealScope as="section" className="section cs-challenge" id="challenge">
        <div className="container cs-challenge__grid">
          <div className="cs-challenge__body">
            <span className="eyebrow" data-reveal>
              {t("challengeEyebrow")}
            </span>
            <h2 data-reveal data-reveal-delay="1">
              {cs.challengeHeading}
            </h2>
            <p className="cs-challenge__p" data-reveal data-reveal-delay="1">
              <RichText text={cs.challengeBody} />
            </p>
          </div>
          <div className="cs-spec" data-reveal data-reveal-delay="2">
            {cs.specs.map((spec, i) => (
              <div className="cs-spec__row" key={spec.key}>
                <span className="cs-spec__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="cs-spec__k">{t(`specLabels.${spec.key}`)}</span>
                <span className="cs-spec__v">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealScope>

      {/* What I built */}
      <RevealScope as="section" className="section cs-build" id="build">
        <div className="container">
          <div className="cs-build__head">
            <span className="eyebrow" data-reveal>
              {t("buildEyebrow")}
            </span>
            <h2 data-reveal data-reveal-delay="1">
              {cs.buildHeading}
            </h2>
            <p className="cs-build__lead" data-reveal data-reveal-delay="2">
              <RichText text={cs.buildLead} />
            </p>
          </div>
          <CaseStudyGallery shots={cs.shots} />
        </div>
      </RevealScope>

      {/* Results — ember flood */}
      <RevealScope as="section" className="section cs-results" id="results">
        <div className="cs-results__ghost" aria-hidden="true">
          {project.name.split(" ")[0].toUpperCase()}
        </div>
        <div className="cs-results__inner">
          <span className="eyebrow" data-reveal>
            {t("resultsEyebrow")}
          </span>
          <h2 className="cs-results__statement" data-reveal data-reveal-delay="1">
            {cs.resultsStatement}
          </h2>
          <p className="cs-results__sub" data-reveal data-reveal-delay="2">
            {cs.resultsSub}
          </p>
          <div className="cs-metrics" data-reveal data-reveal-delay="2">
            {cs.metrics.map((m) => (
              <div className="cs-metric" key={m.label}>
                <div className="cs-metric__n">
                  {m.value}
                  {m.unit && <span className="u">{m.unit}</span>}
                </div>
                <div className="cs-metric__l">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </RevealScope>

      {/* What they said — only when a real testimonial exists */}
      {cs.quote && (
        <RevealScope as="section" className="section">
          <div className="container">
            <div className="section-head center" style={{ marginBottom: 48 }} data-reveal>
              <span className="eyebrow">{t("quoteEyebrow")}</span>
            </div>
            <figure className="cs-quote__card" data-reveal data-reveal-delay="1">
              <div className="cs-quote__mark">&ldquo;</div>
              <blockquote className="cs-quote__q">
                <RichText text={cs.quote.quote} />
              </blockquote>
              <figcaption className="cs-quote__by">
                <span className="cs-quote__av" />
                <div>
                  <div className="cs-quote__name">{cs.quote.name}</div>
                  <div className="cs-quote__role">{cs.quote.role}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </RevealScope>
      )}

      {/* Next project */}
      <RevealScope as="section" className="section cs-next">
        <div className="container">
          <Link href={`/work/${next.slug}`} className="cs-next__link" data-reveal>
            <span className="cs-next__eyebrow">{t("nextEyebrow")}</span>
            <div className="cs-next__grid">
              <div>
                <span className="cs-next__title">
                  {next.name} <Icon name="arrow-right" />
                </span>
                <p className="cs-next__meta">
                  {next.tags.map((tag, i) => (
                    <span key={tag} style={{ display: "contents" }}>
                      <span>{tag}</span>
                      <span className="sep">·</span>
                    </span>
                  ))}
                  <span>{next.year}</span>
                </p>
              </div>
              <div className="cs-next__media">
                <span className="cs-next__arrow">
                  <Icon name="arrow-ur" />
                </span>
                <div className="cs-next__media-inner">
                  <ImageFill
                    src={next.image}
                    alt={next.name}
                    placeholder={`${next.name} — drop preview`}
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </RevealScope>
    </>
  );
}
