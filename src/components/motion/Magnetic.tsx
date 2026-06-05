"use client";

import { usePathname } from "next/navigation";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Magnetic buttons — primary CTAs (and anything tagged `[data-magnetic]`) ease
 * toward the cursor while hovered, then spring back on leave. Mounted once in
 * the layout; re-scans on route change so newly rendered buttons get wired.
 * No-op on touch / reduced-motion.
 */
export function Magnetic() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion() || window.matchMedia("(hover: none)").matches) return;

      const els = gsap.utils.toArray<HTMLElement>(".btn--primary, [data-magnetic]");
      const cleanups: Array<() => void> = [];

      els.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const strength = 0.45;

        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });

      return () => cleanups.forEach((c) => c());
    },
    { dependencies: [pathname] },
  );

  return null;
}
