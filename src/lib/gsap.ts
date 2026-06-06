"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

// GSAP's plugins are free as of 3.13 — register once, client-side only. useGSAP
// is the React-aware context wrapper that handles cleanup on unmount / re-render.
// Only the plugins actually used ship here: ScrollTrigger (scroll-tied motion),
// SplitText (headline reveals) and DrawSVG (the drawn underline). Draggable was
// registered but never instantiated — the footer's drag uses bare pointer events
// + gsap.to — so it's dropped to keep it out of the bundle.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP };

/** Single source of truth for the reduced-motion check. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const EASE_OUT = "power3.out";
