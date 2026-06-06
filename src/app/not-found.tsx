import Link from "next/link";
import "@/styles/globals.css";

/**
 * Global 404 for paths the locale middleware never matched. It sits above the
 * locale layout, so it provides its own document shell. Kept dependency-light
 * (no i18n) since it's the rare fallthrough case.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <section className="nf">
          <div className="nf__inner">
            <span className="eyebrow eyebrow--accent">404</span>
            <h1>This page took a detour.</h1>
            <p className="lede">The link&apos;s broken or the page moved. Let&apos;s get you back to the work.</p>
            <div className="nf__actions">
              <Link href="/" className="btn btn--primary">
                Back home
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
