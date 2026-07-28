"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires `event` once, the first time an invisible 1px sentinel scrolls into
 * view. Lets a Server Component section report that it was actually reached,
 * without turning the whole section into a client component (same trick as
 * ReadTracker).
 *
 * Why this exists: the contact section lives on the home page under `#contact`,
 * so reaching it produces no `page_view`. Without this the funnel jumps
 * straight from "landed on the home page" to "touched the form", which can't
 * distinguish "nobody scrolls that far" from "they get there and bail" — two
 * problems with opposite fixes.
 *
 * The fired flag is a ref rather than an effect local so a re-run can't produce
 * a second event.
 */
export function SectionViewTracker({ event }: { event: string }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      if (fired.current || !entries.some((e) => e.isIntersecting)) return;
      fired.current = true;
      trackEvent(event);
      obs.disconnect();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [event]);

  return <div ref={sentinel} aria-hidden="true" style={{ height: 1 }} />;
}
