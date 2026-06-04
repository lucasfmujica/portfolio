import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The design lives only in /src; the original HTML export in /project is
  // kept as reference and must never be type-checked or bundled.
  eslint: { ignoreDuringBuilds: false },
};

export default withNextIntl(nextConfig);
