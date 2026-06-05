"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-driven flourishes, wired once per route:
 *  - `[data-parallax]`  → depth: the element drifts against the scroll (the
 *    number sets the strength, e.g. data-parallax="0.18").
 *  - `[data-skew]`      → the element skews with scroll velocity and eases back
 *    to flat when the scroll settles.
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

      // Skew by scroll velocity.
      const skewers = gsap.utils.toArray<HTMLElement>("[data-skew]");
      if (skewers.length) {
        const setters = skewers.map((el) => gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3.out" }));
        let resetTimer = 0;
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-7, 7, self.getVelocity() / -260);
            setters.forEach((s) => s(v));
            window.clearTimeout(resetTimer);
            resetTimer = window.setTimeout(() => setters.forEach((s) => s(0)), 90);
          },
        });
        return () => {
          window.clearTimeout(resetTimer);
          st.kill();
        };
      }
    },
    { dependencies: [pathname] },
  );

  return null;
}
