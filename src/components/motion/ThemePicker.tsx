"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Accent picker — a fixed bottom-right pill that invites a tap and lets the
 * visitor recolour the whole site. Every accent in the design flows from a
 * handful of CSS custom properties (--ember + derivatives), so swapping the base
 * hex and re-deriving hover/deep/tint/glow via color-mix repaints everything:
 * buttons, hover glows, blobs, sparks, the cursor — all of it. The choice is
 * stored in localStorage and re-applied before paint by an inline script in the
 * layout head, so there's no flash on reload.
 */

const STORE_KEY = "lm-accent";

type Accent = { id: string; name: string; hex: string };

// First entry is the default (matches the :root values in globals.css).
const ACCENTS: Accent[] = [
  { id: "ember", name: "Ember", hex: "#FF4D2E" },
  { id: "lime", name: "Lime", hex: "#BEF264" },
  { id: "azure", name: "Azure", hex: "#54A0FF" },
  { id: "amber", name: "Amber", hex: "#FFB23E" },
];

const DEFAULT_HEX = ACCENTS[0].hex;

/** Push a base hex into the live CSS variables (or clear them for default). */
function applyAccent(hex: string) {
  const d = document.documentElement.style;
  if (hex.toLowerCase() === DEFAULT_HEX.toLowerCase()) {
    // Fall back to the hand-tuned :root values.
    for (const prop of [
      "--ember",
      "--ember-hover",
      "--ember-deep",
      "--ember-tint",
      "--glow-ember",
    ]) {
      d.removeProperty(prop);
    }
    return;
  }
  d.setProperty("--ember", hex);
  d.setProperty("--ember-hover", `color-mix(in srgb, ${hex}, black 12%)`);
  d.setProperty("--ember-deep", `color-mix(in srgb, ${hex}, black 70%)`);
  d.setProperty("--ember-tint", `color-mix(in srgb, ${hex}, white 76%)`);
  d.setProperty("--glow-ember", `0 14px 50px -16px color-mix(in srgb, ${hex}, transparent 45%)`);
}

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(DEFAULT_HEX);
  const rootRef = useRef<HTMLDivElement>(null);

  // Sync UI state to whatever the inline script already applied.
  useEffect(() => {
    const saved = (() => {
      try {
        return localStorage.getItem(STORE_KEY);
      } catch {
        return null;
      }
    })();
    if (saved && ACCENTS.some((a) => a.hex.toLowerCase() === saved.toLowerCase())) {
      setCurrent(saved);
      // Re-assert the vars after hydration — guards against React reconciling
      // away the inline-style set by the head script (and dev Fast Refresh).
      applyAccent(saved);
    }
  }, []);

  // Dismiss on outside-click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(hex: string) {
    setCurrent(hex);
    applyAccent(hex);
    try {
      localStorage.setItem(STORE_KEY, hex);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="accent-picker" ref={rootRef} data-open={open || undefined}>
      <div className="accent-panel" role="dialog" aria-label="Accent colour" aria-hidden={!open}>
        <p className="accent-panel__title">Pick an accent</p>
        <div className="accent-swatches">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              className="accent-swatch"
              style={{ ["--sw" as string]: a.hex }}
              aria-pressed={current.toLowerCase() === a.hex.toLowerCase()}
              aria-label={a.name}
              title={a.name}
              onClick={() => pick(a.hex)}
            >
              <span className="accent-swatch__dot" />
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="accent-toggle"
        aria-expanded={open}
        aria-label={open ? "Close accent picker" : "Change accent colour"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="accent-toggle__swatch" style={{ background: current }} aria-hidden="true" />
        <svg
          className="accent-toggle__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.36-.6-.36-.99 0-.83.67-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="7.5" cy="11.5" r="1.3" fill="currentColor" />
          <circle cx="12" cy="8" r="1.3" fill="currentColor" />
          <circle cx="16.5" cy="11.5" r="1.3" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
