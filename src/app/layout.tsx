import type { ReactNode } from "react";

/**
 * Pass-through root layout.
 *
 * The real document shell (<html>/<body>, fonts, providers) lives in
 * [locale]/layout.tsx. This file exists only so the global app/not-found.tsx
 * has a root layout above it — without it, Next warns "not-found.tsx doesn't
 * have a root layout." It renders nothing of its own (the not-found page and
 * the locale layout each provide their own <html>), so there's no duplicate
 * shell.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
