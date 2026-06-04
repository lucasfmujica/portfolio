"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

const FORM_NAME = "contact";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

/**
 * The conversational "madlib" contact form, wired to Netlify Forms.
 *
 * Netlify detects the form from the static `public/__forms.html` shell (the
 * App Router renders dynamically, so the bot can't parse this component) — the
 * `name` + field set there must stay in sync with what we POST here. Submission
 * is an AJAX urlencoded POST so we can show inline success / error states
 * without a full navigation. Includes a honeypot + client-side validation.
 */
export function ContactForm() {
  const t = useTranslations("Contact");
  const projectTypes = t.raw("projectTypes") as string[];
  const budgets = t.raw("budgets") as string[];

  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<{ name?: boolean; email?: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);

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

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": FORM_NAME, ...data }),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
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
    <form
      ref={formRef}
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Netlify plumbing (also present in public/__forms.html for detection). */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
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
