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

      let drift: gsap.core.Timeline | undefined;
      let cycle: gsap.core.Timeline | undefined;

      // After the headline reveals, the last word rolls through the value props
      // and resolves back on "move." — which then drifts forever. The brand
      // promise stays literally in motion (and the footer echoes it: "moves.").
      const startCycle = () => {
        // Revert FIRST, then query: SplitText's mask mode rebuilds the heading's
        // markup on revert, so any node grabbed earlier is now detached. Querying
        // after revert is what makes the word actually animate.
        split.revert();
        const slot = heading.current?.querySelector<HTMLElement>(".hero__cycle");
        const inner = heading.current?.querySelector<HTMLElement>(".hero__cycle-inner");
        if (!slot || !inner) return;
        const words = ["convert.", "scale.", "last.", "move."];
        cycle = gsap.timeline({ delay: 0.9 });
        words.forEach((word, i) => {
          cycle!
            .to(inner, { yPercent: -120, duration: 0.4, ease: "power2.in" })
            .add(() => {
              inner.textContent = word;
            })
            .set(inner, { yPercent: 120 })
            .to(inner, { yPercent: 0, duration: 0.55, ease: "power3.out" });
          if (i < words.length - 1) cycle!.to({}, { duration: 1.15 });
        });
        cycle!.add(() => {
          gsap.set(slot, { overflow: "visible", transformOrigin: "0% 100%" });
          drift = gsap
            .timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
            .to(slot, { y: -8, duration: 1.9 })
            .to(slot, { x: 5, duration: 1.9 }, 0)
            .to(slot, { rotation: -2.5, duration: 1.9 }, 0);
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: startCycle,
      });
      // Keep the masked reveal but make it snappy: the <h1> is the mobile LCP
      // element, so a shorter reveal lets it settle sooner (better LCP) while
      // still reading as a deliberate line-by-line entrance.
      tl.from(split.lines, { yPercent: 110, duration: 0.62, stagger: 0.07 })
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

      return () => {
        cycle?.kill();
        drift?.kill();
        split.revert();
      };
    },
    { scope: root },
  );

  return (
    <header className="hero" id="hero" ref={root}>
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow" data-hero-stagger>
            <span className="hero__eyebrow-mark" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h1 ref={heading}>
            {t("line1")}
            <br />
            {t("line2")}
            <br />
            <span className="ember-word hero__cycle">
              <span className="hero__cycle-inner">{t("line3")}</span>
            </span>
          </h1>
          <p className="hero__sub" data-hero-stagger>
            {t("sub")}
          </p>
          <div className="hero__cta" data-hero-stagger>
            <a href="#contact" className="btn btn--primary">
              {t("ctaPrimary")} <Icon name="arrow-right" />
            </a>
            <a href="/#work" className="btn btn--ghost">
              {t("ctaGhost")}
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="browser" data-parallax="0.08">
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
