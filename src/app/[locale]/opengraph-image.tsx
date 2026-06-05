import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Lucas Mujica — senior Webflow & front-end developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0b0b0d";
const EMBER = "#ff4d2e";
const MUTED = "#a1a1aa";

export default async function OgImage() {
  const mono = await readFile(join(process.cwd(), "public/fonts/GeistMono-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "72px 80px",
          fontFamily: "Geist Mono",
          // ember glow, top-right
          backgroundImage: `radial-gradient(900px 520px at 100% 0%, rgba(255,77,46,0.18), rgba(255,77,46,0) 60%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#141416",
              border: "1px solid #26262b",
              color: "#fff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            LM
            <span style={{ color: EMBER }}>.</span>
          </div>
          <div style={{ color: MUTED, fontSize: 22, letterSpacing: 2 }}>PORTFOLIO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", color: "#fff", fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
            Lucas Mujica<span style={{ color: EMBER }}>.</span>
          </div>
          <div style={{ display: "flex", color: "#e7e7ea", fontSize: 40 }}>
            I build websites that move.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", color: MUTED, fontSize: 24 }}>
            Senior Webflow &amp; Front-End Developer · 5+ yrs
          </div>
          <div style={{ display: "flex", color: EMBER, fontSize: 24 }}>lucasmujica.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist Mono", data: mono, style: "normal", weight: 400 }],
    },
  );
}
