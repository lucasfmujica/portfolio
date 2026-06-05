"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * A heading that reveals line-by-line from behind a mask when it scrolls into
 * view — the Hero's signature treatment, promoted to a reusable section-heading
 * motif so every major heading shares the same entrance.
 *
 * Fail-safe: under reduced-motion / JS-off the text just shows (no split).
 */
export function MaskHeading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = new SplitText(el, {
        type: "lines",
        mask: "lines",
        linesClass: "mh__line",
      });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return createElement(Tag, { ref, className }, children);
}
