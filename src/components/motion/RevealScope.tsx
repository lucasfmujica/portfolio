"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface RevealScopeProps {
  children: ReactNode;
  /** Element to render as the scope root. Default: div. */
  as?: ElementType;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

/**
 * Scroll-reveal coordinator. Any descendant with `data-reveal` fades + lifts
 * into place on scroll-in; `data-reveal-delay="1..4"` staggers it (matching the
 * design's `data-d` rhythm of ~0.08s steps).
 *
 * Fail-safe: content is visible by default (`.reveal { opacity: 1 }`). GSAP
 * only sets the hidden start-state when motion is allowed, so JS failure or
 * reduced-motion leaves everything fully shown.
 */
export function RevealScope({
  children,
  as: Tag = "div",
  className,
  id,
  ...rest
}: RevealScopeProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;
      const revealY =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--reveal-y"),
          10,
        ) || 26;
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current);
      els.forEach((el) => {
        const step = Number(el.dataset.revealDelay ?? 0) * 0.08;
        gsap.from(el, {
          opacity: 0,
          y: revealY,
          duration: 0.9,
          ease: "power3.out",
          delay: step,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope },
  );

  // createElement keeps the ref loosely typed across the polymorphic `as` tag.
  return createElement(Tag, { ref: scope, className, id, ...rest }, children);
}
