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

      const onDown = (e: PointerEvent) => {
        dragging = true;
        floatTween?.kill();
        gsap.killTweensOf(el);
        sx = e.clientX;
        sy = e.clientY;
        el.setPointerCapture?.(e.pointerId);
        el.classList.add("is-grabbing");
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        // Cap the throw so it can't be flung far enough to overflow the page.
        const max = Math.min(window.innerWidth * 0.3, 200);
        const dx = gsap.utils.clamp(-max, max, e.clientX - sx);
        const dy = gsap.utils.clamp(-max, max, e.clientY - sy);
        gsap.set(el, { x: dx, y: dy, rotation: gsap.utils.clamp(-20, 20, dx * 0.14) });
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
