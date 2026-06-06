"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Mockup } from "@/components/ui/Mockup";
import type { CaseStudyShot } from "@/data/projects";

/**
 * Native aspect ratio per screenshot, so each frame matches its image exactly
 * and `object-fit: cover` crops nothing. Keyed by the asset basename — mirror
 * the real file dimensions here when adding or swapping a shot.
 */
const SHOT_ASPECT: Record<string, string> = {
  "truenorth-shot1": "1400 / 786",
  "truenorth-shot2": "1400 / 816",
  "truenorth-shot3": "1400 / 824",
  "k2btools-shot1": "1400 / 713",
  "k2btools-shot2": "1400 / 812",
  "k2btools-shot3": "1400 / 967",
  "bike-shot1": "1400 / 822",
  "bike-shot2": "1400 / 652",
  "bike-shot3": "1400 / 673",
  "homeorganizers-shot1": "1400 / 697",
  "homeorganizers-shot2": "1400 / 719",
  "homeorganizers-shot3": "1400 / 719",
  "nextfense-shot1": "1400 / 814",
  "nextfense-shot2": "1400 / 782",
  "nextfense-shot3": "1400 / 782",
  "seilas-card": "1400 / 878",
  "seilas-history": "1710 / 948",
};

const aspectFor = (src?: string): string | undefined => {
  const base = src?.match(/\/([^/]+)\.[a-z]+$/i)?.[1];
  return base ? SHOT_ASPECT[base] : undefined;
};

/**
 * The "what I built" gallery — stacked figures, each sized to its screenshot's
 * native proportion (no cropping) with a fade-up reveal per figure.
 */
export function CaseStudyGallery({
  shots,
  aspect,
  projectName,
  label,
}: {
  shots: CaseStudyShot[];
  aspect?: string;
  /** Prefixes each screenshot's alt text so it reads in isolation. */
  projectName?: string;
  /** Live domain shown in each shot's browser-mockup URL bar. */
  label?: string;
}) {
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
      });
    },
    { scope: root },
  );

  return (
    <div className="cs-gallery" ref={root}>
      {shots.map((shot) => {
        const ratio = aspectFor(shot.image) ?? aspect;
        return (
          <figure className="cs-shot" key={shot.n}>
            <div
              className="cs-shot__frame"
              style={ratio ? ({ "--cs-shot-aspect": ratio } as CSSProperties) : undefined}
            >
              <Mockup
                src={shot.image}
                alt={projectName ? `${projectName} — ${shot.lead}` : shot.lead}
                label={label}
                badge={shot.n}
                placeholder={shot.placeholder}
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
            <figcaption className="cs-shot__cap">
              <span className="k">{shot.label}</span>
              <p className="t">
                <b>{shot.lead}</b>
                {shot.body}
              </p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
