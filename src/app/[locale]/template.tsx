"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Curtain } from "@/components/case-study/Curtain";

/**
 * Route transition. `template.tsx` remounts on every navigation, so the ink
 * curtain (branded wordmark wipe) plays on each page change — home ⇄ work ⇄
 * case study — with a quick content fade underneath. The curtain is skipped on
 * the very first paint (initial load) so it never delays first content, and the
 * whole thing is a no-op under reduced motion.
 */
let firstPaint = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // `firstPaint` is module-scoped, so it stays false after the initial load and
  // the curtain only plays on subsequent client navigations.
  const showCurtain = useRef(!firstPaint);
  firstPaint = false;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    },
    { scope: ref },
  );

  return (
    <>
      {showCurtain.current && <Curtain />}
      <div ref={ref}>{children}</div>
    </>
  );
}
