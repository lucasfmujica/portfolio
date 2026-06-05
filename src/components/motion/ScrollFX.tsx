"use client";

import { usePathname } from "next/navigation";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-driven flourishes, wired once per route:
 *  - `[data-parallax]`  → depth: the element drifts against the scroll (the
 *    number sets the strength, e.g. data-parallax="0.18").
 * No-op under reduced-motion.
 */
export function ScrollFX() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Parallax depth.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { dependencies: [pathname] },
  );

  return null;
}
