"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

// GSAP's full plugin suite (incl. SplitText + DrawSVG + Draggable) is free as of
// 3.13 — register once, client-side only. useGSAP is the React-aware context
// wrapper that handles cleanup on unmount / re-render.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Draggable, useGSAP);
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Draggable, useGSAP };

/** Single source of truth for the reduced-motion check. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const EASE_OUT = "power3.out";
