/**
 * First-touch lead attribution. On the first page of a session we resolve where
 * the visitor came from and stash it in sessionStorage, so it survives any
 * in-site navigation before they reach the contact form. Priority:
 *
 *   1. `utm_source` query param  — for links we tag ourselves (LinkedIn, Upwork…)
 *   2. referrer hostname         — caught automatically (google.com, linkedin.com…)
 *   3. "direct"                  — no referrer, no UTM (bookmarks, pasted links, app clicks)
 *
 * Consumed by the contact form: reported to Vercel Analytics as a
 * `lead_submitted` event and included in the Resend inquiry email.
 */
const KEY = "lead_source";

export function captureLeadSource(): void {
  if (typeof window === "undefined") return;
  // First-touch: never overwrite a source already captured this session.
  if (sessionStorage.getItem(KEY)) return;

  const utm = new URLSearchParams(window.location.search).get("utm_source");
  let source = "direct";

  if (utm) {
    source = utm.trim().toLowerCase();
  } else if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname) source = host;
    } catch {
      /* malformed referrer — leave as "direct" */
    }
  }

  sessionStorage.setItem(KEY, source);
}

export function getLeadSource(): string {
  if (typeof window === "undefined") return "direct";
  return sessionStorage.getItem(KEY) ?? "direct";
}
