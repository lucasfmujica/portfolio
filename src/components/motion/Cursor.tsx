"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Custom cursor — an ember ring (with a centre dot) that trails the pointer and
 * grows over interactive elements. Hides the native cursor only while active.
 * Skipped entirely on touch devices and under reduced-motion (native cursor
 * stays), so it never costs usability.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || window.matchMedia("(hover: none)").matches) return;

      document.documentElement.classList.add("has-cursor");
      gsap.set(el, { xPercent: -50, yPercent: -50 });
      // Snappy follow so it never reads as laggy.
      const xTo = gsap.quickTo(el, "x", { duration: 0.14, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.14, ease: "power3.out" });

      let shown = false;
      const move = (e: MouseEvent) => {
        if (!shown) {
          shown = true;
          gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const labelEl = el.querySelector<HTMLElement>(".cursor__label");
      // `mouseover` fires for every descendant the pointer crosses — many times
      // per sweep across a card. Recomputing (and especially rewriting the pill's
      // text, which relayouts an auto-width element) on each one thrashes the
      // main thread and stutters the cursor tween. Skip when the element hasn't
      // changed, and only touch the DOM when the resolved state actually flips.
      let lastTarget: HTMLElement | null = null;
      let lastLabel = "";
      const over = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (target === lastTarget) return;
        lastTarget = target;

        const field = target?.closest?.("input, textarea, select, [contenteditable='true']");
        const interactive = target?.closest?.("a, button, [data-cursor], .wcard, .awcard, .tst__item");
        // Over fields and selectable body text, hide the ring so the native
        // caret / I-beam shows (CSS restores it). Interactive wins over text.
        const text = !interactive && target?.closest?.("p, li, blockquote, figcaption, label, .lede");
        // Over ember-flooded bands (e.g. Contact) the ember ring vanishes —
        // flip it to ink so it stays legible.
        const onEmber = target?.closest?.(".scheme-ember");
        // A `data-cursor` value turns the ring into a labelled pill (e.g. "View").
        const labelHost = target?.closest?.<HTMLElement>("[data-cursor]");
        const label = labelHost?.dataset.cursor || "";
        if (labelEl && label && label !== lastLabel) labelEl.textContent = label;
        lastLabel = label;
        el.classList.toggle("is-hidden", !!field || !!text);
        el.classList.toggle("is-active", !!interactive && !field);
        el.classList.toggle("is-invert", !!onEmber);
        el.classList.toggle("is-label", !!label && !field);
      };
      const down = () => el.classList.add("is-down");
      const up = () => el.classList.remove("is-down");

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseover", over);
      window.addEventListener("mousedown", down);
      window.addEventListener("mouseup", up);

      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseover", over);
        window.removeEventListener("mousedown", down);
        window.removeEventListener("mouseup", up);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label" />
    </div>
  );
}
