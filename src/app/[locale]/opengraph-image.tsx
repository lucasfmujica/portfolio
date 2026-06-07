import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { routing } from "@/i18n/routing";

export const alt = "Lucas Mujica, senior Webflow & front-end developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerender the card at build time (where `public/` exists), like the
// case-study OG route. Without this the [locale] segment renders the card
// on-demand in a serverless function that doesn't bundle `public/`, so the
// font reads ENOENT → 500 and no social preview renders.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const INK = "#0b0b0d";
const EMBER = "#ff4d2e";
const LIGHT = "#e7e7ea";
const MUTED = "#9a9a94";

export default async function OgImage() {
  // Satori can't parse woff2, so the OG card reads .ttf builds of the brand
  // faces (server-only — never shipped to the browser). Paths are inlined as
  // string literals so Next's file tracer bundles them into the function even
  // when it renders dynamically.
  const [clashBold, clashSemi, mono] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/ClashDisplay-Bold.ttf")),
    readFile(join(process.cwd(), "public/fonts/ClashDisplay-Semibold.ttf")),
    readFile(join(process.cwd(), "public/fonts/GeistMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "62px 76px",
          fontFamily: "Geist Mono",
          // ember bloom top-right, faint cool counter-glow bottom-left
          backgroundImage:
            "radial-gradient(820px 520px at 102% -8%, rgba(255,77,46,0.22), rgba(255,77,46,0) 58%), radial-gradient(680px 480px at -10% 116%, rgba(255,77,46,0.07), rgba(255,77,46,0) 60%)",
        }}
      >
        {/* top hairline — echoes the site's scroll-progress bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 520,
            height: 5,
            background: "linear-gradient(90deg, #ff4d2e, rgba(255,77,46,0))",
          }}
        />

        {/* top band: brand mark + tech tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 58,
                height: 58,
                borderRadius: 15,
                background: "#141416",
                border: "1px solid #2a2a30",
                color: "#fff",
                fontFamily: "Clash Display",
                fontWeight: 700,
                fontSize: 27,
              }}
            >
              LM<span style={{ color: EMBER }}>.</span>
            </div>
            <div style={{ display: "flex", color: MUTED, fontSize: 21, letterSpacing: 3 }}>
              PORTFOLIO
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #2a2a30",
              background: "rgba(20,20,22,0.6)",
              color: MUTED,
              fontSize: 19,
              letterSpacing: 1,
            }}
          >
            <div style={{ display: "flex", width: 9, height: 9, borderRadius: 999, background: EMBER }} />
            WEBFLOW · GSAP · NEXT.JS
          </div>
        </div>

        {/* center: eyebrow, name, headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: EMBER }} />
            <div style={{ display: "flex", color: EMBER, fontSize: 20, letterSpacing: 4 }}>
              WEBFLOW &amp; FRONT-END DEVELOPER
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              color: "#fff",
              fontFamily: "Clash Display",
              fontWeight: 700,
              fontSize: 112,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Lucas Mujica<span style={{ color: EMBER }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              color: LIGHT,
              fontFamily: "Clash Display",
              fontWeight: 600,
              fontSize: 46,
              letterSpacing: -1,
            }}
          >
            I build websites that&nbsp;<span style={{ color: EMBER }}>move.</span>
          </div>
        </div>

        {/* bottom band: positioning + url */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", color: MUTED, fontSize: 23 }}>
            Senior Webflow &amp; Front-End Developer · 5+ yrs
          </div>
          <div style={{ display: "flex", color: EMBER, fontSize: 23 }}>lucasmujica.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash Display", data: clashBold, style: "normal", weight: 700 },
        { name: "Clash Display", data: clashSemi, style: "normal", weight: 600 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
