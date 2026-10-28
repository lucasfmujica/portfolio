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
 *
 * The landing path and `utm_campaign` are captured on the same first touch and
 * only go into the email: GA4 sees a fraction of visitors, the inbox sees every
 * lead.
 */
const KEY = "lead_source";
const KEY_LANDING = "lead_landing";
const KEY_CAMPAIGN = "lead_campaign";

export function captureLeadSource(): void {
  if (typeof window === "undefined") return;
  // First-touch: never overwrite a source already captured this session.
  if (sessionStorage.getItem(KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source");
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
  sessionStorage.setItem(KEY_LANDING, window.location.pathname);
  const campaign = params.get("utm_campaign")?.trim().toLowerCase();
  if (campaign) sessionStorage.setItem(KEY_CAMPAIGN, campaign);
}

export function getLeadSource(): string {
  if (typeof window === "undefined") return "direct";
  return sessionStorage.getItem(KEY) ?? "direct";
}

/** First page of the session and its `utm_campaign`, for the inquiry email. */
export function getLeadContext(): { landing: string; campaign: string } {
  if (typeof window === "undefined") return { landing: "", campaign: "" };
  return {
    landing: sessionStorage.getItem(KEY_LANDING) ?? "",
    campaign: sessionStorage.getItem(KEY_CAMPAIGN) ?? "",
  };
}
