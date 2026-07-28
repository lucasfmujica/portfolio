"use client";

import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: string;
  data?: Record<string, string>;
  children: ReactNode;
};

/**
 * TrackedAnchor's internal twin: the locale-aware next-intl `Link`, firing an
 * event on click. TrackedAnchor is a plain `<a>`, which would drop client-side
 * navigation and the locale prefix on internal links, so in-site clicks worth
 * measuring (blog index → post, service card → case study) go through this.
 */
export function TrackedLink({ event, data, children, ...props }: Props) {
  return (
    <Link {...props} onClick={() => trackEvent(event, data ?? {})}>
      {children}
    </Link>
  );
}
