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
  // The curtain must NEVER land in server-rendered HTML. `firstPaint` is
  // module-scoped and shared across SSR requests, so on a warm server it leaks
  // `false` and renders the curtain server-side — but the freshly-loaded client
  // always starts at `firstPaint === true` and renders nothing, so the two
  // disagree (hydration mismatch + a curtain flash on initial load). Gating on
  // `window` keeps both SSR and the hydration render deterministically
  // curtain-less; the curtain only ever shows on later client navigations.
  const showCurtain = useRef(typeof window !== "undefined" && !firstPaint);
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
