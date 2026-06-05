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

      // The centre dot stays pegged to the rim of the ring, aimed in the
      // direction of the last pointer travel — it never returns to centre and
      // never slips outside. A ticker eases the angle (a smooth orbit around the
      // rim) and re-reads the ring's live size every frame, so the dot hugs the
      // current edge as the ring grows/shrinks. Default aim: straight down.
      const dotEl = el.querySelector<HTMLElement>(".cursor__dot");
      // Centre the dot on its own midpoint (it's absolutely positioned at the
      // ring centre in CSS) so the orbit offset is measured from the true centre
      // — not the grid row it used to sit in, which pushed it off-centre.
      if (dotEl) gsap.set(dotEl, { xPercent: -50, yPercent: -50 });
      let lastX = 0;
      let lastY = 0;
      let primed = false;
      let targetAngle = Math.PI / 2;
      let angle = Math.PI / 2;
      const orbit = () => {
        if (!dotEl) return;
        let diff = targetAngle - angle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // shortest way round
        angle += diff * 0.2;
        const dotR = (dotEl.offsetWidth || 4) / 2;
        // Pin the dot's outer edge just inside the ring's inner border so it
        // hugs the rim at the ring's current size and can never escape.
        const radius = Math.max(0, el.offsetWidth / 2 - 1.5 - dotR - 0.5);
        gsap.set(dotEl, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
      };
      gsap.ticker.add(orbit);

      let shown = false;
      const move = (e: MouseEvent) => {
        if (!shown) {
          shown = true;
          gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        }
        xTo(e.clientX);
        yTo(e.clientY);

        if (primed) {
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          if (Math.hypot(dx, dy) > 0.5) targetAngle = Math.atan2(dy, dx);
        }
        lastX = e.clientX;
        lastY = e.clientY;
        primed = true;
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
        // Over ember-flooded bands (e.g. Contact) the ember ring vanishes —
        // flip it to ink so it stays legible.
        const onEmber = target?.closest?.(".scheme-ember");
        // A `data-cursor` value turns the ring into a labelled pill (e.g. "View").
        const labelHost = target?.closest?.<HTMLElement>("[data-cursor]");
        const label = labelHost?.dataset.cursor || "";
        if (labelEl && label && label !== lastLabel) labelEl.textContent = label;
        lastLabel = label;
        // Only true form fields hide the ring (so the native caret shows); over
        // body text and the process cards the ring now stays, like on headings.
        el.classList.toggle("is-hidden", !!field);
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
        gsap.ticker.remove(orbit);
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
