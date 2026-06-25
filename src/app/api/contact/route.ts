import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form handler. The site moved off Netlify (now on Vercel), so the
 * form posts here instead of Netlify Forms. Sends the inquiry to the inbox via
 * Resend, with the visitor's address as Reply-To so a reply goes straight back.
 *
 * Env: RESEND_API_KEY (required), CONTACT_FROM (optional — defaults to Resend's
 * shared onboarding sender until the domain is verified).
 */
export const runtime = "nodejs";

const TO = "hello@lucasmujica.dev";
const FROM = process.env.CONTACT_FROM ?? "Lucas Mujica <onboarding@resend.dev>";

const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = (await req.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: a filled bot-field is a bot — accept silently and drop it.
  if ((data["bot-field"] ?? "").trim()) return NextResponse.json({ ok: true });

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const company = (data.company ?? "").trim();
  const type = (data.type ?? "").trim();
  const budget = (data.budget ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !isEmail(email)) {
    return NextResponse.json(
      { error: "Name and a valid email are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    type && `Project: ${type}`,
    budget && `Budget: ${budget}`,
  ].filter(Boolean) as string[];

  const text = message ? `${lines.join("\n")}\n\nMessage:\n${message}` : lines.join("\n");
  const html =
    `<h2>New project inquiry</h2><p>${lines.map(esc).join("<br>")}</p>` +
    (message ? `<p><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>")}</p>` : "");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New project inquiry: ${name}`,
      text,
      html,
    });
    if (error) return NextResponse.json({ error: "Send failed." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Send failed." }, { status: 502 });
  }
}
