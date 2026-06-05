"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Page-wide scroll progress rail — the Process comet motif, promoted to a
 * persistent top-of-page indicator. An ember fill scales with scroll progress
 * and a glowing comet rides its leading edge. The bar fades in once you leave
 * the very top, so the hero stays clean. Scroll-tied (not autoplay), so it's
 * left on under reduced-motion as a wayfinding aid.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const fill = el?.querySelector<HTMLElement>(".sprog__fill");
      const comet = el?.querySelector<HTMLElement>(".sprog__comet");
      if (!el || !fill || !comet) return;

      const setFill = gsap.quickSetter(fill, "scaleX");
      const setComet = gsap.quickSetter(comet, "x", "px");

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const p = self.progress;
          setFill(p);
          setComet(el.clientWidth * p);
          el.classList.toggle("is-live", p > 0.005);
        },
      });

      return () => st.kill();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="sprog" aria-hidden="true">
      <span className="sprog__fill" />
      <span className="sprog__comet" />
    </div>
  );
}
