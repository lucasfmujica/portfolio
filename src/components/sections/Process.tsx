"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

interface Step {
  n: string;
  icon: IconName;
  title: string;
  body: string;
}

/**
 * Process — a pinned-rail walkthrough. The heading column sticks while the
 * three phases scroll past on the right; a vertical ember rail draws top→down
 * as you scroll (scrubbed), and each node ignites as it passes mid-viewport.
 * Reduced-motion / JS-off: rail fully drawn, every node lit, no pinning.
 */
export function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Step[];
  const root = useRef<HTMLElement>(null);
  const flow = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || !flow.current) return;
      const flowEl = flow.current;
      const track = flowEl.querySelector<HTMLElement>(".pflow__track");
      const rail = flowEl.querySelector<HTMLElement>(".pflow__rail");
      const fill = flowEl.querySelector<HTMLElement>(".pflow__fill");
      const stepEls = gsap.utils.toArray<HTMLElement>(".pstep", flowEl);
      const reduce = prefersReducedMotion();

      // Pin the rail line exactly between the first and last node centers so it
      // never overhangs the list, regardless of how long each body runs.
      const sizeRail = () => {
        if (!rail || !track || stepEls.length < 2) return;
        const first = stepEls[0].querySelector<HTMLElement>(".pstep__node");
        const last = stepEls[stepEls.length - 1].querySelector<HTMLElement>(".pstep__node");
        if (!first || !last) return;
        const base = track.getBoundingClientRect().top;
        const fr = first.getBoundingClientRect();
        const lr = last.getBoundingClientRect();
        const top = fr.top + fr.height / 2 - base;
        const bottom = lr.top + lr.height / 2 - base;
        rail.style.top = `${top}px`;
        rail.style.height = `${bottom - top}px`;
      };
      sizeRail();

      if (reduce) {
        flowEl.classList.add("play");
        stepEls.forEach((s) => s.classList.add("is-active"));
        if (fill) gsap.set(fill, { scaleY: 1 });
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

      // Each phase slides up as it enters.
      stepEls.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: revealY,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 86%", once: true },
        });
      });

      // The ember rail draws down as you scroll through the column.
      if (fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 58%",
              end: "bottom 62%",
              scrub: 0.4,
            },
          },
        );
      }

      // Nodes ignite in sequence as the rail tip reaches them; reversible.
      stepEls.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          onEnter: () => step.classList.add("is-active"),
          onLeaveBack: () => step.classList.remove("is-active"),
        });
      });

      // Keep the rail geometry honest across resizes / font swaps.
      ScrollTrigger.addEventListener("refreshInit", sizeRail);
      return () => ScrollTrigger.removeEventListener("refreshInit", sizeRail);
    },
    { scope: root },
  );

  return (
    <section className="section process" id="process" ref={root}>
      <div className="container process__grid">
        <div className="process__aside">
          <span className="eyebrow" data-reveal>{t("eyebrow")}</span>
          <MaskHeading>{t("heading")}</MaskHeading>
          <p className="lede" data-reveal data-reveal-delay="1">{t("lede")}</p>
        </div>

        <div className="pflow" ref={flow}>
          <ol className="pflow__track">
            <div className="pflow__rail" aria-hidden="true">
              <span className="pflow__fill" />
            </div>
            {steps.map((step) => (
              <li className="pstep" key={step.n}>
                <div className="pstep__node">
                  <Icon name={step.icon} className="pstep__ic" />
                </div>
                <div className="pstep__body">
                  <span className="pstep__n">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
