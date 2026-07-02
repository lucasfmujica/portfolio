"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";
import { getLeadSource } from "@/lib/leadSource";

type Status = "idle" | "submitting" | "success" | "error";

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
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      trackEvent("lead_submitted", { source });
      setStatus("success");
    } catch {
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
