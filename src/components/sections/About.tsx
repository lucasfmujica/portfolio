"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ImageFill } from "@/components/ui/ImageFill";
import { CertBadge } from "@/components/ui/CertBadge";

const STATS = [
  { target: 5, suffix: "+", labelKey: "statYears" as const },
  { target: 100, suffix: "+", labelKey: "statProjects" as const },
];

export function About() {
  const t = useTranslations("About");
  const cred = t.raw("cred") as string[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const timeline = root.current.querySelector<HTMLElement>(".stats--timeline");

      if (prefersReducedMotion()) {
        // No scroll triggers under reduced-motion — show the rail fully drawn.
        timeline?.classList.add("play");
        return;
      }
      const revealY =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue("--reveal-y"), 10) ||
        26;

      gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: revealY,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay ?? 0) * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Count-up stats.
      gsap.utils.toArray<HTMLElement>("[data-count]", root.current).forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            el.innerHTML = `${Math.round(counter.v)}<span class="plus">${suffix}</span>`;
          },
        });
      });

      // Timeline rail draws + nodes light in sequence as the stats enter view,
      // synced with the count-up (the Process comet motif, reused here).
      if (timeline) {
        ScrollTrigger.create({
          trigger: timeline,
          start: "top 85%",
          once: true,
          onEnter: () => timeline.classList.add("play"),
        });
      }
    },
    { scope: root },
  );

  return (
    <section className="section about" id="about" ref={root}>
      <div className="container about__grid">
        <div className="about__portrait" data-reveal>
          <ImageFill
            src="/assets/portrait.webp"
            alt="Lucas Mujica"
            placeholder={t("portraitPlaceholder")}
            sizes="(max-width: 860px) 100vw, 40vw"
          />
        </div>
        <div className="about__body">
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 data-reveal data-reveal-delay="1">
            {t("heading")}
          </h2>
          <p className="lede" data-reveal data-reveal-delay="1">
            {t("lede")}
          </p>
          <div className="stats stats--timeline" data-reveal data-reveal-delay="2">
            <span className="stats__rail" aria-hidden="true">
              <span className="stats__fill" />
              <span className="stats__comet" />
            </span>
            {STATS.map((s) => (
              <div className="stat" key={s.labelKey}>
                <span className="stat__node" aria-hidden="true" />
                <div className="stat__num" data-count={s.target} data-suffix={s.suffix}>
                  0<span className="plus">{s.suffix}</span>
                </div>
                <div className="stat__lbl">{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
          <div className="about__cred" data-reveal data-reveal-delay="2">
            {cred.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <div className="about__cert" data-reveal data-reveal-delay="2">
            <CertBadge />
          </div>

          <div className="about__actions" data-reveal data-reveal-delay="3">
            <a href="/#contact" className="btn btn--primary">
              {t("ctaPrimary")}
            </a>
            <a href="/#work" className="btn btn--ghost">
              {t("ctaGhost")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
