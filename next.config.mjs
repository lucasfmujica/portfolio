import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Project shots / portrait are immutable once shipped — let the optimizer
    // cache each variant for a year instead of re-encoding on TTL expiry.
    minimumCacheTTL: 31536000,
  },
  // The design lives only in /src; the original HTML export in /project is
  // kept as reference and must never be type-checked or bundled.
  eslint: { ignoreDuringBuilds: false },
};

export default withNextIntl(nextConfig);
