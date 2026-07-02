"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Case-study engagement tracking. Fires two Vercel Analytics events:
 *
 *   • `case_study_view` — once on mount (the study was opened)
 *   • `case_study_read` — once when the sentinel (placed at the end of the
 *     actual case-study content, before the "next project" upsell) scrolls into
 *     view, i.e. the visitor read to the bottom.
 *
 * Renders an invisible 1px sentinel; no visual footprint.
 */
export function CaseStudyReadTracker({ slug }: { slug: string }) {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("case_study_view", { slug });

    const el = sentinel.current;
    if (!el) return;

    let done = false;
    const obs = new IntersectionObserver((entries) => {
      if (done || !entries.some((e) => e.isIntersecting)) return;
      done = true;
      trackEvent("case_study_read", { slug });
      obs.disconnect();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [slug]);

  return <div ref={sentinel} aria-hidden="true" style={{ height: 1 }} />;
}
