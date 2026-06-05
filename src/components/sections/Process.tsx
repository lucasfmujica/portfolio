"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

interface Step {
  n: string;
  icon: IconName;
  title: string;
  body: string;
}

/**
 * Process — a horizontal connected stepper. The ember rail draws left→right
 * with a comet, and the three nodes light up in sequence (CSS transitions,
 * triggered by adding `.play`). Reveals the heading; reduced-motion plays
 * immediately.
 */
export function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Step[];
  const root = useRef<HTMLElement>(null);
  const flow = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const reduce = prefersReducedMotion();

      if (reduce) {
        flow.current?.classList.add("play");
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
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.to(flow.current, {
        scrollTrigger: {
          trigger: flow.current,
          start: "top 70%",
          once: true,
          onEnter: () => flow.current?.classList.add("play"),
        },
      });
    },
    { scope: root },
  );

  return (
    <section className="section process" id="process" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow" data-reveal>{t("eyebrow")}</span>
          <MaskHeading>{t("heading")}</MaskHeading>
          <p className="lede" data-reveal data-reveal-delay="1">{t("lede")}</p>
        </div>
        <div className="pflow" ref={flow}>
          <div className="pflow__rail" aria-hidden="true">
            <span className="pflow__fill" />
            <span className="pflow__comet" />
          </div>
          <div className="pflow__steps">
            {steps.map((step) => (
              <div className="pstep" key={step.n}>
                <div className="pstep__node">
                  <Icon name={step.icon} className="pstep__ic" />
                </div>
                <span className="pstep__n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
