"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { Wordmark } from "@/components/layout/Wordmark";

/**
 * Case-study intro curtain. Default DOM state is lifted/hidden (fail-safe — the
 * page is always visible), and the cover→lift animation only plays when motion
 * is allowed. CSS owns the keyframes (see globals.css); this just opts in.
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
    </div>
  );
}
