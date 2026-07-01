"use client";

import { useLocale } from "next-intl";
import { track } from "@vercel/analytics";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const CODE: Record<Locale, string> = { en: "EN", es: "ES" };
const NAME: Record<Locale, string> = { en: "English", es: "Español" };

/**
 * Locale dropdown. Renders as a quiet "ES ▾" trigger so it doesn't compete with
 * the nav CTA; clicking opens a small menu to switch locale while staying on the
 * current route (next-intl's locale-aware router rewrites the path, so the
 * visitor isn't bounced home). `usePathname` here is locale-stripped, so the
 * same pathname maps cleanly onto the target locale.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (loc: Locale) => {
    setOpen(false);
    if (loc === active) return;
    track("language_switch", { from: active, to: loc });
    startTransition(() => router.replace(pathname, { locale: loc }));
  };

  return (
    <div className={["locale", className].filter(Boolean).join(" ")} ref={ref}>
      <button
        type="button"
        className="locale__toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language — ${NAME[active]}`}
        disabled={isPending}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{CODE[active]}</span>
        <svg className="locale__caret" width="9" height="6" viewBox="0 0 9 6" aria-hidden="true">
          <path
            d="M1 1l3.5 3.5L8 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul className="locale__menu" role="listbox" aria-label="Language" data-open={open}>
        {routing.locales.map((loc) => (
          <li key={loc} role="option" aria-selected={loc === active}>
            <button
              type="button"
              className={`locale__opt${loc === active ? " is-active" : ""}`}
              onClick={() => select(loc)}
            >
              <span className="locale__code">{CODE[loc]}</span>
              <span className="locale__name">{NAME[loc]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
