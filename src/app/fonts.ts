import localFont from "next/font/local";

/**
 * Self-hosted fonts via next/font/local — zero Google Fonts requests, no
 * layout shift (CSS size-adjust fallbacks are generated automatically).
 * Each family is exposed as a CSS variable consumed by the Tailwind theme
 * and the ported component styles.
 *
 * Only the weights actually shipped in the export are declared:
 *   Clash Display — 500 / 600 / 700
 *   General Sans  — 400 / 500
 *   Geist Mono    — 400
 */

export const clashDisplay = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  fallback: ["Space Grotesk", "system-ui", "sans-serif"],
});

export const generalSans = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../../public/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
  ],
  fallback: ["Hanken Grotesk", "system-ui", "sans-serif"],
});

export const geistMono = localFont({
  variable: "--font-mono",
  display: "swap",
  // Mono only drives small labels (eyebrow, fps, scroll). Don't preload it, so
  // the display + body fonts behind the LCP heading win mobile bandwidth; the
  // few mono captions swap in from the system mono fallback a beat later.
  preload: false,
  src: [{ path: "../../public/fonts/GeistMono-Regular.woff2", weight: "400", style: "normal" }],
  fallback: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
});
