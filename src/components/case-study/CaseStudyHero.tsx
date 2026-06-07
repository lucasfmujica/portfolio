"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";
import { Mockup } from "@/components/ui/Mockup";
import type { Project, CaseStudy } from "@/data/projects";

export function CaseStudyHero({
  project,
}: {
  project: Project & { caseStudy: CaseStudy };
}) {
  const t = useTranslations("CaseStudy");
  const cs = project.caseStudy;
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(title.current, { yPercent: 110, duration: 1.05 })
        .from(
          root.current.querySelectorAll<HTMLElement>("[data-cs-stagger]"),
          { opacity: 0, y: 22, duration: 0.7, stagger: 0.08 },
          0.2,
        )
        .from(
          ".cs-hero__media",
          { opacity: 0, y: 40, scale: 1.015, duration: 1.5 },
          0.35,
        );
    },
    { scope: root },
  );

  return (
    <header className="cs-hero" id="hero" ref={root}>
      <div className="cs-hero__inner">
        <Link href="/work" className="cs-hero__back" data-cs-stagger>
          <Icon name="arrow-left" /> {t("back")}
        </Link>
        <div className="cs-eyebrow-row" data-cs-stagger>
          <span className="eyebrow">{t("eyebrow")}</span>
        </div>
        <h1 className="cs-hero__title">
          <span className="cs-mask">
            <span ref={title}>{project.name}</span>
          </span>
        </h1>
        <div className="cs-hero__meta" data-cs-stagger>
          <span>{cs.platform}</span>
          <span className="sep">·</span>
          <span>{cs.year}</span>
          {cs.liveUrl && (
            <>
              <span className="sep">·</span>
              <span>{t("live")}</span>
              <span className="arr">→</span>
              <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer">
                {cs.liveLabel}
              </a>
            </>
          )}
        </div>
        <p className="cs-hero__outcome" data-cs-stagger>
          {cs.outcome.pre}
          <span className="ember-word">{cs.outcome.ember}</span>
        </p>
        <div className="cs-tags" data-cs-stagger>
          {cs.tags.map((tag) => (
            <span className="cs-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="cs-hero__media">
        <Mockup
          src={cs.heroImage}
          alt={cs.heroImageAlt ?? project.name}
          label={cs.heroBadge ?? cs.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          placeholder={`${project.name}: drop hero screenshot`}
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </header>
  );
}
