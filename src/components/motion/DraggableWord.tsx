"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * The footer's "moves." — idle-floats like before, but the user can grab and
 * fling it; on release it springs back home with an elastic bounce and resumes
 * floating. Tilts toward the drag direction for weight. Pointer events cover
 * mouse + touch; under reduced-motion it's a plain static word.
 */
export function DraggableWord({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      let floatTween: gsap.core.Tween | undefined;
      const startFloat = () => {
        floatTween = gsap.to(el, {
          y: -9,
          rotation: -2,
          duration: 1.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      };
      startFloat();

      let dragging = false;
      let sx = 0;
      let sy = 0;
      let curX = 0;
      let curY = 0;
      // Footer bounds + the word's home box, captured on grab so the throw can
      // be clamped to keep the (rotated) word inside the section.
      const pad = 8;
      let bx = 0; // footer left/right/top/bottom, inset by pad
      let bxr = 0;
      let bty = 0;
      let bby = 0;
      let homeCx = 0; // word centre at transform 0
      let homeCy = 0;
      let halfW = 0;
      let halfH = 0;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        floatTween?.kill();
        gsap.killTweensOf(el);
        sx = e.clientX;
        sy = e.clientY;
        curX = Number(gsap.getProperty(el, "x")) || 0;
        curY = Number(gsap.getProperty(el, "y")) || 0;
        const bounds = (el.closest(".footer") ?? el.parentElement)?.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        bx = (bounds?.left ?? 0) + pad;
        bxr = (bounds?.right ?? window.innerWidth) - pad;
        bty = (bounds?.top ?? 0) + pad;
        bby = (bounds?.bottom ?? window.innerHeight) - pad;
        homeCx = (r.left + r.right) / 2 - curX;
        homeCy = (r.top + r.bottom) / 2 - curY;
        halfW = r.width / 2;
        halfH = r.height / 2;
        el.setPointerCapture?.(e.pointerId);
        el.classList.add("is-grabbing");
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        // Tilt toward the throw, then size the clamp to the *rotated* box so the
        // tilted word still can't poke past the footer (which would overflow).
        const rot = gsap.utils.clamp(-20, 20, (e.clientX - sx) * 0.14);
        const rad = (rot * Math.PI) / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        const hw = halfW * cos + halfH * sin;
        const hh = halfW * sin + halfH * cos;
        const x = gsap.utils.clamp(bx - (homeCx - hw), bxr - (homeCx + hw), curX + (e.clientX - sx));
        const y = gsap.utils.clamp(bty - (homeCy - hh), bby - (homeCy + hh), curY + (e.clientY - sy));
        gsap.set(el, { x, y, rotation: rot });
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        el.classList.remove("is-grabbing");
        // Elastic snap home, then pick the idle float back up.
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          onComplete: startFloat,
        });
      };

      el.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);

      return () => {
        floatTween?.kill();
        gsap.killTweensOf(el);
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`dragword ${className ?? ""}`.trim()} data-cursor="Drag">
      {children}
      <span className="dragword__hint" aria-hidden="true">
        drag me
      </span>
    </span>
  );
}
