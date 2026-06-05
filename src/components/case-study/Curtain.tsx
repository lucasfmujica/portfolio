"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { Wordmark } from "@/components/layout/Wordmark";

/**
 * Page-transition curtain (rendered by template.tsx on every client navigation).
 * The ink panel covers, the "Lucas Mujica." mark pops in with a springy
 * overshoot, then the panel wipes up with an ember edge leading the reveal.
 * Default DOM state is lifted/hidden (fail-safe: the page is always visible);
 * the animation is pure CSS and only opts in when motion is allowed.
 */
export function Curtain() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    ref.current?.classList.add("intro");
  }, []);
  return (
    <div className="cs-curtain" ref={ref} aria-hidden="true">
      <Wordmark className="cs-curtain__mark" dotClass="e" />
      <span className="cs-curtain__edge" />
    </div>
  );
}
