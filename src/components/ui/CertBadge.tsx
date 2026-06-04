/**
 * Finsweet Client-First "Certified Expert" badge, linking to Lucas's
 * verified certification profile. Uses the official badge asset.
 */
const CERT_URL =
  "https://finsweet.com/client-first/certification/certified-experts/cf-00607";

export function CertBadge({ className }: { className?: string }) {
  return (
    <a
      href={CERT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`cert-badge${className ? ` ${className}` : ""}`}
      aria-label="Finsweet Client-First — Certified Expert (verify certification)"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/cf-badge-expert.svg"
        alt="Finsweet Client-First Certified Expert"
        width={380}
        height={56}
      />
    </a>
  );
}
