"use client";

import { useEffect } from "react";
import { captureLeadSource } from "@/lib/leadSource";

/**
 * Renders nothing — its only job is to capture the visitor's first-touch
 * source once, as early as possible in the session. Mounted in the root layout.
 */
export function LeadSourceTracker() {
  useEffect(() => {
    captureLeadSource();
  }, []);
  return null;
}
