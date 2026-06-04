"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";

/**
 * Hero. The headline reveals line-by-line via SplitText (masked y-translate);
 * the pill, sub and CTAs stagger up; the browser visual + floating badges fade
 * in. The availability dot pulses and the IDE mock animates via CSS (see
 * globals.css). Reduced-motion shows everything immediately.
 */
export function Hero() {
  const t = useTranslations("Hero");
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;

      const split = new SplitText(heading.current, {
        type: "lines",
        mask: "lines",
        linesClass: "hero__line",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(split.lines, { yPercent: 110, duration: 0.95, stagger: 0.1 })
        .from(
          root.current.querySelectorAll<HTMLElement>("[data-hero-stagger]"),
          { opacity: 0, y: 24, duration: 0.7, stagger: 0.1 },
          0.35,
        )
        .from(
          ".hero__visual",
          { opacity: 0, y: 30, scale: 0.985, duration: 1.0 },
          0.3,
        )
        .from(
          [".hero__chip", ".hero__fps"],
          { opacity: 0, y: 10, duration: 0.6, stagger: 0.12 },
          0.9,
        );

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <header className="hero" id="hero" ref={root}>
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__pill" data-hero-stagger>
            <span className="hero__dot" /> {t("available")}
          </div>
          <h1 ref={heading}>
            {t("line1")}
            <br />
            {t("line2")}
            <br />
            <span className="ember-word">{t("line3")}</span>
          </h1>
          <p className="hero__sub" data-hero-stagger>
            {t("sub")}
          </p>
          <div className="hero__cta" data-hero-stagger>
            <a href="/#contact" className="btn btn--primary">
              {t("ctaPrimary")} <Icon name="arrow-right" />
            </a>
            <a href="/#work" className="btn btn--ghost">
              {t("ctaGhost")}
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="browser">
            <div className="browser__bar">
              <span className="browser__dots">
                <i />
                <i />
                <i />
              </span>
              <span className="browser__url">
                <Icon name="verified" className="browser__lock" />
                <span>lucasmujica.dev</span>
              </span>
            </div>
            <div className="browser__screen">
              <div className="hp-build">
                <div className="wf-rail">
                  <span className="wf-ico is-active" />
                  <span className="wf-ico" />
                  <span className="wf-ico" />
                  <span className="wf-ico" />
                  <span className="wf-ico" />
                </div>
                <div className="wf-canvas">
                  <div className="wf-site">
                    <div className="wf-nav">
                      <span className="wf-logo" />
                      <span className="wf-links">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="wf-btn" />
                    </div>
                    <div className="wf-hero">
                      <span className="wf-bar w70" />
                      <span className="wf-bar w90" />
                      <span className="wf-bar w45 ember" />
                      <span className="wf-sub" />
                      <span className="wf-cta" />
                    </div>
                    <div className="wf-cards">
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="wf-select">
                    <span className="wf-label">Div Block</span>
                    <i className="wf-h tl" />
                    <i className="wf-h tr" />
                    <i className="wf-h bl" />
                    <i className="wf-h br" />
                  </div>
                </div>
                <div className="wf-style">
                  <span className="wf-row">
                    <b />
                    <u />
                  </span>
                  <span className="wf-row">
                    <b />
                    <u />
                  </span>
                  <span className="wf-swatches">
                    <i />
                    <i />
                    <i className="ember" />
                    <i />
                  </span>
                  <span className="wf-slider">
                    <i />
                  </span>
                  <span className="wf-row">
                    <b />
                    <u />
                  </span>
                  <span className="wf-slider">
                    <i />
                  </span>
                </div>
              </div>
              <span className="browser__scan" />
            </div>
          </div>
          <span className="hero__chip">
            <span className="hero__chip-dot" />
            {t("chip")}
          </span>
          <span className="hero__fps">{t("fps")}</span>
        </div>
      </div>
      <a href="/#work" className="hero__scroll">
        {t("scroll")} <Icon name="arrow-down" />
      </a>
    </header>
  );
}
