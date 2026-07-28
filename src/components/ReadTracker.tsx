"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Long-form engagement tracking, shared by case studies and blog posts. Fires
 * two events:
 *
 *   • `viewEvent` — once on mount (the piece was opened)
 *   • `readEvent` — once when the sentinel scrolls into view. Place the
 *     component at the end of the actual content, before any "next / related"
 *     upsell, so the read event means they finished the piece itself.
 *
 * Renders an invisible 1px sentinel; no visual footprint. `data` is spread onto
 * both events (in practice `{ slug }`), so a single GA4 dimension covers them.
 */
export function ReadTracker({
  viewEvent,
  readEvent,
  data,
}: {
  viewEvent: string;
  readEvent: string;
  data?: Record<string, string>;
}) {
  const sentinel = useRef<HTMLDivElement>(null);
  // Serialized so the effect can depend on the values without re-running on
  // every render just because the object literal is new.
  const key = JSON.stringify(data ?? {});

  useEffect(() => {
    const params = JSON.parse(key) as Record<string, string>;
    trackEvent(viewEvent, params);

    const el = sentinel.current;
    if (!el) return;

    let done = false;
    const obs = new IntersectionObserver((entries) => {
      if (done || !entries.some((e) => e.isIntersecting)) return;
      done = true;
      trackEvent(readEvent, params);
      obs.disconnect();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [viewEvent, readEvent, key]);

  return <div ref={sentinel} aria-hidden="true" style={{ height: 1 }} />;
}
