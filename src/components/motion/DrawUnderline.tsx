"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Wraps text with a hand-drawn ember underline that strokes on (DrawSVG) when it
 * scrolls into view. Under reduced-motion the line is simply shown, fully drawn.
 */
export function DrawUnderline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const path = ref.current?.querySelector("path");
      if (!path) return;
      if (prefersReducedMotion()) {
        gsap.set(path, { drawSVG: "100%" });
        return;
      }
      gsap.fromTo(
        path,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <span className="draw-ul" ref={ref}>
      {children}
      <svg className="draw-ul__svg" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
        <path d="M1 5.5 C 18 2.5, 40 7, 60 4.2 S 88 2.8, 99 5" />
      </svg>
    </span>
  );
}
