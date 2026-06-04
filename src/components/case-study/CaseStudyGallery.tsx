"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ImageFill } from "@/components/ui/ImageFill";
import type { CaseStudyShot } from "@/data/projects";

/**
 * The "what I built" gallery — stacked figures with scroll-tied parallax on the
 * inner image (±34px) and a fade-up reveal per figure. Reduced-motion shows
 * static figures (CSS resets the parallax inset).
 */
export function CaseStudyGallery({ shots }: { shots: CaseStudyShot[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;

      gsap.utils.toArray<HTMLElement>(".cs-shot", root.current).forEach((shot) => {
        gsap.from(shot, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: shot, start: "top 88%", once: true },
        });
        const inner = shot.querySelector<HTMLElement>(".cs-shot__inner");
        if (inner) {
          gsap.fromTo(
            inner,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <div className="cs-gallery" ref={root}>
      {shots.map((shot) => (
        <figure className="cs-shot" key={shot.n}>
          <div className="cs-shot__frame">
            <span className="cs-shot__num">{shot.n}</span>
            <div className="cs-shot__inner">
              <ImageFill
                src={shot.image}
                alt={shot.label}
                placeholder={shot.placeholder}
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          </div>
          <figcaption className="cs-shot__cap">
            <span className="k">{shot.label}</span>
            <p className="t">
              <b>{shot.lead}</b>
              {shot.body}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
