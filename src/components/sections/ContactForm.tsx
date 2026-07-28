"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";
import { getLeadSource } from "@/lib/leadSource";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Canonical keys for the two select fields, by position. The options
 * themselves are translated, so sending their labels would split every report
 * in two ("$5–10k" vs "$5–10k" is fine, "TBD" vs "A definir" is not). The
 * emailed inquiry keeps the visible label; only the event is normalized.
 */
const BUDGET_KEYS = ["3-5k", "5-10k", "10-25k", "25k-plus", "tbd"];
const TYPE_KEYS = ["webflow-site", "webflow-migration", "web-app", "automation"];

/**
 * The conversational "madlib" contact form, wired to the `/api/contact` route
 * handler (Resend). Submission is an AJAX JSON POST so we can show inline
 * success / error states without a full navigation. Includes a honeypot +
 * client-side validation; the server re-validates and drops honeypot hits.
 */
export function ContactForm() {
  const t = useTranslations("Contact");
  const projectTypes = t.raw("projectTypes") as string[];
  const budgets = t.raw("budgets") as string[];

  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<{ name?: boolean; email?: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);

  // Fire once when the visitor first touches the form — lets us measure the
  // started-vs-submitted drop-off (form friction) in Vercel Analytics.
  const handleStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("contact_started", {});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const nameBad = !data.name?.trim();
    const emailBad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email ?? "");
    if (nameBad || emailBad) {
      setInvalid({ name: nameBad, email: emailBad });
      // Without this the visitor shows up as contact_started with no
      // lead_submitted, indistinguishable from someone who simply gave up.
      trackEvent("form_error", { reason: "validation" });
      return;
    }
    setInvalid({});
    setStatus("submitting");

    const source = getLeadSource();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      // Handled inline rather than thrown so the HTTP status survives into the
      // event — this is the only conversion path on the site, and a broken
      // Resend/API used to fail completely silently.
      if (!res.ok) {
        trackEvent("form_error", { reason: "network", status: res.status });
        setStatus("error");
        return;
      }
      // Param is `lead_source`, not `source`: GA4 already owns "source" as a
      // session dimension, so a same-named event param reads as ambiguous in
      // reports. Registered as the "Lead source" custom dimension.
      //
      // `budget` and `project_type` ride along because a raw lead count can't
      // answer the only question that matters here — whether the page pulls in
      // projects worth quoting or fills the inbox with the bottom tier.
      trackEvent("lead_submitted", {
        lead_source: source,
        budget: BUDGET_KEYS[budgets.indexOf(data.budget)] ?? "unknown",
        project_type: TYPE_KEYS[projectTypes.indexOf(data.type)] ?? "unknown",
        // Whether the scoping questions actually get answered — the field is no
        // longer labelled optional, so this measures if that changed anything.
        has_details: data.message?.trim() ? "yes" : "no",
      });
      setStatus("success");
    } catch {
      // fetch itself rejected — offline, DNS, connection dropped. status 0
      // means "never got an HTTP response at all".
      trackEvent("form_error", { reason: "network", status: 0 });
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="f-done" role="status">
        <div className="f-done__ic">
          <svg viewBox="0 0 24 24" className="f-chk" aria-hidden="true">
            <path d="M4 12l5 5L20 6" />
          </svg>
        </div>
        <div className="f-done__h">{t("successHeading")}</div>
        <p className="f-done__p">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} method="POST" onSubmit={handleSubmit} onInput={handleStart} noValidate>
      {/* Honeypot — bots fill hidden fields; the server drops any submission
          that has it set. */}
      <p hidden>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <p className="mad">
        {t("madGreeting")}{" "}
        <input
          className={`min${invalid.name ? " invalid" : ""}`}
          name="name"
          placeholder={t("madName")}
          size={10}
          aria-label={t("madName")}
          aria-invalid={invalid.name || undefined}
        />{" "}
        {t("madFrom")}{" "}
        <input className="min" name="company" placeholder={t("madCompany")} size={9} aria-label={t("madCompany")} />.{" "}
        {t("madBuilding")}{" "}
        <select className="msel" name="type" aria-label={t("madBuilding")} defaultValue={projectTypes[0]}>
          {projectTypes.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>{" "}
        {t("madBudget")}{" "}
        <select className="msel" name="budget" aria-label={t("madBudget")} defaultValue={budgets[0]}>
          {budgets.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        . {t("madReach")}{" "}
        <input
          className={`min${invalid.email ? " invalid" : ""}`}
          name="email"
          type="email"
          placeholder={t("madEmail")}
          size={13}
          aria-label={t("madReach")}
          aria-invalid={invalid.email || undefined}
        />
        .
      </p>

      <div className="mad__msg">
        <span className="mad__msg-lead">{t("madMessageLead")}</span>
        <textarea
          className="mtext"
          name="message"
          placeholder={t("madMessage")}
          rows={3}
          aria-label={t("madMessageLead")}
        />
      </div>

      <div className="mad__foot">
        <button className="f-btn" type="submit" disabled={status === "submitting"}>
          {t("send")} <span className="arr">→</span>
        </button>
        <span className="f-note">
          <span className="f-note__dot" /> {t("replyNote")}
        </span>
      </div>

      {(invalid.name || invalid.email) && (
        <p className="f-error" role="alert">
          {invalid.name ? t("validationName") : t("validationEmail")}
        </p>
      )}
      {status === "error" && (
        <p className="f-error" role="alert">
          {t("errorBody")}
        </p>
      )}
    </form>
  );
}
