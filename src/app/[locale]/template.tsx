"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Route transition. `template.tsx` remounts on every navigation, so a quick
 * fade here gives a clean home ⇄ case-study transition that layers under the
 * case-study intro curtain. No-op under reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    },
    { scope: ref },
  );
  return <div ref={ref}>{children}</div>;
}
