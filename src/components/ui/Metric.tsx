"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * A single results metric whose number counts up from 0 when it scrolls into
 * view. If the value isn't purely numeric (e.g. "A1–C2") it just renders as-is.
 * Mirrors the home stat count-up, scoped per case study.
 */
export function Metric({ value, unit, label }: { value: string; unit?: string; label: string }) {
  const numRef = useRef<HTMLDivElement>(null);
  const target = Number(value);
  const numeric = value.trim() !== "" && !Number.isNaN(target);

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el || !numeric || prefersReducedMotion()) return;
      const counter = { v: 0 };
      gsap.to(counter, {
        v: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.firstChild!.textContent = String(Math.round(counter.v));
        },
      });
    },
    { scope: numRef },
  );

  return (
    <div className="cs-metric">
      <div className="cs-metric__n" ref={numRef}>
        <span>{numeric ? "0" : value}</span>
        {unit && <span className="u">{unit}</span>}
      </div>
      <div className="cs-metric__l">{label}</div>
    </div>
  );
}
