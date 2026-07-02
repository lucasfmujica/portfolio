"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const KEY = "consent";

/**
 * Cookie-consent banner for Google Analytics. GA4 boots with Consent Mode
 * defaulted to "denied" (see GoogleAnalytics), so no analytics cookies are set
 * until the visitor accepts here. The choice is remembered in localStorage; on
 * accept we flip `analytics_storage` to "granted" for the live session.
 *
 * Only mounts when GA is configured (NEXT_PUBLIC_GA_ID present) — passed down as
 * `enabled` so the banner never shows on builds without analytics.
 */
export function ConsentBanner({ enabled }: { enabled: boolean }) {
  const t = useTranslations("Consent");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* storage blocked — don't nag */
    }
  }, [enabled]);

  const decide = (choice: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* ignore */
    }
    if (choice === "granted" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    setShow(false);
  };

  if (!show) return null;

  return createPortal(
    <div className="consent" role="dialog" aria-live="polite" aria-label={t("aria")}>
      <p className="consent__text">
        {t("body")}{" "}
        <Link href="/privacy" className="consent__link">
          {t("policy")}
        </Link>
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--ghost consent__btn" onClick={() => decide("denied")}>
          {t("decline")}
        </button>
        <button type="button" className="btn btn--primary consent__btn" onClick={() => decide("granted")}>
          {t("accept")}
        </button>
      </div>
    </div>,
    document.body,
  );
}
