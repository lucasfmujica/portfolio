"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  data?: Record<string, string>;
  children: ReactNode;
};

/**
 * A plain anchor that fires a Vercel Analytics event on click. Lets us keep the
 * surrounding section a Server Component while still tracking outbound clicks
 * (mailto, socials). Navigation is untouched — the event is fire-and-forget.
 */
export function TrackedAnchor({ event, data, children, ...props }: Props) {
  return (
    <a {...props} onClick={() => track(event, data ?? {})}>
      {children}
    </a>
  );
}
